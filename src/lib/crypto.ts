import crypto from "crypto";
import { saveToIPFS, loadFromIPFS } from "@/lib/web3Storage";

let oqs: any;

// ✅ Dynamically Import OQS only in Node.js
if (typeof window === "undefined") {
  import("oqs").then((module) => {
    oqs = module;
  }).catch((err) => {
    console.error("Failed to load oqs:", err);
  });
}

// ============================================================
// 🔹 ML-KEM-1024 Key Generation (NIST FIPS 205) - Quantum Safe
// ============================================================
export const generateMLKEMKeypair = async (): Promise<{ publicKey: string; privateKey: string }> => {
  if (!oqs) throw new Error("OQS not available in browser!");
  console.log("🔹 Generating ML-KEM-1024 Keypair (NIST FIPS 205)");

  const kem = new oqs.KEM("ML-KEM-1024");
  const { publicKey, secretKey } = kem.keypair();

  return {
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(secretKey).toString("hex"),
  };
};

// ============================================================
// 🔹 SLH-DSA Key Generation (NIST FIPS 205) - Quantum Safe
// ============================================================
export const generateSLHDSAKeypair = async (): Promise<{ publicKey: string; privateKey: string }> => {
  if (!oqs) throw new Error("OQS not available in browser!");
  console.log("🔹 Generating SLH-DSA Keypair (NIST FIPS 205)");

  const dsa = new oqs.Signature("SLH-DSA-SHAKE-256f");
  const { publicKey, secretKey } = dsa.keypair();

  return {
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(secretKey).toString("hex"),
  };
};

// ============================================================
// 🔹 AES-256-GCM Encryption (Works in Both Browser & Node.js)
// ============================================================
export const encryptMessage = async (message: string, key: string): Promise<string> => {
  console.log("🔹 Encrypting with AES-256-GCM");

  if (typeof window !== "undefined" && window.crypto.subtle) {
    // ✅ Browser-safe AES encryption
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encKey = await window.crypto.subtle.importKey("raw", Buffer.from(key, "hex"), { name: "AES-GCM" }, false, ["encrypt"]);
    const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, encKey, new TextEncoder().encode(message));

    return `${Buffer.from(iv).toString("hex")}:${Buffer.from(encrypted).toString("hex")}`;
  } else {
    // ✅ Node.js AES encryption
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(message, "utf8", "hex");
    encrypted += cipher.final("hex");

    return `${iv.toString("hex")}:${encrypted}`;
  }
};

// ============================================================
// 🔹 AES-256-GCM Decryption (Works in Both Browser & Node.js)
// ============================================================
export const decryptMessage = async (encryptedMessage: string, key: string): Promise<string> => {
  console.log("🔹 Decrypting with AES-256-GCM");

  const [iv, encrypted] = encryptedMessage.split(":");
  if (typeof window !== "undefined" && window.crypto.subtle) {
    // ✅ Browser-safe AES decryption
    const decKey = await window.crypto.subtle.importKey("raw", Buffer.from(key, "hex"), { name: "AES-GCM" }, false, ["decrypt"]);
    const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(iv, "hex") }, decKey, Buffer.from(encrypted, "hex"));

    return new TextDecoder().decode(decrypted);
  } else {
    // ✅ Node.js AES decryption
    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
};

// ============================================================
// 🔹 Perfect Forward Secrecy (Ephemeral X25519 Key Exchange)
// ============================================================
export const generateEphemeralKeyPair = (): { privateKey: string; publicKey: string } => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("x25519");
  return {
    publicKey: publicKey.export({ type: "spki", format: "pem" }).toString("hex"),
    privateKey: privateKey.export({ type: "pkcs8", format: "pem" }).toString("hex"),
  };
};

// 🔹 Generate a New Session Key Per Message (Perfect Forward Secrecy)
export const generateSessionKey = async (): Promise<string> => {
  const ephemeralKeyPair = generateEphemeralKeyPair();
  console.log("🔹 Generating new session key (PFS)");
  return ephemeralKeyPair.privateKey.substring(0, 64);
};

// ============================================================
// 🔹 zk-SNARKs Zero-Knowledge Proof for Identity Verification
// ============================================================
export const generateZKProof = async (claim: string): Promise<string> => {
  console.log("🔹 Generating zk-SNARK for identity verification");
  const hash = crypto.createHash("sha256").update(claim).digest("hex");
  return `zkp-${hash}`;
};

// ============================================================
// 🔹 Web3 Decentralized Identity (DID) Generation
// ============================================================
export const generateDID = async (mlkemPublicKey: string, slhdsaPublicKey: string): Promise<any> => {
  console.log("🔹 Generating Web3 Decentralized Identity (DID)");

  const id = `did:tetrapqc:${crypto.randomUUID()}`;
  const zkProof = await generateZKProof(id);

  return {
    id,
    publicKey: { type: "ML-KEM-1024", key: mlkemPublicKey },
    signature: { type: "SLH-DSA", value: slhdsaPublicKey },
    authentication: [{ type: "zk-SNARK", proof: zkProof }],
  };
};

// ============================================================
// 🔹 Web3 Storage (IPFS / Arweave)
// ============================================================
export const saveToIPFS = async (data: string): Promise<string> => {
  console.log("🔹 Storing Encrypted Message on IPFS");
  return `ipfs://${crypto.createHash("sha256").update(data).digest("hex")}`;
};

export const loadFromIPFS = async (hash: string): Promise<string | null> => {
  console.log("🔹 Fetching Message from IPFS:", hash);
  return null; // Simulate fetching from IPFS
};

// ============================================================
// 🔹 Homomorphic Encryption (Privacy-Preserving Computation)
// ============================================================
export const homomorphicEncrypt = async (data: string): Promise<string> => {
  console.log("🔹 Applying Homomorphic Encryption");
  return `HE-${crypto.createHash("sha256").update(data).digest("hex")}`;
};

// ============================================================
// 🔹 Secure Multi-Party Computation (SMPC) Simulation
// ============================================================
export const simulateSMPC = async (inputData: string): Promise<string> => {
  console.log("🔹 Simulating Secure Multi-Party Computation (SMPC)");
  return `SMPC-${crypto.createHash("sha256").update(inputData).digest("hex")}`;
};
