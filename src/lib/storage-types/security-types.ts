
/**
 * TetraCryptPQC Security Type Definitions
 */

// Security Types
export type SecurityEventType = 'authentication' | 'authorization' | 'network' | 'cryptography' | 'data' | 'system' | 'user' | 'other';
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

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
  eventType?: string; // Added for compatibility
  operation?: string; // Added for compatibility
  status?: string;  // Added for compatibility
  metadata?: Record<string, any>; // Added for compatibility
}

export interface AISecurityPolicy {
  id: string;
  name: string;
  description: string;
  policyType: 'detection' | 'prevention' | 'response';
  createdAt: string;
  updatedAt: string;
  enabled: boolean; // Added enabled property
  threatLevel: 'low' | 'medium' | 'high' | 'critical'; // Added threatLevel property
  automatedResponse: boolean; // Added automatedResponse property
  mlModelVersion: string; // Added mlModelVersion property
  zeroKnowledgeAuthEnabled: boolean;
  homomorphicEncryptionEnabled?: boolean; // Added for compatibility
  scanFrequency?: string; // Added for compatibility
}

// Infrastructure Types
export type InfrastructureNodeType = 'storage' | 'network' | 'application' | 'compute' | 'general' | 'ai' | 'kubernetes' | 'docker' | 'security';

export interface SecureContainerConfig {
  id: string;
  name: string;
  description?: string; // Added description property
  type: InfrastructureNodeType;
  status: 'running' | 'stopped' | 'error' | 'provisioning';
  created: string;
  lastUpdated: string;
  securityStatus: 'secure' | 'warning' | 'vulnerable';
  securityScore: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  image?: string; // Added image property
  pqcEnabled?: boolean; // Added pqcEnabled property
  securityProfile?: ContainerSecurityProfile; // Added securityProfile property
  immutableRootfs?: boolean; // Added immutableRootfs property
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

export interface SecureInfraNode {
  id: string;
  name: string;
  type: string;
  status: 'offline' | 'online' | 'provisioning' | 'degraded';
  ip: string;
  region: string;
  securityProfile: string;
  lastUpdated: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  created?: string; // Added created property
  securityScore?: number; // Added securityScore property
  pqcEnabled?: boolean; // Added pqcEnabled property
  trustLevel?: string; // Added trustLevel property
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'degraded';
  nodes: string[];
  version: string;
  lastUpdated: string;
  mtls: boolean;
  trafficEncryption: boolean;
  securityPolicies: string[];
  created?: string; // Added created property
  endpoints?: string[]; // Added endpoints property
  policyEnforcement?: boolean; // Added policyEnforcement property
  securityScore?: number; // Added securityScore property
}

// Health and Security Metrics
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
  securityScore?: number; // Added securityScore property
  patchLevel?: number; // Added patchLevel property
  activeThreats?: number; // Added activeThreats property
  cpuUsage?: number; // Added cpuUsage property
  memoryUsage?: number; // Added memoryUsage property
  lastUpdated?: string; // Added lastUpdated property
  threatDetectionRate?: number; // Added threatDetectionRate property
  recommendedActions?: string[]; // Added recommendedActions property
  mitigationRate?: number; // Added mitigationRate property
}

// Security Rules and Connections
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
  provider?: string; // Added provider property
  status?: string; // Added status property
  encryptionStatus?: string; // Added encryptionStatus property
  lastConnection?: string; // Added for compatibility
}

export interface AISyncStatus {
  lastSynced: string;
  syncState: 'synced' | 'syncing' | 'error' | 'disconnected';
  pendingChanges: number;
  errorCount: number;
  errorMessages: string[];
  id?: string; // Added for compatibility
  cloudAvailable?: boolean; // Added cloudAvailable property
  p2pAvailable?: boolean; // Added p2pAvailable property
  offlineMode?: boolean; // Added offlineMode property
  lastSelfHealingAction?: string; // Added lastSelfHealingAction property
  lastCloudSync?: string; // Added lastCloudSync property
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
  securityStatus?: string; // Added securityStatus property
}

// Mobile specific types
export interface WebRTCPeerStatus {
  id: string;
  connected: boolean;
  candidates: number;
  negotiating: boolean;
  localDescription?: string;
  remoteDescription?: string;
  iceCandidates: number;
  lastUpdated: string;
  connectionState: string;
  latency: number;
  peerId?: string; // Added peerId property
  connectionStatus?: string; // Added for compatibility with connectionState
  lastMessageTimestamp?: string; // Added lastMessageTimestamp property
  dataTransferred?: number; // Added dataTransferred property
}
