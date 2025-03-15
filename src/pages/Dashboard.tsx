
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecureHead } from '@/utils/secure-head';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Lock, Network, AlertTriangle, Server, Cpu } from 'lucide-react';
import MilitarySecurityDashboard from '@/components/dashboard/MilitarySecurityDashboard';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = useState({
    pqc: { status: 'online', score: 98 },
    network: { status: 'online', score: 95 },
    storage: { status: 'online', score: 97 },
    compute: { status: 'online', score: 99 },
  });

  useEffect(() => {
    // Initialize the secure environment - this would normally call the real implementation
    const init = async () => {
      try {
        // Mock initialization instead of using the real implementation
        // await initializeAISecureEnv();
        console.log("AI Secure Environment initialized");
        
        toast({
          title: "Secure Environment Initialized",
          description: "All systems are operating normally",
        });
      } catch (error) {
        console.error("Failed to initialize secure environment:", error);
        toast({
          variant: "destructive",
          title: "Initialization Failed",
          description: "Could not initialize secure environment",
        });
      }
    };

    init();
  }, [toast]);

  return (
    <>
      <SecureHead 
        title="TetraCryptPQC - Dashboard"
        description="Secure dashboard for TetraCryptPQC with real-time monitoring"
      />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">TetraCryptPQC Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                PQC Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.pqc.score}%</div>
              <p className="text-xs text-muted-foreground">
                All cryptographic systems online
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Network className="h-4 w-4 text-green-500" />
                Network Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.network.score}%</div>
              <p className="text-xs text-muted-foreground">
                Secure P2P connections established
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                Secure Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.storage.score}%</div>
              <p className="text-xs text-muted-foreground">
                Data encryption layer active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Cpu className="h-4 w-4 text-green-500" />
                Compute Nodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.compute.score}%</div>
              <p className="text-xs text-muted-foreground">
                All quantum-resistant nodes online
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="security" className="mt-6">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="security">Security Overview</TabsTrigger>
            <TabsTrigger value="military">Military Grade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="security" className="mt-6">
            <SecurityDashboard />
          </TabsContent>
          
          <TabsContent value="military" className="mt-6">
            <MilitarySecurityDashboard />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end">
          <Button 
            variant="outline"
            className="mr-2"
            onClick={() => {
              toast({
                title: "Security Scan Initiated",
                description: "Full system security scan in progress..."
              });
            }}
          >
            <Shield className="mr-2 h-4 w-4" />
            Security Scan
          </Button>
          
          <Button 
            variant="outline"
            className="mr-2"
            onClick={() => {
              toast({
                title: "Performance Metrics Updated",
                description: "System performance metrics have been refreshed"
              });
            }}
          >
            <Server className="mr-2 h-4 w-4" />
            Update Metrics
          </Button>
          
          <Button 
            variant="destructive"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Test Alert Triggered",
                description: "This is a test of the alert system only"
              });
            }}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Test Alerts
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
