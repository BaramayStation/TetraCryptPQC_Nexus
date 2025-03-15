
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { CircuitBoard } from 'lucide-react';

const StarkNetID: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <CircuitBoard className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Identity</Badge>
          </div>
          <h1 className="text-3xl font-bold">StarkNet ID</h1>
          <p className="mt-2 text-muted-foreground">
            Zero-knowledge proof-based decentralized identity on StarkNet
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">StarkNet ID Overview</h2>
            <p>
              TetraCryptPQC integrates with StarkNet to provide quantum-resistant
              decentralized identities secured by zero-knowledge proofs and Layer 2 scaling.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default StarkNetID;
