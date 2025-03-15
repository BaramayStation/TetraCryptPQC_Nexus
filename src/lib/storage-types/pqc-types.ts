
/**
 * TetraCryptPQC PQC Environment Type Definitions
 */

export interface PQSCIFEnvironment {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'compromised';
  level: 'top-secret' | 'secret' | 'confidential' | 'restricted' | 'unclassified';
  created: string;
  lastAccessed: string;
  algorithms: {
    kem: string;
    signature: string;
    symmetric: string;
  };
  physicalIsolation: boolean;
  hardwareBackedKeys: boolean;
  airGapped: boolean;
}

export interface SecureCommand {
  id: string;
  command: string;
  timestamp: string;
  userId: string;
  environment: string;
  signature: string;
  status: 'pending' | 'executed' | 'failed' | 'rejected';
  result?: string;
  error?: string;
}
