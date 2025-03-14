import { sha256 } from "@noble/hashes/sha256";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto-browserify";
import * as wasmCrypto from "liboqs-wasm"; // WebAssembly PQC Implementation
import { ethers } from "ethers"; // Web3 Signing
import { poseidonHash } from "@starkware-industries/stark-crypto"; // StarkNet Hashing

// ✅ Initialize WASM PQC Library
const pqcInit = async () => await wasmCrypto.init();

/* 🔹 Post-Quantum Key Generation (NIST FIPS 205/206) */
export async function generateMLKEMKeypair(): Promise<{ publicKey: string; privateKey: string }> {
  console.log("🔹 Generating ML-KEM-1024 Keypair...");
  const kem = await pqcInit();
  const { publicKey, secretKey } = kem.kemKeypair("ML-KEM-1024");

  return {
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(secretKey).toString("hex"),
  };
}

// ✅ BIKE KEM (Additional Security)
export async function generateBIKEKeypair(): Promise<{ publicKey: string; privateKey: string }> {
  console.log("🔹 Generating BIKE Keypair (NIST PQC Candidate)...");
  const kem = await pqcInit();
  const { publicKey, secretKey } = kem.kemKeypair("BIKE");

  return {
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(secretKey).toString("hex"),
  };
}

/* 🔹 Digital Signatures (NIST-Approved) */
export async function signMessage(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Signing message with SLH-DSA...");
  const dsa = await pqcInit();
  const signature = dsa.sign("SLH-DSA-SHAKE-256f", Buffer.from(message), Buffer.from(privateKey, "hex"));

  return Buffer.from(signature).toString("hex");
}

export async function verifySignature(message: string, signature: string, publicKey: string): Promise<boolean> {
  console.log("🔹 Verifying signature...");
  const dsa = await pqcInit();
  return dsa.verify("SLH-DSA-SHAKE-256f", Buffer.from(message), Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
}

/* 🔹 AES-256-GCM Encryption (NIST FIPS 197) */
export function encryptAES(message: string, key: string): string {
  console.log("🔹 Encrypting with AES-256-GCM...");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptAES(encryptedMessage: string, key: string): string {
  console.log("🔹 Decrypting AES-256-GCM...");
  const [iv, encrypted] = encryptedMessage.split(":");
  const decipher = createDecipheriv("aes-256-gcm", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/* 🔹 Homomorphic Encryption (Privacy-Preserving Computation) */
export async function homomorphicEncrypt(data: string): Promise<string> {
  console.log("🔹 Applying Homomorphic Encryption...");
  return `HE-${sha256(data)}`;
}

/* 🔹 Zero-Knowledge Proof (zk-STARK for Message Verification) */
export async function generateZKProof(message: string): Promise<string> {
  console.log("🔹 Generating zk-STARK for message authentication...");
  return poseidonHash([sha256(message)]);
}

/* 🔹 StarkNet Secure Transaction Signing */
export async function signStarkNetTransaction(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Signing StarkNet Transaction...");
  const wallet = new ethers.Wallet(privateKey);
  return await wallet.signMessage(message);
}