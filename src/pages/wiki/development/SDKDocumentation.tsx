
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, ArrowRight, Code } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const SDKDocumentation: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">SDK</Badge>
          </div>
          <h1 className="text-3xl font-bold">TetraCryptPQC SDK Documentation</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive documentation for integrating post-quantum cryptography into applications
          </p>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">SDK Overview</h2>
                <p className="mb-4">
                  The TetraCryptPQC Software Development Kit (SDK) provides developers with robust tools to integrate post-quantum cryptography into applications. The SDK supports all major platforms and programming languages, ensuring maximum flexibility and security.
                </p>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Key Features</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>NIST FIPS 205/206 compliant cryptographic primitives</li>
                    <li>Cross-platform support (Windows, macOS, Linux, iOS, Android)</li>
                    <li>Multiple language bindings (JavaScript, Python, Java, Rust, C++)</li>
                    <li>Hardware security module (HSM) integration</li>
                    <li>Quantum-resistant key management</li>
                    <li>AI-powered security features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="installation" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Installing the SDK</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Node.js / JavaScript</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                      npm install tetracryptpqc
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Python</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                      pip install tetracryptpqc
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Java</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`// Add to pom.xml
<dependency>
  <groupId>com.tetracryptpqc</groupId>
  <artifactId>tetracryptpqc-sdk</artifactId>
  <version>1.0.0</version>
</dependency>`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Rust</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                      cargo add tetracryptpqc
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Key Generation</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`// JavaScript
const { generateKeyPair } = require('tetracryptpqc');

async function example() {
  const keyPair = await generateKeyPair({
    algorithm: 'ML-KEM-1024',
    options: {
      strength: '256-bit',
      standard: 'NIST FIPS 205'
    }
  });
  
  console.log('Public Key:', keyPair.publicKey);
  console.log('Private Key:', keyPair.privateKey);
}

example();`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Signing Messages</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`// JavaScript
const { signMessage, verifySignature } = require('tetracryptpqc');

async function example() {
  // Assuming you have a key pair
  const message = 'Hello, post-quantum world!';
  
  // Sign the message
  const signature = await signMessage({
    message,
    privateKey: keyPair.privateKey,
    algorithm: 'SLH-DSA'
  });
  
  // Verify the signature
  const isValid = await verifySignature({
    message,
    signature,
    publicKey: keyPair.publicKey,
    algorithm: 'SLH-DSA'
  });
  
  console.log('Signature valid:', isValid);
}

example();`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Advanced Features</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">AI-Powered Threat Detection</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`// JavaScript
const { detectThreats } = require('tetracryptpqc');

async function example() {
  const data = '...'; // Data to analyze
  
  const result = await detectThreats({
    data,
    modelType: 'anomaly-detection',
    options: {
      sensitivity: 'high'
    }
  });
  
  if (result.detected) {
    console.log('Threats detected:', result.threats);
    console.log('Recommendation:', result.recommendation);
  }
}

example();`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Decentralized Identity</h3>
                    <pre className="text-sm bg-muted p-3 rounded-md mt-1 overflow-x-auto">
{`// JavaScript
const { createDID, verifyDID } = require('tetracryptpqc');

async function example() {
  // Create a decentralized identity
  const did = await createDID({
    publicKeys: {
      encryption: keyPair.encryption.publicKey,
      signature: keyPair.signature.publicKey
    },
    metadata: {
      name: 'Alice'
    }
  });
  
  console.log('DID Document:', did);
  
  // Verify a DID
  const isValid = await verifyDID(did);
  console.log('DID valid:', isValid);
}

example();`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Related Documentation</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/wiki/development/api-reference" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              API Reference
            </a>
            <a href="/wiki/development/code-examples" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Code Examples
            </a>
            <a href="/wiki/development/best-practices" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Best Practices
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default SDKDocumentation;
