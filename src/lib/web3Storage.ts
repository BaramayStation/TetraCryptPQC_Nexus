import { Web3Storage, File } from "web3.storage";
import { encryptAES, decryptAES, signMessage, verifySignature, generateZKProof, verifyZKProof } from "@/lib/crypto";

// ✅ Replace with your Web3.Storage API key
const WEB3_STORAGE_API_KEY = process.env.WEB3_STORAGE_API_KEY || "";

// ✅ Initialize Web3Storage Client
const client = new Web3Storage({ token: WEB3_STORAGE_API_KEY });

/**
 * ✅ Securely store encrypted message on IPFS/Filecoin
 * @param message - The plaintext message
 * @param encryptionKey - The AES encryption key
 * @param senderPrivateKey - The sender's private key for signing
 * @returns Promise<string> - The CID (Content Identifier)
 */
export const saveToIPFS = async (
  message: string,
  encryptionKey: string,
  senderPrivateKey: string
): Promise<string> => {
  try {
    console.log("🔹 Encrypting & Uploading Data to IPFS...");

    // ✅ Encrypt message using AES-256-GCM
    const encryptedData = await encryptAES(message, encryptionKey);

    // ✅ Generate zk-STARK Proof for integrity
    const zkProof = await generateZKProof(encryptedData);

    // ✅ Sign the encrypted message using SLH-DSA (Post-Quantum Secure)
    const signature = await signMessage(encryptedData, senderPrivateKey);

    // ✅ Create JSON payload
    const payload = JSON.stringify({ encryptedData, signature, zkProof });

    // ✅ Convert to File object for Web3.Storage
    const file = new File([payload], "secure-message.json", { type: "application/json" });

    // ✅ Upload to Web3.Storage
    const cid = await client.put([file]);

    console.log(`✅ Secure Data Stored on IPFS/Filecoin: ${cid}`);
    return cid; // Returns the IPFS CID
  } catch (error) {
    console.error("❌ Failed to store on IPFS/Filecoin:", error);
    throw new Error("Decentralized Storage Failed");
  }
};

/**
 * ✅ Retrieve and decrypt a message from IPFS/Filecoin
 * @param cid - The IPFS CID
 * @param decryptionKey - The AES decryption key
 * @param senderPublicKey - The sender's public key for verification
 * @returns Promise<string> - The decrypted message
 */
export const loadFromIPFS = async (
  cid: string,
  decryptionKey: string,
  senderPublicKey: string
): Promise<string> => {
  try {
    console.log("🔹 Retrieving Data from IPFS:", cid);

    // ✅ Fetch file from Web3.Storage (IPFS)
    const response = await fetch(`https://dweb.link/ipfs/${cid}`);
    if (!response.ok) throw new Error("IPFS retrieval failed");

    const content = await response.text();
    const { encryptedData, signature, zkProof } = JSON.parse(content);

    // ✅ Verify zk-STARK Proof Before Decrypting
    if (!(await verifyZKProof(encryptedData, zkProof))) {
      console.warn("❌ Data validation failed: Invalid zk-STARK proof");
      throw new Error("Data Integrity Check Failed");
    }

    // ✅ Verify Digital Signature (SLH-DSA)
    if (!(await verifySignature(encryptedData, signature, senderPublicKey))) {
      console.warn("❌ Signature verification failed!");
      throw new Error("Signature Validation Failed");
    }

    // ✅ Decrypt and return the message
    const decryptedMessage = await decryptAES(encryptedData, decryptionKey);
    console.log("✅ Successfully Decrypted Message:", decryptedMessage);

    return decryptedMessage;
  } catch (error) {
    console.error("❌ Failed to retrieve/decrypt from IPFS:", error);
    throw new Error("Decryption Failed");
  }
};