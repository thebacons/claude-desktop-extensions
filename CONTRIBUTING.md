# Contributing to Claude Desktop Extensions

Thank you for your interest in contributing to Claude Desktop Extensions! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Use welcoming and constructive language
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use the issue template** if available
3. **Provide clear information**:
   - Extension name and version
   - Claude Desktop version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if relevant

### Submitting Extensions

1. **Fork the repository**
2. **Create a new branch** for your extension
3. **Follow the extension structure**:
   ```
   extensions/your-extension-name/
   ├── index.js or main.py     # Main entry point
   ├── package.json           # Dependencies and metadata
   ├── manifest.json          # DXT extension manifest
   ├── README.md              # Comprehensive documentation
   └── examples/              # Usage examples (optional)
   ```

4. **Follow development guidelines**:
   - Implement proper MCP protocol communication
   - Include comprehensive error handling
   - Add input validation and security measures
   - Provide clear documentation
   - Include usage examples

5. **Test thoroughly**:
   - Test all tool functions
   - Verify manifest loads correctly
   - Test in Claude Desktop environment
   - Check for edge cases and error conditions

6. **Submit a pull request**:
   - Use a descriptive title
   - Explain the purpose and functionality
   - Include testing steps
   - Reference any related issues

### Extension Requirements

#### Technical Requirements
- **MCP Compliance**: Must implement proper MCP protocol
- **Security**: Input validation and secure execution
- **Error Handling**: Comprehensive error messages and logging
- **Performance**: Reasonable response times and resource usage
- **Compatibility**: Works with latest Claude Desktop versions

#### Documentation Requirements
- **README.md**: Complete documentation including:
  - Clear description and purpose
  - Installation instructions
  - Usage examples
  - Troubleshooting guide
  - Security considerations
- **Code Comments**: Well-commented code
- **API Documentation**: Clear tool definitions and schemas

#### Quality Standards
- **Functionality**: Extension works as described
- **Reliability**: Stable operation under normal conditions
- **User Experience**: Clear feedback and intuitive operation
- **Security**: Safe operation with proper permissions

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thebacons/claude-desktop-extensions.git
   cd claude-desktop-extensions
   ```

2. **Create your extension directory**:
   ```bash
   mkdir extensions/your-extension-name
   cd extensions/your-extension-name
   ```

3. **Initialize your extension**:
   ```bash
   npm init -y  # For Node.js extensions
   # or appropriate setup for Python/other languages
   ```

4. **Follow the DXT specification**:
   - Review [DXT documentation](https://github.com/anthropics/dxt)
   - Use proper manifest.json structure
   - Implement MCP server correctly

### Testing Guidelines

#### Local Testing
1. **Build your extension**:
   ```bash
   # Use DXT CLI or manual zip creation
   dxt build
   ```

2. **Test in Claude Desktop**:
   - Install the .dxt file
   - Test all functionality
   - Verify error handling
   - Check performance

#### Automated Testing
- Include unit tests where applicable
- Test MCP protocol compliance
- Validate manifest structure
- Check security measures

### Review Process

1. **Automated Checks**: Pull requests trigger automated checks
2. **Code Review**: Maintainers review code quality and security
3. **Testing**: Functional testing in Claude Desktop environment
4. **Documentation Review**: Ensure documentation is complete and clear
5. **Approval**: Two maintainer approvals required for merge

### Security Guidelines

#### Input Validation
- Validate all user inputs
- Sanitize data before processing
- Use parameterized queries/commands where applicable
- Implement appropriate access controls

#### Safe Execution
- Use subprocess management with timeouts
- Implement proper error handling
- Avoid eval() or similar dangerous functions
- Follow principle of least privilege

#### Privacy
- Don't log sensitive user data
- Respect user privacy
- Only access necessary resources
- Clear documentation of data usage

### Release Process

#### Version Numbers
- Follow [Semantic Versioning](https://semver.org/)
- Update version in package.json and manifest.json
- Update CHANGELOG.md

#### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version numbers bumped
- [ ] Extension tested in Claude Desktop
- [ ] Security review completed

## Getting Help

### Resources
- [DXT Specification](https://github.com/anthropics/dxt)
- [MCP Documentation](https://github.com/anthropics/mcp)
- [Claude Desktop Documentation](https://support.anthropic.com)

### Support Channels
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and community interaction
- **Email**: ai@robotmaker.eu for maintainer contact

### Development Questions
- Check existing issues and discussions first
- Provide minimal reproducible examples
- Include relevant system information
- Be specific about the problem

## Recognition

Contributors will be:
- Listed in the project's contributors section
- Credited in release notes for significant contributions
- Mentioned in the README for major features

Thank you for contributing to Claude Desktop Extensions! Your efforts help make AI assistance more powerful and accessible for everyone.

---

**Last Updated**: June 29, 2025
**Maintainer**: Colin Bacon (ai@robotmaker.eu)
