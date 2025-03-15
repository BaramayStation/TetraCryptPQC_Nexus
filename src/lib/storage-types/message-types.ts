
export interface Message {
  id: string;
  senderId: string;
  recipientId: string; 
  receiverId: string; // Required field for compatibility
  content: string;
  timestamp: string;
  encrypted: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: string;
  status: "sent" | "delivered" | "read" | "failed";
}

export type P2PNodeStatus = "active" | "healing" | "healed" | "verified"; // Added "verified" status

export interface WebRTCPeerStatus {
  peerId: string;
  connected: boolean;
  lastSeen: string;
  latency: number;
  signalStrength: number;
  status: P2PNodeStatus;
  signatureVerified: boolean;
  encryptionType: string;
  signatureType?: string; // Added optional field 
}
