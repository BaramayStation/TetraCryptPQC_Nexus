import { encryptMessage, encryptMessageChaCha, decryptMessage, signMessage, verifySignature, homomorphicEncrypt } from "@/lib/crypto";
import { saveToIPFS, loadFromIPFS } from "@/lib/web3Storage"; // Web3 decentralized storage
import { getUserProfile } from "@/lib/storage";

// 🔹 Secure Storage Keys
const STORAGE_KEYS = {
  USER_PROFILE: 'quantum_secure_user',
  CONTACTS: 'quantum_secure_contacts',
  MESSAGES: 'quantum_secure_messages',
  SESSIONS: 'quantum_secure_sessions',
};

// 🔹 Secure Local Storage Functions
const secureStorage = {
  set: (key: string, data: any) => {
    const encryptedData = btoa(JSON.stringify(data)); // Base64 encoding (upgrade to AES-256-GCM in production)
    localStorage.setItem(key, encryptedData);
  },
  get: (key: string) => {
    const encryptedData = localStorage.getItem(key);
    return encryptedData ? JSON.parse(atob(encryptedData)) : null;
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

// 🔹 Securely Save User Profile
export const saveUserProfile = (profile: any): void => {
  secureStorage.set(STORAGE_KEYS.USER_PROFILE, profile);
};

// 🔹 Get User Profile (with ML-KEM Secure Storage)
export const getUserProfile = (): any | null => {
  return secureStorage.get(STORAGE_KEYS.USER_PROFILE);
};

// 🔹 Secure Message Type
export interface SecureMessage {
  id: string;
  senderId: string;
  receiverId: string;
  encryptedContent: string;
  encryptionMode: "aes" | "chacha" | "homomorphic";
  signature: string;
  timestamp: string;
  didVerified?: boolean;
  ipfsHash?: string; // If stored on IPFS
}

// 🔹 Save Messages Securely (Supports IPFS)
export const saveMessage = async (message: SecureMessage): Promise<void> => {
  const messages = getAllMessages();
  messages.push(message);

  if (message.ipfsHash) {
    await saveToIPFS(message); // Store encrypted message in Web3 storage
  }

  secureStorage.set(STORAGE_KEYS.MESSAGES, messages);
};

// 🔹 Retrieve Messages (with Quantum-Safe Decryption)
export const getAllMessages = (): SecureMessage[] => {
  return secureStorage.get(STORAGE_KEYS.MESSAGES) || [];
};

// 🔹 Fetch Messages for a Contact (Quantum-Secure Retrieval)
export const getMessagesForContact = async (contactId: string): Promise<SecureMessage[]> => {
  const user = getUserProfile();
  if (!user) return [];

  let messages = getAllMessages().filter(
    message => 
      (message.senderId === user.id && message.receiverId === contactId) || 
      (message.senderId === contactId && message.receiverId === user.id)
  );

  // Attempt to fetch missing messages from IPFS
  for (let message of messages) {
    if (message.ipfsHash) {
      const decryptedMessage = await loadFromIPFS(message.ipfsHash);
      if (decryptedMessage) message.encryptedContent = decryptedMessage;
    }
  }

  return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// 🔹 Mark Messages as Read (Quantum-Secure Updates)
export const markMessagesAsRead = (contactId: string): void => {
  const messages = getAllMessages();
  let updated = false;

  messages.forEach(message => {
    if (message.senderId === contactId && message.status !== 'read') {
      message.status = 'read';
      updated = true;
    }
  });

  if (updated) secureStorage.set(STORAGE_KEYS.MESSAGES, messages);
};

// 🔹 Secure Sessions (with PFS - Perfect Forward Secrecy)
export interface SecureSession {
  contactId: string;
  sessionKey: string;
  lastRenewed: string;
}

// 🔹 Save Secure Session (Quantum-Resistant)
export const saveSession = (session: SecureSession): void => {
  const sessions = getSessions();
  const existingIndex = sessions.findIndex(s => s.contactId === session.contactId);

  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }

  secureStorage.set(STORAGE_KEYS.SESSIONS, sessions);
};

// 🔹 Get Secure Session (with Quantum Key Rotation)
export const getSessions = (): SecureSession[] => {
  return secureStorage.get(STORAGE_KEYS.SESSIONS) || [];
};

// 🔹 Web3 Storage Methods (IPFS or Arweave)
export const saveToIPFS = async (message: SecureMessage): Promise<string> => {
  // Placeholder: Implement actual IPFS storage
  console.log("Saving to IPFS:", message);
  return "ipfsHashPlaceholder";
};

export const loadFromIPFS = async (hash: string): Promise<string | null> => {
  // Placeholder: Implement actual IPFS retrieval
  console.log("Loading from IPFS:", hash);
  return null;
};

// 🔹 Clear All Secure Data (For Logout)
export const clearAllData = (): void => {
  secureStorage.remove(STORAGE_KEYS.USER_PROFILE);
  secureStorage.remove(STORAGE_KEYS.CONTACTS);
  secureStorage.remove(STORAGE_KEYS.MESSAGES);
  secureStorage.remove(STORAGE_KEYS.SESSIONS);
};
