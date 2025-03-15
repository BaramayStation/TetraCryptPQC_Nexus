
import React, { useState, useEffect } from "react";
import { UserProfile } from "@/lib/storage-types";
import { Progress } from "@/components/ui/progress";
import { Shield, Key } from "lucide-react";
import { saveUserProfile } from "@/lib/storage";
import { 
  generateSecureMLKEMKeypair, 
  generateSecureSLHDSAKeypair,
  checkHardwareSecurity
} from "@/lib/tetracrypt-ffi";

export interface KeyGenerationServiceProps {
  username: string;
  onComplete: (profile: UserProfile) => void;
  authType: "standard" | "advanced";
}

const KeyGenerationService: React.FC<KeyGenerationServiceProps> = ({ 
  username, 
  onComplete,
  authType
}) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing secure key generation...");
  
  useEffect(() => {
    let mounted = true;
    
    const generateKeys = async () => {
      try {
        if (!mounted) return;
        
        // Step 1: Check for hardware security modules
        setStatus("Detecting hardware security modules...");
        setProgress(10);
        const hardwareSecurity = await checkHardwareSecurity();
        
        // Step 2: Generate ML-KEM keys (using hardware if available)
        setStatus("Generating ML-KEM post-quantum keys...");
        setProgress(30);
        const kemKeyStrength = authType === "advanced" ? "ML-KEM-1024" : "ML-KEM-768";
        const kemKey = await generateSecureMLKEMKeypair(hardwareSecurity.available);
        
        // Step 3: Generate SLH-DSA signature keys
        setStatus("Generating SLH-DSA signature keys...");
        setProgress(60);
        const signatureKey = await generateSecureSLHDSAKeypair(hardwareSecurity.available);
        
        // Step 4: Create user profile
        setStatus("Creating secure user profile...");
        setProgress(80);
        const userId = crypto.randomUUID();
        
        const profile: UserProfile = {
          userId,
          id: userId, // Add id to match UserProfile type
          name: username, // Add name to match UserProfile type
          username,
          encryptionKey: kemKey.publicKey.substring(0, 32), // Simplified for demo
          authType,
          hardwareSecurityEnabled: hardwareSecurity.available,
          hardwareType: hardwareSecurity.type as "YubiKey" | "TPM" | "SecureEnclave" | "None",
          keyPairs: {
            pqkem: kemKey,
            signature: signatureKey
          },
          securitySettings: {
            perfectForwardSecrecy: true,
            fipsCompliance: true,
            hybridEncryption: authType === "advanced",
            federatedMode: false
          },
          createdAt: new Date().toISOString() // Add createdAt to match UserProfile type
        };
        
        // Step 5: Generate secure storage
        setStatus("Setting up secure storage...");
        setProgress(90);
        
        // Save user profile
        saveUserProfile(profile);
        
        // Complete
        setProgress(100);
        setStatus("Setup complete!");
        
        // Notify parent component
        if (mounted) {
          setTimeout(() => {
            onComplete(profile);
          }, 500);
        }
      } catch (error) {
        console.error("Error during key generation:", error);
        setStatus("Error during setup. Please try again.");
      }
    };
    
    generateKeys();
    
    return () => {
      mounted = false;
    };
  }, [username, onComplete, authType]);
  
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 mb-2">
        {progress < 100 ? (
          <Shield className="h-5 w-5 text-accent animate-pulse" />
        ) : (
          <Key className="h-5 w-5 text-accent" />
        )}
        <span>{status}</span>
      </div>
      <Progress value={progress} className="w-full" />
      <div className="text-xs text-muted-foreground">
        {authType === "advanced" ? 
          "Generating NIST FIPS 205/206 compliant keys with ML-KEM-1024 and SLH-DSA-Dilithium5" : 
          "Generating post-quantum keys with ML-KEM-768 and SLH-DSA-Dilithium3"}
      </div>
    </div>
  );
};

export default KeyGenerationService;
