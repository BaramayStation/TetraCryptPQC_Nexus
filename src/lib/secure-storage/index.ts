
/**
 * TetraCryptPQC Secure Storage 
 * 
 * Unified export for secure storage modules
 */

// Export types
export * from './storage-types';

// Export storage providers
export { 
  localStorageProvider,
  indexedDBProvider,
  sessionStorageProvider 
} from './storage-providers';

// Export storage managers
export { 
  failsafeStorage,
  MemoryStorageManager,
  RedundantStorage,
  redundantStorage
} from './storage-manager';

// Export encryption
export { 
  encryptData,
  decryptData
} from './pqc-encryption';

// Export secure operations
export {
  storeSecureData,
  retrieveSecureData,
  deleteSecureData,
  securelyDeleteData
} from './secure-ops';

// Export key management
export {
  initializeSecureStorage,
  isKeyRotationNeeded,
  rotateEncryptionKeys,
  checkTDESupport,
  checkDatabaseEncryptionStatus,
  enableTDE
} from './key-management';

// Export browser storage
export {
  getLocalStorage,
  setLocalStorage
} from './browser-storage';

// Export security utilities
export {
  logSecurityEvent,
  getSecurityEvents,
  clearSecurityEvents,
  getSecurityStats
} from './security-utils';
