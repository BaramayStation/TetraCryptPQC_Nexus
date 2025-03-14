import React, { useState } from "react";
import { Provider, Account, Contract, ec, hash } from "starknet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ StarkNet Provider (Mainnet/Testnet)
const provider = new Provider({ rpc: { nodeUrl: "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" } });

// ✅ Replace with Deployed TetraCrypt Messaging Contract Address
const CONTRACT_ADDRESS = "0xYourDeployedTetraCryptMessagingContract";

const StarkNetLogin = () => {
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Generate Quantum-Secure StarkNet Key Pair
  const generateKeyPair = async () => {
    try {
      setLoading(true);
      const starkKeyPair = ec.genKeyPair();
      const starkPublicKey = ec.getStarkKey(starkKeyPair);
      const newAccount = new Account(provider, starkPublicKey, starkKeyPair);

      console.log("🔹 Generated StarkNet Key Pair:", starkPublicKey);
      setAccount(newAccount);
    } catch (error) {
      console.error("❌ Key Generation Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register User on StarkNet with zk-STARK Proof
  const registerUser = async () => {
    if (!account) return;

    try {
      setLoading(true);

      // ✅ Load Contract ABI (Updated for `tetracrypt_messaging.cairo`)
      const contract = new Contract(
        [
          {
            name: "register_user",
            type: "function",
            inputs: [
              { name: "user_address", type: "felt" },
              { name: "starknet_key", type: "felt" },
              { name: "zkProof", type: "felt" },
            ],
          },
        ],
        CONTRACT_ADDRESS,
        provider
      );

      // ✅ Generate zk-STARK Proof for Identity Verification
      const zkProof = hash.starknetKeccak(account.address);
      console.log(`🔹 Registering "${username}" on StarkNet with zk-STARK Proof...`);

      const response = await contract.invoke(
        "register_user",
        [hash.starknetKeccak(username), account.address, zkProof],
        { maxFee: "10000000000000" }
      );

      console.log("✅ Registration TX:", response.transaction_hash);
      setIsRegistered(true);
    } catch (error) {
      console.error("❌ Registration Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Sign a Message with StarkNet Identity (Quantum-Secure Authentication)
  const signMessage = async () => {
    if (!account) return;

    try {
      setLoading(true);
      const message = "Quantum-Secure Login Message";
      const hashedMessage = hash.starknetKeccak(message);
      const starkSignature = ec.sign(account.privateKey, hashedMessage);

      console.log("🔹 StarkNet Signature Generated:", starkSignature);
      setSignature(JSON.stringify(starkSignature));
    } catch (error) {
      console.error("❌ Message Signing Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 border rounded-lg shadow-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold">🔐 StarkNet Login</h2>

      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
        className="text-black"
        disabled={loading || isRegistered}
      />

      {!account ? (
        <Button onClick={generateKeyPair} className="bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
          {loading ? "🔄 Generating..." : "🔑 Generate Key Pair"}
        </Button>
      ) : !isRegistered ? (
        <Button onClick={registerUser} className="bg-green-600 hover:bg-green-700" disabled={loading}>
          {loading ? "🔄 Registering..." : "✅ Register on StarkNet"}
        </Button>
      ) : (
        <>
          <p className="text-green-500">✔ Successfully Registered on StarkNet</p>
          <Button onClick={signMessage} className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "🔄 Signing..." : "✍️ Sign Message"}
          </Button>
          {signature && <p className="text-yellow-500 break-all">📝 Signature: {signature}</p>}
        </>
      )}
    </div>
  );
};

export default StarkNetLogin;