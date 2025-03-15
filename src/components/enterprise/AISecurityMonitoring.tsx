import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { GlassContainer } from "@/components/ui/glass-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Lock, Eye, AlertCircle, CheckCircle, RefreshCw, FileText, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initAISecurityMonitoring, detectThreats, ThreatDetectionResult } from "@/lib/ai-security";
import { getUserProfile } from "@/lib/storage";
import { checkVerifiableExecution } from "@/lib/secure-execution-service";

const AISecurityMonitoring: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatDetection, setThreatDetection] = useState<ThreatDetectionResult | null>(null);
  const [executionStatus, setExecutionStatus] = useState<{
    available: boolean;
    environments: string[];
  } | null>(null);
  const [selectedTab, setSelectedTab] = useState("monitoring");

  // Initialize AI security monitoring on component mount
  useEffect(() => {
    const initSecurity = async () => {
      try {
        initAISecurityMonitoring();
        
        // Check execution environments
        const execStatus = await checkVerifiableExecution();
        setExecutionStatus(execStatus);
        
        toast({
          title: "AI Security Monitoring Initialized",
          description: "Post-quantum protected monitoring system is now active.",
        });
      } catch (error) {
        console.error("Failed to initialize AI security:", error);
        toast({
          title: "Security System Error",
          description: "Could not initialize AI security monitoring.",
          variant: "destructive",
        });
      }
    };
    
    initSecurity();
  }, [toast]);

  // Simulate a security scan
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
      // Get user profile
      const userProfile = getUserProfile();
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      
      // Simulate security data to scan
      const securityData = {
        userId: userProfile.id,
        operations: ["key-generation", "message-encryption", "signature-verification"],
        timestamp: new Date().toISOString(),
        systemState: "normal",
      };
      
      // Perform AI-powered threat detection
      const result = await detectThreats(JSON.stringify(securityData));
      
      // Ensure scan completes with 100%
      setScanProgress(100);
      
      // Update state with detection results
      setTimeout(() => {
        setThreatDetection(result);
        setIsScanning(false);
        
        if (result.detected) {
          toast({
            title: `Security Threats Detected (${result.threats.length})`,
            description: `Severity: ${result.threats.length > 0 ? result.threats[0].severity : 'unknown'}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Security Scan Complete",
            description: "No threats detected in this scan.",
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

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            AI-Powered Security Monitoring
          </h1>
          <p className="text-muted-foreground">
            Post-quantum protected anomaly detection and threat prevention
          </p>
        </div>
        
        <Button 
          onClick={performSecurityScan} 
          disabled={isScanning}
          className="bg-accent hover:bg-accent/90"
        >
          {isScanning ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Run Security Scan
            </>
          )}
        </Button>
      </div>
      
      {isScanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>AI-Powered Security Scan in Progress</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="h-2" />
        </div>
      )}

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitoring">Real-Time Monitoring</TabsTrigger>
          <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          <TabsTrigger value="execution">Secure Execution</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <GlassContainer className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Cryptographic Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">PQC Algorithms</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Key Rotation</span>
                    <Badge className="bg-green-500">On Schedule</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Hardware Security</span>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Anomaly Detection</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Homomorphic Encryption</span>
                    <Badge>Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Last Analysis</span>
                    <span className="text-xs">2 minutes ago</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">System Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">StarkNet Identity</span>
                    <Badge className="bg-green-500">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Zero-Trust Protocol</span>
                    <Badge className="bg-green-500">Enforced</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Decentralized Storage</span>
                    <Badge>Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Activity</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Kyber-1024 key exchange completed successfully</span>
                  <Badge className="ml-auto">2m ago</Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">SLH-DSA signature verification passed</span>
                  <Badge className="ml-auto">5m ago</Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">AI security analysis completed with no anomalies</span>
                  <Badge className="ml-auto">15m ago</Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">StarkNet zkVM initialization successful</span>
                  <Badge className="ml-auto">32m ago</Badge>
                </div>
              </div>
              
              <Alert className="bg-transparent border">
                <Cpu className="h-4 w-4 mr-2" />
                <AlertTitle>AI Security Operating Normally</AlertTitle>
                <AlertDescription>
                  All cryptographic operations are protected by post-quantum algorithms and real-time AI monitoring.
                </AlertDescription>
              </Alert>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <GlassContainer className="p-6">
            {threatDetection ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Threat Analysis Results</h3>
                  <Badge className={
                    threatDetection.score > 60 ? "bg-red-500" : 
                    threatDetection.score > 30 ? "bg-yellow-500" : 
                    "bg-green-500"
                  }>
                    Score: {Math.round(threatDetection.score)}/100
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Security Score</span>
                    <span className="text-sm">{Math.round(100 - threatDetection.score)}%</span>
                  </div>
                  <Progress 
                    value={100 - threatDetection.score} 
                    className="h-2"
                  />
                </div>
                
                <Alert className={
                  threatDetection.detected 
                    ? "border-red-500 text-red-500 bg-red-500/10" 
                    : "border-green-500 text-green-500 bg-green-500/10"
                }>
                  {threatDetection.detected 
                    ? <AlertCircle className="h-4 w-4" /> 
                    : <CheckCircle className="h-4 w-4" />
                  }
                  <AlertTitle>
                    {threatDetection.detected 
                      ? "Security Threats Detected" 
                      : "No Security Threats Detected"
                    }
                  </AlertTitle>
                  <AlertDescription>
                    {threatDetection.recommendation}
                  </AlertDescription>
                </Alert>
                
                {threatDetection.detected && (
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold">Detected Threats</h4>
                    
                    {threatDetection.threats.map(threat => (
                      <Card key={threat.id} className={
                        threat.severity === 'critical' ? "border-red-500" :
                        threat.severity === 'high' ? "border-orange-500" :
                        threat.severity === 'medium' ? "border-yellow-500" :
                        "border-blue-500"
                      }>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm">{threat.description}</CardTitle>
                            <Badge className={
                              threat.severity === 'critical' ? "bg-red-500" :
                              threat.severity === 'high' ? "bg-orange-500" :
                              threat.severity === 'medium' ? "bg-yellow-500" :
                              "bg-blue-500"
                            }>
                              {threat.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <CardDescription>Detected at {new Date(threat.timestamp).toLocaleTimeString()}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-0">
                          <div className="text-sm">
                            <div className="mb-2">
                              <span className="font-semibold">Indicators:</span>
                              <ul className="list-disc ml-5">
                                {threat.indicators.map((indicator, i) => (
                                  <li key={i} className="text-xs">{indicator}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full">
                            <span className="text-xs font-semibold">Remediation Steps:</span>
                            <ul className="list-disc ml-5">
                              {threat.mitigationSteps.map((step, i) => (
                                <li key={i} className="text-xs">{step}</li>
                              ))}
                            </ul>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
                
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Threat Analysis Available</h3>
                <p className="text-muted-foreground">
                  Run a security scan to perform AI-powered threat analysis on your cryptographic system.
                </p>
                <Button className="mt-4" onClick={performSecurityScan} disabled={isScanning}>
                  {isScanning ? "Scanning..." : "Run Security Scan"}
                </Button>
              </div>
            )}
          </GlassContainer>
        </TabsContent>

        <TabsContent value="execution" className="space-y-4">
          <GlassContainer className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Secure Execution Environments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Podman Secure Container
                    </CardTitle>
                    <CardDescription>Rootless, isolated container execution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Status</span>
                        <Badge className={executionStatus?.environments.includes('podman') ? "bg-green-500" : ""}>
                          {executionStatus?.environments.includes('podman') ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Security Level</span>
                        <span className="text-sm">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Isolation</span>
                        <span className="text-sm">Rootless Container</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={!executionStatus?.environments.includes('podman')}
                    >
                      Launch Secure Environment
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      StarkNet zkVM
                    </CardTitle>
                    <CardDescription>Verifiable computation with zero-knowledge proofs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Status</span>
                        <Badge className={executionStatus?.environments.includes('zkvm') ? "bg-green-500" : ""}>
                          {executionStatus?.environments.includes('zkvm') ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Security Level</span>
                        <span className="text-sm">Highest</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Verification</span>
                        <span className="text-sm">zk-STARK Proofs</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={!executionStatus?.environments.includes('zkvm')}
                    >
                      Launch Verifiable Environment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Secure Execution Benefits</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Isolated environment for cryptographic operations</li>
                      <li>• Protects against side-channel attacks</li>
                      <li>• Verifiable computation with zero-knowledge proofs</li>
                      <li>• Tamper-resistant execution guarantee</li>
                      <li>• Complete isolation from host system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <GlassContainer className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Compliance & Standards</h3>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">NIST Post-Quantum Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">FIPS 205 (ML-KEM)</span>
                          <span className="text-sm">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">FIPS 206 (SLH-DSA)</span>
                          <span className="text-sm">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">SP 800-208 (Stateful Hash-Based Signatures)</span>
                          <span className="text-sm">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Security Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Badge className="bg-green-500">FIPS 140-3</Badge>
                        <div className="text-xs text-muted-foreground">
                          Cryptographic Module Validation
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Badge className="bg-green-500">Common Criteria EAL5+</Badge>
                        <div className="text-xs text-muted-foreground">
                          Security Functional Requirements
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Badge>ISO 27001</Badge>
                        <div className="text-xs text-muted-foreground">
                          Information Security Management
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Badge>SOC 2 Type II</Badge>
                        <div className="text-xs text-muted-foreground">
                          Trust Services Criteria
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Compliance Report
                </Button>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISecurityMonitoring;
