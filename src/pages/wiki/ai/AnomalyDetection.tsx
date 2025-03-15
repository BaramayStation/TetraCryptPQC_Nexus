
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { AlertTriangle } from 'lucide-react';

const AnomalyDetection: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
          </div>
          <h1 className="text-3xl font-bold">Anomaly Detection</h1>
          <p className="mt-2 text-muted-foreground">
            AI-driven quantum-resistant threat and anomaly detection
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Anomaly Detection Overview</h2>
            <p>
              TetraCryptPQC leverages machine learning to identify unusual patterns
              and potential security threats, protected by post-quantum cryptography
              to ensure the integrity of detection systems against advanced threats.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default AnomalyDetection;
