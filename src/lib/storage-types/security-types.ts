
/**
 * TetraCryptPQC Security Type Definitions
 */

export type SecurityEventType = 'authentication' | 'authorization' | 'network' | 'cryptography' | 'data' | 'system' | 'user' | 'other';
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface AIThreatDetection {
  id: string;
  threatType: 'anomaly' | 'malware' | 'intrusion' | 'data_leak' | 'ddos' | 'ransomware' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  sourceIp?: string;
  targetSystem?: string;
  mitigated: boolean;
  score: number;
  details: string;
  description: string;
  remediationSteps?: string[];
  indicators?: string[];
  detailedAnalysis?: string;
  affectedComponents?: string[];
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: SecurityEventSeverity;
  timestamp: string;
  description: string;
  sourceIp?: string;
  userId?: string;
  systemComponent?: string;
  resolved: boolean;
  resolutionTimestamp?: string;
  resolutionNotes?: string;
  data?: Record<string, any>;
  eventType?: string;
}

export interface AISecurityPolicy {
  id: string;
  name: string;
  description: string;
  policyType: 'detection' | 'prevention' | 'response';
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  automatedResponse: boolean;
  mlModelVersion: string;
  zeroKnowledgeAuthEnabled: boolean;
  scanFrequency?: number;
  lastUpdated?: string;
}

export interface SecureContainerConfig {
  id: string;
  name: string;
  description: string;
  type?: InfrastructureNodeType;
  status: 'running' | 'stopped' | 'error' | 'provisioning';
  created: string;
  lastUpdated: string;
  securityStatus: 'secure' | 'warning' | 'vulnerable' | 'compromised' | 'suspicious';
  securityScore: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  securityProfile?: ContainerSecurityProfile;
}

export interface ContainerSecurityProfile {
  immutableRootfs: boolean;
  seccomp: boolean;
  appArmor: boolean;
  selinux: boolean;
  privileged: boolean;
  userNamespace: boolean;
  readOnlyFs: boolean;
  securityScore: number;
}

export type InfrastructureNodeType = 'storage' | 'network' | 'application' | 'compute' | 'general' | 'ai' | 'kubernetes' | 'docker' | 'security';

export interface SecurityThreshold {
  warning: number;
  critical: number;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'critical';
  lastUpdated: string;
}

export interface SecurityHealthMetrics {
  threatLevel: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  patchStatus: number;
  encryptionStrength: number;
  accessControlScore: number;
  authenticationScore: number;
  dataProtectionScore: number;
  networkSecurityScore: number;
  updated: string;
  securityScore: number;
  patchLevel?: number;
  threatDetectionRate?: number;
  activeThreats?: number;
  recommendedActions?: string[];
  cpuUsage?: number;
  memoryUsage?: number;
  lastUpdated?: string;
  threatDetectionsLast24h?: number;
  detectionRate?: number;
}

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  enabled: boolean;
  conditions: any[];
  actions: any[];
  created: string;
  lastModified: string;
}

export interface AICloudConnectionStatus {
  connected: boolean;
  latency: number;
  lastConnected: string;
  encryptionEnabled: boolean;
  authenticationType: 'token' | 'certificate' | 'oauth' | 'mfa';
  nodeId: string;
  health: 'healthy' | 'degraded' | 'critical';
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'created' | 'exited' | 'error';
  created: string;
  image: string;
  ports: string[];
  health: 'healthy' | 'unhealthy' | 'unknown';
  memory: number;
  cpu: number;
}

export interface Threat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  target: string;
  description: string;
  mitigated: boolean;
  metadata?: Record<string, any>;
}
