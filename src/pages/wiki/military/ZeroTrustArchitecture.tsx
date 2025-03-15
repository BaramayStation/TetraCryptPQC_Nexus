
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { KeyRound } from 'lucide-react';

const ZeroTrustArchitecture: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <KeyRound className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Military</Badge>
          </div>
          <h1 className="text-3xl font-bold">Zero Trust Architecture</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum zero trust security framework for defense systems
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Zero Trust Architecture Overview</h2>
            <p>
              TetraCryptPQC implements quantum-resistant zero trust principles,
              requiring continuous verification for all users and systems regardless of
              location, ensuring defense against advanced persistent threats and quantum attacks.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default ZeroTrustArchitecture;
