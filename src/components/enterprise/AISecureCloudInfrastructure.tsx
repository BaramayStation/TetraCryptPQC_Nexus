
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, Server, Cloud, Database, AlertTriangle, Activity, Lock, RefreshCw } from "lucide-react";
import { 
  initializeAICloudSecurity, 
  createAISecuredCloudInstance,
  getAISecuredCloudInstances,
  getSecurityHealthMetrics,
  setupHomomorphicEncryption,
  setupIPFSSecureStorage,
  enableZeroKnowledgeAuth
} from "@/lib/ai-cloud-security";
import { AISecuredCloudInstance, SecurityHealthMetrics } from "@/lib/storage-types";
import { toast } from "@/components/ui/use-toast";

const AISecureCloudInfrastructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [cloudInstances, setCloudInstances] = useState<AISecuredCloudInstance[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<SecurityHealthMetrics | null>(null);
  const [newInstanceName, setNewInstanceName] = useState("");

  useEffect(() => {
    // Initialize on component mount
    const initialize = async () => {
      try {
        setInitializing(true);
        const result = await initializeAICloudSecurity();
        if (result.success && result.metrics) {
          setHealthMetrics(result.metrics);
        }
        
        // Load existing instances
        const instances = getAISecuredCloudInstances();
        setCloudInstances(instances);
      } catch (error) {
        console.error("Failed to initialize AI cloud infrastructure:", error);
        toast({
          title: "Initialization Failed",
          description: "Failed to initialize AI cloud infrastructure",
          variant: "destructive",
        });
      } finally {
        setInitializing(false);
      }
    };
    
    initialize();
    
    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      setCloudInstances(getAISecuredCloudInstances());
      setHealthMetrics(getSecurityHealthMetrics());
    }, 10000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleCreateInstance = async () => {
    if (!newInstanceName.trim()) {
      toast({
        title: "Validation Error",
        description: "Instance name is required",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setCreating(true);
      const result = await createAISecuredCloudInstance(newInstanceName, {
        securityLevel: 'enterprise',
        homomorphicEncryption: true,
        zeroKnowledgeAuth: true
      });
      
      if (result.success && result.instance) {
        setCloudInstances([...cloudInstances, result.instance]);
        setNewInstanceName("");
        
        toast({
          title: "Creating Cloud Instance",
          description: `AI-secured instance '${newInstanceName}' is being provisioned`,
        });
      }
    } catch (error) {
      toast({
        title: "Instance Creation Failed",
        description: "Failed to create AI-secured cloud instance",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleEnableFeature = async (instanceId: string, feature: 'homomorphic' | 'ipfs' | 'zk') => {
    setLoading(true);
    try {
      let result;
      
      switch (feature) {
        case 'homomorphic':
          result = await setupHomomorphicEncryption(instanceId);
          break;
        case 'ipfs':
          result = await setupIPFSSecureStorage(instanceId);
          break;
        case 'zk':
          result = await enableZeroKnowledgeAuth(instanceId);
          break;
      }
      
      if (result && result.success) {
        // Refresh instances
        setCloudInstances(getAISecuredCloudInstances());
      }
    } catch (error) {
      toast({
        title: "Feature Activation Failed",
        description: `Failed to enable ${feature} feature`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatMetric = (value: number) => {
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI-Secured Cloud Infrastructure</h1>
          <p className="text-muted-foreground">
            Quantum-resistant, AI-powered secure cloud platform
          </p>
        </div>
        <Badge className="bg-accent/20 text-accent" variant="outline">
          <Shield className="w-3 h-3 mr-1" />
          Post-Quantum Secured
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="instances">Cloud Instances</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          {/* Security Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthMetrics ? formatMetric(healthMetrics.overallScore) : '0'}/100
                </div>
                <Progress 
                  value={healthMetrics ? healthMetrics.overallScore : 0} 
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Threat Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthMetrics ? formatMetric(healthMetrics.threatDetectionRate) : '0'}%
                </div>
                <Progress 
                  value={healthMetrics ? healthMetrics.threatDetectionRate : 0} 
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthMetrics ? formatMetric(healthMetrics.incidentResponseTime) : '0'} min
                </div>
                <Progress 
                  value={healthMetrics ? 100 - (healthMetrics.incidentResponseTime * 20) : 0}
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthMetrics ? formatMetric(healthMetrics.complianceScore) : '0'}/100
                </div>
                <Progress 
                  value={healthMetrics ? healthMetrics.complianceScore : 0}
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Instance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Cloud Instances</CardTitle>
              <CardDescription>
                Post-quantum encrypted and AI-managed infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cloudInstances.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Cloud className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Cloud Instances</h3>
                  <p className="text-muted-foreground mt-2">
                    Create your first AI-secured cloud instance to get started
                  </p>
                  <Button 
                    onClick={() => setActiveTab("instances")} 
                    className="mt-4"
                  >
                    Create Instance
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cloudInstances.map((instance) => (
                    <div 
                      key={instance.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Server className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-medium">{instance.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{instance.region}</span>
                            <span className="mx-2">•</span>
                            <span className="capitalize">{instance.securityLevel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {instance.status === 'running' ? (
                          <Badge className="bg-green-500/20 text-green-600" variant="outline">
                            Running
                          </Badge>
                        ) : instance.status === 'provisioning' ? (
                          <Badge className="bg-amber-500/20 text-amber-600" variant="outline">
                            Provisioning
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-600" variant="outline">
                            Stopped
                          </Badge>
                        )}
                        
                        {instance.threatStatus === 'elevated' && (
                          <Badge className="bg-red-500/20 text-red-600" variant="outline">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Threat Detected
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    onClick={() => setActiveTab("instances")} 
                    variant="outline" 
                    className="w-full"
                  >
                    View All Instances
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Security Recommendations */}
          {healthMetrics && healthMetrics.recommendedActions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Security Recommendations</CardTitle>
                <CardDescription>
                  Improve your security posture with these AI-driven suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {healthMetrics.recommendedActions.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="instances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create AI-Secured Cloud Instance</CardTitle>
              <CardDescription>
                Deploy a new post-quantum encrypted and AI-managed cloud instance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newInstanceName}
                  onChange={(e) => setNewInstanceName(e.target.value)}
                  placeholder="Enter instance name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button 
                  onClick={handleCreateInstance} 
                  disabled={creating || !newInstanceName.trim()}
                >
                  {creating ? "Creating..." : "Create Instance"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {cloudInstances.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Server className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Cloud Instances</h3>
                <p className="text-muted-foreground mt-2">
                  Create your first AI-secured cloud instance using the form above
                </p>
              </CardContent>
            </Card>
          ) : (
            cloudInstances.map((instance) => (
              <Card key={instance.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{instance.name}</CardTitle>
                      <CardDescription>
                        {instance.region} • {instance.securityLevel} security
                      </CardDescription>
                    </div>
                    <Badge 
                      className={instance.status === 'running' 
                        ? "bg-green-500/20 text-green-600" 
                        : instance.status === 'provisioning'
                          ? "bg-amber-500/20 text-amber-600"
                          : "bg-red-500/20 text-red-600"
                      } 
                      variant="outline"
                    >
                      {instance.status === 'running' 
                        ? "Running" 
                        : instance.status === 'provisioning'
                          ? "Provisioning"
                          : "Stopped"
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Resource Usage */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">CPU</div>
                      <Progress value={instance.metrics.cpuUsage} className="h-2" />
                      <div className="text-xs mt-1">{formatMetric(instance.metrics.cpuUsage)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Memory</div>
                      <Progress value={instance.metrics.memoryUsage} className="h-2" />
                      <div className="text-xs mt-1">{formatMetric(instance.metrics.memoryUsage)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Storage</div>
                      <Progress value={instance.metrics.storageUsage} className="h-2" />
                      <div className="text-xs mt-1">{formatMetric(instance.metrics.storageUsage)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Network</div>
                      <Progress value={instance.metrics.networkUsage / 10} className="h-2" />
                      <div className="text-xs mt-1">{formatMetric(instance.metrics.networkUsage)} KB/s</div>
                    </div>
                  </div>
                  
                  {/* Security Features */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Security Features</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-accent/20 text-accent" variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        Post-Quantum Encryption
                      </Badge>
                      <Badge className="bg-accent/20 text-accent" variant="outline">
                        <Activity className="w-3 h-3 mr-1" />
                        AI Threat Detection
                      </Badge>
                      {instance.homomorphicEncryptionEnabled && (
                        <Badge className="bg-accent/20 text-accent" variant="outline">
                          <Lock className="w-3 h-3 mr-1" />
                          Homomorphic Encryption
                        </Badge>
                      )}
                      {instance.ipfsStorageEnabled && (
                        <Badge className="bg-accent/20 text-accent" variant="outline">
                          <Database className="w-3 h-3 mr-1" />
                          IPFS Storage
                        </Badge>
                      )}
                      {instance.zeroKnowledgeAuthEnabled && (
                        <Badge className="bg-accent/20 text-accent" variant="outline">
                          <Lock className="w-3 h-3 mr-1" />
                          ZK Authentication
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Status Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Health Status</div>
                      <div className="flex items-center mt-1">
                        <div 
                          className={`w-2 h-2 rounded-full mr-2 ${
                            instance.healthStatus === 'healthy' 
                              ? 'bg-green-500' 
                              : instance.healthStatus === 'warning'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                        />
                        <span className="capitalize text-sm">{instance.healthStatus}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Threat Status</div>
                      <div className="flex items-center mt-1">
                        <div 
                          className={`w-2 h-2 rounded-full mr-2 ${
                            instance.threatStatus === 'normal' 
                              ? 'bg-green-500' 
                              : instance.threatStatus === 'elevated'
                                ? 'bg-red-500'
                                : 'bg-amber-500'
                          }`}
                        />
                        <span className="capitalize text-sm">{instance.threatStatus}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 border-t p-4">
                  {!instance.homomorphicEncryptionEnabled && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading || instance.status !== 'running'}
                      onClick={() => handleEnableFeature(instance.id, 'homomorphic')}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Enable Homomorphic Encryption
                    </Button>
                  )}
                  
                  {!instance.ipfsStorageEnabled && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading || instance.status !== 'running'}
                      onClick={() => handleEnableFeature(instance.id, 'ipfs')}
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Enable IPFS Storage
                    </Button>
                  )}
                  
                  {!instance.zeroKnowledgeAuthEnabled && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading || instance.status !== 'running'}
                      onClick={() => handleEnableFeature(instance.id, 'zk')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Enable ZK Authentication
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Health Metrics</CardTitle>
              <CardDescription>
                AI-monitored security status and compliance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {healthMetrics ? (
                <>
                  {/* Security Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Security Performance</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Security Score</span>
                          <span className="font-medium">{formatMetric(healthMetrics.overallScore)}/100</span>
                        </div>
                        <Progress value={healthMetrics.overallScore} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Threat Detection Rate</span>
                          <span className="font-medium">{formatMetric(healthMetrics.threatDetectionRate)}%</span>
                        </div>
                        <Progress value={healthMetrics.threatDetectionRate} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>False Positive Rate</span>
                          <span className="font-medium">{(healthMetrics.falsePositiveRate * 100).toFixed(2)}%</span>
                        </div>
                        <Progress value={100 - (healthMetrics.falsePositiveRate * 100)} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Operational Metrics</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Incident Response Time</span>
                          <span className="font-medium">{formatMetric(healthMetrics.incidentResponseTime)} min</span>
                        </div>
                        <Progress value={100 - (healthMetrics.incidentResponseTime * 20)} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compliance Score</span>
                          <span className="font-medium">{formatMetric(healthMetrics.complianceScore)}/100</span>
                        </div>
                        <Progress value={healthMetrics.complianceScore} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <div className="text-sm font-medium mb-2">Compliance Frameworks</div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">NIST SP 800-207</Badge>
                          <Badge variant="outline">ISO 27001</Badge>
                          <Badge variant="outline">FIPS 140-3</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vulnerabilities */}
                  {healthMetrics.vulnerabilities.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Active Vulnerabilities</h3>
                      <div className="space-y-2">
                        {healthMetrics.vulnerabilities.map((vuln) => (
                          <div 
                            key={vuln.id} 
                            className="border rounded-lg p-3 space-y-2"
                          >
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <Badge 
                                  className={
                                    vuln.severity === 'high' 
                                      ? "bg-red-500/20 text-red-600" 
                                      : vuln.severity === 'medium'
                                        ? "bg-amber-500/20 text-amber-600"
                                        : "bg-blue-500/20 text-blue-600"
                                  } 
                                  variant="outline"
                                >
                                  {vuln.severity.toUpperCase()}
                                </Badge>
                                <span className="text-sm font-medium ml-2">{vuln.description}</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={vuln.status === 'open' ? "bg-red-500/10 text-red-600" : "bg-green-500/10 text-green-600"}
                              >
                                {vuln.status === 'open' ? "Open" : "Mitigated"}
                              </Badge>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              Affected: {vuln.affectedComponents.join(", ")}
                            </div>
                            
                            {vuln.remediationSteps.length > 0 && (
                              <div className="space-y-1">
                                <div className="text-xs font-medium">Remediation Steps:</div>
                                <ul className="text-xs pl-5 list-disc space-y-1">
                                  {vuln.remediationSteps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Last Updated */}
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(healthMetrics.lastUpdated).toLocaleString()}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <RefreshCw className="h-10 w-10 text-muted-foreground mb-4 animate-spin" />
                  <h3 className="text-lg font-medium">Loading Security Metrics</h3>
                  <p className="text-muted-foreground mt-2">
                    The AI is analyzing security data...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISecureCloudInfrastructure;
