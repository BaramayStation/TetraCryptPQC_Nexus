
export interface SecureContainerConfig {
  id: string;
  name: string;
  description?: string;
  status: "running" | "stopped" | "error" | "provisioning";
  createdAt: string;
  updatedAt: string;
  securityProfile: {
    immutableRootfs: boolean;
    seccomp: boolean;
    apparmor: boolean;
    rootless: boolean;
    readOnly: boolean;
    privileged: boolean;
    capabilities: string[];
    securityScore?: number;
  };
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  securityScore: number;
  image: string;
  immutableRootfs: boolean;
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  };
  type: "application" | "security" | "storage" | "compute" | "network" | "general" | "ai" | "kubernetes" | "docker";
}

export interface SecureInfraNode {
  id: string;
  name: string;
  description?: string;
  type: "storage" | "compute" | "network" | "security" | "ai" | "general" | "application" | "kubernetes" | "docker";
  status: "online" | "offline" | "provisioning" | "degraded";
  createdAt: string;
  updatedAt: string;
  securityScore: number;
  pqcEnabled: boolean;
  trustLevel: number;
  nodeId: string;
  lastVerified: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "degraded";
  createdAt: string;
  updatedAt: string;
  nodeCount: number;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  securityScore: number;
  containers: number;
  mTLS: boolean;
  policyEnforcement: boolean;
  endpoints: string[];
}

export interface HSMDevice {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline" | "initializing";
  securityLevel: "FIPS-140-2" | "FIPS-140-3" | "CC-EAL4+" | "CC-EAL5+"; 
  vendor: string;
  model: string;
  firmwareVersion: string;
  lastVerified: string;
  availableSlots: number;
  totalSlots: number;
  supportedAlgorithms: string[];
  pqcEnabled: boolean;
}

export interface DecentralizedStorageNode {
  id: string;
  name: string;
  type: "ipfs" | "filecoin" | "arweave" | "sia" | "storj" | "swarm";
  status: "online" | "offline" | "syncing" | "degraded";
  storageCapacity: number; // GB
  usedStorage: number; // GB
  lastSynced: string;
  createdAt: string;
  replicationFactor: number;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  ipfsHash?: string;
  arweaveAddress?: string;
  endpoints: string[];
  networkLatency: number; // ms
}

export interface AirGappedBackup {
  id: string;
  name: string;
  status: "created" | "verified" | "expired" | "compromised";
  createdAt: string;
  lastVerifiedAt: string;
  expiresAt: string;
  size: number; // bytes
  files: number;
  encryptionType: "ML-KEM-1024" | "AES-256-GCM" | "ChaCha20-Poly1305" | "hybrid";
  verificationHash: string;
  backupLocation: string;
  securityLevel: "standard" | "enhanced" | "maximum";
  restoredCount: number;
  pqcProtected: boolean;
}

export interface SatelliteConnection {
  id: string;
  name: string;
  provider: "starlink" | "oneweb" | "starshield" | "iridium" | "inmarsat" | "classified";
  status: "connected" | "disconnected" | "degraded" | "maintenance";
  latency: number; // ms
  bandwidthUp: number; // Mbps
  bandwidthDown: number; // Mbps
  location: {
    latitude: number;
    longitude: number;
    elevation?: number;
  };
  lastConnected: string;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  antennaType: string;
  signalStrength: number; // dBm
  terminationPoint: string;
}

export interface EMPHardenedSystem {
  id: string;
  name: string;
  status: "operational" | "standby" | "testing" | "maintenance";
  lastTested: string;
  installationDate: string;
  shieldingLevel: "basic" | "enhanced" | "military" | "scif";
  protectionRating: "emp-1" | "emp-2" | "emp-3" | "emp-4" | "emp-5";
  components: string[];
  certifications: string[];
  maintenanceDue: string;
  pqcEnabled: boolean;
  backupPower: boolean;
  backupPowerDuration: number; // hours
  recoveryTime: number; // minutes
}

export interface DeploymentEnvironment {
  id: string;
  name: string;
  type: "scif" | "dumb" | "hardened-datacenter" | "field" | "mobile" | "satellite" | "underwater" | "subterranean";
  status: "active" | "inactive" | "compromised" | "classified";
  securityClearance: "confidential" | "secret" | "topsecret" | "sci" | "classified";
  location: string;
  connectionType: "air-gapped" | "filtered" | "direct" | "satellite" | "classified";
  nodes: number;
  devices: number;
  deploymentDate: string;
  lastSecurity: string;
  pqcEnabled: boolean;
  aiEnabled: boolean;
  contingencyProtocol: string;
}

export interface BackupJob {
  id: string;
  name: string;
  status: "scheduled" | "running" | "completed" | "failed";
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  target: {
    type: "local" | "ipfs" | "arweave" | "satellite" | "air-gapped";
    location: string;
  };
  dataSize: number; // bytes
  files: number;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  verificationHash: string;
  compressionEnabled: boolean;
  frequency: "hourly" | "daily" | "weekly" | "monthly" | "manual";
  retention: number; // days
  lastSuccess?: string;
}

export interface UndergroundCommunicationNode {
  id: string;
  name: string;
  type: "relay" | "gateway" | "mesh-node" | "backbone" | "edge";
  status: "online" | "offline" | "degraded" | "maintenance" | "compromised";
  location: {
    depth: number; // meters
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    facility: string;
  };
  communicationProtocols: ("lora" | "uhf" | "vlf" | "fiber" | "quantum-link" | "acoustic")[];
  backupPower: boolean;
  backupPowerDuration: number; // hours
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  empHardened: boolean;
  lastMaintenanceCheck: string;
  installationDate: string;
  connectivityStatus: "connected" | "isolated" | "fallback";
  supportedBandwidth: number; // Mbps
  autonomousOperation: boolean;
  aiEnabled: boolean;
}

export interface MilitaryMeshNetwork {
  id: string;
  name: string;
  classification: "unclassified" | "confidential" | "secret" | "top-secret" | "sci";
  status: "operational" | "degraded" | "compromised" | "standby";
  nodeCount: number;
  coverage: {
    underground: boolean;
    surface: boolean;
    aerial: boolean;
    maritime: boolean;
    space: boolean;
  };
  encryptionProtocols: string[];
  pqcEnabled: boolean;
  aiGovernance: boolean;
  autonomousOperation: boolean;
  backupSystems: boolean;
  resilienceScore: number; // 0-100
  lastSecurityAudit: string;
  emergencyProtocol: string;
  communicationLatency: number; // ms
  empHardened: boolean;
  decentralized: boolean;
}

export interface QuantumSecureLink {
  id: string;
  name: string;
  type: "ml-kem" | "falcon" | "dilithium" | "hybrid-pqc" | "qkd";
  status: "active" | "inactive" | "compromised" | "testing";
  endpoints: string[];
  establishedAt: string;
  lastKeyExchange: string;
  keyRotationInterval: number; // seconds
  encryptionStrength: string;
  throughput: number; // Mbps
  latency: number; // ms
  verificationMethod: "zk-proof" | "multi-sig" | "challenge-response" | "ai-verified";
  backupLinks: number;
  autonomousOperation: boolean;
  verifiedSecure: boolean;
}
