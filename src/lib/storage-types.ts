/**
 * TetraCryptPQC Storage Types
 */

// StarkNet ID structure
export interface StarkNetID {
  id: string;
  type: string;
  address: string;
  starkKey: string;
  created: string;
}

// DID Document structure
export interface DIDDocument {
  id: string;
  "@context": string;
  verificationMethod: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyHex: string;
  }>;
  authentication: string[];
  assertionMethod: string[];
  keyAgreement: string[];
}

// PQC Key Pair structure
export interface PQCKeyPair {
  pqkem: {
    algorithm: string;
    publicKey: string;
    privateKey: string;
    strength: string;
    standard: string;
    created: string;
  };
  signature: {
    algorithm: string;
    publicKey: string;
    privateKey: string;
    strength: string;
    standard: string;
    created: string;
  };
}

// HSM Information structure
export interface HSMInfo {
  id: string;
  type: string;
  provider: string;
  securityLevel: string;
  lastVerified: string;
  capabilities: string[];
}

// QKD Information structure
export interface QKDInfo {
  id: string;
  protocol: string;
  keyRate: number;
  qberRate: number;
  distance: number;
  lastExchange: string;
}

// Security Threat Intelligence structure
export interface SecurityThreatIntelligence {
  id: string;
  threats: Array<{
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    source: string;
    details: string;
    mitigationStatus: 'unmitigated' | 'mitigating' | 'mitigated';
    discoveredAt: string;
  }>;
  lastUpdated: string;
}

// HSM Type Enum
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

// NEW: Certificate Revocation List (CRL) structure
export interface CertificateRevocationList {
  id: string;
  issuer: string;
  lastUpdated: string;
  nextUpdate: string;
  revokedCertificates: Array<{
    serialNumber: string;
    revocationDate: string;
    reasonCode: RevocationReason;
    fingerprint: string;
    algorithm: string;
  }>;
  signature: string;
  signatureAlgorithm: string;
}

// NEW: Revocation reason codes (based on X.509 standard)
export enum RevocationReason {
  UNSPECIFIED = 0,
  KEY_COMPROMISE = 1,
  CA_COMPROMISE = 2,
  AFFILIATION_CHANGED = 3,
  SUPERSEDED = 4,
  CESSATION_OF_OPERATION = 5,
  CERTIFICATE_HOLD = 6,
  REMOVE_FROM_CRL = 8,
  PRIVILEGE_WITHDRAWN = 9,
  AA_COMPROMISE = 10,
  QUANTUM_VULNERABILITY = 11 // Custom reason for quantum vulnerabilities
}

// NEW: PKI Certificate structure with PQ enhancements
export interface PKICertificate {
  id: string;
  serialNumber: string;
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  publicKeyAlgorithm: string;
  publicKey: string;
  signatureAlgorithm: string;
  signature: string;
  fingerprint: string;
  status: 'valid' | 'revoked' | 'expired' | 'suspended';
  pqcProtected: boolean;
  quantum: {
    mlkemPublicKey?: string;
    falconPublicKey?: string;
    algorithm: string;
    strength: string;
  };
  extensions: {
    keyUsage?: string[];
    extendedKeyUsage?: string[];
    subjectAltName?: string[];
    basicConstraints?: {
      isCA: boolean;
      pathLenConstraint?: number;
    };
    [key: string]: any;
  };
  starkNetVerified: boolean;
  zkProofs: {
    identityProof?: string;
    attributeProofs?: Record<string, string>;
  };
}

// User Profile structure
export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  name?: string;
  username?: string;
  email?: string;
  publicKey?: string;
  privateKey?: string;
  keyPairs?: PQCKeyPair;
  didDocument?: DIDDocument;
  starkNetId?: StarkNetID;
  created: string;
  updated: string;
  securityLevel: "standard" | "advanced" | "quantum";
  preferences?: Record<string, any>;
  hsmInfo?: HSMInfo;
  qkdInfo?: QKDInfo;
  signatureKey?: string;
  // NEW: Additional fields for decentralized PKI
  certificates?: PKICertificate[];
  trustedIssuers?: string[];
  revocationStatus?: 'active' | 'checking' | 'revoked';
  lastRevocationCheck?: string;
}

// Contact structure
export interface Contact {
  id: string;
  displayName: string;
  name: string;
  publicKey: string;
  didDocument?: DIDDocument;
  starkNetId?: string;
  created: string;
  notes?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  signatureKey?: string;
  // NEW: Certificate verification for contacts
  certificateVerified?: boolean;
  certificateStatus?: 'valid' | 'revoked' | 'expired' | 'not_verified';
  pqCertificate?: PKICertificate;
}

// Message structure
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
  signature?: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  verified?: boolean;
  encrypted?: boolean;
  encryptionType?: string;
  // New quantum-secure properties
  zkProofVerified?: boolean;
  didVerified?: boolean;
  pqSignatureType?: "Falcon-1024" | "SLH-DSA-Dilithium5";
  kemType?: "ML-KEM-1024" | "Classic-RSA" | "Hybrid";
  integrityHash?: string;
  selfHealingStatus?: "verified" | "healing" | "compromised";
  webrtcSecured?: boolean;
  starkNetValidated?: boolean;
  qubicEncryption?: boolean;
}

// Conversation structure
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updated: string;
  created: string;
}

// NEW: Secure Container Configuration structure
export interface SecureContainerConfig {
  id: string;
  name: string;
  type: 'podman' | 'crun' | 'kata' | 'gvisor';
  securityProfile: 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave';
  immutableRootfs: boolean;
  confinement: 'selinux' | 'apparmor' | 'seccomp' | 'none';
  networkPolicy: 'isolated' | 'service-mesh' | 'e2e-encrypted' | 'none';
  rotationPolicy?: {
    enabled: boolean;
    interval: number; // in minutes
    triggerOnAnomaly: boolean;
  };
  resources: {
    cpuLimit: string;
    memoryLimit: string;
    storageLimit: string;
  };
  verifiedBoot: boolean;
  integrityMonitoring: boolean;
  created: string;
  lastUpdated: string;
  status: 'running' | 'stopped' | 'failed' | 'compromised';
}

// NEW: Secure Infrastructure Node structure
export interface SecureInfraNode {
  id: string;
  name: string;
  type: 'physical' | 'virtual' | 'container' | 'serverless';
  hardwareCapabilities: {
    tpm: boolean;
    sgx: boolean;
    sev: boolean;
    nvdimm: boolean;
    secureBoot: boolean;
  };
  networkSecurity: {
    encryptionInTransit: boolean;
    firewallEnabled: boolean;
    intrusionDetection: boolean;
    ddosProtection: boolean;
  };
  complianceStatus: {
    fisma: boolean;
    fedramp: boolean;
    hipaa: boolean;
    pci: boolean;
    gdpr: boolean;
  };
  confidentialComputing: boolean;
  attestationSupport: boolean;
  patchStatus: 'up-to-date' | 'pending' | 'outdated' | 'vulnerable';
  lastScan: string;
  threatLevel: 'minimal' | 'low' | 'medium' | 'high' | 'critical';
}

// NEW: Secure Service Mesh structure
export interface SecureServiceMesh {
  id: string;
  name: string;
  services: string[]; // ids of contained services
  encryptionType: 'ml-kem' | 'hybrid-pqc' | 'tls-1-3' | 'none';
  mutualAuthentication: boolean;
  certificateRotation: boolean;
  trafficAnalysis: boolean;
  anomalyDetection: boolean;
  mtls: boolean;
  zkProofVerification: boolean;
  serviceDiscovery: boolean;
  created: string;
  lastUpdated: string;
}

// Define severity types for threat classification
export type ThreatSeverity = "critical" | "high" | "medium" | "low";

// Define threat interface for security monitoring
export interface Threat {
  id: string;
  severity: ThreatSeverity;
  description: string;
  timestamp: string;
  indicators: string[];
  mitigationSteps: string[];
}
