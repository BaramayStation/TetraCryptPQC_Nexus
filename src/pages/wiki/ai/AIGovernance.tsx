
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { FileText, Shield, Lock, CheckCircle2, Globe, AlertTriangle } from 'lucide-react';

const AIGovernance: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
            <Badge variant="outline" className="text-xs">PQ-SCIF</Badge>
          </div>
          <h1 className="text-3xl font-bold">AI Governance in PQ-SCIF</h1>
          <p className="mt-2 text-muted-foreground">
            Secure quantum-resistant governance for AI systems in classified environments
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">PQ-SCIF Governance Framework</h2>
            <p className="mb-4">
              TetraCryptPQC provides secure AI governance frameworks for military and enterprise 
              environments using post-quantum cryptography to establish tamper-proof decision trails and 
              zero-trust verification processes.
            </p>
            
            <div className="bg-muted p-4 rounded-md mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Core Principles</h3>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>CNSA 2.0 and NIST PQC compliance for all governance systems</li>
                <li>Multi-signature ML-DSA authorization for critical AI operations</li>
                <li>Tamper-proof ML-KEM encrypted logging of all AI governance decisions</li>
                <li>ZK-SNARK-based verification for AI system integrity</li>
                <li>Decentralized StarkNet validation of authorization chains</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Post-Quantum Secure Governance Layers</h2>
            
            <div className="space-y-4">
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Data Layer Protection</h3>
                </div>
                <p className="text-sm">
                  All AI training data is protected with ML-KEM-1024 encryption, with access 
                  controlled through SLH-DSA signatures and ZK-SNARK validation, ensuring 
                  quantum-resistant protection for sensitive information.
                </p>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Command Chain Validation</h3>
                </div>
                <p className="text-sm">
                  AI command authorization uses a multi-stage StarkNet-based validation system
                  with post-quantum signatures and real-time integrity verification to prevent
                  tampering or unauthorized access to AI control systems.
                </p>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Audit Trail Security</h3>
                </div>
                <p className="text-sm">
                  All AI actions are logged with tamper-proof post-quantum signatures and
                  committed to a quantum-resistant blockchain, providing verifiable records
                  while maintaining FIPS 140-3 compliance for classified environments.
                </p>
              </div>
              
              <div className="border p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Cross-Domain Governance</h3>
                </div>
                <p className="text-sm">
                  Secure cross-domain AI governance between military, intelligence, and 
                  civilian agencies using decentralized zero-knowledge verification and 
                  quantum-resistant federated learning protocols.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">PQ-SCIF Compliance Standards</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">NSA CNSA 2.0:</span>
                  <span className="text-sm ml-2">Commercial National Security Algorithm Suite 2.0 compatibility for post-quantum security</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">NIST FIPS 205/206:</span>
                  <span className="text-sm ml-2">Implements NIST-standardized post-quantum cryptographic algorithms ML-KEM and SLH-DSA</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">FIPS 140-3:</span>
                  <span className="text-sm ml-2">Hardware security module compliance for cryptographic key protection</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Zero Trust Architecture:</span>
                  <span className="text-sm ml-2">Post-quantum implementation of NIST SP 800-207 Zero Trust principles</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </WikiLayout>
  );
};

export default AIGovernance;
