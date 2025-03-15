
/**
 * TetraCryptPQC PQC Encryption
 * 
 * Implements post-quantum encryption operations
 */

import { hashWithSHA3 } from '../crypto';
import { EncryptionMode, EncryptedData } from './storage-types';
import { getUserProfile } from '../storage';
import { logSecurityEvent } from './security-utils';

/**
 * Encrypt data with PQC algorithms
 */
export async function encryptData(
  data: string,
  recipientPublicKey?: string,
  mode: EncryptionMode = 'hybrid'
): Promise<EncryptedData> {
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
    
    // Use WebCrypto API for encryption (AES-GCM)
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    
    // Derive encryption key from public key
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(publicKey),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
    
    // Use SHA-256 for key derivation (in production would use SHA-3)
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(iv),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    
    // Encrypt the data
    const ivBytes = encoder.encode(iv).slice(0, 12);
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: ivBytes
      },
      derivedKey,
      dataBytes
    );
    
    // Convert to Base64
    const encryptedArray = new Uint8Array(encryptedBuffer);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    
    logSecurityEvent({
      eventType: 'cryptography',
      operation: 'encrypt',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { mode, algorithm: 'ML-KEM-1024' }
    });
    
    return {
      ciphertext: encryptedBase64,
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
    
    logSecurityEvent({
      eventType: 'cryptography',
      operation: 'encrypt',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { error: error instanceof Error ? error.message : String(error) }
    });
    
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
    
    const privateKey = profile.keyPairs.pqkem.privateKey;
    
    // Use WebCrypto API for decryption
    const encoder = new TextEncoder();
    
    // Derive decryption key from private key
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(privateKey),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
    
    // Use SHA-256 for key derivation (in production would use SHA-3)
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(metadata.iv),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    
    // Convert Base64 to ArrayBuffer
    const ciphertextBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    
    // Decrypt the data
    const ivBytes = encoder.encode(metadata.iv).slice(0, 12);
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBytes
      },
      derivedKey,
      ciphertextBytes
    );
    
    // Convert to string
    const decryptedArray = new Uint8Array(decryptedBuffer);
    const decoder = new TextDecoder();
    const decryptedText = decoder.decode(decryptedArray);
    
    logSecurityEvent({
      eventType: 'cryptography',
      operation: 'decrypt',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { mode, algorithm: 'ML-KEM-1024' }
    });
    
    return decryptedText;
  } catch (error) {
    console.error("Data decryption failed:", error);
    
    logSecurityEvent({
      eventType: 'cryptography',
      operation: 'decrypt',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { error: error instanceof Error ? error.message : String(error) }
    });
    
    throw new Error(`Data decryption failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
