import { generateStarkNetIdentity, signWithStarkNet } from "@/lib/identity";

export async function createDecentralizedIdentity(username: string) {
    console.log("🔹 Creating DID...");
    const identity = await generateStarkNetIdentity();
    const signedData = await signWithStarkNet(username, identity.starkKey);

    return {
        id: identity.starkKey,
        starknetAddress: identity.starkAddress,
        signature: signedData,
    };
}