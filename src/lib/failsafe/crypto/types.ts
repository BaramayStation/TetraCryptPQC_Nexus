
/**
 * TetraCryptPQC Cryptography Failsafe Types
 */

export interface CryptoImplementation {
  generateKeypair: (params?: any) => Promise<{ publicKey: string, privateKey: string }>;
  encrypt: (data: string | Uint8Array, publicKey: string) => Promise<string | Uint8Array>;
  decrypt: (data: string | Uint8Array, privateKey: string) => Promise<string | Uint8Array>;
  sign: (data: string | Uint8Array, privateKey: string) => Promise<string | Uint8Array>;
  verify: (data: string | Uint8Array, signature: string | Uint8Array, publicKey: string) => Promise<boolean>;
}

export enum CryptoAlgorithm {
  ML_KEM = "ml-kem",      // Primary KEM (Kyber)
  SLH_DSA = "slh-dsa",    // Primary signature (Dilithium)
  FALCON = "falcon",      // Secondary signature
  BIKE = "bike",          // Secondary KEM
  FRODO_KEM = "frodo-kem", // Tertiary KEM 
  CLASSIC_RSA = "rsa",    // Classic fallback
  CLASSIC_ECC = "ecc",    // Classic fallback
  SPHINCS_PLUS = "sphincs-plus" // Last resort signature
}
