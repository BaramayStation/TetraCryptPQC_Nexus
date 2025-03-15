
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  Lock, 
  Key, 
  ArrowRight, 
  Cpu, 
  BarChart4, 
  Network
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PQCKey } from "@/lib/crypto";
import { 
  initializeAISecuritySystem, 
  detectThreatsWithAI, 
  analyzeKeyForRotation,
  performAIKeyRotation,
  generateAISecurityMetrics
} from "@/lib/ai-pqc-security";
import { AIThreatDetection, SecurityHealthMetrics } from "@/lib/storage-types";

const AISecurityDashboard: React.FC = () => {
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityHealthMetrics | null>(null);
  const [threats, setThreats] = useState<AIThreatDetection[]>([
    {
      id: "threat-1",
      severity: "medium",
      description: "Potential quantum side-channel attack pattern detected",
      affectedComponents: ["Key Management", "Authentication"],
      timestamp: new Date().toISOString(),
      mitigated: false,
      status: "active",
      score: 65,
      remediationSteps: [
        "Rotate authentication keys to ML-KEM-1024",
        "Enable constant-time PQC implementation",
        "Activate hardware protection (TPM)"
      ]
    },
    {
      id: "threat-2",
      severity: "low",
      description: "Unusual quantum-resistant key usage pattern",
      affectedComponents: ["Message Encryption"],
      timestamp: new Date().toISOString(),
      mitigated: true,
      status: "resolved",
      score: 35,
      remediationSteps: [
        "Monitor PQC key usage patterns",
        "Update to latest PQC library version"
      ]
    }
  ]);
  const [testKey, setTestKey] = useState<PQCKey>({
    algorithm: "ML-KEM-768",
    publicKey: "8f4e932a...",
    privateKey: "3a9c8b2d...",
    created: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(), // 80 days ago
    strength: "192-bit quantum security",
    standard: "NIST FIPS 205",
    hardwareProtected: false
  });
  const [keyAnalysis, setKeyAnalysis] = useState<any>(null);
  
  // Initialize AI security system on component mount
  useEffect(() => {
    const initSecurity = async () => {
      try {
        const result = await initializeAISecuritySystem();
        setIsSystemReady(result.ready);
        
        // Generate security metrics
        const metrics = generateAISecurityMetrics();
        setSecurityMetrics(metrics);
        
        toast({
          title: "AI Security System Initialized",
          description: `${result.modelsLoaded} AI security models loaded successfully.`,
        });
      } catch (error) {
        console.error("Failed to initialize AI security:", error);
        toast({
          title: "AI Security System Error",
          description: "Could not initialize AI security system.",
          variant: "destructive",
        });
      } finally {
        setIsInitializing(false);
      }
    };
    
    initSecurity();
  }, [toast]);

  // Perform AI-powered security scan
  const performSecurityScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 150);
    
    try {
      // Simulate security data to scan
      const securityData = {
        userId: "user-123",
        operations: ["key-generation", "message-encryption", "signature-verification"],
        timestamp: new Date().toISOString(),
        systemState: "normal",
      };
      
      // Perform AI-powered threat detection
      const result = await detectThreatsWithAI(JSON.stringify(securityData));
      
      // Ensure scan completes with 100%
      setScanProgress(100);
      
      // Update state with detection results
      setTimeout(() => {
        // Map the threats to AIThreatDetection format
        const newThreats: AIThreatDetection[] = result.threats.map(threat => ({
          id: threat.id,
          severity: threat.severity === 'critical' ? 'high' : threat.severity as any,
          description: threat.description,
          affectedComponents: ["Key Management", "Authentication"],
          timestamp: threat.timestamp,
          mitigated: false,
          status: "active",
          score: threat.score
        }));
        
        setThreats(prev => [...newThreats, ...prev]);
        setIsScanning(false);
        
        // Generate new security metrics
        setSecurityMetrics(generateAISecurityMetrics());
        
        if (result.detected) {
          toast({
            title: `Security Threats Detected (${result.threats.length})`,
            description: `${result.recommendation}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Security Scan Complete",
            description: "No new threats detected in this scan.",
          });
        }
      }, 500);
    } catch (error) {
      setIsScanning(false);
      console.error("Security scan failed:", error);
      toast({
        title: "Security Scan Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Analyze key for rotation
  const analyzeKey = async () => {
    try {
      const analysis = await analyzeKeyForRotation(testKey);
      setKeyAnalysis(analysis);
      
      toast({
        title: "Key Analysis Complete",
        description: analysis.recommendation,
        variant: analysis.shouldRotate ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Key analysis failed:", error);
      toast({
        title: "Key Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Perform key rotation
  const rotateKey = async () => {
    try {
      const result = await performAIKeyRotation(testKey);
      setTestKey(result.newKey);
      setKeyAnalysis(null);
      
      toast({
        title: "Key Rotation Successful",
        description: `Rotated from ${result.rotationReport.previousAlgorithm} to ${result.rotationReport.newAlgorithm} with ${result.rotationReport.securityImprovement}% security improvement.`,
      });
    } catch (error) {
      console.error("Key rotation failed:", error);
      toast({
        title: "Key Rotation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container space-y-6 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            AI-Driven Post-Quantum Security
          </h1>
          <p className="text-muted-foreground">
            ML-powered threat detection and cryptographic security optimization
          </p>
        </div>
        
        <Button 
          onClick={performSecurityScan} 
          disabled={isScanning || !isSystemReady}
          className="bg-primary"
        >
          {isScanning ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Run AI Security Scan
            </>
          )}
        </Button>
      </div>
      
      {isInitializing ? (
        <div className="flex justify-center items-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Initializing AI Security System...</span>
        </div>
      ) : (
        <>
          {isScanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI-Powered PQC Security Scan in Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Security</span>
                    <Badge className={securityMetrics && securityMetrics.securityScore > 80 ? "bg-green-500" : "bg-yellow-500"}>
                      {securityMetrics ? securityMetrics.securityScore : 0}/100
                    </Badge>
                  </div>
                  <Progress value={securityMetrics?.securityScore || 0} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>PQC Implementation</span>
                    <Badge className="bg-green-500">FIPS 205/206 Compliant</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Threats</span>
                    <Badge className={threats.filter(t => !t.mitigated).length > 0 ? "bg-red-500" : "bg-green-500"}>
                      {threats.filter(t => !t.mitigated).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>AI Models</span>
                    <Badge>3 Active</Badge>
                  </div>
                </div>
                
                <Alert className={threats.filter(t => !t.mitigated).length > 0 ? "border-red-500" : "border-green-500"}>
                  {threats.filter(t => !t.mitigated).length > 0 ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertTitle className="text-red-500">Security Threats Detected</AlertTitle>
                      <AlertDescription>
                        {threats.filter(t => !t.mitigated).length} active security threats require attention.
                      </AlertDescription>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertTitle className="text-green-500">System Secure</AlertTitle>
                      <AlertDescription>
                        PQC security systems operating normally.
                      </AlertDescription>
                    </>
                  )}
                </Alert>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-primary" />
                  Security Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Threat Detections (24h)</p>
                      <p className="font-medium">{securityMetrics?.threatDetectionsLast24h || 0}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Detection Rate</p>
                      <p className="font-medium">{securityMetrics?.threatDetectionRate || 0}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Detection Latency</p>
                      <p className="font-medium">{securityMetrics?.threatDetectionLatency || 0}ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">False Positive Rate</p>
                      <p className="font-medium">{securityMetrics?.falsePositiveRate || 0}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Patch Level</p>
                      <p className="font-medium">{securityMetrics?.patchLevel || 0}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{securityMetrics ? new Date(securityMetrics.lastUpdated).toLocaleTimeString() : '-'}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Vulnerabilities</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center bg-red-500/10 rounded-md p-2">
                        <span className="text-xs text-muted-foreground">High</span>
                        <span className="font-bold text-red-500">{securityMetrics?.vulnerabilities.high || 0}</span>
                      </div>
                      <div className="flex flex-col items-center bg-yellow-500/10 rounded-md p-2">
                        <span className="text-xs text-muted-foreground">Medium</span>
                        <span className="font-bold text-yellow-500">{securityMetrics?.vulnerabilities.medium || 0}</span>
                      </div>
                      <div className="flex flex-col items-center bg-blue-500/10 rounded-md p-2">
                        <span className="text-xs text-muted-foreground">Low</span>
                        <span className="font-bold text-blue-500">{securityMetrics?.vulnerabilities.low || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  AI Key Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Current Test Key</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Algorithm:</span>
                      <span>{testKey.algorithm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{new Date(testKey.created).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Security:</span>
                      <span>{testKey.strength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hardware:</span>
                      <span>{testKey.hardwareProtected ? "Protected" : "Not Protected"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={analyzeKey} variant="outline" className="flex-1">
                    Analyze Key
                  </Button>
                  <Button onClick={rotateKey} className="flex-1" disabled={!keyAnalysis?.shouldRotate}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate Key
                  </Button>
                </div>
                
                {keyAnalysis && (
                  <Alert className={keyAnalysis.shouldRotate ? "border-red-500" : "border-green-500"}>
                    {keyAnalysis.shouldRotate ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <AlertTitle className={keyAnalysis.shouldRotate ? "text-red-500" : "text-green-500"}>
                      {keyAnalysis.shouldRotate ? `Key Rotation Needed (${keyAnalysis.urgency})` : "Key Secure"}
                    </AlertTitle>
                    <AlertDescription>
                      {keyAnalysis.recommendation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="threats">
            <TabsList>
              <TabsTrigger value="threats">Active Threats</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              <TabsTrigger value="performance">System Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="threats">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Detected Security Threats</CardTitle>
                  <CardDescription>Post-quantum security threats identified by AI models</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threats.length > 0 ? (
                      threats.map((threat) => (
                        <div 
                          key={threat.id} 
                          className={`p-4 border rounded-lg ${
                            threat.mitigated 
                              ? "border-green-200 bg-green-50 dark:bg-green-950/10 dark:border-green-900" 
                              : "border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-900"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                {threat.mitigated ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                )}
                                <h3 className="font-medium">{threat.description}</h3>
                              </div>
                              <div className="flex gap-2 text-xs">
                                <Badge className={
                                  threat.severity === "high" ? "bg-red-500" :
                                  threat.severity === "medium" ? "bg-yellow-500" :
                                  "bg-blue-500"
                                }>
                                  {threat.severity}
                                </Badge>
                                <Badge variant="outline">
                                  Score: {threat.score}/100
                                </Badge>
                                <Badge variant="outline">
                                  {new Date(threat.timestamp).toLocaleString()}
                                </Badge>
                              </div>
                            </div>
                            
                            {!threat.mitigated && (
                              <Button size="sm" variant="outline">
                                Mitigate
                              </Button>
                            )}
                          </div>
                          
                          <div className="mt-3">
                            <h4 className="text-xs font-medium mb-1">Affected Components:</h4>
                            <div className="flex flex-wrap gap-1">
                              {threat.affectedComponents.map((component, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {component}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {!threat.mitigated && threat.remediationSteps && (
                            <div className="mt-3">
                              <h4 className="text-xs font-medium mb-1">AI-Recommended Actions:</h4>
                              <ul className="text-xs space-y-1 list-disc list-inside">
                                {threat.remediationSteps.map((step, i) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                        <p className="font-medium">No security threats detected</p>
                        <p className="text-muted-foreground">Your system is currently secure</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={performSecurityScan} disabled={isScanning}>
                    {isScanning ? "Scanning..." : "Scan for New Threats"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>AI Security Recommendations</CardTitle>
                  <CardDescription>Proactive security improvements recommended by AI analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityMetrics?.recommendedActions?.map((action, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                        <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{action}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Implementing this recommendation will improve your quantum security posture.
                          </p>
                        </div>
                        <Button size="sm" className="ml-auto mt-1">Apply</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>AI security system performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        AI Computing Resources
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>CPU Usage</span>
                            <span>{securityMetrics?.cpuUsage || 0}%</span>
                          </div>
                          <Progress value={securityMetrics?.cpuUsage || 0} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Memory Usage</span>
                            <span>{securityMetrics?.memoryUsage || 0}%</span>
                          </div>
                          <Progress value={securityMetrics?.memoryUsage || 0} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Storage Usage</span>
                            <span>{securityMetrics?.storageUsage || 0}%</span>
                          </div>
                          <Progress value={securityMetrics?.storageUsage || 0} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        AI Security Network
                      </h3>
                      
                      <div className="space-y-5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Model Inference Time</span>
                          <Badge variant="outline">45ms (avg)</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Threat Detection API Latency</span>
                          <Badge variant="outline">
                            {securityMetrics?.threatDetectionLatency || 0}ms
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Network Bandwidth</span>
                          <Badge variant="outline">
                            {securityMetrics?.networkUsage || 0}%
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Incident Response Time</span>
                          <Badge variant="outline">
                            {securityMetrics?.incidentResponseTime || 0}min
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default AISecurityDashboard;
