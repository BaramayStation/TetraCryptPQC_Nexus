
/**
 * TetraCryptPQC Storage Manager
 * 
 * Manages multiple storage providers with failover capabilities
 */

import { StorageProvider } from './storage-types';
import { localStorageProvider, indexedDBProvider, sessionStorageProvider } from './storage-providers';
import { logSecurityEvent } from './security-utils';

// Storage provider manager with failover capabilities
export class FailsafeStorage {
  private providers: StorageProvider[] = [
    localStorageProvider,
    indexedDBProvider,
    sessionStorageProvider
  ];
  private availableProviders: StorageProvider[] = [];
  
  constructor() {
    this.initialize();
  }
  
  private async initialize() {
    // Check which providers are available
    for (const provider of this.providers) {
      const available = await provider.isAvailable();
      if (available) {
        this.availableProviders.push(provider);
        console.log(`Storage provider available: ${provider.name}`);
      }
    }
    
    if (this.availableProviders.length === 0) {
      console.error("No storage providers available");
      logSecurityEvent({
        eventType: 'storage',
        operation: 'initialize',
        status: 'failure',
        timestamp: new Date().toISOString(),
        metadata: { reason: 'No storage providers available' }
      });
    }
  }
  
  public async write(key: string, data: string): Promise<boolean> {
    for (const provider of this.availableProviders) {
      try {
        const success = await provider.write(key, data);
        if (success) return true;
      } catch (error) {
        console.error(`Storage provider ${provider.name} write failed:`, error);
      }
    }
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'write',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { key }
    });
    
    return false;
  }
  
  public async read(key: string): Promise<string | null> {
    for (const provider of this.availableProviders) {
      try {
        const data = await provider.read(key);
        if (data !== null) return data;
      } catch (error) {
        console.error(`Storage provider ${provider.name} read failed:`, error);
      }
    }
    
    return null;
  }
  
  public async delete(key: string): Promise<boolean> {
    let success = false;
    for (const provider of this.availableProviders) {
      try {
        success = await provider.delete(key) || success;
      } catch (error) {
        console.error(`Storage provider ${provider.name} delete failed:`, error);
      }
    }
    
    if (!success) {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'delete',
        status: 'failure',
        timestamp: new Date().toISOString(),
        metadata: { key }
      });
    }
    
    return success;
  }
  
  public async list(): Promise<string[]> {
    for (const provider of this.availableProviders) {
      try {
        const keys = await provider.list();
        if (keys.length > 0) return keys;
      } catch (error) {
        console.error(`Storage provider ${provider.name} list failed:`, error);
      }
    }
    
    return [];
  }
}

// Initialize failsafe storage
export const failsafeStorage = new FailsafeStorage();

// Utility class for in-memory Map storage
export class MemoryStorageManager {
  private storage: Map<string, {
    value: string,
    timestamp: number
  }> = new Map();
  
  set(key: string, value: string): boolean {
    try {
      this.storage.set(key, {
        value,
        timestamp: Date.now()
      });
      return true;
    } catch (error) {
      console.error("Memory storage set failed:", error);
      return false;
    }
  }
  
  get(key: string): string | null {
    try {
      const result = this.storage.get(key);
      return result ? result.value : null;
    } catch (error) {
      console.error("Memory storage get failed:", error);
      return null;
    }
  }
  
  delete(key: string): boolean {
    try {
      return this.storage.delete(key);
    } catch (error) {
      console.error("Memory storage delete failed:", error);
      return false;
    }
  }
  
  has(key: string): boolean {
    return this.storage.has(key);
  }
  
  clear(): boolean {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error("Memory storage clear failed:", error);
      return false;
    }
  }
  
  keys(): string[] {
    return Array.from(this.storage.keys());
  }
}

// Create a failsafe storage system with multiple backends
export class RedundantStorage {
  private memoryStorage = new MemoryStorageManager();
  
  // Try to store data in multiple places for redundancy
  async set(key: string, value: string): Promise<boolean> {
    try {
      // 1. Primary storage - failsafeStorage
      const primarySuccess = await failsafeStorage.write(key, value);
      
      // 2. Secondary storage - Memory Map
      const secondarySuccess = this.memoryStorage.set(key, value);
      
      return primarySuccess || secondarySuccess;
    } catch (error) {
      console.error("Redundant storage set failed:", error);
      
      // If primary storage fails, at least store in memory
      return this.memoryStorage.set(key, value);
    }
  }
  
  // Try to retrieve data from multiple storage locations
  async get(key: string): Promise<string | null> {
    // Try to retrieve in order of reliability and performance
    try {
      // 1. First try failsafeStorage (most persistent)
      const primaryValue = await failsafeStorage.read(key);
      if (primaryValue) return primaryValue;
      
      // 2. Then try memory map (fastest)
      const memoryValue = this.memoryStorage.get(key);
      if (memoryValue) return memoryValue;
      
      return null;
    } catch (error) {
      console.error("Redundant storage get failed:", error);
      
      // If failsafeStorage access fails, try the in-memory storage
      return this.memoryStorage.get(key);
    }
  }
  
  // Delete data from all storage locations
  async delete(key: string): Promise<boolean> {
    try {
      // 1. Remove from failsafeStorage
      const primarySuccess = await failsafeStorage.delete(key);
      
      // 2. Remove from memory map
      const secondarySuccess = this.memoryStorage.delete(key);
      
      return primarySuccess || secondarySuccess;
    } catch (error) {
      console.error("Redundant storage delete failed:", error);
      
      // At minimum, try to remove from memory
      return this.memoryStorage.delete(key);
    }
  }
  
  // Check if data exists in any storage location
  async exists(key: string): Promise<boolean> {
    try {
      // Check memory first (fastest)
      if (this.memoryStorage.has(key)) return true;
      
      // Then check failsafeStorage
      const value = await failsafeStorage.read(key);
      return value !== null;
    } catch (error) {
      console.error("Redundant storage exists check failed:", error);
      return false;
    }
  }
  
  // List all keys
  async keys(): Promise<string[]> {
    try {
      const primaryKeys = await failsafeStorage.list();
      const memoryKeys = this.memoryStorage.keys();
      
      // Combine and deduplicate keys
      return [...new Set([...primaryKeys, ...memoryKeys])];
    } catch (error) {
      console.error("Redundant storage keys listing failed:", error);
      return this.memoryStorage.keys();
    }
  }
}

// Export the redundant storage system
export const redundantStorage = new RedundantStorage();
