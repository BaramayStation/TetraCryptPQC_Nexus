
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  Cpu, 
  FileText, 
  BookOpen,
  ChevronRight
} from 'lucide-react';

const WikiHome: React.FC = () => {
  const categories = [
    { 
      name: 'Cryptography', 
      description: 'Post-quantum algorithms, encryption, and cryptographic primitives',
      path: '/wiki/cryptography', 
      icon: <Lock className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'Post-Quantum Basics', path: '/wiki/cryptography/post-quantum-basics' },
        { name: 'Kyber Algorithm', path: '/wiki/cryptography/kyber-algorithm' },
        { name: 'Zero-Knowledge Proofs', path: '/wiki/cryptography/zero-knowledge-proofs' }
      ]
    },
    { 
      name: 'Security', 
      description: 'Security architecture, threat models, and defense strategies',
      path: '/wiki/security', 
      icon: <Shield className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'Threat Models', path: '/wiki/security/threat-models' },
        { name: 'Hardware Security', path: '/wiki/security/hardware-security' },
        { name: 'Offline Resilience', path: '/wiki/security/offline-resilience' }
      ]
    },
    { 
      name: 'Identity', 
      description: 'Decentralized identity, authentication, and verification',
      path: '/wiki/identity', 
      icon: <Key className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'Decentralized Identity', path: '/wiki/identity/decentralized-identity' },
        { name: 'Biometric Authentication', path: '/wiki/identity/biometric-authentication' },
        { name: 'StarkNet ID', path: '/wiki/identity/starknet-id' }
      ]
    },
    { 
      name: 'Enterprise', 
      description: 'Enterprise deployment, infrastructure, and governance',
      path: '/wiki/enterprise', 
      icon: <Server className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'Enterprise Deployment', path: '/wiki/enterprise/deployment' },
        { name: 'Cloud Infrastructure', path: '/wiki/enterprise/cloud-infrastructure' },
        { name: 'Enterprise Governance', path: '/wiki/enterprise/governance' }
      ]
    },
    { 
      name: 'AI', 
      description: 'AI security, federated learning, and ethical considerations',
      path: '/wiki/ai', 
      icon: <Cpu className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'AI Security Models', path: '/wiki/ai/security-models' },
        { name: 'Federated Learning', path: '/wiki/ai/federated-learning' },
        { name: 'AI Ethics', path: '/wiki/ai/ethics' }
      ]
    },
    { 
      name: 'Military', 
      description: 'Military-grade security, tactical communications, and cyber warfare',
      path: '/wiki/military', 
      icon: <Shield className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'Military Security', path: '/wiki/military/security' },
        { name: 'Battlefield Encryption', path: '/wiki/military/battlefield-encryption' },
        { name: 'Cyber Warfare', path: '/wiki/military/cyber-warfare' }
      ]
    },
    { 
      name: 'Development', 
      description: 'API reference, SDK documentation, and integration guides',
      path: '/wiki/development', 
      icon: <FileText className="h-8 w-8 text-primary" />,
      featured: [
        { name: 'API Reference', path: '/wiki/development/api-reference' },
        { name: 'Integration Guides', path: '/wiki/development/integration-guides' },
        { name: 'Best Practices', path: '/wiki/development/best-practices' }
      ]
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          TetraCryptPQC Wiki
        </h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive documentation for post-quantum cryptographic security
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.path} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {category.icon}
                <Link to={category.path} className="text-sm text-muted-foreground hover:text-primary flex items-center">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <CardTitle className="mt-2">
                <Link to={category.path} className="hover:text-primary transition-colors">
                  {category.name}
                </Link>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {category.featured.map((page) => (
                  <li key={page.path}>
                    <Link 
                      to={page.path}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      • {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
        <p className="mb-4">
          New to TetraCryptPQC? Start with these foundational articles to understand the platform:
        </p>
        <ul className="space-y-2">
          <li>
            <Link to="/wiki/cryptography/post-quantum-basics" className="text-primary hover:underline">
              Post-Quantum Cryptography Basics
            </Link>
            <p className="text-sm text-muted-foreground">
              Understand the fundamentals of quantum-resistant cryptography
            </p>
          </li>
          <li>
            <Link to="/wiki/security/architecture" className="text-primary hover:underline">
              TetraCryptPQC Security Architecture
            </Link>
            <p className="text-sm text-muted-foreground">
              Learn about the layered security approach of TetraCryptPQC
            </p>
          </li>
          <li>
            <Link to="/wiki/enterprise/deployment" className="text-primary hover:underline">
              Enterprise Deployment Guide
            </Link>
            <p className="text-sm text-muted-foreground">
              Step-by-step instructions for enterprise implementation
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WikiHome;
