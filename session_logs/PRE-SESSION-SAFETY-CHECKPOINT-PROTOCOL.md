# Pre-Session Safety Checkpoint Protocol

## 🛡️ **MANDATORY: Before ANY Extended Work Session**

### **Safety Checkpoint Command**
**Ask me to run:**
> **"Create a safety checkpoint before we start the session"**

### **What This Does**
1. **Saves current status** with timestamp to log file
2. **Documents exact project state** (git, agents, files)
3. **Records planned session goals** and risks
4. **Creates recovery point** if context window fills
5. **Enables instant session restart** from exact point

---

## 📝 **Safety Checkpoint Template**

```markdown
# SAFETY CHECKPOINT - [TIMESTAMP]

## 🔍 SESSION CONTEXT
- **Session Start**: [DateTime]
- **Context Usage**: ~X tokens (Y% of 200k limit)
- **Safety Buffer**: ~Z tokens remaining
- **Risk Assessment**: [LOW/MEDIUM/HIGH] for planned session

## 📊 PROJECT STATUS SNAPSHOT
- **Current Git Branch**: [branch name]
- **Working Directory**: [clean/X files changed]
- **Last Commit**: [commit hash and message]
- **Agent Deployment Status**:
  - Agent 1: [status]
  - Agent 2: [status]
  - Agent 3: [status]
  - Agent 4: [status]
  - Agent 5: [status]
  - Agent 6: [status]
  - Agent 7: [status]

## 🎯 PLANNED SESSION GOALS
- **Primary Objective**: [main goal]
- **Secondary Objectives**: [list]
- **Expected Duration**: [time estimate]
- **Risk Commands**: [high-output operations planned]

## ⚠️ RISK ASSESSMENT
- **High-Risk Operations**: [list commands that might fill context]
- **Mitigation Strategy**: [manual/blind execution plans]
- **Emergency Handoff Trigger**: [context threshold]
- **Critical Files to Save**: [list important work]

## 🔄 RECOVERY INFORMATION
- **Next Commands**: [exact next 3 steps]
- **Dependencies**: [what Agent X needs from Agent Y]
- **Integration Status**: [cross-agent coordination]
- **Blockers**: [current issues]

## 📋 CHECKPOINT SUCCESS CRITERIA
- [ ] Status logged with timestamp
- [ ] Git repository state documented
- [ ] Session goals clearly defined
- [ ] Risk mitigation strategies planned
- [ ] Recovery information complete

---

**Checkpoint Created**: [TIMESTAMP]
**Ready for Safe Session**: ✅
**Emergency Recovery**: File contains all needed context
```

---

## 🤖 **My Safety Checkpoint Response**

When you ask for a checkpoint, I'll:

1. **Run context window analysis**
2. **Check git repository status** 
3. **Document all agent states**
4. **Record planned session goals**
5. **Assess risk of planned operations**
6. **Create timestamped recovery file**
7. **Confirm safety to proceed**

---

## 🎯 **When to Create Checkpoints**

### **Mandatory Checkpoints**
- **Before deploying new agents**
- **Before any installs/downloads**
- **Before extended coding sessions**
- **Before complex git operations**
- **When switching between major tasks**

### **Recommended Checkpoints**  
- **Every 45 minutes of active work**
- **Before lunch/breaks** (in case of timeout)
- **When approaching 100k token usage**
- **Before experimental/risky operations**

---

## 📁 **Checkpoint File Management**

**Files Created:**
- `SAFETY-CHECKPOINT-[YYYY-MM-DD-HH-MM].md` - Timestamped checkpoint
- `CURRENT-SESSION-STATE.md` - Always current status
- `RECOVERY-INSTRUCTIONS.md` - Emergency handoff guide

**Automatic Cleanup:**
- Keep last 5 checkpoints
- Archive older ones to `/docs/checkpoints/`
- Git commit checkpoints for version history

---

## 🚀 **Usage Examples**

**Starting a new agent deployment:**
> "Create a safety checkpoint before we deploy Agent 2"

**Before risky operations:**
> "Safety checkpoint before Ollama integration attempt"

**Regular session protection:**
> "Create checkpoint - we've been working for an hour"

**Before complex tasks:**
> "Safety checkpoint before multi-agent coordination setup"

---

## 🔥 **Benefits**

1. **Zero Progress Loss**: Always have exact recovery point
2. **Instant Context Recovery**: File contains all needed info
3. **Risk Mitigation**: Plan dangerous operations safely  
4. **Session Continuity**: Seamless handoffs between sessions
5. **Project History**: Timestamped progress tracking

**This turns our MCP Orchestration Hub into a bulletproof development environment!** 🛡️
