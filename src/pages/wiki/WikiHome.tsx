
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WikiLayout from '@/components/layout/WikiLayout';
import { 
  Book, 
  ChevronRight, 
  Key, 
  Shield, 
  Users, 
  Building2, 
  Cpu, 
  FileText,
  Globe
} from 'lucide-react';

const WikiHome: React.FC = () => {
  const categories = [
    {
      title: 'Cryptography',
      path: '/wiki/cryptography',
      icon: <Key className="h-8 w-8 text-primary" />,
      description: 'Post-quantum cryptographic algorithms and implementation guides',
      subcategories: ['Post-Quantum Basics', 'ML-KEM Algorithm', 'SLH-DSA Algorithm', 'Zero-Knowledge Proofs']
    },
    {
      title: 'Security',
      path: '/wiki/security',
      icon: <Shield className="h-8 w-8 text-primary" />,
      description: 'Comprehensive security architecture and threat models',
      subcategories: ['Security Architecture', 'Hardware Security', 'Threat Models', 'Offline Resilience']
    },
    {
      title: 'Identity',
      path: '/wiki/identity',
      icon: <Users className="h-8 w-8 text-primary" />,
      description: 'Decentralized identity and authentication frameworks',
      subcategories: ['Decentralized Identity', 'Biometric Authentication', 'Key Management', 'StarkNet ID']
    },
    {
      title: 'Enterprise',
      path: '/wiki/enterprise',
      icon: <Building2 className="h-8 w-8 text-primary" />,
      description: 'Enterprise deployment and compliance frameworks',
      subcategories: ['Cloud Infrastructure', 'Compliance', 'Governance', 'Supply Chain Security']
    },
    {
      title: 'AI',
      path: '/wiki/ai',
      icon: <Cpu className="h-8 w-8 text-primary" />,
      description: 'AI-powered security and autonomous defense systems',
      subcategories: ['Security Models', 'Federated Learning', 'Anomaly Detection', 'Governance']
    },
    {
      title: 'Military',
      path: '/wiki/military',
      icon: <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />,
      description: 'Military-grade security protocols and tactical communications',
      subcategories: ['Military Security', 'Tactical Communications', 'Battlefield Encryption', 'Zero-Trust Architecture']
    },
    {
      title: 'Development',
      path: '/wiki/development',
      icon: <FileText className="h-8 w-8 text-primary" />,
      description: 'API reference, SDK documentation, and integration guides',
      subcategories: ['API Reference', 'SDK Documentation', 'Integration Guides', 'Code Examples']
    }
  ];

  return (
    <WikiLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">TetraCryptPQC Knowledge Base</h1>
          </div>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Comprehensive documentation, technical guides, and reference materials for the TetraCryptPQC post-quantum cryptography framework.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.path} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-md bg-primary/10">
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      <Link to={category.path} className="hover:text-primary transition-colors">
                        {category.title}
                      </Link>
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {category.subcategories.map((subcategory) => {
                    // Convert subcategory name to slug format for URL
                    const slug = subcategory.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <li key={subcategory}>
                        <Link 
                          to={`${category.path}/${slug}`} 
                          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          {subcategory}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link 
                      to={category.path} 
                      className="flex items-center text-primary hover:underline mt-2 text-sm"
                    >
                      View all <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 pt-6 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Featured Topics</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link 
              to="/wiki/ai/starknet-smart-contracts"
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-medium">StarkNet AI Smart Contracts</h3>
              <p className="text-sm text-muted-foreground mt-1">Quantum-resistant blockchain for AI security</p>
            </Link>
            
            <Link 
              to="/wiki/cryptography/post-quantum-basics"
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-medium">Post-Quantum Cryptography</h3>
              <p className="text-sm text-muted-foreground mt-1">Fundamental concepts and NIST standards</p>
            </Link>
            
            <Link 
              to="/wiki/military/tactical-communications"
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-medium">Tactical Communications</h3>
              <p className="text-sm text-muted-foreground mt-1">Secure battlefield communications</p>
            </Link>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default WikiHome;
