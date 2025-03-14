
// Define core types for the messaging application

export interface UserProfile {
  id: string;
  name: string;
  starknetAddress?: string;
  sessionKey?: string;
  keyPairs?: {
    encryption: {
      publicKey: string;
      privateKey: string;
    };
    signature: {
      publicKey: string;
      privateKey: string;
    };
  };
  didDocument?: any;
  qkdInfo?: any;
  hsmInfo?: any;
  starkKey?: string;
  provider?: any;
}

export interface Contact {
  id: string;
  name: string;
  publicKeys?: {
    kyber?: string;
    falcon?: string;
  };
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  encryptedContent: string;
  timestamp: string;
  signature?: string;
  status: 'sent' | 'delivered' | 'read';
  sessionKey?: string;
}
