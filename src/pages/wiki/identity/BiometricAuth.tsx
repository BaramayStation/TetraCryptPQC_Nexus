
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Fingerprint } from 'lucide-react';

const BiometricAuth: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Fingerprint className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Identity</Badge>
          </div>
          <h1 className="text-3xl font-bold">Biometric Authentication</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-secure biometric identity verification
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Biometric Security</h2>
            <p>
              TetraCryptPQC enhances biometric authentication with post-quantum cryptography
              to create a multi-layered, quantum-resistant authentication system.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default BiometricAuth;
