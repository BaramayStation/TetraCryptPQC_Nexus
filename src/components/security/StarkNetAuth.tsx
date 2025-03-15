
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Key, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Lock,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { 
  connectToStarkNet, 
  isStarkNetAvailable, 
  signWithStarkNet, 
  generateIdentityProof 
} from "@/services/StarkNetService";
import { useToast } from "@/components/ui/use-toast";

export interface StarkNetAuthProps {
  onConnect?: (account: any) => void;
  onProofGenerated?: (proofData: any) => void;
}

const StarkNetAuth: React.FC<StarkNetAuthProps> = ({ 
  onConnect,
  onProofGenerated
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"connect" | "verify" | "advanced">("connect");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [starkNetWallet, setStarkNetWallet] = useState<{
    connected: boolean;
    provider?: string;
    address?: string;
    publicKey?: string;
  } | null>(null);
  const [walletAvailable, setWalletAvailable] = useState<boolean | null>(null);

  // Check StarkNet availability on mount
  useEffect(() => {
    checkStarkNetAvailability();
  }, []);

  // Check if StarkNet wallet is available
  const checkStarkNetAvailability = async () => {
    try {
      const isAvailable = await isStarkNetAvailable();
      setWalletAvailable(isAvailable);
    } catch (error) {
      console.error("Error checking StarkNet availability:", error);
      setWalletAvailable(false);
    }
  };

  // Connect to StarkNet wallet
  const connectStarkNetWallet = async () => {
    try {
      setIsLoading(true);
      setStatus("Connecting to StarkNet wallet...");
      setProgress(30);
      
      const result = await connectToStarkNet();
      
      if (!result.connected) {
        throw new Error(result.error || "Failed to connect to StarkNet wallet");
      }
      
      setProgress(100);
      setStatus(`Connected to ${result.provider}`);
      
      setStarkNetWallet({
        connected: true,
        provider: result.provider,
        address: result.account?.address,
        publicKey: result.account?.publicKey
      });
      
      // Notify parent component
      if (onConnect && result.account) {
        onConnect(result.account);
      }
      
      toast({
        title: "StarkNet Connected",
        description: `Connected to ${result.provider} wallet`,
      });
    } catch (error) {
      console.error("Error connecting to StarkNet:", error);
      setStatus("Error connecting to StarkNet");
      
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign message with StarkNet
  const signWithStarkNetWallet = async () => {
    try {
      if (!starkNetWallet?.connected) {
        throw new Error("Not connected to StarkNet wallet");
      }
      
      setIsLoading(true);
      setStatus("Signing with StarkNet wallet...");
      setProgress(30);
      
      const challenge = "TetraCryptPQC-" + crypto.randomUUID();
      
      const result = await signWithStarkNet(challenge);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to sign with StarkNet wallet");
      }
      
      setProgress(100);
      setStatus("Signature verified");
      
      toast({
        title: "StarkNet Signature Verified",
        description: "Successfully verified your StarkNet identity",
      });
    } catch (error) {
      console.error("Error signing with StarkNet:", error);
      setStatus("Error signing with StarkNet");
      
      toast({
        title: "Signing Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate zk-STARK identity proof
  const generateZkProof = async () => {
    try {
      if (!starkNetWallet?.connected) {
        throw new Error("Not connected to StarkNet wallet");
      }
      
      setIsLoading(true);
      setStatus("Generating zk-STARK identity proof...");
      setProgress(30);
      
      // Example claim data
      const claimData = {
        username: "user-" + crypto.randomUUID().substring(0, 8),
        timestamp: Date.now(),
        purpose: "TetraCryptPQC Authentication"
      };
      
      const result = await generateIdentityProof(claimData);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to generate zk-STARK proof");
      }
      
      setProgress(100);
      setStatus("zk-STARK proof generated");
      
      // Notify parent component
      if (onProofGenerated) {
        onProofGenerated(result.data);
      }
      
      toast({
        title: "zk-STARK Proof Generated",
        description: "Identity proof generated and verified",
      });
    } catch (error) {
      console.error("Error generating zk-STARK proof:", error);
      setStatus("Error generating proof");
      
      toast({
        title: "Proof Generation Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          StarkNet zk-STARK Authentication
        </CardTitle>
        <CardDescription>
          Secure your identity with zero-knowledge proofs on StarkNet
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="connect">
              <Key className="h-4 w-4 mr-2" />
              Connect
            </TabsTrigger>
            <TabsTrigger value="verify">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Lock className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connect" className="space-y-4 mt-4">
            <Alert className={walletAvailable ? "bg-accent/10 border-accent/20" : "bg-red-100 border-red-200"}>
              {walletAvailable ? (
                <CheckCircle className="h-4 w-4 text-accent" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
              <AlertTitle>
                {walletAvailable 
                  ? "StarkNet Wallet Available" 
                  : "StarkNet Wallet Not Detected"}
              </AlertTitle>
              <AlertDescription>
                {walletAvailable 
                  ? "A StarkNet compatible wallet (Argent X or Braavos) is available in your browser." 
                  : "Please install a StarkNet compatible wallet like Argent X or Braavos to enable zk-STARK authentication."}
              </AlertDescription>
            </Alert>
            
            {starkNetWallet?.connected ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-accent/5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Wallet Provider</h3>
                    <Badge>{starkNetWallet.provider}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <span className="text-xs font-medium">Address</span>
                      <div className="p-2 bg-muted rounded-md">
                        <code className="text-xs break-all">{starkNetWallet.address}</code>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-xs font-medium">Public Key</span>
                      <div className="p-2 bg-muted rounded-md">
                        <code className="text-xs break-all">{starkNetWallet.publicKey}</code>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={checkStarkNetAvailability}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Connection
                </Button>
              </div>
            ) : (
              <>
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{status}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={connectStarkNetWallet}
                  disabled={isLoading || walletAvailable === false}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Connect StarkNet Wallet
                </Button>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="verify" className="space-y-4 mt-4">
            {starkNetWallet?.connected ? (
              <div className="space-y-4">
                <Alert className="bg-accent/10 border-accent/20">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <AlertTitle>StarkNet Authentication</AlertTitle>
                  <AlertDescription>
                    Verify your identity using your StarkNet wallet signature.
                    This creates a cryptographic proof of ownership without revealing your private key.
                  </AlertDescription>
                </Alert>
                
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{status}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={signWithStarkNetWallet}
                  disabled={isLoading}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify StarkNet Identity
                </Button>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Not Connected</AlertTitle>
                <AlertDescription>
                  Please connect your StarkNet wallet first to verify your identity.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4 mt-4">
            {starkNetWallet?.connected ? (
              <div className="space-y-4">
                <Alert className="bg-accent/10 border-accent/20">
                  <Lock className="h-4 w-4 text-accent" />
                  <AlertTitle>zk-STARK Zero-Knowledge Proofs</AlertTitle>
                  <AlertDescription>
                    Generate a zero-knowledge proof of your identity that can be verified
                    without revealing any personal information.
                  </AlertDescription>
                </Alert>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">zk-STARK Benefits</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-baseline gap-2">
                      <ArrowRight className="h-3 w-3 flex-shrink-0 text-accent" />
                      <span>Information-theoretic security (no reliance on cryptographic assumptions)</span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <ArrowRight className="h-3 w-3 flex-shrink-0 text-accent" />
                      <span>Quantum-resistant by design (secure against quantum attacks)</span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <ArrowRight className="h-3 w-3 flex-shrink-0 text-accent" />
                      <span>Transparent setup (no trusted parties required)</span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <ArrowRight className="h-3 w-3 flex-shrink-0 text-accent" />
                      <span>Fast verification even for complex statements</span>
                    </li>
                  </ul>
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
                
                <Button 
                  className="w-full" 
                  onClick={generateZkProof}
                  disabled={isLoading}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Generate zk-STARK Proof
                </Button>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Not Connected</AlertTitle>
                <AlertDescription>
                  Please connect your StarkNet wallet first to generate zk-STARK proofs.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        <p className="text-xs text-muted-foreground">
          StarkNet's zk-STARK technology provides quantum-resistant authentication and 
          identity verification without revealing sensitive information.
        </p>
      </CardFooter>
    </Card>
  );
};

export default StarkNetAuth;
