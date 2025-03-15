
export type SecurityThreshold = "secure" | "suspicious" | "compromised" | "normal" | "elevated";
export type HealthStatus = "healthy" | "degraded" | "unhealthy" | "warning";
export type AISyncStatus = "syncing" | "complete" | "failed" | "pending" | "idle" | "verified";

export interface SecurityHealthMetrics {
  threatDetectionsLast24h: number;
  activeThreats: number;
  patchLevel: number;
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  };
  securityScore: number;
  overallScore?: number;
  activeUsers?: number;
  complianceScore?: number;
  threatDetectionRate?: number;
  threatDetectionLatency?: number;
  incidentResponseTime?: number;
  falsePositiveRate?: number;
  lastUpdated?: string;
  recommendedActions?: string[];
  cpuUsage?: number;
  memoryUsage?: number;
  storageUsage?: number;
  networkUsage?: number;
  detectionRate?: number;
  mitigationRate?: number;
  remediationSteps?: string[];
}

export interface AISecurityPolicy {
  enabled: boolean;
  automatedResponse: boolean;
  threatLevel: "high" | "medium" | "low";
  scanFrequency: number;
  mlModelVersion: string;
  lastUpdated: string;
  homomorphicEncryptionEnabled?: boolean;
  zeroKnowledgeAuthEnabled?: boolean;
  autoRemediationEnabled?: boolean;
  threatDetectionLevel?: "standard" | "enhanced" | "maximum";
  id?: string;
  name?: string;
  policyType?: "detection" | "prevention" | "monitoring";
  rules?: SecurityRule[];
  created?: string;
  updated?: string;
}

export interface SecurityRule {
  id: string;
  name: string;
  priority: number;
  condition: string;
  action: "alert" | "block" | "quarantine";
  enabled: boolean;
}

export interface AICloudConnectionStatus {
  connected: boolean;
  latency: number;
  lastConnection: string;
  status: "online" | "offline" | "degraded";
  securityStatus: SecurityThreshold;
  lastConnectionAttempt?: string;
  id?: string;
  provider?: string;
  encryptionStatus?: "encrypted" | "unencrypted";
  connectionUptime?: number;
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: "running" | "stopped" | "error" | "provisioning"; 
  securityStatus: SecurityThreshold;
  image: string;
  created: string;
  ports: string[];
  securityLevel?: string;
  running?: boolean;
  healthStatus?: HealthStatus;
  uptime?: number;
  memoryUsageMB?: number;
  cpuUsagePercent?: number;
  restartCount?: number;
  lastRestart?: string;
  containerName?: string;
  rootless?: boolean;
}

export interface ContainerSecurityProfile {
  immutableRootfs: boolean;
  seccomp: boolean;
  apparmor: boolean;
  rootless: boolean;
  readOnly: boolean;
  privileged: boolean;
  capabilities: string[];
  securityScore?: number;
}

export enum InfrastructureNodeType {
  COMPUTE = "compute",
  STORAGE = "storage",
  NETWORK = "network",
  SECURITY = "security",
  AI = "ai",
  GENERAL = "general",
  APPLICATION = "application",
  KUBERNETES = "kubernetes",
  DOCKER = "docker"
}

export interface AIThreatDetection {
  id: string;
  severity: "high" | "medium" | "low";
  description: string;
  affectedComponents: string[];
  timestamp: string;
  mitigated: boolean;
  status: "active" | "mitigated" | "resolved";
  score: number;
  detailedAnalysis?: string;
  remediationSteps?: string[];
  mitigation?: string;
}

export interface WebRTCPeerStatus {
  id: string;
  status: "active" | "healing" | "healed" | "verified";
  lastActive: string;
  peerConnectionStatus: string;
  signatureVerified: boolean;
  signatureType?: string;
  peerId?: string;
  connectionStatus?: "connecting" | "connected" | "disconnected" | "failed";
  encryptionType?: string;
  lastMessageTimestamp?: string;
  dataTransferred?: number;
  encryptionEnabled?: boolean;
  latency?: number;
  integrityHash?: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: SecurityEventType;
  userId: string;
  resourceId?: string;
  operation: string;
  status: 'success' | 'failure' | 'blocked';
  metadata: Record<string, any>;
}

export type SecurityEventType = 
  | 'authentication' 
  | 'key-usage' 
  | 'data-access' 
  | 'system-change'
  | 'network-access'
  | 'cryptographic-operation';
