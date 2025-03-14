import React, { useState } from "react";
import { Provider, Account, Contract, ec, hash, stark } from "starknet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });

// Replace with your StarkNet contract address
const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";

const StarkNetLogin = () => {
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  // ✅ Generate StarkNet Key Pair
  const generateKeyPair = () => {
    const starkKeyPair = ec.genKeyPair();
    const starkPublicKey = ec.getStarkKey(starkKeyPair);
    setAccount(new Account(provider, starkPublicKey, starkKeyPair));
  };

  // ✅ Register User on StarkNet
  const registerUser = async () => {
    if (!account) return;

    const contract = new Contract(
      [
        {
          name: "registerUser",
          type: "function",
          inputs: [{ name: "username", type: "felt" }],
        },
      ],
      CONTRACT_ADDRESS,
      provider
    );

    console.log(`🔹 Registering user "${username}" on StarkNet...`);

    const response = await contract.invoke("registerUser", [stark.stringToFelt(username)], {
      maxFee: stark.estimateFee,
    });

    console.log("✅ Registration TX:", response.transaction_hash);
    setIsRegistered(true);
  };

  // ✅ Sign a Login Message with StarkNet Key
  const signMessage = async () => {
    if (!account) return;
    
    const message = "Login Message";
    const hashedMessage = hash.computePedersenHash(message);
    const signature = ec.sign(account.privateKey, hashedMessage);
    setSignature(JSON.stringify(signature));
  };

  return (
    <div className="p-6 space-y-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">StarkNet Login</h2>

      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />

      {!account ? (
        <Button onClick={generateKeyPair}>Generate Key Pair</Button>
      ) : !isRegistered ? (
        <Button onClick={registerUser} className="bg-green-600">Register on StarkNet</Button>
      ) : (
        <>
          <p className="text-green-500">✅ Registered Successfully!</p>
          <Button onClick={signMessage} className="bg-blue-600">Sign Message</Button>
          {signature && <p>Signature: {signature}</p>}
        </>
      )}
    </div>
  );
};

export default StarkNetLogin;