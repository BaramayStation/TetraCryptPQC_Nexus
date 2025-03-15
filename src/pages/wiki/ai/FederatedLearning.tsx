
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Network } from 'lucide-react';

const FederatedLearning: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Network className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
          </div>
          <h1 className="text-3xl font-bold">Federated Learning</h1>
          <p className="mt-2 text-muted-foreground">
            Privacy-preserving, quantum-resistant distributed AI training
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Federated Learning Overview</h2>
            <p>
              TetraCryptPQC enables secure federated learning with post-quantum protection,
              allowing multiple organizations to collaboratively train AI models without
              sharing sensitive data, secured against quantum threats.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default FederatedLearning;
