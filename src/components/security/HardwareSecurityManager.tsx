
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Key, Lock, AlertTriangle, CheckCircle, Fingerprint, RefreshCw, KeyRound } from "lucide-react";
import { HSMType } from "@/lib/storage-types";
import { getUserProfile, saveUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

const HardwareSecurityManager: React.FC = () => {
  const { toast } = useToast();
  const [selectedHSM, setSelectedHSM] = useState<HSMType>(HSMType.NONE);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [securityStrength, setSecurityStrength] = useState(0);
  const [hsmsAvailable, setHsmsAvailable] = useState(true);
  
  // Simulate hardware security module detection
  useEffect(() => {
    // In a real application, this would check for available HSMs
    setHsmsAvailable(true);
  }, []);
  
  // Connect to YubiKey
  const connectYubiKey = async () => {
    setIsConnecting(true);
    setConnectionProgress(0);
    setSelectedHSM(HSMType.YUBIKEY);
    
    try {
      // Simulate YubiKey connection process
      await simulateConnection();
      configureHSM(HSMType.YUBIKEY);
      
      toast({
        title: "YubiKey Connected",
        description: "Your YubiKey has been successfully connected and configured for post-quantum operations.",
      });
    } catch (error) {
      console.error("Error connecting to YubiKey:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to YubiKey. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Connect to TPM
  const connectTPM = async () => {
    setIsConnecting(true);
    setConnectionProgress(0);
    setSelectedHSM(HSMType.TPM);
    
    try {
      // Simulate TPM connection process
      await simulateConnection();
      configureHSM(HSMType.TPM);
      
      toast({
        title: "TPM Connected",
        description: "Your device's TPM has been successfully configured for post-quantum operations.",
      });
    } catch (error) {
      console.error("Error connecting to TPM:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to TPM. Please ensure your device has a compatible TPM.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Connect to Secure Enclave
  const connectSecureEnclave = async () => {
    setIsConnecting(true);
    setConnectionProgress(0);
    setSelectedHSM(HSMType.SECUREENCLAVE);
    
    try {
      // Simulate Secure Enclave connection process
      await simulateConnection();
      configureHSM(HSMType.SECUREENCLAVE);
      
      toast({
        title: "Secure Enclave Connected",
        description: "Your device's Secure Enclave has been successfully configured for post-quantum operations.",
      });
    } catch (error) {
      console.error("Error connecting to Secure Enclave:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Secure Enclave. Please ensure your device has a compatible Secure Enclave.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Simulate connection process with progress updates
  const simulateConnection = async () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        setConnectionProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };
  
  // Configure HSM for the user profile
  const configureHSM = (hsmType: HSMType) => {
    const userProfile = getUserProfile();
    if (!userProfile) return;
    
    if (hsmType === HSMType.YUBIKEY) {
      setSecurityStrength(90);
      userProfile.hsmInfo = {
        id: crypto.randomUUID(),
        type: "YubiKey",
        provider: "Yubico",
        securityLevel: "High",
        lastVerified: new Date().toISOString(),
        capabilities: ["Key Generation", "Digital Signatures", "Encryption", "Authentication"]
      };
    } else if (hsmType === HSMType.TPM) {
      setSecurityStrength(75);
      userProfile.hsmInfo = {
        id: crypto.randomUUID(),
        type: "TPM",
        provider: "Platform",
        securityLevel: "Medium",
        lastVerified: new Date().toISOString(),
        capabilities: ["Key Storage", "Digital Signatures", "Attestation"]
      };
    } else if (hsmType === HSMType.SECUREENCLAVE) {
      setSecurityStrength(85);
      userProfile.hsmInfo = {
        id: crypto.randomUUID(),
        type: "Secure Enclave",
        provider: "Apple",
        securityLevel: "High",
        lastVerified: new Date().toISOString(),
        capabilities: ["Key Generation", "Digital Signatures", "Biometric Authentication"]
      };
    }
    
    saveUserProfile(userProfile);
  };
  
  // Disconnect HSM
  const disconnectHSM = () => {
    setSelectedHSM(HSMType.NONE);
    setSecurityStrength(0);
    
    const userProfile = getUserProfile();
    if (userProfile) {
      userProfile.hsmInfo = undefined;
      saveUserProfile(userProfile);
    }
    
    toast({
      title: "Hardware Security Disconnected",
      description: "Your hardware security module has been disconnected.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            Hardware Security Management
          </h2>
          <p className="text-muted-foreground">
            Connect hardware security modules to enhance post-quantum cryptographic operations
          </p>
        </div>
        
        {selectedHSM !== HSMType.NONE && (
          <Button 
            variant="outline" 
            onClick={disconnectHSM}
            disabled={isConnecting}
          >
            Disconnect Hardware
          </Button>
        )}
      </div>
      
      {isConnecting ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Connecting to hardware security...</span>
                <span>{connectionProgress}%</span>
              </div>
              <Progress value={connectionProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ) : selectedHSM !== HSMType.NONE ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-accent" />
                {selectedHSM === HSMType.YUBIKEY ? "YubiKey" : 
                 selectedHSM === HSMType.TPM ? "Trusted Platform Module" : 
                 "Secure Enclave"}
              </CardTitle>
              <Badge className="bg-green-500">Connected</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Security Strength</span>
                <span>{securityStrength}%</span>
              </div>
              <Progress value={securityStrength} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Features</h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Post-Quantum Key Storage</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Digital Signatures</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Authentication</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Protection Level</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tamper Resistance</span>
                    <Badge variant="outline">High</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Side-Channel Protection</span>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Enhanced Protection Settings</h3>
                <Switch defaultChecked />
              </div>
              <p className="text-xs text-muted-foreground">
                Enable hardware-backed protection for all quantum-resistant cryptographic operations
              </p>
            </div>
          </CardContent>
        </Card>
      ) : hsmsAvailable ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-dashed hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center flex flex-col items-center justify-between h-full">
              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <KeyRound className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">YubiKey</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect a YubiKey for hardware-backed post-quantum cryptography
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Badge className="bg-blue-500">USB/NFC</Badge>
                  <Badge className="bg-blue-500">FIPS 140-2</Badge>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={connectYubiKey}
              >
                <Key className="mr-2 h-4 w-4" />
                Connect YubiKey
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-dashed hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center flex flex-col items-center justify-between h-full">
              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trusted Platform Module</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Utilize your device's built-in TPM for hardware security
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Badge className="bg-green-500">Built-in</Badge>
                  <Badge className="bg-green-500">TPM 2.0</Badge>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={connectTPM}
              >
                <Fingerprint className="mr-2 h-4 w-4" />
                Connect TPM
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-dashed hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center flex flex-col items-center justify-between h-full">
              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Enclave</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use Apple Secure Enclave for enhanced key protection
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Badge className="bg-amber-500">macOS/iOS</Badge>
                  <Badge className="bg-amber-500">T2/M1/M2</Badge>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={connectSecureEnclave}
              >
                <Shield className="mr-2 h-4 w-4" />
                Connect Secure Enclave
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Hardware Security Modules Detected</AlertTitle>
          <AlertDescription>
            We couldn't detect any compatible hardware security modules on your device. Please connect a compatible device or refresh to try again.
          </AlertDescription>
          <Button variant="outline" className="mt-2" onClick={() => setHsmsAvailable(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </Alert>
      )}
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Hardware Security Benefits</h4>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Secure storage of post-quantum private keys</li>
              <li>• Hardware-backed digital signatures resistant to extraction</li>
              <li>• Protection against side-channel attacks</li>
              <li>• Physical security for cryptographic operations</li>
              <li>• Enhanced authentication with multi-factor support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareSecurityManager;
