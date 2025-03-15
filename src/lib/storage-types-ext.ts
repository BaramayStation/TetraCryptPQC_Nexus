
/**
 * TetraCryptPQC Extended Storage Types
 * 
 * This module defines extended types for secure infrastructure.
 */

// Hardware Security Module Types
export interface HSMType {
  id?: string;
  type: string;
  vendor: string;
  model: string;
  firmwareVersion: string;
  certificationLevel: 'FIPS-140-2' | 'FIPS-140-3' | 'Common Criteria';
}

// StarkNet Identity
export interface StarkNetID {
  id: string;
  address: string;
  publicKey: string;
  controller: string;
  created: string;
  updated: string;
  verified: boolean;
  type?: string;
}

// Secure Infrastructure Types
export interface SecureNodeConfig {
  nodeId: string;
  name: string;
  type: 'physical' | 'virtual' | 'container' | 'serverless';
  encryptionLevel: 'standard' | 'enhanced' | 'maximum';
  location: string;
  created: string;
  lastUpdated: string;
}

export interface SecurityOptions {
  level: 'standard' | 'enhanced' | 'maximum';
  aiEnhanced: boolean;
  postQuantumReady: boolean;
  hardwareSecurityEnabled: boolean;
  tpmVerified: boolean;
  zeroTrustEnabled: boolean;
}

export interface SecureNode {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'compromised';
  type: 'physical' | 'virtual' | 'container';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  lastHealthCheck: string;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    networkUsage: number;
  };
}

export interface SecureContainerConfig {
  id: string;
  name: string;
  image: string;
  version: string;
  securityOptions: SecurityOptions;
  resourceLimits: {
    cpu: number;
    memory: number;
    storage: number;
  };
  networkPolicy: {
    ingress: boolean;
    egress: boolean;
    allowedPorts: number[];
  };
  immutableRootfs?: boolean;
  confinement?: string;
  verifiedBoot?: boolean;
  integrityMonitoring?: boolean;
  rotationPolicy?: {
    enabled: boolean;
    intervalDays: number;
    lastRotation?: string;
  };
  resources?: {
    cpu: string;
    memory: string;
    storage: string;
  };
}

export interface SecureContainer {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  image: string;
  created: string;
  lastUpdated: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
}

export interface SecureInfraNode {
  id: string;
  name: string;
  type: 'kubernetes' | 'docker' | 'podman' | 'bare-metal';
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  ipAddress: string;
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  lastSeen: string;
  hardwareCapabilities?: string[];
  networkSecurity?: {
    firewallEnabled: boolean;
    encryptionEnabled: boolean;
  };
  complianceStatus?: {
    compliant: boolean;
    frameworks: string[];
  };
  confidentialComputing?: boolean;
  attestationSupport?: boolean;
  patchStatus?: string;
  threatLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  services: string[];
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  encryptionEnabled: boolean;
  mtlsEnabled: boolean;
  zeroTrustEnabled: boolean;
  aiMonitoringEnabled: boolean;
  encryptionType?: string;
}

// AI and Local Backup Types
export interface LocalAIBackupConfig {
  id: string;
  name: string;
  encryptionType: 'ML-KEM-768' | 'ML-KEM-1024' | 'Hybrid';
  storageLocation: string;
  compressionEnabled: boolean;
  backupSchedule: string;
  retentionPeriod: number;
  lastBackup: string;
  nextBackup: string;
  tpmProtection?: boolean;
  starkNetVerification?: boolean;
  backups?: Array<{
    id: string;
    timestamp: string;
    size: number;
    status: string;
  }>;
  lastRestore?: string;
  syncStatus?: AISyncStatus;
}

export interface AISyncStatus {
  id?: string;
  status: 'syncing' | 'synced' | 'failed' | 'offline';
  lastSyncAttempt: string;
  lastSuccessfulSync: string;
  syncProgress: number;
  errorMessage?: string;
  aiVerified: boolean;
  syncErrors?: string[];
  selfHealingAttempts?: number;
  lastSelfHealingAction?: string;
  cloudAvailable?: boolean;
  p2pAvailable?: boolean;
  offlineMode?: boolean;
  lastCloudSync?: string;
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  image: string;
  created: string;
  ports: string[];
  healthCheck: 'passed' | 'failed' | 'none';
  running?: boolean;
  healthStatus?: string;
  uptime?: number;
  memoryUsageMB?: number;
  cpuUsagePercent?: number;
  restartCount?: number;
  lastRestart?: string;
  containerName?: string;
}

export interface AICloudConnectionStatus {
  id?: string;
  connected: boolean;
  lastConnectionAttempt: string;
  lastSuccessfulConnection: string;
  connectionType: 'direct' | 'proxy' | 'p2p' | 'relay';
  latency: number;
  encryptionStrength: 'standard' | 'enhanced' | 'maximum';
  securityVerified: boolean;
}

export interface WebRTCPeerStatus {
  id: string;
  address: string;
  connected: boolean;
  encryptionType: 'ML-KEM-768' | 'ML-KEM-1024' | 'Hybrid';
  signatureType: 'Dilithium2' | 'Dilithium3' | 'Dilithium5';
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  lastActivity: string;
  dataChannelsOpen: number;
  connectionStatus?: string;
  lastMessageTimestamp?: string;
  dataTransferred?: number;
}
