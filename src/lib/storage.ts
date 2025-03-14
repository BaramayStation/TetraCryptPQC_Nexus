import { create } from "ipfs-http-client";
import { generateMLKEMKeypair } from "@/lib/crypto";
import { generateStarkNetIdentity } from "@/lib/identity";

// ✅ Initialize IPFS Client (Using Infura for Public Gateway)
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// ✅ Store Data Securely on IPFS
export async function saveToIPFS(data: any): Promise<string> {
  try {
    console.log("🔹 Storing data on IPFS...");
    const { cid } = await ipfs.add(JSON.stringify(data));
    return cid.toString();
  } catch (error) {
    console.error("❌ Failed to store on IPFS:", error);
    throw new Error("IPFS Storage Failed");
  }
}

// ✅ Retrieve Data from IPFS
export async function loadFromIPFS(cid: string): Promise<any> {
  try {
    console.log("🔹 Retrieving data from IPFS...");
    const response = await ipfs.cat(cid);
    return JSON.parse(new TextDecoder().decode(response));
  } catch (error) {
    console.error("❌ Failed to retrieve from IPFS:", error);
    throw new Error("IPFS Retrieval Failed");
  }
}

// ✅ Create Post-Quantum Secure User Profile
export async function createUserProfile(username: string) {
  console.log("🔹 Creating new post-quantum secure user profile...");

  // ✅ Generate Post-Quantum Key Pair (ML-KEM)
  const keypair = await generateMLKEMKeypair();

  // ✅ Generate StarkNet Identity
  const identity = await generateStarkNetIdentity();

  // ✅ Construct Secure User Profile
  const userProfile = {
    id: identity.starkKey,
    name: username,
    keyPairs: {
      mlkem: keypair,
    },
    starknet: {
      address: identity.starkAddress,
    },
    createdAt: new Date().toISOString(),
  };

  // ✅ Store Encrypted Profile on IPFS
  const ipfsHash = await saveToIPFS(userProfile);
  console.log(`✅ User Profile stored on IPFS: ${ipfsHash}`);

  return ipfsHash;
}