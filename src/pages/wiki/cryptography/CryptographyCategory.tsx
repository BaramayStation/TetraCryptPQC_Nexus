
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, ChevronRight, KeyRound, ShieldAlert, Fingerprint, Database } from 'lucide-react';

const CryptographyCategory: React.FC = () => {
  const pages = [
    {
      title: 'Post-Quantum Basics',
      path: '/wiki/cryptography/post-quantum-basics',
      icon: <ShieldAlert className="h-6 w-6 text-primary" />,
      description: 'Introduction to post-quantum cryptography concepts and principles',
      tags: ['Fundamentals', 'Quantum Computing', 'NIST']
    },
    {
      title: 'Kyber Algorithm',
      path: '/wiki/cryptography/kyber-algorithm',
      icon: <KeyRound className="h-6 w-6 text-primary" />,
      description: 'ML-KEM-1024 (Kyber) key encapsulation mechanism details and implementation',
      tags: ['NIST FIPS 205', 'KEM', 'Lattice-based']
    },
    {
      title: 'Dilithium Algorithm',
      path: '/wiki/cryptography/dilithium-algorithm',
      icon: <Fingerprint className="h-6 w-6 text-primary" />,
      description: 'SLH-DSA (Dilithium) digital signature algorithm specifications',
      tags: ['NIST FIPS 206', 'Signatures', 'Lattice-based']
    },
    {
      title: 'Zero-Knowledge Proofs',
      path: '/wiki/cryptography/zero-knowledge-proofs',
      icon: <Database className="h-6 w-6 text-primary" />,
      description: 'ZK-SNARKs, ZK-STARKs, and application in TetraCryptPQC',
      tags: ['Privacy', 'Verification', 'StarkNet']
    },
    {
      title: 'Homomorphic Encryption',
      path: '/wiki/cryptography/homomorphic-encryption',
      icon: <Lock className="h-6 w-6 text-primary" />,
      description: 'Computing on encrypted data with homomorphic encryption techniques',
      tags: ['Privacy', 'Computation', 'Cloud Security']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lock className="h-8 w-8 text-primary" />
          Cryptography
        </h1>
        <p className="mt-2 text-muted-foreground">
          Post-quantum cryptographic algorithms and protocols that power TetraCryptPQC
        </p>
      </div>
      
      <div className="grid gap-6">
        {pages.map((page) => (
          <Card key={page.path} className="overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-start gap-4">
              <div className="mt-1 p-2 rounded-md bg-primary/10 flex-shrink-0">
                {page.icon}
              </div>
              <div className="space-y-1">
                <CardTitle>
                  <Link to={page.path} className="hover:text-primary transition-colors flex items-center gap-1">
                    {page.title}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardTitle>
                <p className="text-muted-foreground">{page.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {page.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptographyCategory;
