
/**
 * Enterprise Audit Logging System
 * Compliant with NIST SP 800-92 (Guide to Computer Security Log Management)
 */

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  result: 'success' | 'failure';
  userId: string;
  userName?: string;
  details: any;
  ipAddress?: string;
  userAgent?: string;
  severity: 'info' | 'warning' | 'critical';
}

// Enterprise audit log storage
const auditLogs: AuditLogEntry[] = [];

/**
 * Record a security-related event in the audit log
 */
export function recordAuditEvent(
  action: string,
  result: 'success' | 'failure',
  userId: string,
  details: any,
  severity: 'info' | 'warning' | 'critical' = 'info'
): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    action,
    result,
    userId,
    details,
    severity,
    ipAddress: '127.0.0.1', // In a real implementation, this would be the actual IP
    userAgent: navigator.userAgent,
  };
  
  // Store the audit log entry
  auditLogs.push(entry);
  
  // In a real implementation, this would also send to a secure logging service
  console.log(`🔐 Audit: [${severity.toUpperCase()}] ${action} - ${result}`);
  
  // For critical security events, we might want to take immediate action
  if (severity === 'critical') {
    console.warn(`⚠️ CRITICAL SECURITY EVENT: ${action} - ${details?.message || 'No details provided'}`);
    // In a real implementation, this might trigger notifications, etc.
  }
  
  return entry;
}

/**
 * Get all audit log entries, optionally filtered
 */
export function getAuditLog(
  filter?: {
    userId?: string,
    action?: string,
    result?: 'success' | 'failure',
    severity?: 'info' | 'warning' | 'critical',
    startDate?: Date,
    endDate?: Date
  }
): AuditLogEntry[] {
  if (!filter) return [...auditLogs];
  
  return auditLogs.filter(entry => {
    if (filter.userId && entry.userId !== filter.userId) return false;
    if (filter.action && entry.action !== filter.action) return false;
    if (filter.result && entry.result !== filter.result) return false;
    if (filter.severity && entry.severity !== filter.severity) return false;
    
    if (filter.startDate) {
      const entryDate = new Date(entry.timestamp);
      if (entryDate < filter.startDate) return false;
    }
    
    if (filter.endDate) {
      const entryDate = new Date(entry.timestamp);
      if (entryDate > filter.endDate) return false;
    }
    
    return true;
  });
}

/**
 * Generate a compliance report based on the audit log
 */
export function generateComplianceReport(
  startDate: Date,
  endDate: Date = new Date()
): any {
  // Get relevant audit logs
  const logs = getAuditLog({
    startDate,
    endDate
  });
  
  // Count events by type
  const actionCounts: Record<string, number> = {};
  const severityCounts = {
    info: 0,
    warning: 0,
    critical: 0
  };
  
  logs.forEach(log => {
    // Count by action
    if (!actionCounts[log.action]) {
      actionCounts[log.action] = 0;
    }
    actionCounts[log.action]++;
    
    // Count by severity
    severityCounts[log.severity]++;
  });
  
  // Calculate success/failure ratios
  const successCount = logs.filter(l => l.result === 'success').length;
  const failureCount = logs.filter(l => l.result === 'failure').length;
  
  // Generate the report
  return {
    reportId: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    summary: {
      totalEvents: logs.length,
      successRate: logs.length ? (successCount / logs.length) * 100 : 0,
      failureRate: logs.length ? (failureCount / logs.length) * 100 : 0,
      criticalEvents: severityCounts.critical,
      warningEvents: severityCounts.warning,
      infoEvents: severityCounts.info
    },
    actionBreakdown: actionCounts,
    complianceStatus: logs.some(l => l.severity === 'critical') ? 'Violations Detected' : 'Compliant',
    remediation: logs.some(l => l.severity === 'critical') 
      ? 'Critical security events detected. Review and address immediately.' 
      : 'No critical violations detected.',
    rawLogs: logs
  };
}

/**
 * Clear audit logs (for testing only - in a real system, logs would be immutable)
 */
export function clearAuditLogs(): void {
  while (auditLogs.length > 0) {
    auditLogs.pop();
  }
}
