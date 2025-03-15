import React from 'react';
import { MainLayout } from '@/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Cpu, 
  Network, 
  Lock, 
  Server, 
  FileText, 
  BarChart
} from 'lucide-react';
import AISecurityDashboard from '@/components/security/AISecurityDashboard';

const AISecurity: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">AI Security Center</h1>
              <p className="text-muted-foreground">
                Quantum-resistant AI security monitoring and management
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid grid-cols-5 md:w-[600px]">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="hidden sm:inline">Models</span>
              </TabsTrigger>
              <TabsTrigger value="encryption" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Encryption</span>
              </TabsTrigger>
              <TabsTrigger value="network" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                <span className="hidden sm:inline">Network</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Compliance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <AISecurityDashboard />
            </TabsContent>
            
            <TabsContent value="models">
              <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">AI Security Models</h2>
                <p className="text-muted-foreground">
                  Quantum-resistant AI security models and configurations
                </p>
                {/* AI Models management content would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="encryption">
              <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Homomorphic Encryption</h2>
                <p className="text-muted-foreground">
                  Configure and monitor homomorphic encryption for private AI computation
                </p>
                {/* Encryption management content would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="network">
              <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Decentralized Security Network</h2>
                <p className="text-muted-foreground">
                  Manage connections to the decentralized AI security network
                </p>
                {/* Network management content would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="compliance">
              <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Security Compliance</h2>
                <p className="text-muted-foreground">
                  NIST FIPS 205/206 compliance reports and auditing
                </p>
                {/* Compliance management content would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default AISecurity;
