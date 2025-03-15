
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, ChevronRight, Lock, FileCode, Shield, Database } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const CryptoCategory: React.FC = () => {
  const pages = [
    {
      title: 'Post-Quantum Basics',
      path: '/wiki/cryptography/post-quantum-basics',
      icon: <Key className="h-6 w-6 text-primary" />,
      description: 'Introduction to post-quantum cryptography concepts',
      tags: ['Post-Quantum', 'NIST', 'Education']
    },
    {
      title: 'ML-KEM Algorithm',
      path: '/wiki/cryptography/ml-kem-algorithm',
      icon: <Lock className="h-6 w-6 text-primary" />,
      description: 'Detailed explanation of the ML-KEM key encapsulation mechanism',
      tags: ['ML-KEM', 'NIST FIPS 205', 'Kyber']
    },
    {
      title: 'Dilithium Algorithm',
      path: '/wiki/cryptography/dilithium-algorithm',
      icon: <FileCode className="h-6 w-6 text-primary" />,
      description: 'Implementation details for the SLH-DSA-Dilithium signature algorithm',
      tags: ['SLH-DSA', 'NIST FIPS 206', 'Dilithium']
    },
    {
      title: 'Zero-Knowledge Proofs',
      path: '/wiki/cryptography/zero-knowledge-proofs',
      icon: <Shield className="h-6 w-6 text-primary" />,
      description: 'ZK-SNARKs and ZK-STARKs for privacy-preserving verification',
      tags: ['ZK-SNARKs', 'ZK-STARKs', 'Privacy']
    },
    {
      title: 'Homomorphic Encryption',
      path: '/wiki/cryptography/homomorphic-encryption',
      icon: <Database className="h-6 w-6 text-primary" />,
      description: 'Computing on encrypted data without decryption',
      tags: ['FHE', 'Secure Computation', 'Privacy']
    }
  ];

  return (
    <WikiLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Key className="h-8 w-8 text-primary" />
            Cryptography
          </h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum cryptographic algorithms and implementation guides
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
    </WikiLayout>
  );
};

export default CryptoCategory;
