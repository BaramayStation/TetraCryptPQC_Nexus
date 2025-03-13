
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
  const [enableAdvancedPQC, setEnableAdvancedPQC] = useState(false);
  const [enableQKD, setEnableQKD] = useState(false);
  const [enableHSM, setEnableHSM] = useState(false);
  const [selectedSignatureAlgo, setSelectedSignatureAlgo] = useState<"slh-dsa" | "falcon" | "dilithium">("slh-dsa");

  const generateKeys = async () => {
    try {
      setIsGenerating(true);
      setStatus("Initializing TetraCryptPQC key generation...");
      setProgress(5);

      // Generate ML-KEM keys (post-quantum key exchange, NIST FIPS 205)
      setStatus("Generating ML-KEM-1024 keys for post-quantum key exchange (NIST FIPS 205)...");
      setProgress(15);
      const mlkemKeys = await generateMLKEMKeypair();
      setProgress(25);

      // Generate signature keys based on selected algorithm
      let signatureKeys;
      if (selectedSignatureAlgo === "slh-dsa") {
        setStatus("Generating SLH-DSA keys for post-quantum signatures (NIST FIPS 205)...");
        signatureKeys = await generateSLHDSAKeypair();
      } else if (selectedSignatureAlgo === "falcon") {
        setStatus("Generating Falcon-512 keys for post-quantum signatures...");
        signatureKeys = await generateFalconKeypair();
      } else {
        setStatus("Generating Dilithium-5 keys for post-quantum signatures...");
        signatureKeys = await generateDilithiumKeypair();
      }
      setProgress(35);

      // Additional security features based on user selection
      let didDocument = null;
      let qkdInfo = null;
      let hsmInfo = null;
      
      // Web3 DID Integration
      if (enableWeb3) {
        setStatus("Generating Web3 Decentralized Identity (DID)...");
        didDocument = await generateDID(mlkemKeys.publicKey, signatureKeys.publicKey);
        setProgress(50);
      } else {
        setProgress(50);
      }
      
      // Quantum Key Distribution Simulation
      if (enableQKD) {
        setStatus("Simulating Quantum Key Distribution (QKD)...");
        qkdInfo = await simulateQKD("server");
        setProgress(65);
      } else {
        setProgress(65);
      }
      
      // Hardware Security Module Simulation
      if (enableHSM) {
        setStatus("Securing keys with Hardware Security Module (HSM)...");
        hsmInfo = await simulateHSM(mlkemKeys.privateKey);
        setProgress(80);
      } else {
        setProgress(80);
      }

      // Create and save user profile
      setStatus("Finalizing secure TetraCryptPQC profile...");
      const userId = crypto.randomUUID();
      const userProfile: UserProfile = {
        id: userId,
        name: username,
        keyPairs: {
          kyber: mlkemKeys, // For compatibility, we still use the original field names
          falcon: signatureKeys, // For compatibility, we still use the original field names
        },
        createdAt: new Date().toISOString(),
      };

      // Add advanced features to user profile if enabled
      if (enableWeb3 && didDocument) {
        (userProfile as any).didDocument = didDocument;
      }
      
      if (enableQKD && qkdInfo) {
        (userProfile as any).qkdInfo = qkdInfo;
      }
      
      if (enableHSM && hsmInfo) {
        (userProfile as any).hsmInfo = hsmInfo;
      }

      saveUserProfile(userProfile);
      setProgress(100);
      setStatus("TetraCryptPQC key generation complete!");

      // Notify user
      toast({
        title: "TetraCryptPQC keys generated",
        description: `Your NIST-compliant post-quantum secure keys have been created successfully${enableWeb3 ? " with Web3 DID integration" : ""}.`,
      });

      // Complete process
      setTimeout(() => {
        onComplete(userProfile);
      }, 1000);
    } catch (error) {
      console.error("Key generation failed:", error);
      setStatus("Key generation failed. Please try again.");
      toast({
        title: "Key generation failed",
        description: "There was an error generating your secure keys. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <GlassContainer className="max-w-md mx-auto" animation="slide-up">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <Shield className="h-8 w-8 text-accent" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">TetraCryptPQC</h2>
          <p className="text-muted-foreground">
            Creating your NIST-compliant post-quantum cryptographic keys with advanced security features.
          </p>
        </div>

        {isGenerating ? (
          <div className="w-full space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{status}</p>
            
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Key className={`h-5 w-5 ${progress >= 25 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs mt-2">ML-KEM-1024</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <LockKeyhole className={`h-5 w-5 ${progress >= 35 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs mt-2">{selectedSignatureAlgo.toUpperCase()}</span>
              </div>
              
              {enableWeb3 && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Database className={`h-5 w-5 ${progress >= 50 ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <span className="text-xs mt-2">Web3 DID</span>
                </div>
              )}
              
              {enableHSM && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Fingerprint className={`h-5 w-5 ${progress >= 80 ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <span className="text-xs mt-2">HSM</span>
                </div>
              )}
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Lock className={`h-5 w-5 ${progress >= 100 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs mt-2">Profile</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    The basic configuration includes:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>ML-KEM-1024 for key exchange (NIST FIPS 205)</li>
                    <li>SLH-DSA for digital signatures (NIST FIPS 205)</li>
                    <li>AES-256-GCM for message encryption (NIST FIPS 197)</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="web3-did">Web3 Decentralized Identity</Label>
                      <p className="text-xs text-muted-foreground">Generate a W3C DID with zk-SNARKs</p>
                    </div>
                    <Switch 
                      id="web3-did" 
                      checked={enableWeb3} 
                      onCheckedChange={setEnableWeb3} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="qkd">Quantum Key Distribution</Label>
                      <p className="text-xs text-muted-foreground">Simulate QKD for ultra-secure key exchange</p>
                    </div>
                    <Switch 
                      id="qkd" 
                      checked={enableQKD} 
                      onCheckedChange={setEnableQKD} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hsm">Hardware Security Module</Label>
                      <p className="text-xs text-muted-foreground">Simulate HSM for key protection</p>
                    </div>
                    <Switch 
                      id="hsm" 
                      checked={enableHSM} 
                      onCheckedChange={setEnableHSM} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Signature Algorithm</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={selectedSignatureAlgo === "slh-dsa" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedSignatureAlgo("slh-dsa")}
                      >
                        SLH-DSA
                      </Button>
                      <Button 
                        variant={selectedSignatureAlgo === "falcon" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedSignatureAlgo("falcon")}
                      >
                        Falcon
                      </Button>
                      <Button 
                        variant={selectedSignatureAlgo === "dilithium" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedSignatureAlgo("dilithium")}
                      >
                        Dilithium
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <Button
              onClick={generateKeys}
              className="w-full"
              size="lg"
            >
              Generate TetraCryptPQC Keys
            </Button>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground px-6">
          TetraCryptPQC uses NIST FIPS 205/206-compliant post-quantum cryptography to protect against quantum computing threats, with optional Web3 integration for decentralized identity verification.
        </p>
      </div>
    </GlassContainer>
  );
};

export default KeyGenerationService;
