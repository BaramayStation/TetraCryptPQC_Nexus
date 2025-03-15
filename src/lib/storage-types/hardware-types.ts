
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
  securityScore: number;
  image: string;
  immutableRootfs: boolean;
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  };
}

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
  securityScore: number;
  containers: number;
  mTLS: boolean;
  policyEnforcement: boolean;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  description: string;
  type: "storage" | "general" | "compute" | "network" | "ai" | "application" | "security";
  status: "online" | "offline" | "degraded";
  createdAt: string;
  updatedAt: string;
  securityScore: number;
  pqcEnabled: boolean;
  trustLevel: number;
}

// Import ContainerSecurityProfile from security-types to prevent circular references
import { ContainerSecurityProfile } from './security-types';
