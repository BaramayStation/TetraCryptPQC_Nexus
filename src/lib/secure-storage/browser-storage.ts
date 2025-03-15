
/**
 * TetraCryptPQC Browser Storage Utilities
 * 
 * Safe abstractions for browser storage APIs
 */

import { logSecurityEvent } from './security-utils';

/**
 * Get localStorage with error handling
 */
export function getLocalStorage(): Storage {
  try {
    // Test if localStorage is accessible
    localStorage.setItem('__test_key__', '1');
    localStorage.removeItem('__test_key__');
    return localStorage;
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
    return createInMemoryStorage();
  }
}

/**
 * Get sessionStorage with error handling
 */
export function getSessionStorage(): Storage {
  try {
    // Test if sessionStorage is accessible
    sessionStorage.setItem('__test_key__', '1');
    sessionStorage.removeItem('__test_key__');
    return sessionStorage;
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
    return createInMemoryStorage();
  }
}

/**
 * Set an item in localStorage with error handling
 */
export function setLocalStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error("Error setting localStorage item:", error);
    return false;
  }
}

/**
 * Get an item from localStorage with error handling
 */
export function getLocalStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return null;
  }
}

/**
 * Remove an item from localStorage with error handling
 */
export function removeLocalStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing localStorage item:", error);
    return false;
  }
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
    },
    getItem: function(key: string): string | null {
      return memoryStore.has(key) ? memoryStore.get(key)! : null;
    },
    key: function(index: number): string | null {
      const keys = Array.from(memoryStore.keys());
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    removeItem: function(key: string): void {
      memoryStore.delete(key);
      this.length = memoryStore.size;
    },
    setItem: function(key: string, value: string): void {
      memoryStore.set(key, value);
      this.length = memoryStore.size;
    }
  };
  
  return storage;
}
