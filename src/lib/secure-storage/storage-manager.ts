
/**
 * TetraCryptPQC Storage Management
 * 
 * Implements storage management with failover capabilities
 */

import { StorageProvider, StorageOperation } from './storage-types';
import { 
  localStorageProvider, 
  indexedDBProvider, 
  sessionStorageProvider 
} from './storage-providers';
import { logSecurityEvent } from './security-utils';

/**
 * Memory-based storage manager
 */
export class MemoryStorageManager {
  private data: Map<string, string> = new Map();
  
  /**
   * Write data to memory
   */
  async write(key: string, value: string): Promise<boolean> {
    try {
      this.data.set(key, value);
      return true;
    } catch (error) {
      console.error("Memory storage write error:", error);
      return false;
    }
  }
  
  /**
   * Read data from memory
   */
  async read(key: string): Promise<string | null> {
    try {
      return this.data.get(key) || null;
    } catch (error) {
      console.error("Memory storage read error:", error);
      return null;
    }
  }
  
  /**
   * Delete data from memory
   */
  async delete(key: string): Promise<boolean> {
    try {
      return this.data.delete(key);
    } catch (error) {
      console.error("Memory storage delete error:", error);
      return false;
    }
  }
  
  /**
   * List all keys in memory
   */
  async list(): Promise<string[]> {
    try {
      return Array.from(this.data.keys());
    } catch (error) {
      console.error("Memory storage list error:", error);
      return [];
    }
  }
}

/**
 * Redundant storage with multiple providers
 */
export class RedundantStorage {
  private providers: StorageProvider[];
  
  /**
   * Create a new redundant storage
   */
  constructor(providers: StorageProvider[]) {
    this.providers = providers;
  }
  
  /**
   * Write data to all available providers
   */
  async write(key: string, value: string): Promise<boolean> {
    const timestamp = new Date().toISOString();
    const availableProviders = await this.getAvailableProviders();
    
    if (availableProviders.length === 0) {
      console.error("No storage providers available for write operation");
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'write',
        status: 'failure',
        timestamp,
        metadata: { key, reason: 'no-providers-available' }
      });
      
      return false;
    }
    
    // Write to all available providers
    const results = await Promise.all(
      availableProviders.map(provider => 
        provider.write(key, value)
          .catch(error => {
            console.error(`Write to ${provider.name} failed:`, error);
            return false;
          })
      )
    );
    
    // Ensure at least one provider succeeded
    const success = results.some(result => result === true);
    
    if (success) {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'write',
        status: 'success',
        timestamp,
        metadata: { 
          key, 
          providersTotal: availableProviders.length,
          providersSuccess: results.filter(Boolean).length
        }
      });
    } else {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'write',
        status: 'failure',
        timestamp,
        metadata: { 
          key, 
          providersTotal: availableProviders.length,
          providersAttempted: results.length
        }
      });
    }
    
    return success;
  }
  
  /**
   * Read data from providers, using the first available one
   */
  async read(key: string): Promise<string | null> {
    const timestamp = new Date().toISOString();
    const availableProviders = await this.getAvailableProviders();
    
    if (availableProviders.length === 0) {
      console.error("No storage providers available for read operation");
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'read',
        status: 'failure',
        timestamp,
        metadata: { key, reason: 'no-providers-available' }
      });
      
      return null;
    }
    
    // Try each provider until we get a result
    for (const provider of availableProviders) {
      try {
        const result = await provider.read(key);
        
        if (result !== null) {
          logSecurityEvent({
            eventType: 'storage',
            operation: 'read',
            status: 'success',
            timestamp,
            metadata: { key, provider: provider.name }
          });
          
          return result;
        }
      } catch (error) {
        console.error(`Read from ${provider.name} failed:`, error);
      }
    }
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'read',
      status: 'failure',
      timestamp,
      metadata: { key, reason: 'not-found-in-any-provider' }
    });
    
    return null;
  }
  
  /**
   * Delete data from all available providers
   */
  async delete(key: string): Promise<boolean> {
    const timestamp = new Date().toISOString();
    const availableProviders = await this.getAvailableProviders();
    
    if (availableProviders.length === 0) {
      console.error("No storage providers available for delete operation");
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'delete',
        status: 'failure',
        timestamp,
        metadata: { key, reason: 'no-providers-available' }
      });
      
      return false;
    }
    
    // Delete from all available providers
    const results = await Promise.all(
      availableProviders.map(provider => 
        provider.delete(key)
          .catch(error => {
            console.error(`Delete from ${provider.name} failed:`, error);
            return false;
          })
      )
    );
    
    // Ensure at least one provider succeeded
    const success = results.some(result => result === true);
    
    if (success) {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'delete',
        status: 'success',
        timestamp,
        metadata: { 
          key, 
          providersTotal: availableProviders.length,
          providersSuccess: results.filter(Boolean).length
        }
      });
    } else {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'delete',
        status: 'failure',
        timestamp,
        metadata: { 
          key, 
          providersTotal: availableProviders.length,
          providersAttempted: results.length
        }
      });
    }
    
    return success;
  }
  
  /**
   * List keys from all available providers
   */
  async list(): Promise<string[]> {
    const availableProviders = await this.getAvailableProviders();
    
    if (availableProviders.length === 0) {
      console.error("No storage providers available for list operation");
      return [];
    }
    
    // Get lists from all available providers
    const lists = await Promise.all(
      availableProviders.map(provider => 
        provider.list()
          .catch(error => {
            console.error(`List from ${provider.name} failed:`, error);
            return [] as string[];
          })
      )
    );
    
    // Combine all lists and remove duplicates
    const allKeys = lists.flat();
    const uniqueKeys = [...new Set(allKeys)];
    
    return uniqueKeys;
  }
  
  /**
   * Get all available providers
   */
  private async getAvailableProviders(): Promise<StorageProvider[]> {
    const availabilityChecks = await Promise.all(
      this.providers.map(async provider => {
        try {
          const available = await provider.isAvailable();
          return { provider, available };
        } catch (error) {
          console.error(`Error checking availability of ${provider.name}:`, error);
          return { provider, available: false };
        }
      })
    );
    
    return availabilityChecks
      .filter(check => check.available)
      .map(check => check.provider);
  }
}

/**
 * Create a default redundant storage instance
 */
export const redundantStorage = new RedundantStorage([
  localStorageProvider,
  indexedDBProvider,
  sessionStorageProvider
]);

/**
 * Failsafe storage with memory backup
 */
export const failsafeStorage = {
  // Memory backup for critical operations
  memoryBackup: new MemoryStorageManager(),
  
  // Write data with failover to memory
  async write(key: string, value: string): Promise<boolean> {
    try {
      const redundantResult = await redundantStorage.write(key, value);
      
      // Backup to memory regardless of redundant result
      await this.memoryBackup.write(key, value);
      
      return redundantResult;
    } catch (error) {
      console.error("Failsafe storage write error:", error);
      
      // Last resort: try to write to memory
      return this.memoryBackup.write(key, value);
    }
  },
  
  // Read data with failover to memory
  async read(key: string): Promise<string | null> {
    try {
      // Try redundant storage first
      const redundantResult = await redundantStorage.read(key);
      
      if (redundantResult !== null) {
        return redundantResult;
      }
      
      // Fall back to memory if not found
      return this.memoryBackup.read(key);
    } catch (error) {
      console.error("Failsafe storage read error:", error);
      
      // Last resort: try to read from memory
      return this.memoryBackup.read(key);
    }
  },
  
  // Delete data from both redundant and memory
  async delete(key: string): Promise<boolean> {
    try {
      const redundantResult = await redundantStorage.delete(key);
      
      // Also delete from memory
      await this.memoryBackup.delete(key);
      
      return redundantResult;
    } catch (error) {
      console.error("Failsafe storage delete error:", error);
      
      // Last resort: try to delete from memory
      return this.memoryBackup.delete(key);
    }
  },
  
  // List keys from both redundant and memory
  async list(): Promise<string[]> {
    try {
      const redundantKeys = await redundantStorage.list();
      const memoryKeys = await this.memoryBackup.list();
      
      // Combine and deduplicate
      return [...new Set([...redundantKeys, ...memoryKeys])];
    } catch (error) {
      console.error("Failsafe storage list error:", error);
      
      // Last resort: try to list from memory
      return this.memoryBackup.list();
    }
  }
};
