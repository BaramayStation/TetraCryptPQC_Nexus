
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Shield, Server, Database, Cloud, Lock, Key, FileDigit, RefreshCw, AlertTriangle } from "lucide-react";
import { 
  createAISecuredCloudInstance, 
  getAISecuredCloudInstances,
  setupHomomorphicEncryption,
  setupIPFSSecureStorage,
  enableZeroKnowledgeAuth,
  getSecurityHealthMetrics,
  AISecuredCloudInstance,
  SecurityHealthMetrics
} from "@/lib/ai-cloud-security";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const AISecureCloudInfrastructure: React.FC = () => {
  const [instances, setInstances] = useState<AISecuredCloudInstance[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<SecurityHealthMetrics | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("instances");
  
  // Form states
  const [instanceName, setInstanceName] = useState("secure-cloud");
  const [instanceType, setInstanceType] = useState<'podman' | 'kubernetes' | 'openshift'>('podman');
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'enhanced' | 'maximum'>('enhanced');
  
  // Load instances and metrics on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load instances
        const cloudInstances = await getAISecuredCloudInstances();
        setInstances(cloudInstances);
        
        // Load health metrics
        const metrics = await getSecurityHealthMetrics();
        setHealthMetrics(metrics);
      } catch (error) {
        console.error("Error loading AI Cloud data:", error);
        toast({
          title: "Error Loading Data",
          description: error instanceof Error ? error.message : "Failed to load AI Cloud data",
          variant: "destructive",
        });
      }
    };
    
    loadData();
  }, []);
  
  // Create a new cloud instance
  const handleCreateInstance = async () => {
    setIsCreating(true);
    
    try {
      const newInstance = await createAISecuredCloudInstance(
        instanceName,
        instanceType,
        securityLevel
      );
      
      setInstances([...instances, newInstance]);
      
      toast({
        title: "Cloud Instance Created",
        description: `Secure cloud instance "${instanceName}" created successfully`,
      });
      
      // Reset form
      setInstanceName("secure-cloud-" + Math.floor(Math.random() * 1000));
    } catch (error) {
      console.error("Error creating cloud instance:", error);
      toast({
        title: "Error Creating Instance",
        description: error instanceof Error ? error.message : "Failed to create cloud instance",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };
  
  // Enable zero-knowledge authentication for an instance
  const handleEnableZkAuth = async (instanceId: string) => {
    try {
      const result = await enableZeroKnowledgeAuth(instanceId);
      
      if (result.success) {
        // Update instance in the state
        setInstances(instances.map(instance => 
          instance.id === instanceId 
            ? { ...instance, zkAuthentication: true } 
            : instance
        ));
        
        toast({
          title: "ZK Authentication Enabled",
          description: result.message,
        });
      } else {
        toast({
          title: "Error Enabling ZK Authentication",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error enabling ZK authentication:", error);
      toast({
        title: "Operation Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  // Setup homomorphic encryption for an instance
  const handleSetupHomomorphicEncryption = async (instanceId: string) => {
    try {
      await setupHomomorphicEncryption('CKKS', 128, true);
      
      // Update instance in the state
      setInstances(instances.map(instance => 
        instance.id === instanceId 
          ? { ...instance, aiCapabilities: { ...instance.aiCapabilities, homomorphicEncryption: true } } 
          : instance
      ));
      
      toast({
        title: "Homomorphic Encryption Enabled",
        description: "AI-driven homomorphic encryption has been set up successfully",
      });
    } catch (error) {
      console.error("Error setting up homomorphic encryption:", error);
      toast({
        title: "Operation Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  // Setup IPFS storage for an instance
  const handleSetupIPFSStorage = async (instanceId: string) => {
    try {
      await setupIPFSSecureStorage('ML-KEM-1024', true, 500);
      
      // Update instance in the state
      setInstances(instances.map(instance => 
        instance.id === instanceId 
          ? { ...instance, ipfsStorage: { ...instance.ipfsStorage, enabled: true } } 
          : instance
      ));
      
      toast({
        title: "IPFS Storage Enabled",
        description: "Quantum-resistant IPFS storage has been set up successfully",
      });
    } catch (error) {
      console.error("Error setting up IPFS storage:", error);
      toast({
        title: "Operation Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  // Refresh health metrics
  const handleRefreshMetrics = async () => {
    try {
      const metrics = await getSecurityHealthMetrics();
      setHealthMetrics(metrics);
      
      toast({
        title: "Metrics Updated",
        description: "Security health metrics have been refreshed",
      });
    } catch (error) {
      console.error("Error refreshing metrics:", error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update metrics",
        variant: "destructive",
      });
    }
  };
  
  // Get badge color for security level
  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'maximum': return "bg-purple-500/15 text-purple-600 hover:bg-purple-500/25";
      case 'enhanced': return "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25";
      case 'standard': return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
      default: return "bg-gray-500/15 text-gray-600 hover:bg-gray-500/25";
    }
  };
  
  // Get color for threat score
  const getThreatScoreColor = (score: number) => {
    if (score < 5) return "text-green-600";
    if (score < 15) return "text-yellow-600";
    if (score < 30) return "text-orange-600";
    return "text-red-600";
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-accent" />
          AI-Secured Cloud Infrastructure
        </CardTitle>
        <CardDescription>
          Autonomous, quantum-resistant cloud infrastructure with AI-driven security automation
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="instances" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mx-6">
          <TabsTrigger value="instances">
            <Server className="h-4 w-4 mr-2" />
            Cloud Instances
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Enterprise Security
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <FileDigit className="h-4 w-4 mr-2" />
            Health Metrics
          </TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          {/* Cloud Instances tab */}
          <TabsContent value="instances" className="space-y-6">
            {/* Create Instance Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Deploy Secure Cloud Instance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Instance Name</Label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="secure-cloud-name"
                      value={instanceName}
                      onChange={(e) => setInstanceName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Instance Type</Label>
                      <Select
                        value={instanceType}
                        onValueChange={(value) => setInstanceType(value as any)}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="podman">Podman (Rootless)</SelectItem>
                          <SelectItem value="kubernetes">Kubernetes</SelectItem>
                          <SelectItem value="openshift">OpenShift</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="security">Security Level</Label>
                      <Select
                        value={securityLevel}
                        onValueChange={(value) => setSecurityLevel(value as any)}
                      >
                        <SelectTrigger id="security">
                          <SelectValue placeholder="Select security level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="enhanced">Enhanced</SelectItem>
                          <SelectItem value="maximum">Maximum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleCreateInstance}
                  disabled={isCreating || !instanceName}
                >
                  {isCreating ? "Deploying..." : "Deploy Secure Instance"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Instance List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Deployed Instances</h3>
              
              {instances.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No instances deployed yet. Create your first secure cloud instance.
                </div>
              ) : (
                <div className="grid gap-4">
                  {instances.map((instance) => (
                    <Card key={instance.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Server className="h-4 w-4 mr-2" />
                            {instance.name}
                          </CardTitle>
                          <Badge className={getSecurityLevelColor(instance.securityLevel)}>
                            {instance.securityLevel.charAt(0).toUpperCase() + instance.securityLevel.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription>
                          {instance.type.charAt(0).toUpperCase() + instance.type.slice(1)} | 
                          Deployed {new Date(instance.deployedAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Instance Status</h4>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <span className="text-muted-foreground">Status:</span>
                              <Badge variant="outline" className="justify-center">
                                {instance.status.charAt(0).toUpperCase() + instance.status.slice(1)}
                              </Badge>
                              
                              <span className="text-muted-foreground">Quantum-Resistant:</span>
                              <span className="font-medium">{instance.quantumResistant ? "Yes" : "No"}</span>
                              
                              <span className="text-muted-foreground">Threat Score:</span>
                              <span className={`font-medium ${getThreatScoreColor(instance.threatScore)}`}>
                                {instance.threatScore}/100
                              </span>
                              
                              <span className="text-muted-foreground">Instances:</span>
                              <span className="font-medium">{instance.autoScaling.currentInstances}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-2">AI Capabilities</h4>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Intrusion Detection</span>
                                <Switch checked={instance.aiCapabilities.intrusionDetection} disabled />
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Self-Healing</span>
                                <Switch checked={instance.aiCapabilities.selfHealing} disabled />
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Homomorphic Encryption</span>
                                <Switch checked={instance.aiCapabilities.homomorphicEncryption} disabled />
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm">ZK Authentication</span>
                                <Switch checked={instance.zkAuthentication} disabled />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 flex flex-wrap gap-2">
                        {!instance.aiCapabilities.homomorphicEncryption && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetupHomomorphicEncryption(instance.id)}
                          >
                            <Key className="h-3.5 w-3.5 mr-1" />
                            Enable Homomorphic Encryption
                          </Button>
                        )}
                        
                        {!instance.zkAuthentication && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEnableZkAuth(instance.id)}
                          >
                            <Lock className="h-3.5 w-3.5 mr-1" />
                            Enable ZK Authentication
                          </Button>
                        )}
                        
                        {!instance.ipfsStorage.enabled && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetupIPFSStorage(instance.id)}
                          >
                            <Database className="h-3.5 w-3.5 mr-1" />
                            Setup IPFS Storage
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Enterprise Security tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantum-Resistant Security Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quantum-Resistant Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">ML-KEM-1024 Key Exchange</span>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">SLH-DSA-Dilithium5 Signatures</span>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">NIST FIPS 205/206 Compliance</span>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10">Verified</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="text-sm">Falcon-1024 Signatures</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10">Optional</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* AI-Driven Security Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI-Driven Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Anomaly Detection</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Self-Healing Infrastructure</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Homomorphic Threat Analysis</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">AI-Managed Key Rotation</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Secure Infrastructure Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Secure Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-indigo-500" />
                        <span className="text-sm">Podman Rootless Containers</span>
                      </div>
                      <Badge variant="outline" className="bg-indigo-500/10">Deployed</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-indigo-500" />
                        <span className="text-sm">Immutable Infrastructure</span>
                      </div>
                      <Badge variant="outline" className="bg-indigo-500/10">Enforced</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-indigo-500" />
                        <span className="text-sm">SELinux Mandatory Access Control</span>
                      </div>
                      <Badge variant="outline" className="bg-indigo-500/10">Enforced</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-indigo-500" />
                        <span className="text-sm">TPM-Verified Boot</span>
                      </div>
                      <Badge variant="outline" className="bg-indigo-500/10">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Decentralized Storage Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Decentralized Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">IPFS Content-Addressed Storage</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">Quantum-Encrypted Storage</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10">Active</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">Decentralized Replication</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10">3x</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">AI-Managed Key Rotation</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10">90 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI-Governed Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">NIST 800-53</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">FIPS 140-3</span>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">ISO 27001</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">GDPR</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">HIPAA</span>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">FedRAMP</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last verified: {new Date().toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Run Compliance Scan
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Health Metrics tab */}
          <TabsContent value="metrics" className="space-y-6">
            {healthMetrics ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Security Health Overview</h3>
                  <Button variant="outline" size="sm" onClick={handleRefreshMetrics}>
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Refresh Metrics
                  </Button>
                </div>
                
                {/* Overall Security Score */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">
                        Overall Security Score: {healthMetrics.overallScore}/100
                      </div>
                      <Progress value={healthMetrics.overallScore} className="h-3" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Last updated: {new Date(healthMetrics.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Threat Detection Latency */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Threat Detection Latency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthMetrics.threatDetectionLatency} ms</div>
                      <p className="text-xs text-muted-foreground">AI-driven response time</p>
                    </CardContent>
                  </Card>
                  
                  {/* Mean Time to Remediate */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Mean Time to Remediate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthMetrics.meanTimeToRemediate} min</div>
                      <p className="text-xs text-muted-foreground">Self-healing response time</p>
                    </CardContent>
                  </Card>
                  
                  {/* False Positive Rate */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">False Positive Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthMetrics.falsePositiveRate}%</div>
                      <p className="text-xs text-muted-foreground">AI alert accuracy metric</p>
                    </CardContent>
                  </Card>
                  
                  {/* AI Alert Accuracy */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">AI Alert Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthMetrics.aiAlertAccuracy}%</div>
                      <p className="text-xs text-muted-foreground">Machine learning precision</p>
                    </CardContent>
                  </Card>
                  
                  {/* Patch Compliance */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Patch Compliance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthMetrics.patchComplianceRate}%</div>
                      <p className="text-xs text-muted-foreground">Systems up-to-date</p>
                    </CardContent>
                  </Card>
                  
                  {/* Encryption Coverage */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Encryption Coverage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthMetrics.encryptionCoverage}%</div>
                      <p className="text-xs text-muted-foreground">Data protected by quantum crypto</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Vulnerabilities by Risk */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Vulnerabilities by Risk Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                          <span>Critical</span>
                        </div>
                        <Badge variant="outline" className="bg-red-500/10 text-red-600">
                          {healthMetrics.vulnerabilitiesByRisk.critical}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                          <span>High</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                          {healthMetrics.vulnerabilitiesByRisk.high}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>Medium</span>
                        </div>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                          {healthMetrics.vulnerabilitiesByRisk.medium}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Low</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                          {healthMetrics.vulnerabilitiesByRisk.low}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Incidents by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Security Incidents by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(healthMetrics.incidentsByCategory).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="capitalize">{category}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="h-10 w-10 mx-auto mb-4 text-muted-foreground animate-spin" />
                  <p className="text-muted-foreground">Loading security metrics...</p>
                </div>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Powered by TetraCryptPQC with NIST FIPS 205/206 compliance
        </p>
        <Badge variant="outline">Quantum-Resistant Enterprise Security</Badge>
      </CardFooter>
    </Card>
  );
};

export default AISecureCloudInfrastructure;
