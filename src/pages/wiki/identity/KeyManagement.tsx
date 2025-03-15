
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Key } from 'lucide-react';

const KeyManagement: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Key className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Identity</Badge>
          </div>
          <h1 className="text-3xl font-bold">Key Management</h1>
          <p className="mt-2 text-muted-foreground">
            Secure management of quantum-resistant cryptographic keys
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Key Management Overview</h2>
            <p>
              TetraCryptPQC provides comprehensive key management capabilities including
              generation, storage, rotation, and recovery of post-quantum cryptographic keys.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default KeyManagement;
