
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { CheckCircle } from 'lucide-react';

const IdentityVerification: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Identity</Badge>
          </div>
          <h1 className="text-3xl font-bold">Identity Verification</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-resistant verification of digital identities
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Identity Verification Overview</h2>
            <p>
              TetraCryptPQC implements post-quantum cryptographic methods for securely
              verifying digital identities in both connected and offline environments.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default IdentityVerification;
