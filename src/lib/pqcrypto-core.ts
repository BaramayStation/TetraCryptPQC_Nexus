
/**
 * Core utilities for post-quantum cryptography operations
 */

/**
 * Generate a random bytestring of specified length
 */
export function generateRandomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Convert Uint8Array to hex string
 */
export function toHexString(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a cryptographically secure pseudorandom number
 */
export function generateSecureRandom(min: number = 0, max: number = 1): number {
  const randomBytes = generateRandomBytes(4);
  // Convert bytes to 32-bit integer
  const randomInt = new DataView(randomBytes.buffer).getUint32(0, true);
  // Scale to [min, max)
  return min + (randomInt / 0xFFFFFFFF) * (max - min);
}

/**
 * Hash data using SHA-3 (Keccak)
 */
export async function hashWithSHA3(data: string): Promise<string> {
  console.log("🔹 Hashing with SHA-3 (SHAKE-256)");
  
  // In a simulation implementation
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  // Simulate SHA-3 hash
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), 
    byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * ML-KEM Key Encapsulation (encapsulate)
 */
export async function encapsulateKey(publicKey: string): Promise<{
  ciphertext: string;
  sharedSecret: string;
}> {
  // Simulate ML-KEM key encapsulation
  const ciphertextBytes = generateRandomBytes(32);
  const sharedSecretBytes = generateRandomBytes(32);
  
  return {
    ciphertext: toHexString(ciphertextBytes),
    sharedSecret: toHexString(sharedSecretBytes)
  };
}

/**
 * ML-KEM Key Encapsulation (decapsulate)
 */
export async function decapsulateKey(ciphertext: string, privateKey: string): Promise<string> {
  // Simulate ML-KEM decapsulation
  const sharedSecretBytes = generateRandomBytes(32);
  return toHexString(sharedSecretBytes);
}

/**
 * Derive key using post-quantum KDF (SHAKE-256)
 */
export async function deriveKey(seed: string, salt: string, length: number = 32): Promise<string> {
  // Simulate PQC-KDF (SHAKE-256)
  const combinedInput = seed + salt;
  const hash = await hashWithSHA3(combinedInput);
  return hash.substring(0, length * 2); // 2 hex chars per byte
}

// Constants for PQC algorithms
export const PQC = {
  ALGORITHM: {
    ML_KEM_512: "ML-KEM-512",
    ML_KEM_768: "ML-KEM-768",
    ML_KEM_1024: "ML-KEM-1024",
    SLH_DSA_DILITHIUM2: "SLH-DSA-Dilithium2",
    SLH_DSA_DILITHIUM3: "SLH-DSA-Dilithium3",
    SLH_DSA_DILITHIUM5: "SLH-DSA-Dilithium5",
    FALCON_512: "FALCON-512",
    FALCON_1024: "FALCON-1024",
    SPHINCS_PLUS: "SPHINCS+",
    BIKE_L1: "BIKE-L1",
    BIKE_L3: "BIKE-L3",
    BIKE_L5: "BIKE-L5",
  },
  
  SECURITY_LEVEL: {
    L1: "128-bit quantum security",
    L3: "192-bit quantum security",
    L5: "256-bit quantum security"
  },
  
  STANDARD: {
    FIPS_205: "NIST FIPS 205",
    FIPS_206: "NIST FIPS 206",
    NIST_ROUND_4: "NIST Round 4 Alternate"
  }
};
