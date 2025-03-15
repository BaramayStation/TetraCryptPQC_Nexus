
/**
 * TetraCryptPQC Secure Storage Operations
 * 
 * Implements secure storage operations with PQC protection
 */

import { failsafeStorage } from './storage-manager';
import { encryptData, decryptData } from './pqc-encryption';
import { EncryptionMode } from './storage-types';
import { hashWithSHA3 } from '../crypto';
import { logSecurityEvent } from './security-utils';

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
    
    if (success) {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'store',
        status: 'success',
        timestamp,
        metadata: { 
          key: storageKey,
          mode,
          algorithm: encryptionResult.algorithm
        }
      });
    } else {
      logSecurityEvent({
        eventType: 'storage',
        operation: 'store',
        status: 'failure',
        timestamp,
        metadata: { key: storageKey }
      });
    }
    
    return {
      success,
      storageKey,
      timestamp
    };
  } catch (error) {
    console.error(`❌ Failed to store secure data: ${error}`);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'store',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
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
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'retrieve',
      status: 'success',
      timestamp: new Date().toISOString(),
      metadata: { key }
    });
    
    return {
      success: true,
      data: parsedData,
      timestamp: timestamp || new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ Failed to retrieve secure data: ${error}`);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'retrieve',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
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
    
    const timestamp = new Date().toISOString();
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'delete',
      status: success ? 'success' : 'failure',
      timestamp,
      metadata: { key }
    });
    
    return {
      success,
      timestamp
    };
  } catch (error) {
    console.error(`❌ Failed to delete secure data: ${error}`);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'delete',
      status: 'failure',
      timestamp: new Date().toISOString(),
      metadata: { 
        key,
        error: error instanceof Error ? error.message : String(error)
      }
    });
    
    throw error;
  }
}

/**
 * Securely delete data with multiple overwrites to prevent recovery
 */
export async function securelyDeleteData(key: string): Promise<boolean> {
  try {
    console.log(`🔹 Securely deleting data: ${key}`);
    
    // Get original data size
    const data = await failsafeStorage.read(key);
    if (!data) return true; // Nothing to delete
    
    const dataSize = data.length;
    
    // Multi-step secure deletion process
    if (dataSize > 0) {
      // First overwrite - zeros
      const zeros = new Array(dataSize).fill('0').join('');
      await failsafeStorage.write(key, zeros);
      
      // Second overwrite - ones
      const ones = new Array(dataSize).fill('1').join('');
      await failsafeStorage.write(key, ones);
      
      // Third overwrite - random data
      const random = Array.from(crypto.getRandomValues(new Uint8Array(dataSize)), 
        byte => byte.toString(16).padStart(2, '0')).join('');
      await failsafeStorage.write(key, random);
    }
    
    // Finally, remove the item
    const success = await failsafeStorage.delete(key);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'secure-delete',
      status: success ? 'success' : 'failure',
      timestamp: new Date().toISOString(),
      metadata: { key }
    });
    
    return success;
  } catch (error) {
    console.error("❌ Error securely deleting data:", error);
    
    logSecurityEvent({
      eventType: 'storage',
      operation: 'secure-delete',
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
