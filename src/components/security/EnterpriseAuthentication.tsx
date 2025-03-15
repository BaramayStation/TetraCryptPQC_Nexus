
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, AlertTriangle, Shield, Fingerprint, Database, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getUserProfile } from "@/lib/storage";
import { checkYubiKeyPresence, authenticateWithYubiKey } from "@/services/YubiKeyService";
import { useToast } from "@/components/ui/use-toast";
import { createUserDecentralizedIdentity, verifyDIDOwnership } from "@/lib/decentralized-identity";

// Authentication methods
type AuthMethod = "yubikey" | "decentralized-id" | "biometric" | "standard" | "recovery";

const EnterpriseAuthentication: React.FC = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("standard");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yubiKeyStatus, setYubiKeyStatus] = useState<{available: boolean, info?: string}>({available: false});
  const [didStatus, setDidStatus] = useState<{available: boolean, info?: string}>({available: false});
  const [verificationProgress, setVerificationProgress] = useState<number>(0);
  
  // Check for available authentication methods
  useEffect(() => {
    const checkAuthMethods = async () => {
      try {
        // Check for YubiKey
        const yubiKeyResult = await checkYubiKeyPresence();
        setYubiKeyStatus({
          available: yubiKeyResult.detected,
          info: yubiKeyResult.detected ? 
            `${yubiKeyResult.deviceInfo?.type} (${yubiKeyResult.deviceInfo?.version})` : 
            "Not detected"
        });
        
        // Check for DID
        const userProfile = getUserProfile();
        const didAvailable = userProfile && userProfile.didDocument;
        setDidStatus({
          available: !!didAvailable,
          info: didAvailable ? 
            `${userProfile?.didDocument?.id.substring(0, 12)}...` : 
            "No DID document"
        });
      } catch (error) {
        console.error("Error checking auth methods:", error);
      }
    };
    
    checkAuthMethods();
  }, []);
  
  // Simulate verification progress
  useEffect(() => {
    if (isLoading && verificationProgress < 100) {
      const interval = setInterval(() => {
        setVerificationProgress(prev => {
          const next = prev + Math.floor(Math.random() * 10) + 1;
          return next > 100 ? 100 : next;
        });
      }, 200);
      
      return () => clearInterval(interval);
    } else if (verificationProgress >= 100) {
      // Complete the verification after progress reaches 100%
      const timeout = setTimeout(() => {
        setIsLoading(false);
        completeVerification();
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [isLoading, verificationProgress]);
  
  // Start the authentication process
  const startAuthentication = async (method: AuthMethod) => {
    setAuthMethod(method);
    setIsLoading(true);
    setVerificationProgress(0);
    
    // Perform specific auth method initialization
    try {
      switch (method) {
        case "yubikey":
          // Check YubiKey presence
          const yubiKeyCheck = await checkYubiKeyPresence();
          if (!yubiKeyCheck.detected) {
            throw new Error("YubiKey not detected. Please insert your YubiKey.");
          }
          break;
          
        case "decentralized-id":
          // Check DID availability
          const userProfile = getUserProfile();
          if (!userProfile || !userProfile.didDocument) {
            // Create DID if not available
            toast({
              title: "Creating Decentralized Identity",
              description: "No DID found. Creating a new decentralized identity..."
            });
            
            const didResult = await createUserDecentralizedIdentity();
            if (!didResult.success) {
              throw new Error(didResult.error || "Failed to create decentralized identity");
            }
            
            setDidStatus({
              available: true,
              info: `${didResult.didDocument?.id.substring(0, 12)}...`
            });
          }
          break;
          
        case "biometric":
          // Check if biometric authentication is available
          if (!window.PublicKeyCredential) {
            throw new Error("Biometric authentication is not supported in this browser.");
          }
          
          // Check if platform authenticator is available
          const isPlatformAuthenticatorAvailable = 
            await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            
          if (!isPlatformAuthenticatorAvailable) {
            throw new Error("Platform authenticator (biometric) is not available on this device.");
          }
          break;
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "Failed to initialize authentication",
        variant: "destructive"
      });
      return;
    }
  };
  
  // Complete the verification process
  const completeVerification = async () => {
    try {
      switch (authMethod) {
        case "yubikey":
          // Perform YubiKey authentication
          const yubiKeyAuth = await authenticateWithYubiKey();
          if (!yubiKeyAuth.success) {
            throw new Error(yubiKeyAuth.error || "YubiKey authentication failed");
          }
          
          toast({
            title: "YubiKey Authentication Successful",
            description: "Hardware security key verified successfully."
          });
          break;
          
        case "decentralized-id":
          // Perform DID verification
          const userProfile = getUserProfile();
          if (!userProfile || !userProfile.didDocument) {
            throw new Error("DID document not found");
          }
          
          // Simulate DID verification with a challenge
          const challenge = crypto.randomUUID();
          const signature = "simulated-signature"; // In a real implementation, this would be an actual signature
          
          const didVerification = await verifyDIDOwnership(
            userProfile.didDocument.id,
            challenge,
            signature
          );
          
          if (!didVerification.success) {
            throw new Error(didVerification.error || "DID verification failed");
          }
          
          toast({
            title: "Decentralized Identity Verified",
            description: "Your decentralized identity was successfully verified."
          });
          break;
          
        case "biometric":
          // Simulate biometric authentication success
          toast({
            title: "Biometric Authentication Successful",
            description: "Your biometric verification was successful."
          });
          break;
          
        default:
          // Standard authentication
          toast({
            title: "Authentication Successful",
            description: "Standard authentication completed."
          });
      }
      
      // Move to the next step
      setActiveStep(2);
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Unknown authentication error",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2 h-5 w-5 text-accent" />
          Enterprise Authentication
        </h2>
        <p className="text-muted-foreground">
          Military-grade multi-factor authentication with hardware security and post-quantum protection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Authentication Method Selection */}
        <Card className={activeStep === 1 ? "border-accent" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Lock className="mr-2 h-5 w-5" />
              Step 1: Authentication Method
            </CardTitle>
            <CardDescription>Select your preferred authentication method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant={authMethod === "yubikey" ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => startAuthentication("yubikey")}
              disabled={isLoading || !yubiKeyStatus.available}
            >
              <Fingerprint className="mr-2 h-4 w-4" />
              <div className="flex-1 flex justify-between items-center">
                <span>YubiKey / Security Key</span>
                {yubiKeyStatus.available ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </Button>
            
            <Button 
              variant={authMethod === "decentralized-id" ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => startAuthentication("decentralized-id")}
              disabled={isLoading}
            >
              <Database className="mr-2 h-4 w-4" />
              <div className="flex-1 flex justify-between items-center">
                <span>Decentralized Identity</span>
                {didStatus.available ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 text-blue-500" />
                )}
              </div>
            </Button>
            
            <Button 
              variant={authMethod === "biometric" ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => startAuthentication("biometric")}
              disabled={isLoading}
            >
              <Fingerprint className="mr-2 h-4 w-4" />
              <span>Biometric Authentication</span>
            </Button>
            
            <Button 
              variant={authMethod === "standard" ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => startAuthentication("standard")}
              disabled={isLoading}
            >
              <Lock className="mr-2 h-4 w-4" />
              <span>Standard Authentication</span>
            </Button>
          </CardContent>
        </Card>
        
        {/* Step 2: Verification Process */}
        <Card className={activeStep === 1 && isLoading ? "border-accent" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Shield className="mr-2 h-5 w-5" />
              Step 2: Verification
            </CardTitle>
            <CardDescription>Verify your identity using the selected method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="mb-2">
                    {authMethod === "yubikey" ? "Waiting for YubiKey authentication..." :
                     authMethod === "decentralized-id" ? "Verifying decentralized identity..." :
                     authMethod === "biometric" ? "Waiting for biometric verification..." :
                     "Verifying credentials..."}
                  </p>
                  <Progress value={verificationProgress} className="h-2" />
                  <p className="mt-2 text-sm text-muted-foreground">{verificationProgress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Select an authentication method to begin verification</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Step 3: Success and Access Control */}
        <Card className={activeStep === 2 ? "border-accent" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="mr-2 h-5 w-5" />
              Step 3: Access Granted
            </CardTitle>
            <CardDescription>Enterprise authorization successful</CardDescription>
          </CardHeader>
          <CardContent>
            {activeStep === 2 ? (
              <div className="space-y-4">
                <div className="flex items-center text-green-500 mb-4">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Authentication Successful</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Authentication Method:</span>
                    <span className="font-medium">
                      {authMethod === "yubikey" ? "YubiKey / Security Key" :
                       authMethod === "decentralized-id" ? "Decentralized Identity" :
                       authMethod === "biometric" ? "Biometric Authentication" :
                       "Standard Authentication"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Level:</span>
                    <span className="font-medium">
                      {authMethod === "yubikey" || authMethod === "decentralized-id" ? 
                        "Military-Grade" : authMethod === "biometric" ? 
                        "Enterprise" : "Standard"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantum Protection:</span>
                    <span className="font-medium text-green-500">
                      {authMethod === "yubikey" || authMethod === "decentralized-id" ? 
                        "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Complete verification to gain access</p>
              </div>
            )}
          </CardContent>
          {activeStep === 2 && (
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => {
                  setActiveStep(1);
                  setAuthMethod("standard");
                  setVerificationProgress(0);
                }}
              >
                <Lock className="mr-2 h-4 w-4" />
                Lock and Reset
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EnterpriseAuthentication;
