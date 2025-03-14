import { Account, Provider } from "starknet";

const provider = new Provider({ sequencer: "https://alpha4.starknet.io" });

export async function generateStarkNetIdentity(): Promise<{ starkKey: string; starkAddress: string }> {
  console.log("🔹 Generating StarkNet Identity...");
  const privateKey = crypto.randomBytes(32).toString("hex");
  const starkKey = crypto.createHash("sha256").update(privateKey).digest("hex");

  const account = new Account(provider, starkKey);
  return {
    starkKey,
    starkAddress: account.address,
  };
}

export async function signWithStarkNet(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Signing message with StarkNet...");
  const account = new Account(provider, privateKey);
  return account.signMessage(message);
}

export async function verifyStarkNetSignature(message: string, signature: string, starkKey: string): Promise<boolean> {
  console.log("🔹 Verifying StarkNet Signature...");
  const account = new Account(provider, starkKey);
  return account.verifyMessage(message, signature);
}