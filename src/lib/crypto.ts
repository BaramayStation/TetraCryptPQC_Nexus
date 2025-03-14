import { sha256 } from "@noble/hashes/sha256";
import { randomBytes } from "crypto-browserify";
import * as wasmCrypto from "liboqs-wasm"; // Using WebAssembly for PQC

export async function generateMLKEMKeypair(): Promise<{ publicKey: string; privateKey: string }> {
  console.log("🔹 Generating ML-KEM-1024 Keypair...");
  const kem = await wasmCrypto.init(); // Initialize WASM
  const { publicKey, secretKey } = kem.kemKeypair("ML-KEM-1024");

  return {
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(secretKey).toString("hex"),
  };
}

export async function signMessage(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Signing message with SLH-DSA...");
  const dsa = await wasmCrypto.init();
  const signature = dsa.sign("SLH-DSA-SHAKE-256f", Buffer.from(message), Buffer.from(privateKey, "hex"));

  return Buffer.from(signature).toString("hex");
}

export async function verifySignature(message: string, signature: string, publicKey: string): Promise<boolean> {
  console.log("🔹 Verifying signature...");
  const dsa = await wasmCrypto.init();
  return dsa.verify("SLH-DSA-SHAKE-256f", Buffer.from(message), Buffer.from(signature, "hex"), Buffer.from(publicKey, "hex"));
}

export function encryptAES(message: string, key: string): string {
  console.log("🔹 Encrypting with AES-256-GCM...");
  const iv = randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptAES(encryptedMessage: string, key: string): string {
  console.log("🔹 Decrypting AES-256-GCM...");
  const [iv, encrypted] = encryptedMessage.split(":");
  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}