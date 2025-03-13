
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassContainer } from "@/components/ui/glass-container";
import { UserRound } from "lucide-react";
import KeyGenerationService from "@/components/security/KeyGenerationService";
import { UserProfile } from "@/lib/storage";

interface UserSetupProps {
  onSetupComplete: (user: UserProfile) => void;
}

const UserSetup: React.FC<UserSetupProps> = ({ onSetupComplete }) => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState<"name" | "keys">("name");
  const [isValid, setIsValid] = useState(false);

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
    <div className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {step === "name" ? (
          <GlassContainer className="mx-auto" animation="fade-in">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <UserRound className="h-8 w-8 text-accent" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Welcome</h2>
                <p className="text-muted-foreground">
                  Create your secure account to start sending encrypted messages.
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
                
                <Button
                  onClick={handleContinue}
                  className="w-full"
                  disabled={!isValid}
                  size="lg"
                >
                  Continue
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground px-6">
                This app uses post-quantum cryptography to ensure your messages remain secure, even against quantum computers.
              </p>
            </div>
          </GlassContainer>
        ) : (
          <KeyGenerationService 
            username={username.trim()} 
            onComplete={handleKeyGenerationComplete} 
          />
        )}
      </div>
    </div>
  );
};

export default UserSetup;
