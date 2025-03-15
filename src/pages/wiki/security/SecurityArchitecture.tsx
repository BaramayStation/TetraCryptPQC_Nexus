
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Shield } from 'lucide-react';

const SecurityArchitecture: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Security</Badge>
          </div>
          <h1 className="text-3xl font-bold">Security Architecture</h1>
          <p className="mt-2 text-muted-foreground">
            TetraCryptPQC's layered security architecture approach
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Architecture Overview</h2>
            <p>
              The TetraCryptPQC security architecture follows a zero-trust model, ensuring all system 
              components are protected against both classical and quantum threats through multiple layers of security.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default SecurityArchitecture;
