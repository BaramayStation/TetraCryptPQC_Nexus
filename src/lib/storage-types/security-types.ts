
export type SecurityThreshold = "secure" | "suspicious" | "compromised" | "normal" | "elevated";
export type HealthStatus = "healthy" | "degraded" | "unhealthy" | "warning";
export type AISyncStatus = "syncing" | "complete" | "failed" | "pending" | "idle";

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
  activeUsers?: number; // Added optional field
}

export interface AISecurityPolicy {
  enabled: boolean;
  automatedResponse: boolean;
  threatLevel: "high" | "medium" | "low";
  scanFrequency: number;
  mlModelVersion: string;
  lastUpdated: string;
  homomorphicEncryptionEnabled?: boolean; // Added optional field
}

export interface AICloudConnectionStatus {
  connected: boolean;
  latency: number;
  lastConnection: string;
  status: "online" | "offline" | "degraded";
  securityStatus: SecurityThreshold;
  lastConnectionAttempt?: string; // Added optional field
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: "running" | "stopped" | "error" | "provisioning"; 
  securityStatus: SecurityThreshold;
  image: string;
  created: string;
  ports: string[];
  securityLevel?: string; // Added optional field
}

// Adding container security types
export interface ContainerSecurityProfile {
  immutableRootfs: boolean;
  seccomp: boolean;
  apparmor: boolean;
  rootless: boolean;
  readOnly: boolean;
  privileged: boolean;
  capabilities: string[];
}

export enum ContainerType {
  APPLICATION = "application",
  DATABASE = "database",
  CACHE = "cache",
  PROXY = "proxy",
  SECURITY = "security"
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

// AI Threat Detection type
export interface AIThreatDetection {
  id: string;
  severity: "high" | "medium" | "low";
  description: string;
  timestamp: string;
  mitigated: boolean;
  affectedComponents: string[];
  mitigation?: string;
  score: number;
  detailedAnalysis?: string;
}

// Add WebRTC status types
export interface WebRTCPeerStatus {
  id: string;
  status: "active" | "healing" | "healed" | "verified";
  lastActive: string;
  peerConnectionStatus: string;
  signatureVerified: boolean;
  signatureType?: string;
}
