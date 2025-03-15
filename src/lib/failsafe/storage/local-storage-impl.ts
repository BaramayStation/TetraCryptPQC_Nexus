
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
import { encryptWithPQC, decryptWithPQC } from '../../crypto';

// A simple encryption key for local storage
// In production, this would be derived securely
const STORAGE_ENCRYPTION_KEY = "TetraCryptPQC-Storage-Key";

class LocalStorageImplementation implements StorageImplementation {
  private prefix = "tetracrypt-";
  
  async setItem(key: string, value: string): Promise<boolean> {
    try {
      const encryptedValue = await encryptWithPQC(value, STORAGE_ENCRYPTION_KEY);
      localStorage.setItem(this.prefix + key, encryptedValue);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  }
  
  async getItem(key: string): Promise<string | null> {
    try {
      const encryptedValue = localStorage.getItem(this.prefix + key);
      if (!encryptedValue) return null;
      
      return await decryptWithPQC(encryptedValue, STORAGE_ENCRYPTION_KEY);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  }
  
  async removeItem(key: string): Promise<boolean> {
    try {
      localStorage.removeItem(this.prefix + key);
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
      const tetracryptKeys = allKeys.filter(key => key.startsWith(this.prefix));
      
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
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.substring(this.prefix.length));
    } catch (error) {
      console.error(`Error getting keys from localStorage:`, error);
      return [];
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
      
      return {
        success: retrievedValue === testValue,
        latency: endTime - startTime,
        details: {
          valueStored: testValue,
          valueRetrieved: retrievedValue,
          getSuccessful: retrievedValue === testValue
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
