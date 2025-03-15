
/**
 * TetraCryptPQC Hardware and Infrastructure Types
 */

export interface SecureContainerConfig {
  id: string;
  name: string;
  description?: string;
  status: "running" | "stopped" | "provisioning" | "failed";
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
  type: "application" | "storage" | "compute" | "network" | "security" | "general" | "ai" | "kubernetes" | "docker";
  created?: string;
  securityProfile?: string;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  description?: string;
  type: "application" | "storage" | "compute" | "network" | "security" | "general" | "ai" | "kubernetes" | "docker";
  status: "online" | "offline" | "degraded" | "provisioning";
  createdAt: string;
  updatedAt: string;
  securityScore: number;
  pqcEnabled: boolean;
  trustLevel: number;
  nodeId: string;
  lastVerified: string;
  created?: string;
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
  created?: string;
}

export interface HSMDevice {
  id: string;
  name: string;
  type: "tpm" | "yubikey" | "nitrokey" | "smartcard" | "military-grade";
  status: "active" | "inactive";
  firmwareVersion: string;
  serialNumber: string;
  encryptionAlgorithms: string[];
  pqcSupport: boolean;
  certifications: string[];
  lastChecked: string;
}

export type ContainerSecurityProfile = "standard" | "hardened" | "tpm-protected" | "sgx-enclave";

export interface DecentralizedStorageNode {
  id: string;
  type: "ipfs" | "filecoin" | "arweave" | "sia" | "starknet" | "satellite";
  status: "online" | "offline" | "syncing";
  storageCapacity: number;
  usedStorage: number;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  replicationFactor: number;
  location: string;
  lastSynced: string;
  healthStatus: "healthy" | "degraded" | "failed";
  publicKey: string;
}

export interface AirGappedBackup {
  id: string;
  createdAt: string;
  dataSize: number;
  encryptionAlgorithm: string;
  hashVerification: string;
  location: string;
  recoveryInstructions: string;
  backupType: "full" | "differential" | "incremental";
  mediaType: "optical" | "magnetic" | "solid-state" | "paper";
  expiryDate?: string;
  lastVerified?: string;
}

export interface SatelliteConnection {
  id: string;
  status: "active" | "inactive" | "standby";
  satelliteId: string;
  encryptionProtocol: string;
  bandwidthMbps: number;
  latencyMs: number;
  lastConnected: string;
  nextWindowStart: string;
  nextWindowEnd: string;
  orbitType: string;
  securityLevel: "standard" | "military" | "classified";
}

export interface EMPHardenedSystem {
  id: string;
  name: string;
  description: string;
  protectionLevel: "standard" | "military" | "nuclear";
  shieldingType: string;
  lastTestedDate: string;
  certifications: string[];
  backupPower: "battery" | "generator" | "hybrid";
  powerDurationHours: number;
  recoveryTimeMinutes: number;
  locationId: string;
}

export interface DeploymentEnvironment {
  id: string;
  name: string;
  type: "production" | "staging" | "development" | "backup" | "airgapped";
  provider: "aws" | "azure" | "gcp" | "onprem" | "hybrid" | "satellite";
  k8sVersion?: string;
  securityProfile: "standard" | "enhanced" | "military" | "classified";
  pqcEnabled: boolean;
  aiMonitoring: boolean;
  nodes: number;
  storage: number;
  network: "standard" | "isolated" | "air-gapped" | "mesh";
  lastDeployed: string;
  healthStatus: "healthy" | "degraded" | "failed";
}

export interface BackupJob {
  id: string;
  name: string;
  schedule: string;
  backupType: "full" | "differential" | "incremental";
  storageTargets: ("local" | "decentralized" | "cloud" | "airgapped")[];
  lastRun: string;
  nextRun: string;
  status: "idle" | "running" | "succeeded" | "failed";
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  compressionEnabled: boolean;
  retentionPeriodDays: number;
  dataSize?: number;
  errorMessage?: string;
}
