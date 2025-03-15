
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckSquare, FileText, ArrowRight, Shield, Key, Lock } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const BestPractices: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Best Practices</Badge>
          </div>
          <h1 className="text-3xl font-bold">TetraCryptPQC Best Practices</h1>
          <p className="mt-2 text-muted-foreground">
            Security guidelines and best practices for implementing post-quantum cryptography
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="keys">Key Management</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">General Security Best Practices</h2>
                
                <div className="space-y-6 mt-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Core Security Principles
                    </h3>
                    
                    <ul className="list-disc pl-6 mt-3 space-y-3">
                      <li>
                        <h4 className="font-medium">Defense in Depth</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement multiple layers of security controls to protect your systems. Don't rely solely on post-quantum cryptography; combine it with other security measures like network security, access controls, and monitoring.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Least Privilege</h4>
                        <p className="text-sm text-muted-foreground">
                          Apply the principle of least privilege when designing systems using TetraCryptPQC. Only grant the minimum necessary permissions to users and components to perform their functions.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Security Monitoring</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement comprehensive monitoring and logging for all cryptographic operations. Leverage TetraCryptPQC's AI-powered anomaly detection to identify potential security breaches.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Regular Security Assessments</h4>
                        <p className="text-sm text-muted-foreground">
                          Conduct regular security assessments and penetration testing of systems using TetraCryptPQC. Even with post-quantum security, implementation vulnerabilities can exist.
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Cryptographic Hygiene
                    </h3>
                    
                    <ul className="list-disc pl-6 mt-3 space-y-3">
                      <li>
                        <h4 className="font-medium">Algorithm Selection</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose appropriate post-quantum algorithms based on your security requirements:
                        </p>
                        <ul className="list-disc pl-6 mt-1 text-sm text-muted-foreground">
                          <li>For highest security: Use ML-KEM-1024 for encryption and SLH-DSA for signatures</li>
                          <li>For balanced performance/security: Consider ML-KEM-768 and optimized SLH-DSA variants</li>
                          <li>For legacy system compatibility: Use hybrid approaches combining post-quantum with classical algorithms</li>
                        </ul>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Secure Random Number Generation</h4>
                        <p className="text-sm text-muted-foreground">
                          Always use cryptographically secure random number generators when implementing post-quantum cryptography. Poor randomness can undermine even the strongest algorithms.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Side-Channel Attack Prevention</h4>
                        <p className="text-sm text-muted-foreground">
                          Be aware of potential side-channel attacks when implementing TetraCryptPQC. Use constant-time implementations and other protections against timing, power analysis, and cache attacks.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="keys" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Key Management Best Practices</h2>
                
                <div className="space-y-6 mt-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      Secure Key Storage
                    </h3>
                    
                    <ul className="list-disc pl-6 mt-3 space-y-3">
                      <li>
                        <h4 className="font-medium">Hardware Security Modules (HSMs)</h4>
                        <p className="text-sm text-muted-foreground">
                          Use FIPS 140-3 validated HSMs for storing private keys whenever possible. TetraCryptPQC supports integration with several post-quantum compatible HSMs.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Key Encryption</h4>
                        <p className="text-sm text-muted-foreground">
                          Always encrypt private keys at rest using strong encryption. Consider using key-wrapping techniques with multiple layers of encryption.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Secure Enclaves</h4>
                        <p className="text-sm text-muted-foreground">
                          On platforms that support them, use secure enclaves (like Intel SGX, ARM TrustZone) for private key operations to isolate cryptographic processing from the main operating system.
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Key Lifecycle Management
                    </h3>
                    
                    <ul className="list-disc pl-6 mt-3 space-y-3">
                      <li>
                        <h4 className="font-medium">Regular Key Rotation</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement a key rotation policy that regularly updates cryptographic keys. For high-security systems, consider utilizing TetraCryptPQC's AI-driven key rotation capabilities.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Key Backup and Recovery</h4>
                        <p className="text-sm text-muted-foreground">
                          Establish secure key backup procedures. Consider using TetraCryptPQC's quantum-resistant threshold cryptography for key recovery to avoid single points of failure.
                        </p>
                      </li>
                      
                      <li>
                        <h4 className="font-medium">Key Revocation</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement robust key revocation mechanisms. In decentralized systems, consider using TetraCryptPQC's StarkNet integration for tamper-proof revocation status.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Implementation Best Practices</h2>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Implementation best practices would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enterprise" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Enterprise Best Practices</h2>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enterprise best practices would be displayed here.</p>
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
            <a href="/wiki/security/security-architecture" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Security Architecture
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default BestPractices;
