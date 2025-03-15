
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WikiLayout from '@/components/layout/WikiLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Shield, Lock, AlertTriangle, CheckCircle2, Network, Server, FileCode, ArrowRight } from 'lucide-react';

const AISecurityModels: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">AI</Badge>
            <Badge variant="outline" className="text-xs">PQ-SCIF</Badge>
          </div>
          <h1 className="text-3xl font-bold">Post-Quantum AI Security Models</h1>
          <p className="mt-2 text-muted-foreground">
            Quantum-resistant AI security framework for classified communications
          </p>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              <span>Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="threat-detection" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Threat Detection</span>
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-1">
              <FileCode className="h-4 w-4" />
              <span>Implementation</span>
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">PQ-SCIF Security Framework Overview</h2>
                <p className="mb-4">
                  TetraCryptPQC's Post-Quantum Secure Communications (PQ-SCIF) framework integrates 
                  AI-driven security with quantum-resistant cryptography to protect classified military
                  communications, enterprise data, and decentralized networks from both classical and
                  quantum threats.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Military-Grade Security</h3>
                    </div>
                    <p className="text-sm">
                      CNSA 2.0 compliant cryptography with ML-KEM-1024 for key exchange and 
                      SLH-DSA for signatures, meeting the highest security requirements for
                      classified and top-secret communications.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">AI-Driven Threat Detection</h3>
                    </div>
                    <p className="text-sm">
                      Real-time anomaly detection using quantum-resistant neural networks
                      to identify and mitigate advanced persistent threats and quantum
                      computing attacks before they compromise systems.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Decentralized Authentication</h3>
                    </div>
                    <p className="text-sm">
                      StarkNet-based zero-knowledge proofs and decentralized identity
                      verification for quantum-resistant authentication without
                      centralized points of failure.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Secure Containerization</h3>
                    </div>
                    <p className="text-sm">
                      Podman-based secure containers with immutable rootfs and
                      hardware security module integration for air-gapped
                      and classified computing environments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Compliance and Standards</h2>
                <div className="space-y-2">
                  <Badge className="mr-2 bg-primary/10 text-primary hover:bg-primary/20">NIST FIPS 205 (ML-KEM)</Badge>
                  <Badge className="mr-2 bg-primary/10 text-primary hover:bg-primary/20">NIST FIPS 206 (SLH-DSA)</Badge>
                  <Badge className="mr-2 bg-primary/10 text-primary hover:bg-primary/20">FIPS 140-3</Badge>
                  <Badge className="mr-2 bg-primary/10 text-primary hover:bg-primary/20">NSA CNSA 2.0</Badge>
                  <Badge className="mr-2 bg-primary/10 text-primary hover:bg-primary/20">NIST SP 800-207 (Zero Trust)</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="architecture" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">PQ-SCIF Architecture</h2>
                <p className="mb-4">
                  The PQ-SCIF architecture integrates multiple layers of quantum-resistant security
                  to create a comprehensive framework for secure communications and data exchange.
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Cryptographic Foundation Layer</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>ML-KEM-1024 for post-quantum key encapsulation</li>
                      <li>SLH-DSA-Dilithium5 for quantum-resistant signatures</li>
                      <li>ChaCha20-Poly1305 for symmetric encryption</li>
                      <li>STARK-based zero-knowledge proofs for authentication</li>
                      <li>Hardware Security Module (HSM) integration</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">AI Security Layer</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Neural network anomaly detection with quantum-resistant protection</li>
                      <li>Self-learning threat models with federated privacy</li>
                      <li>Homomorphic encryption for secure AI computation</li>
                      <li>Adversarial defense mechanisms against quantum attacks</li>
                      <li>Zero-knowledge proofs for AI model validation</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Communication Protocol Layer</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>P2P WebRTC with post-quantum encryption</li>
                      <li>Self-healing mesh networks with quantum-resistant routing</li>
                      <li>Forward secrecy with automatic key rotation</li>
                      <li>Out-of-band verification channels</li>
                      <li>StarkNet-based message integrity verification</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Secure Infrastructure Layer</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Podman-based secure containerization</li>
                      <li>Immutable rootfs with secure boot verification</li>
                      <li>TPM/SGX hardware-based key protection</li>
                      <li>Distributed consensus for infrastructure governance</li>
                      <li>AI-driven self-healing security mechanisms</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="threat-detection" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">AI-Driven Threat Detection</h2>
                <p className="mb-4">
                  PQ-SCIF incorporates advanced AI models for detecting and mitigating quantum 
                  and classical threats to secure communications systems.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Quantum Side-Channel Attack Detection</h3>
                      <p className="text-sm mt-1">
                        Neural networks monitor cryptographic operations for timing, power, 
                        and electromagnetic anomalies that could indicate quantum side-channel 
                        attacks against cryptographic implementations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Harvest Now, Decrypt Later Prevention</h3>
                      <p className="text-sm mt-1">
                        AI systems identify and flag traffic patterns consistent with bulk data 
                        collection for future quantum decryption, triggering automatic key 
                        rotation and enhanced monitoring.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Zero-Day Cryptographic Vulnerability Detection</h3>
                      <p className="text-sm mt-1">
                        Continuous monitoring of cryptographic operation patterns to identify 
                        previously unknown vulnerabilities and automatically deploying countermeasures 
                        before they can be exploited.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-md">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Behavior-Based Insider Threat Detection</h3>
                      <p className="text-sm mt-1">
                        AI analysis of user behavior patterns with zero-knowledge proofs to identify 
                        suspicious activities without compromising privacy, using quantum-resistant 
                        verification of detection results.
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
                <h2 className="text-xl font-semibold mb-4">Implementation Guide</h2>
                <p className="mb-4">
                  Technical implementation details for deploying PQ-SCIF in classified
                  and enterprise environments.
                </p>
                
                <div className="space-y-4">
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Step 1: Cryptographic Foundation
                    </h3>
                    <p className="text-sm mb-2">
                      Deploy the TetraCryptPQC library with ML-KEM and SLH-DSA algorithms.
                    </p>
                    <pre className="bg-muted p-3 rounded text-xs font-mono">
                      <code>
{`// Generate quantum-resistant key pairs
const { publicKey, privateKey } = await tetraCrypt.generateMLKEMKeypair();

// Configure HSM integration if available
const hsmStatus = await tetraCrypt.checkHardwareSecurity();
if (hsmStatus.available) {
  await tetraCrypt.initializeHSM(hsmStatus.type);
}`}
                      </code>
                    </pre>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Step 2: AI Security Models
                    </h3>
                    <p className="text-sm mb-2">
                      Deploy quantum-resistant AI models for threat detection.
                    </p>
                    <pre className="bg-muted p-3 rounded text-xs font-mono">
                      <code>
{`// Initialize AI security monitoring
await tetraCrypt.initAISecurityMonitoring();

// Configure threat detection models
const threatModels = await tetraCrypt.loadThreatModels({
  quantumResistant: true,
  aiModelType: 'anomaly-detection',
  selfLearning: true
});`}
                      </code>
                    </pre>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Step 3: Secure Infrastructure
                    </h3>
                    <p className="text-sm mb-2">
                      Deploy Podman containers with secure configuration.
                    </p>
                    <pre className="bg-muted p-3 rounded text-xs font-mono">
                      <code>
{`// Create quantum-resistant secure containers
const container = await tetraCrypt.createSecureContainer(
  "pq-scif-comms",
  "tpm-protected",
  {
    immutableRootfs: true,
    rotationPolicy: {
      enabled: true,
      intervalDays: 30,
      triggerOnAnomaly: true
    }
  }
);`}
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <a href="/wiki/ai/federated-learning" className="text-primary hover:underline flex items-center">
                <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                Federated Learning
              </a>
              
              <a href="/wiki/military/cyber-warfare" className="text-primary hover:underline flex items-center">
                Cyber Warfare
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </WikiLayout>
  );
};

export default AISecurityModels;
