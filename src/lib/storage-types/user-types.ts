
/**
 * TetraCryptPQC User Type Definitions
 */

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  name: string;
  displayName: string;
  email?: string;
  keyPairs: KeyPairs;
  settings: UserSettings;
  securityLevel: "standard" | "enhanced" | "maximum";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  didDocument?: DIDDocument;
  hsmInfo?: HSMInfo;
  qkdInfo?: QKDInfo;
  starkNetId?: string;
}

export interface DIDDocument {
  id: string;
  verificationMethod: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyMultibase?: string;
  }>;
  authentication: string[];
  assertionMethod?: string[];
  created: string;
  updated: string;
  status: 'active' | 'revoked';
}

export interface HSMInfo {
  available: boolean;
  vendor: string;
  model: string;
  firmwareVersion: string;
  status: 'active' | 'inactive' | 'error';
  lastChecked: string;
  supportsPQC: boolean;
  serialNumber?: string;
}

export interface QKDInfo {
  available: boolean;
  type: string;
  provider: string;
  lastSyncTime: string;
  keyCount: number;
  status: 'active' | 'inactive' | 'error';
}

export interface KeyPairs {
  pqkem: {
    publicKey: string;
    privateKey: string;
    created: string;
    algorithm: string;
    strength: string;
    standard: string;
  };
  signature: {
    publicKey: string;
    privateKey: string;
    created: string;
    algorithm: string;
    strength: string;
    standard: string;
  };
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  notifications: boolean;
  secureLogin: boolean;
  twoFactorAuth: boolean;
  twoFactorEnabled: boolean;
  autoLock: boolean;
  autoLockTimeout: number;
  privacyMode: "standard" | "enhanced" | "maximum";
  secureEnclave: boolean;
  zeroKnowledgeEnabled: boolean;
  pqcEnabled: boolean;
  hardwareKeyEnabled: boolean;
  webrtcEnabled: boolean;
  p2pEnabled: boolean;
  dataRetentionDays: number;
}

export interface BiometricData {
  faceId?: boolean;
  touchId?: boolean;
  voicePrint?: boolean;
  lastVerified?: string;
  hardwareProtected: boolean;
}
