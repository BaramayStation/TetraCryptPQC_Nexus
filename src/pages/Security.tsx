
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyGenerationService from "@/components/security/KeyGenerationService";
import StarkNetAuth from "@/components/security/StarkNetAuth";
import { createUserDecentralizedIdentity } from "@/lib/decentralized-identity";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Lock, Key, Database } from "lucide-react";

const Security: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("keys");
  const [isCreatingDID, setIsCreatingDID] = useState(false);
  const [starkNetId, setStarkNetId] = useState<string | null>(null);

  const handleCreateDID = async () => {
    setIsCreatingDID(true);
    try {
      const result = await createUserDecentralizedIdentity();
      
      if (result.success) {
        toast({
          title: "Decentralized Identity Created",
          description: "Successfully created your decentralized identity",
        });
        
        // Update state to reflect successful DID creation
        if (result.didDocument?.id) {
          const didId = result.didDocument.id;
          setStarkNetId(didId);
        }
      } else {
        toast({
          title: "DID Creation Failed",
          description: result.error || "Failed to create decentralized identity",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Creating DID",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreatingDID(false);
    }
  };

  const handleStarkNetSuccess = (id: string) => {
    // Update the StarkNet ID state when authentication succeeds
    setStarkNetId(id);
    toast({
      title: "StarkNet Authentication Successful",
      description: "Your StarkNet identity has been verified",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          Post-Quantum Security Center
        </h1>
        <p className="text-muted-foreground">
          Generate quantum-resistant keys, manage your decentralized identity, and secure your account with military-grade PQC.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="keys">
            <Key className="h-4 w-4 mr-2" />
            Keys
          </TabsTrigger>
          <TabsTrigger value="identity">
            <Database className="h-4 w-4 mr-2" />
            Identity
          </TabsTrigger>
          <TabsTrigger value="auth">
            <Lock className="h-4 w-4 mr-2" />
            Authentication
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          <KeyGenerationService />
        </TabsContent>

        <TabsContent value="identity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Decentralized Identity
              </h2>
              <p className="text-sm text-muted-foreground">
                Create a blockchain-based decentralized identity (DID) to securely verify and authenticate your identity across the TetraCryptPQC ecosystem.
              </p>
              
              {starkNetId ? (
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="text-sm font-medium mb-2">Your DID</h3>
                  <p className="text-xs font-mono break-all">{starkNetId}</p>
                </div>
              ) : (
                <Button 
                  onClick={handleCreateDID} 
                  disabled={isCreatingDID}
                  className="w-full"
                >
                  {isCreatingDID ? "Creating DID..." : "Create Decentralized Identity"}
                </Button>
              )}
            </div>
            
            <StarkNetAuth />
          </div>
        </TabsContent>

        <TabsContent value="auth" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Post-Quantum Authentication
              </h2>
              <p className="text-sm text-muted-foreground">
                Secure your account with post-quantum cryptographic authentication methods that are resistant to quantum computing attacks.
              </p>
              
              <Button className="w-full">
                Setup PQ Authentication
              </Button>
            </div>
            
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Hardware Security</h2>
              <p className="text-sm text-muted-foreground">
                Connect hardware security devices like YubiKey for enhanced protection and cryptographic operations.
              </p>
              
              <Button className="w-full">
                Connect Hardware Security
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Security;
