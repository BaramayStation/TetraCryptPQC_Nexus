
// Type definitions for AI Security module

export type SecurityEventType = 'authentication' | 'encryption' | 'infrastructure' | 'verification' | 'system' | 'user';

export interface SecurityEvent {
  eventType: SecurityEventType;
  userId: string;
  operation: string;
  status: 'success' | 'failure' | 'warning';
  timestamp?: string;
  metadata?: Record<string, any>;
}

export interface ThreatDetectionResult {
  detected: boolean;
  score: number;
  threats: Threat[];
  recommendation: string;
}

export interface Threat {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  indicators: string[];
  mitigationSteps: string[];
}

export interface AISecurityConfig {
  homomorphicEncryption: boolean;
  anomalyDetection: boolean;
  threatPreventionMode: 'monitor' | 'prevent' | 'adaptive';
  confidentialComputing: boolean;
}
