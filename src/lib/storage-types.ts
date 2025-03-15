
/**
 * Type Definitions for TetraCryptPQC
 * Contains all the types used across the application
 */

// Security Types
export type SecurityEventType = 'authentication' | 'authorization' | 'network' | 'cryptography' | 'data' | 'system' | 'user' | 'other';
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface AIThreatDetection {
  id: string;
  threatType: 'anomaly' | 'malware' | 'intrusion' | 'data_leak' | 'ddos' | 'ransomware' | 'other';
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  sourceIp?: string;
  targetSystem?: string;
  mitigated: boolean;
  score: number;
  remediationSteps?: string[];
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: SecurityEventSeverity;
  timestamp: string;
  description: string;
  sourceIp?: string;
  userId?: string;
  systemComponent?: string;
  resolved: boolean;
  resolutionTimestamp?: string;
  resolutionNotes?: string;
  data?: Record<string, any>;
}

export interface AISecurityPolicy {
  id: string;
  name: string;
  description: string;
  policyType: 'detection' | 'prevention' | 'response';
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  automatedResponse: boolean;
  mlModelVersion: string;
  zeroKnowledgeAuthEnabled: boolean;
}

// Infrastructure Types
export type InfrastructureNodeType = 'storage' | 'network' | 'application' | 'compute' | 'general' | 'ai' | 'kubernetes' | 'docker' | 'security';

export interface SecureContainerConfig {
  id: string;
  name: string;
  description: string;
  type: InfrastructureNodeType;
  status: 'running' | 'stopped' | 'error' | 'provisioning';
  created: string;
  lastUpdated: string;
  securityStatus: 'secure' | 'warning' | 'vulnerable';
  securityScore: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface ContainerSecurityProfile {
  immutableRootfs: boolean;
  seccomp: boolean;
  appArmor: boolean;
  selinux: boolean;
  privileged: boolean;
  userNamespace: boolean;
  readOnlyFs: boolean;
  securityScore: number;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  type: string;
  status: 'offline' | 'online' | 'provisioning' | 'degraded';
  ip: string;
  region: string;
  securityProfile: string;
  lastUpdated: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'degraded';
  nodes: string[];
  version: string;
  lastUpdated: string;
  mtls: boolean;
  trafficEncryption: boolean;
  securityPolicies: string[];
}

// Health and Security Metrics
export interface SecurityThreshold {
  warning: number;
  critical: number;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'critical';
  lastUpdated: string;
}

export interface SecurityHealthMetrics {
  threatLevel: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  patchStatus: number;
  encryptionStrength: number;
  accessControlScore: number;
  authenticationScore: number;
  dataProtectionScore: number;
  networkSecurityScore: number;
  updated: string;
}

// Security Rules and Connections
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

export interface AICloudConnectionStatus {
  connected: boolean;
  latency: number;
  lastConnected: string;
  encryptionEnabled: boolean;
  authenticationType: 'token' | 'certificate' | 'oauth' | 'mfa';
  nodeId: string;
  health: 'healthy' | 'degraded' | 'critical';
}

export interface AISyncStatus {
  lastSynced: string;
  syncState: 'synced' | 'syncing' | 'error' | 'disconnected';
  pendingChanges: number;
  errorCount: number;
  errorMessages: string[];
}

export interface PodmanContainerStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'created' | 'exited' | 'error';
  created: string;
  image: string;
  ports: string[];
  health: 'healthy' | 'unhealthy' | 'unknown';
  memory: number;
  cpu: number;
}

// Military Network Node Types
export interface UndergroundCommunicationNode {
  id: string;
  name: string;
  type: 'relay' | 'gateway' | 'endpoint' | 'cache';
  status: 'online' | 'offline' | 'compromised' | 'standby';
  location: {
    lat: number;
    lng: number;
    description: string;
    depth?: number; // For underground nodes
  };
  powerSource: 'grid' | 'battery' | 'solar' | 'nuclear' | 'hybrid';
  powerRemaining?: number; // Percentage
  emperShielded: boolean;
  lastContact: string;
  cryptoSuite: string;
  bandwidth: number; // Mbps
  storageCapacity: number; // GB
  connections: string[]; // IDs of connected nodes
}

export interface MilitaryMeshNetwork {
  id: string;
  name: string;
  nodes: string[]; // IDs of member nodes
  topology: 'mesh' | 'star' | 'hierarchical' | 'dynamic';
  encryptionLevel: 'top-secret' | 'secret' | 'confidential' | 'restricted' | 'unclassified';
  region: string;
  status: 'active' | 'offline' | 'compromised' | 'standby';
  redundancyFactor: number;
  created: string;
  lastActive: string;
  threatAssessment: 'low' | 'medium' | 'high' | 'critical' | 'unknown';
}

export interface QuantumSecureLink {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  keyExchangeMethod: 'qkd' | 'pqc' | 'hybrid';
  status: 'active' | 'inactive' | 'degraded';
  establishedAt: string;
  lastRotation: string;
  keyStrength: number;
  latency: number; // milliseconds
  bandwidthCapacity: number; // Mbps
  redundancyPath: boolean;
  threatDetection: boolean;
}

// Failsafe Systems
export interface AirGappedBackup {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'offline';
  lastBackup: string;
  storageType: 'optical' | 'magnetic' | 'solid-state' | 'paper' | 'crystal';
  encryptionMethod: string;
  locationStatus: 'secure' | 'unknown' | 'compromised';
  accessLevel: 'top-secret' | 'secret' | 'confidential' | 'restricted';
  retentionPeriod: number; // days
  dataClassification: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

export interface SatelliteConnection {
  id: string;
  name: string;
  orbitalPosition: string;
  status: 'connected' | 'disconnected' | 'degraded';
  encryptionEnabled: boolean;
  signalStrength: number; // percentage
  lastContact: string;
  bandwidth: number; // Mbps
  latency: number; // milliseconds
  dataTransferred: number; // MB
  nextPassTime?: string;
  threatAssessment: 'low' | 'medium' | 'high' | 'unknown';
}

export interface EMPHardenedSystem {
  id: string;
  name: string;
  type: 'communications' | 'storage' | 'processing' | 'power' | 'integrated';
  status: 'active' | 'standby' | 'offline' | 'maintenance';
  shieldingLevel: number; // 1-10
  lastTested: string;
  certificationLevel: string;
  backupPower: boolean;
  backupPowerRemaining?: number; // hours
  location: string;
  hardwareGeneration: string;
  testResults: {
    empSurvivability: number; // percentage
    dataIntegrity: number; // percentage
    recoveryTime: number; // minutes
  };
}

export interface DecentralizedStorageNode {
  id: string;
  nodeType: 'storage' | 'validator' | 'gateway' | 'archival';
  status: 'online' | 'offline' | 'syncing' | 'error';
  capacityTotal: number; // GB
  capacityUsed: number; // GB
  region: string;
  replicationFactor: number;
  dataAvailability: number; // percentage
  lastSeen: string;
  version: string;
  ipfsPeerId?: string;
  starknetContract?: string;
  encryptionEnabled: boolean;
  stakingAmount?: number;
  performanceScore: number; // 0-100
}

export interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'development' | 'testing' | 'staging' | 'production' | 'disaster-recovery';
  status: 'active' | 'inactive' | 'deploying' | 'failed';
  region: string;
  created: string;
  lastDeployment: string;
  resources: {
    compute: number; // vCPUs
    memory: number; // GB
    storage: number; // GB
    cost: number; // USD per hour
  };
  accessControl: {
    authMethod: string;
    rolesConfigured: boolean;
    mfaRequired: boolean;
  };
  compliance: {
    standards: string[];
    lastAudit: string;
    passRate: number; // percentage
  };
  aiSecurityEnabled: boolean;
}

// Crypto Keys 
export interface PQCKey {
  publicKey: string;
  privateKey: string;
  created: string;
  algorithm: string;
  strength: string;
  standard: string;
}

// WebRTC
export interface WebRTCPeerStatus {
  id: string;
  connected: boolean;
  candidates: number;
  negotiating: boolean;
  localDescription?: string;
  remoteDescription?: string;
  iceCandidates: number;
  lastUpdated: string;
  connectionState: string;
  latency: number;
}

// User Types
export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  historyCount: number;
  expiryDays: number;
  lockoutThreshold: number;
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  name: string;
  displayName: string;
  email?: string;
  keyPairs: {
    pqkem: PQCKey;
    signature: PQCKey;
  };
  settings: {
    theme: 'dark' | 'light' | 'system';
    notifications: boolean;
    twoFactorEnabled: boolean;
    dataRetentionDays: number;
  };
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  lastLogin: string;
  created: string;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  encrypted: boolean;
  signatureValid?: boolean;
  encryptionType?: string;
  integrityHash?: string;
}

export interface SecureChannel {
  id: string;
  name: string;
  participants: string[];
  created: string;
  lastActivity: string;
  encryptionLevel: string;
  messageCount: number;
  keyRotationInterval: number; // hours
  pqcEnabled: boolean;
  zeroKnowledgeProofEnabled: boolean;
}

export interface SecureChannelMetrics {
  id: string;
  channelId: string;
  messagesPerDay: number;
  averageResponseTime: number; // seconds
  activeParticipants: number;
  averageMessageSize: number; // bytes
  peakUsageTime: string;
  securityEvents: number;
  keyRotations: number;
  endToEndLatency: number; // milliseconds
}
