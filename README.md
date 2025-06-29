# Claude Desktop Extensions

A curated collection of Claude Desktop Extensions (.dxt files) that enhance Claude's capabilities through the Model Context Protocol (MCP).

## What are Claude Desktop Extensions?

Claude Desktop Extensions (.dxt files) are self-contained packages that enable Claude Desktop to interact with local applications, access private data, and integrate with development tools—all while keeping data on your machine. They solve the installation complexity of traditional MCP servers by bundling everything into a single, installable file.

## Available Extensions

### 🖥️ Windows Command MCP Server v2

**Location**: `extensions/windows-command-mcp-server/`

A powerful MCP server that enables Claude Desktop to execute Windows shell commands and perform mathematical calculations.

**Features:**
- Execute any Windows shell command through Claude Desktop
- Perform complex mathematical expressions with high precision
- Smart response system for GUI applications
- 30-second timeout protection
- Comprehensive error handling and logging

**Use Cases:**
- File management operations
- System administration tasks
- Network diagnostics
- Development workflow automation
- Quick mathematical calculations
- Application launch and management
- Log file analysis
- Backup and maintenance
- Productivity automation

**Installation:**
1. Download the `.dxt` file from the releases
2. Open Claude Desktop → Settings → Extensions
3. Drag and drop the `.dxt` file or click "Install Extension"
4. Enable the extension and start using it

[📖 Full Documentation](extensions/windows-command-mcp-server/README.md)

## Installation Guide

### Prerequisites
- Claude Desktop (latest version)
- Windows 10/11 (for Windows Command MCP Server)

### General Installation Steps
1. **Download Extension**: Get the `.dxt` file from the releases section
2. **Open Claude Desktop**: Launch the application
3. **Navigate to Extensions**: Settings → Extensions
4. **Install**: Drag and drop the `.dxt` file or use the install button
5. **Enable**: Toggle the extension to enabled
6. **Test**: Try the extension's capabilities in a new chat

## Repository Structure

```
claude-desktop-extensions/
├── extensions/              # Individual extension projects
│   └── windows-command-mcp-server/
│       ├── index.js        # Main server implementation
│       ├── package.json    # Node.js dependencies
│       ├── manifest.json   # Extension metadata
│       └── README.md       # Extension documentation
├── docs/                   # General documentation
├── examples/               # Usage examples
└── README.md              # This file
```

## Development

### Building Extensions

Each extension can be built into a `.dxt` file using the standard DXT toolchain:

```bash
# Navigate to extension directory
cd extensions/windows-command-mcp-server

# Install dependencies
npm install

# Build .dxt file (requires DXT CLI)
dxt build
```

### Contributing

We welcome contributions! To add a new extension:

1. Fork this repository
2. Create a new directory in `extensions/`
3. Follow the [DXT specification](https://github.com/anthropics/dxt)
4. Include comprehensive documentation
5. Test thoroughly
6. Submit a pull request

### Extension Guidelines

- **Documentation**: Include detailed README with use cases and installation instructions
- **Security**: Implement proper input validation and security measures
- **Error Handling**: Provide comprehensive error handling and user feedback
- **Testing**: Include test cases and validation
- **Compatibility**: Ensure compatibility with latest Claude Desktop versions

## Security Considerations

### What Extensions Can Do
- Execute commands you explicitly request through Claude
- Access files and folders based on your user permissions
- Launch applications and system utilities
- Perform calculations and data processing

### What Extensions Cannot Do
- Execute commands without your explicit request to Claude
- Access files outside your user permission scope
- Run automatically in the background
- Connect to external networks independently

### Best Practices
1. **Review commands** before confirming execution
2. **Avoid running commands** you don't understand
3. **Use with trusted content** only
4. **Keep Claude Desktop updated** for security patches

## Support

### Getting Help
- **Issues**: Open an issue in this repository
- **Documentation**: Check individual extension README files
- **Claude Desktop**: Visit [Claude Desktop documentation](https://support.anthropic.com)

### Troubleshooting
- Ensure Claude Desktop is updated to the latest version
- Check that extensions are properly enabled
- Restart Claude Desktop if extensions aren't loading
- Review extension logs for error messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Individual extensions may have their own licenses. Please check each extension's documentation.

## Acknowledgments

- [Anthropic](https://anthropic.com) for Claude Desktop and the DXT specification
- The MCP community for driving local AI integration forward
- Contributors who make this collection possible

---

**Author**: Colin Bacon  
**Email**: ai@robotmaker.eu  
**Repository**: https://github.com/thebacons/claude-desktop-extensions  
**Last Updated**: June 29, 2025
