
/**
 * TetraCryptPQC Storage Types
 * 
 * This module defines types used across the TetraCrypt application.
 */

// Secure container configuration
export interface SecureContainerConfig {
  name?: string;
  type: string;  // This is required
  network?: {
    ingress: boolean;
    egress: boolean;
    allowedPorts: number[];
  };
  storage?: {
    persistent: boolean;
    encrypted: boolean;
    size: number;
  };
  resources?: {
    cpu: number;
    memory: number;
    gpu?: boolean;
  };
}

// Secure container
export interface SecureContainer {
  id: string;
  name: string;
  status: string;
  containerType: string;
  createdAt: string;
}

// Secure infrastructure node
export interface SecureInfraNode {
  nodeId: string;
  name: string;
  status: string;
  type: string;
  lastVerified: string;
}

// Secure service mesh
export interface SecureServiceMesh {
  id: string;
  name: string;
  endpoints: string[];
  status: string;
  createdAt: string;
}

// Secure node configuration
export interface SecureNodeConfig {
  nodeId?: string;
  name: string;
  type: string;
}

// Security options
export interface SecurityOptions {
  encryption: boolean;
  firewallEnabled: boolean;
  intrusionDetection: boolean;
  aiMonitoring?: boolean;
}

// Secure node
export interface SecureNode {
  nodeId: string;
  name: string;
  status: string;
  type: string;
  lastVerified: string;
}

// PQ-SCIF Environment
export interface PQSCIFEnvironment {
  id: string;
  name: string;
  operationalMode: 'tactical' | 'strategic' | 'enterprise';
  securityLevel: 'default' | 'sensitive' | 'ts-sci';
  aiCapabilities: string[];
  hardwareSecured: boolean;
  createdAt: string;
}

// Secure Channel
export interface SecureChannel {
  id: string;
  peerEndpoint: string;
  encryptionAlgorithm: string;
  signatureAlgorithm: string;
  established: string;
  lastActivity: string;
  status: 'active' | 'inactive' | 'compromised';
}

// Secure Command
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

// Contact
export interface Contact {
  id: string;
  displayName: string;
  userId: string;
  publicKeys: { // Changed from publicKey to publicKeys
    encryption: string;
    signature: string;
  };
  lastSeen?: string;
  status: 'online' | 'offline' | 'away';
  verified: boolean;
}

// Threat type for AI security
export interface Threat {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  detectedAt: string;
  status: 'active' | 'mitigated' | 'false-positive';
  source: string;
  targetSystem: string;
  mitigationSteps?: string[];
}

// AI Secured Cloud Instance
export interface AISecuredCloudInstance {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'provisioning' | 'error';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  region: string;
  createdAt: string;
  lastHealthCheck: string;
  aiProtectionEnabled: boolean;
}

// Security Health Metrics
export interface SecurityHealthMetrics {
  uptime: number;
  incidents: number;
  threatsPrevented: number;
  lastScan: string;
  securityScore: number;
  patchStatus: 'up-to-date' | 'updates-available' | 'critical-updates-needed';
  lastUpdated?: string; // Added fields that were causing errors
  activeUsers?: number;
}

// AI Security Policy
export interface AISecurityPolicy {
  id: string;
  name: string;
  rules: string[];
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  aiThreatDetection: boolean;
  homomorphicEncryptionEnabled?: boolean; // Added field
}

// StarkNet ID
export interface StarkNetID {
  id: string;
  type: string;
  address: string;
  starkKey: string; // Added field
  created: string;
  publicKey: string; // Added fields
  controller: string;
  updated: string;
  verified: boolean;
}

// AI Sync Status
export enum AISyncStatus {
  SYNCED = 'synced',
  SYNCING = 'syncing',
  FAILED = 'failed',
  PENDING = 'pending'
}

// Podman Container Status
export interface PodmanContainerStatus {
  id: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  image: string;
  created: string;
  ports: number[];
  containerName?: string; // Added field
}

// AI Cloud Connection Status
export interface AICloudConnectionStatus {
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastConnection: string;
  errorMessage?: string;
  latency?: number;
  lastConnectionAttempt?: string; // Added field
}

// WebRTC Peer Status
export interface WebRTCPeerStatus {
  peerId: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastSeen: string;
  latency?: number;
  encryptionEnabled?: boolean; // Added field
}

// Extended AI Sync Status
export interface ExtendedAISyncStatus {
  id: string;
  lastCloudSync: string;
  lastLocalSync: string;
  pendingUploads: number;
  pendingDownloads: number;
  syncErrors: any[];
  cloudAvailable: boolean;
  p2pAvailable: boolean;
  offlineMode: boolean;
  lastError?: string;
  selfHealingAttempts: number;
  lastSelfHealingAction?: string;
  zkProofsVerified: number;
}

// Hardware Security Module Configuration
export interface HSMConfig {
  type: string;
  status: string;
  lastVerified?: string;
  id?: string;
  provider?: string; // Added field
}
