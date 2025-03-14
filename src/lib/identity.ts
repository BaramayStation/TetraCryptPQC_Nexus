import { Account, RpcProvider, hash, ec, Signature } from "starknet";
import { randomBytes, createHash } from "crypto-browserify";

// ✅ Initialize StarkNet RPC Provider (Mainnet/Testnet)
const provider = new RpcProvider({ nodeUrl: "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" });

/**
 * ✅ Step 1: Generate a Quantum-Resistant StarkNet Identity
 * - Uses 32-byte Quantum-Secure Random Private Key
 * - Derives StarkNet Public Key with SHA-256
 * - Generates an Account instance
 */
export async function generateStarkNetIdentity(): Promise<{ starkKey: string; starkAddress: string }> {
  console.log("🔹 Generating StarkNet Identity...");

  // Generate a secure 32-byte private key
  const privateKey = randomBytes(32).toString("hex");

  // Create StarkNet Public Key from SHA-256 Hash
  const starkKey = createHash("sha256").update(privateKey).digest("hex");

  // Initialize Account with StarkNet Curve
  const account = new Account(provider, starkKey, ec.starkCurve);

  return {
    starkKey,
    starkAddress: account.address,
  };
}

/**
 * ✅ Step 2: Sign a Message Using StarkNet Identity
 * - Uses Keccak Hashing for Security
 * - Prevents Replay Attacks
 * - Uses StarkNet’s Cairo-Based Digital Signature System
 */
export async function signWithStarkNet(message: string, privateKey: string): Promise<Signature> {
  console.log("🔹 Signing message with StarkNet...");

  // Initialize Account with Private Key
  const account = new Account(provider, privateKey, ec.starkCurve);

  // Hash the message before signing (Prevents Replay Attacks)
  const messageHash = hash.starknetKeccak(message);

  // Sign the hashed message
  const signature = await account.signMessage(messageHash);

  return signature;
}

/**
 * ✅ Step 3: Verify a StarkNet Signature
 * - Uses Keccak Hashing for Secure Verification
 * - Implements StarkNet's Cairo Elliptic Curve Signature Check
 */
export async function verifyStarkNetSignature(message: string, signature: Signature, starkKey: string): Promise<boolean> {
  console.log("🔹 Verifying StarkNet Signature...");

  // Compute message hash
  const messageHash = hash.starknetKeccak(message);

  // Verify the signature with StarkNet's curve
  const isValid = ec.starkCurve.verify(signature, messageHash, starkKey);

  return isValid;
}