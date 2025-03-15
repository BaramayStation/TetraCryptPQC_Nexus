
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Lock } from 'lucide-react';

const HomomorphicEncryption: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Cryptography</Badge>
          </div>
          <h1 className="text-3xl font-bold">Homomorphic Encryption</h1>
          <p className="mt-2 text-muted-foreground">
            Performing computations on encrypted data without decryption
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="mb-4">
              Homomorphic Encryption (HE) allows computations to be performed directly on encrypted 
              data without requiring decryption first. The results of these computations are also 
              encrypted and can only be decrypted by the data owner.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Types of Homomorphic Encryption</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Partially Homomorphic Encryption (PHE):</strong> Supports only one type of operation (e.g., addition or multiplication)</li>
              <li><strong>Somewhat Homomorphic Encryption (SHE):</strong> Supports a limited number of operations</li>
              <li><strong>Fully Homomorphic Encryption (FHE):</strong> Supports arbitrary computations on encrypted data</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default HomomorphicEncryption;
