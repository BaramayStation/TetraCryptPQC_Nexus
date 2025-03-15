
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Lock } from 'lucide-react';

const BattlefieldEncryption: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Military</Badge>
          </div>
          <h1 className="text-3xl font-bold">Battlefield Encryption</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum encryption for tactical field operations
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Battlefield Encryption Overview</h2>
            <p>
              TetraCryptPQC provides high-performance encryption solutions for battlefield
              environments, securing communications, telemetry, sensor data, and command
              systems against both conventional and quantum adversaries.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default BattlefieldEncryption;
