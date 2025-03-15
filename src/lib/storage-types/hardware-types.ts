
export interface HardwareSecurityCapabilities {
  available: boolean;
  tpm: boolean;
  secureBoot: boolean;
  encryptedMemory: boolean;
  hardwareKeys: boolean;
  tpmAvailable?: boolean;
  tpmVersion?: string;
  sgxAvailable?: boolean;
  sgxVersion?: string;
}

export interface HSMDevice {
  available: boolean;
  type: string;
  keyProtectionLevel: string;
  lastVerified: string;
  id?: string;
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
  type: "storage" | "compute" | "network" | "security" | "ai" | "general" | "application" | "kubernetes" | "docker";
  created?: string;
  startedAt?: string;
  containerType?: string;
  options?: {
    immutableRootfs?: boolean;
    seccompProfile?: string;
    rotationPolicy?: {
      enabled: boolean;
      intervalDays: number;
      triggerOnAnomaly: boolean;
    };
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
  endpoints: string[];
  created?: string;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  description: string;
  type: "storage" | "compute" | "network" | "security" | "ai" | "general" | "application" | "kubernetes" | "docker";
  status: "online" | "offline" | "degraded";
  createdAt: string;
  updatedAt: string;
  securityScore: number;
  pqcEnabled: boolean;
  trustLevel: number;
  nodeId: string;
  lastVerified: string;
  created?: string;
}

// Import ContainerSecurityProfile from security-types to prevent circular references
import { ContainerSecurityProfile } from './security-types';
