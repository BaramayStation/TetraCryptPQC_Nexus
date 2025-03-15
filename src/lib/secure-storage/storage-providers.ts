
/**
 * TetraCryptPQC Storage Providers
 * 
 * Implements multiple storage backends with failover capability
 */

import { StorageProvider } from './storage-types';

// Primary storage provider - localStorage with encryption
export const localStorageProvider: StorageProvider = {
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
export const indexedDBProvider: StorageProvider = {
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
export const sessionStorageProvider: StorageProvider = {
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
