
/**
 * TetraCryptPQC Specific Type Definitions
 */

export interface StarkNetID {
  id: string;
  domain: string;
  address: string;
  created: string;
  lastVerified: string;
  status: 'active' | 'expired' | 'revoked';
  proofOfOwnership: string;
  linkedAccounts: string[];
}

export interface PQSCIFEnvironment {
  id: string;
  name: string;
  type: 'development' | 'testing' | 'production' | 'isolated';
  status: 'running' | 'stopped' | 'initializing' | 'error';
  created: string;
  lastAccessed: string;
  securityLevel: 'standard' | 'classified' | 'top-secret';
  isolationLevel: number;
  verifiedBoot: boolean;
  hardwareBackedKeys: boolean;
  attestationStatus: 'verified' | 'unverified' | 'failed';
  sessionExpiry: string;
  allowedOperations: string[];
}

export interface SecureCommand {
  id: string;
  command: string;
  parameters: string[];
  timestamp: string;
  origin: string;
  authorized: boolean;
  executionStatus: 'pending' | 'running' | 'completed' | 'failed';
  responseCode: number;
  output: string;
  securityClassification: string;
  auditTrail: {
    authorized_by: string;
    execution_time: number;
    verification_status: string;
  };
}
