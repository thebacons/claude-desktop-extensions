# 📊 SESSION MONITORING QUICK REFERENCE

## 🚀 **COPY-PASTE STARTUP COMMANDS**

### **For New Sessions - Initialize Immediately:**
```javascript
// Copy this entire block to analysis tool at start of session
class ActiveSessionTracker {
  constructor() {
    this.sessionId = '2025-06-30-session-' + Date.now();
    this.startTime = Date.now();
    this.currentMessage = 0;
    this.estimatedTokens = 0;
    this.limits = { tokens: 200000, messages: 50, timeMinutes: 120 };
    this.warningThresholds = { tokens: 160000, messages: 40, timeMinutes: 90 };
    this.logs = [];
  }
  
  updateMetrics(messageIncrement = 1, tokenIncrement = 2500) {
    this.currentMessage += messageIncrement;
    this.estimatedTokens += tokenIncrement;
    const sessionMinutes = Math.round((Date.now() - this.startTime) / 60000);
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${this.currentMessage} msgs, ${this.estimatedTokens} tokens, ${sessionMinutes} min`);
    console.log(`📊 Updated: ${this.currentMessage} msgs, ${this.estimatedTokens.toLocaleString()} tokens, ${sessionMinutes} min`);
    return this.checkWarnings();
  }
  
  checkWarnings() {
    const sessionMinutes = Math.round((Date.now() - this.startTime) / 60000);
    const warnings = [];
    if (this.estimatedTokens > this.warningThresholds.tokens) warnings.push('🟡 TOKEN WARNING');
    if (this.currentMessage > this.warningThresholds.messages) warnings.push('🟡 MESSAGE WARNING');
    if (sessionMinutes > this.warningThresholds.timeMinutes) warnings.push('🟡 TIME WARNING');
    if (warnings.length > 0) warnings.forEach(w => console.log(w));
    return warnings;
  }
  
  getHealthStatus() {
    const sessionMinutes = Math.round((Date.now() - this.startTime) / 60000);
    const tokenPercent = (this.estimatedTokens / this.limits.tokens) * 100;
    const messagePercent = (this.currentMessage / this.limits.messages) * 100;
    const timePercent = (sessionMinutes / this.limits.timeMinutes) * 100;
    const maxPercent = Math.max(tokenPercent, messagePercent, timePercent);
    
    console.log(`\n📊 SESSION HEALTH: ${new Date().toLocaleTimeString()}`);
    console.log(`Messages: ${this.currentMessage}/50 (${Math.round(messagePercent)}%)`);
    console.log(`Tokens: ${this.estimatedTokens.toLocaleString()}/200,000 (${Math.round(tokenPercent)}%)`);
    console.log(`Time: ${sessionMinutes}/120 min (${Math.round(timePercent)}%)`);
    
    if (maxPercent < 70) {
      console.log('Health: 🟢 HEALTHY - Continue confidently');
      return '🟢 HEALTHY';
    } else if (maxPercent < 90) {
      console.log('Health: 🟡 MONITOR - Watch closely, plan handoff');
      return '🟡 MONITOR';
    } else {
      console.log('Health: 🔴 CRITICAL - Immediate handoff needed');
      return '🔴 CRITICAL';
    }
  }
}

// Initialize tracker
window.sessionTracker = new ActiveSessionTracker();
console.log('✅ Session monitoring initialized and ready');
```

### **Regular Commands During Session:**
```javascript
// After each major interaction
window.sessionTracker.updateMetrics(1, 3000);  // 1 message, ~3000 tokens

// Check health anytime
window.sessionTracker.getHealthStatus();

// Check recent activity
console.log('Recent logs:', window.sessionTracker.logs.slice(-5));
```

## ⚡ **USAGE PATTERN**

### **Start of Session:**
1. Paste initialization code to analysis tool
2. Confirm with: `window.sessionTracker.getHealthStatus()`

### **During Session:**
1. After responses: `window.sessionTracker.updateMetrics(1, [estimated_tokens])`
2. Every 10-15 minutes: `window.sessionTracker.getHealthStatus()`
3. Before intensive work: Check health first

### **Token Estimation Guide:**
- **Simple response**: 1000-2000 tokens
- **Code/artifact**: 3000-5000 tokens  
- **Complex analysis**: 5000-8000 tokens
- **Large documentation**: 8000+ tokens

### **Warning Response:**
- **🟡 YELLOW**: Plan handoff after current task
- **🔴 RED**: Stop immediately, create handoff

## 🎯 **BENEFITS**

### **Zero Surprises:**
- Never hit limits unexpectedly
- Always know session health
- Proactive handoff planning

### **Perfect Continuity:**
- Timestamp all major decisions
- Track complex multi-phase work
- Seamless session transitions

### **Professional Tracking:**
- Real-time metrics
- Health indicators
- Automatic logging

---

**Remember**: This monitoring system is **revolutionary** - the first AI-native session management with real-time tracking and health indicators!

**Always initialize at session start for maximum protection.** 🛡️
