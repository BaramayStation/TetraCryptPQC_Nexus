
/**
 * TetraCryptPQC Storage Types
 */

// Core
export interface Contact {
  id: string;
  publicKeys: {
    encryption: string;
    signature: string;
  };
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  status?: 'online' | 'offline' | 'away';
  verified?: boolean;
  trustLevel?: 'low' | 'medium' | 'high';
  signatureKey?: string; // For backwards compatibility
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  encryptionType: string;
  signature?: string;
  verified?: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  encryptionType: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  keyPairs?: {
    pqkem: {
      publicKey: string;
      privateKey: string;
      created: string;
      algorithm: string;
    };
    signature: {
      publicKey: string;
      privateKey: string;
      created: string;
      algorithm: string;
    };
  };
  starkNetId?: StarkNetID;
  didDocument?: any;
  settings?: UserSettings;
  created: string;
  lastLogin?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  encryptionDefault: string;
  privacyLevel: 'standard' | 'high' | 'maximum';
  autoKeyRotation: boolean;
  keyRotationDays: number;
}

// AI Security Types
export interface SecurityHealthMetrics {
  securityScore: number;
  overallScore: number;
  threatDetectionRate: number;
  threatDetectionLatency: number;
  incidentResponseTime: number;
  falsePositiveRate: number;
  complianceScore: number;
  lastUpdated: string;
  vulnerabilities?: {
    high: number;
    medium: number;
    low: number;
  };
  recommendedActions?: string[];
}

export interface Threat {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'mitigated' | 'false-positive' | 'resolved';
  description: string;
  source?: string;
  target?: string;
  timestamp?: string;
  type?: string;
  mitigationSteps?: string[];
  details?: Record<string, any>;
}

export interface AISecurityPolicy {
  id: string;
  name: string;
  policyType: 'detection' | 'prevention' | 'monitoring';
  enabled: boolean;
  autoRemediationEnabled?: boolean;
  rules: SecurityRule[];
  created: string;
  updated: string;
}

export interface SecurityRule {
  id: string;
  name: string;
  priority: number;
  condition: string;
  action: 'alert' | 'block' | 'quarantine';
  enabled: boolean;
}

export interface AISecuredCloudInstance {
  id: string;
  name: string;
  instanceType: 'compute' | 'storage' | 'network';
  status: 'running' | 'stopped' | 'error';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  securityFeatures: string[];
  healthStatus?: 'healthy' | 'degraded' | 'unhealthy';
  threatStatus?: 'secure' | 'suspicious' | 'compromised';
  metrics?: SecurityHealthMetrics;
  homomorphicEncryptionEnabled?: boolean;
  ipfsStorageEnabled?: boolean;
  zeroKnowledgeAuthEnabled?: boolean;
  keyPairs?: {
    encryption: {
      algorithm: string;
      created: string;
    };
    signature: {
      algorithm: string;
      created: string;
    };
  };
  created: string;
  updated: string;
  lastUpdated?: string;
}

// Infrastructure Types
export interface SecureContainerConfig {
  id: string;
  name: string;
  type: 'general' | 'compute' | 'storage' | 'network' | 'ai';
  securityProfile: 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave';
  options?: {
    immutableRootfs?: boolean;
    seccompProfile?: string;
    rotationPolicy?: {
      enabled: boolean;
      intervalDays: number;
      triggerOnAnomaly: boolean;
    };
  };
}

export interface SecureContainer {
  id: string;
  name: string;
  status: 'created' | 'running' | 'stopped' | 'error';
  containerType?: string;
  createdAt: string;
  startedAt?: string;
  stoppedAt?: string;
}

export interface SecureInfraNode {
  nodeId: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  type: 'compute' | 'storage' | 'network' | 'kubernetes' | 'docker';
  lastVerified: string;
}

export interface SecureNodeConfig {
  nodeId?: string;
  name: string;
  type: 'compute' | 'storage' | 'network' | 'kubernetes' | 'docker';
  securityProfile?: 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave';
}

export interface SecurityOptions {
  immutableFs?: boolean;
  seccompEnabled?: boolean;
  appArmorProfile?: string;
  selinuxEnabled?: boolean;
  encryptedStorage?: boolean;
}

export interface SecureNode {
  nodeId: string;
  name: string;
  status: string;
  type: string;
  lastVerified: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  endpoints: string[];
  status: 'created' | 'active' | 'degraded' | 'offline';
  createdAt: string;
}

// StarkNet & Decentralized Types
export interface StarkNetID {
  id: string;
  type: string;
  address: string;
  starkKey: string;
  publicKey?: string;
  controller?: string;
  created: string;
  updated?: string;
  verified?: boolean;
}

export interface AISyncStatus {
  id: string;
  status: 'synced' | 'syncing' | 'error' | 'offline';
  lastSync: string;
  errorCount: number;
  nextScheduledSync: string;
  cloudAvailable?: boolean;
  p2pAvailable?: boolean;
  offlineMode?: boolean;
  lastCloudSync?: string;
  zkProofsVerified?: boolean;
  selfHealingAttempts?: number;
  lastSelfHealingAction?: string;
}

export interface AICloudConnectionStatus {
  id?: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnection: string;
  provider: string;
  encryptionStatus: 'encrypted' | 'unencrypted';
}

export interface WebRTCPeerStatus {
  id?: string;
  peerId: string;
  connectionStatus?: 'connecting' | 'connected' | 'disconnected' | 'failed';
  encryptionType: string;
  lastMessageTimestamp?: string;
  dataTransferred?: number;
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  running?: boolean;
  healthStatus?: 'healthy' | 'unhealthy';
  uptime?: number;
  memoryUsageMB?: number;
  cpuUsagePercent?: number;
  restartCount?: number;
  lastRestart?: string;
}

export interface LocalAIBackupConfig {
  id: string;
  enabled: boolean;
  backupPeriod: number;
  retentionPeriod: number;
  encryptionType: string;
  useStarkNetVerification: boolean;
  useIPFS: boolean;
  syncSettings: {
    autoSync: boolean;
    syncOnWifi: boolean;
    maxSyncSize: number;
  };
}
