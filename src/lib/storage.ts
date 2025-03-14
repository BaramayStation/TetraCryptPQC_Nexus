import { create } from "ipfs-http-client";
import { generateMLKEMKeypair } from "@/lib/crypto";
import { generateStarkNetIdentity } from "@/lib/identity";

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

export async function saveToIPFS(data: any): Promise<string> {
  console.log("🔹 Storing data on IPFS...");
  const { cid } = await ipfs.add(JSON.stringify(data));
  return cid.toString();
}

export async function loadFromIPFS(cid: string): Promise<any> {
  console.log("🔹 Retrieving data from IPFS...");
  const response = await ipfs.cat(cid);
  return JSON.parse(new TextDecoder().decode(response));
}

export async function createUserProfile(username: string) {
  console.log("🔹 Creating new user profile...");
  const keypair = await generateMLKEMKeypair();
  const identity = await generateStarkNetIdentity();

  const userProfile = {
    id: identity.starkKey,
    name: username,
    keyPairs: {
      mlkem: keypair,
    },
    starknet: {
      address: identity.starkAddress,
    },
  };

  return await saveToIPFS(userProfile);
}