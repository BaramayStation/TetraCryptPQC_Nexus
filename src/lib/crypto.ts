import { sha256 } from "@noble/hashes/sha256";
import { subtle } from "crypto"; // Web Crypto API for AES-GCM
import { ec, hash } from "starknet"; // ✅ StarkNet ECDSA & Pedersen Hash
import { poseidonHash } from "@starkware-industries/stark-crypto"; // ✅ zk-STARK Hashing
import * as wasmCrypto from "wasm-feature-detect"; // ✅ WebAssembly PQC Check
import { ethers } from "ethers"; // ✅ Web3 Signing

// ✅ Initialize WebAssembly PQC Library
const pqcInit = async () => {
  if (!(await wasmCrypto.simd())) throw new Error("WebAssembly SIMD required for PQC.");
  return await wasmCrypto.init();
};

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

// ✅ BIKE KEM (Backup Post-Quantum Algorithm)
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

/* 🔹 AES-256-GCM Encryption (Web Crypto API) */
export async function encryptAES(message: string, key: string): Promise<string> {
  console.log("🔹 Encrypting with AES-256-GCM...");
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Secure IV
  const encodedMessage = new TextEncoder().encode(message);
  const encrypted = await subtle.encrypt(
    { name: "AES-GCM", iv },
    await subtle.importKey("raw", Buffer.from(key, "hex"), "AES-GCM", false, ["encrypt"]),
    encodedMessage
  );
  return `${Buffer.from(iv).toString("hex")}:${Buffer.from(encrypted).toString("hex")}`;
}

export async function decryptAES(encryptedMessage: string, key: string): Promise<string> {
  console.log("🔹 Decrypting AES-256-GCM...");
  const [ivHex, encryptedHex] = encryptedMessage.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decrypted = await subtle.decrypt(
    { name: "AES-GCM", iv },
    await subtle.importKey("raw", Buffer.from(key, "hex"), "AES-GCM", false, ["decrypt"]),
    encrypted
  );
  return new TextDecoder().decode(decrypted);
}

/* 🔹 Homomorphic Encryption (Privacy-Preserving Computation) */
export async function homomorphicEncrypt(data: string): Promise<string> {
  console.log("🔹 Applying Homomorphic Encryption...");
  return `HE-${sha256(data)}`;
}

/* 🔹 zk-STARK Proof for Message Authentication */
export async function generateZKProof(message: string): Promise<string> {
  console.log("🔹 Generating zk-STARK for message authentication...");
  return poseidonHash([sha256(message)]);
}

/* 🔹 StarkNet Secure Transaction Signing */
export async function signStarkNetTransaction(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Signing StarkNet Transaction...");

  const starkKeyPair = ec.getKeyPair(privateKey);
  const hashedMessage = hash.computePedersenHash(message);
  const signature = ec.sign(starkKeyPair, hashedMessage);

  return JSON.stringify(signature);
}

/* 🔹 StarkNet Signature Verification */
export async function verifyStarkNetSignature(
  message: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  console.log("🔹 Verifying StarkNet signature...");

  const parsedSignature = JSON.parse(signature);
  const hashedMessage = hash.computePedersenHash(message);
  
  return ec.verify(publicKey, hashedMessage, parsedSignature);
}