
import { PQCKey } from "../crypto";

export type ThemeType = "light" | "dark" | "system";

export interface UserSettings {
  theme: ThemeType;
  notifications: boolean;
  twoFactorAuth: boolean;
  securityLevel: "standard" | "enhanced" | "maximum";
  autoKeyRotation: boolean;
  offlineMode: boolean;
  homomorphicEncryption: boolean;
  zeroKnowledgeProofs: boolean;
  quantumResistanceLevel: "high" | "maximum";
  biometricAuth: boolean;
  hardwareKeyProtection: boolean;
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
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  publicKey: string;
  algorithm: string;
  status: "active" | "inactive" | "revoked";
  created?: string;
  lastMessage?: string;
  messageCount?: number;
  verified: boolean;
  trustLevel: "high" | "medium" | "low";
  isContact: boolean;
}
