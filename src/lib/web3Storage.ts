import { create } from "ipfs-http-client";

const IPFS_GATEWAY = "https://ipfs.infura.io:5001";

// 🔹 Initialize IPFS Client
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

/**
 * 🔹 Store an encrypted message on IPFS
 * @param encryptedData - The encrypted message string
 * @returns IPFS Content Identifier (CID)
 */
export const saveToIPFS = async (encryptedData: string): Promise<string> => {
  try {
    console.log("🔹 Storing Encrypted Message on IPFS...");
    const result = await ipfs.add(encryptedData);
    return result.path; // Returns IPFS Hash (CID)
  } catch (error) {
    console.error("❌ Failed to store message on IPFS:", error);
    throw new Error("IPFS storage error");
  }
};

/**
 * 🔹 Retrieve an encrypted message from IPFS
 * @param cid - The IPFS Content Identifier (CID)
 * @returns The original encrypted message
 */
export const loadFromIPFS = async (cid: string): Promise<string> => {
  try {
    console.log("🔹 Loading Message from IPFS:", cid);
    const file = await ipfs.cat(cid);
    return new TextDecoder().decode(file);
  } catch (error) {
    console.error("❌ Failed to retrieve message from IPFS:", error);
    throw new Error("IPFS retrieval error");
  }
};
