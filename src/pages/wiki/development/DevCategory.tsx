
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronRight, Code, BookOpen, ArrowUpRight, CheckSquare } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const DevCategory: React.FC = () => {
  const pages = [
    {
      title: 'API Reference',
      path: '/wiki/development/api-reference',
      icon: <Code className="h-6 w-6 text-primary" />,
      description: 'Complete API reference for TetraCryptPQC',
      tags: ['API', 'Reference', 'Documentation']
    },
    {
      title: 'SDK Documentation',
      path: '/wiki/development/sdk-documentation',
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      description: 'Software Development Kit documentation and guides',
      tags: ['SDK', 'Development', 'Documentation']
    },
    {
      title: 'Integration Guides',
      path: '/wiki/development/integration-guides',
      icon: <ArrowUpRight className="h-6 w-6 text-primary" />,
      description: 'Step-by-step guides for integrating TetraCryptPQC',
      tags: ['Integration', 'Guides', 'Implementation']
    },
    {
      title: 'Code Examples',
      path: '/wiki/development/code-examples',
      icon: <Code className="h-6 w-6 text-primary" />,
      description: 'Example code for common TetraCryptPQC implementations',
      tags: ['Examples', 'Code', 'Samples']
    },
    {
      title: 'Best Practices',
      path: '/wiki/development/best-practices',
      icon: <CheckSquare className="h-6 w-6 text-primary" />,
      description: 'Best practices for secure implementation',
      tags: ['Best Practices', 'Security', 'Guidelines']
    }
  ];

  return (
    <WikiLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Development
          </h1>
          <p className="mt-2 text-muted-foreground">
            API reference, SDK documentation, and integration guides
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

export default DevCategory;
