
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, FileText, ArrowRight, Lock, Layers, BarChart } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const IntegrationGuides: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Integration</Badge>
          </div>
          <h1 className="text-3xl font-bold">TetraCryptPQC Integration Guides</h1>
          <p className="mt-2 text-muted-foreground">
            Step-by-step guides for integrating post-quantum cryptography into your systems
          </p>
        </div>
        
        <Tabs defaultValue="web">
          <TabsList className="mb-4">
            <TabsTrigger value="web">Web Applications</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise Systems</TabsTrigger>
            <TabsTrigger value="military">Military Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="web" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Web Application Integration</h2>
                <p className="mb-4">
                  This guide demonstrates how to integrate TetraCryptPQC into web applications for post-quantum secure authentication, messaging, and data protection.
                </p>
                
                <div className="space-y-6 mt-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Secure Authentication
                    </h3>
                    
                    <ol className="list-decimal pl-6 mt-3 space-y-3">
                      <li>
                        <h4 className="font-medium">Install the SDK</h4>
                        <pre className="text-sm bg-muted p-2 rounded-md mt-1 overflow-x-auto">
                          npm install tetracryptpqc
                        </pre>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Generate Post-Quantum Keys for Users</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement key generation during user registration:
                        </p>
                        <pre className="text-sm bg-muted p-2 rounded-md mt-1 overflow-x-auto">
{`// Example React component for user registration
import { generateMLKEMKeypair, generateSLHDSAKeypair } from 'tetracryptpqc';

async function registerUser(userData) {
  // Generate encryption key pair (ML-KEM)
  const encryptionKey = await generateMLKEMKeypair();
  
  // Generate signature key pair (SLH-DSA)
  const signatureKey = await generateSLHDSAKeypair();
  
  // Store public keys on server, private keys securely in browser
  const user = {
    ...userData,
    publicKeys: {
      encryption: encryptionKey.publicKey,
      signature: signatureKey.publicKey
    }
  };
  
  // Save private keys securely
  securelyStoreKeys({
    encryption: encryptionKey.privateKey,
    signature: signatureKey.privateKey
  });
  
  // Register user with server
  return await api.registerUser(user);
}`}
                        </pre>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Implement Authentication Flow</h4>
                        <p className="text-sm text-muted-foreground">
                          Set up post-quantum challenge-response authentication:
                        </p>
                        <pre className="text-sm bg-muted p-2 rounded-md mt-1 overflow-x-auto">
{`// Example authentication flow
import { signMessage } from 'tetracryptpqc';

async function authenticate(username) {
  // 1. Request challenge from server
  const { challenge } = await api.getAuthChallenge(username);
  
  // 2. Get user's private signature key
  const privateKey = getStoredSignatureKey();
  
  // 3. Sign the challenge
  const signature = await signMessage(challenge, privateKey);
  
  // 4. Send signature to server for verification
  const { token } = await api.verifyChallenge(username, challenge, signature);
  
  // 5. Store authentication token
  setAuthToken(token);
  
  return token;
}`}
                        </pre>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      Encrypted Data Storage
                    </h3>
                    
                    <ol className="list-decimal pl-6 mt-3 space-y-3">
                      <li>
                        <h4 className="font-medium">Implement Client-Side Encryption</h4>
                        <pre className="text-sm bg-muted p-2 rounded-md mt-1 overflow-x-auto">
{`// Example of encrypting user data before storage
import { encryptAES, generateSessionKey } from 'tetracryptpqc';

async function saveEncryptedData(data) {
  // Generate a random session key
  const sessionKey = await generateSessionKey();
  
  // Encrypt the data with AES
  const encryptedData = await encryptAES(JSON.stringify(data), sessionKey);
  
  // Encrypt the session key with the user's public key
  const encryptedKey = await encryptSessionKey(sessionKey);
  
  // Store the encrypted data and key
  return api.storeData({
    encryptedData,
    encryptedKey
  });
}`}
                        </pre>
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Mobile Integration</h2>
                <p className="mb-4">
                  This guide demonstrates how to integrate TetraCryptPQC into iOS and Android mobile applications.
                </p>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed mobile integration guides would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enterprise" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Enterprise Integration</h2>
                <p className="mb-4">
                  This guide demonstrates how to integrate TetraCryptPQC into enterprise systems and infrastructure.
                </p>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed enterprise integration guides would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="military" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Military Application Integration</h2>
                <p className="mb-4">
                  This guide demonstrates how to integrate TetraCryptPQC into military-grade applications with NIST FIPS 205/206 compliance.
                </p>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed military application integration guides would be displayed here.</p>
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
            <a href="/wiki/development/sdk-documentation" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              SDK Documentation
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

export default IntegrationGuides;
