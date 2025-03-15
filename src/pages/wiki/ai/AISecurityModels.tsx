
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Brain } from 'lucide-react';

const AISecurityModels: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
          </div>
          <h1 className="text-3xl font-bold">AI Security Models</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-resistant AI security and threat detection
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">AI Security Overview</h2>
            <p>
              TetraCryptPQC's AI security models provide advanced threat detection
              and anomaly analysis while being protected by post-quantum cryptography,
              ensuring the integrity and confidentiality of AI operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default AISecurityModels;
