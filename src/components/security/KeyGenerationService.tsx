
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Progress } from "@/components/ui/progress";
import { Shield, Key, Lock, LockKeyhole } from "lucide-react";
import { generateKyberKeypair, generateFalconKeypair } from "@/lib/crypto";
import { UserProfile, saveUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

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

  const generateKeys = async () => {
    try {
      setIsGenerating(true);
      setStatus("Initializing key generation...");
      setProgress(5);

      // Generate Kyber keys (post-quantum key exchange)
      setStatus("Generating Kyber-1024 keys for post-quantum key exchange...");
      setProgress(20);
      const kyberKeys = await generateKyberKeypair();
      setProgress(40);

      // Generate Falcon keys (post-quantum signatures)
      setStatus("Generating Falcon-1024 keys for post-quantum signatures...");
      setProgress(60);
      const falconKeys = await generateFalconKeypair();
      setProgress(80);

      // Create and save user profile
      setStatus("Finalizing secure profile...");
      const userId = crypto.randomUUID();
      const userProfile: UserProfile = {
        id: userId,
        name: username,
        keyPairs: {
          kyber: kyberKeys,
          falcon: falconKeys,
        },
        createdAt: new Date().toISOString(),
      };

      saveUserProfile(userProfile);
      setProgress(100);
      setStatus("Key generation complete!");

      // Notify user
      toast({
        title: "Secure keys generated",
        description: "Your post-quantum secure keys have been created successfully.",
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
          <h2 className="text-2xl font-semibold">Generate Secure Keys</h2>
          <p className="text-muted-foreground">
            Creating your post-quantum cryptographic keys for secure end-to-end encrypted messaging.
          </p>
        </div>

        {isGenerating ? (
          <div className="w-full space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{status}</p>
            
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Key className={`h-5 w-5 ${progress >= 40 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs mt-2">Kyber-1024</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <LockKeyhole className={`h-5 w-5 ${progress >= 80 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs mt-2">Falcon-1024</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Lock className={`h-5 w-5 ${progress >= 100 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs mt-2">Profile</span>
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={generateKeys}
            className="w-full"
            size="lg"
          >
            Generate Keys
          </Button>
        )}
        
        <p className="text-xs text-muted-foreground px-6">
          We'll generate post-quantum secure keys for encryption and signatures. This keeps your messages secure even against quantum computers.
        </p>
      </div>
    </GlassContainer>
  );
};

export default KeyGenerationService;
