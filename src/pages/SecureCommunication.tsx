
import React, { useState } from "react";
import { MainLayout } from "@/layout/MainLayout";
import EncryptedCommunication from "@/components/communication/EncryptedCommunication";
import P2PMessagingPanel from "@/components/chat/P2PMessagingPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassContainer } from "@/components/ui/glass-container";
import { Users, Lock } from "lucide-react";

const SecureCommunication = () => {
  const [activeTab, setActiveTab] = useState<string>("encrypted");

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Secure Communication</h1>
        
        <GlassContainer className="p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="encrypted" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>End-to-End Encrypted</span>
              </TabsTrigger>
              <TabsTrigger value="p2p" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>P2P TetraCrypt Network</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="encrypted">
              <EncryptedCommunication />
            </TabsContent>
            
            <TabsContent value="p2p">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">TetraCrypt P2P Messaging</h2>
                  <p className="text-muted-foreground mt-2">
                    Decentralized post-quantum secure communication with zero-knowledge proofs
                  </p>
                </div>
                
                <P2PMessagingPanel />
              </div>
            </TabsContent>
          </Tabs>
        </GlassContainer>
      </div>
    </MainLayout>
  );
};

export default SecureCommunication;
