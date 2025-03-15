
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyGenerationPanel from "@/components/keymanagement/KeyGenerationPanel";
import KeyInventoryPanel from "@/components/keymanagement/KeyInventoryPanel";
import KeyRotationPanel from "@/components/keymanagement/KeyRotationPanel";
import { Shield } from "lucide-react";

const KeyManagement = () => {
  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              FIPS 205/206 Key Management
            </h1>
            <p className="text-muted-foreground">
              Generate and manage NIST-approved post-quantum cryptographic keys
            </p>
          </div>
        </div>

        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="rotation">Rotation</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <KeyGenerationPanel />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <KeyInventoryPanel />
          </TabsContent>

          <TabsContent value="rotation" className="space-y-4">
            <KeyRotationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default KeyManagement;
