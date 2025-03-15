
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, Check } from 'lucide-react';
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
    
    // Simulate scanning
    for (let i = 0; i <= 100; i += 5) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsScanning(false);
    toast({
      title: "Security Scan Complete",
      description: "No quantum threats detected in your wallet.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-primary" />
          AI Security Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isScanning ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Scanning for threats...</p>
                <span className="text-xs">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} />
              <p className="text-xs text-muted-foreground mt-2">
                AI is analyzing your wallet for post-quantum vulnerabilities
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Threat Level</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on AI analysis</p>
                </div>
                <Badge 
                  variant={
                    threatLevel === 'none' ? "outline" : 
                    threatLevel === 'low' ? "secondary" :
                    threatLevel === 'medium' ? "default" : "destructive"
                  }
                >
                  {threatLevel === 'none' ? 'No Threats' : 
                   threatLevel === 'low' ? 'Low' :
                   threatLevel === 'medium' ? 'Medium' : 'High'}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium">Security Score</p>
                <div className="flex items-center mt-2">
                  <Progress value={securityScore} className="h-2 flex-1" />
                  <span className="text-xs ml-2">{securityScore}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {securityScore > 80 ? 'Excellent quantum-resistant security' :
                   securityScore > 60 ? 'Good security, minor improvements suggested' :
                   'Security improvements needed'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Last Scan</p>
                <p className="text-xs text-muted-foreground mt-1">{lastScanTime}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">AI Protection Status</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Quantum Resistant Encryption</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Transaction Anomaly Detection</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Autonomous Threat Response</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Anti-Quantum Attack Shield</span>
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
          {isScanning ? 'Scanning...' : 'Run AI Security Scan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AISecurityPanel;
