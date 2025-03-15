
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Globe } from 'lucide-react';

const CyberWarfare: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Military</Badge>
          </div>
          <h1 className="text-3xl font-bold">Cyber Warfare</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-resistant cyber operations and defense
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Cyber Warfare Overview</h2>
            <p>
              TetraCryptPQC provides advanced defensive capabilities for cyber warfare,
              incorporating post-quantum cryptography to protect critical infrastructure
              and military networks from state-sponsored and quantum-capable threats.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default CyberWarfare;
