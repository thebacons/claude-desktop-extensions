# Session Context Window Protection Protocol

## 🚨 **CRITICAL: ALWAYS CHECK BEFORE HIGH-OUTPUT COMMANDS**

### **Pre-Command Context Check**
Before ANY potentially lengthy operation:

1. **Estimate Current Context Usage**
2. **Assess Command Risk Level**  
3. **Choose Safe Execution Strategy**
4. **Maintain >100k Token Safety Buffer**

### **Context Estimation Formula**
```javascript
// Quick context check
const documents = [count];
const conversation = [message_count];
const documentTokens = documents * 1500;
const conversationTokens = conversation * 300;
const totalEstimate = documentTokens + conversationTokens;
const safetyBuffer = 200000 - totalEstimate;

console.log(`Current: ~${totalEstimate} tokens`);
console.log(`Buffer: ~${safetyBuffer} tokens`);
console.log(`Status: ${safetyBuffer > 100000 ? "✅ SAFE" : "⚠️ CAUTION"}`);
```

### **High-Risk Command Categories**

#### **🔴 EXTREME RISK (Manual/Blind Execution)**
- `ollama pull/install` - Massive download logs
- `npm install` with many packages - Verbose progress
- `docker build` - Build process logs
- `git clone large-repo` - Progress output
- Large file operations (>10MB files)

#### **🟡 MEDIUM RISK (Monitor Output)**
- `directory_tree` on large folders
- `search_files` with broad patterns
- Package manager updates
- Test suite execution

#### **🟢 LOW RISK (Direct Execution)**
- `git status/branch/log`
- Single file reads (<1MB)
- Simple calculations
- Configuration changes

### **Safe Execution Strategies**

#### **Strategy 1: Manual Execution**
```bash
# I provide command, you run separately:
"Please run: ollama pull llama2"
"Report: success/failure + any critical info"
```

#### **Strategy 2: Blind Execution** 
```bash
# Launch without monitoring (test needed):
start cmd /c "ollama pull llama2 > output.log 2>&1"
# Check results later via file read
```

#### **Strategy 3: Output Redirection**
```bash
# Redirect verbose output to files:
command > output.log 2>&1
# Read log file selectively
```

### **Context Recovery Procedures**

#### **If Context Window Fills**
1. **Save current state** to status files
2. **Create handoff prompt** with exact next steps
3. **Start new session** with context recovery
4. **Continue from saved state**

#### **Emergency Session Handoff**
```markdown
# EMERGENCY HANDOFF - CONTEXT FULL

## Immediate Context:
[Current task/command being executed]

## Next Steps:
1. [Specific next command]
2. [Expected outcome]  
3. [Integration requirements]

## Critical Files:
- [List modified files needing attention]

## Project Status:
[Current branch, deployment status, blockers]
```

---

## 📋 **SESSION STARTUP CHECKLIST**

### **Every Session Start:**
- [ ] Check current context window usage
- [ ] Review project status files
- [ ] Confirm git repository state
- [ ] Identify potentially high-output tasks
- [ ] Plan context-safe execution strategy

### **Before High-Risk Commands:**
- [ ] Estimate context usage impact
- [ ] Choose appropriate execution strategy
- [ ] Set up emergency handoff if needed
- [ ] Execute with monitoring

### **Continuous Monitoring:**
- [ ] Track token usage during session
- [ ] Watch for output volume warnings
- [ ] Prepare handoff if approaching limits
- [ ] Save critical state regularly

---

**Remember: Context window protection is critical for project continuity!**
