
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Cloud } from 'lucide-react';

const CloudInfrastructure: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Enterprise</Badge>
          </div>
          <h1 className="text-3xl font-bold">Cloud Infrastructure</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum secure cloud infrastructure for enterprise deployments
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Cloud Infrastructure Overview</h2>
            <p>
              TetraCryptPQC provides secure cloud infrastructure solutions that are resistant
              to both classical and quantum computing threats. Our architecture ensures
              data-in-transit and data-at-rest protection with NIST-approved algorithms.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default CloudInfrastructure;
