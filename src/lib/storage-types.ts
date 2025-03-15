
// Define core types for the messaging application

export interface UserProfile {
  id: string;
  name: string;
  starknetAddress?: string;
  sessionKey?: string;
  keyPairs?: {
    pqkem?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
    };
    signature?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
    };
    bike?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
    };
    falcon?: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
    };
  };
  didDocument?: any;
  qkdInfo?: any;
  hsmInfo?: any;
  starkKey?: string;
  provider?: any;
  createdAt?: string;
  // New enterprise-ready fields
  complianceStatus?: {
    status: 'compliant' | 'non-compliant' | 'pending';
    lastVerified?: string;
    standards: string[];
    auditReports?: {
      id: string;
      date: string;
      result: string;
      url?: string;
    }[];
  };
  securityScore?: number;
  threatIntelligence?: {
    lastUpdated: string;
    alerts: {
      id: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      timestamp: string;
      resolved: boolean;
    }[];
  };
  backupStatus?: {
    lastBackup: string;
    status: 'active' | 'inactive';
    location: 'local' | 'cloud' | 'hybrid';
  };
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
  verificationStatus?: 'verified' | 'unverified';
  trustedSince?: string;
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
  encryptionAlgorithm?: string;
  signatureVerified?: boolean;
}

export interface KeyRotationPolicy {
  keyType: 'pqkem' | 'signature' | 'bike' | 'falcon';
  intervalDays: number;
  lastRotation: string;
  nextScheduledRotation: string;
  automaticRotation: boolean;
  backupEnabled: boolean;
  notificationEnabled: boolean;
  complianceRequirement?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  userId: string;
  details: any;
  ipAddress?: string;
  success: boolean;
  severity: 'info' | 'warning' | 'critical';
}

export interface ComplianceReport {
  id: string;
  generatedAt: string;
  standards: string[];
  status: 'compliant' | 'non-compliant' | 'partially-compliant';
  findings: {
    id: string;
    standard: string;
    control: string;
    status: 'pass' | 'fail' | 'warning';
    description: string;
    remediation?: string;
  }[];
  overallScore: number;
  validUntil: string;
}

export interface SecurityThreatIntelligence {
  id: string;
  source: string;
  detectedAt: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedSystems: string[];
  description: string;
  mitigationSteps?: string[];
  status: 'active' | 'mitigated' | 'resolved';
}
