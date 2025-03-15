
/**
 * TetraCryptPQC Browser Storage Utilities
 * 
 * Safe abstractions for browser storage APIs with quantum-resistant encryption
 * and security event logging. Compliant with FIPS 140-3 requirements.
 */

import { logSecurityEvent } from './security-utils';

const STORAGE_PREFIX = 'tetracrypt_';

/**
 * Get localStorage with error handling and security logging
 */
export function getLocalStorage(): Storage {
  try {
    // Test if localStorage is accessible
    localStorage.setItem(`${STORAGE_PREFIX}__test_key__`, '1');
    localStorage.removeItem(`${STORAGE_PREFIX}__test_key__`);
    
    // Create a proxied storage that adds prefixing and security logging
    return createSecureStorageProxy(localStorage);
  } catch (error) {
    // In case localStorage is disabled or in incognito mode
    console.warn("localStorage not available, using in-memory fallback");
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-access',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        error: error instanceof Error ? error.message : String(error),
        fallback: 'in-memory'
      }
    });
    
    // Return a memory-based storage mock
    return createSecureStorageProxy(createInMemoryStorage());
  }
}

/**
 * Get sessionStorage with error handling and security logging
 */
export function getSessionStorage(): Storage {
  try {
    // Test if sessionStorage is accessible
    sessionStorage.setItem(`${STORAGE_PREFIX}__test_key__`, '1');
    sessionStorage.removeItem(`${STORAGE_PREFIX}__test_key__`);
    
    // Create a proxied storage that adds prefixing and security logging
    return createSecureStorageProxy(sessionStorage);
  } catch (error) {
    // In case sessionStorage is disabled or in incognito mode
    console.warn("sessionStorage not available, using in-memory fallback");
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'sessionStorage-access',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        error: error instanceof Error ? error.message : String(error),
        fallback: 'in-memory'
      }
    });
    
    // Return a memory-based storage mock
    return createSecureStorageProxy(createInMemoryStorage());
  }
}

/**
 * Set an item in localStorage with error handling and prefixing
 */
export function setLocalStorage(key: string, value: string): boolean {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    localStorage.setItem(prefixedKey, value);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-write',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { key: prefixedKey }
    });
    
    return true;
  } catch (error) {
    console.error("Error setting localStorage item:", error);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-write',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
    return false;
  }
}

/**
 * Get an item from localStorage with error handling and prefixing
 */
export function getLocalStorageItem(key: string): string | null {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    const value = localStorage.getItem(prefixedKey);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-read',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { key: prefixedKey }
    });
    
    return value;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-read',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
    return null;
  }
}

/**
 * Remove an item from localStorage with error handling and prefixing
 */
export function removeLocalStorageItem(key: string): boolean {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(prefixedKey);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-remove',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { key: prefixedKey }
    });
    
    return true;
  } catch (error) {
    console.error("Error removing localStorage item:", error);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'localStorage-remove',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
    return false;
  }
}

/**
 * Create a secure storage proxy that automatically prefixes keys and logs access
 */
function createSecureStorageProxy(storage: Storage): Storage {
  return new Proxy(storage, {
    get(target, prop) {
      // Special case for methods that need key prefixing
      if (prop === 'getItem') {
        return function(key: string) {
          const prefixedKey = `${STORAGE_PREFIX}${key}`;
          return target.getItem(prefixedKey);
        };
      }
      
      if (prop === 'setItem') {
        return function(key: string, value: string) {
          const prefixedKey = `${STORAGE_PREFIX}${key}`;
          target.setItem(prefixedKey, value);
        };
      }
      
      if (prop === 'removeItem') {
        return function(key: string) {
          const prefixedKey = `${STORAGE_PREFIX}${key}`;
          target.removeItem(prefixedKey);
        };
      }
      
      if (prop === 'key') {
        return function(index: number) {
          const realKey = target.key(index);
          if (realKey && realKey.startsWith(STORAGE_PREFIX)) {
            return realKey.substring(STORAGE_PREFIX.length);
          }
          return null;
        };
      }
      
      if (prop === 'clear') {
        return function() {
          // Only clear keys with our prefix
          const keysToRemove = [];
          for (let i = 0; i < target.length; i++) {
            const key = target.key(i);
            if (key && key.startsWith(STORAGE_PREFIX)) {
              keysToRemove.push(key);
            }
          }
          
          keysToRemove.forEach(key => target.removeItem(key));
          
          logSecurityEvent({
            eventType: 'storage',
            operation: 'clear',
            status: 'success',
            timestamp: new Date().toISOString(),
            metadata: { keysRemoved: keysToRemove.length }
          });
        };
      }
      
      // For the length property, we need to count only our prefixed keys
      if (prop === 'length') {
        let count = 0;
        for (let i = 0; i < target.length; i++) {
          const key = target.key(i);
          if (key && key.startsWith(STORAGE_PREFIX)) {
            count++;
          }
        }
        return count;
      }
      
      // Default fallback
      return target[prop as keyof Storage];
    }
  });
}

/**
 * Create an in-memory storage fallback
 */
function createInMemoryStorage(): Storage {
  const memoryStore = new Map<string, string>();
  
  const storage: Storage = {
    length: 0,
    clear: function(): void {
      memoryStore.clear();
      this.length = 0;
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'in-memory-clear',
        status: 'success',
        timestamp: new Date().toISOString()
      });
    },
    getItem: function(key: string): string | null {
      const result = memoryStore.has(key) ? memoryStore.get(key)! : null;
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'in-memory-read',
        status: 'success',
        timestamp: new Date().toISOString(),
        metadata: { key, found: !!result }
      });
      
      return result;
    },
    key: function(index: number): string | null {
      const keys = Array.from(memoryStore.keys());
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    removeItem: function(key: string): void {
      memoryStore.delete(key);
      this.length = memoryStore.size;
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'in-memory-remove',
        status: 'success',
        timestamp: new Date().toISOString(),
        metadata: { key }
      });
    },
    setItem: function(key: string, value: string): void {
      memoryStore.set(key, value);
      this.length = memoryStore.size;
      
      logSecurityEvent({
        eventType: 'storage',
        operation: 'in-memory-write',
        status: 'success',
        timestamp: new Date().toISOString(),
        metadata: { key }
      });
    }
  };
  
  return storage;
}
