
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { FileText } from 'lucide-react';

const AIGovernance: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
          </div>
          <h1 className="text-3xl font-bold">AI Governance</h1>
          <p className="mt-2 text-muted-foreground">
            Secure quantum-resistant governance for AI systems
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">AI Governance Overview</h2>
            <p>
              TetraCryptPQC provides frameworks for responsible AI development and
              deployment with post-quantum security, ensuring compliance with regulations
              and ethical guidelines while protecting against future threats.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default AIGovernance;
