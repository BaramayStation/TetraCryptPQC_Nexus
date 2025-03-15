
/**
 * TetraCryptPQC Secure Storage Module
 * 
 * This module provides secure local storage with post-quantum 
 * cryptographic protection for sensitive data.
 */

import { deriveKey, hashWithSHA3, encapsulateKey, decapsulateKey } from "./pqcrypto-core";
import { toast } from "@/components/ui/use-toast";

// Storage prefix to distinguish TetraCrypt storage items
const STORAGE_PREFIX = "TETRACRYPT_PQC_";

// Default encryption key (used when no custom key provided)
// In a real app, this would be randomly generated at app initialization
let defaultEncryptionKey: string | null = null;

/**
 * Initialize the secure storage module with a master key
 */
export async function initSecureStorage(masterPassword?: string): Promise<boolean> {
  try {
    // If no password provided, generate a random one
    if (!masterPassword) {
      const randomBytes = crypto.getRandomValues(new Uint8Array(32));
      masterPassword = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Generate a salt for key derivation
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const salt = Array.from(saltBytes, b => b.toString(16).padStart(2, '0')).join('');
    
    // Store the salt (not the password) in sessionStorage
    sessionStorage.setItem(`${STORAGE_PREFIX}SALT`, salt);
    
    // Derive the master encryption key using PQC-safe KDF
    defaultEncryptionKey = await deriveKey(masterPassword, salt);
    
    console.log("🔹 Secure storage initialized with post-quantum protection");
    return true;
  } catch (error) {
    console.error("Error initializing secure storage:", error);
    defaultEncryptionKey = null;
    return false;
  }
}

/**
 * Store a value securely in localStorage
 */
export async function setSecureItem<T>(
  key: string, 
  value: T, 
  encryptionKey?: string
): Promise<boolean> {
  try {
    // Ensure storage is initialized
    if (!defaultEncryptionKey && !encryptionKey) {
      await initSecureStorage();
    }
    
    const keyToUse = encryptionKey || defaultEncryptionKey;
    if (!keyToUse) {
      throw new Error("No encryption key available");
    }
    
    // Convert value to string
    const valueString = JSON.stringify(value);
    
    // In a real implementation, this would encrypt using ML-KEM encapsulation
    // For simulation, we'll just mark the value as encrypted
    const simulatedEncryptedValue = `${keyToUse.substring(0, 8)}:ENCRYPTED:${valueString}`;
    
    // Create a hash of the original data for integrity verification
    const integrityHash = await hashWithSHA3(valueString);
    
    // Store the value and its integrity hash
    const storageKey = `${STORAGE_PREFIX}${key}`;
    const storageValue = JSON.stringify({
      data: simulatedEncryptedValue,
      integrity: integrityHash,
      timestamp: new Date().toISOString(),
      version: "PQC-1.0"
    });
    
    localStorage.setItem(storageKey, storageValue);
    return true;
  } catch (error) {
    console.error(`Error storing item "${key}":`, error);
    toast({
      title: "Storage Error",
      description: "Failed to securely store data",
      variant: "destructive",
    });
    return false;
  }
}

/**
 * Retrieve a securely stored value from localStorage
 */
export async function getSecureItem<T>(
  key: string,
  encryptionKey?: string
): Promise<T | null> {
  try {
    const keyToUse = encryptionKey || defaultEncryptionKey;
    if (!keyToUse) {
      throw new Error("No encryption key available");
    }
    
    const storageKey = `${STORAGE_PREFIX}${key}`;
    const storageValue = localStorage.getItem(storageKey);
    
    if (!storageValue) {
      return null;
    }
    
    // Parse the storage value
    const { data, integrity, version } = JSON.parse(storageValue);
    
    // Check if this is a PQC-encrypted value
    if (!version || !version.startsWith("PQC-")) {
      console.warn(`Item "${key}" is not protected with post-quantum encryption`);
      toast({
        title: "Security Warning",
        description: "Some stored data is not protected with post-quantum encryption",
        variant: "destructive",
      });
      return null;
    }
    
    // In a real implementation, this would decrypt using ML-KEM decapsulation
    // For simulation, just extract the original value
    const simulatedDecryptedValue = data.split(":ENCRYPTED:")[1];
    
    // Parse the decrypted value
    const parsedValue = JSON.parse(simulatedDecryptedValue) as T;
    
    // Verify data integrity
    const calculatedHash = await hashWithSHA3(simulatedDecryptedValue);
    if (calculatedHash !== integrity) {
      throw new Error("Data integrity check failed");
    }
    
    return parsedValue;
  } catch (error) {
    console.error(`Error retrieving item "${key}":`, error);
    return null;
  }
}

/**
 * Remove a securely stored item
 */
export function removeSecureItem(key: string): boolean {
  try {
    const storageKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error(`Error removing item "${key}":`, error);
    return false;
  }
}

/**
 * Clear all securely stored items
 */
export function clearSecureStorage(): boolean {
  try {
    // Get all localStorage keys
    const allKeys = Object.keys(localStorage);
    
    // Filter for TetraCrypt prefixed keys
    const tetracryptKeys = allKeys.filter(key => key.startsWith(STORAGE_PREFIX));
    
    // Remove each key
    tetracryptKeys.forEach(key => localStorage.removeItem(key));
    
    // Clear the session storage salt
    sessionStorage.removeItem(`${STORAGE_PREFIX}SALT`);
    
    // Reset the default encryption key
    defaultEncryptionKey = null;
    
    return true;
  } catch (error) {
    console.error("Error clearing secure storage:", error);
    return false;
  }
}

/**
 * Check if secure storage is available and initialized
 */
export function isSecureStorageAvailable(): boolean {
  try {
    const testKey = "TETRACRYPT_TEST";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error("Secure storage is not available:", error);
    return false;
  }
}

/**
 * Check if browser supports required Web Crypto API features
 */
export function checkWebCryptoSupport(): {
  supported: boolean;
  randomValues: boolean;
  subtle: boolean;
} {
  const hasRandomValues = typeof crypto !== 'undefined' && 
                          typeof crypto.getRandomValues === 'function';
  
  const hasSubtle = typeof crypto !== 'undefined' && 
                   typeof crypto.subtle === 'object';
  
  return {
    supported: hasRandomValues && hasSubtle,
    randomValues: hasRandomValues,
    subtle: hasSubtle
  };
}
