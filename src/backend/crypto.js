import wasmCrypto from "wasm-feature-detect";
import { subtle } from "crypto"; // Web Crypto API for AES-GCM

// ✅ Initialize WebAssembly PQC Library
const pqcInit = async () => {
  if (!(await wasmCrypto.simd())) throw new Error("WebAssembly SIMD required for PQC.");
  return await wasmCrypto.init();
};

/* 🔹 Post-Quantum Key Generation */
export async function generateKyberKeypair() {
  console.log("🔹 Generating Kyber ML-KEM Keypair...");
  const kem = await pqcInit();
  const { publicKey, secretKey } = kem.kemKeypair("ML-KEM-1024");

  return {
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(secretKey).toString("hex"),
  };
}

/* 🔹 AES-256-GCM Encryption */
export async function encryptAES(message, key) {
  console.log("🔹 Encrypting with AES-256-GCM...");
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Secure IV
  const encodedMessage = new TextEncoder().encode(message);
  
  const cryptoKey = await subtle.importKey(
    "raw", 
    Buffer.from(key, "hex").slice(0, 32), 
    "AES-GCM", 
    false, 
    ["encrypt"]
  );

  const encrypted = await subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encodedMessage
  );

  return `${Buffer.from(iv).toString("hex")}:${Buffer.from(new Uint8Array(encrypted)).toString("hex")}`;
}

/* 🔹 AES-256-GCM Decryption */
export async function decryptAES(encryptedMessage, key) {
  console.log("🔹 Decrypting AES-256-GCM...");
  const [ivHex, encryptedHex] = encryptedMessage.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const cryptoKey = await subtle.importKey(
    "raw", 
    Buffer.from(key, "hex").slice(0, 32), 
    "AES-GCM", 
    false, 
    ["decrypt"]
  );

  const decrypted = await subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}