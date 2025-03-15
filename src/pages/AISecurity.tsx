
import React, { useState } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  Lock, 
  Activity, 
  CircuitBoard, 
  Server, 
  Cpu, 
  AlertTriangle,
  Database, 
  CloudOff,
  Network
} from 'lucide-react';
import { detectThreats, encryptForAIProcessing, generateSecurityReport } from '@/lib/ai-security';

const AISecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [securityScore, setSecurityScore] = useState(87);
  const [threatReport, setThreatReport] = useState<any>(null);

  const runThreatAnalysis = async () => {
    setAnalysisRunning(true);
    try {
      // Sample data to analyze (in a real app, this would be actual system data)
      const sampleData = JSON.stringify({
        networkTraffic: "Encrypted P2P communication via TetraCryptPQC",
        systemStatus: "Online, quantum-resistant encryption active",
        userActions: "Admin login from authorized device",
        apiCalls: [
          { endpoint: "/api/secure-data", method: "GET", timestamp: new Date().toISOString() },
          { endpoint: "/api/quantum-keys", method: "POST", timestamp: new Date().toISOString() }
        ]
      });

      // Run AI-powered threat detection
      const result = await detectThreats(sampleData, 'anomaly-detection');
      setThreatReport(result);
      
      // Update security score based on threats
      if (result.threats.length > 0) {
        setSecurityScore(Math.max(60, 100 - result.threats.length * 10));
      } else {
        setSecurityScore(95);
      }
    } catch (error) {
      console.error("Error running threat analysis:", error);
    } finally {
      setAnalysisRunning(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">AI-Powered Quantum Security</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          TetraCryptPQC integrates advanced AI capabilities with post-quantum cryptography to create
          a self-healing, resilient security infrastructure that can detect and mitigate threats in real-time.
        </p>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="threat-detection" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Threat Detection</span>
            </TabsTrigger>
            <TabsTrigger value="homomorphic" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Secure AI Processing</span>
            </TabsTrigger>
            <TabsTrigger value="decentralized" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>Decentralized Security</span>
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center gap-2">
              <CloudOff className="h-4 w-4" />
              <span>Offline Resilience</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  System Security Status
                </CardTitle>
                <CardDescription>
                  Real-time security posture of your TetraCryptPQC system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quantum Security Level</span>
                      <span className="text-sm font-medium">{securityScore}%</span>
                    </div>
                    <Progress value={securityScore} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-green-500 mr-2" />
                          <h3 className="font-medium">Encryption Status</h3>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ML-KEM-1024 & SLH-DSA quantum-resistant cryptography active
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Brain className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="font-medium">AI Status</h3>
                        </div>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600">Monitoring</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI-powered threat detection and anomaly analysis running
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Server className="h-5 w-5 text-purple-500 mr-2" />
                          <h3 className="font-medium">Backup Status</h3>
                        </div>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-600">Synced</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Decentralized IPFS backups & Podman containers ready
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                    <h3 className="font-medium flex items-center">
                      <Activity className="h-5 w-5 text-primary mr-2" />
                      System Architecture
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CircuitBoard className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Quantum-Resistant Frontend</h4>
                          <p className="text-xs text-muted-foreground">
                            React + WASM-powered TetraCryptPQC implementation for client-side encryption
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Server className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Self-Healing Backend</h4>
                          <p className="text-xs text-muted-foreground">
                            Rust-powered APIs with auto-failover and redundant Podman containers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Database className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Decentralized Storage</h4>
                          <p className="text-xs text-muted-foreground">
                            Supabase with StarkNet-synced transaction verification and IPFS backups
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Cpu className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Edge AI Processing</h4>
                          <p className="text-xs text-muted-foreground">
                            Local AI models for offline threat detection and cryptographic operations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={runThreatAnalysis} 
                  disabled={analysisRunning}
                  className="w-full"
                >
                  {analysisRunning ? "Running Security Scan..." : "Run AI Security Analysis"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="threat-detection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  AI Threat Detection
                </CardTitle>
                <CardDescription>
                  Post-quantum AI-powered threat analysis and anomaly detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                {threatReport ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Security Assessment</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on AI analysis of system activity
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          threatReport.detected 
                            ? "bg-red-500/10 text-red-600" 
                            : "bg-green-500/10 text-green-600"
                        }`}
                      >
                        {threatReport.detected ? "Threats Detected" : "System Secure"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Security Score</span>
                        <span className="text-sm font-medium">{threatReport.score}/100</span>
                      </div>
                      <Progress 
                        value={threatReport.score} 
                        className="h-2"
                        indicator={threatReport.score > 70 ? "bg-green-500" : "bg-yellow-500"}
                      />
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">AI Recommendation</h3>
                      <p className="text-sm">{threatReport.recommendation}</p>
                    </div>
                    
                    {threatReport.threats.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="font-medium">Detected Threats</h3>
                        {threatReport.threats.map((threat: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{threat.description}</h4>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${threat.severity === 'critical' ? 'bg-red-500/10 text-red-600' : ''}
                                  ${threat.severity === 'high' ? 'bg-orange-500/10 text-orange-600' : ''}
                                  ${threat.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-600' : ''}
                                  ${threat.severity === 'low' ? 'bg-blue-500/10 text-blue-600' : ''}
                                `}
                              >
                                {threat.severity}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <h5 className="text-sm font-medium">Indicators</h5>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                  {threat.indicators.map((indicator: string, i: number) => (
                                    <li key={i}>{indicator}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium">Mitigation Steps</h5>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                  {threat.mitigationSteps.map((step: string, i: number) => (
                                    <li key={i}>{step}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <h3 className="font-medium text-green-600 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          No threats detected
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your system is currently secure with quantum-resistant encryption active.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Security Analysis Run</h3>
                    <p className="text-muted-foreground mb-6">
                      Run a security analysis to detect potential threats and vulnerabilities
                    </p>
                    <Button onClick={runThreatAnalysis} disabled={analysisRunning}>
                      {analysisRunning ? "Running Security Scan..." : "Run Security Analysis"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="homomorphic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Homomorphic AI Processing
                </CardTitle>
                <CardDescription>
                  Secure AI operations on encrypted data without decryption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">How It Works</h3>
                    <p className="text-sm text-muted-foreground">
                      TetraCryptPQC uses homomorphic encryption to allow AI models to process encrypted data without ever decrypting it. 
                      This ensures data remains private and secure even during analysis and machine learning operations.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Encrypted AI Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        AI models can analyze encrypted data, detecting patterns and anomalies without seeing the raw information.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        Privacy-Preserving ML
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Machine learning models train on encrypted data sets, maintaining data privacy while improving security capabilities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                    <h3 className="font-medium text-blue-600 mb-2">Technical Implementation</h3>
                    <p className="text-sm text-muted-foreground">
                      TetraCryptPQC implements TFHE (Fully Homomorphic Encryption over the Torus) and CKKS schemes 
                      for efficient encrypted computations, with optimizations for both CPU and WebGPU acceleration.
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={async () => {
                      const data = { userId: "user123", activityData: "Sensitive user activity log" };
                      const result = await encryptForAIProcessing(data);
                      console.log("Data encrypted for AI processing:", result);
                    }}
                  >
                    Demo: Encrypt Data for AI Processing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="decentralized" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  Decentralized Security Architecture
                </CardTitle>
                <CardDescription>
                  Distributed security mechanisms with no single point of failure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Decentralized Security Components</h3>
                    <p className="text-sm text-muted-foreground">
                      TetraCryptPQC implements a decentralized security architecture that distributes security 
                      functions across multiple nodes, eliminating single points of failure and increasing resilience.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        StarkNet Integration
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Security policies and cryptographic proofs stored on StarkNet for tamper-proof verification.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Server className="h-4 w-4 text-primary" />
                        Podman Security Mesh
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Secure containers running redundant security services that automatically fail over.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <CircuitBoard className="h-4 w-4 text-primary" />
                        P2P Security Network
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Peer-to-peer threat intelligence sharing with quantum-resistant encryption.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                    <h3 className="font-medium text-purple-600 mb-2">Zero-Knowledge Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      TetraCryptPQC uses zero-knowledge proofs to authenticate users and services without 
                      exposing credentials, providing quantum-resistant identity verification with minimal data exposure.
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={async () => {
                      const report = await generateSecurityReport();
                      console.log("Generated security report:", report);
                    }}
                  >
                    Generate Decentralized Security Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="offline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudOff className="h-5 w-5 text-primary" />
                  Offline Resilience
                </CardTitle>
                <CardDescription>
                  Continue operations even when disconnected from the network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Offline-Capable Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      TetraCryptPQC is designed to function fully even when disconnected from the internet,
                      maintaining security and operational capabilities through local processing and storage.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Local Cryptographic Operations
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        All cryptographic functions run locally through WASM, ensuring security even offline.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" />
                        Offline AI Models
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Compressed AI models for threat detection run locally through TensorFlow.js/ONNX Runtime.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <CircuitBoard className="h-4 w-4 text-primary" />
                      Service Worker Architecture
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Service Workers cache the application and critical data, allowing full functionality without connectivity:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                      <li>Application shell and UI components cached locally</li>
                      <li>Encryption/decryption operations run in WebWorkers for performance</li>
                      <li>IndexedDB stores encrypted data pendingZ synchronization</li>
                      <li>Background sync when connectivity is restored</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <h3 className="font-medium text-green-600 mb-2">IPFS Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Critical application components and security definitions are stored on IPFS, 
                      allowing decentralized access even when primary servers are unreachable.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Test Offline Capability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AISecurity;
