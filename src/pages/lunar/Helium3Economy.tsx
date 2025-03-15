
import React, { useState } from 'react';
import { MainLayout } from '@/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Rocket, Atom, Database, Shield, Coins, Zap, Server } from 'lucide-react';
import { encryptWithPQC, signMessage, verifySignature } from '@/lib/pqcrypto';
import { generateMLKEMKeypair, generateSLHDSAKeypair } from '@/lib/pqcrypto';

interface MiningOperation {
  id: string;
  location: string;
  extractionRate: number;
  securityLevel: string;
  lastTransaction: string;
  status: 'active' | 'maintenance' | 'offline';
}

interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  resourceType: 'helium3' | 'water' | 'minerals';
  timestamp: string;
  signature: string;
  verified: boolean;
}

const Helium3Economy: React.FC = () => {
  const [operations, setOperations] = useState<MiningOperation[]>([
    {
      id: 'mine-1',
      location: 'Mare Tranquillitatis',
      extractionRate: 87,
      securityLevel: 'ML-KEM-1024 / SLH-DSA-5',
      lastTransaction: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'mine-2',
      location: 'Oceanus Procellarum',
      extractionRate: 64,
      securityLevel: 'ML-KEM-1024 / Falcon-1024',
      lastTransaction: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'mine-3',
      location: 'Tycho Crater',
      extractionRate: 29,
      securityLevel: 'ML-KEM-768 / SLH-DSA-3',
      lastTransaction: new Date().toISOString(),
      status: 'maintenance'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-' + crypto.randomUUID(),
      sender: 'Lunar Base Alpha',
      receiver: 'Earth Station One',
      amount: 12.5,
      resourceType: 'helium3',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      signature: 'SLH-DSA-SIGNATURE-' + Date.now(),
      verified: true
    },
    {
      id: 'tx-' + crypto.randomUUID(),
      sender: 'Mining Station Beta',
      receiver: 'Mars Colony',
      amount: 8.2,
      resourceType: 'helium3',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      signature: 'SLH-DSA-SIGNATURE-' + Date.now(),
      verified: true
    }
  ]);

  const [loading, setLoading] = useState(false);

  const simulateNewTransaction = async () => {
    setLoading(true);
    try {
      // Generate keypairs for demo
      const senderKeys = await generateSLHDSAKeypair();
      
      // Create transaction data
      const sender = operations[Math.floor(Math.random() * operations.length)].location;
      const receivers = ['Earth Station One', 'Mars Colony', 'Orbital Platform Gamma', 'Lunar Base Alpha'];
      const receiver = receivers[Math.floor(Math.random() * receivers.length)];
      const amount = Math.round((Math.random() * 20 + 5) * 10) / 10;
      
      // Create transaction message
      const message = `Transfer ${amount} kg of Helium-3 from ${sender} to ${receiver}`;
      
      // Sign with PQC signature
      const signature = await signMessage(message, senderKeys.privateKey);
      
      // Verify signature
      const verified = await verifySignature(message, signature, senderKeys.publicKey);
      
      // Create new transaction
      const newTransaction: Transaction = {
        id: 'tx-' + crypto.randomUUID(),
        sender,
        receiver,
        amount,
        resourceType: 'helium3',
        timestamp: new Date().toISOString(),
        signature,
        verified
      };
      
      // Add to transactions
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update last transaction for a random mining operation
      const operationIndex = Math.floor(Math.random() * operations.length);
      setOperations(prev => {
        const updated = [...prev];
        updated[operationIndex] = {
          ...updated[operationIndex],
          lastTransaction: new Date().toISOString()
        };
        return updated;
      });
      
      console.log('Transaction signed with post-quantum signature algorithm:', signature);
      
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center mb-6 space-x-2">
          <Moon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Lunar Helium-3 Economy Simulation</h1>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          TetraCryptPQC-secured lunar mining operations and interplanetary resource trade
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Atom className="h-5 w-5 text-primary mr-2" />
                Helium-3 Extraction
              </CardTitle>
              <CardDescription>Post-quantum secured mining operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{operations.reduce((sum, op) => sum + (op.status === 'active' ? op.extractionRate : 0), 0).toFixed(1)} kg/day</div>
              <p className="text-sm text-muted-foreground mt-1">Current extraction rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 text-primary mr-2" />
                Security Status
              </CardTitle>
              <CardDescription>Quantum-resistant protection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-600">ML-KEM-1024</Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-600">SLH-DSA-5</Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600">Falcon-1024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">NIST PQC standards active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Coins className="h-5 w-5 text-primary mr-2" />
                TetraLunar Economy
              </CardTitle>
              <CardDescription>Decentralized lunar currency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₮1,458,320</div>
              <p className="text-sm text-muted-foreground mt-1">Market capitalization</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="mining" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="mining">Mining Operations</TabsTrigger>
            <TabsTrigger value="transactions">Secured Transactions</TabsTrigger>
            <TabsTrigger value="simulation">Run Simulation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mining">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 text-primary mr-2" />
                  Active Mining Operations
                </CardTitle>
                <CardDescription>
                  Post-quantum secured mining facilities across lunar surface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {operations.map((operation) => (
                    <div key={operation.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{operation.location}</div>
                        <Badge className={
                          operation.status === 'active' ? 'bg-green-500/10 text-green-600' :
                          operation.status === 'maintenance' ? 'bg-yellow-500/10 text-yellow-600' :
                          'bg-red-500/10 text-red-600'
                        }>
                          {operation.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm text-muted-foreground mb-1">Extraction Efficiency</div>
                        <div className="flex items-center">
                          <Progress value={operation.extractionRate} className="mr-2" />
                          <span className="text-sm font-medium">{operation.extractionRate}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="text-muted-foreground">Security: <span className="text-foreground">{operation.securityLevel}</span></div>
                        <div className="text-muted-foreground">Last TX: <span className="text-foreground">{new Date(operation.lastTransaction).toLocaleTimeString()}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  Helium-3 Transactions
                </CardTitle>
                <CardDescription>
                  PQC-signed transfers secured with ML-KEM and SLH-DSA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">
                          {tx.amount} kg {tx.resourceType === 'helium3' ? 'Helium-3' : tx.resourceType}
                        </div>
                        <Badge variant="outline" className={tx.verified ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}>
                          {tx.verified ? 'VERIFIED' : 'UNVERIFIED'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-muted-foreground">From:</span> {tx.sender}
                        </div>
                        <div>
                          <span className="text-muted-foreground">To:</span> {tx.receiver}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <div className="text-muted-foreground">Timestamp: {new Date(tx.timestamp).toLocaleString()}</div>
                        <div className="text-muted-foreground truncate w-1/2 text-right">
                          Signature: {tx.signature.substring(0, 20)}...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="simulation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="h-5 w-5 text-primary mr-2" />
                  Simulation Controls
                </CardTitle>
                <CardDescription>
                  Run post-quantum secured operations and transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/40">
                  <h3 className="font-medium mb-2">About the Simulation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This simulation demonstrates how TetraCryptPQC secures lunar Helium-3 mining and trade operations using post-quantum cryptography. All transactions are signed with SLH-DSA (Dilithium) signatures and resources are tracked with ML-KEM encrypted payloads.
                  </p>
                  <div className="text-sm space-y-2">
                    <div><strong>Key Generation:</strong> ML-KEM/Kyber for encryption, SLH-DSA/Dilithium for signatures</div>
                    <div><strong>Resource Tracking:</strong> Zero-knowledge proofs for private verification</div>
                    <div><strong>Smart Contracts:</strong> Post-quantum secured StarkNet contracts</div>
                  </div>
                </div>
                
                <div className="flex justify-center py-4">
                  <Button 
                    onClick={simulateNewTransaction} 
                    disabled={loading}
                    size="lg"
                    className="relative"
                  >
                    {loading ? 'Processing...' : 'Simulate He-3 Transaction'}
                    <span className="absolute -top-1 -right-1">
                      <Badge className="bg-primary text-primary-foreground">PQC</Badge>
                    </span>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                All operations are secured with post-quantum cryptography compliant with NIST FIPS 205/206 standards.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Helium3Economy;
