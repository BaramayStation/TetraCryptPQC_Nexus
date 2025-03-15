
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { CircuitBoard, Shield, Key, Link } from 'lucide-react';

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
            <p className="mb-4">
              TetraCryptPQC integrates with StarkNet to provide quantum-resistant
              decentralized identities secured by zero-knowledge proofs and Layer 2 scaling.
              This integration enables secure, private, and verifiable identity management
              that's resistant to both classical and quantum computing threats.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    Quantum-Resistant Identity
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    StarkNet IDs are secured using post-quantum cryptographic algorithms,
                    making them resistant to attacks from both current and future quantum computers.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Key className="h-4 w-4 mr-2 text-primary" />
                    Zero-Knowledge Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Authenticate without revealing sensitive information using
                    zero-knowledge proofs, allowing selective disclosure of identity attributes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Link className="h-4 w-4 mr-2 text-primary" />
                    Cross-Platform Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    StarkNet IDs can be verified across multiple platforms and applications
                    while maintaining cryptographic security and user privacy.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <CircuitBoard className="h-4 w-4 mr-2 text-primary" />
                    Layer 2 Scalability
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Leverage StarkNet's Layer 2 scaling to provide high-throughput,
                    low-cost identity verification with Ethereum-level security.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default StarkNetID;
