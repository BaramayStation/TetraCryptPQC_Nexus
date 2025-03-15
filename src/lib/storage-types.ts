
/**
 * TetraCryptPQC Storage Types
 */

// Core
export interface Contact {
  id: string;
  publicKeys?: {
    encryption: string;
    signature: string;
  };
  name: string;
  displayName?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  status?: 'online' | 'offline' | 'away' | 'active' | 'inactive' | 'revoked';
  verified?: boolean;
  trustLevel?: 'low' | 'medium' | 'high';
  signatureKey?: string;
  publicKey?: string;
  userId?: string;
  algorithm?: string;
  created?: string;
  isContact?: boolean;
  messageCount?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  recipientId?: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  encryptionType: string;
  signature?: string;
  verified?: boolean;
  encrypted?: boolean;
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: 'active' | 'healing' | 'healed' | 'compromised' | 'verified';
  zkProofVerified?: boolean;
  didVerified?: boolean;
  starkNetValidated?: boolean;
  webrtcSecured?: boolean;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  encryptionType: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  pqcEnabled?: boolean;
}

export interface UserProfile {
  id: string;
  userId?: string;
  username: string;
  name?: string;
  displayName?: string;
  keyPairs?: {
    pqkem: {
      publicKey: string;
      privateKey: string;
      created: string;
      algorithm: string;
      strength: string;
      standard: string;
    };
    signature: {
      publicKey: string;
      privateKey: string;
      created: string;
      algorithm: string;
      strength: string;
      standard: string;
    };
    encryption?: {
      publicKey: string;
      privateKey: string;
      created: string;
      algorithm: string;
      strength: string;
      standard: string;
    };
  };
  starkNetId?: StarkNetID;
  didDocument?: any;
  settings?: UserSettings;
  created: string;
  lastLogin?: string;
  securityLevel?: 'standard' | 'high' | 'maximum' | 'enhanced';
  publicKey?: string;
  signatureKey?: string;
  hsmInfo?: {
    available: boolean;
    type: string;
    keyProtectionLevel: string;
    lastVerified: string;
    id?: string;
  };
  qkdInfo?: {
    available: boolean;
    lastExchange: string;
    keySize: number;
    securityLevel: string;
  };
  privateKey?: string;
  email?: string;
  securityScore?: number;
  devices?: string[];
  securityQuestions?: {
    question: string;
    answerHash: string;
  }[];
  pqcCapable?: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  encryptionDefault: string;
  privacyLevel: 'standard' | 'high' | 'maximum';
  autoKeyRotation: boolean;
  keyRotationDays: number;
  twoFactorAuth?: boolean;
  securityLevel?: 'standard' | 'enhanced' | 'high' | 'maximum';
  offlineMode?: boolean;
  homomorphicEncryption?: boolean;
  zeroKnowledgeProofs?: boolean;
  quantumResistanceLevel?: 'high' | 'maximum';
  biometricAuth?: boolean;
  hardwareKeyProtection?: boolean;
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
  cpuUsage?: number;
  memoryUsage?: number;
  storageUsage?: number;
  networkUsage?: number;
  threatDetectionsLast24h?: number;
  activeThreats?: number;
  patchLevel?: number;
  activeUsers?: number;
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
  threatDetectionLevel?: 'standard' | 'enhanced' | 'maximum';
  automatedResponse?: boolean;
  threatLevel?: "high" | "medium" | "low";
  scanFrequency?: number;
  mlModelVersion?: string;
  lastUpdated?: string;
  homomorphicEncryptionEnabled?: boolean;
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
  status: 'running' | 'stopped' | 'error' | 'provisioning';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  securityFeatures: string[];
  healthStatus?: 'healthy' | 'degraded' | 'unhealthy' | 'warning';
  threatStatus?: 'secure' | 'suspicious' | 'compromised' | 'normal' | 'elevated';
  metrics?: SecurityHealthMetrics;
  homomorphicEncryptionEnabled?: boolean;
  ipfsStorageEnabled?: boolean;
  zeroKnowledgeAuthEnabled?: boolean;
  keyPairs?: {
    encryption: {
      algorithm: string;
      created: string;
      publicKey?: string;
      privateKey?: string;
    };
    signature: {
      algorithm: string;
      created: string;
      publicKey?: string;
      privateKey?: string;
    };
  };
  created: string;
  updated: string;
  lastUpdated?: string;
  createdAt?: string;
  region?: string;
}

// Infrastructure Types
export interface SecureContainerConfig {
  id: string;
  name: string;
  type: 'general' | 'compute' | 'storage' | 'network' | 'ai' | 'application' | 'kubernetes' | 'docker';
  securityProfile: 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave' | ContainerSecurityProfile;
  options?: {
    immutableRootfs?: boolean;
    seccompProfile?: string;
    rotationPolicy?: {
      enabled: boolean;
      intervalDays: number;
      triggerOnAnomaly: boolean;
    };
  };
  status?: string;
  containerType?: string;
  startedAt?: string;
  createdAt?: string;
  description?: string;
  encryptionEnabled?: boolean;
  pqcEnabled?: boolean;
  securityScore?: number;
  image?: string;
  immutableRootfs?: boolean;
  vulnerabilities?: {
    high: number;
    medium: number;
    low: number;
  };
  created?: string;
  updatedAt?: string;
}

export interface SecureContainer {
  id: string;
  name: string;
  status: 'created' | 'running' | 'stopped' | 'error';
  containerType?: string;
  createdAt: string;
  startedAt?: string;
  stoppedAt?: string;
  type?: 'general' | 'compute' | 'storage' | 'network' | 'ai';
  securityProfile?: 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave';
}

export interface SecureInfraNode {
  nodeId: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  type: 'compute' | 'storage' | 'network' | 'kubernetes' | 'docker' | 'security' | 'ai' | 'general' | 'application';
  lastVerified: string;
  id?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  securityScore?: number;
  pqcEnabled?: boolean;
  trustLevel?: number;
  created?: string;
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
  status: 'online' | 'offline' | 'degraded';
  type: string;
  lastVerified: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  endpoints: string[];
  status: 'created' | 'active' | 'degraded' | 'offline' | 'online';
  createdAt: string;
  description?: string;
  updatedAt?: string;
  nodeCount?: number;
  encryptionEnabled?: boolean;
  pqcEnabled?: boolean;
  securityScore?: number;
  containers?: number;
  mTLS?: boolean;
  policyEnforcement?: boolean;
  created?: string;
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
  status: 'synced' | 'syncing' | 'error' | 'offline' | 'complete' | 'failed' | 'pending' | 'idle' | 'verified';
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
  lastLocalSync?: string;
  syncErrors?: any[];
}

export interface AICloudConnectionStatus {
  id?: string;
  status: 'connected' | 'disconnected' | 'error' | 'online' | 'offline' | 'degraded';
  lastConnection: string;
  provider: string;
  encryptionStatus: 'encrypted' | 'unencrypted';
  connected?: boolean;
  latency?: number;
  securityStatus?: SecurityThreshold;
  lastConnectionAttempt?: string;
}

export interface WebRTCPeerStatus {
  id?: string;
  peerId: string;
  connectionStatus?: 'connecting' | 'connected' | 'disconnected' | 'failed';
  encryptionType: string;
  lastMessageTimestamp?: string;
  dataTransferred?: number;
  encryptionEnabled?: boolean;
  status?: 'active' | 'healing' | 'healed' | 'verified';
  lastActive?: string;
  peerConnectionStatus?: string;
  signatureVerified?: boolean;
  signatureType?: string;
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'provisioning';
  running?: boolean;
  healthStatus?: 'healthy' | 'unhealthy' | 'warning';
  uptime?: number;
  memoryUsageMB?: number;
  cpuUsagePercent?: number;
  restartCount?: number;
  lastRestart?: string;
  containerName?: string;
  securityStatus?: SecurityThreshold;
  image?: string;
  created?: string;
  ports?: string[];
  securityLevel?: string;
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
  tpmProtection?: boolean;
  backupSchedule?: string;
  starkNetVerification?: boolean;
  lastBackup?: string;
  lastRestore?: string;
  backups?: any[];
  syncStatus?: AISyncStatus;
}

// Additional types for PQ-SCIF implementation
export interface PQSCIFEnvironment {
  id: string;
  name: string;
  operationalMode: 'tactical' | 'strategic' | 'enterprise';
  securityLevel: 'default' | 'sensitive' | 'ts-sci';
  aiCapabilities: string[];
  hardwareSecured: boolean;
  createdAt: string;
}

export interface SecureChannel {
  id: string;
  peerEndpoint: string;
  encryptionAlgorithm: string;
  signatureAlgorithm: string;
  established: string;
  lastActivity: string;
  status: 'active' | 'inactive' | 'failed';
}

export interface SecureCommand {
  id: string;
  commandPayload: string;
  issuedAt: string;
  status: 'pending' | 'executed' | 'failed' | 'rejected';
  authorization: string[];
  verification: {
    starkNetValidated: boolean;
    zkProofVerified: boolean;
    signatureValid: boolean;
  };
}

// Security Event Type for AI Security
export type SecurityEventType = 
  | 'authentication' 
  | 'key-usage' 
  | 'data-access' 
  | 'system-change'
  | 'network-access'
  | 'cryptographic-operation';

// Enhanced security status types
export type SecurityThreshold = "secure" | "suspicious" | "compromised" | "normal" | "elevated";
export type HealthStatus = "healthy" | "degraded" | "unhealthy" | "warning";

// Container security types
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

// Threat Detection type
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
