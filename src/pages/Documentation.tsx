import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Book, 
  Code, 
  Shield, 
  Lock, 
  Key, 
  CircleHelp, 
  Download, 
  BookOpen, 
  Lightbulb
} from "lucide-react";

const Documentation = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Documentation</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          Comprehensive guides and technical documentation for implementing and using
          TetraCryptPQC in your enterprise applications.
        </p>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Technical Guides</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>API Reference</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">TetraCryptPQC Framework</CardTitle>
                  <CardDescription>Enterprise-grade post-quantum cryptography</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    TetraCryptPQC is a comprehensive framework built to provide post-quantum cryptographic
                    security for enterprise applications. It implements NIST FIPS 205/206 compliant algorithms
                    to ensure your data remains secure even against quantum computing threats.
                  </p>
                  
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-medium">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>NIST-standardized post-quantum algorithms (ML-KEM, SLH-DSA)</li>
                      <li>Hybrid cryptographic implementations</li>
                      <li>Hardware security module (HSM) integration</li>
                      <li>Web3/Decentralized identity management</li>
                      <li>Zero-trust security architecture</li>
                      <li>AI-powered security monitoring</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Whitepaper
                    </Button>
                    <Button variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Guides
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Getting Started</CardTitle>
                  <CardDescription>Quick start guides for implementation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-md flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Basic Implementation</h3>
                        <p className="text-sm text-muted-foreground">Core functionality for messaging and key management</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Security Configuration</h3>
                        <p className="text-sm text-muted-foreground">Setting up secure environment and key storage</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Enterprise Integration</h3>
                        <p className="text-sm text-muted-foreground">Connecting to enterprise identity systems</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Technical Guides Tab */}
          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>Technical Documentation</CardTitle>
                <CardDescription>Detailed implementation guides and best practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">ML-KEM Implementation Guide</h3>
                          <p className="text-sm text-muted-foreground">Technical details on implementing ML-KEM-1024</p>
                        </div>
                      </div>
                      <Badge>FIPS 205</Badge>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">SLH-DSA Implementation Guide</h3>
                          <p className="text-sm text-muted-foreground">Dilithium and Falcon signature implementations</p>
                        </div>
                      </div>
                      <Badge>FIPS 206</Badge>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Server className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">StarkNet Integration</h3>
                          <p className="text-sm text-muted-foreground">Implementing decentralized identity with StarkNet</p>
                        </div>
                      </div>
                      <Badge>Web3</Badge>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">Secure Execution Environment</h3>
                          <p className="text-sm text-muted-foreground">Podman-based secure deployment</p>
                        </div>
                      </div>
                      <Badge>Enterprise</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs would be implemented similarly */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Documentation</CardTitle>
                <CardDescription>Security models and compliance information</CardHeader>
              </CardHeader>
              <CardContent>
                <p>Security documentation content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Comprehensive API documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>API reference content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <p>FAQ content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documentation;
