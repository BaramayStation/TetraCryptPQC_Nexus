import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Lock, Cpu, AlertCircle, CheckCircle, Clock, 
  FileText, Terminal, BarChart, Network, Server, KeySquare
} from 'lucide-react';
import { AIThreatDetection } from '@/lib/storage-types';

const AISecurityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeThreats, setActiveThreats] = useState<AIThreatDetection[]>([
    {
      id: "threat-1",
      severity: "high",
      description: "Suspected quantum algorithm attack on ML-KEM exchange",
      affectedComponents: ["Key Exchange Module", "Authentication Service"],
      remediationSteps: ["Upgrade to ML-KEM-1024", "Verify key entropy", "Rotate affected keys"],
      status: "active",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString()
    },
    {
      id: "threat-2",
      severity: "medium",
      description: "Anomalous AI model query pattern detected",
      affectedComponents: ["AI Inference Engine", "Query Processor"],
      remediationSteps: ["Apply rate limiting", "Update anomaly detection model", "Analyze query patterns"],
      status: "active",
      timestamp: new Date(Date.now() - 45 * 60000).toISOString()
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Security Center</h2>
          <p className="text-muted-foreground">
            Quantum-resistant AI security monitoring and threat detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <AlertCircle className="mr-1 h-3 w-3" /> 2 Active Threats
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="mr-1 h-3 w-3" /> ML-KEM-1024 Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="encryption">Homomorphic AI</TabsTrigger>
          <TabsTrigger value="zero-knowledge">Zero-Knowledge Proofs</TabsTrigger>
          <TabsTrigger value="resilience">Offline Resilience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">93/100</div>
                <p className="text-xs text-muted-foreground">+5 from last week</p>
                <Progress value={93} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Models</CardTitle>
                <Cpu className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 Models</div>
                <p className="text-xs text-muted-foreground">5 quantum-resistant</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 Detected</div>
                <p className="text-xs text-muted-foreground">-3 from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 min ago</div>
                <p className="text-xs text-muted-foreground">AI-driven continuous scan</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Current system security posture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <KeySquare className="h-4 w-4 text-primary" />
                      <span>ML-KEM-1024 Key Exchange</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>SLH-DSA Signatures</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <span>Homomorphic Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-primary" />
                      <span>Secure Enclaves</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-primary" />
                      <span>Decentralized Verification</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Threats</CardTitle>
                <CardDescription>AI-detected security concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeThreats.map(threat => (
                    <div key={threat.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`h-4 w-4 ${
                            threat.severity === 'high' ? 'text-red-500' : 
                            threat.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                          }`} />
                          <span className="font-medium">{threat.description}</span>
                        </div>
                        <Badge className={
                          threat.severity === 'high' ? 'bg-red-100 text-red-800' : 
                          threat.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                        }>
                          {threat.severity} 
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Detected {new Date(threat.timestamp).toLocaleTimeString()}
                      </p>
                      <Button size="sm" variant="outline" className="w-full mt-1">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Threat Detection</CardTitle>
              <CardDescription>
                Real-time quantum and classical threat monitoring using federated ML models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The AI-powered threat detection system leverages quantum-resistant neural networks to identify and mitigate security threats in real-time.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Homomorphic AI Processing</CardTitle>
              <CardDescription>
                Process encrypted data without decryption using TFHE homomorphic encryption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>TetraCryptPQC uses fully homomorphic encryption to allow AI models to process sensitive data without ever decrypting it, maintaining complete privacy while extracting insights.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zero-knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zero-Knowledge Proof System</CardTitle>
              <CardDescription>
                Verify computational integrity without revealing sensitive information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>The integrated zk-STARK system allows TetraCryptPQC to verify the authenticity and integrity of data and computations without exposing the underlying information.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resilience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Offline AI Resilience</CardTitle>
              <CardDescription>
                Continue security operations during network disruptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>TetraCryptPQC's distributed AI system can operate entirely offline, with local neural network models that sync and validate when connectivity is restored.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISecurityDashboard;
