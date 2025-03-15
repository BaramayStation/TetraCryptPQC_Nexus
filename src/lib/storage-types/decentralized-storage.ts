
/**
 * TetraCryptPQC Decentralized Storage Type Definitions (Placeholder)
 */

export interface DecentralizedStorageNode {
  id: string;
  nodeType: 'storage' | 'validator' | 'gateway' | 'archival';
  name: string;
  type: string;
  status: 'online' | 'offline' | 'syncing' | 'error';
  capacityTotal: number;
  capacityUsed: number;
  usedStorage: number;
  storageCapacity: number;
  region: string;
  replicationFactor: number;
  dataAvailability: number;
  lastSeen: string;
  version: string;
  ipfsPeerId?: string;
  starknetContract?: string;
  encryptionEnabled: boolean;
  stakingAmount?: number;
  performanceScore: number;
  location?: string;
  pqcEnabled?: boolean;
  networkLatency?: number;
  lastSynced?: string;
}
