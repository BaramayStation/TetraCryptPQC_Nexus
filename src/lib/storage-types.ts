
/**
 * TetraCryptPQC Storage Types
 * 
 * This module defines core types for the storage system.
 */

// User Profile
export interface UserProfile {
  userId: string;
  name: string;
  email?: string;
  avatar?: string;
  created: string;
  lastActive: string;
  keyPairs?: {
    pqkem?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      created: string;
    };
    signature?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      created: string;
    };
  };
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  securitySettings: {
    mfa: boolean;
    hardwareAuthentication: boolean;
    offlineMode: boolean;
    autoSync: boolean;
    keyRotationPeriod: number; // In days
  };
}

// Contact
export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  publicKeys: {
    encryption: string;
    signature: string;
  };
  trusted: boolean;
  lastActive?: string;
  conversationId?: string;
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
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical' | 'audit';

// AI Security Model Types
export type SecurityModelType = 'anomaly-detection' | 'intrusion-prevention' | 'threat-intelligence';

// AI-secured cloud instances
export interface AISecuredCloudInstance {
  id: string;
  name: string;
  status: 'provisioning' | 'running' | 'paused' | 'stopped' | 'error';
  region: string;
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  keyPairs: {
    encryption: {
      publicKey: string;
      privateKey: string;
    };
    signature: {
      publicKey: string;
      privateKey: string;
    };
  };
  createdAt: string;
  lastUpdated: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  threatStatus: 'normal' | 'elevated' | 'critical';
  homomorphicEncryptionEnabled: boolean;
  ipfsStorageEnabled: boolean;
  zeroKnowledgeAuthEnabled: boolean;
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    storageUsage: number;
    networkUsage: number;
    activeUsers: number;
    lastUpdated: string;
  };
}

// Security health metrics
export interface SecurityHealthMetrics {
  overallScore: number;
  threatDetectionRate: number; // Percentage rate of successful detections
  threatDetectionLatency: number; // In milliseconds
  falsePositiveRate: number;
  incidentResponseTime: number; // In minutes
  complianceScore: number;
  complianceScores: Record<string, number>; // Individual compliance framework scores
  lastUpdated: string;
  vulnerabilities: {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    affectedComponents: string[];
    remediationSteps: string[];
    status: 'open' | 'mitigated' | 'resolved';
  }[];
  recommendedActions: string[];
}

// AI Security Policy
export interface AISecurityPolicy {
  id: string;
  name: string;
  autoRemediationEnabled: boolean;
  threatDetectionLevel: 'standard' | 'enhanced' | 'maximum';
  homomorphicEncryptionEnabled: boolean;
  zeroKnowledgeAuthEnabled: boolean;
  aiGovernanceLevel: 'standard' | 'enterprise' | 'maximum';
  complianceFrameworks: string[];
  offlineResilienceEnabled: boolean;
  autoKeyRotationEnabled: boolean;
  lastUpdated: string;
}

// Define Threat type for the MilitarySecurityDashboard
export interface Threat {
  id: string;
  timestamp: string;
  severity: ThreatSeverity;
  source: string;
  target: string;
  type: string;
  description: string;
  status: 'active' | 'mitigated' | 'resolved';
  mitigationSteps?: string[];
}
