
/**
 * TetraCryptPQC HSM Types
 * 
 * This module defines hardware security module types and enums
 */

// Define HSMType as an enum so it can be used as both a type and value
export enum HSMType {
  TPM = "TPM",
  SGX = "SGX",
  SEV = "SEV",
  YUBIKEY = "YUBIKEY",
  HSM = "HSM",
  TRUSTZONE = "TRUSTZONE",
  NONE = "NONE",
  SECUREENCLAVE = "SECUREENCLAVE"
}

// HSM Information interface
export interface HSMInfo {
  id?: string;
  type: string;
  status: string;
  lastVerified?: string;
  provider?: string;
  securityLevel?: string;
  capabilities?: string[];
}

// Hardware capabilities interface
export interface HardwareCapabilities {
  tpm?: boolean;
  sgx?: boolean;
  sev?: boolean;
  nvdimm?: boolean;
  secureBoot?: boolean;
}

// Security level type
export type SecurityLevel = 'standard' | 'enhanced' | 'maximum';

// Add types for user setup
export type UserSetupSecurityLevel = 'standard' | 'advanced' | 'quantum';

// Self-healing status type
export type SelfHealingStatus = 'active' | 'healing' | 'compromised';

// Container types
export type ContainerStatus = 'running' | 'stopped' | 'paused' | 'error';
export type NodeType = 'kubernetes' | 'docker' | 'podman' | 'bare-metal' | 'physical' | 'virtual';
export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low' | 'minimal';
export type EncryptionType = 'ML-KEM-768' | 'ML-KEM-1024' | 'Hybrid';
export type SignatureType = 'Dilithium2' | 'Dilithium3' | 'Dilithium5' | 'Falcon-1024';
