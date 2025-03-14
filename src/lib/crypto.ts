import { kyber, dilithium, sphincs, falcon } from "pqcrypto";
import crypto from "crypto-browserify";

// ============================================================
// 🔹 Generate Key Pairs (Kyber, Dilithium, Falcon, SPHINCS+)
// ============================================================
export const generateKyberKeypair = async () => {
  console.log("🔹 Generating Kyber Keypair (Post-Quantum KEM)");
  return kyber.keyPair();
};

export const generateDilithiumKeypair = async () => {
  console.log("🔹 Generating Dilithium Keypair (Post-Quantum Signature)");
  return dilithium.keyPair();
};

export const generateFalconKeypair = async () => {
  console.log("🔹 Generating Falcon Keypair (Post-Quantum Signature)");
  return falcon.keyPair();
};

export const generateSphincsKeypair = async () => {
  console.log("🔹 Generating SPHINCS+ Keypair (Post-Quantum Signature)");
  return sphincs.keyPair();
};

// ============================================================
// 🔹 Post-Quantum Secure Encryption
// ============================================================
export const encryptMessage = async (message: string, publicKey: Uint8Array) => {
  console.log("🔹 Encrypting Message with Kyber (PQC KEM)");
  return kyber.encrypt(message, publicKey);
};

export const decryptMessage = async (ciphertext: Uint8Array, privateKey: Uint8Array) => {
  console.log("🔹 Decrypting Message with Kyber (PQC KEM)");
  return kyber.decrypt(ciphertext, privateKey);
};

// ============================================================
// 🔹 Post-Quantum Digital Signatures
// ============================================================
export const signMessage = async (message: string, privateKey: Uint8Array) => {
  console.log("🔹 Signing Message with Dilithium (PQC Signature)");
  return dilithium.sign(message, privateKey);
};

export const verifySignature = async (message: string, signature: Uint8Array, publicKey: Uint8Array) => {
  console.log("🔹 Verifying Message with Dilithium (PQC Signature)");
  return dilithium.verify(message, signature, publicKey);
};

// ============================================================
// 🔹 Random Quantum-Safe Session Keys (AES-256)
// ============================================================
export const generateSessionKey = async () => {
  console.log("🔹 Generating AES-256 Session Key");
  return crypto.randomBytes(32).toString("hex");
};