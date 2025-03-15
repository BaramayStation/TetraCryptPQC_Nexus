
import React, { useState, useEffect } from 'react';
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
  Globe,
  Terminal,
  FileText,
  Scan,
  KeyRound
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import NexusBlockchainStats from '@/components/nexus/NexusBlockchainStats';
import NexusSecurityPanel from '@/components/nexus/NexusSecurityPanel';
import NexusGovernancePanel from '@/components/nexus/NexusGovernancePanel';

const TetraCryptNexus: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [clearanceGranted, setClearanceGranted] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const terminalLines = [
    '> Initializing quantum-secure verification protocol...',
    '> Authenticating client credentials via ML-KEM-1024...',
    '> Identity verification in progress...',
    '> Checking security clearance level...',
    '> zk-STARK proof verification complete.',
    '> Access granted to NEXUS terminal.',
    '> Welcome to TetraCryptPQC NEXUS. Clearance Level: RESTRICTED'
  ];
  
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentTextIndex < terminalLines.length) {
        setTerminalText(prevText => {
          const newText = prevText + '\n' + terminalLines[currentTextIndex];
          return newText;
        });
        setCurrentTextIndex(prevIndex => prevIndex + 1);
        
        if (currentTextIndex === terminalLines.length - 1) {
          setTimeout(() => {
            setIsVerifying(false);
            setClearanceGranted(true);
          }, 1000);
          clearInterval(typingInterval);
        }
      }
    }, 800);
    
    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  const handleSecurityScan = () => {
    toast({
      title: "AI Security Scan Initiated",
      description: "Quantum-resistant threat analysis in progress...",
    });
  };

  if (isVerifying) {
    return (
      <div className="container py-12 max-w-3xl mx-auto">
        <Card className="border border-accent/30 bg-black/70 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <CardHeader className="border-b border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Terminal className="h-5 w-5 text-accent mr-2" />
                <CardTitle className="text-lg font-mono text-accent">SECURE TERMINAL</CardTitle>
              </div>
              <Badge variant="outline" className="bg-black text-xs font-mono text-red-500 border-red-900/50">
                CLASSIFIED
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-black/80 border border-accent/20 rounded-md p-4 font-mono text-sm text-green-500 h-60 overflow-y-auto scanner">
              <pre className="whitespace-pre-line">{terminalText}</pre>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs text-amber-400 font-mono">VERIFYING IDENTITY</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                TERMINAL ID: SCR-{Math.floor(Math.random() * 9000) + 1000}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scan className="h-4 w-4 text-accent" />
              <p className="text-xs font-mono text-accent/80">BARAMAY RESEARCH FACILITY</p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">TetraCryptPQC Nexus</h1>
            <p className="text-muted-foreground mt-1">
              AI-Driven Quantum-Secure Autonomous Blockchain Platform
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-green-950/30 text-green-500 border-green-800/50 font-mono text-xs">
            <Check size={14} />
            <span>QUANTUM SECURE</span>
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-accent/20 bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-accent/10">
            <CardTitle className="flex items-center text-lg">
              <Shield className="mr-2 h-5 w-5 text-accent" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">PQC Algorithms</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent font-mono text-xs">ML-KEM-1024 / SLH-DSA</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Quantum Resistance</span>
                <Badge className="bg-green-600/20 text-green-500 font-mono text-xs border border-green-900/50">256-bit Secure</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">AI Monitoring</span>
                <Badge variant="outline" className="text-accent bg-accent/10 border-accent/30 font-mono text-xs">ACTIVE</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Last Threat Scan</span>
                <span className="text-xs text-muted-foreground font-mono">2 minutes ago</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-accent/10">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-xs text-green-400 font-mono">SECURE CONNECTION ESTABLISHED</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full font-mono text-xs border-accent/30 text-accent hover:bg-accent/10" size="sm" onClick={handleSecurityScan}>
              <Shield className="mr-2 h-4 w-4" />
              RUN AI SECURITY SCAN
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-accent/20 bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-accent/10">
            <CardTitle className="flex items-center text-lg">
              <Cpu className="mr-2 h-5 w-5 text-accent" />
              AI Governance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Autonomous Decisions</span>
                <span className="text-sm font-mono text-white/80">217 today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">AI Risk Model</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent font-mono text-xs">Federated v4.2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Trust Score</span>
                <Badge className="bg-green-600/20 text-green-500 font-mono text-xs border border-green-900/50">99.8%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Self-Healing Events</span>
                <span className="text-sm font-mono text-white/80">12 today</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-accent/10">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></div>
                <span className="text-xs text-amber-400 font-mono">AI MODELS OPERATING NORMALLY</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full font-mono text-xs border-accent/30 text-accent hover:bg-accent/10" size="sm">
              <BarChart className="mr-2 h-4 w-4" />
              VIEW AI METRICS
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-accent/20 bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-accent/10">
            <CardTitle className="flex items-center text-lg">
              <Network className="mr-2 h-5 w-5 text-accent" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Consensus</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent font-mono text-xs">AI-zk-PoS</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Active Nodes</span>
                <span className="text-sm font-mono text-white/80">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Block Height</span>
                <span className="text-sm font-mono text-white/80">4,583,921</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Network Health</span>
                <Badge className="bg-green-600/20 text-green-500 font-mono text-xs border border-green-900/50">OPTIMAL</Badge>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-accent/10">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                <span className="text-xs text-blue-400 font-mono">NETWORK TOPOLOGY: SECURED</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full font-mono text-xs border-accent/30 text-accent hover:bg-accent/10" size="sm">
              <Globe className="mr-2 h-4 w-4" />
              GLOBAL NODE MAP
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4 bg-black/50 p-1 border border-accent/20">
          <TabsTrigger value="overview" className="font-mono text-xs data-[state=active]:bg-accent/20 data-[state=active]:text-accent">OVERVIEW</TabsTrigger>
          <TabsTrigger value="security" className="font-mono text-xs data-[state=active]:bg-accent/20 data-[state=active]:text-accent">SECURITY</TabsTrigger>
          <TabsTrigger value="governance" className="font-mono text-xs data-[state=active]:bg-accent/20 data-[state=active]:text-accent">AI GOVERNANCE</TabsTrigger>
          <TabsTrigger value="operations" className="font-mono text-xs data-[state=active]:bg-accent/20 data-[state=active]:text-accent">OPERATIONS</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-accent/20 bg-black/40 backdrop-blur-sm">
            <CardHeader className="border-b border-accent/10">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="px-2 py-1 border-red-900/50 text-red-500 font-mono text-xs">TOP SECRET</Badge>
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-accent" />
                  <span className="text-xs font-mono text-accent/80">CLEARANCE LEVEL: RESTRICTED</span>
                </div>
              </div>
              <CardTitle>TetraCryptPQC Nexus Platform</CardTitle>
              <CardDescription>
                An AI-driven, quantum-secure, fully autonomous blockchain for government, defense, and enterprise applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-accent" />
                    Post-Quantum Security
                  </h3>
                  <ul className="space-y-2 border border-accent/20 rounded-md p-3 bg-black/50">
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">ML-KEM-1024 Key Exchange</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">SLH-DSA & Falcon-1024 Signatures</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">Zero-Knowledge Proofs (zk-STARKs)</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">Homomorphic Encryption (FHE)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <Cpu className="mr-2 h-5 w-5 text-accent" />
                    AI-Autonomous Operations
                  </h3>
                  <ul className="space-y-2 border border-accent/20 rounded-md p-3 bg-black/50">
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">Quantum Intrusion Detection (QIDP)</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">Self-Healing Smart Contracts</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">Autonomous Compliance Verification</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                      <span className="font-mono">Neuromorphic Processing Integration</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-accent" />
                  Classified Research Documents
                </h3>
                <div className="border border-accent/20 rounded-md divide-y divide-accent/10 bg-black/50">
                  <div className="p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-accent mr-2" />
                      <span className="font-mono text-sm">SLH-DSA_Implementation_v2.3.pdf</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono border-amber-800/50 text-amber-500">RESTRICTED</Badge>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-accent mr-2" />
                      <span className="font-mono text-sm">AI_Governance_Framework_2060.pdf</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono border-amber-800/50 text-amber-500">RESTRICTED</Badge>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-accent mr-2" />
                      <span className="font-mono text-sm">TetraCrypt_Military_Applications.pdf</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-mono border-red-800/50 text-red-500">CLASSIFIED</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-accent/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="border-b border-accent/10">
                <CardTitle className="text-lg flex items-center">
                  <FileKey className="mr-2 h-5 w-5 text-accent" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex">
                    <FileKey className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Multi-Layer MPC Cold Wallet</span>
                      <span className="text-sm text-muted-foreground">Military-grade secure storage with AI verification</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Server className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">AI Smart Contracts</span>
                      <span className="text-sm text-muted-foreground">Self-verifying, autonomous validation and execution</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Database className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Quantum Cloud Backup</span>
                      <span className="text-sm text-muted-foreground">Zero-trust encryption with homomorphic features</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Globe className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Global P2P Infrastructure</span>
                      <span className="text-sm text-muted-foreground">Air-gapped and satellite-enabled mesh network</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-black/40 backdrop-blur-sm">
              <CardHeader className="border-b border-accent/10">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-accent" />
                  Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex">
                    <Shield className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Government & Military</span>
                      <span className="text-sm text-muted-foreground">Classified communications and secure logistics</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Fingerprint className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Identity & Access Management</span>
                      <span className="text-sm text-muted-foreground">Quantum-secure authentication and authorization</span>
                    </div>
                  </li>
                  <li className="flex">
                    <Database className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Interstellar Operations</span>
                      <span className="text-sm text-muted-foreground">Autonomous commerce and resource management</span>
                    </div>
                  </li>
                  <li className="flex">
                    <AlertTriangle className="h-5 w-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
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

      <Card className="bg-black/40 border-accent/20 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-1">
                <Scan className="h-4 w-4 text-accent mr-2" />
                <p className="text-xs font-mono text-accent/80">RECRUITMENT NOTICE</p>
              </div>
              <h3 className="text-lg font-medium">Join Baramay Research Station</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Apply for quantum cryptography and AI research positions (TS/SCI clearance required)
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="font-mono text-xs border-accent/30 text-accent hover:bg-accent/10">SECURITY CLEARANCE CHECK</Button>
              <Button className="font-mono text-xs bg-accent text-black hover:bg-accent/80">APPLY NOW</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TetraCryptNexus;
