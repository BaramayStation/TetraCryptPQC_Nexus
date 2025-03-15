
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Network, Shield, Lock, CheckCircle2, Server, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FederatedLearning: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Network className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
            <Badge variant="outline" className="text-xs">PQ-SCIF</Badge>
          </div>
          <h1 className="text-3xl font-bold">Post-Quantum Federated Learning</h1>
          <p className="mt-2 text-muted-foreground">
            Privacy-preserving, quantum-resistant distributed AI training
          </p>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security Features</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Quantum-Resistant Federated Learning</h2>
                <p className="mb-4">
                  TetraCryptPQC enables secure federated learning with post-quantum protection,
                  allowing multiple organizations to collaboratively train AI models without
                  sharing sensitive data, secured against quantum threats.
                </p>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Key Benefits</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ML-KEM-1024 protection for model parameter transfers</li>
                    <li>Zero-knowledge proofs for model contribution validation</li>
                    <li>Homomorphic encryption for secure aggregation of updates</li>
                    <li>Distributed model validation using StarkNet smart contracts</li>
                    <li>Military-grade security for multi-agency intelligence sharing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">PQ-SCIF Federated Learning Architecture</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Secure Model Distribution</h3>
                    </div>
                    <p className="text-sm">
                      Initial AI models are encrypted with ML-KEM and signed with SLH-DSA
                      before distribution, ensuring quantum-resistant integrity and authenticity
                      verification at each participant node.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Encrypted Training</h3>
                    </div>
                    <p className="text-sm">
                      Local training occurs on encrypted data with homomorphic techniques,
                      allowing models to learn without exposing sensitive information even
                      to quantum attackers.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Secure Aggregation</h3>
                    </div>
                    <p className="text-sm">
                      Model updates are securely aggregated using multi-party computation
                      techniques with post-quantum cryptographic guarantees, preventing
                      any single point of compromise.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Verified Deployment</h3>
                    </div>
                    <p className="text-sm">
                      Final models are verified with ZK-STARK proofs and deployed with
                      quantum-resistant signatures, ensuring the entire training process
                      remains secure from quantum attacks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Quantum-Resistant Security Features</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Differential Privacy Protection</h3>
                      <p className="text-sm mt-1">
                        Quantum-resistant noise addition to prevent model inversion attacks
                        and protect against privacy leakage during federated learning, ensuring
                        individual data cannot be extracted even with quantum computing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Post-Quantum Secure Aggregation</h3>
                      <p className="text-sm mt-1">
                        ML-KEM-based secure aggregation protocols that protect individual
                        model updates while enabling collective improvement, resistant to
                        both classical and quantum-computing attacks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Poisoning Attack Detection</h3>
                      <p className="text-sm mt-1">
                        AI-driven detection of malicious model updates using secure multi-party
                        computation with post-quantum cryptography, ensuring only valid updates
                        are incorporated into the global model.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Quantum-Resistant Peer Verification</h3>
                      <p className="text-sm mt-1">
                        SLH-DSA signature-based verification of participating nodes ensures
                        only authorized entities can contribute to the federated learning
                        process, with StarkNet validation of authorization chains.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">PQ-SCIF Implementation For Federated Learning</h2>
                
                <div className="space-y-4">
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Military Intelligence Sharing</h3>
                    <p className="text-sm mb-2">
                      Implementation for secure intelligence sharing across military branches
                      and allied forces without compromising classified data:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Air-gapped training environments with HSM protection</li>
                      <li>Post-quantum secure parameter aggregation</li>
                      <li>Multi-level security classification enforcement</li>
                      <li>Cross-domain solution integration</li>
                      <li>CNSA 2.0 compliance for all communications</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Enterprise Threat Intelligence</h3>
                    <p className="text-sm mb-2">
                      Implementation for secure threat intelligence sharing across organizations:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Secure containerized training environments</li>
                      <li>Homomorphic encryption for sensitive indicator protection</li>
                      <li>Zero-knowledge contribution verification</li>
                      <li>ML-KEM encrypted model distribution</li>
                      <li>SLH-DSA signature verification of updates</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Healthcare & Biodefense Collaboration</h3>
                    <p className="text-sm mb-2">
                      Implementation for biodefense research across government and private sectors:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Differential privacy for patient data protection</li>
                      <li>Post-quantum secure model training</li>
                      <li>Regulatory compliance enforcement</li>
                      <li>Cross-organization secure model deployment</li>
                      <li>Audit trails with quantum-resistant signatures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WikiLayout>
  );
};

export default FederatedLearning;
