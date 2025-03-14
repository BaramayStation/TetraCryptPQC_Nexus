
import React, { useState } from "react";
import { generateMLKEMKeypair, generateBIKEKeypair } from "@/lib/crypto";
import { Button } from "@/components/ui/button";

const PQCKeyGen = () => {
  const [keys, setKeys] = useState({ mlkem: null, bike: null });
  const [loading, setLoading] = useState(false);

  const generateKeys = async () => {
    setLoading(true);
    try {
      const mlkemKeys = await generateMLKEMKeypair();
      const bikeKeys = await generateBIKEKeypair();
      setKeys({ mlkem: mlkemKeys, bike: bikeKeys });
    } catch (error) {
      console.error("Error generating keys:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Post-Quantum Cryptography Key Generator</h2>
      <Button onClick={generateKeys} disabled={loading}>
        {loading ? "Generating..." : "Generate PQC Keys"}
      </Button>
      {keys.mlkem && (
        <div className="mt-4">
          <h3 className="font-medium">ML-KEM Keys (NIST Standard)</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto">
            {JSON.stringify(keys.mlkem, null, 2)}
          </pre>
        </div>
      )}
      {keys.bike && (
        <div className="mt-4">
          <h3 className="font-medium">BIKE Keys (NIST Alternate)</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto">
            {JSON.stringify(keys.bike, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PQCKeyGen;
