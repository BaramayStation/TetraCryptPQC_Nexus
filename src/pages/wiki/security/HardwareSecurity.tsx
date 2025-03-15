
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Cpu } from 'lucide-react';

const HardwareSecurity: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Security</Badge>
          </div>
          <h1 className="text-3xl font-bold">Hardware Security</h1>
          <p className="mt-2 text-muted-foreground">
            Hardware-based security features for enhanced protection
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Hardware Security Features</h2>
            <p>
              TetraCryptPQC leverages hardware security modules (HSMs) and secure enclaves to provide
              additional protection for cryptographic operations and sensitive data storage.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default HardwareSecurity;
