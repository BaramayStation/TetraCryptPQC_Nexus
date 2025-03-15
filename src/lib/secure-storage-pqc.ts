
/**
 * Secure Storage with Post-Quantum Cryptography
 * 
 * Implements fully PQC-protected storage operations
 */

import { failsafeCrypto, hashWithSHA3 } from './crypto';
import { getUserProfile } from './storage';

// Storage operation types
type StorageOperation = 'read' | 'write' | 'delete' | 'list';

// Storage encryption modes
type EncryptionMode = 'direct' | 'key-encapsulation' | 'hybrid';

// Multiple storage providers for failsafe operation
interface StorageProvider {
  name: string;
  isAvailable: () => Promise<boolean>;
  write: (key: string, data: string) => Promise<boolean>;
  read: (key: string) => Promise<string | null>;
  delete: (key: string) => Promise<boolean>;
  list: () => Promise<string[]>;
}

// Primary storage provider - localStorage with encryption
const localStorageProvider: StorageProvider = {
  name: 'localStorage',
  isAvailable: async () => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  },
  write: async (key: string, data: string) => {
    try {
      localStorage.setItem(key, data);
      return true;
    } catch {
      return false;
    }
  },
  read: async (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  delete: async (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  list: async () => {
    try {
      return Object.keys(localStorage);
    } catch {
      return [];
    }
  }
};

// Secondary storage provider - IndexedDB
const indexedDBProvider: StorageProvider = {
  name: 'IndexedDB',
  isAvailable: async () => {
    return 'indexedDB' in window;
  },
  write: async (key: string, data: string) => {
    try {
      return new Promise((resolve) => {
        const request = indexedDB.open('tetraCryptStorage', 1);
        
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains('data')) {
            db.createObjectStore('data');
          }
        };
        
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(['data'], 'readwrite');
          const store = transaction.objectStore('data');
          store.put(data, key);
          
          transaction.oncomplete = () => {
            db.close();
            resolve(true);
          };
          
          transaction.onerror = () => {
            db.close();
            resolve(false);
          };
        };
        
        request.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  },
  read: async (key: string) => {
    try {
      return new Promise((resolve) => {
        const request = indexedDB.open('tetraCryptStorage', 1);
        
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(['data'], 'readonly');
          const store = transaction.objectStore('data');
          const getRequest = store.get(key);
          
          getRequest.onsuccess = () => {
            db.close();
            resolve(getRequest.result || null);
          };
          
          getRequest.onerror = () => {
            db.close();
            resolve(null);
          };
        };
        
        request.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  },
  delete: async (key: string) => {
    try {
      return new Promise((resolve) => {
        const request = indexedDB.open('tetraCryptStorage', 1);
        
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(['data'], 'readwrite');
          const store = transaction.objectStore('data');
          const deleteRequest = store.delete(key);
          
          transaction.oncomplete = () => {
            db.close();
            resolve(true);
          };
          
          transaction.onerror = () => {
            db.close();
            resolve(false);
          };
        };
        
        request.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  },
  list: async () => {
    try {
      return new Promise((resolve) => {
        const request = indexedDB.open('tetraCryptStorage', 1);
        
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(['data'], 'readonly');
          const store = transaction.objectStore('data');
          const getAllKeysRequest = store.getAllKeys();
          
          getAllKeysRequest.onsuccess = () => {
            db.close();
            resolve(Array.from(getAllKeysRequest.result).map(key => String(key)));
          };
          
          getAllKeysRequest.onerror = () => {
            db.close();
            resolve([]);
          };
        };
        
        request.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }
};

// Fallback provider - SessionStorage
const sessionStorageProvider: StorageProvider = {
  name: 'sessionStorage',
  isAvailable: async () => {
    try {
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  },
  write: async (key: string, data: string) => {
    try {
      sessionStorage.setItem(key, data);
      return true;
    } catch {
      return false;
    }
  },
  read: async (key: string) => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  delete: async (key: string) => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  list: async () => {
    try {
      return Object.keys(sessionStorage);
    } catch {
      return [];
    }
  }
};

// Storage provider manager with failover capabilities
class FailsafeStorage {
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
const failsafeStorage = new FailsafeStorage();

/**
 * Encrypt data with PQC algorithms
 */
export async function encryptData(
  data: string,
  recipientPublicKey?: string,
  mode: EncryptionMode = 'hybrid'
): Promise<{
  ciphertext: string;
  encapsulatedKey?: string;
  algorithm: string;
  mode: EncryptionMode;
  metadata: {
    iv: string;
    timestamp: string;
    mode: string;
  };
}> {
  console.log(`🔹 Encrypting data with PQC (mode: ${mode})`);
  
  try {
    // Generate random IV
    const iv = Array.from(crypto.getRandomValues(new Uint8Array(16)), 
      byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Get user profile
    const profile = getUserProfile();
    if (!profile || !profile.keyPairs?.pqkem) {
      throw new Error("User profile or encryption keys not found");
    }
    
    // Use recipient's public key if provided, otherwise use user's own
    const publicKey = recipientPublicKey || profile.keyPairs.pqkem.publicKey;
    
    // Use the failsafe crypto system
    const encryptedData = await failsafeCrypto<string>(
      'encrypt',
      [data, publicKey]
    );
    
    return {
      ciphertext: encryptedData,
      algorithm: 'ML-KEM-1024',
      mode,
      metadata: {
        iv,
        timestamp: new Date().toISOString(),
        mode
      }
    };
  } catch (error) {
    console.error("Data encryption failed:", error);
    throw new Error(`Data encryption failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Decrypt data with PQC algorithms
 */
export async function decryptData(
  ciphertext: string,
  encapsulatedKey?: string,
  mode: EncryptionMode = 'hybrid',
  metadata?: { iv: string }
): Promise<string> {
  console.log(`🔹 Decrypting data with PQC (mode: ${mode})`);
  
  try {
    // Get user profile
    const profile = getUserProfile();
    if (!profile || !profile.keyPairs?.pqkem) {
      throw new Error("User profile or encryption keys not found");
    }
    
    if (!metadata?.iv) {
      throw new Error("Missing IV in metadata");
    }
    
    // Use the failsafe crypto system
    return await failsafeCrypto<string>(
      'decrypt',
      [ciphertext, profile.keyPairs.pqkem.privateKey]
    );
  } catch (error) {
    console.error("Data decryption failed:", error);
    throw new Error(`Data decryption failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Store data with PQC protection
 */
export async function storeSecureData(
  key: string,
  data: any,
  options: {
    publicKey?: string;
    mode?: EncryptionMode;
    sensitivity?: 'low' | 'medium' | 'high';
  } = {}
): Promise<{
  success: boolean;
  storageKey: string;
  timestamp: string;
}> {
  console.log(`🔹 Storing data securely with PQC protection: ${key}`);
  
  try {
    // Choose encryption mode based on sensitivity
    const mode = options.mode || 
      (options.sensitivity === 'high' ? 'hybrid' : 
       options.sensitivity === 'medium' ? 'key-encapsulation' : 
       'direct');
    
    // Convert data to string if necessary
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Encrypt the data
    const encryptionResult = await encryptData(
      dataString,
      options.publicKey,
      mode
    );
    
    // Generate a storage access key with a hash
    const timestamp = new Date().toISOString();
    const storageKeyHash = await hashWithSHA3(key + timestamp);
    const storageKey = `${key}_${storageKeyHash.substring(0, 8)}`;
    
    // Store the encrypted data
    const storageData = JSON.stringify({
      ciphertext: encryptionResult.ciphertext,
      encapsulatedKey: encryptionResult.encapsulatedKey,
      algorithm: encryptionResult.algorithm,
      mode: encryptionResult.mode,
      metadata: encryptionResult.metadata,
      timestamp
    });
    
    const success = await failsafeStorage.write(storageKey, storageData);
    
    return {
      success,
      storageKey,
      timestamp
    };
  } catch (error) {
    console.error(`❌ Failed to store secure data: ${error}`);
    throw error;
  }
}

/**
 * Retrieve data with PQC protection
 */
export async function retrieveSecureData(
  key: string,
  options: {
    encapsulatedKey?: string;
    mode?: EncryptionMode;
    metadata?: { iv: string };
  } = {}
): Promise<{
  success: boolean;
  data: any;
  timestamp: string;
}> {
  console.log(`🔹 Retrieving securely stored data: ${key}`);
  
  try {
    // Try to retrieve the encrypted data
    const storageData = await failsafeStorage.read(key);
    
    if (!storageData) {
      throw new Error(`Data not found for key: ${key}`);
    }
    
    // Parse the storage data
    const {
      ciphertext,
      encapsulatedKey,
      mode,
      metadata,
      timestamp
    } = JSON.parse(storageData);
    
    // Decrypt the data
    const decryptedData = await decryptData(
      ciphertext,
      encapsulatedKey || options.encapsulatedKey,
      (mode as EncryptionMode) || options.mode || 'hybrid',
      metadata || options.metadata
    );
    
    // Parse JSON if the decrypted data appears to be JSON
    let parsedData: any;
    try {
      parsedData = JSON.parse(decryptedData);
    } catch {
      parsedData = decryptedData;
    }
    
    return {
      success: true,
      data: parsedData,
      timestamp: timestamp || new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ Failed to retrieve secure data: ${error}`);
    throw error;
  }
}

/**
 * Delete securely stored data
 */
export async function deleteSecureData(
  key: string
): Promise<{
  success: boolean;
  timestamp: string;
}> {
  console.log(`🔹 Deleting securely stored data: ${key}`);
  
  try {
    // Securely delete the data
    const success = await failsafeStorage.delete(key);
    
    return {
      success,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ Failed to delete secure data: ${error}`);
    throw error;
  }
}
