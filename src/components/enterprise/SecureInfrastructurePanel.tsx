import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Server, Lock, Database, RefreshCw, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { 
  checkHardwareSecurityCapabilities,
  createSecureServiceMesh,
  createSecureInfraNode,
  createSecureContainer,
  verifyContainerIntegrity,
  rotateContainer
} from "@/lib/secure-infrastructure";
import { 
  SecureContainerConfig, 
  SecureInfraNode, 
  SecureServiceMesh, 
  ContainerSecurityProfile, 
  InfrastructureNodeType 
} from '@/lib/storage-types';
import { Progress } from "@/components/ui/progress";
import { 
  ContainerSecurityProfile as SecurityProfileType,
  InfrastructureNodeType as NodeType
} from '@/lib/storage-types/security-types';

const SecureInfrastructurePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("containers");
  const [hwCapabilities, setHwCapabilities] = useState<any>(null);
  const [containers, setContainers] = useState<SecureContainerConfig[]>([]);
  const [nodes, setNodes] = useState<SecureInfraNode[]>([]);
  const [serviceMesh, setServiceMesh] = useState<SecureServiceMesh | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [containerName, setContainerName] = useState("secure-app");
  const [securityProfile, setSecurityProfile] = useState<ContainerSecurityProfile>("hardened");
  const [immutableRootfs, setImmutableRootfs] = useState(true);
  const [enableRotation, setEnableRotation] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      const capabilities = await checkHardwareSecurityCapabilities();
      setHwCapabilities(capabilities);
      
      try {
        const container1 = await createSecureContainer("app-frontend", "hardened");
        const container2 = await createSecureContainer("app-backend", "tpm-protected");
        
        setContainers([container1, container2]);
        
        const node1 = await createSecureInfraNode("primary-node", "kubernetes");
        const node2 = await createSecureInfraNode("replica-node", "docker");
        
        setNodes([node1, node2]);
        
        const mesh = await createSecureServiceMesh("tetracrypt-mesh", [container1.id, container2.id]);
        
        setServiceMesh(mesh);
      } catch (error) {
        console.error("Error creating demo infrastructure:", error);
        toast({
          title: "Error creating demo infrastructure",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      }
    };
    
    loadData();
  }, []);
  
  const handleCreateContainer = async () => {
    setIsCreating(true);
    
    try {
      const newContainer = await createSecureContainer(containerName, securityProfile, {
        immutableRootfs,
        rotationPolicy: {
          enabled: enableRotation,
          intervalDays: 60,
          triggerOnAnomaly: true
        }
      });
      
      setContainers([...containers, newContainer]);
      
      toast({
        title: "Container Created",
        description: `Secure container ${containerName} created with ${securityProfile} profile`,
      });
      
      setContainerName("secure-app-" + Math.floor(Math.random() * 1000));
    } catch (error) {
      console.error("Error creating container:", error);
      toast({
        title: "Error Creating Container",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };
  
  const handleVerifyIntegrity = async (containerId: string) => {
    setIsVerifying(true);
    
    try {
      const result = await verifyContainerIntegrity(containerId);
      
      if (result.verified) {
        toast({
          title: "Integrity Verified",
          description: `Container passed integrity verification`,
        });
      } else {
        toast({
          title: "Integrity Verification Failed",
          description: `Issues detected: ${result.issues.join(", ")}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying container:", error);
      toast({
        title: "Verification Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleRotateContainer = async (containerId: string) => {
    try {
      const rotatedContainer = await rotateContainer(containerId);
      
      const updatedContainers = containers.filter(c => c.id !== containerId);
      toast({
        title: "Container Rotated",
        description: `Container successfully rotated`,
      });
      
      setContainers(updatedContainers);
    } catch (error) {
      console.error("Error rotating container:", error);
      toast({
        title: "Rotation Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  const getProfileColor = (profile: string) => {
    switch (profile) {
      case 'standard': return "bg-blue-500/10 text-blue-600";
      case 'hardened': return "bg-green-500/10 text-green-600";
      case 'tpm-protected': return "bg-purple-500/10 text-purple-600";
      case 'sgx-enclave': return "bg-indigo-500/10 text-indigo-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-6 w-6 text-accent" />
          Secure Infrastructure Management
        </CardTitle>
        <CardDescription>
          Podman-based secure containers with TPM/SGX integration, immutable rootfs and SELinux/AppArmor confinement
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="containers" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mx-6">
          <TabsTrigger value="containers">
            <Lock className="h-4 w-4 mr-2" />
            Secure Containers
          </TabsTrigger>
          <TabsTrigger value="mesh">
            <Database className="h-4 w-4 mr-2" />
            Service Mesh
          </TabsTrigger>
          <TabsTrigger value="nodes">
            <Server className="h-4 w-4 mr-2" />
            Infrastructure Nodes
          </TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          <TabsContent value="containers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-muted/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Create Secure Container
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="container-name">Container Name</Label>
                    <input
                      id="container-name" 
                      className="w-full p-2 border rounded-md"
                      value={containerName}
                      onChange={(e) => setContainerName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="security-profile">Security Profile</Label>
                    <Select 
                      value={securityProfile}
                      onValueChange={(value) => setSecurityProfile(value as ContainerSecurityProfile)}
                    >
                      <SelectTrigger id="security-profile">
                        <SelectValue placeholder="Select a security profile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hardened">Hardened</SelectItem>
                        <SelectItem value="tpm-protected">TPM Protected</SelectItem>
                        <SelectItem value="sgx-enclave">SGX Enclave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="immutable-rootfs"
                      checked={immutableRootfs}
                      onCheckedChange={setImmutableRootfs}
                    />
                    <Label htmlFor="immutable-rootfs">Immutable Root Filesystem</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enable-rotation"
                      checked={enableRotation}
                      onCheckedChange={setEnableRotation}
                    />
                    <Label htmlFor="enable-rotation">Enable Auto-Rotation</Label>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCreateContainer}
                    disabled={isCreating}
                  >
                    {isCreating ? "Creating..." : "Create Secure Container"}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Hardware Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hwCapabilities ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">TPM Available</span>
                        {hwCapabilities.tpm ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-500/10 text-red-600">
                            No
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Secure Boot</span>
                        {hwCapabilities.secureBoot ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                            Disabled
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Encrypted Memory</span>
                        {hwCapabilities.encryptedMemory ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                            No
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Hardware Key Support</span>
                        {hwCapabilities.hardwareKeys ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-500/10 text-red-600">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm">
                        Loading hardware security capabilities...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Existing Containers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {containers.map((container) => (
                  <Card key={container.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          {container.name}
                        </CardTitle>
                        <Badge className={getProfileColor(container.securityProfile)}>
                          {container.securityProfile}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          {container.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Security Score</span>
                        <span className="font-medium">{container.securityScore}%</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>{new Date(container.created).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Immutable Rootfs</span>
                        {container.immutableRootfs ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vulnerabilities</span>
                        <span className="flex items-center gap-1">
                          {container.vulnerabilities.high + 
                           container.vulnerabilities.medium + 
                           container.vulnerabilities.low > 0 ? (
                            <>
                              High: {container.vulnerabilities.high}, 
                              Med: {container.vulnerabilities.medium}, 
                              Low: {container.vulnerabilities.low}
                            </>
                          ) : (
                            "None"
                          )}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleVerifyIntegrity(container.id)}
                        disabled={isVerifying}
                      >
                        Verify
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleRotateContainer(container.id)}
                      >
                        Rotate
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mesh" className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Service Mesh
              </h3>
              
              {serviceMesh ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{serviceMesh.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge 
                        variant="outline" 
                        className={serviceMesh.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}
                      >
                        {serviceMesh.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Created</p>
                      <p>{new Date(serviceMesh.created).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Endpoints</p>
                      <p>{serviceMesh.endpoints.join(", ")}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">mTLS Encryption</p>
                      {serviceMesh.mTLS ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Enabled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <XCircle className="h-4 w-4" />
                          <span>Disabled</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Policy Enforcement</p>
                      {serviceMesh.policyEnforcement ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Enabled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <XCircle className="h-4 w-4" />
                          <span>Disabled</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Security Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={serviceMesh.securityScore} className="flex-1 h-2" />
                      <span className="font-medium">{serviceMesh.securityScore}%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Manage Service Mesh
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    No active service mesh found
                  </p>
                  <Button>Create Service Mesh</Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="nodes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nodes.map((node) => (
                <Card key={node.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Server className="h-4 w-4 text-primary" />
                        {node.name}
                      </CardTitle>
                      <Badge variant="outline">
                        {node.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        {node.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Security Score</span>
                      <span className="font-medium">{node.securityScore}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span>{new Date(node.created).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">PQC Enabled</span>
                      {node.pqcEnabled ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trust Level</span>
                      <Badge 
                        variant="outline" 
                        className={
                          parseFloat(String(node.trustLevel)) > 80 ? (
                            <Badge className="bg-green-500">High</Badge>
                          ) : parseFloat(String(node.trustLevel)) > 50 ? (
                            <Badge className="bg-yellow-500">Medium</Badge>
                          ) : (
                            <Badge className="bg-red-500">Low</Badge>
                          )
                        }
                      >
                        {node.trustLevel}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      Manage Node
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Button className="w-full">
              Add Infrastructure Node
            </Button>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Podman-based secure infrastructure with TPM/SGX integration
        </p>
        <Badge variant="outline">NIST SP 800-190 Compliant</Badge>
      </CardFooter>
    </Card>
  );
};

export default SecureInfrastructurePanel;
