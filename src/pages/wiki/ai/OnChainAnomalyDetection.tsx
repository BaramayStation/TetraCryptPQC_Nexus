
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Clock, Book, FileText, Brain, ArrowRight, AlertTriangle, Cpu, Database } from 'lucide-react';

const OnChainAnomalyDetection: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart className="h-6 w-6 text-primary" />
          <Badge variant="outline" className="text-xs">AI-Powered</Badge>
          <Badge variant="outline" className="text-xs">Blockchain</Badge>
        </div>
        <h1 className="text-3xl font-bold">AI On-Chain Anomaly Detection</h1>
        <p className="mt-2 text-muted-foreground">
          Advanced AI-powered anomaly detection and anti-fraud mechanisms for blockchain systems
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: June 18, 2023</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Introduction to On-Chain Anomaly Detection</h2>
              <p className="mb-4">
                TetraCryptPQC integrates advanced AI systems that continuously monitor blockchain transactions to detect anomalies, fraudulent activities, and security threats in real-time. These AI models operate directly on-chain through specialized smart contracts, allowing for immediate response to potential threats.
              </p>
              <p className="mb-4">
                By analyzing transaction patterns, smart contract interactions, and network behaviors, the AI detection system can identify unusual activities that may indicate attacks, exploits, or security vulnerabilities before they can cause significant damage.
              </p>
              <div className="bg-muted p-4 rounded-md mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Key Capabilities</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time analysis of transaction patterns for anomalous behavior</li>
                  <li>Automated fraud detection with quantum-resistant security</li>
                  <li>Self-learning AI models that adapt to emerging threat patterns</li>
                  <li>Zero-knowledge proof verification for privacy-preserving security</li>
                  <li>Decentralized AI governance preventing single points of control</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Behavioral Analysis</h3>
                  </div>
                  <p className="text-sm">
                    AI models establish baseline patterns of normal blockchain activity and identify deviations that may indicate security threats. Machine learning algorithms continuously refine their understanding of legitimate vs. suspicious behavior.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Threat Detection</h3>
                  </div>
                  <p className="text-sm">
                    When anomalies are detected, the system triggers appropriate responses based on the severity and nature of the potential threat, from simple logging to transaction blocking or smart contract freezing.
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Decentralized Execution</h3>
                  </div>
                  <p className="text-sm">
                    AI security models run in a decentralized manner across multiple validating nodes, preventing any single point of failure and ensuring consensus on security decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="techniques" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Detection Techniques</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Supervised Learning Models</h3>
                  <p className="text-sm mb-4">
                    Pre-trained models identify known attack patterns and fraud techniques based on historical data. These models classify transactions as benign or potentially malicious based on learned features.
                  </p>
                  <div className="bg-muted rounded-md p-3 text-sm">
                    <strong>Key Algorithms:</strong> Gradient Boosted Decision Trees, Transformer Networks, Graph Neural Networks
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Unsupervised Anomaly Detection</h3>
                  <p className="text-sm mb-4">
                    These models identify unusual patterns without prior training on labeled attack data, allowing the system to detect novel threats and zero-day exploits that have not been previously observed.
                  </p>
                  <div className="bg-muted rounded-md p-3 text-sm">
                    <strong>Key Algorithms:</strong> Isolation Forests, Autoencoders, Variational Autoencoders, One-Class SVM
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Graph-Based Analysis</h3>
                  <p className="text-sm mb-4">
                    Transactions and accounts are modeled as a graph, allowing the detection of suspicious structures and relationships that may indicate fraud rings, money laundering, or market manipulation.
                  </p>
                  <div className="bg-muted rounded-md p-3 text-sm">
                    <strong>Key Algorithms:</strong> Graph Convolutional Networks, GraphSAGE, Temporal Graph Networks
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Reinforcement Learning</h3>
                  <p className="text-sm mb-4">
                    AI agents learn optimal security policies through repeated interactions with the environment, improving detection accuracy and response effectiveness over time.
                  </p>
                  <div className="bg-muted rounded-md p-3 text-sm">
                    <strong>Key Algorithms:</strong> Deep Q-Networks, Proximal Policy Optimization, Soft Actor-Critic
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="implementation" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Implementation Architecture</h2>
              
              <div className="border p-4 rounded-md mb-6">
                <h3 className="font-medium text-lg mb-2">On-Chain Components</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Cpu className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">AI Security Oracles</span>
                      <p className="text-sm mt-1">Smart contracts that act as oracles, providing AI-validated security assessments for transactions and contracts.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Database className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Reputation Registries</span>
                      <p className="text-sm mt-1">On-chain storage of security reputation scores for addresses and contracts, maintained by decentralized AI consensus.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Anomaly Response Contracts</span>
                      <p className="text-sm mt-1">Smart contracts that automatically execute predefined security responses when anomalies are detected.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Implementation Flow</h3>
              <ol className="space-y-3 list-decimal pl-5">
                <li>
                  <span className="font-medium">Transaction Submission</span>
                  <p className="text-sm mt-1">User submits a transaction to the blockchain network.</p>
                </li>
                <li>
                  <span className="font-medium">Pre-Execution Analysis</span>
                  <p className="text-sm mt-1">AI models analyze the transaction for anomalies before execution.</p>
                </li>
                <li>
                  <span className="font-medium">Risk Scoring</span>
                  <p className="text-sm mt-1">The transaction receives a risk score based on multiple AI model assessments.</p>
                </li>
                <li>
                  <span className="font-medium">Consensus Verification</span>
                  <p className="text-sm mt-1">Decentralized nodes reach consensus on the risk assessment.</p>
                </li>
                <li>
                  <span className="font-medium">Response Execution</span>
                  <p className="text-sm mt-1">Based on risk level, appropriate security measures are automatically implemented.</p>
                </li>
                <li>
                  <span className="font-medium">Feedback Loop</span>
                  <p className="text-sm mt-1">Transaction outcomes feed back into AI models for continuous improvement.</p>
                </li>
              </ol>
              
              <div className="bg-muted p-4 rounded-md mt-6">
                <h3 className="font-medium mb-2">Code Example: Anomaly Detection Hook</h3>
                <pre className="text-xs overflow-x-auto">
{`// Cairo contract for transaction anomaly detection
func check_transaction_anomaly{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr
}(
    transaction_hash: felt,
    sender: felt,
    recipient: felt,
    amount: felt,
    sender_history_hash: felt
) -> (anomaly_score: felt) {
    // Get sender reputation score from registry
    let (sender_reputation) = ReputationRegistry.get_score(sender);
    
    // Get recipient reputation score from registry
    let (recipient_reputation) = ReputationRegistry.get_score(recipient);
    
    // Call AI oracle for anomaly assessment
    let (ai_risk_score) = AISecurityOracle.assess_transaction(
        transaction_hash,
        sender,
        recipient,
        amount,
        sender_history_hash,
        sender_reputation,
        recipient_reputation
    );
    
    // If high risk score, log the anomaly
    if (ai_risk_score > HIGH_RISK_THRESHOLD) {
        SecurityLog.record_anomaly(
            transaction_hash,
            sender,
            recipient,
            amount,
            ai_risk_score
        );
    }
    
    return (ai_risk_score);
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="case-studies" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Case Studies</h2>
              <p className="mb-6">
                Real-world examples of how AI-powered on-chain anomaly detection has prevented security incidents.
              </p>
              
              <div className="space-y-6">
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Flash Loan Attack Prevention</h3>
                  <p className="text-sm mb-3">
                    TetraCryptPQC's AI anomaly detection system identified and prevented a complex flash loan attack targeting a major DeFi protocol before it could be executed.
                  </p>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <strong>Detection Method:</strong> Graph neural networks identified unusual transaction flow patterns typical of flash loan exploits.
                    <br />
                    <strong>Response:</strong> Automatic transaction blocking and security alert to protocol developers.
                    <br />
                    <strong>Outcome:</strong> Prevented potential loss of over $45 million in user funds.
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Smart Contract Vulnerability Identification</h3>
                  <p className="text-sm mb-3">
                    The system detected an abnormal pattern of interactions with a newly deployed smart contract, leading to the discovery of a critical vulnerability.
                  </p>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <strong>Detection Method:</strong> Unsupervised learning models identified unusual state changes in contract execution.
                    <br />
                    <strong>Response:</strong> Temporary contract interaction pause and developer notification.
                    <br />
                    <strong>Outcome:</strong> Vulnerability patched before it could be exploited.
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Market Manipulation Detection</h3>
                  <p className="text-sm mb-3">
                    AI systems identified coordinated trading patterns across multiple accounts attempting to manipulate asset prices on decentralized exchanges.
                  </p>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <strong>Detection Method:</strong> Temporal graph analysis revealed coordinated trading patterns across seemingly unrelated accounts.
                    <br />
                    <strong>Response:</strong> Flagging of suspicious accounts and implementation of circuit breakers.
                    <br />
                    <strong>Outcome:</strong> Market manipulation attempt neutralized with minimal impact on legitimate trading.
                  </div>
                </div>
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
          <a href="/wiki/ai/federated-learning" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Federated Learning
          </a>
          <a href="/wiki/security/threat-models" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Security Threat Models
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnChainAnomalyDetection;
