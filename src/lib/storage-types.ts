
export type UserProfile = {
  userId: string;
  username: string;
  encryptionKey: string;
  authType: "standard" | "advanced";
  hardwareSecurityEnabled?: boolean;
  hardwareType?: "YubiKey" | "TPM" | "SecureEnclave" | "None";
  starkNetAccount?: {
    address: string;
    publicKey: string;
  };
  keyPairs?: {
    pqkem?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
      hardwareProtected?: boolean;
    };
    signature?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
      hardwareProtected?: boolean;
    };
  };
  securitySettings?: {
    perfectForwardSecrecy: boolean;
    fipsCompliance: boolean;
    hybridEncryption: boolean;
    federatedMode: boolean;
  };
  didDocument?: any;
  starkNetId?: {
    id: string;
    type: string;
  };
};

export type Contact = {
  id: string;
  name: string;
  publicKey: string;
  signatureKey: string;
  lastMessage?: string;
  lastMessageTime?: string;
  status?: "online" | "offline" | "away";
  unreadCount?: number;
};

export type Message = {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  encrypted: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: "ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305";
};

export type SecurityThreatIntelligence = {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detectedAt: string;
  mitigationSteps: string[];
  status: "active" | "mitigated" | "investigating";
  source: string;
};

// Define the conversation type
export type Conversation = {
  id: string;
  contactId: string;
  messages: Message[];
  encryptionType: "ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305";
  lastActivity: string;
};

// Define the available PQC algorithms
export type PQCAlgorithm = 
  "ML-KEM-512" | "ML-KEM-768" | "ML-KEM-1024" | 
  "SLH-DSA-Dilithium2" | "SLH-DSA-Dilithium3" | "SLH-DSA-Dilithium5" | 
  "Falcon-512" | "Falcon-1024" | 
  "BIKE-L1" | "BIKE-L3" | "BIKE-L5";

// Define the hardware security modules
export type HSMType = "YubiKey" | "TPM" | "SecureEnclave" | "CloudHSM" | "None";
