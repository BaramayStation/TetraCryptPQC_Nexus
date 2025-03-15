
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock,
  AlertTriangle, 
  Check,
  Cpu,
  FileKey
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const NexusSecurityPanel: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatLevel, setThreatLevel] = useState<'none' | 'low' | 'medium' | 'high'>('none');
  const [lastScanTime, setLastScanTime] = useState<string>('Never');
  
  const handleScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning with ML-KEM and SLH-DSA
    for (let i = 0; i <= 100; i += 5) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsScanning(false);
    setThreatLevel('none');
    setLastScanTime(new Date().toLocaleTimeString());
    
    toast({
      title: "Quantum Security Scan Complete",
      description: "No quantum vulnerabilities detected in your system.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Quantum Security Center
          </CardTitle>
          <CardDescription>
            Enterprise-grade post-quantum cryptography protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {isScanning ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Scanning for quantum vulnerabilities...</p>
                  <span className="text-xs">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} />
                <p className="text-xs text-muted-foreground mt-2">
                  AI is analyzing your system for post-quantum vulnerabilities
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Quantum Threat Level</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on AI analysis</p>
                  </div>
                  <Badge 
                    variant={
                      threatLevel === 'none' ? "outline" : 
                      threatLevel === 'low' ? "secondary" :
                      threatLevel === 'medium' ? "default" : "destructive"
                    }
                  >
                    {threatLevel === 'none' ? 'None Detected' : 
                    threatLevel === 'low' ? 'Low' :
                    threatLevel === 'medium' ? 'Medium' : 'High'}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Quantum Resistance Score</p>
                  <div className="flex items-center mt-2">
                    <Progress value={98} className="h-2 flex-1" />
                    <span className="text-xs ml-2">98%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Excellent quantum-resistant security with ML-KEM-1024
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Last Scan</p>
                  <p className="text-xs text-muted-foreground mt-1">{lastScanTime}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Active Protection Status</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">ML-KEM-1024 Encryption</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">SLH-DSA/Dilithium Signatures</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">AI Quantum Threat Detection</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">zk-STARK Proof Verification</span>
                    </div>
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
            {isScanning ? 'Scanning...' : 'Run Quantum Security Scan'}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">PQC Algorithms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileKey className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">ML-KEM-1024</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileKey className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">SLH-DSA (Dilithium5)</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileKey className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Falcon-1024</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileKey className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">BIKE-L3</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Unusual key rotation pattern</span>
                </div>
                <Badge variant="outline">Resolved by AI</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">All systems secure</span>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">AI key rotation completed</span>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm">PQC library updated</span>
                </div>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NexusSecurityPanel;
