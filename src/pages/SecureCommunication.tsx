
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layout/MainLayout";
import EncryptedCommunication from "@/components/communication/EncryptedCommunication";
import P2PMessagingPanel from "@/components/chat/P2PMessagingPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassContainer } from "@/components/ui/glass-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Lock, 
  ShieldCheck, 
  Fingerprint,
  AlertTriangle,
  Server
} from "lucide-react";
import EnterpriseAuthentication from "@/components/security/EnterpriseAuthentication";
import { 
  initTetraCryptP2P, 
  getP2PNodeStatus,
  connectToP2PNetwork,
  registerP2PNode
} from "@/lib/tetracrypt-p2p";
import { useToast } from "@/components/ui/use-toast";

const SecureCommunication = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("encrypted");
  const [p2pStatus, setP2pStatus] = useState<{ 
    initialized: boolean; 
    connected: boolean;
    peerCount: number;
    nodeId: string;
  }>({
    initialized: false,
    connected: false,
    peerCount: 0,
    nodeId: ""
  });
  const [isConnecting, setIsConnecting] = useState(false);
  
  useEffect(() => {
    // Initialize TetraCrypt P2P on component mount
    const initP2P = async () => {
      const initialized = await initTetraCryptP2P();
      
      if (initialized) {
        const status = getP2PNodeStatus();
        setP2pStatus({
          initialized: true,
          connected: status.state === 'connected',
          peerCount: status.peerCount,
          nodeId: status.peerId
        });
      }
    };
    
    initP2P();
  }, []);
  
  const handleConnectToP2P = async () => {
    try {
      setIsConnecting(true);
      
      const connected = await connectToP2PNetwork();
      
      if (connected) {
        const nodeRegistration = await registerP2PNode();
        
        if (nodeRegistration.success) {
          const status = getP2PNodeStatus();
          setP2pStatus({
            initialized: true,
            connected: status.state === 'connected',
            peerCount: status.peerCount,
            nodeId: nodeRegistration.nodeId || status.peerId
          });
          
          toast({
            title: "Connected to P2P Network",
            description: `Node ID: ${nodeRegistration.nodeId}`,
          });
        } else {
          toast({
            title: "Connected, but Registration Failed",
            description: nodeRegistration.error,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to TetraCrypt P2P network",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error connecting to P2P network:", error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Secure Communication</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="encrypted" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>End-to-End Encrypted</span>
            </TabsTrigger>
            <TabsTrigger value="p2p" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>P2P TetraCrypt Network</span>
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Enterprise Authentication</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="encrypted">
            <GlassContainer className="p-6">
              <EncryptedCommunication />
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="p2p">
            <GlassContainer className="p-6">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">TetraCrypt P2P Messaging</h2>
                  <p className="text-muted-foreground mt-2">
                    Decentralized post-quantum secure communication with zero-knowledge proofs
                  </p>
                </div>
                
                {!p2pStatus.connected && (
                  <div className="mb-6">
                    <Alert variant="default" className="bg-accent/10 border-accent/20">
                      <Server className="h-4 w-4" />
                      <AlertTitle>P2P Network Connection Required</AlertTitle>
                      <AlertDescription className="flex flex-col gap-4">
                        <p>Connect to the TetraCrypt P2P network to enable secure quantum-resistant messaging.</p>
                        <Button 
                          onClick={handleConnectToP2P} 
                          disabled={isConnecting}
                          className="w-full sm:w-auto"
                        >
                          {isConnecting ? "Connecting..." : "Connect to P2P Network"}
                        </Button>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                {p2pStatus.connected && (
                  <div className="mb-6">
                    <Alert variant="default" className="bg-green-500/10 border-green-500/20">
                      <Server className="h-4 w-4 text-green-500" />
                      <AlertTitle>Connected to P2P Network</AlertTitle>
                      <AlertDescription>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            Connected
                          </Badge>
                          <Badge variant="outline">
                            Node ID: {p2pStatus.nodeId.substring(0, 8)}...
                          </Badge>
                          <Badge variant="outline">
                            Peers: {p2pStatus.peerCount}
                          </Badge>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                <P2PMessagingPanel />
              </div>
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="enterprise">
            <GlassContainer className="p-6">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">Enterprise Authentication</h2>
                  <p className="text-muted-foreground mt-2">
                    FIPS 205/206 compliant hardware-backed quantum-resistant authentication
                  </p>
                </div>
                
                <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/20">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertTitle>Enterprise Hardware Required</AlertTitle>
                  <AlertDescription>
                    For maximum security, use a YubiKey, TPM, or Secure Enclave compatible device.
                  </AlertDescription>
                </Alert>
                
                <EnterpriseAuthentication />
              </div>
            </GlassContainer>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SecureCommunication;
