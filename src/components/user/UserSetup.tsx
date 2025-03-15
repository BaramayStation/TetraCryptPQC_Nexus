
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassContainer } from "@/components/ui/glass-container";
import { UserRound, Shield, ArrowRight, Info, Check, Database, Fingerprint, Lock } from "lucide-react";
import KeyGenerationService from "@/components/security/KeyGenerationService";
import { UserProfile } from "@/lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface UserSetupProps {
  onSetupComplete: (user: UserProfile) => void;
}

const UserSetup: React.FC<UserSetupProps> = ({ onSetupComplete }) => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState<"name" | "keys">("name");
  const [isValid, setIsValid] = useState(false);
  const [selectedAuthType, setSelectedAuthType] = useState<"standard" | "advanced">("standard");
  const [showInfo, setShowInfo] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setIsValid(value.trim().length >= 3);
  };

  const handleContinue = () => {
    if (isValid) {
      setStep("keys");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleContinue();
    }
  };

  const handleKeyGenerationComplete = (profile: UserProfile) => {
    onSetupComplete(profile);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/5">
      <div className="w-full max-w-md">
        {step === "name" ? (
          <GlassContainer className="mx-auto" animation="fade-in">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <UserRound className="h-8 w-8 text-accent" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Welcome to TetraCryptPQC</h2>
                <p className="text-muted-foreground">
                  Create your secure account to start sending quantum-resistant encrypted messages.
                </p>
              </div>
              
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your name"
                    value={username}
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    className="text-center"
                    autoFocus
                  />
                  {username.length > 0 && username.length < 3 && (
                    <p className="text-xs text-destructive">Name must be at least 3 characters</p>
                  )}
                </div>
                
                <Tabs defaultValue="standard" onValueChange={(v) => setSelectedAuthType(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="standard">Standard</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="standard" className="space-y-2 mt-2">
                    <div className="bg-muted/50 p-3 rounded-lg text-xs text-left">
                      <h3 className="font-medium mb-1 flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5 text-accent" />
                        Standard Security
                      </h3>
                      <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
                        <li>NIST FIPS 205/206 Quantum-Resistant Keys</li>
                        <li>ML-KEM and ML-DSA Key Pairs</li>
                        <li>E2E Encryption for All Messages</li>
                        <li>Local Key Storage</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="advanced" className="space-y-2 mt-2">
                    <div className="bg-muted/50 p-3 rounded-lg text-xs text-left">
                      <h3 className="font-medium mb-1 flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5 text-accent" />
                        Advanced Security (Coming Soon)
                      </h3>
                      <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
                        <li>Everything in Standard Security</li>
                        <li>Decentralized Identity (DID) Integration</li>
                        <li>Hardware Security Module Support</li>
                        <li>Quantum Key Distribution Readiness</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button
                  onClick={handleContinue}
                  className="w-full"
                  disabled={!isValid}
                  size="lg"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info className="h-3.5 w-3.5 mr-1" />
                  Security Information
                </Button>
                
                {showInfo && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 p-3 bg-background border rounded-lg shadow-lg text-xs text-left animate-fade-in z-10">
                    <h4 className="font-medium mb-1">Post-Quantum Cryptography</h4>
                    <p className="text-muted-foreground mb-2">
                      TetraCryptPQC uses NIST-standardized algorithms that are resistant to attacks
                      from both classical and quantum computers:
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-start gap-1">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Lock className="h-2.5 w-2.5 text-accent" />
                        </div>
                        <span className="text-muted-foreground">
                          <strong>ML-KEM</strong> (Module Lattice-based Key Encapsulation) for secure key exchange
                        </span>
                      </div>
                      <div className="flex items-start gap-1">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Fingerprint className="h-2.5 w-2.5 text-accent" />
                        </div>
                        <span className="text-muted-foreground">
                          <strong>ML-DSA</strong> (Module Lattice-based Digital Signature Algorithm) for message signatures
                        </span>
                      </div>
                      <div className="flex items-start gap-1">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Database className="h-2.5 w-2.5 text-accent" />
                        </div>
                        <span className="text-muted-foreground">
                          <strong>AES-256-GCM</strong> for symmetric encryption of messages
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlassContainer>
        ) : (
          <KeyGenerationService 
            username={username.trim()} 
            onComplete={handleKeyGenerationComplete} 
            authType={selectedAuthType}
          />
        )}
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              <span>NIST FIPS 205</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              <span>Quantum-Resistant</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center">
              <Check className="h-3 w-3 mr-1" />
              <span>Zero-Trust</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetup;
