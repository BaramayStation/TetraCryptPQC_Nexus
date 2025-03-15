
/**
 * TetraCryptPQC Decentralized Storage Type Definitions
 */

export interface DecentralizedStorageNode {
  id: string;
  nodeType: 'storage' | 'validator' | 'gateway' | 'archival';
  name?: string; // Added name property
  type?: string; // Added type property
  status: 'online' | 'offline' | 'syncing' | 'error';
  capacityTotal: number;
  capacityUsed: number;
  usedStorage?: number; // Added usedStorage property
  storageCapacity?: number; // Added storageCapacity property
  region: string;
  replicationFactor: number;
  dataAvailability: number;
  lastSeen: string;
  version: string;
  ipfsPeerId?: string;
  starknetContract?: string;
  encryptionEnabled: boolean;
  stakingAmount?: number;
  performanceScore: number;
  location?: string; // Added location property
  pqcEnabled?: boolean; // Added pqcEnabled property
  networkLatency?: number; // Added networkLatency property
  lastSynced?: string; // Added lastSynced property
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
  provider?: string; // Added provider property
  securityProfile?: string; // Added securityProfile property
}

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
  backupType?: string; // Added backupType property
  mediaType?: string; // Added mediaType property
  dataSize?: number; // Added dataSize property
  createdAt?: string; // Added createdAt property
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
  protectionLevel?: number; // Added protectionLevel property
  powerDurationHours?: number; // Added powerDurationHours property
  protectionRating?: number; // Added protectionRating property
  backupPowerDuration?: number; // Added backupPowerDuration property
  recoveryTime?: number; // Added recoveryTime property
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
  satelliteId?: string; // Added satelliteId property
  provider?: string; // Added provider property
  bandwidthDown?: number; // Added bandwidthDown property (alias for bandwidth)
  bandwidthUp?: number; // Added bandwidthUp property
  pqcEnabled?: boolean; // Added pqcEnabled property
  orbitType?: string; // Added orbitType property
  securityLevel?: string; // Added securityLevel property
  nextWindowStart?: string; // Added nextWindowStart property
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
  classification?: string; // Added classification property
  nodeCount?: number; // Added nodeCount property
  communicationLatency?: number; // Added communicationLatency property
  pqcEnabled?: boolean; // Added pqcEnabled property
  resilienceScore?: number; // Added resilienceScore property
  coverage?: Record<string, number>; // Added coverage property
}

export interface UndergroundCommunicationNode {
  id: string;
  name: string;
  type: 'relay' | 'gateway' | 'endpoint' | 'cache' | 'mesh-node' | 'backbone' | 'edge';
  status: 'online' | 'offline' | 'compromised' | 'standby';
  location: {
    lat: number;
    lng: number;
    description: string;
    depth?: number; // For underground nodes
    facility?: string; // Added facility property
  };
  powerSource: 'grid' | 'battery' | 'solar' | 'nuclear' | 'hybrid';
  powerRemaining?: number; // Percentage
  emperShielded: boolean;
  lastContact: string;
  cryptoSuite: string;
  bandwidth: number; // Mbps
  storageCapacity: number; // GB
  connections: string[]; // IDs of connected nodes
  communicationProtocols?: string[]; // Added communicationProtocols property
  supportedBandwidth?: number; // Added supportedBandwidth property
  empHardened?: boolean; // Added empHardened property
  aiEnabled?: boolean; // Added aiEnabled property
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
  name?: string; // Added name property
  type?: string; // Added type property
  endpoints?: string[]; // Added endpoints property
  keyRotationInterval?: number; // Added keyRotationInterval property
  verificationMethod?: string; // Added verificationMethod property
  backupLinks?: string[]; // Added backupLinks property
}
