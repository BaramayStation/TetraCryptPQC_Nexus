import React, { useState } from "react";
import { generateKyberKeypair, generateDilithiumKeypair } from "@/lib/crypto";
import { Button } from "@/components/ui/button";

const PQCKeyGen = () => {
  const [keys, setKeys] = useState({ kyber: null, dilithium: null });

  const generateKeys = async () => {
    const kyberKeys = await generateKyberKeypair();
    const dilithiumKeys = await generateDilithiumKeypair();
    setKeys({ kyber: kyberKeys, dilithium: dilithiumKeys });
  };

  return (
    <div>
      <Button onClick={generateKeys}>Generate PQC Keys</Button>
      <pre>{JSON.stringify(keys, null, 2)}</pre>
    </div>
  );
};

export default PQCKeyGen;