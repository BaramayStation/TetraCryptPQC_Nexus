
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlassContainer } from "@/components/ui/glass-container";
import { 
  Shield, 
  AlertCircle, 
  Eye, 
  Cpu, 
  Lock, 
  RefreshCw, 
  Server, 
  Database, 
  NetworkIcon, 
  CheckCircle, 
  XCircle, 
  FileText, 
  BarChart3,
  Target
} from "lucide-react";
import { scanForThreats } from "@/lib/pqcrypto";
import { getUserProfile } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import AISecurityMonitoringDashboard from '@/components/security/AISecurityMonitoringDashboard';
import KeyGenerationService from '@/components/security/KeyGenerationService';

// Interface for threat data
interface Threat {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  source: string;
  timestamp: string;
  indicators: string[];
  mitigationSteps: string[];
  status: 'active' | 'mitigated' | 'investigating';
}

const SecurityMonitoring: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  const [threatData, setThreatData] = useState<Threat[]>([]);
  const [securityScore, setSecurityScore] = useState(92);
  const [systemStatus, setSystemStatus] = useState<'normal' | 'alert' | 'critical'>('normal');

  // Initialize with simulated threat data
  useEffect(() => {
    // Simulate some initial threat data
    const initialThreats: Threat[] = [
      {
        id: "threat-1",
        severity: "medium",
        description: "Unusual authentication pattern detected",
        source: "Auth Service",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        indicators: ["Multiple failed login attempts", "Access from unusual geolocation"],
        mitigationSteps: ["Enable multi-factor authentication", "Review access logs"],
        status: "investigating"
      },
      {
        id: "threat-2",
        severity: "low",
        description: "Outdated cryptographic library detected",
        source: "Component Scan",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        indicators: ["Vulnerable to CVE-2023-12345", "Using deprecated ML-KEM parameters"],
        mitigationSteps: ["Update library to latest version", "Regenerate cryptographic keys"],
        status: "mitigated"
      }
    ];

    setThreatData(initialThreats);
    setLastScanTime(new Date(Date.now() - 7200000)); // 2 hours ago
  }, []);

  const performSecurityScan = async () => {
    try {
      setIsScanning(true);
      setScanProgress(0);
      
      // Simulate progressive scan
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 200);
      
      // Get user profile
      const userProfile = getUserProfile();
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      
      // Prepare security data to scan
      const securityData = {
        userId: userProfile.id,
        systems: ["cryptographic-engine", "key-management", "secure-messaging", "identity-verification"],
        timestamp: new Date().toISOString(),
        environment: "production-simulation",
      };
      
      // Perform actual threat detection
      const scanResults = await scanForThreats(JSON.stringify(securityData));
      
      // Process results
      setTimeout(() => {
        clearInterval(interval);
        setScanProgress(100);
        
        // Add a random new threat with 30% probability
        if (Math.random() < 0.3) {
          const newThreat: Threat = {
            id: `threat-${Date.now()}`,
            severity: Math.random() < 0.2 ? "high" : "medium",
            description: "Potential quantum algorithm vulnerability detected",
            source: "Quantum Security Monitor",
            timestamp: new Date().toISOString(),
            indicators: [
              "Lattice-based crypto implementation weakness", 
              "Parameter selection suboptimal for quantum resistance"
            ],
            mitigationSteps: [
              "Update to latest FIPS 205 compliant parameters",
              "Regenerate affected cryptographic keys"
            ],
            status: "active"
          };
          
          setThreatData(prev => [newThreat, ...prev]);
          
          setSystemStatus('alert');
          setSecurityScore(Math.max(securityScore - Math.floor(Math.random() * 5) - 3, 65));
          
          toast({
            title: "Security Alert",
            description: "New potential threat detected during scan",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Security Scan Complete",
            description: "No new threats detected",
          });
        }
        
        setLastScanTime(new Date());
        setIsScanning(false);
      }, 3000);
      
    } catch (error) {
      console.error("Security scan failed:", error);
      setIsScanning(false);
      setScanProgress(0);
      
      toast({
        title: "Scan Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-muted';
    }
  };

  return (
    <MainLayout>
      <div className="py-4 px-8 bg-card border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-full">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Security Operations Center</h1>
              <p className="text-muted-foreground text-sm">Military-Grade Threat Detection & Response</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 animate-pulse">
              <Lock className="h-3.5 w-3.5 mr-1" />
              NIST FIPS 205/206 Compliant
            </Badge>
            <Button 
              onClick={performSecurityScan} 
              disabled={isScanning}
              className="bg-accent hover:bg-accent/90"
              size="sm"
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
        </div>
      </div>
      
      {isScanning && (
        <div className="p-4 border-b bg-muted/30">
          <div className="container">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center text-accent font-medium">
                  <Cpu className="h-4 w-4 mr-2 animate-pulse" />
                  Post-Quantum Security Analysis in Progress
                </span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          </div>
        </div>
      )}
      
      <div className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-muted/50 p-1">
            <TabsTrigger 
              value="dashboard"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Shield className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="analysis"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Threat Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="monitoring"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Eye className="h-4 w-4 mr-2" />
              AI Monitoring
            </TabsTrigger>
            <TabsTrigger 
              value="key-management"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Key className="h-4 w-4 mr-2" />
              Key Management
            </TabsTrigger>
            <TabsTrigger 
              value="compliance"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              Compliance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-accent" />
                      Security Score
                    </span>
                    <Badge 
                      className={
                        securityScore > 90 ? "bg-green-500" : 
                        securityScore > 75 ? "bg-yellow-500" : 
                        "bg-red-500"
                      }
                    >
                      {securityScore}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={securityScore} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {securityScore > 90 
                        ? "Excellent security posture" 
                        : securityScore > 75 
                          ? "Good security posture with room for improvement" 
                          : "Security vulnerabilities detected"
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-accent" />
                    Threat Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Threats</span>
                      <Badge>
                        {threatData.filter(t => t.status === 'active').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Under Investigation</span>
                      <Badge variant="outline">
                        {threatData.filter(t => t.status === 'investigating').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Scan</span>
                      <span className="text-xs">
                        {lastScanTime ? `${Math.floor((Date.now() - lastScanTime.getTime()) / 60000)} minutes ago` : 'Never'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-accent" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Crypto Engine</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Key Management</span>
                      <Badge className="bg-green-500">Protected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">StarkNet Auth</span>
                      <Badge 
                        className={
                          systemStatus === 'normal' ? "bg-green-500" : 
                          systemStatus === 'alert' ? "bg-yellow-500" : 
                          "bg-red-500"
                        }
                      >
                        {systemStatus === 'normal' ? "Secure" : 
                          systemStatus === 'alert' ? "Alert" : 
                          "Critical"
                        }
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-accent" />
                      Active Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {threatData.length > 0 ? (
                      <div className="space-y-4">
                        {threatData.map(threat => (
                          <div 
                            key={threat.id} 
                            className={`p-3 border rounded-md ${
                              threat.status === 'active' ? 'border-red-300 bg-red-50/50' : 
                              threat.status === 'investigating' ? 'border-yellow-300 bg-yellow-50/50' : 
                              'border-green-300 bg-green-50/50'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getSeverityColor(threat.severity)}>
                                    {threat.severity.toUpperCase()}
                                  </Badge>
                                  <h3 className="font-medium">{threat.description}</h3>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Detected from {threat.source} at {new Date(threat.timestamp).toLocaleString()}
                                </div>
                              </div>
                              <Badge variant="outline">
                                {threat.status === 'active' ? 'Active' : 
                                 threat.status === 'investigating' ? 'Investigating' : 
                                 'Mitigated'}
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-xs font-medium">Indicators</div>
                                <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                                  {threat.indicators.map((indicator, i) => (
                                    <li key={i}>{indicator}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="text-xs font-medium">Mitigation</div>
                                <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                                  {threat.mitigationSteps.map((step, i) => (
                                    <li key={i}>{step}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Shield className="h-12 w-12 mx-auto mb-3" />
                        <p>No active threats detected</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-accent" />
                      System Protections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium">PQC Enabled</span>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 pl-6">
                        ML-KEM-1024 & SLH-DSA (FIPS 205/206)
                      </p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium">Zero Trust</span>
                        </div>
                        <Badge className="bg-green-500">Enforced</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 pl-6">
                        Continuous identity verification & least privilege
                      </p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium">Secure Hardware</span>
                        </div>
                        <Badge>Available</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 pl-6">
                        YubiKey, TPM & Secure Enclave support
                      </p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium">AI Security</span>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 pl-6">
                        Real-time threat detection & anomaly detection
                      </p>
                    </div>
                    
                    <Button className="w-full">
                      View Security Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <ThreatAnalysisViewer threats={threatData} />
          </TabsContent>
          
          <TabsContent value="monitoring">
            <AISecurityMonitoringDashboard />
          </TabsContent>
          
          <TabsContent value="key-management">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KeyGenerationService />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="h-5 w-5 mr-2 text-accent" />
                    Quantum-Safe Key Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-accent" />
                          <span className="font-medium">ML-KEM-1024</span>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="mt-1 grid grid-cols-2 text-xs">
                        <span className="text-muted-foreground">Created:</span>
                        <span>Yesterday</span>
                        <span className="text-muted-foreground">Last Rotation:</span>
                        <span>5 hours ago</span>
                        <span className="text-muted-foreground">Key ID:</span>
                        <span className="truncate">ml-kem-8a7f...</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-accent" />
                          <span className="font-medium">SLH-DSA-65</span>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="mt-1 grid grid-cols-2 text-xs">
                        <span className="text-muted-foreground">Created:</span>
                        <span>Yesterday</span>
                        <span className="text-muted-foreground">Last Rotation:</span>
                        <span>5 hours ago</span>
                        <span className="text-muted-foreground">Key ID:</span>
                        <span className="truncate">slh-dsa-ef93...</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-accent" />
                          <span className="font-medium">Falcon-1024</span>
                        </div>
                        <Badge variant="outline">Backup</Badge>
                      </div>
                      <div className="mt-1 grid grid-cols-2 text-xs">
                        <span className="text-muted-foreground">Created:</span>
                        <span>2 days ago</span>
                        <span className="text-muted-foreground">Last Rotation:</span>
                        <span>2 days ago</span>
                        <span className="text-muted-foreground">Key ID:</span>
                        <span className="truncate">falcon-29ab...</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rotate Keys
                    </Button>
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Keys
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance">
            <ComplianceReportView />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Threat Analysis Viewer Component
const ThreatAnalysisViewer: React.FC<{ threats: Threat[] }> = ({ threats }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'investigating' | 'mitigated'>('all');
  
  const filteredThreats = threats.filter(threat => {
    if (filter === 'all') return true;
    return threat.status === filter;
  });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-accent" />
            Advanced Threat Analysis
          </CardTitle>
          
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'active' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button 
              variant={filter === 'investigating' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter('investigating')}
            >
              Investigating
            </Button>
            <Button 
              variant={filter === 'mitigated' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter('mitigated')}
            >
              Mitigated
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredThreats.length > 0 ? (
          <div className="space-y-6">
            {filteredThreats.map(threat => (
              <div key={threat.id} className="border rounded-md overflow-hidden">
                <div className={`p-4 ${
                  threat.severity === 'critical' ? 'bg-red-500 text-white' :
                  threat.severity === 'high' ? 'bg-orange-500 text-white' :
                  threat.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500 text-white'
                }`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{threat.description}</h3>
                    <Badge className="bg-white text-black">
                      {threat.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm opacity-90 mt-1">
                    Detected: {new Date(threat.timestamp).toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Threat Details</h4>
                    <dl className="grid grid-cols-2 gap-y-2 text-sm">
                      <dt className="text-muted-foreground">Source:</dt>
                      <dd>{threat.source}</dd>
                      <dt className="text-muted-foreground">ID:</dt>
                      <dd>{threat.id}</dd>
                      <dt className="text-muted-foreground">Status:</dt>
                      <dd>
                        <Badge className={
                          threat.status === 'active' ? 'bg-red-500' :
                          threat.status === 'investigating' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }>
                          {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
                        </Badge>
                      </dd>
                    </dl>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Indicators</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {threat.indicators.map((indicator, i) => (
                          <li key={i} className="text-muted-foreground">{indicator}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Mitigation Steps</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {threat.mitigationSteps.map((step, i) => (
                          <li key={i} className="text-muted-foreground">{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted border-t flex justify-end">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Full Report
                    </Button>
                    {threat.status !== 'mitigated' && (
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No Threats Found</h3>
            <p className="text-muted-foreground">
              No threats match your current filter criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Compliance Report View Component
const ComplianceReportView: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-accent" />
            Compliance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-3">NIST Standards</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>FIPS 205 (ML-KEM)</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>FIPS 206 (SLH-DSA)</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>FIPS 140-3</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-3">Industry Standards</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>ISO 27001</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>SOC 2 Type II</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Common Criteria</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-3">Quantum Readiness</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Key Exchange</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Digital Signatures</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Legacy Compatibility</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-3">Recent Compliance Activities</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <div>FIPS 205 Compliance Certification Completed</div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <div>Quantum-Safety Audit Passed</div>
                  <div className="text-xs text-muted-foreground">1 week ago</div>
                </div>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <div>ISO 27001 Annual Assessment In Progress</div>
                  <div className="text-xs text-muted-foreground">Started 3 days ago</div>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full md:w-auto">
            <FileText className="h-4 w-4 mr-2" />
            Generate Compliance Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMonitoring;
