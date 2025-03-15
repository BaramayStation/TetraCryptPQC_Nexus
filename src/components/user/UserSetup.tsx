
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, User, AlertTriangle, Lock, Key } from "lucide-react";
import { generateMLKEMKeypair, generateSLHDSAKeypair } from "@/lib/pqcrypto";
import { UserProfile } from "@/lib/storage-types";
import { saveUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

// Advanced user setup component properties
interface AdvancedSetupProps {
  onComplete: (profile: UserProfile) => void;
  authType: 'standard' | 'advanced';
}

// Main user setup component properties
interface UserSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const AdvancedSetup: React.FC<AdvancedSetupProps> = ({ onComplete, authType }) => {
  const { toast } = useToast();
  const [setupStep, setSetupStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // User profile state
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    displayName: "",
    username: "",
    securityLevel: "standard",
  });
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle security level change
  const handleSecurityLevelChange = (value: "standard" | "advanced" | "quantum") => {
    setProfile({
      ...profile,
      securityLevel: value,
    });
  };
  
  // Generate cryptographic keys
  const generateKeys = async () => {
    setIsGenerating(true);
    try {
      // Generate key pairs
      const kemPair = await generateMLKEMKeypair();
      const sigPair = await generateSLHDSAKeypair();
      
      // Update profile with keys
      setProfile(prev => ({
        ...prev,
        keyPairs: {
          pqkem: kemPair,
          signature: sigPair,
        },
        publicKey: kemPair.publicKey,
        signatureKey: sigPair.publicKey,
      }));
      
      // Update progress
      setProgress(75);
      setSetupStep(3);
      
      toast({
        title: "Keys Generated",
        description: "Post-quantum cryptographic keys have been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating keys:", error);
      toast({
        title: "Key Generation Failed",
        description: "There was an error generating cryptographic keys. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Complete setup
  const completeSetup = () => {
    // Create user profile
    const userId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    const userProfile: UserProfile = {
      id: userId,
      userId: userId,
      displayName: profile.displayName || "Anonymous User",
      name: profile.username || profile.displayName,
      username: profile.username,
      publicKey: profile.publicKey,
      privateKey: profile.keyPairs?.pqkem.privateKey,
      keyPairs: profile.keyPairs,
      signatureKey: profile.signatureKey,
      created: timestamp,
      updated: timestamp,
      securityLevel: profile.securityLevel || "standard",
    };
    
    // Save user profile
    saveUserProfile(userProfile);
    
    // Complete setup
    onComplete(userProfile);
    
    toast({
      title: "Setup Complete",
      description: "Your secure TetraCryptPQC account has been created successfully.",
    });
  };
  
  // Render different steps
  const renderStepContent = () => {
    switch (setupStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Enter your display name"
                value={profile.displayName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={profile.username}
                onChange={handleInputChange}
              />
            </div>
            
            <Button 
              onClick={() => {
                setSetupStep(2);
                setProgress(50);
              }}
              disabled={!profile.displayName || !profile.username}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Security Level</Label>
              <RadioGroup 
                value={profile.securityLevel} 
                onValueChange={(value: "standard" | "advanced" | "quantum") => handleSecurityLevelChange(value)}
                className="grid gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="font-normal cursor-pointer">
                    Standard (ML-KEM-768)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="font-normal cursor-pointer">
                    Advanced (ML-KEM-1024)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quantum" id="quantum" />
                  <Label htmlFor="quantum" className="font-normal cursor-pointer">
                    Quantum (ML-KEM-1024 + Hybrid)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Alert className="bg-accent/10 border-accent/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Security Level Information</AlertTitle>
              <AlertDescription className="text-xs">
                Higher security levels provide stronger protection but may require more computational resources.
              </AlertDescription>
            </Alert>
            
            <Button
              onClick={generateKeys}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>Generating Keys...</>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Generate Post-Quantum Keys
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSetupStep(1);
                setProgress(25);
              }}
              disabled={isGenerating}
              className="w-full"
            >
              Back
            </Button>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <Alert className="bg-green-500/10 border-green-500/20">
              <Shield className="h-4 w-4 text-green-500" />
              <AlertTitle>Keys Generated Successfully</AlertTitle>
              <AlertDescription className="text-xs">
                Your post-quantum cryptographic keys have been generated and are ready for use.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label>Key Information</Label>
              <div className="grid grid-cols-2 gap-2 text-sm bg-muted p-3 rounded-md">
                <span className="text-muted-foreground">ML-KEM:</span>
                <span>{profile.keyPairs?.pqkem.algorithm}</span>
                <span className="text-muted-foreground">SLH-DSA:</span>
                <span>{profile.keyPairs?.signature.algorithm}</span>
                <span className="text-muted-foreground">Security:</span>
                <span>{profile.keyPairs?.pqkem.strength}</span>
              </div>
            </div>
            
            <Button
              onClick={completeSetup}
              className="w-full"
            >
              <Lock className="mr-2 h-4 w-4" />
              Complete Secure Setup
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setSetupStep(2);
                setProgress(50);
              }}
              className="w-full"
            >
              Back
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          {authType === 'advanced' ? 'Advanced Security Setup' : 'Secure User Setup'}
        </CardTitle>
        <CardDescription>
          Configure your account with post-quantum cryptographic protection
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Setup Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};

const UserSetup: React.FC<UserSetupProps> = ({ onComplete }) => {
  const [authType, setAuthType] = useState<'standard' | 'advanced'>('standard');
  
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          TetraCryptPQC Setup
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mt-2">
          Set up your quantum-resistant identity with NIST FIPS 205/206 compliant cryptographic protection
        </p>
      </div>
      
      <AdvancedSetup onComplete={onComplete} authType={authType} />
    </div>
  );
};

export default UserSetup;
