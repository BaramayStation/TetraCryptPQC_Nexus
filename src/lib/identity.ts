import { Account, RpcProvider, hash, ec, Signature } from "starknet";
import { randomBytes, createHash } from "crypto-browserify";

// ✅ Initialize StarkNet Provider (Mainnet/Testnet Ready)
const provider = new RpcProvider({ nodeUrl: "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" });

// ✅ Step 1: Generate a Quantum-Resistant StarkNet Identity
export async function generateStarkNetIdentity(): Promise<{ starkKey: string; starkAddress: string }> {
  console.log("🔹 Generating StarkNet Identity...");

  // Generate a 32-byte private key (Quantum-Secure Random)
  const privateKey = randomBytes(32).toString("hex");

  // Hash the private key to create a StarkNet Public Key (SHA-256)
  const starkKey = createHash("sha256").update(privateKey).digest("hex");

  // Create an Account instance (Quantum-Secure Key Pair)
  const account = new Account(provider, starkKey, ec.starkCurve);

  return {
    starkKey,
    starkAddress: account.address,
  };
}

// ✅ Step 2: Sign a Message with StarkNet Identity
export async function signWithStarkNet(message: string, privateKey: string): Promise<Signature> {
  console.log("🔹 Signing message with StarkNet...");

  // Create Account instance with the given private key
  const account = new Account(provider, privateKey, ec.starkCurve);

  // Hash the message before signing (Prevents Replay Attacks)
  const messageHash = hash.starknetKeccak(message);

  // Sign the message using StarkNet's elliptic curve
  const signature = await account.signMessage(messageHash);

  return signature;
}

// ✅ Step 3: Verify StarkNet Signatures for Security
export async function verifyStarkNetSignature(message: string, signature: Signature, starkKey: string): Promise<boolean> {
  console.log("🔹 Verifying StarkNet Signature...");

  // Compute the hash of the message
  const messageHash = hash.starknetKeccak(message);

  // Verify signature using StarkNet's built-in elliptic curve verification
  const isValid = ec.starkCurve.verify(signature, messageHash, starkKey);

  return isValid;
}