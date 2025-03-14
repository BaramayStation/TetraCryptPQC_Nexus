import { useState } from "react";
import { generateStarkNetIdentity, signWithStarkNet } from "@/lib/identity";

const StarkNetLogin = () => {
  const [starkKey, setStarkKey] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const handleLogin = async () => {
    const identity = await generateStarkNetIdentity();
    setStarkKey(identity.starkKey);
  };

  const signMessage = async () => {
    if (!starkKey) return;
    const signed = await signWithStarkNet("Login Message", starkKey);
    setSignature(signed);
  };

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={handleLogin} className="btn">Generate StarkNet Identity</button>
      {starkKey && <p>StarkNet Key: {starkKey}</p>}
      {starkKey && <button onClick={signMessage} className="btn">Sign Message</button>}
      {signature && <p>Signature: {signature}</p>}
    </div>
  );
};

export default StarkNetLogin;