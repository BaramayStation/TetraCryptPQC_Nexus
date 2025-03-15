
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, Lock, Key, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HardwareSecurityManager from "@/components/security/HardwareSecurityManager";
import StarkNetAuth from "@/components/security/StarkNetAuth";
import { HSMType } from "@/lib/storage-types";

const Security = () => {
  const navigate = useNavigate();
  const [hardwareDevice, setHardwareDevice] = useState<HSMType | null>(null);
  const [isStarkNetConnected, setIsStarkNetConnected] = useState(false);
  
  const handleHardwareDetected = (deviceType: HSMType) => {
    setHardwareDevice(deviceType);
  };
  
  const handleStarkNetSuccess = (starkNetId: string) => {
    setIsStarkNetConnected(true);
  };
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">Advanced Security</h1>
          </div>
        </div>
        
        <Tabs defaultValue="hardware" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="hardware" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>Hardware Security</span>
            </TabsTrigger>
            <TabsTrigger value="identity" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Identity</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hardware">
            <GlassContainer className="mb-6" animation="fade-in">
              <HardwareSecurityManager onDeviceDetected={handleHardwareDetected} />
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="identity">
            <GlassContainer className="mb-6" animation="fade-in">
              <StarkNetAuth onSuccess={handleStarkNetSuccess} />
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="advanced">
            <GlassContainer className="mb-6" animation="fade-in">
              <div className="space-y-4 p-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Server className="h-5 w-5 text-accent" />
                  Advanced Security Settings
                </h2>
                
                <div className="text-sm text-muted-foreground">
                  These advanced settings allow you to configure post-quantum cryptography parameters,
                  zero-knowledge proof settings, and distributed storage options.
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium">Quantum Key Distribution (QKD) Simulation</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Simulate quantum key distribution for information-theoretic security
                    </p>
                    <Button variant="outline" size="sm">Configure QKD</Button>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium">Zero-Knowledge Proof Settings</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Configure zk-STARK settings for proving cryptographic operations
                    </p>
                    <Button variant="outline" size="sm">Configure ZKP</Button>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium">Homomorphic Encryption</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Enable computation over encrypted data without revealing the plaintext
                    </p>
                    <Button variant="outline" size="sm">Configure FHE</Button>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;
