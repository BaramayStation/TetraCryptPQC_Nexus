
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
  activeUsers?: number;
}

export interface AISecurityPolicy {
  enabled: boolean;
  automatedResponse: boolean;
  threatLevel: "high" | "medium" | "low";
  scanFrequency: number;
  mlModelVersion: string;
  lastUpdated: string;
  homomorphicEncryptionEnabled?: boolean;
}

export interface AICloudConnectionStatus {
  connected: boolean;
  latency: number;
  lastConnection: string;
  status: "online" | "offline" | "degraded";
  securityStatus: SecurityThreshold;
  lastConnectionAttempt?: string;
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
}
