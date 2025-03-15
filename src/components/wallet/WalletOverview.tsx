
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

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
    <Card>
      <CardHeader>
        <CardTitle>Wallet Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Wallet Address</p>
            <p className="text-xs text-muted-foreground mt-1">{walletAddress}</p>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Security Score</p>
              <span className="text-xs">{securityScore}%</span>
            </div>
            <Progress value={securityScore} className="h-2 mt-2" />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">AI Security Status</p>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              <Badge variant={aiSecurityStatus === 'active' ? "outline" : "secondary"}>
                {aiSecurityStatus === 'active' ? 'Active' : 
                 aiSecurityStatus === 'learning' ? 'Learning' : 'Inactive'}
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium">Cryptographic Algorithms</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span className="text-xs">ML-KEM-1024</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span className="text-xs">SLH-DSA-Dilithium5</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span className="text-xs">Falcon-1024</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span className="text-xs">BIKE-L3</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletOverview;
