
/**
 * TetraCryptPQC Quantum Security Constants
 * 
 * NIST PQC (FIPS 205/206) compliant constants for quantum-resistant cryptography.
 */

// ML-KEM (Kyber) key size constants
export const ML_KEM_768_PUBLIC_KEY_SIZE = 1184;  // bytes
export const ML_KEM_768_SECRET_KEY_SIZE = 2400;  // bytes
export const ML_KEM_768_CIPHERTEXT_SIZE = 1088;  // bytes
export const ML_KEM_768_SHARED_SECRET_SIZE = 32;  // bytes

export const ML_KEM_1024_PUBLIC_KEY_SIZE = 1568;  // bytes
export const ML_KEM_1024_SECRET_KEY_SIZE = 3168;  // bytes
export const ML_KEM_1024_CIPHERTEXT_SIZE = 1568;  // bytes
export const ML_KEM_1024_SHARED_SECRET_SIZE = 32;  // bytes

// ML-DSA (Dilithium) signature size constants
export const ML_DSA_65_PUBLIC_KEY_SIZE = 1312;  // bytes
export const ML_DSA_65_SECRET_KEY_SIZE = 2528;  // bytes
export const ML_DSA_65_SIGNATURE_SIZE = 2420;  // bytes

export const ML_DSA_87_PUBLIC_KEY_SIZE = 1952;  // bytes
export const ML_DSA_87_SECRET_KEY_SIZE = 4000;  // bytes
export const ML_DSA_87_SIGNATURE_SIZE = 3293;  // bytes

// Falcon signature size constants
export const FALCON_512_PUBLIC_KEY_SIZE = 897;  // bytes
export const FALCON_512_SECRET_KEY_SIZE = 1281;  // bytes
export const FALCON_512_SIGNATURE_SIZE = 666;  // bytes

export const FALCON_1024_PUBLIC_KEY_SIZE = 1793;  // bytes
export const FALCON_1024_SECRET_KEY_SIZE = 2305;  // bytes
export const FALCON_1024_SIGNATURE_SIZE = 1280;  // bytes

// Security levels
export enum SecurityLevel {
  STANDARD = "standard",     // AES-256 + ML-KEM-768
  ENHANCED = "enhanced",     // AES-256-GCM + ML-KEM-1024
  MAXIMUM = "maximum"        // AES-256-GCM + ML-KEM-1024 + ML-DSA-87
}

// Key rotation intervals (in milliseconds)
export const KEY_ROTATION_INTERVALS = {
  [SecurityLevel.STANDARD]: 30 * 24 * 60 * 60 * 1000,  // 30 days
  [SecurityLevel.ENHANCED]: 15 * 24 * 60 * 60 * 1000,  // 15 days
  [SecurityLevel.MAXIMUM]: 7 * 24 * 60 * 60 * 1000     // 7 days
};

// Cryptographic algorithm identifiers (NIST standardized)
export enum CryptoAlgorithm {
  ML_KEM_768 = "ML-KEM-768",
  ML_KEM_1024 = "ML-KEM-1024",
  ML_DSA_65 = "ML-DSA-65",
  ML_DSA_87 = "ML-DSA-87",
  FALCON_512 = "Falcon-512",
  FALCON_1024 = "Falcon-1024",
  AES_256_GCM = "AES-256-GCM",
  HKDF_SHA256 = "HKDF-SHA256",
  HKDF_SHA512 = "HKDF-SHA512"
}

// PQC Schema versions for data formats
export enum PQCSchemaVersion {
  V1 = "v1",
  V2 = "v2"
}

// Root storage keys
export const ROOT_KEY_ID = "pqc_root_key";
export const ROOT_KEY_METADATA = "pqc_root_key_metadata";
