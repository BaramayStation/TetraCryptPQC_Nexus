
/**
 * TetraCryptPQC Extended Storage Types
 * 
 * This module defines extended types for secure infrastructure.
 */

import { 
  SecurityLevel, 
  ContainerStatus, 
  NodeType, 
  ThreatSeverity, 
  EncryptionType,
  SignatureType,
  SelfHealingStatus
} from './hsm-types';

// Hardware Security Module Types
export interface HSMType {
  id?: string;
  type: string;
  vendor: string;
  model: string;
  firmwareVersion: string;
  certificationLevel: 'FIPS-140-2' | 'FIPS-140-3' | 'Common Criteria';
}

// Secure Infrastructure Types
export interface SecureNodeConfig {
  nodeId: string;
  name: string;
  type: 'physical' | 'virtual' | 'container' | 'serverless';
  encryptionLevel: SecurityLevel;
  location: string;
  created: string;
  lastUpdated: string;
}

export interface SecurityOptions {
  level: SecurityLevel;
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
  securityLevel: SecurityLevel;
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
  type?: string;
  image?: string;
  version?: string;
  securityProfile?: string;
  securityOptions?: SecurityOptions;
  immutableRootfs?: boolean;
  confinement?: string;
  verifiedBoot?: boolean;
  integrityMonitoring?: boolean;
  networkPolicy?: {
    ingress: boolean;
    egress: boolean;
    allowedPorts: number[];
  };
  rotationPolicy?: {
    enabled: boolean;
    intervalDays: number;
    interval?: number;
    lastRotation?: string;
    triggerOnAnomaly?: boolean;
  };
  resources?: {
    cpu: string;
    memory: string;
    storage: string;
    cpuLimit?: string;
    memoryLimit?: string;
    storageLimit?: string;
  };
  status?: string;
  created?: string;
  lastUpdated?: string;
}

export interface SecureContainer {
  id: string;
  name: string;
  status: ContainerStatus;
  type?: string;
  securityProfile?: string;
  confinement?: string;
  networkPolicy?: string;
  resources?: {
    cpu: string;
    memory: string;
    storage: string;
  };
  createdAt?: string;
  expiresAt?: string;
  signatures?: {
    image: string;
    config: string;
  };
  verificationStatus?: string;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  type: NodeType;
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  ipAddress?: string;
  securityLevel: SecurityLevel;
  lastSeen?: string;
  hardwareCapabilities?: string[] | {
    tpm?: boolean;
    sgx?: boolean;
    sev?: boolean;
    nvdimm?: boolean;
    secureBoot?: boolean;
  };
  networkSecurity?: {
    firewallEnabled: boolean;
    encryptionEnabled: boolean;
    encryptionInTransit?: boolean;
    intrusionDetection?: boolean;
    ddosProtection?: boolean;
  };
  complianceStatus?: {
    compliant: boolean;
    frameworks: string[];
    fisma?: boolean;
    fedramp?: boolean;
    hipaa?: boolean;
    pci?: boolean;
    gdpr?: boolean;
  };
  confidentialComputing?: boolean;
  attestationSupport?: boolean;
  patchStatus?: string;
  threatLevel?: ThreatSeverity;
  lastScan?: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  services: string[];
  securityLevel?: SecurityLevel;
  encryptionEnabled?: boolean;
  mtlsEnabled?: boolean;
  zeroTrustEnabled?: boolean;
  aiMonitoringEnabled?: boolean;
  encryptionType?: string;
  mutualAuthentication?: boolean;
  certificateRotation?: boolean;
  trafficAnalysis?: boolean;
  anomalyDetection?: boolean;
  mtls?: boolean;
  zkProofVerification?: boolean;
  serviceDiscovery?: boolean;
  created?: string;
  lastUpdated?: string;
}

// AI and Local Backup Types
export interface LocalAIBackupConfig {
  id: string;
  name: string;
  encryptionType: EncryptionType;
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
    files?: string[];
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
  lastLocalSync?: string;
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: ContainerStatus;
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
  securityLevel?: string;
}

export interface AICloudConnectionStatus {
  id?: string;
  connected: boolean;
  lastConnectionAttempt: string;
  lastSuccessfulConnection: string;
  connectionType: 'direct' | 'proxy' | 'p2p' | 'relay';
  latency: number;
  encryptionStrength: SecurityLevel;
  securityVerified: boolean;
  connectionUptime?: number;
}

export interface WebRTCPeerStatus {
  id: string;
  address: string;
  connected: boolean;
  encryptionType: EncryptionType;
  signatureType: SignatureType;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  lastActivity: string;
  dataChannelsOpen: number;
  connectionStatus?: string;
  lastMessageTimestamp?: string;
  dataTransferred?: number;
}
