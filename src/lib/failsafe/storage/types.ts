
/**
 * TetraCryptPQC Storage Failsafe Types
 */

export interface StorageImplementation {
  setItem: (key: string, value: string) => Promise<boolean>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<boolean>;
  clear: () => Promise<boolean>;
  keys: () => Promise<string[]>;
}

export enum StorageMedium {
  LOCAL_STORAGE = "local-storage",
  INDEXED_DB = "indexed-db",
  IN_MEMORY = "in-memory",
  ENCRYPTED_FILE = "encrypted-file",
  P2P_DISTRIBUTED = "p2p-distributed",
  WEB3_STORAGE = "web3-storage",
  AIR_GAPPED = "air-gapped"
}
