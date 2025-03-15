/**
 * TetraCryptPQC Storage Types
 * 
 * This module defines the core types used across the application for storage,
 * communication, and security operations.
 */

// Core communication types
export interface Contact {
  id: string;
  name: string;
  publicKeys: string[];
  status: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  displayName?: string;
  signatureKey?: string;
  address?: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  encrypted?: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: string;
  status?: "sent" | "delivered" | "read" | "failed";
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: "active" | "healing" | "compromised";
  webrtcSecured?: boolean;
  zkProofVerified?: boolean;
  didVerified?: boolean;
  starkNetValidated?: boolean;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  displayName: string;
  username: string;
  publicKey: string;
  privateKey: string;
  keyPairs?: {
    encryption?: {
      publicKey: string;
      privateKey: string;
    };
    signature?: {
      publicKey: string;
      privateKey: string;
    };
    pqkem?: {
      publicKey: string;
      privateKey: string;
      created: string;
      algorithm: string;
      strength: string;
      standard: string;
    };
  };
  didDocument?: any;
  hsmInfo?: any;
  qkdInfo?: any;
  signatureKey?: string;
  starkNetId?: string;
  lastActive?: string;
  created?: string;
  securityLevel?: 'standard' | 'enhanced' | 'maximum' | 'quantum' | 'advanced';
  updated?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

// Security and threat types
export interface Threat {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'mitigated' | 'investigating' | 'resolved';
  source?: string;
  details?: string;
  mitigation?: string[];
  type?: string;
  target?: string;
  mitigationSteps?: string[];
  affectedComponents?: string[];
}

export interface SecurityHealthMetrics {
  uptime: number;
  incidents: number;
  overallScore?: number;
  threatDetectionRate?: number;
  incidentResponseTime?: number;
  complianceScore?: number;
  threatDetectionLatency?: number;
  falsePositiveRate?: number;
  vulnerabilities?: Array<{
    id: string;
    severity: string;
    description: string;
    status: string;
    affectedComponents?: string[];
    remediationSteps?: string[];
  }>;
  recommendedActions?: string[];
  cpuUsage?: number;
  memoryUsage?: number;
  storageUsage?: number;
  networkUsage?: number;
  complianceScores?: Record<string, number>;
}

export interface AISecuredCloudInstance {
  id: string;
  name: string;
  status: string;
  region?: string;
  createdAt?: string;
  securityLevel?: 'standard' | 'enhanced' | 'maximum';
  threatStatus?: 'normal' | 'investigating' | 'compromised' | 'elevated';
  healthStatus?: 'healthy' | 'degraded' | 'critical' | 'warning';
  lastUpdated?: string;
  metrics?: SecurityHealthMetrics;
  homomorphicEncryptionEnabled?: boolean;
  ipfsStorageEnabled?: boolean;
  zeroKnowledgeAuthEnabled?: boolean;
}

export interface AISecurityPolicy {
  id: string;
  name: string;
  rules: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  autoRemediationEnabled?: boolean;
  threatDetectionLevel?: 'basic' | 'advanced' | 'maximum';
}

// Infrastructure types
export interface SecureContainerConfig {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  immutableRootfs?: boolean;
  rotationPolicy?: {
    enabled: boolean;
    intervalDays: number;
    lastRotation?: string;
    interval?: number;
  };
  network?: {
    ingress: boolean;
    egress: boolean;
    allowedPorts: number[];
  };
}

export interface SecureInfraNode {
  nodeId: string;
  name: string;
  status: string;
  type: string;
  lastVerified?: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  endpoints: string[];
  status: string;
  createdAt: string;
}

export interface SecureContainer {
  id: string;
  name: string;
  status: string;
  containerType: string;
  createdAt: string;
}

// Decentralized identity types
export interface StarkNetID {
  id: string;
  type: string;
  address: string;
  starkKey: string;
  created: string;
  publicKey: string;
  controller: string;
  updated: string;
  verified: boolean;
}

// PQ-SCIF specific types
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
  status: 'active' | 'inactive' | 'compromised';
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

// Types from local-ai-backup.ts
export type EncryptionType = 'ML-KEM-768' | 'ML-KEM-1024' | 'Hybrid';

export enum AISyncStatus {
  Synced = 'synced',
  Pending = 'pending',
  Failed = 'failed'
}

export interface PodmanContainerStatus {
  containerId: string;
  running: boolean;
  image: string;
  created: string;
  ports: number[];
  volumes: string[];
  rootless?: boolean;
  id?: string;
  healthStatus?: 'healthy' | 'unhealthy' | 'starting';
  uptime?: number;
  memoryUsageMB?: number;
  cpuUsagePercent?: number;
  restartCount?: number;
  lastRestart?: string;
}

export interface AICloudConnectionStatus {
  connected: boolean;
  lastPing: string;
  endpoint: string;
  encrypted: boolean;
  failoverActivated?: boolean;
  id?: string;
}

export interface WebRTCPeerStatus {
  connected: boolean;
  lastConnected: string;
  encrypted: boolean;
  peerId?: string;
  id?: string;
  connectionStatus?: 'connected' | 'disconnected' | 'connecting' | 'failed';
  lastMessageTimestamp?: string;
  dataTransferred?: number;
}

export interface LocalAIBackupConfig {
  backupId: string;
  name: string;
  config: string;
  createdAt: string;
  lastBackup: string;
  id?: string;
  tpmProtection?: boolean;
  starkNetVerification?: boolean;
  lastRestore?: string;
  syncStatus?: AISyncStatus;
  backups?: any[];
}

export interface AISecurityEvent {
  id: string;
  timestamp: string;
  eventType: string;
  severity: 'info' | 'warning' | 'critical';
  source: string;
  details: string;
  resolved: boolean;
}

export enum SecurityEventType {
  Authentication = 'authentication',
  KeyUsage = 'key-usage',
  DataAccess = 'data-access',
  SystemChange = 'system-change',
  NetworkAccess = 'network-access',
  CryptographicOperation = 'cryptographic-operation'
}

export interface SecureNodeConfig {
  nodeId: string;
  name: string;
  type: string;
  securityLevel: string;
}

export interface SecurityOptions {
  encryption: boolean;
  monitoring: boolean;
  autoRemediation: boolean;
}

export interface SecureNode {
  nodeId: string;
  name: string;
  status: string;
  type: string;
  lastVerified?: string;
  id?: string;
}
