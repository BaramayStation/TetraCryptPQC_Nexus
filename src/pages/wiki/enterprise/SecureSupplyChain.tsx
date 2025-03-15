
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Link } from 'lucide-react';

const SecureSupplyChain: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Link className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Enterprise</Badge>
          </div>
          <h1 className="text-3xl font-bold">Secure Supply Chain</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-resistant supply chain security and management
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Supply Chain Security</h2>
            <p>
              TetraCryptPQC secures supply chains through post-quantum cryptographic
              validation, blockchain-based tracking, and zero-knowledge proofs for
              integrity verification, protecting against sophisticated supply chain attacks.
            </p>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default SecureSupplyChain;
