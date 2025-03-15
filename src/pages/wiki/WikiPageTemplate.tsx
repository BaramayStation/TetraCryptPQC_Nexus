
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, Book, ArrowRight } from 'lucide-react';

interface WikiPageTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  lastUpdated: string;
  badges?: string[];
}

const WikiPageTemplate: React.FC<WikiPageTemplateProps> = ({
  title,
  description,
  icon,
  lastUpdated,
  badges = []
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          {badges.map((badge) => (
            <Badge key={badge} variant="outline" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="mb-4">
                Overview content would go here.
              </p>
              <div className="bg-muted p-4 rounded-md mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Key Points</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Key point one</li>
                  <li>Key point two</li>
                  <li>Key point three</li>
                  <li>Key point four</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Detailed Information</h2>
              <p>Detailed information would be displayed here.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detailed content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="implementation" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Implementation Guide</h2>
              <p>Implementation guide would be displayed here.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Implementation details would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
              <p>Code examples would be displayed here.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Example code would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Related Topics</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href="#" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Related Topic 1
          </a>
          <a href="#" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Related Topic 2
          </a>
          <a href="#" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Related Topic 3
          </a>
        </div>
      </div>
    </div>
  );
};

export default WikiPageTemplate;
