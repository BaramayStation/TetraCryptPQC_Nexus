
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Shield } from 'lucide-react';

const MilitarySecurity: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Military</Badge>
          </div>
          <h1 className="text-3xl font-bold">Military Security</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum cryptographic protection for defense systems
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Military Security Overview</h2>
            <p>
              TetraCryptPQC provides defense-grade security solutions with quantum-resistant
              cryptography, ensuring protection for classified communications, C2 systems,
              and operational security across military environments.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default MilitarySecurity;
