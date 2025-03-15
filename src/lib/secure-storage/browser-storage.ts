
/**
 * TetraCryptPQC Browser Storage
 * 
 * Implements secure browser storage with encryption
 */

import { logSecurityEvent } from './security-utils';
import { hashWithSHA3 } from '../crypto';

/**
 * Get data from secure localStorage with optional encryption
 */
export function getLocalStorage<T>(key: string, decrypt: boolean = false): T | null {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    if (decrypt) {
      try {
        // Get the encryption key
        const encryptionKey = localStorage.getItem('enc_key') || 'default_encryption_key';
        
        // Decrypt the data using Web Crypto API
        const decryptData = async () => {
          // Convert from Base64
          const dataBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
          
          // Extract IV (first 12 bytes)
          const iv = dataBytes.slice(0, 12);
          const ciphertext = dataBytes.slice(12);
          
          // Import the key
          const encoder = new TextEncoder();
          const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(encryptionKey),
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
          );
          
          // Derive the key
          const key = await crypto.subtle.deriveKey(
            {
              name: "PBKDF2",
              salt: iv,
              iterations: 100000,
              hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["decrypt"]
          );
          
          // Decrypt
          const decrypted = await crypto.subtle.decrypt(
            {
              name: "AES-GCM",
              iv
            },
            key,
            ciphertext
          );
          
          // Convert to string
          return new TextDecoder().decode(decrypted);
        };
        
        // Create a sync-like wrapper (not ideal but necessary for API compatibility)
        let decrypted: string | null = null;
        let error: Error | null = null;
        
        // This is a workaround for async/sync impedance mismatch
        decryptData().then(
          result => { decrypted = result; },
          err => { error = err instanceof Error ? err : new Error(String(err)); }
        );
        
        // Wait for the promise to resolve
        const sleepUntil = Date.now() + 1000;
        while (!decrypted && !error && Date.now() < sleepUntil) {
          // Busy wait (only for compatibility layer)
        }
        
        if (error) throw error;
        if (!decrypted) throw new Error("Decryption timeout");
        
        return JSON.parse(decrypted) as T;
      } catch (error) {
        console.error('Error decrypting data:', error);
        
        logSecurityEvent({
          eventType: 'storage',
          operation: 'decrypt',
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
    
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('Error getting data from secure storage:', error);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'get',
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
 * Encrypt data using WebCrypto API
 */
async function encryptWithWebCrypto(data: string, key: string): Promise<string> {
  // Generate IV
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Import the key
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  
  // Derive the key
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: iv,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  
  // Encrypt
  const dataBytes = encoder.encode(data);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    derivedKey,
    dataBytes
  );
  
  // Combine IV and ciphertext
  const result = new Uint8Array(iv.length + encrypted.byteLength);
  result.set(iv, 0);
  result.set(new Uint8Array(encrypted), iv.length);
  
  // Convert to Base64
  return btoa(String.fromCharCode(...result));
}

/**
 * Store data in secure localStorage with optional encryption
 */
export function setLocalStorage<T>(key: string, data: T, encrypt: boolean = false): boolean {
  try {
    if (encrypt) {
      // Get the encryption key
      const encryptionKey = localStorage.getItem('enc_key') || 'default_encryption_key';
      
      // Use encryption with WebCrypto API
      const encryptData = async () => {
        const jsonData = JSON.stringify(data);
        return await encryptWithWebCrypto(jsonData, encryptionKey);
      };
      
      // Create a sync-like wrapper (not ideal but necessary for API compatibility)
      let encrypted: string | null = null;
      let error: Error | null = null;
      
      // This is a workaround for async/sync impedance mismatch
      encryptData().then(
        result => { encrypted = result; },
        err => { error = err instanceof Error ? err : new Error(String(err)); }
      );
      
      // Wait for the promise to resolve
      const sleepUntil = Date.now() + 1000;
      while (!encrypted && !error && Date.now() < sleepUntil) {
        // Busy wait (only for compatibility layer)
      }
      
      if (error) throw error;
      if (!encrypted) throw new Error("Encryption timeout");
      
      localStorage.setItem(key, encrypted);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'set',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        encrypted: encrypt
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error setting data in secure storage:', error);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'set',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        encrypted: encrypt,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
    return false;
  }
}
