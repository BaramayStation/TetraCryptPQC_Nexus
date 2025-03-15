
export type ConnectionStatus = "degraded" | "disconnected" | "connected" | "active";
export type PodmanContainerStatus = "running" | "stopped" | "error" | "provisioning";
export type InfrastructureNodeType = "network" | "storage" | "application" | "compute" | "general" | "ai" | "kubernetes" | "docker" | "security";

export interface SecurityHealthMetrics {
  securityScore: number;
  activeThreats: number;
  patchLevel: string;
  threatLevel?: number;
  vulnerabilities?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  threatDetectionRate?: number;
  mitigationRate?: number;
  patchStatus?: number;
  encryptionStrength?: number;
  accessControlScore?: number;
  authenticationScore?: number;
  dataProtectionScore?: number;
  networkSecurityScore?: number;
  cpuUsage?: number;
  memoryUsage?: number;
  updated?: string;
  lastUpdated?: string;
  recommendedActions?: string[];
}

export interface AICloudConnectionStatus {
  connected: boolean;
  provider?: string;
  status: string;
  latency: number;
  encryptionStatus: string;
  lastConnected?: string;
  encryptionEnabled?: boolean;
  authenticationType?: 'token' | 'certificate' | 'oauth' | 'mfa';
  nodeId?: string;
  health?: 'healthy' | 'degraded' | 'critical';
}

export interface AISecurityPolicy {
  id?: string;
  name?: string;
  description?: string;
  policyType?: 'detection' | 'prevention' | 'response';
  createdAt?: string;
  updatedAt?: string;
  enabled: boolean;
  threatLevel: string;
  automatedResponse: boolean;
  mlModelVersion: string;
  zeroKnowledgeAuthEnabled?: boolean;
  homomorphicEncryptionEnabled?: boolean;
  scanFrequency?: number;
}

export interface SecurityThreshold {
  warning: number;
  critical: number;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'critical';
  lastUpdated: string;
}

export interface ContainerSecurityProfile {
  immutableRootfs: boolean;
  seccomp: boolean;
  appArmor?: boolean;
  selinux?: boolean;
  rootless?: boolean;
  readOnly?: boolean;
  privileged: boolean;
  capabilities?: string[];
  securityScore: number;
}

export interface SecureContainerConfig {
  id: string;
  name: string;
  description: string;
  status: "running" | "stopped" | "error" | "provisioning";
  created: string;
  lastUpdated: string;
  securityStatus: "secure" | "warning" | "vulnerable" | "compromised" | "suspicious";
  securityScore: number;
  type?: InfrastructureNodeType;
  image?: string;
  vulnerabilities?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  pqcEnabled?: boolean;
  immutableRootfs?: boolean;
  encryptionEnabled?: boolean;
  securityProfile?: ContainerSecurityProfile;
  createdAt?: string;
  updatedAt?: string;
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

export interface AISyncStatus {
  lastSynced: string;
  syncState: 'synced' | 'syncing' | 'error' | 'disconnected';
  pendingChanges: number;
  errorCount: number;
  errorMessages: string[];
  cloudAvailable?: boolean;
  p2pAvailable?: boolean;
  offlineMode?: boolean;
  lastSelfHealingAction?: string;
  lastCloudSync?: string;
  id?: string;
}

export interface WebRTCPeerStatus {
  id?: string;
  peerId?: string;
  connected: boolean;
  candidates: number;
  negotiating: boolean;
  localDescription?: string;
  remoteDescription?: string;
  iceCandidates: number;
  lastUpdated: string;
  connectionState: string;
  connectionStatus?: string;
  latency: number;
  lastMessageTimestamp?: string;
  dataTransferred?: number;
}

export interface Threat {
  id: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  target: string;
  type: string;
  description: string;
  status: "active" | "mitigated" | "resolved";
  mitigationSteps?: string[];
}

export interface AIThreatDetection {
  id: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  threatType?: string;
  details?: string;
  description?: string;
  sourceIp?: string;
  targetSystem?: string;
  mitigated?: boolean;
  score?: number;
  status?: string;
  mitigationSteps?: string[];
  indicators?: string[];
  detailedAnalysis?: string;
  affectedComponents?: string[];
}
