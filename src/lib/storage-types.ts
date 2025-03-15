
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
}

// Conversation structure
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updated: string;
  created: string;
}
