
/**
 * TetraCryptPQC Security Utilities
 * 
 * Security logging, monitoring, and utility functions for maintaining
 * a secure and auditable cryptographic environment.
 */

export interface SecurityEvent {
  eventType: 'storage' | 'crypto' | 'key-management' | 'identity' | 'authentication' | 'network' | 'application';
  operation: string;
  status: 'success' | 'failure' | 'warning';
  timestamp: string;
  metadata?: Record<string, any>;
}

// In-memory security event log for development/testing
// In production, this would be securely persisted and encrypted
const securityEventLog: SecurityEvent[] = [];

/**
 * Log a security event
 */
export function logSecurityEvent(event: SecurityEvent): void {
  // Add event to in-memory log
  securityEventLog.push(event);
  
  // In development, also log to console for debugging
  if (process.env.NODE_ENV === 'development') {
    const statusColor = 
      event.status === 'success' ? '#4CAF50' : 
      event.status === 'warning' ? '#FFC107' : 
      '#F44336';
    
    console.log(
      `%c[${event.timestamp}] ${event.eventType.toUpperCase()} ${event.operation} - ${event.status.toUpperCase()}`,
      `color: ${statusColor}; font-weight: bold;`
    );
    
    if (event.metadata) {
      console.log('%cMetadata:', 'color: #2196F3;', event.metadata);
    }
  }
  
  // In a real implementation, we would:
  // 1. Encrypt the event data
  // 2. Securely store in tamper-evident storage
  // 3. Potentially forward to a secure logging service
  // 4. Implement WORM (Write Once Read Many) storage for compliance
}

/**
 * Get all security events for a given time period
 */
export function getSecurityEvents(
  options?: {
    startTime?: string;
    endTime?: string;
    eventType?: SecurityEvent['eventType'];
    status?: SecurityEvent['status'];
  }
): SecurityEvent[] {
  let filteredEvents = [...securityEventLog];
  
  if (options?.startTime) {
    const startDate = new Date(options.startTime);
    filteredEvents = filteredEvents.filter(event => new Date(event.timestamp) >= startDate);
  }
  
  if (options?.endTime) {
    const endDate = new Date(options.endTime);
    filteredEvents = filteredEvents.filter(event => new Date(event.timestamp) <= endDate);
  }
  
  if (options?.eventType) {
    filteredEvents = filteredEvents.filter(event => event.eventType === options.eventType);
  }
  
  if (options?.status) {
    filteredEvents = filteredEvents.filter(event => event.status === options.status);
  }
  
  return filteredEvents;
}

/**
 * Check if secure context is available
 */
export function isSecureContext(): boolean {
  return window.isSecureContext;
}

/**
 * Format a security timestamp nicely
 */
export function formatSecurityTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Generate a random secure token
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Sanitize potentially sensitive data for logging
 */
export function sanitizeSensitiveData(data: Record<string, any>): Record<string, any> {
  const sanitized = { ...data };
  
  // List of keys that might contain sensitive information
  const sensitiveKeys = [
    'password', 'privateKey', 'secret', 'token', 'key', 'passphrase',
    'seed', 'mnemonic', 'auth', 'credentials', 'pin', 'biometric'
  ];
  
  // Recursively sanitize objects
  Object.keys(sanitized).forEach(key => {
    // Check if this is a sensitive key
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    } 
    // Recursively sanitize nested objects
    else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeSensitiveData(sanitized[key]);
    }
  });
  
  return sanitized;
}
