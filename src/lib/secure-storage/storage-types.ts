
/**
 * TetraCryptPQC Storage Types
 */

// Storage operation types
export type StorageOperation = 'read' | 'write' | 'delete' | 'list';

// Storage encryption modes
export type EncryptionMode = 'direct' | 'key-encapsulation' | 'hybrid';

// Storage provider interface
export interface StorageProvider {
  name: string;
  isAvailable: () => Promise<boolean>;
  write: (key: string, data: string) => Promise<boolean>;
  read: (key: string) => Promise<string | null>;
  delete: (key: string) => Promise<boolean>;
  list: () => Promise<string[]>;
}

// Database encryption status type
export interface DatabaseEncryptionStatus {
  tdeEnabled: boolean;
  algorithm: string;
  keyRotationEnabled: boolean;
}

// Key rotation check result
export interface KeyRotationCheckResult {
  needed: boolean;
  lastRotation?: string;
  nextRotation?: string;
  reason?: string;
}

// Encrypted data format
export interface EncryptedData {
  ciphertext: string;
  encapsulatedKey?: string;
  algorithm: string;
  mode: EncryptionMode;
  metadata: {
    iv: string;
    timestamp: string;
    mode: string;
    [key: string]: any;
  };
}

// Security event for logging
export interface SecurityEvent {
  eventType: string;
  timestamp: string;
  userId?: string;
  operation: string;
  status: 'success' | 'failure' | 'warning';
  metadata?: Record<string, any>;
}
