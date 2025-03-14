import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Progress } from "@/components/ui/progress";
import { Shield, Key, Lock, LockKeyhole, Database, Fingerprint } from "lucide-react";
import { 
  generateMLKEMKeypair, 
  generateSLHDSAKeypair, 
  generateFalconKeypair,
  generateDilithiumKeypair,
  generateDID,
  simulateQKD,
  simulateHSM
} from "@/lib/crypto";
import { UserProfile, saveUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface KeyGenerationServiceProps {
  username: string;
  onComplete: (profile: UserProfile) => void;
}

const KeyGenerationService: React.FC<KeyGenerationServiceProps> = ({
  username,
  onComplete,
}) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("idle");
  const [isGenerating, setIsGenerating] = useState(false);
  const [enableWeb3, setEnableWeb3] = useState(false);
  const [enableQKD, setEnableQKD] = useState(false);
  const [enableHSM, setEnableHSM] = useState(false);
  const [selectedSignatureAlgo, setSelectedSignatureAlgo] = useState<"slh-dsa" | "falcon" | "dilithium">("slh-dsa");

  const generateKeys = async () => {
    try {
      setIsGenerating(true);
      setStatus("Initializing Secure Post-Quantum Key Generation...");
      setProgress(10);

      // ✅ Step 1: Generate ML-KEM-1024 (Post-Quantum Key Exchange)
      setStatus("Generating ML-KEM-1024 keys (NIST FIPS 205)...");
      const mlkemKeys = await generateMLKEMKeypair();
      setProgress(30);

      // ✅ Step 2: Generate Digital Signature Keypair
      let signatureKeys;
      if (selectedSignatureAlgo === "slh-dsa") {
        setStatus("Generating SLH-DSA (NIST FIPS 205)...");
        signatureKeys = await generateSLHDSAKeypair();
      } else if (selectedSignatureAlgo === "falcon") {
        setStatus("Generating Falcon-512 (Lattice-Based)...");
        signatureKeys = await generateFalconKeypair();
      } else {
        setStatus("Generating Dilithium-5 (Lattice-Based)...");
        signatureKeys = await generateDilithiumKeypair();
      }
      setProgress(50);

      // ✅ Step 3: Decentralized Identity (DID) Integration
      let didDocument = null;
      if (enableWeb3) {
        setStatus("Generating Web3 Decentralized Identity (DID)...");
        didDocument = await generateDID(mlkemKeys.publicKey, signatureKeys.publicKey);
      }
      setProgress(60);

      // ✅ Step 4: Quantum Key Distribution (QKD) Simulation
      let qkdInfo = null;
      if (enableQKD) {
        setStatus("Simulating Quantum Key Distribution (QKD)...");
        qkdInfo = await simulateQKD("server");
      }
      setProgress(75);

      // ✅ Step 5: Hardware Security Module (HSM) Simulation
      let hsmInfo = null;
      if (enableHSM) {
        setStatus("Simulating HSM for Secure Key Storage...");
        hsmInfo = await simulateHSM(mlkemKeys.privateKey);
      }
      setProgress(90);

      // ✅ Step 6: Save Profile Securely
      setStatus("Finalizing Secure Key Storage...");
      const userId = crypto.randomUUID();
      const userProfile: UserProfile = {
        id: userId,
        name: username,
        keyPairs: {
          pqkem: mlkemKeys, 
          signature: signatureKeys, 
        },
        didDocument,
        qkdInfo,
        hsmInfo,
        createdAt: new Date().toISOString(),
      };

      saveUserProfile(userProfile);
      setProgress(100);
      setStatus("TetraCryptPQC Key Generation Complete!");

      toast({
        title: "Secure Keys Generated!",
        description: "Your quantum-resistant cryptographic keys have been created successfully.",
      });

      setTimeout(() => {
        onComplete(userProfile);
      }, 1000);
    } catch (error) {
      console.error("Key generation failed:", error);
      setStatus("Key generation failed. Please try again.");
      toast({
        title: "Key Generation Failed",
        description: "There was an error generating your secure keys. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <GlassContainer className="max-w-md mx-auto">
      <div className="flex flex-col items-center text-center space-y-6">
        <Shield className="h-8 w-8 text-accent" />
        <h2 className="text-2xl font-semibold">TetraCryptPQC Key Generation</h2>
        <p className="text-muted-foreground">
          Generate your NIST-compliant post-quantum cryptographic keys.
        </p>

        {isGenerating ? (
          <div className="w-full space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>
        ) : (
          <Button onClick={generateKeys} className="w-full" size="lg">
            Generate Secure Keys
          </Button>
        )}
      </div>
    </GlassContainer>
  );
};

export default KeyGenerationService;
