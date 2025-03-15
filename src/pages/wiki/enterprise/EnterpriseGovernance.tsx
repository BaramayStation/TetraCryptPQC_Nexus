
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Building } from 'lucide-react';

const EnterpriseGovernance: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Enterprise</Badge>
          </div>
          <h1 className="text-3xl font-bold">Enterprise Governance</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum cryptographic governance for enterprise security
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Governance Overview</h2>
            <p>
              TetraCryptPQC provides comprehensive governance frameworks to manage
              cryptographic transitions, key lifecycles, and security policies across
              the enterprise, ensuring smooth migration to post-quantum security.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default EnterpriseGovernance;
