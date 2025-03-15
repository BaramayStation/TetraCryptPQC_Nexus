
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Shield, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/lib/storage-types";
import { generateSecureMLKEMKeypair, generateSecureSLHDSAKeypair, checkHardwareSecurity } from "@/lib/tetracrypt-ffi";
import { PQCKey } from "@/lib/crypto";

export interface KeyGenerationServiceProps {
  username: string;
  onComplete: (profile: UserProfile) => void;
  authType?: "standard" | "advanced";
}

const KeyGenerationService: React.FC<KeyGenerationServiceProps> = ({
  username,
  onComplete,
  authType = "standard"
}) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hardwareSecurity, setHardwareSecurity] = useState<{
    available: boolean;
    type: string;
  }>({
    available: false,
    type: "None"
  });

  // Check for hardware security modules
  useEffect(() => {
    const checkHardware = async () => {
      try {
        const result = await checkHardwareSecurity();
        setHardwareSecurity({
          available: result.available,
          type: result.type
        });
      } catch (error) {
        console.error("Error checking hardware security:", error);
      }
    };
    
    checkHardware();
  }, []);

  const generateKeys = async () => {
    try {
      setIsGenerating(true);
      setStatus("Initializing post-quantum cryptography...");
      setProgress(10);
      
      // Generate NIST FIPS 205 ML-KEM-1024 key pair
      setStatus("Generating ML-KEM-1024 encryption key (NIST FIPS 205)...");
      setProgress(30);
      
      const pqkemKeyPair = await generateSecureMLKEMKeypair(hardwareSecurity.available);
      
      // Generate NIST FIPS 206 SLH-DSA signature key pair
      setStatus("Generating SLH-DSA signature key (NIST FIPS 206)...");
      setProgress(60);
      
      const signatureKeyPair = await generateSecureSLHDSAKeypair(hardwareSecurity.available);
      
      // Create session key for symmetric encryption
      setStatus("Finalizing secure cryptographic setup...");
      setProgress(90);
      
      const encryptionKey = crypto.randomUUID().replace(/-/g, '');
      
      // Create user profile
      const userId = crypto.randomUUID();
      const newProfile: UserProfile = {
        userId: userId,
        id: userId,
        name: username,
        username: username,
        encryptionKey: encryptionKey,
        authType: authType,
        hardwareSecurityEnabled: hardwareSecurity.available,
        hardwareType: hardwareSecurity.available ? hardwareSecurity.type as any : "None",
        keyPairs: {
          pqkem: pqkemKeyPair,
          signature: signatureKeyPair
        },
        securitySettings: {
          perfectForwardSecrecy: true,
          fipsCompliance: true,
          hybridEncryption: true,
          federatedMode: false
        },
        createdAt: new Date().toISOString()
      };
      
      // Success
      setProgress(100);
      setStatus("Key generation complete");
      
      toast({
        title: "Post-Quantum Keys Generated",
        description: `Successfully generated ML-KEM and SLH-DSA keys using ${hardwareSecurity.available ? hardwareSecurity.type : 'software'} security.`,
      });
      
      onComplete(newProfile);
    } catch (error) {
      console.error("Error generating keys:", error);
      
      toast({
        title: "Key Generation Error",
        description: error instanceof Error ? error.message : "Unknown error occurred during key generation",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{status || "Ready to generate keys"}</span>
          <span className="text-sm">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {hardwareSecurity.available && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Hardware security module detected: {hardwareSecurity.type}. 
            Your keys will be generated with hardware protection.
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        className="w-full" 
        onClick={generateKeys}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Secure Keys...
          </>
        ) : (
          <>
            <Key className="mr-2 h-4 w-4" />
            Generate Post-Quantum Keys
          </>
        )}
      </Button>
    </div>
  );
};

export default KeyGenerationService;
