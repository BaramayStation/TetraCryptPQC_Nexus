
/**
 * TetraCryptPQC Storage Types
 */

// StarkNet ID structure
export interface StarkNetID {
  id: string;
  type: string;  // Required field to match UserProfile expectations
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

// User Profile structure
export interface UserProfile {
  id: string;
  displayName: string;
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
}

// Contact structure
export interface Contact {
  id: string;
  displayName: string;
  publicKey: string;
  didDocument?: DIDDocument;
  starkNetId?: string;
  created: string;
  notes?: string;
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
}

// Conversation structure
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updated: string;
  created: string;
}
