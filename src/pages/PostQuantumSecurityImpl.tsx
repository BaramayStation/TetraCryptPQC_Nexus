
import React from 'react';
import { MainLayout } from '@/layout/MainLayout';
import PostQuantumImplementation from '@/components/security/PostQuantumImplementation';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Code, Server, Terminal, Lock } from 'lucide-react';

const PostQuantumSecurityImpl: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Post-Quantum Cryptography Implementation
          </h1>
          <p className="text-muted-foreground">
            NIST-approved Post-Quantum Cryptography with Rust and Go
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Rust PQC Libraries
              </CardTitle>
              <CardDescription>Core cryptography</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>ML-KEM (Kyber) - FIPS 205</li>
                <li>SLH-DSA (Dilithium) - FIPS 206</li>
                <li>Falcon signatures</li>
                <li>NIST test vectors</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Go PQC Services
              </CardTitle>
              <CardDescription>Network services</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>PQ-TLS 1.3 implementation</li>
                <li>Post-quantum VPN</li>
                <li>Secure microservices</li>
                <li>Network security scanning</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Podman Deployment
              </CardTitle>
              <CardDescription>Containerized security</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Isolated security containers</li>
                <li>PQC microservices architecture</li>
                <li>Quantum-resistant APIs</li>
                <li>Zero-trust deployment</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Enterprise Security
              </CardTitle>
              <CardDescription>Compliance & standards</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>NIST FIPS 205 & 206 compliance</li>
                <li>Performance benchmarking</li>
                <li>Formal verification</li>
                <li>Military-grade security</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <PostQuantumImplementation />
      </div>
    </MainLayout>
  );
};

export default PostQuantumSecurityImpl;
