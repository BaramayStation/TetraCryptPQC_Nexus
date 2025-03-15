
/**
 * TetraCryptPQC Secure Storage
 * 
 * Implements secure storage for sensitive data with
 * post-quantum encryption and transparent database encryption (TDE).
 */

import { encryptAES, decryptAES, generateNonce } from './crypto';
import { generateKeyPair } from './pqcrypto';

/**
 * Get data from secure localStorage with optional encryption
 */
export function getLocalStorage<T>(key: string, decrypt: boolean = false): T | null {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    if (decrypt) {
      // In a real app, we would use a derived encryption key
      const encryptionKey = localStorage.getItem('enc_key') || 'default_encryption_key';
      return JSON.parse(decryptAES(data, encryptionKey));
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting data from secure storage:', error);
    return null;
  }
}

/**
 * Store data in secure localStorage with optional encryption
 */
export function setLocalStorage<T>(key: string, data: T, encrypt: boolean = false): boolean {
  try {
    if (encrypt) {
      // In a real app, we would use a derived encryption key
      const encryptionKey = localStorage.getItem('enc_key') || 'default_encryption_key';
      const encryptedData = encryptAES(JSON.stringify(data), encryptionKey);
      localStorage.setItem(key, encryptedData);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
    return true;
  } catch (error) {
    console.error('Error setting data in secure storage:', error);
    return false;
  }
}

/**
 * Check the database encryption status
 */
export function checkDatabaseEncryptionStatus(): {
  tdeEnabled: boolean;
  algorithm: string;
  keyRotationEnabled: boolean;
} {
  // In a real implementation, this would check the actual database encryption status
  // For simulation purposes, we'll return a static result
  
  return {
    tdeEnabled: true,
    algorithm: "AES-256-GCM + ChaCha20-Poly1305 (Hybrid)",
    keyRotationEnabled: true
  };
}

/**
 * Initialize secure storage with PQC key rotation
 */
export async function initializeSecureStorage(): Promise<boolean> {
  try {
    console.log("🔹 Initializing secure storage with PQC key rotation");
    
    // Check if initialization has already been done
    if (localStorage.getItem('storage_initialized') === 'true') {
      console.log("🔹 Secure storage already initialized");
      return true;
    }
    
    // Generate a random encryption key
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    const encryptionKey = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    
    // Store the encryption key
    localStorage.setItem('enc_key', encryptionKey);
    
    // Generate PQC key pair for storage encryption
    const keyPair = await generateKeyPair();
    
    // Store public key unencrypted (it's public anyway)
    localStorage.setItem('pqc_pubkey', keyPair.pqkem.publicKey);
    
    // Store private key encrypted with the encryption key
    const encryptedPrivateKey = encryptAES(keyPair.pqkem.privateKey, encryptionKey);
    localStorage.setItem('pqc_privkey_enc', encryptedPrivateKey);
    
    // Set initialization flag
    localStorage.setItem('storage_initialized', 'true');
    
    // Set key rotation schedule (30 days)
    const rotationDate = new Date();
    rotationDate.setDate(rotationDate.getDate() + 30);
    localStorage.setItem('key_rotation_date', rotationDate.toISOString());
    
    console.log("🔹 Secure storage initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Error initializing secure storage:", error);
    return false;
  }
}

/**
 * Check if key rotation is needed
 */
export function isKeyRotationNeeded(): boolean {
  try {
    // Check if storage is initialized
    if (localStorage.getItem('storage_initialized') !== 'true') {
      return false;
    }
    
    // Get key rotation date
    const rotationDateStr = localStorage.getItem('key_rotation_date');
    if (!rotationDateStr) return true;
    
    // Parse date and compare with current date
    const rotationDate = new Date(rotationDateStr);
    const currentDate = new Date();
    
    return currentDate >= rotationDate;
  } catch (error) {
    console.error("❌ Error checking key rotation:", error);
    return false;
  }
}

/**
 * Rotate encryption keys
 */
export async function rotateEncryptionKeys(): Promise<boolean> {
  try {
    console.log("🔹 Rotating encryption keys");
    
    // Check if storage is initialized
    if (localStorage.getItem('storage_initialized') !== 'true') {
      await initializeSecureStorage();
      return true;
    }
    
    // Generate new random encryption key
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    const newEncryptionKey = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    
    // Get old encryption key
    const oldEncryptionKey = localStorage.getItem('enc_key') || '';
    
    // Generate new PQC key pair
    const newKeyPair = await generateKeyPair();
    
    // Re-encrypt sensitive data with new key
    // In a real app, we would iterate through all sensitive data
    // For this example, we'll just re-encrypt the private key
    
    // Store new public key (unencrypted)
    localStorage.setItem('pqc_pubkey', newKeyPair.pqkem.publicKey);
    
    // Store new private key encrypted with the new encryption key
    const encryptedPrivateKey = encryptAES(newKeyPair.pqkem.privateKey, newEncryptionKey);
    localStorage.setItem('pqc_privkey_enc', encryptedPrivateKey);
    
    // Store the new encryption key
    localStorage.setItem('enc_key', newEncryptionKey);
    
    // Set new key rotation schedule (30 days)
    const rotationDate = new Date();
    rotationDate.setDate(rotationDate.getDate() + 30);
    localStorage.setItem('key_rotation_date', rotationDate.toISOString());
    
    console.log("🔹 Encryption keys rotated successfully");
    return true;
  } catch (error) {
    console.error("❌ Error rotating encryption keys:", error);
    return false;
  }
}

/**
 * Securely delete data
 */
export function securelyDeleteData(key: string): boolean {
  try {
    console.log(`🔹 Securely deleting data: ${key}`);
    
    // In a real implementation, we would overwrite the data multiple times
    // before removing it to prevent recovery from storage media
    
    // For localStorage, just remove the item
    localStorage.removeItem(key);
    
    return true;
  } catch (error) {
    console.error("❌ Error securely deleting data:", error);
    return false;
  }
}

/**
 * Check if the database supports transparent data encryption (TDE)
 */
export function checkTDESupport(): boolean {
  // In a real implementation, this would check the database capabilities
  // For simulation purposes, return true
  return true;
}

/**
 * Enable transparent data encryption for the database
 */
export function enableTDE(): boolean {
  console.log("🔹 Enabling transparent data encryption");
  
  // In a real implementation, this would configure TDE on the database
  // For simulation purposes, return true
  return true;
}
