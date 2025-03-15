
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert, Clock, Book, FileText, ArrowRight } from 'lucide-react';

const PostQuantumBasics: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <Badge variant="outline" className="text-xs">NIST FIPS 205/206 Compliant</Badge>
        </div>
        <h1 className="text-3xl font-bold">Post-Quantum Cryptography Basics</h1>
        <p className="mt-2 text-muted-foreground">
          Fundamental concepts of quantum-resistant cryptographic systems
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: August 10, 2023</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="quantum-threats">Quantum Threats</TabsTrigger>
          <TabsTrigger value="algorithms">PQ Algorithms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Introduction to Post-Quantum Cryptography</h2>
              <p className="mb-4">
                Post-Quantum Cryptography (PQC) refers to cryptographic algorithms that are thought to be secure against an attack by a quantum computer. As quantum computing advances, traditional public-key cryptography systems like RSA and ECC will become vulnerable, creating a need for quantum-resistant alternatives.
              </p>
              <p className="mb-4">
                TetraCryptPQC implements NIST-standardized post-quantum cryptographic algorithms to ensure security in a post-quantum world. These algorithms are designed to resist attacks from both classical and quantum computers.
              </p>
              <div className="bg-muted p-4 rounded-md mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Key Points to Remember</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Post-quantum cryptography protects against quantum computing threats</li>
                  <li>Shor's algorithm can break RSA, DSA, and ECC cryptography</li>
                  <li>NIST has standardized new post-quantum algorithms in FIPS 205 and 206</li>
                  <li>TetraCryptPQC implements ML-KEM-1024 and SLH-DSA for maximum security</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">The Quantum Threat</h2>
              <p className="mb-4">
                Quantum computers leverage quantum mechanical phenomena like superposition and entanglement to perform operations on data. When large-scale quantum computers become a reality, they will be able to solve certain mathematical problems exponentially faster than classical computers.
              </p>
              <p className="mb-4">
                In 1994, Peter Shor developed a quantum algorithm (now known as Shor's algorithm) that efficiently solves the integer factorization problem, which is the foundation of RSA cryptography. Similarly, it can also solve the discrete logarithm problem used in Diffie-Hellman and elliptic curve cryptography.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Fundamental Concepts</h2>
              <p>This section covers the fundamental concepts of post-quantum cryptography.</p>
              {/* Placeholder for content */}
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detailed content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quantum-threats" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Quantum Computing Threats</h2>
              <p>This section details the specific threats posed by quantum computing.</p>
              {/* Placeholder for content */}
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detailed content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="algorithms" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Post-Quantum Algorithms</h2>
              <p>This section explains the various post-quantum cryptographic algorithms.</p>
              {/* Placeholder for content */}
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detailed content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Related Topics</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href="/wiki/cryptography/kyber-algorithm" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Kyber Algorithm
          </a>
          <a href="/wiki/cryptography/dilithium-algorithm" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Dilithium Algorithm
          </a>
          <a href="/wiki/security/threat-models" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Quantum Threat Models
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostQuantumBasics;
