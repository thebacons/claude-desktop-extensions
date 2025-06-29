# Windows Command MCP Server - Usage Examples

This document provides practical examples of how to use the Windows Command MCP Server extension with Claude Desktop.

## Basic Examples

### 1. File Operations

**Create a new directory:**
```
User: "Create a new folder called 'Projects' on my desktop"
Claude: Uses executeCommand with: mkdir "%USERPROFILE%\Desktop\Projects"
```

**List directory contents:**
```
User: "Show me what files are in my Documents folder"
Claude: Uses executeCommand with: dir "%USERPROFILE%\Documents"
```

**Copy files:**
```
User: "Copy all .txt files from Downloads to Documents"
Claude: Uses executeCommand with: copy "%USERPROFILE%\Downloads\*.txt" "%USERPROFILE%\Documents\"
```

### 2. System Information

**Check system information:**
```
User: "What version of Windows am I running?"
Claude: Uses executeCommand with: systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
```

**Monitor running processes:**
```
User: "Show me the top 5 processes using the most CPU"
Claude: Uses executeCommand with: tasklist /fo table | sort /r /+5 | more +1 | head -6
```

**Check disk space:**
```
User: "How much free space do I have on my C: drive?"
Claude: Uses executeCommand with: dir C:\ /-c | find "bytes free"
```

### 3. Network Operations

**Test internet connectivity:**
```
User: "Check if I can reach Google"
Claude: Uses executeCommand with: ping google.com -n 4
```

**Show network configuration:**
```
User: "What's my IP address?"
Claude: Uses executeCommand with: ipconfig
```

**Check open network connections:**
```
User: "Show me active network connections"
Claude: Uses executeCommand with: netstat -an | find "ESTABLISHED"
```

### 4. Mathematical Calculations

**Basic arithmetic:**
```
User: "Calculate 15 * 23 + 7"
Claude: Uses calculate with: 15 * 23 + 7
Result: 352
```

**Complex expressions:**
```
User: "What's the square root of 1024?"
Claude: Uses calculate with: Math.sqrt(1024)
Result: 32
```

**Financial calculations:**
```
User: "Calculate compound interest: $5000 at 3.5% annually for 10 years"
Claude: Uses calculate with: 5000 * Math.pow(1 + 0.035, 10)
Result: $7052.99
```

### 5. Application Management

**Launch applications:**
```
User: "Open Notepad"
Claude: Uses executeCommand with: notepad
```

**Start system utilities:**
```
User: "Open Task Manager"
Claude: Uses executeCommand with: taskmgr
```

**Launch with parameters:**
```
User: "Open Calculator"
Claude: Uses executeCommand with: calc
```

## Advanced Examples

### 1. Development Workflows

**Git operations:**
```
User: "Check the status of my git repository in C:\Projects\MyApp"
Claude: Uses executeCommand with: cd /d "C:\Projects\MyApp" && git status
```

**Build and test:**
```
User: "Run npm install and then npm test in my project directory"
Claude: Uses executeCommand with: cd /d "C:\Projects\MyApp" && npm install && npm test
```

### 2. System Maintenance

**Clean temporary files:**
```
User: "Clean up temporary files"
Claude: Uses executeCommand with: del /q "%TEMP%\*.*" 2>nul
```

**Check system health:**
```
User: "Run a system file check"
Claude: Uses executeCommand with: sfc /scannow
```

### 3. Automated Tasks

**Batch file operations:**
```
User: "Rename all .txt files in Downloads to add today's date"
Claude: Uses executeCommand with: 
for %f in ("%USERPROFILE%\Downloads\*.txt") do ren "%f" "%~nf_2025-06-29%~xf"
```

**Scheduled tasks:**
```
User: "Create a scheduled task to backup my Documents folder daily"
Claude: Uses executeCommand with: 
schtasks /create /tn "Daily Backup" /tr "robocopy \"%USERPROFILE%\Documents\" \"D:\Backup\Documents\" /mir" /sc daily /st 02:00
```

### 4. Log Analysis

**Search Windows Event Log:**
```
User: "Find all error events from today"
Claude: Uses executeCommand with: 
wevtutil qe System /c:50 /rd:true /f:text /q:"*[System[TimeCreated[timediff(@SystemTime) <= 86400000] and Level=2]]"
```

**Check application logs:**
```
User: "Show recent application crashes"
Claude: Uses executeCommand with: 
wevtutil qe Application /c:20 /rd:true /f:text /q:"*[System[Level=2]]" | find "crash"
```

### 5. Performance Monitoring

**CPU usage over time:**
```
User: "Monitor CPU usage for 30 seconds"
Claude: Uses executeCommand with: 
typeperf "\Processor(_Total)\% Processor Time" -sc 30 -si 1
```

**Memory usage:**
```
User: "Show current memory usage"
Claude: Uses executeCommand with: 
wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /format:list
```

## Best Practices

### Command Safety
1. **Review before execution**: Always review commands before confirming
2. **Start simple**: Begin with read-only operations before modifying files
3. **Backup important data**: Create backups before running destructive operations
4. **Test in safe environment**: Try commands in test directories first

### Error Handling
1. **Check exit codes**: Commands return exit codes indicating success/failure
2. **Read error messages**: Pay attention to stderr output for troubleshooting
3. **Use safe paths**: Use quotes around paths with spaces
4. **Validate inputs**: Ensure file paths and parameters are correct

### Security Considerations
1. **Avoid sensitive data**: Don't include passwords or keys in commands
2. **Use relative paths**: When possible, use relative rather than absolute paths
3. **Validate sources**: Only run commands from trusted sources
4. **Principle of least privilege**: Run with minimum necessary permissions

## Troubleshooting

### Common Issues

**Command not found:**
```
Error: 'xyz' is not recognized as an internal or external command
Solution: Check if the application is installed and in PATH
```

**Access denied:**
```
Error: Access is denied
Solution: Run Claude Desktop as Administrator or check file permissions
```

**Timeout:**
```
Error: Command timed out after 30 seconds
Solution: Use shorter-running commands or break into smaller tasks
```

### Tips for Success

1. **Use full paths**: Specify complete file paths to avoid ambiguity
2. **Quote paths**: Use quotes around paths containing spaces
3. **Check syntax**: Verify command syntax before execution
4. **Test incrementally**: Break complex operations into smaller steps

---

These examples demonstrate the versatility and power of the Windows Command MCP Server. Remember to always prioritize safety and security when executing system commands.

For more information, see the [main documentation](README.md).
