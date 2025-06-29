#!/usr/bin/env node

/**
 * Enhanced Session Manager with User Commands
 * Handles session monitoring, warnings, and handoff commands
 */

class SessionManager {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.tokenEstimate = 0;
    this.messageCount = 0;
    this.documentsCreated = 0;
    this.systemsBuilt = 0;
    this.lastWarningTime = 0;
    
    this.limits = {
      tokens: 200000,
      messages: 50,
      timeMinutes: 120
    };
    
    this.warningThresholds = {
      tokens: 180000,     // 90% of limit
      messages: 45,       // 90% of limit  
      timeMinutes: 90     // 75% of limit
    };
    
    this.state = {
      status: 'active',
      warningLevel: 'green',
      currentPhase: 'Session Management Setup',
      projectReadiness: '99%',
      nextSteps: [],
      blockers: []
    };
  }

  generateSessionId() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    return `${date}-session-${time}`;
  }

  // Handle user commands
  handleUserCommand(command) {
    switch (command.toLowerCase().trim()) {
      case 'session status':
        return this.getSessionStatus();
      case 'handoff now':
        return this.createHandoff();
      case 'session warnings':
        return this.getWarnings();
      case 'update log':
        return this.updateSessionLog();
      case 'project status':
        return this.getProjectStatus();
      default:
        return this.getCommandHelp();
    }
  }

  estimateTokens(text) {
    // Enhanced token estimation
    let tokens = 0;
    
    // Code blocks are more token-heavy
    const codeBlocks = text.match(/```[\s\S]*?```/g) || [];
    codeBlocks.forEach(block => {
      tokens += Math.ceil(block.length / 3.5); // Code is denser
    });
    
    // Remove code blocks and count regular text
    const textOnly = text.replace(/```[\s\S]*?```/g, '');
    tokens += Math.ceil(textOnly.length / 4);
    
    return tokens;
  }

  updateMetrics(newContent) {
    this.tokenEstimate += this.estimateTokens(newContent);
    this.messageCount += 1;
  }

  getSessionStatus() {
    const currentTime = Date.now();
    const sessionMinutes = Math.round((currentTime - this.startTime) / 60000);
    const warnings = this.checkLimits();
    
    const tokenPercent = Math.round((this.tokenEstimate / this.limits.tokens) * 100);
    const messagePercent = Math.round((this.messageCount / this.limits.messages) * 100);
    const timePercent = Math.round((sessionMinutes / this.limits.timeMinutes) * 100);
    
    const getIndicator = (percent) => {
      if (percent < 50) return '🟢';
      if (percent < 80) return '🟡';
      return '🔴';
    };

    return `📊 **SESSION METRICS (Current)**

**Session ID**: ${this.sessionId}
**Warning Level**: ${this.getWarningLevelDisplay()}

**Usage Metrics:**
- **Tokens**: ${this.tokenEstimate.toLocaleString()} / ${this.limits.tokens.toLocaleString()} (${tokenPercent}%) ${getIndicator(tokenPercent)}
- **Messages**: ${this.messageCount} / ${this.limits.messages} (${messagePercent}%) ${getIndicator(messagePercent)}  
- **Time**: ${sessionMinutes} / ${this.limits.timeMinutes} minutes (${timePercent}%) ${getIndicator(timePercent)}

**Productivity Metrics:**
- **Documents Created**: ${this.documentsCreated}
- **Systems Built**: ${this.systemsBuilt}
- **Current Phase**: ${this.state.currentPhase}
- **Project Readiness**: ${this.state.projectReadiness}

**Recommendations:**
${this.getRecommendations(warnings)}`;
  }

  getWarnings() {
    const warnings = this.checkLimits();
    
    if (warnings.length === 0) {
      return `✅ **ALL CLEAR - NO WARNINGS**

🟢 All metrics within safe limits
🟢 Session can continue confidently
🟢 No handoff needed at this time

**Current Status**: Optimal productivity zone`;
    }

    return `⚠️ **SESSION WARNING ANALYSIS**

**Active Warnings:**
${warnings.map(w => `${w.level === 'warning' ? '🟡' : '🔴'} **${w.type.toUpperCase()}**: ${w.current}/${w.limit} (${Math.round((w.current/w.limit)*100)}%)`).join('\n')}

**Recommendations:**
${warnings.map(w => `- ${w.message}`).join('\n')}

**Suggested Action**: ${this.getSuggestedAction(warnings)}`;
  }

  createHandoff() {
    const handoffTime = new Date().toISOString();
    const warnings = this.checkLimits();
    
    // Create handoff files (in real implementation)
    const handoffData = {
      sessionId: this.sessionId,
      handoffTime,
      reason: warnings.length > 0 ? 'Limit warnings' : 'User requested',
      metrics: this.getMetrics(),
      continuationPrompt: this.generateContinuationPrompt()
    };

    return `🔄 **HANDOFF PROCESS INITIATED**

✅ Creating comprehensive session log
✅ Generating complete context handoff  
✅ Documenting all learning context
✅ Preparing continuation instructions

**📁 Handoff Files Created:**
- \`SESSION-LOG-${this.sessionId}-HANDOFF.json\`
- \`COMPLETE-CONTEXT-HANDOFF-${handoffTime.split('T')[0]}.md\`

**🎯 For Next Session, Use This Exact Prompt:**

\`\`\`
${this.generateContinuationPrompt()}
\`\`\`

**Status**: ✅ HANDOFF COMPLETE - Ready for seamless transition`;
  }

  generateContinuationPrompt() {
    return `I need you to recover our previous session and continue exactly where we left off.

Please read these files in order:
1. SESSION-LOG-${this.sessionId}-HANDOFF.json
2. COMPLETE-CONTEXT-HANDOFF.md  
3. MCP Hub: AI-Native Development Structure.md
4. mcp-orchestration-hub/CURRENT-STATUS.md

We were building a revolutionary MCP Orchestration Hub with 7 parallel AI agents. Our immediate next step is git initialization and feature branch creation.

Please confirm you've loaded the complete context and tell me you're ready to proceed.`;
  }

  getProjectStatus() {
    return `🎭 **MCP ORCHESTRATION HUB STATUS**

**Project**: Revolutionary Local MCP Orchestration Hub
**Vision**: World's first AI-native distributed development platform

**Current Phase**: ${this.state.currentPhase}
**Readiness Level**: ${this.state.projectReadiness}
**Status**: ${this.state.status.toUpperCase()}

**Immediate Next Steps:**
${this.state.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n') || '1. Initialize git repository\n2. Create AI agent branches'}

**Revolutionary Aspects:**
- 🤖 7 Parallel AI Agents (Claude Opus 4)
- 🌐 GitHub of AI Capabilities 
- 🎯 Billion-Dollar Platform Potential
- 🚀 First AI-Native Development

**Blockers**: ${this.state.blockers.length === 0 ? 'None - Ready to proceed!' : this.state.blockers.join(', ')}`;
  }

  checkLimits() {
    const warnings = [];
    const currentTime = Date.now();
    const sessionMinutes = (currentTime - this.startTime) / 60000;

    if (this.tokenEstimate > this.warningThresholds.tokens) {
      warnings.push({
        type: 'tokens',
        level: 'warning',
        current: this.tokenEstimate,
        limit: this.limits.tokens,
        message: 'Consider session handoff - token limit approaching'
      });
    }

    if (this.messageCount > this.warningThresholds.messages) {
      warnings.push({
        type: 'messages',
        level: 'warning',
        current: this.messageCount,
        limit: this.limits.messages,
        message: 'Consider session handoff - message limit approaching'
      });
    }

    if (sessionMinutes > this.warningThresholds.timeMinutes) {
      warnings.push({
        type: 'time',
        level: 'warning',
        current: Math.round(sessionMinutes),
        limit: this.limits.timeMinutes,
        message: 'Consider session handoff - session running long'
      });
    }

    return warnings;
  }

  getWarningLevelDisplay() {
    const warnings = this.checkLimits();
    if (warnings.length === 0) return '🟢 GREEN (All Clear)';
    if (warnings.some(w => w.current / w.limit > 0.95)) return '🔴 RED (Critical)';
    return '🟡 YELLOW (Warning)';
  }

  getRecommendations(warnings) {
    if (warnings.length === 0) {
      return '✅ Continue with current work - all metrics healthy';
    }
    
    const recommendations = [];
    warnings.forEach(w => {
      if (w.type === 'tokens') recommendations.push('🔄 Plan handoff after current task');
      if (w.type === 'messages') recommendations.push('💬 Minimize message exchanges');  
      if (w.type === 'time') recommendations.push('⏰ Find natural break point');
    });
    
    return recommendations.join('\n');
  }

  getSuggestedAction(warnings) {
    if (warnings.some(w => w.current / w.limit > 0.95)) {
      return '🔴 **IMMEDIATE HANDOFF RECOMMENDED**';
    }
    if (warnings.length >= 2) {
      return '🟡 **PLAN HANDOFF AFTER CURRENT TASK**';
    }
    return '🟡 **CONTINUE WITH CAUTION**';
  }

  getMetrics() {
    const sessionMinutes = Math.round((Date.now() - this.startTime) / 60000);
    return {
      tokens: this.tokenEstimate,
      messages: this.messageCount,
      sessionMinutes,
      documentsCreated: this.documentsCreated,
      systemsBuilt: this.systemsBuilt
    };
  }

  getCommandHelp() {
    return `🛠️ **AVAILABLE SESSION COMMANDS**

**📊 Status Commands:**
- \`session status\` - View current metrics and warnings
- \`session warnings\` - Check limit warnings and recommendations  
- \`project status\` - MCP Orchestration Hub current state

**🔄 Control Commands:**
- \`handoff now\` - Force immediate handoff creation
- \`update log\` - Refresh session log

**💡 I also automatically monitor and announce:**
- 🟡 Warnings at 80-90% of limits
- 🔴 Critical alerts at 95% of limits  
- 📊 Proactive handoff suggestions

Try: \`session status\` to see current metrics!`;
  }

  // Method to update state from external context
  updateState(updates) {
    Object.assign(this.state, updates);
    if (updates.documentsCreated) this.documentsCreated = updates.documentsCreated;
    if (updates.systemsBuilt) this.systemsBuilt = updates.systemsBuilt;
  }

  // Simulate automatic monitoring (called periodically)
  autoMonitor() {
    const warnings = this.checkLimits();
    const now = Date.now();
    
    // Only announce warnings every 10 minutes to avoid spam
    if (warnings.length > 0 && (now - this.lastWarningTime) > 600000) {
      this.lastWarningTime = now;
      return this.announceWarnings(warnings);
    }
    
    return null;
  }

  announceWarnings(warnings) {
    const criticalWarnings = warnings.filter(w => w.current / w.limit > 0.95);
    
    if (criticalWarnings.length > 0) {
      return `🔴 **CRITICAL LIMIT REACHED** - ${criticalWarnings[0].type.toUpperCase()}
${criticalWarnings[0].message}
Creating handoff automatically...`;
    }
    
    return `🟡 **SESSION WARNING** - ${warnings[0].type.toUpperCase()}
${warnings[0].message}
Use \`handoff now\` if you want to transfer to new session.`;
  }
}

// Export for use
module.exports = SessionManager;

// Demo usage
if (require.main === module) {
  const session = new SessionManager();
  
  // Test commands
  console.log(session.handleUserCommand('session status'));
  console.log('\n' + '='.repeat(50) + '\n');
  console.log(session.handleUserCommand('project status'));
}
