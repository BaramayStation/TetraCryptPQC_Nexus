import { create } from "ipfs-http-client";
import { encryptAES, decryptAES, generateZKProof, verifyZKProof } from "@/lib/crypto";
import { generateStarkNetIdentity } from "@/lib/identity";
import crypto from "crypto-browserify";

// ✅ Initialize IPFS Client (Decentralized Storage)
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

/**
 * ✅ Stores an **encrypted** message on IPFS/Filecoin with zk-STARK proof
 * @param {string} message - The plaintext message
 * @param {string} key - The AES encryption key
 * @returns {Promise<string>} The IPFS CID (Content Identifier)
 */
export async function saveToIPFS(message: string, key: string): Promise<string> {
  try {
    console.log("🔹 Encrypting & Uploading Data to IPFS...");

    // 🔹 Encrypt message using AES-256-GCM
    const encryptedData = encryptAES(message, key);

    // 🔹 Generate zk-STARK Proof for integrity
    const zkProof = await generateZKProof(encryptedData);

    // 🔹 Store encrypted message + proof on IPFS
    const { cid } = await ipfs.add(JSON.stringify({ encryptedData, zkProof }));

    console.log(`✅ Secure Data Stored on IPFS/Filecoin: ${cid.toString()}`);
    return cid.toString(); // Returns the IPFS CID
  } catch (error) {
    console.error("❌ Failed to store on IPFS/Filecoin:", error);
    throw new Error("Decentralized Storage Failed");
  }
}

/**
 * ✅ Retrieves and decrypts a message from IPFS/Filecoin
 * @param {string} cid - The IPFS CID
 * @param {string} key - The AES decryption key
 * @returns {Promise<string>} The decrypted message
 */
export async function loadFromIPFS(cid: string, key: string): Promise<string> {
  try {
    console.log("🔹 Retrieving Data from IPFS:", cid);

    // 🔹 Retrieve encrypted data from IPFS
    const response = await ipfs.cat(cid);
    const { encryptedData, zkProof } = JSON.parse(new TextDecoder().decode(response));

    // 🔹 Verify zk-STARK Proof Before Decrypting
    const isValidProof = await verifyZKProof(encryptedData, zkProof);
    if (!isValidProof) {
      console.warn("❌ Data validation failed: Invalid zk-STARK proof");
      throw new Error("Data Integrity Check Failed");
    }

    // 🔹 Decrypt and return the message
    const decryptedMessage = decryptAES(encryptedData, key);
    console.log("✅ Successfully Decrypted Message:", decryptedMessage);

    return decryptedMessage;
  } catch (error) {
    console.error("❌ Failed to retrieve/decrypt from IPFS:", error);
    throw new Error("Decryption Failed");
  }
}

/**
 * ✅ Creates a **Post-Quantum Secure User Profile** and stores it on IPFS
 * @param {string} username - The user's chosen username
 * @returns {Promise<string>} The IPFS CID of the encrypted user profile
 */
export async function createUserProfile(username: string): Promise<string> {
  console.log("🔹 Creating Quantum-Secure User Profile...");

  // ✅ Generate StarkNet Identity (zk-STARK & PQC Compatible)
  const identity = await generateStarkNetIdentity();

  // ✅ Construct Encrypted User Profile
  const userProfile = {
    id: identity.starkKey,
    name: username,
    starknet: {
      address: identity.starkAddress,
    },
    createdAt: new Date().toISOString(),
  };

  // ✅ Encrypt and Store Profile on IPFS
  const encryptionKey = identity.starkKey; // Using StarkNet Key for Encryption
  const ipfsHash = await saveToIPFS(JSON.stringify(userProfile), encryptionKey);

  console.log(`✅ User Profile Stored Securely on IPFS: ${ipfsHash}`);
  return ipfsHash;
}