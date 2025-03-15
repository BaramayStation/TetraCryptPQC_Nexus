
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronRight, Radio, Lock, AlertCircle, Zap } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const MilitaryCategory: React.FC = () => {
  const pages = [
    {
      title: 'Military Security',
      path: '/wiki/military/security',
      icon: <Shield className="h-6 w-6 text-primary" />,
      description: 'Military-grade security protocols and standards',
      tags: ['Military', 'Defense', 'Security']
    },
    {
      title: 'Tactical Communications',
      path: '/wiki/military/tactical-communications',
      icon: <Radio className="h-6 w-6 text-primary" />,
      description: 'Secure tactical communications with post-quantum encryption',
      tags: ['Communications', 'Tactical', 'Encryption']
    },
    {
      title: 'Battlefield Encryption',
      path: '/wiki/military/battlefield-encryption',
      icon: <Lock className="h-6 w-6 text-primary" />,
      description: 'Encryption technologies for battlefield environments',
      tags: ['Encryption', 'Battlefield', 'Resilience']
    },
    {
      title: 'Zero-Trust Architecture',
      path: '/wiki/military/zero-trust',
      icon: <AlertCircle className="h-6 w-6 text-primary" />,
      description: 'Zero-trust security model for military applications',
      tags: ['Zero Trust', 'Architecture', 'Security']
    },
    {
      title: 'Cyber Warfare',
      path: '/wiki/military/cyber-warfare',
      icon: <Zap className="h-6 w-6 text-primary" />,
      description: 'Cyber warfare defense strategies and countermeasures',
      tags: ['Cyber Warfare', 'Defense', 'Strategy']
    }
  ];

  return (
    <WikiLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Military
          </h1>
          <p className="mt-2 text-muted-foreground">
            Military-grade security, tactical communications, and cyber warfare
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

export default MilitaryCategory;
