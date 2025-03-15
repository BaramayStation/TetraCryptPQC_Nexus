
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EyeOff, Clock, Book, ArrowRight, FileText, Code } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const ZeroKnowledgeProofs: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <EyeOff className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Privacy-Preserving</Badge>
            <Badge variant="outline" className="text-xs">Post-Quantum</Badge>
          </div>
          <h1 className="text-3xl font-bold">Zero-Knowledge Proofs</h1>
          <p className="mt-2 text-muted-foreground">
            Cryptographic methods to prove knowledge without revealing sensitive information
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: July 15, 2023</span>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="zkstarks">ZK-STARKs</TabsTrigger>
            <TabsTrigger value="zksnarks">ZK-SNARKs</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Introduction to Zero-Knowledge Proofs</h2>
                <p className="mb-4">
                  Zero-Knowledge Proofs (ZKPs) are cryptographic protocols that allow one party (the prover) to prove to another party (the verifier) that a statement is true, without revealing any information beyond the validity of the statement itself.
                </p>
                <p className="mb-4">
                  In the context of TetraCryptPQC, zero-knowledge proofs are used to enhance privacy and security in various applications, from identity verification to secure computation, while maintaining quantum resistance.
                </p>
                <div className="bg-muted p-4 rounded-md mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Key Properties of Zero-Knowledge Proofs</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Completeness:</strong> If the statement is true, an honest verifier will be convinced by an honest prover</li>
                    <li><strong>Soundness:</strong> If the statement is false, no cheating prover can convince an honest verifier that it is true (except with negligible probability)</li>
                    <li><strong>Zero-Knowledge:</strong> The verifier learns nothing other than the fact that the statement is true</li>
                    <li><strong>Post-Quantum Security:</strong> TetraCryptPQC implements ZKP schemes that are resistant to quantum attacks</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Types of Zero-Knowledge Proofs</h2>
                <p className="mb-4">
                  TetraCryptPQC supports various types of zero-knowledge proof systems, each with different properties and use cases:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">ZK-STARKs</h3>
                    <p className="text-sm text-muted-foreground">
                      Zero-Knowledge Scalable Transparent Arguments of Knowledge - transparent setup, post-quantum secure, but larger proof sizes.
                    </p>
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between">
                        <span>Quantum Resistance:</span>
                        <span className="font-medium text-primary">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proof Size:</span>
                        <span>Large</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup:</span>
                        <span>Transparent (No trusted setup)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">ZK-SNARKs</h3>
                    <p className="text-sm text-muted-foreground">
                      Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge - smaller proofs, but requires trusted setup and susceptible to quantum attacks in their standard form.
                    </p>
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between">
                        <span>Quantum Resistance:</span>
                        <span>Low (standard) / High (post-quantum variants)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proof Size:</span>
                        <span className="font-medium text-primary">Very Small</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup:</span>
                        <span>Trusted setup required</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-muted-foreground">
                  TetraCryptPQC primarily uses quantum-resistant ZK-STARKs for maximum security, but also offers post-quantum variants of ZK-SNARKs for applications where proof size is critical.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="zkstarks" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">ZK-STARKs in TetraCryptPQC</h2>
                <p className="mb-4">
                  ZK-STARKs (Zero-Knowledge Scalable Transparent ARguments of Knowledge) are a type of cryptographic proof system that allows one party to prove to another that they have certain information without revealing the information itself.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Key Advantages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Post-Quantum Security:</strong> Based on hash functions rather than elliptic curves or number-theoretic problems vulnerable to quantum attacks</li>
                  <li><strong>Transparent Setup:</strong> No need for a trusted setup ceremony, eliminating risks associated with parameter generation</li>
                  <li><strong>Scalability:</strong> Proving time scales quasi-linearly with computation size, allowing for complex statements</li>
                  <li><strong>Information-Theoretic Soundness:</strong> Offers stronger security guarantees than computational soundness</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Implementation Details</h3>
                <p className="mb-4">
                  TetraCryptPQC's implementation of ZK-STARKs uses the following components:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Algebraic Intermediate Representation (AIR):</strong> For converting computational statements into polynomial constraints</li>
                  <li><strong>Fast Reed-Solomon Interactive Oracle Proofs:</strong> For efficiently proving polynomial evaluations</li>
                  <li><strong>Merkle Trees:</strong> For commitment schemes with collision-resistant hash functions</li>
                  <li><strong>Fiat-Shamir Transformation:</strong> For making interactive proofs non-interactive</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="zksnarks" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">ZK-SNARKs in TetraCryptPQC</h2>
                <p className="mb-4">
                  ZK-SNARKs (Zero-Knowledge Succinct Non-interactive ARguments of Knowledge) are compact zero-knowledge proof systems that allow for very small proof sizes and quick verification.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Post-Quantum ZK-SNARKs</h3>
                <p className="mb-4">
                  Traditional ZK-SNARKs rely on elliptic curve cryptography which is vulnerable to quantum attacks. TetraCryptPQC implements post-quantum variants that replace these components with quantum-resistant alternatives:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Lattice-Based ZK-SNARKs:</strong> Using module learning with errors (MLWE) problems</li>
                  <li><strong>Hash-Based Commitment Schemes:</strong> Replacing elliptic curve points with hash-based commitments</li>
                  <li><strong>Isogeny-Based Approaches:</strong> For applications requiring smaller proof sizes with moderate quantum security</li>
                </ul>
                
                <div className="bg-muted p-4 rounded-md mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <EyeOff className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Trusted Setup Considerations</h3>
                  </div>
                  <p className="text-sm">
                    Even post-quantum ZK-SNARKs require a trusted setup phase, which introduces potential security risks if the setup parameters are compromised. TetraCryptPQC implements multi-party computation (MPC) ceremonies for generating these parameters, ensuring that they remain secure unless all participants collude.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Implementation and Use Cases</h2>
                <p className="mb-4">
                  TetraCryptPQC provides APIs for generating and verifying zero-knowledge proofs for various applications:
                </p>
                
                <div className="space-y-6 mt-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Example: Identity Verification
                    </h3>
                    
                    <pre className="text-sm bg-muted p-3 rounded-md mt-3 overflow-x-auto">
{`// Generate a ZK proof for identity verification
const { generateZKProof, verifyZKProof } = require('tetracryptpqc');

async function verifyIdentity() {
  // User data to be proven (e.g., over 18 years old without revealing actual age)
  const userData = {
    age: 25,
    nationalId: "123456789",
    biometricHash: "a1b2c3d4e5f6..."
  };
  
  // Generate a proof that the user is over 18 without revealing their actual age
  const statement = {
    type: "ageVerification",
    claim: "over18",
    userData: userData
  };
  
  // Generate the zero-knowledge proof
  const proof = await generateZKProof(statement);
  
  // The proof can be sent to a verifier
  console.log("Generated proof:", proof);
  
  // Verifier can check the proof without learning the actual age
  const isValid = await verifyZKProof(proof, { type: "ageVerification", claim: "over18" });
  
  console.log("Proof verification result:", isValid);
  
  return isValid;
}`}
                    </pre>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Example: Private Smart Contract Interaction
                    </h3>
                    
                    <pre className="text-sm bg-muted p-3 rounded-md mt-3 overflow-x-auto">
{`// Private interaction with a StarkNet smart contract
const { generateZKProof, interactWithContract } = require('tetracryptpqc');

async function privateVote() {
  // User's private vote information
  const voteData = {
    choice: "CandidateA",
    voterId: "voter123",
    district: "District7"
  };
  
  // Generate a proof that the vote is valid without revealing the choice
  const statement = {
    type: "validVote",
    parameters: {
      validChoices: ["CandidateA", "CandidateB", "CandidateC"],
      voterRegistry: "0x123..." // Contract address of voter registry
    },
    voteData: voteData
  };
  
  // Generate the zero-knowledge proof
  const proof = await generateZKProof(statement);
  
  // Submit the proof to the voting contract without revealing the vote choice
  const result = await interactWithContract({
    contractAddress: "0x456...", // Voting contract
    method: "castVote",
    parameters: {
      proof: proof,
      pubInputs: {
        voterId: voteData.voterId,
        district: voteData.district
      }
    }
  });
  
  console.log("Vote submitted with ZK proof. Transaction:", result.txHash);
  
  return result;
}`}
                    </pre>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Other Use Cases</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Private Transactions:</strong> Proving funds are available without revealing balances</li>
                  <li><strong>Compliance Verification:</strong> Proving regulatory compliance without revealing sensitive business data</li>
                  <li><strong>Secure Authentication:</strong> Proving identity without revealing credentials</li>
                  <li><strong>Confidential Computing:</strong> Proving computations were performed correctly without revealing inputs or outputs</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Related Topics</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/wiki/cryptography/homomorphic-encryption" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Homomorphic Encryption
            </a>
            <a href="/wiki/ai/starknet-smart-contracts" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              StarkNet Smart Contracts
            </a>
            <a href="/wiki/identity/decentralized-identity" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Decentralized Identity
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default ZeroKnowledgeProofs;
