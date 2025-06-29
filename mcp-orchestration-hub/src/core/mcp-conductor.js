#!/usr/bin/env node

/**
 * MCP Conductor - Core Orchestration Engine
 * 
 * The foundational engine that enables local orchestration of multiple MCP servers,
 * bypassing Claude Desktop limitations and providing real-time capability discovery.
 * 
 * @author Agent 1 (Core Engine Developer)
 * @version 1.0.0-mvp
 */

import { MCPClient } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export class MCPConductor {
  constructor(options = {}) {
    this.servers = new Map();
    this.capabilities = new Map();
    this.config = {
      autoDiscovery: options.autoDiscovery !== false,
      monitoringInterval: options.monitoringInterval || 5000,
      maxServers: options.maxServers || 50,
      fallbackTimeout: options.fallbackTimeout || 10000,
      configPath: options.configPath || this.getDefaultConfigPath(),
      ...options
    };
    
    this.status = {
      initialized: false,
      serversRunning: 0,
      lastDiscovery: null,
      totalCapabilities: 0
    };
    
    this.log('🎭 MCP Conductor initialized');
  }
  
  /**
   * Initialize the conductor and discover available MCP servers
   */
  async initialize() {
    this.log('🚀 Initializing MCP Conductor...');
    
    try {
      // Load Claude Desktop MCP configuration
      await this.loadClaudeDesktopConfig();
      
      // Discover and register servers
      if (this.config.autoDiscovery) {
        await this.discoverServers();
      }
      
      // Index all capabilities
      await this.indexCapabilities();
      
      // Start monitoring
      this.startMonitoring();
      
      this.status.initialized = true;
      this.log('✅ MCP Conductor ready for orchestration');
      
      return this.getStatus();
    } catch (error) {
      this.log(`❌ Initialization failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Discover MCP servers from Claude Desktop configuration
   */
  async discoverServers() {
    this.log('🔍 Discovering MCP servers...');
    
    try {
      const configData = await this.loadClaudeDesktopConfig();
      
      if (configData?.mcpServers) {
        for (const [serverName, serverConfig] of Object.entries(configData.mcpServers)) {
          await this.registerServer(serverName, serverConfig);
        }
      }
      
      this.status.lastDiscovery = new Date().toISOString();
      this.log(`📊 Discovered ${this.servers.size} MCP servers`);
      
    } catch (error) {
      this.log(`⚠️ Server discovery failed: ${error.message}`);
      // Continue with empty server list
    }
  }
  
  /**
   * Register a new MCP server
   */
  async registerServer(serverName, serverConfig) {
    try {
      this.log(`📝 Registering server: ${serverName}`);
      
      const serverData = {
        name: serverName,
        config: serverConfig,
        status: 'registered',
        capabilities: [],
        client: null,
        lastPing: null,
        errors: []
      };
      
      // Try to connect and get capabilities
      if (serverConfig.command) {
        try {
          const client = await this.connectToServer(serverConfig);
          serverData.client = client;
          serverData.status = 'connected';
          
          // Get server capabilities
          const capabilities = await this.getServerCapabilities(client);
          serverData.capabilities = capabilities;
          
          this.log(`✅ Server ${serverName} connected with ${capabilities.length} capabilities`);
        } catch (error) {
          this.log(`⚠️ Could not connect to ${serverName}: ${error.message}`);
          serverData.status = 'error';
          serverData.errors.push(error.message);
        }
      }
      
      this.servers.set(serverName, serverData);
      this.status.serversRunning = Array.from(this.servers.values()).filter(s => s.status === 'connected').length;
      
      return serverData;
    } catch (error) {
      this.log(`❌ Failed to register server ${serverName}: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Connect to an MCP server
   */
  async connectToServer(serverConfig) {
    const transport = new StdioClientTransport({
      command: serverConfig.command,
      args: serverConfig.args || []
    });
    
    const client = new MCPClient(
      {
        name: 'mcp-conductor',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {},
          resources: {}
        }
      }
    );
    
    await client.connect(transport);
    return client;
  }
  
  /**
   * Get capabilities from a connected server
   */
  async getServerCapabilities(client) {
    try {
      const capabilities = [];
      
      // Get tools
      const toolsResult = await client.listTools();
      if (toolsResult.tools) {
        capabilities.push(...toolsResult.tools.map(tool => ({
          type: 'tool',
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema
        })));
      }
      
      // Get resources
      const resourcesResult = await client.listResources();
      if (resourcesResult.resources) {
        capabilities.push(...resourcesResult.resources.map(resource => ({
          type: 'resource',
          name: resource.name,
          description: resource.description,
          uri: resource.uri
        })));
      }
      
      return capabilities;
    } catch (error) {
      this.log(`⚠️ Failed to get capabilities: ${error.message}`);
      return [];
    }
  }
  
  /**
   * Index all capabilities across servers
   */
  async indexCapabilities() {
    this.log('📋 Indexing capabilities...');
    
    this.capabilities.clear();
    
    for (const [serverName, serverData] of this.servers.entries()) {
      if (serverData.capabilities) {
        for (const capability of serverData.capabilities) {
          const capabilityKey = `${capability.type}:${capability.name}`;
          
          if (!this.capabilities.has(capabilityKey)) {
            this.capabilities.set(capabilityKey, []);
          }
          
          this.capabilities.get(capabilityKey).push({
            serverName,
            capability,
            priority: serverData.status === 'connected' ? 1 : 0
          });
        }
      }
    }
    
    this.status.totalCapabilities = this.capabilities.size;
    this.log(`📊 Indexed ${this.capabilities.size} unique capabilities`);
  }
  
  /**
   * Route a request to the appropriate server
   */
  async routeRequest(requestType, requestName, params = {}) {
    this.log(`🎯 Routing ${requestType} request: ${requestName}`);
    
    const capabilityKey = `${requestType}:${requestName}`;
    const providers = this.capabilities.get(capabilityKey);
    
    if (!providers || providers.length === 0) {
      throw new Error(`No providers found for ${requestType}: ${requestName}`);
    }
    
    // Sort by priority (connected servers first)
    providers.sort((a, b) => b.priority - a.priority);
    
    for (const provider of providers) {
      const serverData = this.servers.get(provider.serverName);
      
      if (serverData.status === 'connected' && serverData.client) {
        try {
          this.log(`📡 Executing ${requestType} on ${provider.serverName}`);
          
          let result;
          if (requestType === 'tool') {
            result = await serverData.client.callTool({
              name: requestName,
              arguments: params
            });
          } else if (requestType === 'resource') {
            result = await serverData.client.readResource({
              uri: provider.capability.uri
            });
          }
          
          this.log(`✅ Request completed successfully`);
          return result;
          
        } catch (error) {
          this.log(`⚠️ Request failed on ${provider.serverName}: ${error.message}`);
          // Try next provider
          continue;
        }
      }
    }
    
    throw new Error(`All providers failed for ${requestType}: ${requestName}`);
  }
  
  /**
   * Get current status and capability matrix
   */
  getStatus() {
    const serverStatuses = Array.from(this.servers.entries()).map(([name, data]) => ({
      name,
      status: data.status,
      capabilities: data.capabilities.length,
      lastPing: data.lastPing,
      errors: data.errors.length
    }));
    
    const capabilityMatrix = Array.from(this.capabilities.entries()).map(([key, providers]) => ({
      capability: key,
      providers: providers.length,
      available: providers.filter(p => this.servers.get(p.serverName).status === 'connected').length
    }));
    
    return {
      ...this.status,
      servers: serverStatuses,
      capabilities: capabilityMatrix,
      timestamp: new Date().toISOString()
    };
  }
  
  /**
   * Load Claude Desktop MCP configuration
   */
  async loadClaudeDesktopConfig() {
    try {
      const configPath = this.config.configPath;
      this.log(`📖 Loading Claude Desktop config: ${configPath}`);
      
      const configContent = await fs.readFile(configPath, 'utf8');
      const config = JSON.parse(configContent);
      
      this.log(`✅ Loaded configuration with ${Object.keys(config.mcpServers || {}).length} servers`);
      return config;
      
    } catch (error) {
      this.log(`⚠️ Could not load Claude Desktop config: ${error.message}`);
      return { mcpServers: {} };
    }
  }
  
  /**
   * Get default Claude Desktop configuration path
   */
  getDefaultConfigPath() {
    const platform = os.platform();
    const homeDir = os.homedir();
    
    switch (platform) {
      case 'win32':
        return path.join(homeDir, 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
      case 'darwin':
        return path.join(homeDir, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
      case 'linux':
        return path.join(homeDir, '.config', 'Claude', 'claude_desktop_config.json');
      default:
        return path.join(homeDir, '.claude-desktop', 'config.json');
    }
  }
  
  /**
   * Start monitoring server health
   */
  startMonitoring() {
    setInterval(async () => {
      await this.pingServers();
    }, this.config.monitoringInterval);
  }
  
  /**
   * Ping all servers to check health
   */
  async pingServers() {
    for (const [serverName, serverData] of this.servers.entries()) {
      if (serverData.status === 'connected' && serverData.client) {
        try {
          // Simple ping by listing tools
          await serverData.client.listTools();
          serverData.lastPing = new Date().toISOString();
        } catch (error) {
          this.log(`⚠️ Server ${serverName} ping failed: ${error.message}`);
          serverData.status = 'error';
          serverData.errors.push(`Ping failed: ${error.message}`);
        }
      }
    }
    
    this.status.serversRunning = Array.from(this.servers.values()).filter(s => s.status === 'connected').length;
  }
  
  /**
   * Logging utility
   */
  log(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] 🎭 ${message}`);
  }
  
  /**
   * Cleanup and shutdown
   */
  async shutdown() {
    this.log('🔚 Shutting down MCP Conductor...');
    
    for (const [serverName, serverData] of this.servers.entries()) {
      if (serverData.client) {
        try {
          await serverData.client.close();
          this.log(`✅ Disconnected from ${serverName}`);
        } catch (error) {
          this.log(`⚠️ Error disconnecting from ${serverName}: ${error.message}`);
        }
      }
    }
    
    this.log('🔚 MCP Conductor shutdown complete');
  }
}

// CLI interface for testing
if (import.meta.url === `file://${process.argv[1]}`) {
  const conductor = new MCPConductor();
  
  async function main() {
    try {
      console.log('🎭 Starting MCP Conductor...');
      
      const status = await conductor.initialize();
      
      console.log('\n📊 MCP Conductor Status:');
      console.log(`Servers: ${status.serversRunning}/${status.servers.length}`);
      console.log(`Capabilities: ${status.totalCapabilities}`);
      
      console.log('\n🖥️  Available Servers:');
      status.servers.forEach(server => {
        const statusIcon = server.status === 'connected' ? '✅' : server.status === 'error' ? '❌' : '⏳';
        console.log(`  ${statusIcon} ${server.name} (${server.capabilities} capabilities)`);
      });
      
      console.log('\n🔧 Available Capabilities:');
      status.capabilities.slice(0, 10).forEach(cap => {
        console.log(`  📋 ${cap.capability} (${cap.available}/${cap.providers} providers)`);
      });
      
      if (status.capabilities.length > 10) {
        console.log(`  ... and ${status.capabilities.length - 10} more capabilities`);
      }
      
      console.log('\n✅ MCP Conductor is ready for orchestration!');
      console.log('🎯 Use conductor.routeRequest(type, name, params) to execute capabilities');
      
    } catch (error) {
      console.error('❌ Failed to start MCP Conductor:', error.message);
      process.exit(1);
    }
  }
  
  main();
}

export default MCPConductor;
