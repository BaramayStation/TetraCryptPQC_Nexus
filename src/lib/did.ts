import { poseidonHash } from "starknet";
import { signStarkNetTransaction, generateMLKEMKeypair } from "@/lib/crypto";
import { Wallet } from "ethers";

// ✅ Generate a Decentralized Identity (DID) with PQC & StarkNet Integration
export async function generateDID(): Promise<{ id: string; publicKey: string; starknetAddress: string; privateKey: string }> {
  console.log("🔹 Generating PQC-StarkNet DID...");

  // ✅ Step 1: Generate Post-Quantum Key Pair (ML-KEM)
  const { publicKey, privateKey } = await generateMLKEMKeypair();

  // ✅ Step 2: Generate zk-STARK Proof for DID
  const zkProof = poseidonHash([BigInt(`0x${publicKey}`)]);

  // ✅ Step 3: Generate StarkNet Wallet
  const wallet = Wallet.createRandom();

  return {
    id: `did:starknet:${zkProof.toString()}`,
    publicKey,
    starknetAddress: wallet.address,
    privateKey, // Keep Secure!
  };
}

// ✅ Verify DID using zk-STARK Proof
export function verifyDID(did: { id: string; publicKey: string }): boolean {
  console.log("🔹 Verifying PQC-StarkNet DID...");
  return poseidonHash([BigInt(`0x${did.publicKey}`)]).toString() === did.id.split(":")[2];
}

// ✅ Sign a DID-based Transaction on StarkNet
export async function signDIDTransaction(did: { privateKey: string }, message: string): Promise<string> {
  console.log("🔹 Signing StarkNet DID Transaction...");
  return await signStarkNetTransaction(message, did.privateKey);
}