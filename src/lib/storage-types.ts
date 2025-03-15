
/**
 * TetraCryptPQC Storage Types
 * 
 * This module defines core types for the storage system.
 */

import { HSMType, SecurityLevel } from './hsm-types';

// User Profile
export interface UserProfile {
  userId: string;
  id?: string; // Alias for userId to maintain compatibility
  name: string;
  username?: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  publicKey?: string; 
  privateKey?: string;
  signatureKey?: string;
  created: string;
  updated?: string;
  lastActive: string;
  keyPairs?: {
    pqkem?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      created: string;
      strength?: string;
      standard?: string;
    };
    signature?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      created: string;
      strength?: string;
      standard?: string;
    };
  };
  securityLevel: SecurityLevel;
  securitySettings?: {
    mfa: boolean;
    hardwareAuthentication: boolean;
    offlineMode: boolean;
    autoSync: boolean;
    keyRotationPeriod: number; // In days
  };
  didDocument?: {
    id: string;
    created: string;
    proof?: string;
    controller?: string;
    verificationMethod?: any[];
  };
  hsmInfo?: {
    type: string;
    status: string;
    lastVerified?: string;
    id?: string;
    provider?: string;
    securityLevel?: string;
    capabilities?: string[];
  };
  qkdInfo?: {
    enabled: boolean;
    status: string;
  };
  starkNetId?: {
    id: string;
    address: string;
    verified: boolean;
    starkKey?: string;
  };
}

// Contact
export interface Contact {
  id: string;
  name: string;
  displayName?: string;
  avatar?: string;
  publicKeys?: {
    encryption: string;
    signature: string;
  };
  publicKey?: string; // Legacy support
  signatureKey?: string; // Legacy support
  trusted?: boolean;
  lastActive?: string;
  conversationId?: string;
  status?: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  created?: string;
}

// Message
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  encrypted: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: 'ML-KEM-1024' | 'Hybrid' | 'ChaCha20-Poly1305';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  
  // Additional fields for extended functionality
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: 'active' | 'healing' | 'compromised';
  webrtcSecured?: boolean;
  zkProofVerified?: boolean;
  didVerified?: boolean;
  starkNetValidated?: boolean;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
}

// Conversation
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  encryptionType: 'ML-KEM-1024' | 'Hybrid' | 'ChaCha20-Poly1305';
}

// Biometric Authentication Methods
export type BiometricMethod = 'face' | 'fingerprint' | 'voice' | 'iris' | 'behavior';

// Security Event Types
export type SecurityEventType = 
  | 'authentication' 
  | 'key-usage' 
  | 'data-access' 
  | 'system-change'
  | 'network-access'
  | 'cryptographic-operation'
  | 'audit';

// Threat Severity Levels
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical' | 'audit' | 'minimal';

// AI Security Model Types
export type SecurityModelType = 'anomaly-detection' | 'intrusion-prevention' | 'threat-intelligence';

// Threat model type
export interface Threat {
  id: string;
  description: string;
  severity: ThreatSeverity;
  timestamp?: string;
  source?: string;
  mitigation?: string;
  status?: 'active' | 'mitigated' | 'investigating';
}

// AI-related security types
export interface AISecuredCloudInstance {
  id: string;
  name: string;
  status: string;
  type?: string;
  region?: string;
  encryptionLevel?: SecurityLevel;
  lastHealthCheck?: string;
}

export interface SecurityHealthMetrics {
  uptime: number;
  incidents: number;
  threatScore?: number;
  availability?: number;
  integrity?: number;
  confidentiality?: number;
  lastUpdated?: string;
}

export interface AISecurityPolicy {
  id: string;
  rules: string[];
  name?: string;
  description?: string;
  enforced?: boolean;
  created?: string;
  updated?: string;
}

// StarkNet Identity
export interface StarkNetID {
  id: string;
  address: string;
  publicKey: string;
  controller: string;
  created: string;
  updated: string;
  verified: boolean;
  type?: string;
  starkKey?: string;
}

// Export types from extended module
export * from './storage-types-ext';
