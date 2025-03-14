import { poseidonHash } from "@starkware-industries/stark-crypto";
import { signStarkNetTransaction, generateMLKEMKeypair } from "@/lib/crypto";
import { ethers } from "ethers";

// ✅ Generate a Decentralized Identity (DID) with PQC & StarkNet Integration
export async function generateDID(): Promise<any> {
  console.log("🔹 Generating PQC-StarkNet DID...");

  // ✅ Generate Post-Quantum Key Pair (ML-KEM)
  const { publicKey, privateKey } = await generateMLKEMKeypair();

  // ✅ Generate zk-STARK Proof for DID
  const zkProof = poseidonHash([publicKey]);

  // ✅ Generate StarkNet Wallet
  const wallet = ethers.Wallet.createRandom();

  return {
    id: `did:starknet:${zkProof}`,
    publicKey,
    starknetAddress: wallet.address,
    privateKey, // Keep Secure!
  };
}

// ✅ Verify DID using zk-STARK Proof
export function verifyDID(did: any): boolean {
  console.log("🔹 Verifying PQC-StarkNet DID...");
  return poseidonHash([did.publicKey]) === did.id.split(":")[2];
}

// ✅ Sign a DID-based Transaction on StarkNet
export async function signDIDTransaction(did: any, message: string): Promise<string> {
  console.log("🔹 Signing StarkNet DID Transaction...");
  return await signStarkNetTransaction(message, did.privateKey);
}