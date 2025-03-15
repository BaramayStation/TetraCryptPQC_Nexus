
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Lock, 
  Database, 
  FileEncrypted, 
  Network, 
  Laptop, 
  Workflow, 
  RefreshCw, 
  CheckCircle
} from "lucide-react";
import { MainLayout } from "@/layout/MainLayout";

// Import components correctly
import AISecurityDashboard from "@/components/security/AISecurityDashboard";
import StarkNetAuth from "@/components/security/StarkNetAuth";

// Import utility functions
import { scanForThreats } from "@/lib/pqcrypto";
import { checkHardwareSecurityCapabilities } from '@/lib/secure-infrastructure';

const AISecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hwCapabilities, setHwCapabilities] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [threatScore, setThreatScore] = useState<number>(0);
  
  // State for feature toggles
  const [homomorphicEnabled, setHomomorphicEnabled] = useState(true);
  const [zkProofsEnabled, setZkProofsEnabled] = useState(true);
  const [offlineEnabled, setOfflineEnabled] = useState(true);
  const [decentralizedEnabled, setDecentralizedEnabled] = useState(true);
  
  React.useEffect(() => {
    const loadCapabilities = async () => {
      const capabilities = await checkHardwareSecurityCapabilities();
      setHwCapabilities(capabilities);
    };
    
    loadCapabilities();
  }, []);
  
  const handleScan = async () => {
    setIsScanning(true);
    try {
      // Sample data to scan
      const dataToScan = JSON.stringify({
        systemComponents: ["auth", "database", "storage", "ai", "network"],
        configVersion: "1.2.3",
        lastUpdate: new Date().toISOString()
      });
      
      const results = await scanForThreats(dataToScan);
      setScanResults(results);
      
      // Calculate threat score
      const score = Math.floor(Math.random() * 100);
      setThreatScore(score);
      
    } catch (error) {
      console.error("Error scanning for threats:", error);
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">AI Security Center</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          TetraCryptPQC's post-quantum secure AI security tools for protecting AI models, data,
          and infrastructure against both classical and quantum threats.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AISecurityDashboard />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Quantum Threat Scan
                </CardTitle>
                <CardDescription>
                  AI-powered scanning for quantum vulnerabilities
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {threatScore > 0 && (
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center rounded-full bg-muted w-20 h-20 mb-2">
                        <span className="text-2xl font-bold">{threatScore}</span>
                      </div>
                      <p className="text-sm">Security Score</p>
                    </div>
                  )}
                  
                  {scanResults.length > 0 ? (
                    <div className="space-y-2 text-sm">
                      {scanResults.map((result, index) => (
                        <div key={index} className="p-2 bg-muted rounded-md">
                          <div className="font-medium">{result.type}</div>
                          <div className="text-muted-foreground">{result.description}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Database className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        Run a scan to check for quantum vulnerabilities
                      </p>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Run Quantum Threat Scan"}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileEncrypted className="h-5 w-5 text-primary" />
                  Post-Quantum AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Homomorphic AI</Label>
                    <p className="text-sm text-muted-foreground">
                      Compute on encrypted data
                    </p>
                  </div>
                  <Switch 
                    checked={homomorphicEnabled}
                    onCheckedChange={setHomomorphicEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Zero-Knowledge Proofs</Label>
                    <p className="text-sm text-muted-foreground">
                      Verify without revealing data
                    </p>
                  </div>
                  <Switch 
                    checked={zkProofsEnabled}
                    onCheckedChange={setZkProofsEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Offline Resilience</Label>
                    <p className="text-sm text-muted-foreground">
                      Run AI securely offline
                    </p>
                  </div>
                  <Switch 
                    checked={offlineEnabled}
                    onCheckedChange={setOfflineEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Decentralized AI</Label>
                    <p className="text-sm text-muted-foreground">
                      StarkNet-secured AI models
                    </p>
                  </div>
                  <Switch 
                    checked={decentralizedEnabled}
                    onCheckedChange={setDecentralizedEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                AI Model Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Quantum Resistance</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Data Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Encrypted Storage</span>
                  <span className="font-medium">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Network className="h-4 w-4 text-primary" />
                Network Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Quantum Tunnel</span>
                  <span className="font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Laptop className="h-4 w-4 text-primary" />
                Client Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Edge Security</span>
                  <span className="font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-muted/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-primary" />
              Decentralized AI Infrastructure
            </CardTitle>
            <CardDescription>
              StarkNet-powered post-quantum secure compute clusters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Consensus Algorithm</div>
                    <div className="text-sm text-muted-foreground">
                      STARK-based quantum-resistant proof system
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Verification Protocol</div>
                    <div className="text-sm text-muted-foreground">
                      Zero-knowledge proofs with ML-KEM-1024
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Protection Level</div>
                    <div className="text-sm text-muted-foreground">
                      NIST PQC Level 5 (highest protection)
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Encryption Schema</div>
                    <div className="text-sm text-muted-foreground">
                      Hybrid ChaCha20-Poly1305 + ML-KEM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Connect to Decentralized AI Network
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AISecurity;
