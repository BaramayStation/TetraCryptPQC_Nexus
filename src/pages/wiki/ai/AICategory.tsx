
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, ChevronRight, BarChart, Network, Users, FileText, Shield, Database, Lock } from 'lucide-react';

const AICategory: React.FC = () => {
  const pages = [
    {
      title: 'AI Security Models',
      path: '/wiki/ai/security-models',
      icon: <Cpu className="h-6 w-6 text-primary" />,
      description: 'Security models for AI-driven threat detection and prevention',
      tags: ['Security', 'AI Models', 'Threat Detection']
    },
    {
      title: 'Federated Learning',
      path: '/wiki/ai/federated-learning',
      icon: <Network className="h-6 w-6 text-primary" />,
      description: 'Secure federated learning with post-quantum encryption',
      tags: ['Privacy', 'Machine Learning', 'Distributed']
    },
    {
      title: 'Anomaly Detection',
      path: '/wiki/ai/anomaly-detection',
      icon: <BarChart className="h-6 w-6 text-primary" />,
      description: 'AI-powered anomaly detection for cybersecurity',
      tags: ['Machine Learning', 'Monitoring', 'Detection']
    },
    {
      title: 'AI Governance',
      path: '/wiki/ai/governance',
      icon: <Users className="h-6 w-6 text-primary" />,
      description: 'Governance frameworks for AI systems in security contexts',
      tags: ['Governance', 'Policy', 'Compliance']
    },
    {
      title: 'AI Ethics',
      path: '/wiki/ai/ethics',
      icon: <FileText className="h-6 w-6 text-primary" />,
      description: 'Ethical considerations for AI in cybersecurity',
      tags: ['Ethics', 'Transparency', 'Accountability']
    },
    {
      title: 'StarkNet AI Smart Contracts',
      path: '/wiki/ai/starknet-smart-contracts',
      icon: <Shield className="h-6 w-6 text-primary" />,
      description: 'Quantum-resistant AI smart contracts on StarkNet Layer-3',
      tags: ['StarkNet', 'Smart Contracts', 'ZK-Rollups', 'Quantum-Resistant']
    },
    {
      title: 'AI On-Chain Anomaly Detection',
      path: '/wiki/ai/on-chain-anomaly-detection',
      icon: <Database className="h-6 w-6 text-primary" />,
      description: 'AI-powered on-chain anomaly detection and anti-fraud mechanisms',
      tags: ['Blockchain', 'Anomaly Detection', 'Anti-Fraud']
    },
    {
      title: 'Privacy-Preserving AI',
      path: '/wiki/ai/privacy-preserving-ai',
      icon: <Lock className="h-6 w-6 text-primary" />,
      description: 'ZK-SNARKs & FHE for privacy-preserving on-chain AI transactions',
      tags: ['ZK-SNARKs', 'FHE', 'Privacy']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Cpu className="h-8 w-8 text-primary" />
          AI Security
        </h1>
        <p className="mt-2 text-muted-foreground">
          AI-powered security, quantum-resistant smart contracts, and decentralized governance
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

export default AICategory;
