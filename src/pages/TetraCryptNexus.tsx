
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Database, 
  Layers, 
  Network, 
  FileKey,
  Fingerprint, 
  BarChart, 
  AlertTriangle,
  Check,
  Globe
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import NexusBlockchainStats from '@/components/nexus/NexusBlockchainStats';
import NexusSecurityPanel from '@/components/nexus/NexusSecurityPanel';
import NexusGovernancePanel from '@/components/nexus/NexusGovernancePanel';

const TetraCryptNexus: React.FC = () => {
  const handleSecurityScan = () => {
    toast({
      title: "AI Security Scan Initiated",
      description: "Quantum-resistant threat analysis in progress...",
    });
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">TetraCryptPQC Nexus</h1>
            <p className="text-muted-foreground mt-1">
              AI-Driven Quantum-Secure Autonomous Blockchain Platform
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
            <Check size={14} />
            <span>Quantum Secure</span>
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">PQC Algorithms</span>
                <Badge variant="secondary">ML-KEM-1024 / SLH-DSA</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Quantum Resistance</span>
                <Badge className="bg-green-600">256-bit Secure</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Monitoring</span>
                <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Threat Scan</span>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm" onClick={handleSecurityScan}>
              <Shield className="mr-2 h-4 w-4" />
              Run AI Security Scan
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Cpu className="mr-2 h-5 w-5 text-primary" />
              AI Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Autonomous Decisions</span>
                <span className="text-sm font-medium">217 today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Risk Model</span>
                <Badge variant="secondary">Federated v4.2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Trust Score</span>
                <Badge className="bg-green-600">99.8%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Self-Healing Events</span>
                <span className="text-sm font-medium">12 today</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              <BarChart className="mr-2 h-4 w-4" />
              View AI Metrics
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Network className="mr-2 h-5 w-5 text-primary" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Consensus</span>
                <Badge variant="secondary">AI-zk-PoS</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Nodes</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Block Height</span>
                <span className="text-sm font-medium">4,583,921</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Health</span>
                <Badge className="bg-green-600">Optimal</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              <Globe className="mr-2 h-4 w-4" />
              Global Node Map
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="governance">AI Governance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>TetraCryptPQC Nexus Platform</CardTitle>
              <CardDescription>
                An AI-driven, quantum-secure, fully autonomous blockchain for government, defense, and enterprise applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Lock className="mr-2 h-5 w-5" />
                    Post-Quantum Security
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>ML-KEM-1024 Key Exchange</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>SLH-DSA & Falcon-1024 Signatures</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Zero-Knowledge Proofs (zk-STARKs)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Homomorphic Encryption (FHE)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Cpu className="mr-2 h-5 w-5" />
                    AI-Autonomous Operations
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Quantum Intrusion Detection (QIDP)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Self-Healing Smart Contracts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Autonomous Compliance Verification</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Neuromorphic Processing Integration</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Platform Architecture</h3>
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden p-4">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-primary-foreground"></div>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <Layers className="h-12 w-12 mb-4 text-primary" />
                    <p className="text-muted-foreground">
                      Architecture visualization will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex">
                    <FileKey className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Multi-Layer MPC Cold Wallet</span>
                      <span className="text-sm text-muted-foreground">Military-grade secure storage with AI verification</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Server className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">AI Smart Contracts</span>
                      <span className="text-sm text-muted-foreground">Self-verifying, autonomous validation and execution</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Database className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Quantum Cloud Backup</span>
                      <span className="text-sm text-muted-foreground">Zero-trust encryption with homomorphic features</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Globe className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Global P2P Infrastructure</span>
                      <span className="text-sm text-muted-foreground">Air-gapped and satellite-enabled mesh network</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex">
                    <Shield className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Government & Military</span>
                      <span className="text-sm text-muted-foreground">Classified communications and secure logistics</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Fingerprint className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Identity & Access Management</span>
                      <span className="text-sm text-muted-foreground">Quantum-secure authentication and authorization</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Database className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Interstellar Operations</span>
                      <span className="text-sm text-muted-foreground">Autonomous commerce and resource management</span>
                    </div>
                  </li>
                  <li className="flex">
                    <AlertTriangle className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Critical Infrastructure</span>
                      <span className="text-sm text-muted-foreground">Quantum-resistant systems for utilities and defense</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <NexusSecurityPanel />
        </TabsContent>

        <TabsContent value="governance">
          <NexusGovernancePanel />
        </TabsContent>

        <TabsContent value="operations">
          <NexusBlockchainStats />
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/40">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium">Ready to deploy TetraCryptPQC Nexus?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Deploy your own fully autonomous, quantum-secure blockchain infrastructure.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">Documentation</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TetraCryptNexus;
