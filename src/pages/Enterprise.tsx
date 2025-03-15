
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Shield, 
  Server, 
  Lock, 
  Fingerprint 
} from "lucide-react";
import EnterpriseSecurityAnalysis from "@/components/enterprise/EnterpriseSecurityAnalysis";
import EnterpriseAuthentication from "@/components/security/EnterpriseAuthentication";
import AISecurityMonitoring from "@/components/enterprise/AISecurityMonitoring";
import SecureExecutionPanel from "@/components/enterprise/SecureExecutionPanel";
import SecurityArchitecture from "@/components/security/SecurityArchitecture";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Enterprise = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Enterprise Security Suite</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          TetraCryptPQC Enterprise Suite provides advanced post-quantum cryptography 
          protection for mission-critical applications and AI-driven infrastructures 
          with NIST FIPS 205/206 compliance.
        </p>
        
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="authentication" className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4" />
              <span>Authentication</span>
            </TabsTrigger>
            <TabsTrigger value="ai-monitoring" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span>AI Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="secure-execution" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Secure Execution</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Architecture</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis">
            <EnterpriseSecurityAnalysis />
          </TabsContent>
          
          <TabsContent value="authentication">
            <EnterpriseAuthentication />
          </TabsContent>
          
          <TabsContent value="ai-monitoring">
            <AISecurityMonitoring />
          </TabsContent>
          
          <TabsContent value="secure-execution">
            <SecureExecutionPanel />
          </TabsContent>
          
          <TabsContent value="architecture">
            <SecurityArchitecture />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Enterprise;
