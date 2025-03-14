import { Account, RpcProvider, hash, Signature, ec } from "starknet";
import { randomBytes, createHash } from "crypto-browserify";

// ✅ Initialize StarkNet RPC Provider (Mainnet/Testnet Compatible)
const provider = new RpcProvider({ nodeUrl: "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" });

// ✅ Step 1: Generate a StarkNet Identity (Key Pair)
export async function generateStarkNetIdentity(): Promise<{ starkKey: string; starkAddress: string }> {
  console.log("🔹 Generating StarkNet Identity...");
  
  // Generate a 32-byte private key
  const privateKey = randomBytes(32).toString("hex");

  // Hash the private key to derive a StarkNet Public Key
  const starkKey = createHash("sha256").update(privateKey).digest("hex");

  // Create an account instance
  const account = new Account(provider, starkKey, ec.starkCurve);

  return {
    starkKey,
    starkAddress: account.address,
  };
}

// ✅ Step 2: Sign Messages with StarkNet
export async function signWithStarkNet(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Signing message with StarkNet...");
  
  // Create account instance
  const account = new Account(provider, privateKey, ec.starkCurve);
  
  // Sign the message
  const signature = await account.signMessage(hash.starknetKeccak(message));

  return signature;
}

// ✅ Step 3: Verify StarkNet Signatures
export async function verifyStarkNetSignature(message: string, signature: string, starkKey: string): Promise<boolean> {
  console.log("🔹 Verifying StarkNet Signature...");

  // Compute message hash
  const messageHash = hash.starknetKeccak(message);

  // Verify the signature
  const isValid = ec.starkCurve.verify(signature, messageHash, starkKey);

  return isValid;
}