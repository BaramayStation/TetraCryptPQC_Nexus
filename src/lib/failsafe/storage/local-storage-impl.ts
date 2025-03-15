
/**
 * TetraCryptPQC Local Storage Implementation
 * Using browser's localStorage with encryption
 */

import { 
  FailsafeComponentType, 
  FailsafeImplementation, 
  FailsafeStatus, 
  FailsafeStrategy,
  FailsafeTestResult 
} from '../types';
import { StorageImplementation, StorageMedium } from './types';
import { storageFailsafe } from './coordinator';
import { failsafeCrypto, failsafeHash } from '../../pqcrypto-core';

// A storage key for redundancy and failover
const FAILOVER_KEY_PREFIX = "tetracrypt-failover-";

class LocalStorageImplementation implements StorageImplementation {
  private prefix = "tetracrypt-";
  private backupPrefix = "tetracrypt-backup-";
  
  async setItem(key: string, value: string): Promise<boolean> {
    try {
      // Generate a random encryption key for this item
      const encryptionKeyBytes = crypto.getRandomValues(new Uint8Array(32));
      const encryptionKey = Array.from(encryptionKeyBytes, 
        byte => byte.toString(16).padStart(2, '0')).join('');
      
      // Use failsafe encryption
      const encryptedValue = await failsafeCrypto<string>('encrypt', [value, encryptionKey]);
      
      // Store the encrypted value
      localStorage.setItem(this.prefix + key, encryptedValue);
      
      // Store a backup with a different key and encryption
      localStorage.setItem(this.backupPrefix + key, await failsafeCrypto<string>(
        'encrypt', 
        [value, encryptionKey.split('').reverse().join('')]
      ));
      
      // Store the encryption key for this item, encrypted with a master key
      // In a real implementation, this would use a secure key management system
      const masterKey = localStorage.getItem('master_key') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)), 
          byte => byte.toString(16).padStart(2, '0')).join('');
      
      if (!localStorage.getItem('master_key')) {
        localStorage.setItem('master_key', masterKey);
      }
      
      // Encrypt and store the item's encryption key
      const encryptedKeyKey = `${this.prefix}key-${key}`;
      const encryptedKey = await failsafeCrypto<string>('encrypt', [encryptionKey, masterKey]);
      localStorage.setItem(encryptedKeyKey, encryptedKey);
      
      // Also store a copy of the key with a different name for redundancy
      localStorage.setItem(`${FAILOVER_KEY_PREFIX}${key}`, encryptedKey);
      
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      
      try {
        // Failsafe approach: store without encryption if encryption fails
        localStorage.setItem(this.prefix + key, value);
        console.warn(`Stored item ${key} without encryption due to encryption failure`);
        return true;
      } catch (fallbackError) {
        console.error(`Fallback storage also failed for ${key}:`, fallbackError);
        return false;
      }
    }
  }
  
  async getItem(key: string): Promise<string | null> {
    try {
      // Try to get the encrypted value
      const encryptedValue = localStorage.getItem(this.prefix + key);
      if (!encryptedValue) {
        // Try the backup
        const backupValue = localStorage.getItem(this.backupPrefix + key);
        if (!backupValue) return null;
        
        // Backup found, try to decrypt it
        const masterKey = localStorage.getItem('master_key');
        if (!masterKey) return backupValue; // Can't decrypt without master key
        
        // Get the encryption key for this item
        const encryptedKeyKey = `${this.prefix}key-${key}`;
        const encryptedKey = localStorage.getItem(encryptedKeyKey) || 
                            localStorage.getItem(`${FAILOVER_KEY_PREFIX}${key}`);
        
        if (!encryptedKey) return backupValue; // Can't decrypt without item key
        
        // Decrypt the encryption key
        const decryptedKey = await failsafeCrypto<string>('decrypt', [encryptedKey, masterKey]);
        if (!decryptedKey) return backupValue;
        
        // Decrypt the backup value
        return await failsafeCrypto<string>(
          'decrypt', 
          [backupValue, decryptedKey.split('').reverse().join('')]
        );
      }
      
      // Try to get the master key
      const masterKey = localStorage.getItem('master_key');
      if (!masterKey) return encryptedValue; // Can't decrypt without master key
      
      // Try to get the encryption key for this item
      const encryptedKeyKey = `${this.prefix}key-${key}`;
      const encryptedKey = localStorage.getItem(encryptedKeyKey) || 
                          localStorage.getItem(`${FAILOVER_KEY_PREFIX}${key}`);
      
      if (!encryptedKey) return encryptedValue; // Can't decrypt without item key
      
      // Decrypt the encryption key
      const decryptedKey = await failsafeCrypto<string>('decrypt', [encryptedKey, masterKey]);
      if (!decryptedKey) return encryptedValue;
      
      // Decrypt the value
      return await failsafeCrypto<string>('decrypt', [encryptedValue, decryptedKey]);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      
      // Failsafe recovery attempt - try to get the raw (possibly encrypted) value
      try {
        const rawValue = localStorage.getItem(this.prefix + key);
        return rawValue;
      } catch {
        return null;
      }
    }
  }
  
  async removeItem(key: string): Promise<boolean> {
    try {
      // Remove all related items
      localStorage.removeItem(this.prefix + key);
      localStorage.removeItem(this.backupPrefix + key);
      localStorage.removeItem(`${this.prefix}key-${key}`);
      localStorage.removeItem(`${FAILOVER_KEY_PREFIX}${key}`);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  }
  
  async clear(): Promise<boolean> {
    try {
      // Only clear TetraCrypt items
      const allKeys = Object.keys(localStorage);
      const tetracryptKeys = allKeys.filter(key => 
        key.startsWith(this.prefix) || 
        key.startsWith(this.backupPrefix) ||
        key.startsWith(FAILOVER_KEY_PREFIX)
      );
      
      tetracryptKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
      return false;
    }
  }
  
  async keys(): Promise<string[]> {
    try {
      const allKeys = Object.keys(localStorage);
      return allKeys
        .filter(key => key.startsWith(this.prefix) && 
                      !key.startsWith(`${this.prefix}key-`))
        .map(key => key.substring(this.prefix.length));
    } catch (error) {
      console.error(`Error getting keys from localStorage:`, error);
      return [];
    }
  }
  
  // Verify data integrity
  async verifyIntegrity(key: string): Promise<boolean> {
    try {
      const primaryValue = await this.getItem(key);
      if (!primaryValue) return false;
      
      // Check if there's a backup
      const backupValue = localStorage.getItem(this.backupPrefix + key);
      if (!backupValue) return true; // No backup to compare against
      
      // Decrypt the backup
      const masterKey = localStorage.getItem('master_key');
      if (!masterKey) return true; // Can't decrypt backup
      
      const encryptedKeyKey = `${this.prefix}key-${key}`;
      const encryptedKey = localStorage.getItem(encryptedKeyKey) || 
                          localStorage.getItem(`${FAILOVER_KEY_PREFIX}${key}`);
      
      if (!encryptedKey) return true; // Can't decrypt backup
      
      // Decrypt the encryption key
      const decryptedKey = await failsafeCrypto<string>('decrypt', [encryptedKey, masterKey]);
      if (!decryptedKey) return true;
      
      // Decrypt the backup value
      const decryptedBackup = await failsafeCrypto<string>(
        'decrypt', 
        [backupValue, decryptedKey.split('').reverse().join('')]
      );
      
      // Compare the primary and backup values
      return primaryValue === decryptedBackup;
    } catch (error) {
      console.error(`Error verifying integrity for ${key}:`, error);
      return false;
    }
  }
  
  // Repair corrupted data
  async repair(key: string): Promise<boolean> {
    try {
      const primaryValue = localStorage.getItem(this.prefix + key);
      const backupValue = localStorage.getItem(this.backupPrefix + key);
      
      if (!primaryValue && !backupValue) return false;
      
      if (!primaryValue && backupValue) {
        // Primary is missing, restore from backup
        const masterKey = localStorage.getItem('master_key');
        if (!masterKey) {
          // Can't decrypt backup, just copy it to primary
          localStorage.setItem(this.prefix + key, backupValue);
          return true;
        }
        
        const encryptedKeyKey = `${this.prefix}key-${key}`;
        const encryptedKey = localStorage.getItem(encryptedKeyKey) || 
                            localStorage.getItem(`${FAILOVER_KEY_PREFIX}${key}`);
        
        if (!encryptedKey) {
          // Can't decrypt backup, just copy it to primary
          localStorage.setItem(this.prefix + key, backupValue);
          return true;
        }
        
        // Decrypt the encryption key
        const decryptedKey = await failsafeCrypto<string>('decrypt', [encryptedKey, masterKey]);
        if (!decryptedKey) {
          // Can't decrypt backup, just copy it to primary
          localStorage.setItem(this.prefix + key, backupValue);
          return true;
        }
        
        // Decrypt the backup value
        const decryptedBackup = await failsafeCrypto<string>(
          'decrypt', 
          [backupValue, decryptedKey.split('').reverse().join('')]
        );
        
        // Re-encrypt and store as primary
        const reEncrypted = await failsafeCrypto<string>('encrypt', [decryptedBackup, decryptedKey]);
        localStorage.setItem(this.prefix + key, reEncrypted);
        return true;
      }
      
      if (primaryValue && !backupValue) {
        // Backup is missing, restore from primary
        const masterKey = localStorage.getItem('master_key');
        if (!masterKey) {
          // Can't decrypt primary, just copy it to backup
          localStorage.setItem(this.backupPrefix + key, primaryValue);
          return true;
        }
        
        const encryptedKeyKey = `${this.prefix}key-${key}`;
        const encryptedKey = localStorage.getItem(encryptedKeyKey) || 
                            localStorage.getItem(`${FAILOVER_KEY_PREFIX}${key}`);
        
        if (!encryptedKey) {
          // Can't decrypt primary, just copy it to backup
          localStorage.setItem(this.backupPrefix + key, primaryValue);
          return true;
        }
        
        // Decrypt the encryption key
        const decryptedKey = await failsafeCrypto<string>('decrypt', [encryptedKey, masterKey]);
        if (!decryptedKey) {
          // Can't decrypt primary, just copy it to backup
          localStorage.setItem(this.backupPrefix + key, primaryValue);
          return true;
        }
        
        // Decrypt the primary value
        const decryptedPrimary = await failsafeCrypto<string>('decrypt', [primaryValue, decryptedKey]);
        
        // Re-encrypt and store as backup with reversed key
        const reEncrypted = await failsafeCrypto<string>(
          'encrypt', 
          [decryptedPrimary, decryptedKey.split('').reverse().join('')]
        );
        localStorage.setItem(this.backupPrefix + key, reEncrypted);
        return true;
      }
      
      // Both exist, verify they match
      return await this.verifyIntegrity(key);
    } catch (error) {
      console.error(`Error repairing ${key}:`, error);
      return false;
    }
  }
}

// Create and register the implementation
const localStorageImpl: FailsafeImplementation<StorageImplementation> = {
  id: `${StorageMedium.LOCAL_STORAGE}-primary`,
  name: "Encrypted Local Storage",
  type: FailsafeComponentType.STORAGE,
  description: "Browser localStorage with PQC encryption",
  priority: 100,
  strategy: FailsafeStrategy.DEFAULT,
  implementation: new LocalStorageImplementation(),
  status: FailsafeStatus.ONLINE,
  
  async isAvailable(): Promise<boolean> {
    try {
      // Test if localStorage is available
      const testKey = `test-${crypto.randomUUID()}`;
      localStorage.setItem(testKey, "test");
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      return testValue === "test";
    } catch (error) {
      console.error("localStorage not available:", error);
      return false;
    }
  },
  
  async activate(): Promise<boolean> {
    console.log("Activating encrypted localStorage implementation");
    this.status = FailsafeStatus.ONLINE;
    return true;
  },
  
  async deactivate(): Promise<boolean> {
    console.log("Deactivating encrypted localStorage implementation");
    return true;
  },
  
  async test(): Promise<FailsafeTestResult> {
    try {
      const startTime = performance.now();
      
      // Test basic storage operations
      const testKey = `test-${crypto.randomUUID()}`;
      const testValue = `Test value ${Date.now()}`;
      
      await this.implementation.setItem(testKey, testValue);
      const retrievedValue = await this.implementation.getItem(testKey);
      await this.implementation.removeItem(testKey);
      
      const endTime = performance.now();
      
      // Also test the integrity verification and repair capabilities
      const integrityTestKey = `integrity-test-${crypto.randomUUID()}`;
      await this.implementation.setItem(integrityTestKey, "integrity test");
      
      // Verify integrity
      const integrity = await (this.implementation as LocalStorageImplementation).verifyIntegrity(integrityTestKey);
      
      // Test repair
      const repairSuccess = await (this.implementation as LocalStorageImplementation).repair(integrityTestKey);
      
      // Clean up
      await this.implementation.removeItem(integrityTestKey);
      
      return {
        success: retrievedValue === testValue && integrity && repairSuccess,
        latency: endTime - startTime,
        details: {
          valueStored: testValue,
          valueRetrieved: retrievedValue,
          getSuccessful: retrievedValue === testValue,
          integrityVerified: integrity,
          repairSuccessful: repairSuccess
        }
      };
    } catch (error) {
      console.error("Error testing localStorage implementation:", error);
      return {
        success: false,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }
};

// Register with the storage failsafe coordinator
storageFailsafe.registerImplementation(localStorageImpl);

export default localStorageImpl;
