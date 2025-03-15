/**
 * TetraCryptPQC Security Utilities
 * 
 * Implements security utilities for secure storage
 */

import { SecurityEvent } from './storage-types';

// Keep a log of security events in memory
const securityEventLog: SecurityEvent[] = [];
const MAX_EVENT_LOG = 1000;

/**
 * Log a security event
 */
export function logSecurityEvent(event: SecurityEvent): void {
  // Add timestamp if not provided
  if (!event.timestamp) {
    event.timestamp = new Date().toISOString();
  }
  
  // Add to in-memory log
  securityEventLog.push(event);
  
  // Trim log if too large
  if (securityEventLog.length > MAX_EVENT_LOG) {
    securityEventLog.shift();
  }
  
  // Log to console for development
  console.log(`🔒 Security Event: ${event.eventType} / ${event.operation} - ${event.status}`);
}

/**
 * Get security events log
 */
export function getSecurityEvents(
  filter?: {
    eventType?: string;
    status?: 'success' | 'failure' | 'warning';
    fromTimestamp?: string;
    toTimestamp?: string;
  }
): SecurityEvent[] {
  if (!filter) return [...securityEventLog];
  
  return securityEventLog.filter(event => {
    if (filter.eventType && event.eventType !== filter.eventType) return false;
    if (filter.status && event.status !== filter.status) return false;
    if (filter.fromTimestamp && event.timestamp < filter.fromTimestamp) return false;
    if (filter.toTimestamp && event.timestamp > filter.toTimestamp) return false;
    return true;
  });
}

/**
 * Clear security events log
 */
export function clearSecurityEvents(): void {
  securityEventLog.length = 0;
}

/**
 * Get security statistics
 */
export function getSecurityStats(): {
  total: number;
  success: number;
  failure: number;
  warning: number;
  byEventType: Record<string, number>;
} {
  const stats = {
    total: securityEventLog.length,
    success: 0,
    failure: 0,
    warning: 0,
    byEventType: {} as Record<string, number>
  };
  
  securityEventLog.forEach(event => {
    if (event.status === 'success') stats.success++;
    if (event.status === 'failure') stats.failure++;
    if (event.status === 'warning') stats.warning++;
    
    if (event.eventType) {
      stats.byEventType[event.eventType] = (stats.byEventType[event.eventType] || 0) + 1;
    }
  });
  
  return stats;
}
