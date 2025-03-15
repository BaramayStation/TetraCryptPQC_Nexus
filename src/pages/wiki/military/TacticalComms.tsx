
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Radio } from 'lucide-react';

const TacticalComms: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Military</Badge>
          </div>
          <h1 className="text-3xl font-bold">Tactical Communications</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-resistant battlefield communications systems
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Tactical Communications Overview</h2>
            <p>
              TetraCryptPQC secures battlefield communications with resilient post-quantum
              encryption, enabling secure voice, data, and messaging in contested environments
              with minimal infrastructure requirements and offline capabilities.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default TacticalComms;
