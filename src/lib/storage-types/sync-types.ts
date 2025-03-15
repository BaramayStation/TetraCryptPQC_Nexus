
/**
 * TetraCryptPQC Sync Status Type Definitions
 */

export interface AISyncStatus {
  lastSynced: string;
  syncState: 'synced' | 'syncing' | 'error' | 'disconnected';
  pendingChanges: number;
  errorCount: number;
  errorMessages: string[];
  cloudAvailable?: boolean;
  p2pAvailable?: boolean;
  offlineMode?: boolean;
  lastSelfHealingAction?: string;
  lastCloudSync?: string;
  id?: string;
}
