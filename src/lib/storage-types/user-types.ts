
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
  autoLock: boolean;
  autoLockTimeout: number;
  privacyMode: "standard" | "enhanced" | "maximum";
  secureEnclave: boolean;
  zeroKnowledgeEnabled: boolean;
  pqcEnabled: boolean;
  hardwareKeyEnabled: boolean;
  webrtcEnabled: boolean;
  p2pEnabled: boolean;
}

export interface BiometricData {
  faceId?: boolean;
  touchId?: boolean;
  voicePrint?: boolean;
  lastVerified?: string;
  hardwareProtected: boolean;
}
