import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  Server, 
  Cloud, 
  Lock, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Fingerprint,
  Workflow,
  RefreshCw
} from "lucide-react";
import { 
  getSecurityHealthMetrics, 
  getAISecuredCloudInstances,
  createAISecuredCloudInstance,
  setupHomomorphicEncryption,
  setupIPFSSecureStorage,
  enableZeroKnowledgeAuth,
  checkAISecurityHealth
} from "@/lib/ai-cloud-security";
import { 
  AISecuredCloudInstance, 
  SecurityHealthMetrics 
} from "@/lib/storage-types";
import { scanForThreats } from "@/lib/pqcrypto";
import { toast } from "@/components/ui/use-toast";

const SecurityScoreCard: React.FC<{
  title: string;
  value: number;
  max: number;
  description: string;
  status: 'good' | 'warning' | 'critical';
}> = ({ title, value, max, description, status }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold">{value.toFixed(1)}</span>
        <Badge 
          variant={status === 'good' ? 'outline' : status === 'warning' ? 'secondary' : 'destructive'}
          className="flex items-center gap-1"
        >
          {status === 'good' ? (
            <CheckCircle className="h-3 w-3" />
          ) : status === 'warning' ? (
            <AlertTriangle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          <span>{status === 'good' ? 'Good' : status === 'warning' ? 'Warning' : 'Critical'}</span>
        </Badge>
      </div>
      <Progress value={(value / max) * 100} className="h-2 mb-2" />
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const AISecureCloudInfrastructure: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityHealthMetrics | null>(null);
  const [instances, setInstances] = useState<AISecuredCloudInstance[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatingInstance, setIsCreatingInstance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const securityMetrics = getSecurityHealthMetrics();
        setMetrics(securityMetrics);
        
        const cloudInstances = getAISecuredCloudInstances();
        setInstances(cloudInstances);
        
        const healthCheck = await checkAISecurityHealth();
        setHealthIssues(healthCheck.issues);
      } catch (error) {
        console.error("Error loading security infrastructure data:", error);
        toast({
          title: "Error Loading Security Data",
          description: "Failed to load security infrastructure data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const securityMetrics = getSecurityHealthMetrics();
      setMetrics(securityMetrics);
      
      const cloudInstances = getAISecuredCloudInstances();
      setInstances(cloudInstances);
      
      const healthCheck = await checkAISecurityHealth();
      setHealthIssues(healthCheck.issues);
      
      toast({
        title: "Security Data Refreshed",
        description: "Security infrastructure data has been refreshed.",
      });
    } catch (error) {
      console.error("Error refreshing security data:", error);
      toast({
        title: "Error Refreshing Data",
        description: "Failed to refresh security infrastructure data.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleCreateInstance = async () => {
    setIsCreatingInstance(true);
    try {
      const result = await createAISecuredCloudInstance("New AI-Secured Instance", {
        region: "us-west",
        securityLevel: "maximum",
      });
      
      if (result.success && result.instance) {
        toast({
          title: "Instance Created",
          description: "New AI-Secured Cloud Instance is being provisioned. It will be available shortly.",
        });
      } else {
        throw new Error(result.error || "Failed to create instance");
      }
    } catch (error) {
      console.error("Error creating instance:", error);
      toast({
        title: "Instance Creation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreatingInstance(false);
    }
  };
  
  const handleEnableHomomorphicEncryption = async (instanceId: string) => {
    try {
      const result = await setupHomomorphicEncryption(instanceId);
      if (result.success) {
        const cloudInstances = getAISecuredCloudInstances();
        setInstances(cloudInstances);
      } else {
        throw new Error(result.error || "Failed to enable homomorphic encryption");
      }
    } catch (error) {
      console.error("Error enabling homomorphic encryption:", error);
      toast({
        title: "Feature Activation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleEnableIPFSStorage = async (instanceId: string) => {
    try {
      const result = await setupIPFSSecureStorage(instanceId);
      if (result.success) {
        const cloudInstances = getAISecuredCloudInstances();
        setInstances(cloudInstances);
      } else {
        throw new Error(result.error || "Failed to enable IPFS storage");
      }
    } catch (error) {
      console.error("Error enabling IPFS storage:", error);
      toast({
        title: "Feature Activation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleEnableZeroKnowledgeAuth = async (instanceId: string) => {
    try {
      const result = await enableZeroKnowledgeAuth(instanceId);
      if (result.success) {
        const cloudInstances = getAISecuredCloudInstances();
        setInstances(cloudInstances);
      } else {
        throw new Error(result.error || "Failed to enable zero-knowledge authentication");
      }
    } catch (error) {
      console.error("Error enabling zero-knowledge authentication:", error);
      toast({
        title: "Feature Activation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'normal':
      case 'running':
        return 'text-green-500 bg-green-100';
      case 'warning':
      case 'elevated':
      case 'provisioning':
        return 'text-amber-500 bg-amber-100';
      case 'critical':
      case 'error':
      case 'stopped':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-blue-500 bg-blue-100';
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading AI-Secured Cloud Infrastructure...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            AI-Secured Cloud Infrastructure
          </h2>
          <p className="text-muted-foreground">
            Quantum-resistant, AI-protected enterprise cloud platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleCreateInstance}
            disabled={isCreatingInstance}
          >
            <Server className="h-4 w-4 mr-2" />
            {isCreatingInstance ? 'Creating...' : 'Create New Instance'}
          </Button>
        </div>
      </div>
      
      {healthIssues.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Issues Detected</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              {healthIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="instances">Cloud Instances</TabsTrigger>
          <TabsTrigger value="security">Security Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Overall Security Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{metrics.overallScore}/100</div>
                    <Badge variant={metrics.overallScore > 80 ? "outline" : metrics.overallScore > 60 ? "secondary" : "destructive"}>
                      {metrics.overallScore > 80 ? "Excellent" : metrics.overallScore > 60 ? "Good" : "At Risk"}
                    </Badge>
                  </div>
                  <Progress value={metrics.overallScore} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Threat Detection Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{metrics.threatDetectionRate.toFixed(1)}%</div>
                    <Badge variant={metrics.threatDetectionRate > 95 ? "outline" : "secondary"}>
                      {metrics.threatDetectionRate > 95 ? "Optimal" : "Needs Improvement"}
                    </Badge>
                  </div>
                  <Progress value={metrics.threatDetectionRate} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Incident Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{metrics.incidentResponseTime.toFixed(1)} min</div>
                    <Badge variant={metrics.incidentResponseTime < 2 ? "outline" : "secondary"}>
                      {metrics.incidentResponseTime < 2 ? "Fast" : "Average"}
                    </Badge>
                  </div>
                  <Progress value={Math.max(0, 100 - (metrics.incidentResponseTime / 5) * 100)} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{metrics.complianceScore.toFixed(1)}%</div>
                    <Badge variant={metrics.complianceScore > 90 ? "outline" : "secondary"}>
                      {metrics.complianceScore > 90 ? "Compliant" : "Needs Review"}
                    </Badge>
                  </div>
                  <Progress value={metrics.complianceScore} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Cloud Instances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{instances.length}</div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {instances.filter(i => i.status === 'running').length} running, {instances.filter(i => i.status !== 'running').length} other
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-24">
                    <ul className="space-y-1">
                      {metrics.recommendedActions && metrics.recommendedActions.map((action, index) => (
                        <li key={index} className="text-xs flex items-start">
                          <AlertTriangle className="h-3 w-3 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>AI-Secured Cloud Instances</CardTitle>
              <CardDescription>Post-quantum secure cloud infrastructure protected by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instances.length === 0 ? (
                  <div className="text-center py-6">
                    <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Cloud Instances</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first AI-secured quantum-resistant cloud instance to get started.
                    </p>
                    <Button onClick={handleCreateInstance} disabled={isCreatingInstance}>
                      <Server className="h-4 w-4 mr-2" />
                      {isCreatingInstance ? 'Creating...' : 'Create Instance'}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {instances.map((instance) => (
                      <div key={instance.id} className="border p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{instance.name}</h3>
                            <div className="text-xs text-muted-foreground">
                              Region: {instance.region}
                            </div>
                          </div>
                          <Badge className={getStatusColor(instance.status)}>
                            {instance.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-4 text-xs">
                          <div className="text-muted-foreground">Security Level:</div>
                          <div>{instance.securityLevel}</div>
                          
                          <div className="text-muted-foreground">Threat Status:</div>
                          <div className={`${instance.threatStatus === 'normal' ? 'text-green-500' : instance.threatStatus === 'elevated' ? 'text-amber-500' : 'text-red-500'}`}>
                            {instance.threatStatus}
                          </div>
                          
                          <div className="text-muted-foreground">Created:</div>
                          <div>{new Date(instance.createdAt).toLocaleDateString()}</div>
                        </div>
                        
                        {instance.metrics && (
                          <div className="mt-4">
                            <h4 className="text-xs font-medium mb-2">Resource Usage</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>CPU: {instance.metrics.cpuUsage.toFixed(1)}%</span>
                                </div>
                                <Progress value={instance.metrics.cpuUsage} className="h-1" />
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Memory: {instance.metrics.memoryUsage.toFixed(1)}%</span>
                                </div>
                                <Progress value={instance.metrics.memoryUsage} className="h-1" />
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Storage: {instance.metrics.storageUsage.toFixed(1)}%</span>
                                </div>
                                <Progress value={instance.metrics.storageUsage} className="h-1" />
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Network: {instance.metrics.networkUsage.toFixed(1)} MB/s</span>
                                </div>
                                <Progress value={(instance.metrics.networkUsage / 1000) * 100} className="h-1" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                          <Badge variant={instance.homomorphicEncryptionEnabled ? "secondary" : "outline"} className="flex justify-center">
                            {instance.homomorphicEncryptionEnabled ? "FHE Enabled" : "FHE Disabled"}
                          </Badge>
                          
                          <Badge variant={instance.ipfsStorageEnabled ? "secondary" : "outline"} className="flex justify-center">
                            {instance.ipfsStorageEnabled ? "IPFS Enabled" : "IPFS Disabled"}
                          </Badge>
                          
                          <Badge variant={instance.zeroKnowledgeAuthEnabled ? "secondary" : "outline"} className="flex justify-center">
                            {instance.zeroKnowledgeAuthEnabled ? "ZK Enabled" : "ZK Disabled"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="instances" className="space-y-4">
          {instances.map((instance) => (
            <Card key={instance.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    {instance.name}
                  </CardTitle>
                  <Badge className={getStatusColor(instance.status)}>
                    {instance.status}
                  </Badge>
                </div>
                <CardDescription>
                  Region: {instance.region} • Security Level: {instance.securityLevel}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Health Status</h3>
                    <div className="flex items-center gap-2">
                      {instance.healthStatus === 'healthy' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : instance.healthStatus === 'warning' ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className={getStatusColor(instance.healthStatus)}>
                        {instance.healthStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Threat Status</h3>
                    <div className="flex items-center gap-2">
                      {instance.threatStatus === 'normal' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : instance.threatStatus === 'elevated' ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className={getStatusColor(instance.threatStatus)}>
                        {instance.threatStatus}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Enhanced Security Features</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs font-medium">Homomorphic Encryption</h4>
                        <Badge variant={instance.homomorphicEncryptionEnabled ? "outline" : "secondary"}>
                          {instance.homomorphicEncryptionEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Process data while encrypted using quantum-resistant FHE
                      </p>
                      <Button 
                        size="sm" 
                        variant={instance.homomorphicEncryptionEnabled ? "outline" : "default"}
                        className="w-full"
                        onClick={() => instance.homomorphicEncryptionEnabled ? undefined : handleEnableHomomorphicEncryption(instance.id)}
                        disabled={instance.homomorphicEncryptionEnabled}
                      >
                        {instance.homomorphicEncryptionEnabled ? "Already Enabled" : "Enable FHE"}
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs font-medium">IPFS Storage</h4>
                        <Badge variant={instance.ipfsStorageEnabled ? "outline" : "secondary"}>
                          {instance.ipfsStorageEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Decentralized, quantum-secure storage across network nodes
                      </p>
                      <Button 
                        size="sm" 
                        variant={instance.ipfsStorageEnabled ? "outline" : "default"}
                        className="w-full"
                        onClick={() => instance.ipfsStorageEnabled ? undefined : handleEnableIPFSStorage(instance.id)}
                        disabled={instance.ipfsStorageEnabled}
                      >
                        {instance.ipfsStorageEnabled ? "Already Enabled" : "Enable IPFS"}
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs font-medium">ZK-Authentication</h4>
                        <Badge variant={instance.zeroKnowledgeAuthEnabled ? "outline" : "secondary"}>
                          {instance.zeroKnowledgeAuthEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Zero-knowledge proofs for secure authentication
                      </p>
                      <Button 
                        size="sm" 
                        variant={instance.zeroKnowledgeAuthEnabled ? "outline" : "default"}
                        className="w-full"
                        onClick={() => instance.zeroKnowledgeAuthEnabled ? undefined : handleEnableZeroKnowledgeAuth(instance.id)}
                        disabled={instance.zeroKnowledgeAuthEnabled}
                      >
                        {instance.zeroKnowledgeAuthEnabled ? "Already Enabled" : "Enable ZK Auth"}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {instance.metrics && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Resources</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-medium">CPU Usage</h4>
                          <span className="text-xs font-medium">{instance.metrics.cpuUsage.toFixed(1)}%</span>
                        </div>
                        <Progress value={instance.metrics.cpuUsage} className="h-1 mb-1" />
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-medium">Memory Usage</h4>
                          <span className="text-xs font-medium">{instance.metrics.memoryUsage.toFixed(1)}%</span>
                        </div>
                        <Progress value={instance.metrics.memoryUsage} className="h-1 mb-1" />
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-medium">Storage Usage</h4>
                          <span className="text-xs font-medium">{instance.metrics.storageUsage.toFixed(1)}%</span>
                        </div>
                        <Progress value={instance.metrics.storageUsage} className="h-1 mb-1" />
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-medium">Network Usage</h4>
                          <span className="text-xs font-medium">{instance.metrics.networkUsage.toFixed(1)} MB/s</span>
                        </div>
                        <Progress value={(instance.metrics.networkUsage / 1000) * 100} className="h-1 mb-1" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(instance.createdAt).toLocaleString()}
                </div>
                <Button variant="outline" size="sm">
                  Manage Instance
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {instances.length === 0 && (
            <div className="text-center py-12">
              <Cloud className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Cloud Instances</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create your first AI-secured quantum-resistant cloud instance to start protecting your enterprise data.
              </p>
              <Button onClick={handleCreateInstance} disabled={isCreatingInstance}>
                <Server className="h-4 w-4 mr-2" />
                {isCreatingInstance ? 'Creating...' : 'Create First Instance'}
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          {metrics && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    AI-Powered Security Metrics
                  </CardTitle>
                  <CardDescription>
                    Post-quantum security health dashboard for enterprise protection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SecurityScoreCard 
                      title="Overall Security Score" 
                      value={metrics.overallScore} 
                      max={100}
                      description="Comprehensive security health assessment" 
                      status={metrics.overallScore > 80 ? 'good' : metrics.overallScore > 60 ? 'warning' : 'critical'} 
                    />
                    
                    <SecurityScoreCard 
                      title="AI Threat Detection Rate" 
                      value={metrics.threatDetectionRate}
                      max={100}
                      description="Percentage of threats successfully detected" 
                      status={metrics.threatDetectionRate > 95 ? 'good' : metrics.threatDetectionRate > 85 ? 'warning' : 'critical'} 
                    />
                    
                    <SecurityScoreCard 
                      title="Detection Latency" 
                      value={metrics.threatDetectionLatency}
                      max={1000}
                      description="Time to detect threats (ms)" 
                      status={metrics.threatDetectionLatency < 150 ? 'good' : metrics.threatDetectionLatency < 300 ? 'warning' : 'critical'} 
                    />
                    
                    <SecurityScoreCard 
                      title="Incident Response Time" 
                      value={metrics.incidentResponseTime}
                      max={10}
                      description="Time to respond to incidents (minutes)" 
                      status={metrics.incidentResponseTime < 2 ? 'good' : metrics.incidentResponseTime < 5 ? 'warning' : 'critical'} 
                    />
                    
                    <SecurityScoreCard 
                      title="False Positive Rate" 
                      value={metrics.falsePositiveRate * 100}
                      max={10}
                      description="Percentage of incorrect threat detections" 
                      status={metrics.falsePositiveRate < 0.01 ? 'good' : metrics.falsePositiveRate < 0.05 ? 'warning' : 'critical'} 
                    />
                    
                    <SecurityScoreCard 
                      title="Compliance Score" 
                      value={metrics.complianceScore}
                      max={100}
                      description="Regulatory compliance assessment" 
                      status={metrics.complianceScore > 90 ? 'good' : metrics.complianceScore > 75 ? 'warning' : 'critical'} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Security Vulnerabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {metrics.vulnerabilities && metrics.vulnerabilities.length > 0 ? (
                      <ScrollArea className="h-72">
                        <div className="space-y-4">
                          {metrics.vulnerabilities.map((vuln) => (
                            <div key={vuln.id} className="border p-3 rounded-lg">
                              <div className="flex items-start justify-between">
                                <h4 className="text-sm font-medium">{vuln.description}</h4>
                                <Badge variant={
                                  vuln.severity === 'low' ? 'outline' : 
                                  vuln.severity === 'medium' ? 'secondary' : 
                                  'destructive'
                                }>
                                  {vuln.severity}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 text-xs text-muted-foreground">
                                <div className="mb-1">Affected Components:</div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {vuln.affectedComponents.map((comp, idx) => (
                                    <Badge key={idx} variant="outline" className="font-normal">
                                      {comp}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="mb-1">Remediation Steps:</div>
                                <ul className="list-disc pl-4 space-y-1">
                                  {vuln.remediationSteps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-72 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                        <h4 className="text-lg font-medium mb-2">No Vulnerabilities Detected</h4>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Your systems are currently secure. Regular security scanning helps maintain this status.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recommended Security Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {metrics.recommendedActions && metrics.recommendedActions.length > 0 ? (
                      <ScrollArea className="h-72">
                        <div className="space-y-3">
                          {metrics.recommendedActions.map((action, idx) => (
                            <div key={idx} className="flex p-3 border rounded-lg">
                              <div className="mr-3 mt-0.5">
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">{action}</h4>
                                <Button size="sm" variant="outline">
                                  Apply Recommendation
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-72 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                        <h4 className="text-lg font-medium mb-2">No Actions Required</h4>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Your security configuration is optimally configured. No immediate actions needed.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISecureCloudInfrastructure;
