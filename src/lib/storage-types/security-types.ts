
/**
 * TetraCryptPQC Security Type Definitions
 * 
 * Type definitions for security-related data structures and events
 */

export type SecurityEventType = 'storage' | 'crypto' | 'key-management' | 'identity' | 'authentication' | 'network' | 'application';
export type SecurityLevel = 'top-secret' | 'secret' | 'confidential' | 'restricted' | 'unclassified';
export type SecurityStatus = 'success' | 'failure' | 'warning';

export interface SecurityEvent {
  eventType: SecurityEventType;
  operation: string;
  status: SecurityStatus;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AIThreatDetection {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
  source: string;
  status: 'active' | 'mitigated' | 'investigating' | 'resolved';
  affectedComponents: string[];
  mitigationApplied?: boolean;
  remediationSteps?: string[];
  quantumResistant: boolean;
}

export interface PQCThreatScanResult {
  threats: AIThreatDetection[];
  timestamp: string;
  scanDuration: number;
  systemsScanned: number;
  quantumVulnerabilities: number;
  classicalVulnerabilities: number;
}

export interface AISecurityPolicy {
  id: string;
  name: string;
  description: string;
  enforced: boolean;
  level: SecurityLevel;
  components: string[];
  lastUpdated: string;
  createdBy: string;
  pqcEnabled: boolean;
  zeroKnowledgeEnabled: boolean;
  aiAnomalyDetection: boolean;
  thresholds: {
    anomalyScore: number;
    threatSeverity: number;
    responseTime: number;
  };
}

export interface HardwareSecurityDevice {
  id?: string;
  available: boolean;
  type: string;
  keyProtectionLevel: string;
  lastVerified: string;
  status?: 'active' | 'inactive' | 'compromised';
}

export interface WebRTCPeerStatus {
  peerId: string;
  connected: boolean;
  encrypted: boolean;
  encryptionType: string;
  signatureVerified: boolean;
  lastSeen: string;
  pqcEnabled: boolean;
  latency?: number;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  status: 'offline' | 'online' | 'provisioning' | 'degraded';
  location: string;
  lastChecked: string;
  securityLevel: SecurityLevel;
  quantum: boolean;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  status: 'offline' | 'online' | 'active' | 'degraded' | 'created';
  nodes: SecureInfraNode[];
  connections: number;
  encryptionType: string;
  created: string;
  updated: string;
}

export type ContainerSecurityProfile = 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave';

export interface SecureContainerConfig {
  id: string;
  name: string;
  type: 'application' | 'storage' | 'compute' | 'network' | 'general' | 'ai' | 'kubernetes' | 'docker' | 'security';
  image: string;
  securityProfile: ContainerSecurityProfile;
  pqcEnabled: boolean;
  status: string;
  created: string;
  lastUpdated: string;
}

export interface DecentralizedStorageNode {
  id: string;
  name: string;
  type: 'ipfs' | 'filecoin' | 'arweave' | 'sia' | 'storj';
  status: 'online' | 'offline' | 'syncing';
  location: string;
  capacity: number;
  used: number;
  encryptionType: string;
  lastSynced: string;
  pqcEnabled: boolean;
}

export interface AirGappedBackup {
  id: string;
  name: string;
  created: string;
  size: number;
  files: number;
  encryptionType: string;
  verificationHash: string;
  location: string;
  status: 'valid' | 'pending-verification' | 'invalid';
}

export interface SatelliteConnection {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'intermittent';
  encryptionType: string;
  latency: number;
  lastContact: string;
  bandwidth: number;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
}

export interface EMPHardenedSystem {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'offline';
  shieldingLevel: 'military' | 'government' | 'commercial';
  powerBackup: boolean;
  autonomousDuration: number;
  lastTestedDate: string;
  location: string;
}

export interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'production' | 'staging' | 'testing' | 'development';
  status: 'active' | 'inactive' | 'deploying';
  securityLevel: SecurityLevel;
  containers: SecureContainerConfig[];
  nodes: SecureInfraNode[];
  created: string;
  lastDeployed: string;
}

export interface UndergroundCommunicationNode {
  id: string;
  name: string;
  depth: number;
  location: string;
  status: 'active' | 'standby' | 'offline';
  shieldingLevel: string;
  powerSource: 'grid' | 'autonomous' | 'hybrid';
  backupPowerRemaining: number;
  connectionCount: number;
  lastContactTimestamp: string;
}

export interface MilitaryMeshNetwork {
  id: string;
  name: string;
  classification: SecurityLevel;
  status: 'operational' | 'degraded' | 'offline';
  nodeCount: number;
  encryptionAlgorithm: string;
  signatureAlgorithm: string;
  resilience: number;
  lastSweepTimestamp: string;
  autonomousModeCapable: boolean;
}

export interface QuantumSecureLink {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  status: 'active' | 'inactive' | 'degraded';
  encryptionType: string;
  signatureType: string;
  bandwidthMbps: number;
  latencyMs: number;
  established: string;
  lastHealthCheck: string;
  pqcEnabled: boolean;
}
