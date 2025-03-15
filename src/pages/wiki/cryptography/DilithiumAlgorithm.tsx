
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, Book, ArrowRight, Code } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const DilithiumAlgorithm: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">NIST FIPS 206 Compliant</Badge>
            <Badge variant="outline" className="text-xs">SLH-DSA-Dilithium5</Badge>
          </div>
          <h1 className="text-3xl font-bold">Dilithium Algorithm (SLH-DSA)</h1>
          <p className="mt-2 text-muted-foreground">
            Post-quantum digital signature algorithm based on module lattices
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: August 10, 2023</span>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">SLH-DSA Overview</h2>
                <p className="mb-4">
                  SLH-DSA (Stateless Hash-based Digital Signature Algorithm), formerly known as Dilithium, is a post-quantum digital signature algorithm standardized by NIST in FIPS 206. It is designed to provide security against attacks by both classical and quantum computers.
                </p>
                <p className="mb-4">
                  SLH-DSA is based on the hardness of lattice problems, specifically module learning with errors (MLWE) and module short integer solution (MSIS) problems. These mathematical problems are believed to be resistant to attacks by quantum computers.
                </p>
                <div className="bg-muted p-4 rounded-md mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Key Features</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Post-quantum security based on module lattice problems</li>
                    <li>Relatively small signatures and public keys compared to other post-quantum signature schemes</li>
                    <li>Efficient implementation on a wide range of platforms</li>
                    <li>NIST standardized in FIPS 206</li>
                    <li>Multiple security levels (SLH-DSA-Dilithium2, SLH-DSA-Dilithium3, SLH-DSA-Dilithium5)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Security Strength</h2>
                <p className="mb-4">
                  TetraCryptPQC implements SLH-DSA-Dilithium5, which offers the highest security level among the SLH-DSA variants. It provides security equivalent to AES-256 against quantum attacks, making it suitable for signing highly sensitive information.
                </p>
                <p className="mb-4">
                  The security of SLH-DSA is based on the hardness of module lattice problems, which have been extensively studied and are believed to be resistant to quantum algorithms like Shor's algorithm.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
                <p className="mb-4">
                  SLH-DSA operates by producing a public/private key pair consisting of matrices and vectors over finite fields. The signing operation creates a vector satisfying a particular equation, which can then be verified using the public key.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Algorithm Parameters</h3>
                <p className="mb-4">
                  SLH-DSA-Dilithium5 uses the following parameters:
                </p>
                <div className="bg-muted p-4 rounded-md">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>q:</strong> 8380417 (prime modulus)</li>
                    <li><strong>d:</strong> 13 (number of bits dropped in challenge)</li>
                    <li><strong>τ:</strong> 60 (number of 1's in challenge)</li>
                    <li><strong>η:</strong> 2 (bounded coefficient size)</li>
                    <li><strong>γ<sub>1</sub>:</strong> 2^19 (range for sampling y)</li>
                    <li><strong>γ<sub>2</sub>:</strong> 2^19 - 1 (low-order rounding range)</li>
                    <li><strong>β:</strong> 275 (signature bound)</li>
                    <li><strong>ω:</strong> 96 (number of non-zero entries)</li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Key Size and Signature Size</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse mt-2">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Parameter</th>
                        <th className="border p-2 text-left">SLH-DSA-Dilithium2</th>
                        <th className="border p-2 text-left">SLH-DSA-Dilithium3</th>
                        <th className="border p-2 text-left">SLH-DSA-Dilithium5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Public Key Size</td>
                        <td className="border p-2">1,312 bytes</td>
                        <td className="border p-2">1,952 bytes</td>
                        <td className="border p-2">2,592 bytes</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Private Key Size</td>
                        <td className="border p-2">2,528 bytes</td>
                        <td className="border p-2">4,000 bytes</td>
                        <td className="border p-2">4,864 bytes</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Signature Size</td>
                        <td className="border p-2">2,420 bytes</td>
                        <td className="border p-2">3,293 bytes</td>
                        <td className="border p-2">4,595 bytes</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Security Level</td>
                        <td className="border p-2">NIST Level 2</td>
                        <td className="border p-2">NIST Level 3</td>
                        <td className="border p-2">NIST Level 5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Implementation Example</h2>
                <p className="mb-4">Basic implementation example of SLH-DSA-Dilithium5 in TetraCryptPQC:</p>
                <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                  <pre>
{`// Key generation
const keyPair = await tetraCrypt.generateKeyPair({
  algorithm: 'SLH-DSA',
  variant: 'Dilithium5',
  options: {
    strength: '256-bit',
    standard: 'NIST FIPS 206'
  }
});

// Signing a message
const message = 'This message will be signed';
const signature = await tetraCrypt.signMessage({
  message,
  privateKey: keyPair.privateKey,
  algorithm: 'SLH-DSA'
});

// Verifying a signature
const isValid = await tetraCrypt.verifySignature({
  message,
  signature,
  publicKey: keyPair.publicKey,
  algorithm: 'SLH-DSA'
});

// Check if verification succeeded
console.assert(isValid, 'Signature verification should succeed');

// Try verifying a tampered message
const tamperedMessage = 'This message has been tampered with';
const isInvalid = await tetraCrypt.verifySignature({
  message: tamperedMessage,
  signature,
  publicKey: keyPair.publicKey,
  algorithm: 'SLH-DSA'
});

// Check that verification fails for tampered message
console.assert(!isInvalid, 'Signature verification should fail for tampered message');`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Performance Benchmarks</h2>
                <p className="mb-4">
                  SLH-DSA-Dilithium5 provides a good balance between security and performance. Here are some benchmarks for various operations:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse mt-2">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Operation</th>
                        <th className="border p-2 text-left">Time (Desktop, Intel i7)</th>
                        <th className="border p-2 text-left">Time (Mobile, ARM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Key Generation</td>
                        <td className="border p-2">1.2 ms</td>
                        <td className="border p-2">5.8 ms</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Signing</td>
                        <td className="border p-2">2.5 ms</td>
                        <td className="border p-2">11.3 ms</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Verification</td>
                        <td className="border p-2">0.8 ms</td>
                        <td className="border p-2">3.7 ms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  Note: Benchmarks are approximations and will vary based on hardware, implementation, and optimization level.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Related Topics</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/wiki/cryptography/post-quantum-basics" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Post-Quantum Basics
            </a>
            <a href="/wiki/cryptography/kyber-algorithm" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Kyber Algorithm
            </a>
            <a href="/wiki/cryptography/zero-knowledge-proofs" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Zero-Knowledge Proofs
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default DilithiumAlgorithm;
