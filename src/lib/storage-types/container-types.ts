
export type ContainerType = "application" | "database" | "storage" | "security" | "compute";
export type ContainerSecurityProfile = "standard" | "hardened" | "tpm-protected" | "sgx-enclave";
export type InfrastructureNodeType = "compute" | "storage" | "network" | "kubernetes" | "docker";

export interface RotationPolicy {
  enabled: boolean;
  intervalDays: number;
  triggerOnAnomaly: boolean;
}

export interface SecureContainerConfig {
  id: string;
  name: string;
  type: ContainerType;
  securityProfile: ContainerSecurityProfile;
  status: "running" | "stopped" | "error" | "initializing";
  image: string;
  created: string;
  immutableRootfs?: boolean;
  rotationPolicy?: RotationPolicy;
  securityScore?: number;
  vulnerabilities?: number;
  trustLevel?: "high" | "medium" | "low";
}

export interface SecureContainer {
  id: string;
  name: string;
  type?: ContainerType;
  securityProfile: ContainerSecurityProfile;
  status: "running" | "stopped" | "error" | "initializing";
  image: string;
  created: string;
  immutableRootfs?: boolean;
  rotationPolicy?: RotationPolicy;
  securityScore?: number;
  vulnerabilities?: number;
  trustLevel?: "high" | "medium" | "low";
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  containers: string[];
  created: string;
  status: "active" | "inactive" | "degraded";
  securityScore?: number;
  policyEnforcement: boolean;
  mTLS: boolean;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  type: InfrastructureNodeType;
  status: "running" | "stopped" | "error";
  created: string;
  securityScore?: number;
  trustLevel?: "high" | "medium" | "low";
  pqcEnabled: boolean;
}

export interface SecureNode {
  id: string;
  name: string;
  type: string;
  status: "running" | "stopped" | "error";
  created: string;
  securityScore?: number;
  trustLevel?: "high" | "medium" | "low";
  pqcEnabled: boolean;
}
