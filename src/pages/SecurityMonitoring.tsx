
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { GlassContainer } from "@/components/ui/glass-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  FileText, 
  Cpu,
  Activity,
  KeyRound,
  BarChart
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AISecurityMonitoring from "@/components/enterprise/AISecurityMonitoring";
import HardwareSecurityManager from "@/components/security/HardwareSecurityManager";

const SecurityMonitoring: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [securityScore, setSecurityScore] = useState(85);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  
  // Initialize security monitoring
  useEffect(() => {
    // Simulate last scan time
    setLastScanTime(new Date().toISOString());
  }, []);
  
  // Perform security scan
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
    }, 100);
    
    try {
      // Simulate scan completion after 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update security metrics
      setSecurityScore(Math.floor(Math.random() * 15) + 80); // 80-95
      setThreatLevel(Math.random() > 0.8 ? 'medium' : 'low');
      setLastScanTime(new Date().toISOString());
      
      toast({
        title: "Security Scan Complete",
        description: "Your system security has been analyzed and the dashboard has been updated.",
      });
    } catch (error) {
      console.error("Security scan failed:", error);
      toast({
        title: "Security Scan Failed",
        description: "An error occurred during the security scan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };
  
  // Format the last scan time
  const formatLastScan = () => {
    if (!lastScanTime) return "Never";
    
    try {
      const scanDate = new Date(lastScanTime);
      return scanDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return "Unknown";
    }
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              Security Operations Center
            </h1>
            <p className="text-muted-foreground">
              Post-quantum security monitoring and threat prevention
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
              <span>Security Scan in Progress</span>
              <span>{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </div>
        )}

        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="ai-monitoring">AI Monitoring</TabsTrigger>
            <TabsTrigger value="hardware">Hardware Security</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Security Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold">{securityScore}/100</div>
                      <p className="text-sm text-muted-foreground">Last scan: {formatLastScan()}</p>
                    </div>
                    
                    <Badge className={securityScore >= 90 ? "bg-green-500" : securityScore >= 75 ? "bg-amber-500" : "bg-red-500"}>
                      {securityScore >= 90 ? "Excellent" : securityScore >= 75 ? "Good" : "Needs Attention"}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quantum Readiness</span>
                      <span>{securityScore}%</span>
                    </div>
                    <Progress value={securityScore} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" onClick={performSecurityScan} disabled={isScanning} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Score
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Threat Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold capitalize">{threatLevel}</div>
                      <p className="text-sm text-muted-foreground">System Status: Protected</p>
                    </div>
                    
                    <Badge className={
                      threatLevel === 'critical' ? "bg-red-500" :
                      threatLevel === 'high' ? "bg-orange-500" :
                      threatLevel === 'medium' ? "bg-amber-500" :
                      "bg-green-500"
                    }>
                      {threatLevel === 'critical' ? "CRITICAL" :
                       threatLevel === 'high' ? "HIGH" :
                       threatLevel === 'medium' ? "MEDIUM" :
                       "LOW"}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">No active threats detected</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">PQC algorithms up to date</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    View Threat Analytics
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Cryptographic Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <KeyRound className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">ML-KEM (Kyber)</span>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">SLH-DSA (Dilithium)</span>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">TPM/HSM Integration</span>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Key Rotation</span>
                    </div>
                    <Badge variant="outline">30 days</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <KeyRound className="mr-2 h-4 w-4" />
                    Manage Keys
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassContainer className="p-4">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-accent" />
                  Recent Activity
                </h3>
                
                <div className="space-y-3">
                  {[
                    { action: "Key Generation", time: "10 minutes ago", status: "success" },
                    { action: "Message Encryption", time: "30 minutes ago", status: "success" },
                    { action: "Authentication", time: "1 hour ago", status: "success" },
                    { action: "Signature Verification", time: "2 hours ago", status: "warning" },
                    { action: "System Update", time: "1 day ago", status: "success" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2">
                        {activity.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : activity.status === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">{activity.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" size="sm" className="mt-2 w-full">
                  View All Activity
                </Button>
              </GlassContainer>
              
              <GlassContainer className="p-4">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <BarChart className="h-5 w-5 text-accent" />
                  Security Metrics
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Post-Quantum Readiness</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hardware Security</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Authentication Strength</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Zero-Trust Implementation</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                
                <Alert className="mt-4 bg-accent/10 border-accent/20">
                  <Shield className="h-4 w-4" />
                  <AlertTitle>NIST Compliance</AlertTitle>
                  <AlertDescription className="text-xs">
                    Your system is fully compliant with NIST FIPS 205/206 post-quantum cryptography standards.
                  </AlertDescription>
                </Alert>
              </GlassContainer>
            </div>
          </TabsContent>

          <TabsContent value="ai-monitoring">
            <AISecurityMonitoring />
          </TabsContent>

          <TabsContent value="hardware">
            <HardwareSecurityManager />
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
    </MainLayout>
  );
};

export default SecurityMonitoring;
