
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  CheckCircle, 
  Database, 
  RefreshCw,
  Key,
  Network,
  FileEncrypted
} from "lucide-react";
import { AIThreatDetection } from '@/lib/storage-types';
import { Badge } from '@/components/ui/badge';

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, description, icon }) => (
  <Card className="shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-center my-3">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl font-bold">{score}%</span>
        </div>
      </div>
      <Progress value={score} className="h-2" />
      <p className="text-sm text-muted-foreground mt-3">{description}</p>
    </CardContent>
  </Card>
);

const threatData: AIThreatDetection[] = [
  {
    id: crypto.randomUUID(),
    severity: "medium",
    description: "Unusual authentication pattern detected",
    affectedComponents: ["Authentication Service"],
    remediationSteps: ["Review access logs", "Check for compromised credentials"],
    status: "active",
    timestamp: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    severity: "low",
    description: "Database query anomaly detected",
    affectedComponents: ["Database", "API Service"],
    remediationSteps: ["Review query patterns", "Update ORM layer"],
    status: "mitigated",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

const AISecurityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          AI Security Dashboard
        </CardTitle>
        <CardDescription>
          Post-quantum secure AI monitoring and threat detection
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mx-6">
          <TabsTrigger value="overview">
            <Shield className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="threats">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Threat Detection
          </TabsTrigger>
          <TabsTrigger value="homomorphic">
            <FileEncrypted className="h-4 w-4 mr-2" />
            Homomorphic AI
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-6">
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScoreCard 
                title="Overall Security Score" 
                score={92} 
                description="Your AI system's quantum-resistant security posture"
                icon={<Shield className="h-4 w-4 text-primary" />}
              />
              
              <ScoreCard 
                title="Threat Detection Accuracy" 
                score={96} 
                description="ML model performance in detecting quantum threats"
                icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
              />
              
              <ScoreCard 
                title="Zero-Knowledge Proof Coverage" 
                score={89} 
                description="Percentage of sensitive operations using ZK-proofs"
                icon={<Lock className="h-4 w-4 text-indigo-500" />}
              />
              
              <ScoreCard 
                title="Post-Quantum Compliance" 
                score={98} 
                description="Compliance with NIST FIPS 205/206 standards"
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
              />
            </div>
            
            <Card className="bg-muted/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      AI Model Verification
                    </span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      Quantum-Safe Key Rotation
                    </span>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                      Scheduled
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-primary" />
                      Homomorphic Encryption
                    </span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-primary" />
                      StarkNet Integration
                    </span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      Connected
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="threats" className="space-y-4">
            <div className="space-y-4">
              {threatData.map((threat) => (
                <Card key={threat.id} className={`
                  ${threat.severity === 'high' ? 'border-red-200 bg-red-50/50' : ''}
                  ${threat.severity === 'medium' ? 'border-amber-200 bg-amber-50/50' : ''}
                  ${threat.severity === 'low' ? 'border-blue-200 bg-blue-50/50' : ''}
                `}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 
                          ${threat.severity === 'high' ? 'text-red-500' : ''}
                          ${threat.severity === 'medium' ? 'text-amber-500' : ''}
                          ${threat.severity === 'low' ? 'text-blue-500' : ''}
                        `} />
                        {threat.description}
                      </CardTitle>
                      <Badge variant={threat.status === 'active' ? 'default' : 'outline'}>
                        {threat.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Affected: </span>
                        {threat.affectedComponents.join(', ')}
                      </div>
                      <div>
                        <span className="font-medium">Remediation: </span>
                        {threat.remediationSteps.join(', ')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Detected: {new Date(threat.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full">
                Run Deep Quantum Threat Scan
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="homomorphic" className="space-y-6">
            <div className="space-y-4">
              <Card className="bg-muted/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Homomorphic AI Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Perform AI operations on encrypted data without ever decrypting it,
                    ensuring quantum-safe privacy throughout the entire processing pipeline.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Inference on Encrypted Data</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Training on Encrypted Data</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Model Parameter Encryption</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button className="w-full">
                Enable Homomorphic Encryption for All AI Tasks
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
        <Badge variant="outline">NIST FIPS 205/206 Compliant</Badge>
      </CardFooter>
    </Card>
  );
};

export default AISecurityDashboard;
