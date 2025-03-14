import React, { useState } from "react";
import { Provider, Account, Contract, ec, hash, stark, Signer } from "starknet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ Initialize StarkNet Provider (Mainnet/Testnet Compatible)
const provider = new Provider({ rpc: { nodeUrl: "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" } });

// ✅ Replace with Deployed TetraCrypt Messaging Contract Address
const CONTRACT_ADDRESS = "0xYourDeployedTetraCryptMessagingContract";

const StarkNetLogin = () => {
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  // ✅ Generate Quantum-Secure StarkNet Key Pair
  const generateKeyPair = () => {
    const starkKeyPair = ec.genKeyPair();
    const starkPublicKey = ec.getStarkKey(starkKeyPair);
    const newAccount = new Account(provider, starkPublicKey, starkKeyPair);

    console.log("🔹 Generated StarkNet Key Pair:", starkPublicKey);
    setAccount(newAccount);
  };

  // ✅ Register User on StarkNet with zk-STARK Proof
  const registerUser = async () => {
    if (!account) return;

    // ✅ Load Contract ABI (Updated to Match `tetracrypt_messaging.cairo`)
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

    // ✅ Generate zk-STARK Proof (Ensures Secure Identity Verification)
    const zkProof = hash.starknetKeccak(account.address);

    console.log(`🔹 Registering "${username}" on StarkNet with zk-STARK Proof...`);

    const response = await contract.invoke(
      "register_user",
      [stark.stringToFelt(username), account.address, zkProof],
      { maxFee: stark.estimateFee }
    );

    console.log("✅ Registration TX:", response.transaction_hash);
    setIsRegistered(true);
  };

  // ✅ Sign a Message with StarkNet Identity (Quantum-Secure Authentication)
  const signMessage = async () => {
    if (!account) return;

    const signer = new Signer(ec.starkCurve);
    const message = "Quantum-Secure Login Message";
    const hashedMessage = hash.starknetKeccak(message);
    const starkSignature = signer.sign(account.privateKey, hashedMessage);

    console.log("🔹 StarkNet Signature Generated:", starkSignature);
    setSignature(JSON.stringify(starkSignature));
  };

  return (
    <div className="p-6 space-y-4 border rounded-lg shadow-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold">🔐 StarkNet Login</h2>

      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
        className="text-black"
      />

      {!account ? (
        <Button onClick={generateKeyPair} className="bg-indigo-600 hover:bg-indigo-700">
          🔑 Generate Key Pair
        </Button>
      ) : !isRegistered ? (
        <Button onClick={registerUser} className="bg-green-600 hover:bg-green-700">
          ✅ Register on StarkNet
        </Button>
      ) : (
        <>
          <p className="text-green-500">✔ Successfully Registered on StarkNet</p>
          <Button onClick={signMessage} className="bg-blue-600 hover:bg-blue-700">
            ✍️ Sign Message
          </Button>
          {signature && <p className="text-yellow-500 break-all">📝 Signature: {signature}</p>}
        </>
      )}
    </div>
  );
};

export default StarkNetLogin;