
/**
 * TetraCryptPQC In-Memory Storage Implementation
 * For fallback when localStorage or other persistent storage is unavailable
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

class InMemoryStorageImplementation implements StorageImplementation {
  private storage: Map<string, string> = new Map();
  
  async setItem(key: string, value: string): Promise<boolean> {
    try {
      this.storage.set(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in memory storage:`, error);
      return false;
    }
  }
  
  async getItem(key: string): Promise<string | null> {
    return this.storage.get(key) || null;
  }
  
  async removeItem(key: string): Promise<boolean> {
    return this.storage.delete(key);
  }
  
  async clear(): Promise<boolean> {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing memory storage:`, error);
      return false;
    }
  }
  
  async keys(): Promise<string[]> {
    return Array.from(this.storage.keys());
  }
}

// Create and register the implementation
const inMemoryStorageImpl: FailsafeImplementation<StorageImplementation> = {
  id: `${StorageMedium.IN_MEMORY}-fallback`,
  name: "In-Memory Storage",
  type: FailsafeComponentType.STORAGE,
  description: "Ephemeral in-memory storage for fallback scenarios",
  priority: 60,
  strategy: FailsafeStrategy.BACKUP,
  implementation: new InMemoryStorageImplementation(),
  status: FailsafeStatus.ONLINE,
  
  async isAvailable(): Promise<boolean> {
    // In-memory storage is always available
    return true;
  },
  
  async activate(): Promise<boolean> {
    console.log("Activating in-memory storage implementation");
    this.status = FailsafeStatus.FALLBACK;
    return true;
  },
  
  async deactivate(): Promise<boolean> {
    console.log("Deactivating in-memory storage implementation");
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
      console.error("Error testing in-memory storage implementation:", error);
      return {
        success: false,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }
};

// Register with the storage failsafe coordinator
storageFailsafe.registerImplementation(inMemoryStorageImpl);

export default inMemoryStorageImpl;
