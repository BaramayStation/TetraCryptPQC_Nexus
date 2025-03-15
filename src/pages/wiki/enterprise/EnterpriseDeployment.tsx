
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, Clock, Book, ArrowRight, FileText, CheckCircle } from 'lucide-react';

const EnterpriseDeployment: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Server className="h-6 w-6 text-primary" />
          <Badge variant="outline" className="text-xs">Enterprise</Badge>
          <Badge variant="outline" className="text-xs">Deployment</Badge>
        </div>
        <h1 className="text-3xl font-bold">Enterprise Deployment Guide</h1>
        <p className="mt-2 text-muted-foreground">
          Step-by-step guide for deploying TetraCryptPQC in enterprise environments
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: October 5, 2023</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Steps</TabsTrigger>
          <TabsTrigger value="integration">System Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Enterprise Deployment Overview</h2>
              <p className="mb-4">
                TetraCryptPQC is designed to integrate seamlessly with existing enterprise infrastructure while providing quantum-resistant security for sensitive data and communications. This guide outlines the deployment process, requirements, and best practices for enterprise implementation.
              </p>
              <p className="mb-4">
                Whether you're deploying TetraCryptPQC in a cloud environment, on-premises data center, or hybrid infrastructure, this guide provides the necessary information to ensure a successful deployment.
              </p>
              <div className="bg-muted p-4 rounded-md mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Deployment Benefits</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Future-proof security against quantum computing threats</li>
                  <li>Seamless integration with existing security infrastructure</li>
                  <li>Hardware-backed key storage with TPM and HSM support</li>
                  <li>Zero-trust architecture with post-quantum authentication</li>
                  <li>Offline resilience for critical operations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Deployment Models</h2>
              <p className="mb-4">
                TetraCryptPQC supports multiple deployment models to suit different enterprise requirements:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">On-Premises Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Full control over hardware and software within your security perimeter
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Cloud Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure deployment in major cloud providers with hardware security module integration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Hybrid Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Combined on-premises and cloud deployment for maximum flexibility
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Edge Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure deployment at the network edge for low-latency applications
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">System Requirements</h2>
              <p>This section details the system requirements for TetraCryptPQC deployment.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>System requirements content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Deployment Process</h2>
              <p>This section outlines the step-by-step deployment process.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Deployment steps would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">System Integration</h2>
              <p>This section covers integration with existing enterprise systems.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Integration guide would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Related Topics</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href="/wiki/enterprise/cloud-infrastructure" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Cloud Infrastructure
          </a>
          <a href="/wiki/enterprise/compliance" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Compliance Frameworks
          </a>
          <a href="/wiki/security/architecture" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Security Architecture
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDeployment;
