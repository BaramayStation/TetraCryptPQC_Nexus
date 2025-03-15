
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Scale } from 'lucide-react';

const AIEthics: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
          </div>
          <h1 className="text-3xl font-bold">AI Ethics</h1>
          <p className="mt-2 text-muted-foreground">
            Ethical considerations for quantum-resistant AI systems
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">AI Ethics Overview</h2>
            <p>
              TetraCryptPQC embeds ethical principles in its AI security systems,
              ensuring transparency, fairness, and accountability while maintaining
              strong post-quantum cryptographic protections for sensitive operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default AIEthics;
