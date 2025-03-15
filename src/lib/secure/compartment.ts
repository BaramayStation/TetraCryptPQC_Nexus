/**
 * TetraCryptPQC Data Compartmentalization
 * 
 * This module provides secure data compartments that encrypt data
 * using post-quantum cryptography both at rest and in transit.
 */

import { encryptWithPQC, decryptWithPQC, signMessage, verifySignature } from "../crypto";
import { hashWithSHA3 } from "../crypto";
import { PQCKey } from "../crypto";
import { generateMLKEMKeypair } from "../pqcrypto";

// Compartment security levels
export type SecurityLevel = "top-secret" | "secret" | "confidential" | "restricted" | "unclassified";

// Access control list for data compartments
export interface AccessControl {
  roles: string[];
  userIds: string[];
  compartmentId: string;
  securityLevel: SecurityLevel;
  needToKnow: boolean;
}

// Data compartment for isolated and encrypted storage
export class SecureCompartment<T> {
  private data: Map<string, string> = new Map(); // Encrypted data
  private keys: PQCKey;
  private accessControl: AccessControl;
  private compartmentId: string;
  
  constructor(compartmentId: string, accessControl: AccessControl) {
    this.compartmentId = compartmentId;
    this.accessControl = accessControl;
    this.keys = { 
      publicKey: "", 
      privateKey: "", 
      created: new Date().toISOString(),
      algorithm: "", 
      strength: "", 
      standard: ""
    };
    
    // Initialize immediately with async wrapper
    this.initialize();
  }
  
  private async initialize() {
    try {
      // Generate compartment-specific PQC keys
      const newKeys = await generateMLKEMKeypair();
      this.keys = newKeys;
      console.log(`🔒 Secure compartment initialized: ${this.compartmentId}`);
    } catch (error) {
      console.error("Failed to initialize secure compartment:", error);
    }
  }
  
  // Store data with PQC encryption
  async set(key: string, value: T): Promise<boolean> {
    try {
      // Check if the keys are ready
      if (!this.keys.publicKey) {
        await this.waitForKeys();
      }
      
      // Serialize to string
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      
      // Encrypt with PQC
      const encrypted = await encryptWithPQC(serialized, this.keys.publicKey);
      
      // Store with a hash of the original key to prevent information leakage
      const keyHash = await hashWithSHA3(this.compartmentId + key);
      this.data.set(keyHash, encrypted);
      
      return true;
    } catch (error) {
      console.error(`Failed to set data in compartment ${this.compartmentId}:`, error);
      return false;
    }
  }
  
  // Retrieve and decrypt data
  async get(key: string): Promise<T | null> {
    try {
      // Check if the keys are ready
      if (!this.keys.privateKey) {
        await this.waitForKeys();
      }
      
      // Get encrypted data by hashed key
      const keyHash = await hashWithSHA3(this.compartmentId + key);
      const encrypted = this.data.get(keyHash);
      
      if (!encrypted) {
        return null;
      }
      
      // Decrypt with PQC
      const decrypted = await decryptWithPQC(encrypted, this.keys.privateKey);
      
      try {
        // Try to parse as JSON first
        return JSON.parse(decrypted) as T;
      } catch {
        // Otherwise return as is (assuming T is string)
        return decrypted as unknown as T;
      }
    } catch (error) {
      console.error(`Failed to get data from compartment ${this.compartmentId}:`, error);
      return null;
    }
  }
  
  // Check if user has access to this compartment
  hasAccess(userId: string, userRole: string): boolean {
    return (
      this.accessControl.userIds.includes(userId) ||
      this.accessControl.roles.some(role => role === userRole)
    );
  }
  
  // Wait for keys to be initialized
  private async waitForKeys(timeout = 5000): Promise<void> {
    const start = Date.now();
    while (!this.keys.publicKey || !this.keys.privateKey) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (Date.now() - start > timeout) {
        throw new Error("Timeout waiting for keys to initialize");
      }
    }
  }
  
  // Securely delete the data
  async purge(): Promise<boolean> {
    try {
      // Clear the map
      this.data.clear();
      
      // Reset the keys to null references to aid garbage collection
      this.keys = { 
        publicKey: "", 
        privateKey: "", 
        created: new Date().toISOString(),
        algorithm: "", 
        strength: "", 
        standard: ""
      };
      
      return true;
    } catch (error) {
      console.error(`Failed to purge compartment ${this.compartmentId}:`, error);
      return false;
    }
  }
}
