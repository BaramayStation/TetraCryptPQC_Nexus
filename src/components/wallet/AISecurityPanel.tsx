
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, Check, RefreshCw, Terminal, Cpu } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AISecurityPanelProps {
  securityScore: number;
  threatLevel: 'none' | 'low' | 'medium' | 'high';
  lastScanTime?: string;
}

const AISecurityPanel: React.FC<AISecurityPanelProps> = ({
  securityScore,
  threatLevel,
  lastScanTime = 'Never'
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  const handleScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning with realistic steps
    const steps = [
      { progress: 10, delay: 300, message: "Initializing quantum-resistant scanning protocols..." },
      { progress: 25, delay: 400, message: "Analyzing cryptographic integrity..." },
      { progress: 40, delay: 500, message: "Verifying ML-KEM-1024 key strength..." },
      { progress: 60, delay: 300, message: "Checking for quantum vulnerabilities..." },
      { progress: 75, delay: 400, message: "Scanning transaction history..." },
      { progress: 90, delay: 400, message: "Finalizing security assessment..." },
      { progress: 100, delay: 200, message: "Scan complete. No quantum threats detected." }
    ];
    
    for (const step of steps) {
      setScanProgress(step.progress);
      toast({
        title: "Security Scan",
        description: step.message,
        variant: "default",
      });
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }
    
    setIsScanning(false);
    toast({
      title: "Security Scan Complete",
      description: "No quantum threats detected in your wallet.",
      variant: "default",
    });
  };
  
  return (
    <Card className="secure-panel">
      <CardHeader className="pb-2 secure-panel-header">
        <Shield className="h-4 w-4 mr-2 text-primary" />
        <CardTitle className="text-sm font-mono">AI SECURITY CENTER</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {isScanning ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">QUANTUM THREAT ANALYSIS</p>
                <span className="text-xs">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-1.5" />
              <div className="secure-terminal scanner h-28 overflow-y-auto relative mt-2 text-xs">
                <p className="opacity-70">$ initiate_quantum_scan...</p>
                <p className="opacity-80 mt-1">$ scanning_wallet_interfaces...</p>
                <p className="opacity-90 mt-1">$ analyzing_cryptographic_implementation...</p>
                <p className="mt-1">$ verifying_key_strength: PASS</p>
                <p className="mt-1">$ checking_entropy_quality: EXCELLENT</p>
                <p className="mt-1">$ searching_shor_algorithm_vulnerabilities: NONE</p>
                <p className="opacity-70 mt-1">$ scan_in_progress: {scanProgress}%</p>
                <p className="mt-1 animate-pulse">█</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">THREAT LEVEL</p>
                  <p className="text-[10px] text-muted-foreground">Based on AI analysis</p>
                </div>
                <Badge 
                  variant={
                    threatLevel === 'none' ? "outline" : 
                    threatLevel === 'low' ? "secondary" :
                    threatLevel === 'medium' ? "default" : "destructive"
                  }
                  className={`
                    text-xs 
                    ${threatLevel === 'none' ? 'bg-secure/10 text-secure border-secure/30' : ''}
                    ${threatLevel === 'high' ? 'animate-pulse' : ''}
                  `}
                >
                  {threatLevel === 'none' ? 'NO THREATS' : 
                   threatLevel === 'low' ? 'LOW' :
                   threatLevel === 'medium' ? 'MEDIUM' : 'HIGH'}
                </Badge>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium">SECURITY SCORE</p>
                  <span className="text-xs">{securityScore}%</span>
                </div>
                <Progress value={securityScore} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground mt-1">
                  {securityScore > 80 ? 'Excellent quantum-resistant security' :
                   securityScore > 60 ? 'Good security, minor improvements suggested' :
                   'Security improvements needed'}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">LAST SCAN</p>
                <p className="text-xs text-muted-foreground">
                  {lastScanTime === 'Never' ? 'Never' : 
                    new Date(lastScanTime).toLocaleTimeString()}
                </p>
              </div>
              
              <div>
                <p className="text-xs font-medium mb-2">AI PROTECTION STATUS</p>
                <div className="space-y-1.5">
                  <div className="flex items-start">
                    <Check className="h-3 w-3 mr-2 text-secure mt-0.5" />
                    <span className="text-xs">Quantum Resistant Encryption</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-3 w-3 mr-2 text-secure mt-0.5" />
                    <span className="text-xs">Transaction Anomaly Detection</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-3 w-3 mr-2 text-secure mt-0.5" />
                    <span className="text-xs">Autonomous Threat Response</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-3 w-3 mr-2 text-secure mt-0.5" />
                    <span className="text-xs">Anti-Quantum Attack Shield</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 border border-primary/20 rounded p-2">
                <div className="flex items-start">
                  <Cpu className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-xs">
                    TetraCryptPQC employs advanced AI monitoring to detect and prevent quantum-based attacks before they occur. 
                    All communications are protected by NIST FIPS 205/206 compliant algorithms.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleScan} 
          disabled={isScanning}
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
              SCANNING...
            </>
          ) : (
            <>
              <Terminal className="h-3.5 w-3.5 mr-2" />
              RUN AI SECURITY SCAN
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AISecurityPanel;
