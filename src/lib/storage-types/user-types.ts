
import { PQCKey } from "../crypto";

export type ThemeType = "light" | "dark" | "system";

export interface UserSettings {
  theme: ThemeType;
  notifications: boolean;
  twoFactorAuth: boolean;
  securityLevel: "standard" | "enhanced" | "high" | "maximum";
  autoKeyRotation: boolean;
  offlineMode: boolean;
  homomorphicEncryption: boolean;
  zeroKnowledgeProofs: boolean;
  quantumResistanceLevel: "high" | "maximum";
  biometricAuth: boolean;
  hardwareKeyProtection: boolean;
  encryptionDefault?: string;
  privacyLevel?: "standard" | "high" | "maximum";
  keyRotationDays?: number;
}

export interface KeyPairs {
  pqkem: PQCKey;
  signature: PQCKey;
  encryption?: PQCKey;
}

export interface UserProfile {
  id: string;
  userId?: string;
  username: string;
  name?: string;
  displayName?: string;
  email?: string;
  keyPairs?: KeyPairs;
  hsmInfo: {
    available: boolean;
    type: string;
    keyProtectionLevel: string;
    lastVerified: string;
    id?: string;
    status?: string;
  };
  settings: UserSettings;
  securityScore?: number;
  lastLogin?: string;
  devices?: string[];
  securityQuestions?: {
    question: string;
    answerHash: string;
  }[];
  pqcCapable?: boolean;
  privateKey?: string; // For backward compatibility
  created?: string;
  updated?: string;
  starkNetId?: any;
  didDocument?: any;
  publicKey?: string;
  signatureKey?: string;
  qkdInfo?: {
    available: boolean;
    lastExchange: string;
    keySize: number;
    securityLevel: string;
  };
  securityLevel?: "standard" | "high" | "maximum" | "enhanced";
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  publicKey: string;
  algorithm: string;
  status: "active" | "inactive" | "revoked" | "online" | "offline" | "away";
  created?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  messageCount?: number;
  verified: boolean;
  trustLevel: "high" | "medium" | "low";
  isContact: boolean;
  displayName?: string;
  signatureKey?: string;
  unreadCount?: number;
  publicKeys?: {
    encryption: string;
    signature: string;
  };
}
