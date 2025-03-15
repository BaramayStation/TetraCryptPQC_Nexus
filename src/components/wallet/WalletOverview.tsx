
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Terminal } from 'lucide-react';

interface WalletOverviewProps {
  walletAddress: string;
  securityScore: number;
  aiSecurityStatus: 'active' | 'inactive' | 'learning';
}

const WalletOverview: React.FC<WalletOverviewProps> = ({
  walletAddress,
  securityScore,
  aiSecurityStatus
}) => {
  return (
    <Card className="secure-panel">
      <CardHeader className="pb-2 secure-panel-header">
        <Lock className="h-4 w-4 mr-2 text-primary" />
        <CardTitle className="text-sm font-mono">QUANTUM-SECURE WALLET</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium mb-1">WALLET ADDRESS</p>
            <div className="bg-muted/30 border border-border/50 rounded p-2 font-mono text-xs break-all">
              {walletAddress}
            </div>
          </div>
          
          <Separator className="bg-border/50" />
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium">SECURITY SCORE</p>
              <span className="text-xs">{securityScore}%</span>
            </div>
            <Progress value={securityScore} className="h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">
              {securityScore > 80 ? 'Quantum-resistant encryption active' : 
               securityScore > 60 ? 'Standard security measures in place' : 
               'Security improvements recommended'}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-2">AI SECURITY STATUS</p>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              <Badge 
                variant={aiSecurityStatus === 'active' ? "outline" : "secondary"}
                className={`text-xs ${aiSecurityStatus === 'active' ? 'bg-secure/10 text-secure border-secure/30' : ''}`}
              >
                {aiSecurityStatus === 'active' ? 'ACTIVE' : 
                 aiSecurityStatus === 'learning' ? 'LEARNING' : 'INACTIVE'}
              </Badge>
              
              {aiSecurityStatus === 'active' && (
                <span className="ml-2 text-xs text-muted-foreground">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-secure animate-pulse mr-1"></span>
                  Protected
                </span>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-2">CRYPTOGRAPHIC ALGORITHMS</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <div className="flex items-center">
                <Terminal className="h-3 w-3 text-primary mr-2" />
                <span className="text-xs">ML-KEM-1024</span>
              </div>
              <div className="flex items-center">
                <Terminal className="h-3 w-3 text-primary mr-2" />
                <span className="text-xs">ML-DSA-87</span>
              </div>
              <div className="flex items-center">
                <Terminal className="h-3 w-3 text-primary mr-2" />
                <span className="text-xs">Falcon-1024</span>
              </div>
              <div className="flex items-center">
                <Terminal className="h-3 w-3 text-primary mr-2" />
                <span className="text-xs">AES-256-GCM</span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/20 border border-secure/20 rounded p-2 text-xs">
            <div className="flex items-start">
              <Shield className="h-4 w-4 text-secure mr-2 flex-shrink-0" />
              <span className="text-secure">
                This wallet implements NIST FIPS 205/206 compliant post-quantum cryptography, 
                protecting your assets against both classical and quantum computing attacks.
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletOverview;
