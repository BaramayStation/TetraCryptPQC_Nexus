import { create } from "ipfs-http-client";

// 🔹 Configure IPFS Client (Using Infura Gateway for Decentralization)
const IPFS_GATEWAY = "https://ipfs.infura.io:5001";
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

/**
 * 🔹 Store an encrypted message on IPFS
 * @param encryptedMessage - The encrypted message string
 * @returns {string} - IPFS Content Identifier (CID)
 */
export const saveToIPFS = async (encryptedMessage: string): Promise<string> => {
  try {
    console.log("🔹 Storing Message on IPFS...");
    const { path } = await ipfs.add(encryptedMessage);
    return path; // IPFS CID
  } catch (error) {
    console.error("❌ Failed to store message on IPFS:", error);
    throw new Error("IPFS storage error");
  }
};

/**
 * 🔹 Retrieve an encrypted message from IPFS
 * @param cid - The IPFS Content Identifier (CID)
 * @returns {string} - The encrypted message
 */
export const loadFromIPFS = async (cid: string): Promise<string> => {
  try {
    console.log("🔹 Fetching Message from IPFS:", cid);
    const stream = ipfs.cat(cid);
    let data = "";
    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk);
    }
    return data;
  } catch (error) {
    console.error("❌ Failed to retrieve message from IPFS:", error);
    throw new Error("IPFS retrieval error");
  }
};
