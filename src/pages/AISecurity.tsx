
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Shield, 
  Brain, 
  Lock, 
  Database, 
  Server, 
  Zap, 
  Search, 
  FileText, 
  Wifi, 
  WifiOff,
  ScrollText,
  Fingerprint,
  Key
} from 'lucide-react';
import { detectThreats } from '@/lib/ai-security';
import { encryptForAIProcessing, generateSecurityReport } from '@/lib/ai-security';
import { AISecurityDashboard } from '@/components/security/AISecurityDashboard';
import { StarkNetAuth } from '@/components/security/StarkNetAuth';

const AISecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [threatAnalysisRunning, setThreatAnalysisRunning] = useState(false);
  const [threatResults, setThreatResults] = useState<any>(null);
  const [securityReport, setSecurityReport] = useState<any>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionResults, setEncryptionResults] = useState<any>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  
  // Security metrics
  const [securityMetrics, setSecurityMetrics] = useState({
    quantumResistanceScore: 92,
    aiSecurityScore: 87,
    dataPrivacyScore: 95,
    offlineResilienceScore: 83,
    overallSecurityScore: 89
  });

  useEffect(() => {
    // Check if we're in offline mode
    const checkConnectivity = () => {
      setOfflineMode(!navigator.onLine);
    };

    window.addEventListener('online', checkConnectivity);
    window.addEventListener('offline', checkConnectivity);
    checkConnectivity();

    return () => {
      window.removeEventListener('online', checkConnectivity);
      window.removeEventListener('offline', checkConnectivity);
    };
  }, []);

  const runThreatDetection = async () => {
    setThreatAnalysisRunning(true);
    setThreatResults(null);
    
    try {
      // Sample data for threat detection
      const sampleData = JSON.stringify({
        operation: "file_access",
        timestamp: new Date().toISOString(),
        userId: "user123",
        resourceId: "sensitive_doc_456",
        accessPattern: "multiple_sequential_reads",
        metadata: {
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...",
          location: "New York, USA",
          previousAccesses: ["2023-05-10T14:55:22Z", "2023-05-10T14:57:01Z"]
        }
      });
      
      // Run AI-powered threat detection
      const results = await detectThreats(sampleData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setThreatResults(results);
      
      if (results.detected) {
        toast({
          title: "Security Threats Detected",
          description: `${results.threats.length} potential security ${results.threats.length === 1 ? 'threat' : 'threats'} found`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "No Threats Detected",
          description: "The AI analysis found no security threats in the provided data",
        });
      }
    } catch (error) {
      console.error("Error during threat detection:", error);
      toast({
        title: "Error",
        description: "Failed to perform AI threat detection",
        variant: "destructive",
      });
    } finally {
      setThreatAnalysisRunning(false);
    }
  };

  const generateAISecurityReport = async () => {
    setIsGeneratingReport(true);
    setSecurityReport(null);
    
    try {
      // Generate a security compliance report
      const report = await generateSecurityReport();
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSecurityReport(report);
      
      toast({
        title: "Security Report Generated",
        description: "AI-enhanced security compliance report is ready",
      });
    } catch (error) {
      console.error("Error generating security report:", error);
      toast({
        title: "Error",
        description: "Failed to generate security report",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const runHomomorphicEncryption = async () => {
    setIsEncrypting(true);
    setEncryptionResults(null);
    
    try {
      // Sample data for homomorphic encryption
      const sampleData = {
        sensitiveField1: "Personal Identifier XYZ-123-456",
        sensitiveField2: "Financial Data: Account Balance $12,345.67",
        sensitiveField3: "Medical Record: Patient #98765, Diagnosis Code ICD-10"
      };
      
      // Run homomorphic encryption for AI processing
      const results = await encryptForAIProcessing(sampleData, 'classification');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      setEncryptionResults(results);
      
      toast({
        title: "Homomorphic Encryption Applied",
        description: "Data is now encrypted for secure AI processing",
      });
    } catch (error) {
      console.error("Error during homomorphic encryption:", error);
      toast({
        title: "Encryption Error",
        description: "Failed to apply homomorphic encryption",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {offlineMode && (
        <Alert variant="destructive" className="mb-6">
          <WifiOff className="h-4 w-4" />
          <AlertTitle>Offline Mode</AlertTitle>
          <AlertDescription>
            You are currently in offline mode. TetraCryptPQC is providing local AI security with limited functionality.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">AI Security</h1>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">TetraCryptPQC Secured</span>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="threats">Threat Detection</TabsTrigger>
              <TabsTrigger value="privacy">AI Privacy</TabsTrigger>
              <TabsTrigger value="decentralized">Decentralized Security</TabsTrigger>
              <TabsTrigger value="offline">Offline Resilience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      Post-Quantum Security
                    </CardTitle>
                    <CardDescription>
                      TetraCryptPQC employs NIST-approved quantum-resistant algorithms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>ML-KEM-1024 (Key Encapsulation)</span>
                          <span>Active</span>
                        </div>
                        <Progress value={100} className="h-2 bg-primary/20" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>SLH-DSA (Digital Signatures)</span>
                          <span>Active</span>
                        </div>
                        <Progress value={100} className="h-2 bg-primary/20" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Falcon (Alternate Signatures)</span>
                          <span>Ready</span>
                        </div>
                        <Progress value={85} className="h-2 bg-primary/20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      AI-Powered Security
                    </CardTitle>
                    <CardDescription>
                      TetraCryptPQC leverages AI for enhanced threat detection
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>AI Anomaly Detection</span>
                          <span>Active</span>
                        </div>
                        <Progress value={92} className="h-2 bg-primary/20" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Self-Healing Security</span>
                          <span>Active</span>
                        </div>
                        <Progress value={85} className="h-2 bg-primary/20" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Homomorphic AI Privacy</span>
                          <span>Ready</span>
                        </div>
                        <Progress value={78} className="h-2 bg-primary/20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>TetraCryptPQC Security Metrics</CardTitle>
                  <CardDescription>Real-time security assessment of your environment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Quantum Resistance</span>
                        <span className="text-sm">{securityMetrics.quantumResistanceScore}%</span>
                      </div>
                      <Progress 
                        value={securityMetrics.quantumResistanceScore} 
                        className="h-2" 
                        indicator="Exceptional" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">AI Security Integration</span>
                        <span className="text-sm">{securityMetrics.aiSecurityScore}%</span>
                      </div>
                      <Progress 
                        value={securityMetrics.aiSecurityScore} 
                        className="h-2" 
                        indicator="Good" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Data Privacy Protection</span>
                        <span className="text-sm">{securityMetrics.dataPrivacyScore}%</span>
                      </div>
                      <Progress 
                        value={securityMetrics.dataPrivacyScore} 
                        className="h-2" 
                        indicator="Exceptional" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Offline Resilience</span>
                        <span className="text-sm">{securityMetrics.offlineResilienceScore}%</span>
                      </div>
                      <Progress 
                        value={securityMetrics.offlineResilienceScore} 
                        className="h-2" 
                        indicator="Good" 
                      />
                    </div>
                    
                    <div className="mt-8">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Security Rating</span>
                        <span className="text-sm">{securityMetrics.overallSecurityScore}%</span>
                      </div>
                      <Progress 
                        value={securityMetrics.overallSecurityScore} 
                        className="h-3" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="threats" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldAlert className="h-5 w-5 mr-2 text-primary" />
                    AI-Powered Threat Detection
                  </CardTitle>
                  <CardDescription>
                    TetraCryptPQC uses advanced AI to detect and mitigate security threats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Our AI security model can analyze patterns and detect anomalies that may indicate security threats, even in quantum-resistant systems.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                      <div className="p-4 border rounded-md flex flex-col items-center text-center">
                        <Search className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-medium">Anomaly Detection</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Identifies unusual access patterns
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md flex flex-col items-center text-center">
                        <Zap className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-medium">Real-Time Response</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Takes immediate action on threats
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md flex flex-col items-center text-center">
                        <Brain className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-medium">Self-Learning</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Improves detection over time
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={runThreatDetection}
                      disabled={threatAnalysisRunning}
                    >
                      {threatAnalysisRunning ? (
                        <>
                          <Shield className="h-4 w-4 mr-2 animate-pulse" />
                          Analyzing Threats...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Run AI Threat Detection
                        </>
                      )}
                    </Button>
                    
                    {threatResults && (
                      <div className="mt-4 p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Threat Analysis Results</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${threatResults.detected ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          <span className="text-sm">
                            {threatResults.detected ? 'Threats Detected' : 'No Threats Detected'}
                          </span>
                        </div>
                        
                        {threatResults.detected && (
                          <div className="space-y-3 mt-3">
                            <p className="text-sm">Detected {threatResults.threats.length} potential {threatResults.threats.length === 1 ? 'threat' : 'threats'}:</p>
                            
                            {threatResults.threats.map((threat: any, index: number) => (
                              <div key={index} className="bg-muted p-2 rounded-md text-sm">
                                <div className="font-medium">{threat.description}</div>
                                <div className="text-xs mt-1">
                                  Severity: <span className={
                                    threat.severity === 'critical' ? 'text-red-500' :
                                    threat.severity === 'high' ? 'text-orange-500' :
                                    threat.severity === 'medium' ? 'text-yellow-500' :
                                    'text-blue-500'
                                  }>{threat.severity}</span>
                                </div>
                                <div className="text-xs mt-1">
                                  Recommendation: {threatResults.recommendation}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-3">
                          <div className="text-xs font-medium">Threat Score</div>
                          <Progress value={threatResults.score} className="h-2 mt-1" />
                          <div className="text-xs text-muted-foreground mt-1">
                            {threatResults.score}% risk level
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    AI Security Compliance Report
                  </CardTitle>
                  <CardDescription>
                    Generate a comprehensive security assessment report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      The AI-enhanced security report provides detailed insights into your system's quantum resistance, compliance with security standards, and recommendations for improvement.
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={generateAISecurityReport}
                      disabled={isGeneratingReport}
                    >
                      {isGeneratingReport ? (
                        <>
                          <ScrollText className="h-4 w-4 mr-2 animate-pulse" />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <ScrollText className="h-4 w-4 mr-2" />
                          Generate Security Report
                        </>
                      )}
                    </Button>
                    
                    {securityReport && (
                      <div className="mt-4 p-4 border rounded-md space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Security Compliance Report</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Report #{securityReport.id}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-xs text-muted-foreground">Generated:</span>
                            <div>{new Date(securityReport.timestamp).toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Valid Until:</span>
                            <div>{new Date(securityReport.validUntil).toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Compliance Standards:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {securityReport.standards.map((standard: string, index: number) => (
                              <span 
                                key={index} 
                                className="text-xs bg-muted px-2 py-1 rounded-full"
                              >
                                {standard}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Overall Compliance Score:</span>
                          <div className="flex items-center mt-1">
                            <Progress value={securityReport.overallScore} className="flex-1 h-2" />
                            <span className="ml-2 text-sm font-medium">{securityReport.overallScore}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground">Key Findings:</span>
                          <div className="space-y-2 mt-1">
                            {securityReport.findings.map((finding: any, index: number) => (
                              <div key={index} className="bg-muted p-2 rounded-md text-xs">
                                <div className="font-medium">{finding.requirement} - {finding.description}</div>
                                <div className="mt-1 flex justify-between">
                                  <span>Status: <span className={
                                    finding.status === 'compliant' ? 'text-green-500' : 'text-red-500'
                                  }>{finding.status}</span></span>
                                  <span>{finding.standard}</span>
                                </div>
                                {finding.recommendation && (
                                  <div className="mt-1 text-muted-foreground">{finding.recommendation}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-primary" />
                    Homomorphic Encryption for AI
                  </CardTitle>
                  <CardDescription>
                    Process data with AI while keeping it fully encrypted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      TetraCryptPQC uses homomorphic encryption to allow AI processing on encrypted data, ensuring privacy even during analysis.
                    </p>
                    
                    <div className="flex items-center p-4 bg-muted rounded-md my-4">
                      <Lock className="h-10 w-10 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Privacy-Preserving AI</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your data remains encrypted during the entire AI processing pipeline, ensuring complete privacy and confidentiality.
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={runHomomorphicEncryption}
                      disabled={isEncrypting}
                    >
                      {isEncrypting ? (
                        <>
                          <Lock className="h-4 w-4 mr-2 animate-pulse" />
                          Encrypting Data for AI...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Demo Homomorphic Encryption
                        </>
                      )}
                    </Button>
                    
                    {encryptionResults && (
                      <div className="mt-4 p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Homomorphic Encryption Results</h3>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-muted-foreground">Encrypted Data:</span>
                            <div className="bg-muted p-2 rounded-md mt-1 font-mono text-xs overflow-x-auto">
                              {encryptionResults.encryptedData}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-xs text-muted-foreground">Operation Type:</span>
                            <div className="text-sm mt-1">
                              {encryptionResults.operationType} (can process while encrypted)
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">
                              {encryptionResults.canProcessHomomorphically 
                                ? "AI can process this data while it remains encrypted" 
                                : "This data requires decryption before processing"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Fingerprint className="h-5 w-5 mr-2 text-primary" />
                    Zero-Knowledge Authentication
                  </CardTitle>
                  <CardDescription>
                    Prove identity without revealing sensitive information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      TetraCryptPQC implements zero-knowledge proofs for authentication, allowing users to prove their identity without revealing their actual credentials or personal data.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                      <div className="p-4 border rounded-md flex flex-col items-center text-center">
                        <Key className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-medium">No Credential Sharing</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Prove identity without sending passwords
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md flex flex-col items-center text-center">
                        <ShieldCheck className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-medium">Quantum-Resistant ZKPs</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Future-proof against quantum attacks
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md flex flex-col items-center text-center">
                        <Brain className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-medium">AI Verification</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          AI models validate proof correctness
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button variant="outline">
                        <Fingerprint className="h-4 w-4 mr-2" />
                        Try Zero-Knowledge Authentication
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="decentralized" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>StarkNet Integration</CardTitle>
                  <CardDescription>
                    Decentralized quantum-resistant security using StarkNet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      TetraCryptPQC leverages StarkNet's zero-knowledge proofs and decentralized infrastructure to enhance security. This integration provides quantum-resistant verification and secure key management.
                    </p>
                    
                    <StarkNetAuth />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2 text-primary" />
                    Decentralized AI Security
                  </CardTitle>
                  <CardDescription>
                    Distributed AI security nodes protect against centralized vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      TetraCryptPQC employs a network of decentralized AI security nodes to detect and respond to threats, ensuring no single point of failure exists.
                    </p>
                    
                    <div className="p-4 bg-muted rounded-md">
                      <h3 className="font-medium">Decentralized Security Features</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          P2P security threat detection network
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          Distributed key management
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          Self-sovereign identity verification
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          AI-powered consensus for security decisions
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          StarkNet verification of security events
                        </li>
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Server className="h-4 w-4 mr-2" />
                      View Network Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="offline" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <WifiOff className="h-5 w-5 mr-2 text-primary" />
                    Offline-Resilient Security
                  </CardTitle>
                  <CardDescription>
                    Continue operations securely even without internet connectivity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      TetraCryptPQC features offline resilience, allowing critical security functions to operate without an internet connection using local AI models and cached cryptographic materials.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-primary" />
                          Local AI Models
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Compressed AI security models run locally on your device when offline, ensuring continuous threat protection.
                        </p>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Local AI Model Status</span>
                            <span>Active</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium flex items-center">
                          <Lock className="h-5 w-5 mr-2 text-primary" />
                          Offline Cryptography
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Post-quantum cryptographic operations continue to function offline using securely cached keys and algorithms.
                        </p>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Cached Crypto Materials</span>
                            <span>Secure</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-md">
                      <h3 className="font-medium">Offline Capabilities</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          Local threat detection and response
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          Offline authentication with cached credentials
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          Secure data access with offline key management
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                          Synchronization when connectivity returns
                        </li>
                      </ul>
                    </div>
                    
                    <Button 
                      variant={offlineMode ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: offlineMode ? "Already in Offline Mode" : "Testing Offline Mode",
                          description: offlineMode 
                            ? "Your device is currently offline. TetraCryptPQC is running in resilient mode." 
                            : "Simulating offline capabilities while maintaining connectivity",
                        });
                      }}
                    >
                      {offlineMode ? (
                        <>
                          <WifiOff className="h-4 w-4 mr-2" />
                          Currently in Offline Mode
                        </>
                      ) : (
                        <>
                          <WifiOff className="h-4 w-4 mr-2" />
                          Test Offline Capabilities
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/4 mt-6 md:mt-0">
          <AISecurityDashboard />
        </div>
      </div>
    </div>
  );
};

export default AISecurity;
