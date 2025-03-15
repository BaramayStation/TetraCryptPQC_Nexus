
/**
 * TetraCryptPQC Storage Types
 * 
 * This module defines core types for the storage system.
 */

// User Profile
export interface UserProfile {
  userId: string;
  id?: string; // Alias for userId to maintain compatibility
  name: string;
  username?: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  publicKey?: string; 
  privateKey?: string;
  signatureKey?: string;
  created: string;
  updated?: string;
  lastActive: string;
  keyPairs?: {
    pqkem?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      created: string;
      strength?: string;
      standard?: string;
    };
    signature?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      created: string;
      strength?: string;
      standard?: string;
    };
  };
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  securitySettings: {
    mfa: boolean;
    hardwareAuthentication: boolean;
    offlineMode: boolean;
    autoSync: boolean;
    keyRotationPeriod: number; // In days
  };
  didDocument?: {
    id: string;
    created: string;
    proof?: string;
    controller?: string;
    verificationMethod?: any[];
  };
  hsmInfo?: {
    type: string;
    status: string;
    lastVerified?: string;
  };
  qkdInfo?: {
    enabled: boolean;
    status: string;
  };
  starkNetId?: {
    id: string;
    address: string;
    verified: boolean;
  };
}

// Contact
export interface Contact {
  id: string;
  name: string;
  displayName?: string;
  avatar?: string;
  publicKeys: {
    encryption: string;
    signature: string;
  };
  publicKey?: string; // Legacy support
  signatureKey?: string; // Legacy support
  trusted: boolean;
  lastActive?: string;
  conversationId?: string;
  status?: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

// Message
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  encrypted: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: 'ML-KEM-1024' | 'Hybrid' | 'ChaCha20-Poly1305';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  
  // Additional fields for extended functionality
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: 'active' | 'healing' | 'compromised';
  webrtcSecured?: boolean;
  zkProofVerified?: boolean;
  didVerified?: boolean;
  starkNetValidated?: boolean;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
}

// Conversation
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  encryptionType: 'ML-KEM-1024' | 'Hybrid' | 'ChaCha20-Poly1305';
}

// Biometric Authentication Methods
export type BiometricMethod = 'face' | 'fingerprint' | 'voice' | 'iris' | 'behavior';

// Security Event Types
export type SecurityEventType = 
  | 'authentication' 
  | 'key-usage' 
  | 'data-access' 
  | 'system-change'
  | 'network-access'
  | 'cryptographic-operation'
  | 'audit';

// Threat Severity Levels
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical' | 'audit';

// AI Security Model Types
export type SecurityModelType = 'anomaly-detection' | 'intrusion-prevention' | 'threat-intelligence';

// AI-secured cloud instances
export interface AISecuredCloudInstance {
  id: string;
  name: string;
  status: 'provisioning' | 'running' | 'paused' | 'stopped' | 'error';
  region: string;
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  keyPairs: {
    encryption: {
      publicKey: string;
      privateKey: string;
    };
    signature: {
      publicKey: string;
      privateKey: string;
    };
  };
  createdAt: string;
  lastUpdated: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  threatStatus: 'normal' | 'elevated' | 'critical';
  homomorphicEncryptionEnabled: boolean;
  ipfsStorageEnabled: boolean;
  zeroKnowledgeAuthEnabled: boolean;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    storageUsage: number;
    networkUsage: number;
    activeUsers: number;
    lastUpdated: string;
  };
}

// Security health metrics
export interface SecurityHealthMetrics {
  overallScore: number;
  threatDetectionRate: number; // Percentage rate of successful detections
  threatDetectionLatency: number; // In milliseconds
  falsePositiveRate: number;
  incidentResponseTime: number; // In minutes
  complianceScore: number;
  complianceScores: Record<string, number>; // Individual compliance framework scores
  lastUpdated: string;
  vulnerabilities: {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    affectedComponents: string[];
    remediationSteps: string[];
    status: 'open' | 'mitigated' | 'resolved';
  }[];
  recommendedActions: string[];
}

// AI Security Policy
export interface AISecurityPolicy {
  id: string;
  name: string;
  autoRemediationEnabled: boolean;
  threatDetectionLevel: 'standard' | 'enhanced' | 'maximum';
  homomorphicEncryptionEnabled: boolean;
  zeroKnowledgeAuthEnabled: boolean;
  aiGovernanceLevel: 'standard' | 'enterprise' | 'maximum';
  complianceFrameworks: string[];
  offlineResilienceEnabled: boolean;
  autoKeyRotationEnabled: boolean;
  lastUpdated: string;
}

// Define Threat type for the MilitarySecurityDashboard
export interface Threat {
  id: string;
  timestamp: string;
  severity: ThreatSeverity;
  source: string;
  target: string;
  type: string;
  description: string;
  status: 'active' | 'mitigated' | 'resolved';
  mitigationSteps?: string[];
  indicators?: string[];
}

// Hardware Security Module Types
export interface HSMType {
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
}

export interface AISyncStatus {
  status: 'syncing' | 'synced' | 'failed' | 'offline';
  lastSyncAttempt: string;
  lastSuccessfulSync: string;
  syncProgress: number;
  errorMessage?: string;
  aiVerified: boolean;
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  image: string;
  created: string;
  ports: string[];
  healthCheck: 'passed' | 'failed' | 'none';
}

export interface AICloudConnectionStatus {
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
}
