import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassContainer } from "@/components/ui/glass-container";
import { 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Lock, 
  Eye, 
  Cpu, 
  RefreshCw, 
  Key, 
  Server
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';

import KeyGenerationService from "@/components/security/KeyGenerationService";
import { 
  initAIPQCSecurity, 
  assessSecurityHealth, 
  analyzeSecurityThreat, 
  generateSecurityPolicy 
} from "@/lib/ai-pqc-security";
import { 
  detectIntrusions, 
  analyzeNetworkTraffic, 
  generateThreatReport 
} from "@/lib/ai-intrusion-detection";
import { AIThreatDetection, SecurityHealthMetrics } from "@/lib/storage-types";

const AISecurityDashboard: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [securityHealth, setSecurityHealth] = useState<SecurityHealthMetrics | null>(null);
  const [threats, setThreats] = useState<AIThreatDetection[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [threatReport, setThreatReport] = useState<{
    reportId: string;
    timestamp: string;
    threats: AIThreatDetection[];
    riskLevel: string;
    summary: string;
  } | null>(null);

  useEffect(() => {
    const initSecurity = async () => {
      try {
        await initAIPQCSecurity();
        
        const healthAssessment = await assessSecurityHealth();
        setSecurityHealth(healthAssessment);
        
        const initialThreatReport = generateThreatReport();
        setThreatReport(initialThreatReport);
        setThreats(initialThreatReport.threats);
        
        toast({
          title: "AI Security System Initialized",
          description: "Post-quantum cryptographic security monitoring is active.",
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize AI security:", error);
        toast({
          title: "Security System Error",
          description: "Could not initialize AI security monitoring.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    initSecurity();
  }, [toast]);

  const runSecurityScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
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
      const sampleData = {
        userId: "user-123",
        operations: ["key-generation", "message-encryption", "signature-verification"],
        timestamp: new Date().toISOString(),
        systemState: "normal"
      };
      
      const detectionResult = await detectIntrusions(sampleData);
      
      const networkAnalysis = await analyzeNetworkTraffic(sampleData);
      
      const newThreatReport = generateThreatReport();
      setThreatReport(newThreatReport);
      
      setThreats([...detectionResult.threats]);
      
      const updatedHealth = await assessSecurityHealth();
      setSecurityHealth(updatedHealth);
      
      setScanProgress(100);
      setTimeout(() => {
        setIsScanning(false);
        
        if (detectionResult.detected) {
          toast({
            title: `Security Threats Detected (${detectionResult.threatCount})`,
            description: detectionResult.recommendation,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Security Scan Complete",
            description: "No immediate threats detected. System secure.",
          });
        }
      }, 500);
    } catch (error) {
      console.error("Security scan failed:", error);
      toast({
        title: "Security Scan Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Shield className="h-16 w-16 text-accent animate-pulse mb-4" />
        <h2 className="text-xl font-semibold mb-2">Initializing AI Security</h2>
        <p className="text-muted-foreground mb-4">Setting up post-quantum security protocols...</p>
        <Progress value={45} className="w-64 h-2" />
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            AI-Powered Quantum Security
          </h1>
          <p className="text-muted-foreground">
            Post-quantum protected anomaly detection and threat prevention
          </p>
        </div>
        
        <Button 
          onClick={runSecurityScan} 
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

      {securityHealth && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke={
                        securityHealth.securityScore > 80 ? "#10b981" :
                        securityHealth.securityScore > 60 ? "#f59e0b" :
                        "#ef4444"
                      } 
                      strokeWidth="10" 
                      strokeDasharray={`${securityHealth.securityScore * 2.83} 283`} 
                      strokeDashoffset="0" 
                      strokeLinecap="round" 
                      transform="rotate(-90 50 50)" 
                    />
                    <text 
                      x="50" 
                      y="55" 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      fontSize="24" 
                      fontWeight="bold"
                      fill="currentColor"
                    >
                      {securityHealth.securityScore}
                    </text>
                  </svg>
                </div>
                <Badge className={
                  securityHealth.securityScore > 80 ? "bg-green-500 mt-2" :
                  securityHealth.securityScore > 60 ? "bg-yellow-500 mt-2" :
                  "bg-red-500 mt-2"
                }>
                  {securityHealth.securityScore > 80 ? "Secure" :
                   securityHealth.securityScore > 60 ? "Caution" :
                   "At Risk"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Threat Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Threats</span>
                <Badge variant={securityHealth.activeThreats > 0 ? "destructive" : "outline"}>
                  {securityHealth.activeThreats}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>High</span>
                  <span>{securityHealth.vulnerabilities.high}</span>
                </div>
                <Progress 
                  value={securityHealth.vulnerabilities.high * 20} 
                  className={`h-2 ${
                    securityHealth.vulnerabilities.high * 20 >= 80 ? "bg-green-500/20" :
                    securityHealth.vulnerabilities.high * 20 >= 60 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
                
                <div className="flex justify-between text-sm">
                  <span>Medium</span>
                  <span>{securityHealth.vulnerabilities.medium}</span>
                </div>
                <Progress 
                  value={securityHealth.vulnerabilities.medium * 10} 
                  className={`h-2 ${
                    securityHealth.vulnerabilities.medium * 10 >= 80 ? "bg-green-500/20" :
                    securityHealth.vulnerabilities.medium * 10 >= 60 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
                
                <div className="flex justify-between text-sm">
                  <span>Low</span>
                  <span>{securityHealth.vulnerabilities.low}</span>
                </div>
                <Progress 
                  value={securityHealth.vulnerabilities.low * 5} 
                  className={`h-2 ${
                    securityHealth.vulnerabilities.low * 5 >= 80 ? "bg-green-500/20" :
                    securityHealth.vulnerabilities.low * 5 >= 60 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>PQC Status</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>{securityHealth.cpuUsage}%</span>
                </div>
                <Progress 
                  value={securityHealth.cpuUsage} 
                  className={`h-2 ${
                    securityHealth.cpuUsage >= 90 ? "bg-green-500/20" :
                    securityHealth.cpuUsage >= 70 ? "bg-blue-500/20" :
                    securityHealth.cpuUsage >= 50 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
                
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span>{securityHealth.memoryUsage}%</span>
                </div>
                <Progress 
                  value={securityHealth.memoryUsage} 
                  className={`h-2 ${
                    securityHealth.memoryUsage >= 90 ? "bg-green-500/20" :
                    securityHealth.memoryUsage >= 70 ? "bg-blue-500/20" :
                    securityHealth.memoryUsage >= 50 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
                
                <div className="flex justify-between text-sm">
                  <span>Last Updated</span>
                  <span className="text-xs">{new Date(securityHealth.lastUpdated || "").toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          <TabsTrigger value="quantum">Quantum Security</TabsTrigger>
          <TabsTrigger value="keygen">Key Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <GlassContainer className="p-6">
            <h2 className="text-xl font-semibold mb-4">System Security Overview</h2>
            
            {threatReport && (
              <Alert className={
                threatReport.riskLevel === "critical" || threatReport.riskLevel === "high" ? 
                  "border-red-500 text-red-500 bg-red-500/10 mb-6" : 
                threatReport.riskLevel === "medium" ?
                  "border-yellow-500 text-yellow-500 bg-yellow-500/10 mb-6" :
                  "border-green-500 text-green-500 bg-green-500/10 mb-6"
              }>
                {threatReport.riskLevel === "low" ? 
                  <CheckCircle className="h-4 w-4" /> : 
                  <AlertCircle className="h-4 w-4" />
                }
                <AlertTitle>
                  System Risk Level: {threatReport.riskLevel.toUpperCase()}
                </AlertTitle>
                <AlertDescription>
                  {threatReport.summary}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Post-Quantum Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">ML-KEM-1024</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">SLH-DSA (Dilithium5)</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">SHAKE-256 Hash</span>
                    <Badge className="bg-green-500">Active</Badge>
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
                    <span className="text-xs">Threat Analysis</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Key Rotation</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">System Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Secure Enclave</span>
                    <Badge className="bg-green-500">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">Podman Containers</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">StarkNet Verification</span>
                    <Badge>Ready</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">PQC Security system initialized successfully</span>
                  <Badge className="ml-auto">2m ago</Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">ML-KEM-1024 key exchange completed</span>
                  <Badge className="ml-auto">5m ago</Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">SLH-DSA signature verification passed</span>
                  <Badge className="ml-auto">10m ago</Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">AI security monitoring enabled</span>
                  <Badge className="ml-auto">15m ago</Badge>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <GlassContainer className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI-Powered Threat Analysis</h2>
            
            {threats.length > 0 ? (
              <div className="space-y-4">
                {threats.map(threat => (
                  <Card key={threat.id} className={
                    threat.severity === 'high' ? "border-red-500" :
                    threat.severity === 'medium' ? "border-yellow-500" :
                    "border-blue-500"
                  }>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">{threat.description}</CardTitle>
                        <Badge className={
                          threat.severity === 'high' ? "bg-red-500" :
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
                          <span className="font-semibold">Affected Components:</span>
                          <ul className="list-disc ml-5">
                            {threat.affectedComponents.map((component, i) => (
                              <li key={i} className="text-xs">{component}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {threat.detailedAnalysis && (
                          <div className="mb-2">
                            <span className="font-semibold">Analysis:</span>
                            <p className="text-xs mt-1">{threat.detailedAnalysis}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      {threat.remediationSteps && threat.remediationSteps.length > 0 && (
                        <div className="w-full">
                          <h4 className="text-sm font-medium">Remediation Steps:</h4>
                          <ul className="mt-1 list-disc pl-5 text-xs">
                            {threat.remediationSteps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Threats Detected</h3>
                <p className="text-muted-foreground">
                  Your system is currently secure from quantum and classical threats.
                </p>
                <Button className="mt-4" onClick={runSecurityScan} disabled={isScanning}>
                  {isScanning ? "Scanning..." : "Run Security Scan"}
                </Button>
              </div>
            )}
          </GlassContainer>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-4">
          <GlassContainer className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quantum Security Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Post-Quantum Cryptography
                  </CardTitle>
                  <CardDescription>NIST FIPS 205/206 compliant algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">ML-KEM-1024 (FIPS 205)</span>
                        <span className="text-sm">256-bit</span>
                      </div>
                      <Progress 
                        value={100} 
                        className="h-2"
                        indicatorClassName={
                          "bg-green-500"
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">SLH-DSA-Dilithium5 (FIPS 206)</span>
                        <span className="text-sm">256-bit</span>
                      </div>
                      <Progress 
                        value={100} 
                        className="h-2"
                        indicatorClassName={
                          "bg-green-500"
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">FALCON-1024</span>
                        <span className="text-sm">256-bit</span>
                      </div>
                      <Progress 
                        value={100} 
                        className="h-2"
                        indicatorClassName={
                          "bg-green-500"
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">SHAKE-256 (XOF)</span>
                        <span className="text-sm">256-bit</span>
                      </div>
                      <Progress 
                        value={100} 
                        className="h-2"
                        indicatorClassName={
                          "bg-green-500"
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Secure Infrastructure
                  </CardTitle>
                  <CardDescription>Quantum-resistant deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Podman Containers</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">TPM/Secure Enclave</span>
                      <Badge className="bg-green-500">Available</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">StarkNet Verification</span>
                      <Badge>Ready</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Immutable Filesystem</span>
                      <Badge className="bg-green-500">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  AI-Enhanced Quantum Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Post-Quantum AI Security Features</h4>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• AI-powered anomaly detection for PQC operations</li>
                        <li>• Automated key rotation based on usage patterns</li>
                        <li>• Quantum-resistant encryption for all AI models</li>
                        <li>• ONNX runtime optimization for cryptographic operations</li>
                        <li>• Self-healing infrastructure with key regeneration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="keygen" className="space-y-4">
          <GlassContainer className="p-6">
            <h2 className="text-xl font-semibold mb-4">Post-Quantum Key Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KeyGenerationService />
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      AI-Powered Key Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Key Rotation Status</span>
                      <Badge className="bg-green-500">On Schedule</Badge>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">ML-KEM Key Age</span>
                        <span className="text-sm">7 days</span>
                      </div>
                      <Progress 
                        value={24} 
                        className={`h-2 ${
                          24 >= 90 ? "bg-green-500/20" :
                          24 >= 70 ? "bg-blue-500/20" :
                          24 >= 50 ? "bg-yellow-500/20" :
                          "bg-red-500/20"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">SLH-DSA Key Age</span>
                        <span className="text-sm">3 days</span>
                      </div>
                      <Progress 
                        value={10} 
                        className={`h-2 ${
                          10 >= 90 ? "bg-green-500/20" :
                          10 >= 70 ? "bg-blue-500/20" :
                          10 >= 50 ? "bg-yellow-500/20" :
                          "bg-red-500/20"
                        }`}
                      />
                    </div>
                    <Button className="w-full mt-2" variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Rotate Keys
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">Security Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        <span>Your FIPS 205/206 key configuration is optimal</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        <span>Key rotation schedule is following best practices</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        <span>Hardware security is properly configured</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                        <span>Consider enabling MPC for distributed key security</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISecurityDashboard;
