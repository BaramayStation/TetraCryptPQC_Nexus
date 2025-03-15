
/**
 * TetraCryptPQC Message Type Definitions
 * 
 * Type definitions for secure messaging system with quantum-resistant cryptography
 */

export interface Message {
  id: string;
  senderId: string;
  recipientId?: string;
  receiverId: string; // Added receiverId property
  content: string;
  timestamp: string;
  encrypted?: boolean;
  signature?: string;
  verified?: boolean; // Added verified property
  encryptionType?: string;
  status?: "sent" | "delivered" | "read" | "failed"; // Added status property
  kemType?: string; // Added kemType property
  pqSignatureType?: string; // Added pqSignatureType property
  selfHealingStatus?: "active" | "healing" | "healed" | "compromised"; // Added selfHealingStatus property
  zkProofVerified?: boolean; // Added zkProofVerified property
  didVerified?: boolean; // Added didVerified property
  starkNetValidated?: boolean; // Added starkNetValidated property
  webrtcSecured?: boolean; // Added webrtcSecured property
  encryptedContent?: string; // Added encryptedContent property
  encryptionAlgorithm?: string; // Added encryptionAlgorithm property
  integrityHash?: string;
  read?: boolean;
  senderName?: string;
}

export interface SecureMessageOptions {
  encryptionType: "ML-KEM-1024" | "ChaCha20-Poly1305" | "Hybrid";
  signMessage: boolean;
  persistLocally: boolean;
  expiresIn?: number; // seconds
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  pqcEnabled: boolean;
  encryptionType: string;
  messages?: Message[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MessagePreview {
  id: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "failed";
}

export interface QuantumChannel {
  id: string;
  participants: string[];
  encryptionType: "ML-KEM-768" | "ML-KEM-1024" | "Hybrid";
  signatureType: "ML-DSA-65" | "ML-DSA-87" | "Falcon-512" | "Falcon-1024";
  status: "active" | "inactive" | "compromised";
  establishedAt: string;
  lastActivityAt: string;
  messageCount: number;
  forwardSecrecy: boolean;
  pqcVersion: string;
}

export interface SecureChannelMetrics {
  channelId: string;
  encryptionStrength: "standard" | "enhanced" | "maximum";
  latencyMs: number;
  messageDeliverySuccessRate: number;
  keyRotationInterval: number;
  lastKeyRotation: string;
  compromiseAttempts: number;
  anomalyDetected: boolean;
  quantumResistanceVerified: boolean;
}
