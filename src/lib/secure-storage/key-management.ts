
/**
 * TetraCryptPQC Key Management
 * 
 * Implements key generation, rotation, and management
 */

import { generateMLKEMKeypair } from '../pqcrypto';
import { logSecurityEvent } from './security-utils';
import { KeyRotationCheckResult } from './storage-types';
import { failsafeStorage } from './storage-manager';

/**
 * Initialize secure storage with PQC key rotation
 */
export async function initializeSecureStorage(): Promise<boolean> {
  try {
    console.log("🔹 Initializing secure storage with PQC key rotation");
    
    // Check if initialization has already been done
    if (await failsafeStorage.read('storage_initialized') === 'true') {
      console.log("🔹 Secure storage already initialized");
      return true;
    }
    
    // Generate a cryptographically secure random encryption key
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    const encryptionKey = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    
    // Store the encryption key
    await failsafeStorage.write('enc_key', encryptionKey);
    
    // Generate PQC key pair for storage encryption
    const keyPair = await generateMLKEMKeypair();
    
    // Store public key unencrypted (it's public anyway)
    await failsafeStorage.write('pqc_pubkey', keyPair.publicKey);
    
    // Encrypt private key with Web Crypto API
    const encoder = new TextEncoder();
    const privateKeyBytes = encoder.encode(keyPair.privateKey);
    const encryptionKeyBytes = encoder.encode(encryptionKey);
    
    // Import encryption key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encryptionKeyBytes,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    
    // Generate IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the private key
    const encryptedPrivateKey = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      privateKeyBytes
    );
    
    // Convert to Base64
    const encryptedPrivateKeyBase64 = btoa(
      String.fromCharCode(...new Uint8Array(encryptedPrivateKey))
    );
    const ivBase64 = btoa(String.fromCharCode(...iv));
    
    // Store encrypted private key with IV
    await failsafeStorage.write('pqc_privkey_enc', JSON.stringify({
      key: encryptedPrivateKeyBase64,
      iv: ivBase64
    }));
    
    // Set initialization flag
    await failsafeStorage.write('storage_initialized', 'true');
    
    // Set key rotation schedule (30 days)
    const rotationDate = new Date();
    rotationDate.setDate(rotationDate.getDate() + 30);
    await failsafeStorage.write('key_rotation_date', rotationDate.toISOString());
    
    logSecurityEvent({
      eventType: 'key-management',
      operation: 'initialize',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { algorithm: 'ML-KEM-1024' }
    });
    
    console.log("🔹 Secure storage initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Error initializing secure storage:", error);
    
    logSecurityEvent({
      eventType: 'key-management',
      operation: 'initialize',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { error: error instanceof Error ? error.message : String(error) }
    });
    
    return false;
  }
}

/**
 * Check if key rotation is needed
 */
export async function isKeyRotationNeeded(): Promise<KeyRotationCheckResult> {
  try {
    // Check if storage is initialized
    if (await failsafeStorage.read('storage_initialized') !== 'true') {
      return { needed: false };
    }
    
    // Get key rotation date
    const rotationDateStr = await failsafeStorage.read('key_rotation_date');
    if (!rotationDateStr) return { needed: true, reason: 'No rotation date found' };
    
    // Parse date and compare with current date
    const rotationDate = new Date(rotationDateStr);
    const currentDate = new Date();
    
    const isNeeded = currentDate >= rotationDate;
    
    return {
      needed: isNeeded,
      lastRotation: await failsafeStorage.read('last_key_rotation') || 'Never',
      nextRotation: rotationDateStr,
      reason: isNeeded ? 'Scheduled rotation date has passed' : 'Not yet due for rotation'
    };
  } catch (error) {
    console.error("❌ Error checking key rotation:", error);
    
    logSecurityEvent({
      eventType: 'key-management',
      operation: 'check-rotation',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { error: error instanceof Error ? error.message : String(error) }
    });
    
    return { 
      needed: true,
      reason: `Error during check: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

/**
 * Rotate encryption keys
 */
export async function rotateEncryptionKeys(): Promise<boolean> {
  try {
    console.log("🔹 Rotating encryption keys");
    
    // Check if storage is initialized
    if (await failsafeStorage.read('storage_initialized') !== 'true') {
      await initializeSecureStorage();
      return true;
    }
    
    // Generate new random encryption key
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    const newEncryptionKey = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    
    // Get old encryption key
    const oldEncryptionKey = await failsafeStorage.read('enc_key') || '';
    
    // Generate new PQC key pair
    const newKeyPair = await generateMLKEMKeypair();
    
    // Store new public key (unencrypted)
    await failsafeStorage.write('pqc_pubkey', newKeyPair.publicKey);
    
    // Encrypt new private key with Web Crypto API
    const encoder = new TextEncoder();
    const privateKeyBytes = encoder.encode(newKeyPair.privateKey);
    const encryptionKeyBytes = encoder.encode(newEncryptionKey);
    
    // Import encryption key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encryptionKeyBytes,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    
    // Generate IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the private key
    const encryptedPrivateKey = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      privateKeyBytes
    );
    
    // Convert to Base64
    const encryptedPrivateKeyBase64 = btoa(
      String.fromCharCode(...new Uint8Array(encryptedPrivateKey))
    );
    const ivBase64 = btoa(String.fromCharCode(...iv));
    
    // Store encrypted private key with IV
    await failsafeStorage.write('pqc_privkey_enc', JSON.stringify({
      key: encryptedPrivateKeyBase64,
      iv: ivBase64
    }));
    
    // Store new encryption key
    await failsafeStorage.write('enc_key', newEncryptionKey);
    
    // Store the old key with a timestamp for potential recovery
    const timestamp = new Date().toISOString();
    await failsafeStorage.write(`old_enc_key_${timestamp}`, oldEncryptionKey);
    
    // Set new key rotation schedule (30 days)
    const rotationDate = new Date();
    rotationDate.setDate(rotationDate.getDate() + 30);
    await failsafeStorage.write('key_rotation_date', rotationDate.toISOString());
    
    // Update last rotation timestamp
    await failsafeStorage.write('last_key_rotation', timestamp);
    
    logSecurityEvent({
      eventType: 'key-management',
      operation: 'rotate-keys',
      status: 'success',
      timestamp,
      metadata: { algorithm: 'ML-KEM-1024' }
    });
    
    console.log("🔹 Encryption keys rotated successfully");
    return true;
  } catch (error) {
    console.error("❌ Error rotating encryption keys:", error);
    
    logSecurityEvent({
      eventType: 'key-management',
      operation: 'rotate-keys',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { error: error instanceof Error ? error.message : String(error) }
    });
    
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
    algorithm: "AES-256-GCM + ML-KEM-1024 (Hybrid)",
    keyRotationEnabled: true
  };
}

/**
 * Enable transparent data encryption for the database
 */
export function enableTDE(): boolean {
  console.log("🔹 Enabling transparent data encryption");
  
  logSecurityEvent({
    eventType: 'database',
    operation: 'enable-tde',
    status: 'success',
    timestamp: new Date().toISOString(),
    metadata: { algorithm: 'AES-256-GCM + ML-KEM-1024 (Hybrid)' }
  });
  
  // In a real implementation, this would configure TDE on the database
  // For simulation purposes, return true
  return true;
}
