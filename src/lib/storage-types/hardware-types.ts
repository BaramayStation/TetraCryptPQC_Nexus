
import { ContainerSecurityProfile, InfrastructureNodeType, SecurityThreshold } from './security-types';

export interface SecureContainerConfig {
  id: string;
  name: string;
  description?: string;
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
  type: "security" | "application" | "storage" | "compute" | "network" | "general" | "ai" | "kubernetes" | "docker";
  created?: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  description?: string;
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
  description?: string;
  type: InfrastructureNodeType;
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

export interface HSMDevice {
  id: string;
  type: "TPM" | "YubiKey" | "SmartCard" | "HSM" | "CloudHSM" | "SecureEnclave";
  model?: string;
  version?: string;
  firmware?: string;
  status: "active" | "inactive" | "error";
  capabilities: string[];
  securityLevel: "standard" | "high" | "maximum" | "enhanced";
  lastVerified: string;
  available: boolean;
  supportedAlgorithms: string[];
  keyProtectionLevel: string;
}
