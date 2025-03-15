
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, ChevronRight, Fingerprint, UserCheck, KeyRound, Shield } from 'lucide-react';

const IdentityCategory: React.FC = () => {
  const pages = [
    {
      title: 'Decentralized Identity',
      path: '/wiki/identity/decentralized-identity',
      icon: <UserCheck className="h-6 w-6 text-primary" />,
      description: 'Self-sovereign identity implementation with DIDs and verifiable credentials',
      tags: ['DID', 'W3C', 'Blockchain']
    },
    {
      title: 'Biometric Authentication',
      path: '/wiki/identity/biometric-authentication',
      icon: <Fingerprint className="h-6 w-6 text-primary" />,
      description: 'Multi-factor biometric authentication with quantum-resistant encryption',
      tags: ['MFA', 'Fingerprint', 'Facial Recognition']
    },
    {
      title: 'Key Management',
      path: '/wiki/identity/key-management',
      icon: <KeyRound className="h-6 w-6 text-primary" />,
      description: 'Secure key generation, storage, and rotation for post-quantum keys',
      tags: ['HSM', 'Key Rotation', 'Recovery']
    },
    {
      title: 'Identity Verification',
      path: '/wiki/identity/verification',
      icon: <Shield className="h-6 w-6 text-primary" />,
      description: 'Zero-knowledge proof-based identity verification protocols',
      tags: ['ZKP', 'Privacy', 'Verification']
    },
    {
      title: 'StarkNet ID',
      path: '/wiki/identity/starknet-id',
      icon: <Key className="h-6 w-6 text-primary" />,
      description: 'Integration with StarkNet for decentralized identity management',
      tags: ['StarkNet', 'Blockchain', 'Smart Contracts']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Key className="h-8 w-8 text-primary" />
          Identity
        </h1>
        <p className="mt-2 text-muted-foreground">
          Decentralized identity, authentication, and verification systems
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

export default IdentityCategory;
