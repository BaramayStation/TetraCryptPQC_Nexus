
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, ChevronRight, Globe, FileCheck, Users, Truck } from 'lucide-react';

const EnterpriseCategory: React.FC = () => {
  const pages = [
    {
      title: 'Enterprise Deployment',
      path: '/wiki/enterprise/deployment',
      icon: <Server className="h-6 w-6 text-primary" />,
      description: 'Deployment strategies and best practices for enterprise implementation',
      tags: ['Deployment', 'Migration', 'Integration']
    },
    {
      title: 'Cloud Infrastructure',
      path: '/wiki/enterprise/cloud-infrastructure',
      icon: <Globe className="h-6 w-6 text-primary" />,
      description: 'Secure cloud infrastructure setup with post-quantum protection',
      tags: ['Cloud', 'Infrastructure', 'Scalability']
    },
    {
      title: 'Compliance Frameworks',
      path: '/wiki/enterprise/compliance',
      icon: <FileCheck className="h-6 w-6 text-primary" />,
      description: 'Meeting regulatory requirements with TetraCryptPQC',
      tags: ['GDPR', 'HIPAA', 'Compliance']
    },
    {
      title: 'Enterprise Governance',
      path: '/wiki/enterprise/governance',
      icon: <Users className="h-6 w-6 text-primary" />,
      description: 'Governing access, security policies, and audit trails',
      tags: ['Governance', 'Policy', 'Audit']
    },
    {
      title: 'Secure Supply Chain',
      path: '/wiki/enterprise/supply-chain',
      icon: <Truck className="h-6 w-6 text-primary" />,
      description: 'Securing supply chain operations with post-quantum cryptography',
      tags: ['Supply Chain', 'Logistics', 'Blockchain']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Server className="h-8 w-8 text-primary" />
          Enterprise
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enterprise deployment, infrastructure, and governance solutions
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

export default EnterpriseCategory;
