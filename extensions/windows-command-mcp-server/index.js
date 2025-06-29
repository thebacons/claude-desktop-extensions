#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WindowsCommandMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'windows-command-mcp-server',
        version: '1.0.1',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools - required by MCP protocol
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'executeCommand',
            description: 'Execute a Windows command',
            inputSchema: {
              type: 'object',
              properties: {
                command: {
                  type: 'string',
                  description: 'The command to execute',
                },
              },
              required: ['command'],
            },
          },
          {
            name: 'calculate',
            description: 'Evaluate a mathematical expression',
            inputSchema: {
              type: 'object',
              properties: {
                expression: {
                  type: 'string',
                  description: 'Mathematical expression to evaluate',
                },
              },
              required: ['expression'],
            },
          },
        ],
      };
    });

    // Handle tool calls - required by MCP protocol
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'executeCommand':
            return await this.executeCommand(args.command);
          case 'calculate':
            return await this.calculate(args.expression);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async executeCommand(command) {
    return new Promise((resolve) => {
      // Use cmd /c for Windows command execution
      const childProcess = spawn('cmd', ['/c', command], {
        cwd: __dirname,
        windowsHide: true,
        timeout: 30000, // 30 second timeout for individual commands
      });

      let stdout = '';
      let stderr = '';

      childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      childProcess.on('close', (code) => {
        let output = `Command: ${command}\n`;
        output += `Exit Code: ${code}\n\n`;
        
        if (stdout) {
          output += `Output:\n${stdout.trim()}\n`;
        }
        
        if (stderr) {
          output += `\nErrors:\n${stderr.trim()}\n`;
        }
        
        // Add acknowledgment for successful commands with no output
        if (!stdout && !stderr && code === 0) {
          output += `The command executed successfully. What else would you like me to do?\n`;
        }

        resolve({
          content: [
            {
              type: 'text',
              text: output,
            },
          ],
        });
      });

      childProcess.on('error', (error) => {
        resolve({
          content: [
            {
              type: 'text',
              text: `Failed to execute command: ${error.message}`,
            },
          ],
        });
      });
    });
  }

  async calculate(expression) {
    // Create a safe calculation using Node.js eval
    try {
      // Basic security check - only allow mathematical expressions
      if (!/^[0-9+\-*/.() \s\w,Math.]+$/.test(expression)) {
        throw new Error('Expression contains invalid characters');
      }

      const result = eval(expression);
      
      return {
        content: [
          {
            type: 'text',
            text: `Expression: ${expression}\nResult: ${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Calculation error: ${error.message}`,
          },
        ],
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    // Log to file for debugging
    const logPath = path.join(__dirname, 'mcp-server.log');
    fs.appendFileSync(logPath, `MCP Server started: ${new Date().toISOString()}\n`);
  }
}

// Start the server
const server = new WindowsCommandMCPServer();
server.run().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
