
/**
 * TetraCryptPQC Cryptographic Operations
 * Core post-quantum cryptography functions for the secure messaging system
 */

import { randomBytes, bytesToHex } from '@/utils/crypto-utils';

// Define PQCKey interface to match what's expected across the app
export interface PQCKey {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
  algorithm: string;
  publicKeyHex: string;
  privateKeyHex: string;
  created: string;
  strength: string;
  standard: string;
}

/**
 * Encrypts a message using AES-GCM
 * This is a mock implementation for demonstration purposes only
 * 
 * @param message - The plaintext message to encrypt
 * @param key - The encryption key (can be Uint8Array or CryptoKey)
 * @returns The encrypted message as a string
 */
export async function encryptAES(message: string, key: Uint8Array | CryptoKey): Promise<string> {
  console.log(`🔒 Mock encryption of message: "${message.substring(0, 10)}${message.length > 10 ? '...' : ''}"`);
  
  // For demo purposes, we'll just do a simple "encryption" by 
  // converting the message to a hex string prefixed with "ENC:"
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  // In a real implementation, we would use the Web Crypto API
  // and perform proper AES-GCM encryption
  return `ENC:${bytesToHex(data)}`;
}

/**
 * Decrypts a message using AES-GCM
 * This is a mock implementation for demonstration purposes only
 * 
 * @param encryptedData - The encrypted message
 * @param key - The decryption key (can be Uint8Array or CryptoKey)
 * @returns The decrypted message
 */
export async function decryptAES(encryptedData: string, key: Uint8Array | CryptoKey): Promise<string> {
  console.log(`🔓 Mock decryption of data: "${encryptedData.substring(0, 15)}${encryptedData.length > 15 ? '...' : ''}"`);
  
  // For demo purposes, we'll just decode our simple "encryption"
  if (!encryptedData.startsWith('ENC:')) {
    throw new Error('Invalid encrypted data format');
  }
  
  const hexData = encryptedData.substring(4);
  const bytes = new Uint8Array(hexData.length / 2);
  for (let i = 0; i < hexData.length; i += 2) {
    bytes[i / 2] = parseInt(hexData.substring(i, i + 2), 16);
  }
  
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

/**
 * Generates a PQC key pair for encryption
 * This is a mock implementation for demonstration purposes only
 * 
 * @returns A promise resolving to the generated key pair
 */
export async function generatePQCKeyPair(): Promise<PQCKey> {
  console.log('🔑 Generating mock PQC key pair');
  
  // Generate random keys
  const publicKey = randomBytes(32);
  const privateKey = randomBytes(32);
  
  return {
    publicKey,
    privateKey,
    algorithm: 'ML-KEM-768',
    publicKeyHex: bytesToHex(publicKey),
    privateKeyHex: bytesToHex(privateKey),
    created: new Date().toISOString(),
    strength: 'level-5',
    standard: 'NIST-PQC-Round-3'
  };
}

/**
 * Signs data using a post-quantum digital signature algorithm
 * This is a mock implementation for demonstration purposes only
 * 
 * @param data - The data to sign
 * @param privateKey - The private key to use for signing
 * @returns The signature
 */
export async function signPQC(data: string | Uint8Array, privateKey: Uint8Array): Promise<Uint8Array> {
  console.log('🖋️ Creating mock PQC signature');
  
  // In a real implementation, we would use Dilithium or Falcon
  return randomBytes(64);
}

/**
 * Verifies a post-quantum digital signature
 * This is a mock implementation for demonstration purposes only
 * 
 * @param data - The data that was signed
 * @param signature - The signature to verify
 * @param publicKey - The public key to use for verification
 * @returns Whether the signature is valid
 */
export async function verifyPQC(
  data: string | Uint8Array, 
  signature: Uint8Array, 
  publicKey: Uint8Array
): Promise<boolean> {
  console.log('✅ Verifying mock PQC signature');
  
  // In a real implementation, we would verify the signature
  // For demo purposes, always return true
  return true;
}

// Additional exported functions to maintain compatibility with existing code
export async function generateMLKEMKeypair(): Promise<PQCKey> {
  return generatePQCKeyPair();
}

export async function generateFalconKeypair(): Promise<PQCKey> {
  return generatePQCKeyPair();
}

export async function generateSLHDSAKeypair(): Promise<PQCKey> {
  return generatePQCKeyPair();
}

export async function generateBIKEKeypair(): Promise<PQCKey> {
  return generatePQCKeyPair();
}

export async function encryptWithPQC(message: string, publicKey: Uint8Array): Promise<string> {
  return encryptAES(message, publicKey);
}

export async function decryptWithPQC(encryptedData: string, privateKey: Uint8Array): Promise<string> {
  return decryptAES(encryptedData, privateKey);
}

export async function signMessage(data: string, privateKey: string | Uint8Array): Promise<string> {
  const privateKeyBytes = typeof privateKey === 'string' ? new TextEncoder().encode(privateKey) : privateKey;
  const signature = await signPQC(data, privateKeyBytes);
  return bytesToHex(signature);
}

export async function verifySignature(data: string, signature: string, publicKey: string | Uint8Array): Promise<boolean> {
  const publicKeyBytes = typeof publicKey === 'string' ? new TextEncoder().encode(publicKey) : publicKey;
  const signatureBytes = new Uint8Array(signature.length / 2);
  for (let i = 0; i < signature.length; i += 2) {
    signatureBytes[i / 2] = parseInt(signature.substring(i, i + 2), 16);
  }
  return verifyPQC(data, signatureBytes, publicKeyBytes);
}

// Add a mock implementation for generateDID for Register.tsx
export async function generateDID(publicKey: string | Uint8Array): Promise<string> {
  console.log('🔑 Generating mock DID');
  const id = crypto.randomUUID();
  return `did:tetracrypt:${id}`;
}

// Add a mock implementation for generateComplianceReport
export async function generateComplianceReport(): Promise<any> {
  return {
    success: true,
    date: new Date().toISOString(),
    standardsCompliance: {
      nist: true,
      fips: true,
      iso27001: true
    }
  };
}

// Export encryptMessage and decryptMessage for tetracrypt-p2p.ts usage
export async function encryptMessage(message: string, publicKey: Uint8Array): Promise<{ ciphertext: Uint8Array; encryptedData: string }> {
  const ciphertext = randomBytes(32);
  const encryptedData = await encryptAES(message, publicKey);
  return { ciphertext, encryptedData };
}

export async function decryptMessage(ciphertext: Uint8Array, encryptedData: string, privateKey: Uint8Array): Promise<string> {
  return decryptAES(encryptedData, privateKey);
}
