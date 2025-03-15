
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Check, Shield } from 'lucide-react';

const ComplianceFrameworks: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Enterprise</Badge>
          </div>
          <h1 className="text-3xl font-bold">Compliance Frameworks</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum cryptography compliance and regulatory frameworks
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Regulatory Compliance</h2>
            <p>
              TetraCryptPQC enables enterprises to meet regulatory requirements including
              NIST FIPS 205/206, NSA's CNSA 2.0, and FIPS 140-3 security standards, ensuring
              future-proof compliance in a post-quantum world.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default ComplianceFrameworks;
