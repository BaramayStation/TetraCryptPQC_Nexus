
export interface Message {
  id: string;
  senderId: string;
  recipientId?: string;
  receiverId: string; // Making this required to match the interface
  content: string;
  timestamp: string;
  encrypted: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: string;
  status: "sent" | "delivered" | "read" | "failed";
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: "active" | "healing" | "healed" | "compromised";
  zkProofVerified?: boolean;
  didVerified?: boolean;
  starkNetValidated?: boolean;
  webrtcSecured?: boolean;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
  integrityHash?: string;
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
