
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, FileText, ArrowRight, Terminal, Server, Database } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const APIReference: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Code className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">FIPS 205/206 Compliant</Badge>
          </div>
          <h1 className="text-3xl font-bold">TetraCryptPQC API Reference</h1>
          <p className="mt-2 text-muted-foreground">
            Complete API documentation for post-quantum cryptographic operations
          </p>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cryptography">Cryptography</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="ai">AI Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">API Architecture</h2>
                <p className="mb-4">
                  The TetraCryptPQC API provides a comprehensive set of endpoints for integrating post-quantum cryptography into applications. All endpoints conform to RESTful principles and support JSON for data exchange.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Base URL</h3>
                    </div>
                    <code className="text-sm block bg-muted p-2 rounded">
                      https://api.tetracryptpqc.com/v1
                    </code>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Authentication</h3>
                    </div>
                    <p className="text-sm">
                      API requests require a post-quantum signed JWT token in the Authorization header.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cryptography" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Cryptography Endpoints</h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      POST /keys/generate
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Generate a new post-quantum key pair
                    </p>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Request Body</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "algorithm": "ML-KEM-1024",  // or "SLH-DSA", "Falcon", "BIKE"
  "options": {
    "strength": "256-bit",
    "standard": "NIST FIPS 205"
  }
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Response</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "success": true,
  "keyPair": {
    "publicKey": "...",
    "privateKey": "...",
    "algorithm": "ML-KEM-1024",
    "strength": "256-bit",
    "standard": "NIST FIPS 205",
    "created": "2023-08-15T14:30:45Z"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      POST /sign
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sign a message using post-quantum signature algorithm
                    </p>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Request Body</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "message": "Data to be signed",
  "privateKey": "...",
  "algorithm": "SLH-DSA"  // or "Falcon"
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Response</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "success": true,
  "signature": "...",
  "algorithm": "SLH-DSA"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="identity" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Identity Endpoints</h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      POST /identity/create
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create a new decentralized identity (DID)
                    </p>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Request Body</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "publicKeys": {
    "encryption": "...",  // ML-KEM public key
    "signature": "..."    // SLH-DSA public key
  },
  "metadata": {
    "name": "Optional display name"
  }
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Response</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "success": true,
  "didDocument": {
    "id": "did:tetracrypt:abc123...",
    "verificationMethod": [
      {
        "id": "did:tetracrypt:abc123...#keys-1",
        "type": "ML-KEM-1024",
        "controller": "did:tetracrypt:abc123...",
        "publicKeyHex": "..."
      },
      {
        "id": "did:tetracrypt:abc123...#keys-2",
        "type": "SLH-DSA-Dilithium5",
        "controller": "did:tetracrypt:abc123...",
        "publicKeyHex": "..."
      }
    ],
    "authentication": ["did:tetracrypt:abc123...#keys-2"],
    "keyAgreement": ["did:tetracrypt:abc123...#keys-1"]
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">AI Security Endpoints</h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      POST /ai/detect-threats
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Perform AI-powered threat detection on data
                    </p>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Request Body</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "data": "...",  // Data to analyze
  "modelType": "anomaly-detection",  // or "threat-prediction"
  "options": {
    "sensitivity": "high"
  }
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Response</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`{
  "success": true,
  "result": {
    "detected": true,
    "threats": [
      {
        "id": "threat-abc123",
        "severity": "high",
        "description": "Potential security anomaly detected",
        "indicators": ["Unusual pattern detected"],
        "mitigationSteps": ["Review recent activity"]
      }
    ],
    "score": 75,
    "recommendation": "Investigation recommended"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Related Documentation</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/wiki/development/sdk-documentation" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              SDK Documentation
            </a>
            <a href="/wiki/development/integration-guides" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Integration Guides
            </a>
            <a href="/wiki/development/code-examples" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Code Examples
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default APIReference;
