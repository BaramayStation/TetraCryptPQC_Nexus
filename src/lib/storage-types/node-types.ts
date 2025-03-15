
export interface DecentralizedNode {
  id: string;
  name: string;
  type: "storage" | "compute" | "validator" | "coordinator";
  status: "online" | "offline" | "syncing";
  publicKey: string;
  lastSeen: string;
  trustScore: number;
  region?: string;
  capabilities: string[];
  encryptionAlgorithm: string;
  signatureAlgorithm: string;
}

export interface NodeSyncStatus {
  lastSync: string;
  syncPercentage: number;
  syncStatus: "complete" | "in-progress" | "failed" | "idle";
  dataBlocks: number;
  verifiedBlocks: number;
}
