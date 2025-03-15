
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  receiverId?: string; // Adding this field to fix build errors
  content: string;
  timestamp: string;
  encrypted: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: string;
  status: "sent" | "delivered" | "read" | "failed";
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
}

export interface MessagePreview {
  id: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "failed";
}
