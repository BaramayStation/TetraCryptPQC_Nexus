
/**
 * TetraCryptPQC Primary Cryptography Implementation
 * Uses the default ML-KEM (Kyber) and SLH-DSA (Dilithium) implementations
 */

import { 
  FailsafeComponentType, 
  FailsafeImplementation, 
  FailsafeStatus, 
  FailsafeStrategy,
  FailsafeTestResult 
} from '../types';
import { CryptoImplementation, CryptoAlgorithm } from './types';
import { generateMLKEMKeypair, generateSLHDSAKeypair } from '../../pqcrypto';
import { cryptoFailsafe } from './coordinator';

// Import the existing cryptography functions
import { encryptWithPQC, decryptWithPQC, signMessage, verifySignature } from '../../crypto';

class PrimaryPQCImplementation implements CryptoImplementation {
  async generateKeypair(params?: { type: 'encryption' | 'signature' }): Promise<{ publicKey: string, privateKey: string }> {
    if (params?.type === 'signature') {
      return generateSLHDSAKeypair();
    } else {
      return generateMLKEMKeypair();
    }
  }
  
  async encrypt(data: string | Uint8Array, publicKey: string): Promise<string> {
    return encryptWithPQC(typeof data === 'string' ? data : new TextDecoder().decode(data), publicKey);
  }
  
  async decrypt(data: string | Uint8Array, privateKey: string): Promise<string> {
    return decryptWithPQC(typeof data === 'string' ? data : new TextDecoder().decode(data), privateKey);
  }
  
  async sign(data: string | Uint8Array, privateKey: string): Promise<string> {
    return signMessage(typeof data === 'string' ? data : new TextDecoder().decode(data), privateKey);
  }
  
  async verify(data: string | Uint8Array, signature: string, publicKey: string): Promise<boolean> {
    return verifySignature(
      typeof data === 'string' ? data : new TextDecoder().decode(data),
      signature, 
      publicKey
    );
  }
}

// Create and register the primary implementation
const primaryImpl: FailsafeImplementation<CryptoImplementation> = {
  id: `${CryptoAlgorithm.ML_KEM}-primary`,
  name: "Primary ML-KEM/SLH-DSA Implementation",
  type: FailsafeComponentType.CRYPTOGRAPHY,
  description: "Primary post-quantum cryptography implementation using ML-KEM (Kyber) and SLH-DSA (Dilithium)",
  priority: 100, // Highest priority
  strategy: FailsafeStrategy.DEFAULT,
  implementation: new PrimaryPQCImplementation(),
  status: FailsafeStatus.ONLINE,
  
  async isAvailable(): Promise<boolean> {
    try {
      // Test the implementation by generating a test keypair
      const keypair = await this.implementation.generateKeypair();
      return !!keypair.publicKey && !!keypair.privateKey;
    } catch (error) {
      console.error("Primary PQC implementation not available:", error);
      return false;
    }
  },
  
  async activate(): Promise<boolean> {
    console.log("Activating primary ML-KEM/SLH-DSA implementation");
    this.status = FailsafeStatus.ONLINE;
    return true;
  },
  
  async deactivate(): Promise<boolean> {
    console.log("Deactivating primary ML-KEM/SLH-DSA implementation");
    return true;
  },
  
  async test(): Promise<FailsafeTestResult> {
    try {
      // Test encryption and decryption
      const startTime = performance.now();
      const keypair = await this.implementation.generateKeypair();
      const testData = "TetraCryptPQC Test Data";
      const encrypted = await this.implementation.encrypt(testData, keypair.publicKey);
      const decrypted = await this.implementation.decrypt(encrypted, keypair.privateKey);
      
      // Test signature and verification
      const sigKeypair = await this.implementation.generateKeypair({ type: 'signature' });
      const signature = await this.implementation.sign(testData, sigKeypair.privateKey);
      const verified = await this.implementation.verify(testData, signature, sigKeypair.publicKey);
      
      const endTime = performance.now();
      
      return {
        success: decrypted === testData && verified,
        latency: endTime - startTime,
        details: {
          encryptionSuccessful: decrypted === testData,
          signatureVerified: verified
        }
      };
    } catch (error) {
      console.error("Error testing primary PQC implementation:", error);
      return {
        success: false,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }
};

// Register with the crypto failsafe coordinator
cryptoFailsafe.registerImplementation(primaryImpl);

export default primaryImpl;
