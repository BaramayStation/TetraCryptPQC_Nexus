
export interface HardwareSecurityCapabilities {
  available: boolean;
  tpm: boolean;
  secureBoot: boolean;
  encryptedMemory: boolean;
  hardwareKeys: boolean;
  tpmAvailable?: boolean;
}

export interface HSMDevice {
  available: boolean;
  type: string;
  keyProtectionLevel: string;
  lastVerified: string;
  id?: string; // Added optional id field
}

// Add missing SecureContainerConfig
export interface SecureContainerConfig {
  id: string;
  name: string;
  description: string;
  status: "running" | "stopped" | "error" | "provisioning";
  createdAt: string;
  updatedAt: string;
  securityProfile: ContainerSecurityProfile;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  securityScore: number; // Added missing field
  image: string; // Added missing field
  immutableRootfs: boolean; // Added missing field
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  }; // Added missing field
}

// Add missing SecureServiceMesh
export interface SecureServiceMesh {
  id: string;
  name: string;
  description: string;
  status: "online" | "offline" | "degraded";
  createdAt: string;
  updatedAt: string;
  nodeCount: number;
  encryptionEnabled: boolean;
  pqcEnabled: boolean;
  securityScore: number; // Added missing field
  containers: number; // Added missing field
  mTLS: boolean; // Added missing field
  policyEnforcement: boolean; // Added missing field
}

// Add missing SecureInfraNode
export interface SecureInfraNode {
  id: string; // Added missing field
  name: string;
  description: string;
  type: "storage" | "general" | "compute" | "network" | "ai" | "application";
  status: "online" | "offline" | "degraded";
  createdAt: string;
  updatedAt: string;
  securityScore: number; // Added missing field
  pqcEnabled: boolean; // Added missing field
  trustLevel: number; // Added missing field
}
