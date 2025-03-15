
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlassContainer } from "@/components/ui/glass-container";
import { useToast } from "@/components/ui/use-toast";
import { 
  Shield, 
  Key, 
  Fingerprint, 
  Lock, 
  Check, 
  AlertTriangle,
  Server,
  RefreshCw
} from "lucide-react";
import { getUserProfile } from "@/lib/storage";
import { 
  registerWebAuthnCredential, 
  authenticateWebAuthn,
  checkHardwareSecurity
} from "@/lib/tetracrypt-ffi";
import { 
  createUserDecentralizedIdentity,
  verifyDIDOwnership 
} from "@/lib/decentralized-identity";

export interface AuthenticationStatus {
  passkey: boolean;
  hardwareSecurity: boolean;
  decentralizedIdentity: boolean;
  starkNetID: boolean;
}

const EnterpriseAuthentication: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>({
    passkey: false,
    hardwareSecurity: false,
    decentralizedIdentity: false,
    starkNetID: false
  });
  const [hardwareInfo, setHardwareInfo] = useState<{
    available: boolean;
    type: string;
    features: string[];
  } | null>(null);
  const [credentials, setCredentials] = useState<{
    credentialId?: string;
  }>({});
  
  const checkHardwareAvailability = async () => {
    try {
      setIsLoading(true);
      setStatus("Checking hardware security capabilities...");
      setProgress(20);
      
      const hardware = await checkHardwareSecurity();
      setHardwareInfo(hardware);
      
      setAuthStatus(prev => ({
        ...prev,
        hardwareSecurity: hardware.available
      }));
      
      setProgress(100);
      setStatus(hardware.available 
        ? `Detected hardware security: ${hardware.type}` 
        : "No hardware security detected");
      
      toast({
        title: hardware.available ? "Hardware Security Available" : "Hardware Security Not Detected",
        description: hardware.available 
          ? `Found ${hardware.type} with ${hardware.features.join(", ")}` 
          : "Using software-based security as fallback",
      });
    } catch (error) {
      console.error("Error checking hardware:", error);
      toast({
        title: "Hardware Detection Failed",
        description: "Could not detect hardware security capabilities",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const setupPasskey = async () => {
    try {
      setIsLoading(true);
      setStatus("Setting up WebAuthn passkey...");
      setProgress(20);
      
      const profile = getUserProfile();
      if (!profile) {
        throw new Error("User profile not found");
      }
      
      setProgress(40);
      const result = await registerWebAuthnCredential(profile.name || "TetraCrypt User");
      
      if (!result.success) {
        throw new Error(result.error || "Failed to set up passkey");
      }
      
      setCredentials({
        credentialId: result.credentialId
      });
      
      setAuthStatus(prev => ({
        ...prev,
        passkey: true
      }));
      
      setProgress(100);
      setStatus("Passkey successfully registered");
      
      toast({
        title: "Passkey Setup Complete",
        description: "Your quantum-resistant authentication is now active",
      });
    } catch (error) {
      console.error("Error setting up passkey:", error);
      toast({
        title: "Passkey Setup Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const authenticateWithPasskey = async () => {
    try {
      if (!credentials.credentialId) {
        throw new Error("No credential found");
      }
      
      setIsLoading(true);
      setStatus("Authenticating with passkey...");
      setProgress(30);
      
      const result = await authenticateWebAuthn(credentials.credentialId);
      
      if (!result.success) {
        throw new Error(result.error || "Authentication failed");
      }
      
      setProgress(100);
      setStatus("Authentication successful");
      
      toast({
        title: "Authentication Successful",
        description: "Passkey verification complete",
      });
    } catch (error) {
      console.error("Error authenticating:", error);
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const setupDecentralizedIdentity = async () => {
    try {
      setIsLoading(true);
      setStatus("Setting up decentralized identity...");
      setProgress(20);
      
      const result = await createUserDecentralizedIdentity();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to create decentralized identity");
      }
      
      setProgress(80);
      
      setAuthStatus(prev => ({
        ...prev,
        decentralizedIdentity: true,
        starkNetID: !!result.starkNetId
      }));
      
      setProgress(100);
      setStatus("Decentralized identity created successfully");
      
      toast({
        title: "DID Creation Successful",
        description: "Your decentralized identity has been established",
      });
    } catch (error) {
      console.error("Error creating DID:", error);
      toast({
        title: "DID Creation Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyDID = async () => {
    try {
      setIsLoading(true);
      setStatus("Verifying decentralized identity...");
      setProgress(30);
      
      const profile = getUserProfile();
      if (!profile || !profile.didDocument) {
        throw new Error("No DID document found");
      }
      
      // Generate random challenge
      const challenge = crypto.randomUUID();
      
      const result = await verifyDIDOwnership(profile.didDocument, challenge);
      
      if (!result.success) {
        throw new Error(result.error || "DID verification failed");
      }
      
      setProgress(100);
      setStatus("DID verification successful");
      
      toast({
        title: "DID Verification Successful",
        description: "Your decentralized identity has been verified",
      });
    } catch (error) {
      console.error("Error verifying DID:", error);
      toast({
        title: "DID Verification Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <GlassContainer className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-semibold">Enterprise Authentication</h2>
        </div>
        
        <Alert className="bg-accent/10 border-accent/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Post-Quantum Authentication</AlertTitle>
          <AlertDescription>
            TetraCryptPQC supports WebAuthn/Passkeys and hardware security modules for quantum-resistant authentication.
          </AlertDescription>
        </Alert>
        
        {/* Authentication Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Authentication Status</CardTitle>
            <CardDescription>
              Enterprise security compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <span>WebAuthn/Passkey:</span>
                {authStatus.passkey ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive">Not Setup</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4" />
                <span>Hardware Security:</span>
                {authStatus.hardwareSecurity ? (
                  <Badge className="bg-green-500">Available</Badge>
                ) : (
                  <Badge variant="outline" className="text-yellow-500">Not Detected</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Decentralized ID:</span>
                {authStatus.decentralizedIdentity ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive">Not Setup</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span>StarkNet ID:</span>
                {authStatus.starkNetID ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive">Not Setup</Badge>
                )}
              </div>
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{status}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={checkHardwareAvailability} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Check Hardware
            </Button>
            
            <Button 
              variant={authStatus.passkey ? "outline" : "default"} 
              onClick={authStatus.passkey ? authenticateWithPasskey : setupPasskey}
              disabled={isLoading}
            >
              <Key className="h-4 w-4 mr-2" />
              {authStatus.passkey ? "Verify Passkey" : "Setup Passkey"}
            </Button>
            
            <Button 
              variant={authStatus.decentralizedIdentity ? "outline" : "default"} 
              onClick={authStatus.decentralizedIdentity ? verifyDID : setupDecentralizedIdentity}
              disabled={isLoading}
            >
              <Lock className="h-4 w-4 mr-2" />
              {authStatus.decentralizedIdentity ? "Verify DID" : "Setup DID"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Hardware Security Module Details */}
        {hardwareInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hardware Security Details</CardTitle>
              <CardDescription>
                Detected hardware security capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Type</h3>
                  <Badge variant="outline" className="w-full justify-center">
                    {hardwareInfo.type}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Status</h3>
                  <Badge 
                    className={hardwareInfo.available ? "bg-green-500 w-full justify-center" : "bg-red-500 w-full justify-center"}
                  >
                    {hardwareInfo.available ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Supported Features</h3>
                <ul className="space-y-1">
                  {hardwareInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Decentralized Identity Information */}
        {authStatus.decentralizedIdentity && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Decentralized Identity</CardTitle>
              <CardDescription>
                Your Web3 identity credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">DID Protocol</h3>
                  <div className="p-2 bg-muted rounded-md">
                    <code className="text-xs">did:tetracrypt:{getUserProfile()?.didDocument?.id?.split(':').pop() || ''}</code>
                  </div>
                </div>
                
                {authStatus.starkNetID && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">StarkNet ID</h3>
                    <div className="p-2 bg-muted rounded-md">
                      <code className="text-xs">{getUserProfile()?.starkNetId?.id || ''}</code>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Authentication Methods</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">SLH-DSA-Dilithium5</Badge>
                    <Badge variant="outline">ML-KEM-1024</Badge>
                    {authStatus.passkey && (
                      <Badge variant="outline">WebAuthn</Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Compliance Status</h3>
                  <Badge className="bg-green-500">FIPS 205/206 Compliant</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </GlassContainer>
  );
};

export default EnterpriseAuthentication;
