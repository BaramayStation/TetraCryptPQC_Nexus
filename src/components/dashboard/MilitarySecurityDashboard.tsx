
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  BarChart, 
  Radar, 
  Zap,
  Activity,
  Server,
  Scan,
  UserCheck,
  Clock,
  Radio,
  Lock as LockIcon
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ThreatDetectionResult } from "@/lib/ai-security.d";
import { checkHardwareSecurityCapabilities } from "@/lib/secure-infrastructure";
import { 
  LineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RadarComponent
} from 'recharts';

// Random data generator for demo
const generateSecurityData = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    return {
      date: date.toLocaleDateString(),
      threats: Math.floor(Math.random() * 5),
      mitigated: Math.floor(Math.random() * 5),
      securityScore: 85 + Math.floor(Math.random() * 15),
    };
  });
};

const radarData = [
  { subject: 'Key Strength', A: 100, fullMark: 100 },
  { subject: 'Zero-Trust', A: 95, fullMark: 100 },
  { subject: 'Quantum Resistance', A: 90, fullMark: 100 },
  { subject: 'HSM Protection', A: 85, fullMark: 100 },
  { subject: 'Anti-Spoofing', A: 95, fullMark: 100 },
  { subject: 'Confidential AI', A: 80, fullMark: 100 },
];

const threatIntelData = [
  { name: 'Shor Attack', value: 15, status: 'mitigated', description: 'Quantum factorization attack against RSA' },
  { name: 'Side Channel', value: 25, status: 'active', description: 'Timing attack against implementation' },
  { name: 'Grover Attack', value: 10, status: 'mitigated', description: 'Quantum search against symmetric keys' },
  { name: 'ML Model Attack', value: 45, status: 'active', description: 'Adversarial against AI models' },
  { name: 'Credential Theft', value: 30, status: 'active', description: 'Attempt to steal auth tokens' },
  { name: 'Replay Attack', value: 5, status: 'mitigated', description: 'Message reuse in network traffic' },
];

const MilitarySecurityDashboard: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatDetection, setThreatDetection] = useState<ThreatDetectionResult | null>(null);
  const [securityLevel, setSecurityLevel] = useState<'amber' | 'green' | 'red'>('green');
  const [securityScore, setSecurityScore] = useState(95);
  const [securityData] = useState(() => generateSecurityData(7));
  const [alertCount, setAlertCount] = useState({ critical: 0, high: 2, medium: 3, low: 5 });
  const [tpmStatus, setTpmStatus] = useState<'active' | 'inactive' | 'checking'>('checking');
  const [sgxStatus, setSgxStatus] = useState<'active' | 'inactive' | 'checking'>('checking');
  const [systemStatus, setSystemStatus] = useState<'normal' | 'degraded' | 'compromised'>('normal');
  
  // Current time for the military clock
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Initialize hardware security check
  useEffect(() => {
    const checkHardwareSecurity = async () => {
      try {
        const capabilities = await checkHardwareSecurityCapabilities();
        setTpmStatus(capabilities.tpmAvailable ? 'active' : 'inactive');
        setSgxStatus(capabilities.sgxAvailable ? 'active' : 'inactive');
      } catch (error) {
        console.error("Error checking hardware security:", error);
        setTpmStatus('inactive');
        setSgxStatus('inactive');
      }
    };
    
    checkHardwareSecurity();
    
    // Update clock every second
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Simulate changing security level occasionally
    const securityInterval = setInterval(() => {
      // 85% chance to stay green, 10% amber, 5% red
      const random = Math.random();
      if (random > 0.95) {
        setSecurityLevel('red');
        toast({
          title: "SECURITY ALERT",
          description: "Critical security anomaly detected. System on high alert.",
          variant: "destructive",
        });
      } else if (random > 0.85) {
        setSecurityLevel('amber');
        toast({
          title: "Security Warning",
          description: "Potential security anomaly detected. Increased monitoring activated.",
          variant: "default",
        });
      } else {
        setSecurityLevel('green');
      }
    }, 30000); // Every 30 seconds
    
    return () => {
      clearInterval(clockInterval);
      clearInterval(securityInterval);
    };
  }, []);
  
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
      // Simulate security scan
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock threats
      const mockThreats = Math.random() > 0.7 ? [{
        id: crypto.randomUUID(),
        severity: Math.random() > 0.5 ? 'medium' : 'low',
        description: 'Anomalous cryptographic operation detected',
        timestamp: new Date().toISOString(),
        indicators: ['Unusual API access pattern', 'Elevated memory usage'],
        mitigationSteps: ['Verify user identity', 'Review recent cryptographic operations']
      }] : [];
      
      // Generate mock threat detection result
      const result: ThreatDetectionResult = {
        detected: mockThreats.length > 0,
        score: mockThreats.length > 0 ? 40 + Math.random() * 20 : 5 + Math.random() * 10,
        threats: mockThreats,
        recommendation: mockThreats.length > 0 
          ? 'Investigate the anomalous activity and verify all recent cryptographic operations.' 
          : 'No action required. System secure.'
      };
      
      // Update state with detection results
      setTimeout(() => {
        setThreatDetection(result);
        setIsScanning(false);
        
        if (result.detected) {
          toast({
            title: `Security Anomaly Detected`,
            description: `Severity: ${result.threats[0].severity}. Investigate immediately.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Security Scan Complete",
            description: "No anomalies detected. Security posture secure.",
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
      {/* Military-style header with security status */}
      <div className="border-b pb-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              securityLevel === 'green' ? 'bg-green-900/20 text-green-500' :
              securityLevel === 'amber' ? 'bg-yellow-900/20 text-yellow-500' :
              'bg-red-900/20 text-red-500'
            }`}>
              <Shield className="h-8 w-8" />
            </div>
            
            <div>
              <h1 className="text-2xl font-mono tracking-tight uppercase flex items-center gap-2">
                TetraCrypt Command Center
                <Badge className={
                  securityLevel === 'green' ? 'bg-green-500' :
                  securityLevel === 'amber' ? 'bg-yellow-500' :
                  'bg-red-500 animate-pulse'
                }>
                  {securityLevel === 'green' ? 'SECURE' :
                   securityLevel === 'amber' ? 'ALERT' :
                   'CRITICAL'}
                </Badge>
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                SECURE OPERATIONS PLATFORM · PQC PROTECTED · LEVEL 5 CLEARANCE
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-background/50 p-2 rounded border font-mono text-sm">
              <Clock className="h-4 w-4 inline mr-2" />
              <span>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-muted-foreground">{currentTime.toLocaleDateString()}</span>
            </div>
            
            <Button onClick={performSecurityScan} disabled={isScanning} variant="destructive">
              {isScanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  SCANNING...
                </>
              ) : (
                <>
                  <Scan className="mr-2 h-4 w-4" />
                  SECURITY SCAN
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {isScanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-mono">
            <span>DEEP SECURITY SCAN IN PROGRESS</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="h-2" />
        </div>
      )}
      
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column - System Status */}
        <div className="space-y-4">
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono uppercase tracking-wider flex items-center justify-between">
                <span>System Status</span>
                <Badge className={
                  systemStatus === 'normal' ? 'bg-green-500' :
                  systemStatus === 'degraded' ? 'bg-yellow-500' :
                  'bg-red-500'
                }>
                  {systemStatus.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <div className="text-xs font-mono flex justify-between">
                    <span>TPM/SGX</span>
                    <Badge variant="outline" className={
                      tpmStatus === 'active' || sgxStatus === 'active' ? 'text-green-500 border-green-500' :
                      tpmStatus === 'checking' ? 'text-yellow-500 border-yellow-500' :
                      'text-red-500 border-red-500'
                    }>
                      {tpmStatus === 'active' || sgxStatus === 'active' ? 'ACTIVE' :
                       tpmStatus === 'checking' ? 'CHECKING' :
                       'INACTIVE'}
                    </Badge>
                  </div>
                  <Progress value={tpmStatus === 'active' || sgxStatus === 'active' ? 100 : 0} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-mono flex justify-between">
                    <span>KEY SECURITY</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      STRONG
                    </Badge>
                  </div>
                  <Progress value={95} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-mono flex justify-between">
                    <span>QUANTUM RESISTANCE</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      ACTIVE
                    </Badge>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-mono flex justify-between">
                    <span>STARKNET ZK-VM</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      ONLINE
                    </Badge>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
              </div>
              
              <Alert className="py-2">
                <Radio className="h-4 w-4 text-green-500 animate-pulse" />
                <AlertTitle className="text-xs font-mono">SECURE COMMS ACTIVE</AlertTitle>
                <AlertDescription className="text-xs">
                  All communications protected by ML-KEM-1024
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono uppercase tracking-wider">
                Hardware Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className={`border rounded p-3 flex flex-col items-center ${
                  tpmStatus === 'active' ? 'border-green-500 bg-green-500/5' : 
                  'border-red-500 bg-red-500/5'
                }`}>
                  <span className="text-xs font-mono mb-1">TPM MODULE</span>
                  {tpmStatus === 'active' ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  )}
                  <span className="text-xs mt-1">
                    {tpmStatus === 'active' ? 'ACTIVE' : 'NOT DETECTED'}
                  </span>
                </div>
                
                <div className={`border rounded p-3 flex flex-col items-center ${
                  sgxStatus === 'active' ? 'border-green-500 bg-green-500/5' : 
                  'border-red-500 bg-red-500/5'
                }`}>
                  <span className="text-xs font-mono mb-1">INTEL SGX</span>
                  {sgxStatus === 'active' ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  )}
                  <span className="text-xs mt-1">
                    {sgxStatus === 'active' ? 'ACTIVE' : 'NOT DETECTED'}
                  </span>
                </div>
              </div>
              
              <div className="border rounded p-3">
                <div className="text-xs font-mono mb-2 flex justify-between">
                  <span>CONFIDENTIAL CONTAINERS</span>
                  <Badge className="bg-green-500">3 ACTIVE</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>pqc-auth-service</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">SECURE</Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>pqc-messaging-service</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">SECURE</Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>pqc-key-management-service</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">SECURE</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle column - Main visualization */}
        <div className="space-y-4 md:col-span-2">
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono uppercase tracking-wider">
                Security Posture Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <RadarComponent name="Security" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono uppercase tracking-wider">
                  Threat Intelligence Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-64 overflow-y-auto space-y-2 pt-0">
                {threatIntelData.map((threat, index) => (
                  <div key={index} className="border rounded p-2 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold">{threat.name}</div>
                      <div className="text-xs text-muted-foreground">{threat.description}</div>
                    </div>
                    <Badge className={threat.status === 'mitigated' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {threat.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono uppercase tracking-wider">
                  Alert Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono">CRITICAL ALERTS</span>
                    <Badge className={alertCount.critical > 0 ? 'bg-red-500' : ''}>
                      {alertCount.critical}
                    </Badge>
                  </div>
                  <Progress 
                    value={alertCount.critical > 0 ? 100 : 0} 
                    className={`h-1 ${alertCount.critical > 0 ? 'bg-red-500' : ''}`}
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono">HIGH ALERTS</span>
                    <Badge className={alertCount.high > 0 ? 'bg-orange-500' : ''}>
                      {alertCount.high}
                    </Badge>
                  </div>
                  <Progress 
                    value={alertCount.high > 0 ? 100 : 0} 
                    className={`h-1 ${alertCount.high > 0 ? 'bg-orange-500' : ''}`}
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono">MEDIUM ALERTS</span>
                    <Badge className={alertCount.medium > 0 ? 'bg-yellow-500' : ''}>
                      {alertCount.medium}
                    </Badge>
                  </div>
                  <Progress 
                    value={alertCount.medium > 0 ? 100 : 0} 
                    className={`h-1 ${alertCount.medium > 0 ? 'bg-yellow-500' : ''}`}
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono">LOW ALERTS</span>
                    <Badge className={alertCount.low > 0 ? 'bg-blue-500' : ''}>
                      {alertCount.low}
                    </Badge>
                  </div>
                  <Progress 
                    value={alertCount.low > 0 ? 100 : 0} 
                    className={`h-1 ${alertCount.low > 0 ? 'bg-blue-500' : ''}`}
                  />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full text-xs">
                    VIEW ALL ALERTS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Additional security information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider">
              Post-Quantum Encryption Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LockIcon className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">ML-KEM-1024</span>
              </div>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LockIcon className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">SLH-DSA</span>
              </div>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LockIcon className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">FALCON-1024</span>
              </div>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LockIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-mono">BIKE</span>
              </div>
              <Badge>STANDBY</Badge>
            </div>
            
            <div className="pt-2">
              <Button size="sm" className="w-full text-xs">
                ROTATE ENCRYPTION KEYS
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider">
              Zero-Trust Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">zk-STARK IDENTITY</span>
              </div>
              <Badge className="bg-green-500">VERIFIED</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">STARKNET ID</span>
              </div>
              <Badge className="bg-green-500">VERIFIED</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">QUANTUM MFA</span>
              </div>
              <Badge className="bg-green-500">ENFORCED</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">HARDWARE BINDING</span>
              </div>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
            
            <div className="pt-2">
              <Button size="sm" className="w-full text-xs">
                VERIFY IDENTITY
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-wider">
              AI Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">ANOMALY DETECTION</span>
              </div>
              <Badge className="bg-green-500">MONITORING</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">THREAT PREDICTION</span>
              </div>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">QUANTUM ATTACK DETECTION</span>
              </div>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono">HOMOMORPHIC ENCRYPTION</span>
              </div>
              <Badge>STANDBY</Badge>
            </div>
            
            <div className="pt-2">
              <Button size="sm" variant="outline" className="w-full text-xs">
                VIEW AI SECURITY DETAILS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MilitarySecurityDashboard;
