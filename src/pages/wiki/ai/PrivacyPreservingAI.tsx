
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Clock, Book, FileText, ShieldCheck, ArrowRight, Eye, Key, Database } from 'lucide-react';

const PrivacyPreservingAI: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-6 w-6 text-primary" />
          <Badge variant="outline" className="text-xs">ZK-SNARKs</Badge>
          <Badge variant="outline" className="text-xs">FHE</Badge>
        </div>
        <h1 className="text-3xl font-bold">Privacy-Preserving AI</h1>
        <p className="mt-2 text-muted-foreground">
          ZK-SNARKs & FHE for privacy-preserving on-chain AI transactions
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: June 20, 2023</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zk-snarks">ZK-SNARKs</TabsTrigger>
          <TabsTrigger value="fhe">Homomorphic Encryption</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Introduction to Privacy-Preserving AI</h2>
              <p className="mb-4">
                TetraCryptPQC combines zero-knowledge proofs (ZK-SNARKs) and fully homomorphic encryption (FHE) to enable AI systems that can process sensitive data while maintaining complete privacy and confidentiality. This technology allows for secure, verifiable AI computations without exposing the underlying data.
              </p>
              <p className="mb-4">
                By integrating these advanced cryptographic techniques with blockchain and AI, TetraCryptPQC creates a framework where intelligent systems can make decisions based on private data without compromising user privacy or data security.
              </p>
              <div className="bg-muted p-4 rounded-md mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Key Benefits</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI processing on encrypted data without decryption</li>
                  <li>Verifiable computation without revealing inputs or outputs</li>
                  <li>Privacy-preserving machine learning and analytics</li>
                  <li>Secure multi-party AI computation across untrusted entities</li>
                  <li>Quantum-resistant encrypted data processing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Core Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Zero-Knowledge Proofs</h3>
                  </div>
                  <p className="text-sm">
                    Cryptographic method allowing one party to prove to another that a statement is true without revealing any information beyond the validity of the statement itself.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Homomorphic Encryption</h3>
                  </div>
                  <p className="text-sm">
                    Encryption technique that allows computations on ciphertexts, generating encrypted results which, when decrypted, match the results of operations performed on the plaintext.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Private AI</h3>
                  </div>
                  <p className="text-sm">
                    AI systems designed to learn from and make predictions on data without accessing the raw information, preserving privacy and confidentiality.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Secure Multi-Party Computation</h3>
                  </div>
                  <p className="text-sm">
                    Cryptographic technique enabling multiple parties to jointly compute a function over their inputs while keeping those inputs private.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zk-snarks" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Zero-Knowledge Proofs in TetraCryptPQC</h2>
              <p className="mb-4">
                Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs) are a form of cryptographic proof that enables one party to prove to another that they know a value x without conveying any information apart from the fact that they know the value x.
              </p>
              
              <h3 className="text-lg font-medium mt-6 mb-3">ZK-SNARKs Applications in AI Security</h3>
              
              <div className="space-y-4">
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Identity Verification</h4>
                  <p className="text-sm mt-1">
                    Proving user identity without revealing personal information. AI systems can verify legitimate users without accessing or storing sensitive personal data.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Transaction Validation</h4>
                  <p className="text-sm mt-1">
                    Verifying that transactions follow security rules without revealing transaction details. AI can validate compliance without accessing private financial data.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Model Integrity</h4>
                  <p className="text-sm mt-1">
                    Proving that an AI model hasn't been tampered with without revealing the model parameters. Ensures AI security software remains trusted and uncompromised.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Confidential Inference</h4>
                  <p className="text-sm mt-1">
                    Generating proof that an AI inference was executed correctly without revealing the data or the result. Enables secure AI decision-making on sensitive data.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-3">ZK-SNARKs Technical Implementation</h3>
              <p className="text-sm mb-3">
                TetraCryptPQC uses StarkNet's Cairo language to implement zk-SNARKs for privacy-preserving AI operations. The process involves three main steps:
              </p>
              
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>
                  <span className="font-medium">Setup Phase:</span> Generate proving and verification keys for the specific computation circuit.
                </li>
                <li>
                  <span className="font-medium">Proof Generation:</span> Create a cryptographic proof that a computation was performed correctly without revealing inputs or outputs.
                </li>
                <li>
                  <span className="font-medium">Verification:</span> Validate the proof to confirm the computation was performed correctly without accessing the original data.
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fhe" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Homomorphic Encryption for AI</h2>
              <p className="mb-4">
                Fully Homomorphic Encryption (FHE) allows computations on encrypted data without decrypting it first. This revolutionary technology enables AI models to process sensitive information while ensuring that the data remains encrypted throughout the entire process.
              </p>
              
              <h3 className="text-lg font-medium mt-6 mb-3">FHE Applications in AI Security</h3>
              
              <div className="space-y-4">
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Private Machine Learning</h4>
                  <p className="text-sm mt-1">
                    Training AI models on encrypted data without exposing sensitive information. Enables collaborative learning without privacy risks.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Secure Inference</h4>
                  <p className="text-sm mt-1">
                    Running AI models on encrypted inputs to generate encrypted outputs. Users can receive AI analysis without exposing their data.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Multi-Party AI Collaboration</h4>
                  <p className="text-sm mt-1">
                    Multiple organizations can contribute encrypted data for AI analysis without revealing their proprietary information to each other.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium">Secure Data Marketplace</h4>
                  <p className="text-sm mt-1">
                    Enabling AI analysis on encrypted data in marketplaces where data providers maintain control over who can access their information.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-3">FHE Implementation in TetraCryptPQC</h3>
              <p className="text-sm mb-3">
                TetraCryptPQC implements fully homomorphic encryption using the following techniques:
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">TFHE (Fast Fully Homomorphic Encryption over the Torus):</span> Optimized for boolean and small integer operations, ideal for neural network activation functions.
                  </li>
                  <li>
                    <span className="font-medium">BFV (Brakerski/Fan-Vercauteren):</span> Efficient for integer arithmetic, used for many machine learning algorithms.
                  </li>
                  <li>
                    <span className="font-medium">CKKS (Cheon-Kim-Kim-Song):</span> Designed for approximate arithmetic on real and complex numbers, perfect for deep learning models.
                  </li>
                  <li>
                    <span className="font-medium">BGV (Brakerski-Gentry-Vaikuntanathan):</span> Used for modular arithmetic operations in certain cryptographic primitives.
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-2">Performance Optimizations</h4>
                <p className="text-sm">
                  FHE operations are computationally intensive. TetraCryptPQC implements several optimizations:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                  <li>GPU acceleration for parallel computation</li>
                  <li>Circuit optimization to minimize multiplicative depth</li>
                  <li>Hybrid approach using FHE only for sensitive parts of computation</li>
                  <li>Batching techniques to process multiple data points in parallel</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="implementation" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Implementation Architecture</h2>
              <p className="mb-4">
                TetraCryptPQC combines ZK-SNARKs and FHE technologies to create a comprehensive privacy-preserving AI framework that operates on-chain. The implementation architecture consists of several key components working together.
              </p>
              
              <div className="border p-4 rounded-md mb-6">
                <h3 className="font-medium text-lg mb-2">System Components</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Privacy-Preserving AI Executor</h4>
                      <p className="text-sm mt-1">
                        Core component that runs AI models on homomorphically encrypted data, enabling encrypted inference without exposing sensitive information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">ZK Proof Generator</h4>
                      <p className="text-sm mt-1">
                        Creates zero-knowledge proofs that verify AI operations were executed correctly without revealing inputs, outputs, or model parameters.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">On-Chain Verifier Contracts</h4>
                      <p className="text-sm mt-1">
                        StarkNet smart contracts that verify proofs and record verified results without accessing the underlying data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Key Management System</h4>
                      <p className="text-sm mt-1">
                        Secure, decentralized management of encryption keys for FHE operations, using post-quantum cryptography for future-proof security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-3">Implementation Flow</h3>
              <div className="bg-muted p-4 rounded-md text-sm">
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    <span className="font-medium">Data Encryption:</span> User data is encrypted using homomorphic encryption before being sent to the AI system.
                  </li>
                  <li>
                    <span className="font-medium">Encrypted Computation:</span> AI models perform computations directly on the encrypted data without decryption.
                  </li>
                  <li>
                    <span className="font-medium">Proof Generation:</span> A zero-knowledge proof is generated to verify the computation was performed correctly.
                  </li>
                  <li>
                    <span className="font-medium">On-Chain Verification:</span> The proof is verified on-chain through StarkNet smart contracts.
                  </li>
                  <li>
                    <span className="font-medium">Encrypted Result Delivery:</span> Encrypted results are returned to the user who can decrypt them with their private key.
                  </li>
                  <li>
                    <span className="font-medium">Verifiable Record:</span> A verified record of the computation is stored on-chain without revealing sensitive data.
                  </li>
                </ol>
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Code Example: Privacy-Preserving AI Contract</h3>
              <div className="bg-muted rounded-md overflow-x-auto">
                <pre className="text-xs p-4">
{`%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash_state import hash_init, hash_update
from starkware.cairo.common.signature import verify_signature

@contract_interface
namespace PrivateAI {
    # Verify a zero-knowledge proof of AI computation
    func verify_ai_computation{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(
        model_hash: felt,
        input_commitment: felt,
        output_commitment: felt,
        proof: (felt, felt, felt, felt),
        computation_id: felt
    ) -> (is_valid: felt);
    
    # Register encrypted AI model for privacy-preserving inference
    func register_encrypted_model{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(
        model_hash: felt,
        encryption_scheme: felt,
        model_metadata: felt,
        owner: felt
    ) -> (model_id: felt);
    
    # Request private AI inference on encrypted data
    func request_private_inference{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }(
        model_id: felt,
        encrypted_input_commitment: felt,
        requester: felt,
        signature: (felt, felt)
    ) -> (request_id: felt);
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Related Topics</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href="/wiki/ai/starknet-smart-contracts" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            StarkNet AI Smart Contracts
          </a>
          <a href="/wiki/cryptography/homomorphic-encryption" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Homomorphic Encryption
          </a>
          <a href="/wiki/cryptography/zero-knowledge-proofs" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Zero-Knowledge Proofs
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPreservingAI;
