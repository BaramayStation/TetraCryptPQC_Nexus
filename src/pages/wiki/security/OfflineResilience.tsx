
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { CloudOff } from 'lucide-react';

const OfflineResilience: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <CloudOff className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Security</Badge>
          </div>
          <h1 className="text-3xl font-bold">Offline Resilience</h1>
          <p className="mt-2 text-muted-foreground">
            Maintaining security and functionality without network connectivity
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Offline Capabilities</h2>
            <p>
              TetraCryptPQC is designed to maintain operational security even when disconnected
              from the network, ensuring critical functionality remains available in adverse conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default OfflineResilience;
