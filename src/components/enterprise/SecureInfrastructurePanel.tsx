
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
  createSecureContainer,
  createSecureServiceMesh,
  createSecureInfraNode,
  verifyContainerIntegrity,
  rotateContainer
} from "@/lib/secure-infrastructure";
import { SecureContainerConfig, SecureInfraNode, SecureServiceMesh } from '@/lib/storage-types';
import { Progress } from "@/components/ui/progress";

const SecureInfrastructurePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("containers");
  const [hwCapabilities, setHwCapabilities] = useState<any>(null);
  const [containers, setContainers] = useState<SecureContainerConfig[]>([]);
  const [nodes, setNodes] = useState<SecureInfraNode[]>([]);
  const [serviceMesh, setServiceMesh] = useState<SecureServiceMesh | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [containerName, setContainerName] = useState("secure-app");
  const [securityProfile, setSecurityProfile] = useState<"standard" | "hardened" | "tpm-protected" | "sgx-enclave">("hardened");
  const [immutableRootfs, setImmutableRootfs] = useState(true);
  const [enableRotation, setEnableRotation] = useState(true);
  
  // Load hardware capabilities and demo containers on component mount
  useEffect(() => {
    const loadData = async () => {
      // Check hardware security capabilities
      const capabilities = await checkHardwareSecurityCapabilities();
      setHwCapabilities(capabilities);
      
      // Create demo containers
      try {
        const container1 = await createSecureContainer("app-frontend", "hardened", {
          immutableRootfs: true,
          confinement: "apparmor"
        });
        
        const container2 = await createSecureContainer("app-backend", "tpm-protected", {
          immutableRootfs: true,
          confinement: "selinux",
          rotationEnabled: true
        });
        
        setContainers([container1, container2]);
        
        // Create demo nodes
        const node1 = await createSecureInfraNode("primary-node", "physical", {
          confidentialComputing: true,
          attestationSupport: true
        });
        
        const node2 = await createSecureInfraNode("replica-node", "virtual", {
          compliance: ["fisma", "fedramp"]
        });
        
        setNodes([node1, node2]);
        
        // Create demo service mesh
        const mesh = await createSecureServiceMesh("tetracrypt-mesh", [container1.id, container2.id], {
          encryptionType: "ml-kem",
          mutualAuthentication: true,
          certificateRotation: true
        });
        
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
  
  // Create a new secure container
  const handleCreateContainer = async () => {
    setIsCreating(true);
    
    try {
      const newContainer = await createSecureContainer(containerName, securityProfile, {
        immutableRootfs,
        rotationEnabled: enableRotation
      });
      
      setContainers([...containers, newContainer]);
      
      toast({
        title: "Container Created",
        description: `Secure container ${containerName} created with ${securityProfile} profile`,
      });
      
      // Reset form
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
  
  // Verify container integrity
  const handleVerifyIntegrity = async (container: SecureContainerConfig) => {
    setIsVerifying(true);
    
    try {
      const result = await verifyContainerIntegrity(container);
      
      if (result.verified) {
        toast({
          title: "Integrity Verified",
          description: `Container ${container.name} passed integrity verification`,
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
  
  // Rotate a container
  const handleRotateContainer = async (container: SecureContainerConfig) => {
    try {
      const rotatedContainer = await rotateContainer(container);
      
      // Update containers list
      setContainers(containers.map(c => 
        c.id === container.id ? rotatedContainer : c
      ));
      
      toast({
        title: "Container Rotated",
        description: `Container ${container.name} successfully rotated`,
      });
    } catch (error) {
      console.error("Error rotating container:", error);
      toast({
        title: "Rotation Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  // Get security profile badge color
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
            {/* Hardware Security Capabilities */}
            {hwCapabilities && (
              <div className="bg-secondary/20 p-4 rounded-lg mb-6">
                <h3 className="font-medium flex items-center mb-2">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Hardware Security Capabilities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">TPM</span>
                    <Badge variant="outline" className={hwCapabilities.tpmAvailable ? 
                      "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                      {hwCapabilities.tpmAvailable ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Not Available</>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Intel SGX</span>
                    <Badge variant="outline" className={hwCapabilities.sgxAvailable ? 
                      "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                      {hwCapabilities.sgxAvailable ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Not Available</>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">AMD SEV</span>
                    <Badge variant="outline" className={hwCapabilities.sevAvailable ? 
                      "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                      {hwCapabilities.sevAvailable ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Not Available</>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Secure Boot</span>
                    <Badge variant="outline" className={hwCapabilities.secureBootEnabled ? 
                      "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                      {hwCapabilities.secureBootEnabled ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Enabled</>
                      ) : (
                        <><AlertTriangle className="h-3 w-3 mr-1" /> Disabled</>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Create Container Form */}
            <div className="bg-secondary/20 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-4">Create Secure Container</h3>
              
              <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="container-name">Container Name</Label>
                    <input
                      id="container-name"
                      value={containerName}
                      onChange={(e) => setContainerName(e.target.value)}
                      className="w-full p-2 rounded border bg-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="security-profile">Security Profile</Label>
                    <Select
                      value={securityProfile}
                      onValueChange={(value) => setSecurityProfile(value as any)}
                    >
                      <SelectTrigger id="security-profile">
                        <SelectValue placeholder="Select profile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hardened">Hardened</SelectItem>
                        <SelectItem value="tpm-protected">TPM Protected</SelectItem>
                        <SelectItem value="sgx-enclave">SGX Enclave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="immutable-rootfs"
                      checked={immutableRootfs}
                      onCheckedChange={setImmutableRootfs}
                    />
                    <Label htmlFor="immutable-rootfs">Immutable RootFS</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enable-rotation"
                      checked={enableRotation}
                      onCheckedChange={setEnableRotation}
                    />
                    <Label htmlFor="enable-rotation">Enable Container Rotation</Label>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleCreateContainer} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Create Secure Container
                  </>
                )}
              </Button>
            </div>

            {/* Container List */}
            <div className="space-y-4">
              <h3 className="font-medium">Secure Containers</h3>
              
              {containers.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">
                  No secure containers created
                </div>
              ) : (
                <div className="space-y-4">
                  {containers.map((container) => (
                    <div key={container.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 mr-2 text-accent" />
                          <div>
                            <h4 className="font-medium">{container.name}</h4>
                            <p className="text-xs text-muted-foreground">ID: {container.id}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getProfileColor(container.securityProfile)}>
                          {container.securityProfile}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Immutable RootFS</p>
                          <Badge variant="outline" className={container.immutableRootfs ? 
                            "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                            {container.immutableRootfs ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Confinement</p>
                          <Badge variant="outline">
                            {container.confinement.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Rotation</p>
                          <Badge variant="outline" className={container.rotationPolicy?.enabled ? 
                            "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                            {container.rotationPolicy?.enabled ? 
                              `Every ${container.rotationPolicy.interval} min` : "Disabled"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerifyIntegrity(container)}
                          disabled={isVerifying}
                        >
                          {isVerifying ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Shield className="h-4 w-4 mr-1" />
                          )}
                          Verify Integrity
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRotateContainer(container)}
                          disabled={!container.rotationPolicy?.enabled}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Rotate Container
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="mesh" className="space-y-6">
            {/* Service Mesh Security */}
            {serviceMesh ? (
              <div className="space-y-4">
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-accent" />
                      <div>
                        <h4 className="font-medium">{serviceMesh.name}</h4>
                        <p className="text-xs text-muted-foreground">ID: {serviceMesh.id}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600">
                      {serviceMesh.services.length} Services
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Encryption</p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        {serviceMesh.encryptionType}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">mTLS</p>
                      <Badge variant="outline" className={serviceMesh.mtls ? 
                        "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {serviceMesh.mtls ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Certificate Rotation</p>
                      <Badge variant="outline" className={serviceMesh.certificateRotation ? 
                        "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                        {serviceMesh.certificateRotation ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mutual Auth</p>
                      <Badge variant="outline" className={serviceMesh.mutualAuthentication ? 
                        "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {serviceMesh.mutualAuthentication ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">Anomaly Detection</p>
                      <Badge variant="outline" className={serviceMesh.anomalyDetection ? 
                        "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {serviceMesh.anomalyDetection ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground">zk-Proof Verification</p>
                      <Badge variant="outline" className={serviceMesh.zkProofVerification ? 
                        "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                        {serviceMesh.zkProofVerification ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Mesh Security Status */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Mesh Security Status</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Encryption Strength</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Identity Verification</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Traffic Protection</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Quantum Resistance</span>
                        <span className="text-sm font-medium">
                          {serviceMesh.encryptionType === 'ml-kem' ? '99%' : '75%'}
                        </span>
                      </div>
                      <Progress value={serviceMesh.encryptionType === 'ml-kem' ? 99 : 75} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No service mesh configured</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="nodes" className="space-y-6">
            {/* Infrastructure Nodes */}
            {nodes.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No infrastructure nodes configured</p>
              </div>
            ) : (
              <div className="space-y-4">
                {nodes.map((node) => (
                  <div key={node.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 mr-2 text-accent" />
                        <div>
                          <h4 className="font-medium">{node.name}</h4>
                          <p className="text-xs text-muted-foreground">ID: {node.id}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={
                        node.type === 'physical' ? "bg-indigo-500/10 text-indigo-600" :
                        node.type === 'virtual' ? "bg-blue-500/10 text-blue-600" :
                        "bg-violet-500/10 text-violet-600"
                      }>
                        {node.type.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Hardware Security</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {node.hardwareCapabilities.tpm && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">TPM</Badge>
                          )}
                          {node.hardwareCapabilities.sgx && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">SGX</Badge>
                          )}
                          {node.hardwareCapabilities.sev && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">SEV</Badge>
                          )}
                          {node.hardwareCapabilities.secureBoot && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">SecureBoot</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Compliance</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {Object.entries(node.complianceStatus)
                            .filter(([_, value]) => value)
                            .map(([key]) => (
                              <Badge key={key} variant="outline" className="bg-blue-500/10 text-blue-600">
                                {key.toUpperCase()}
                              </Badge>
                            ))
                          }
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Threat Level</p>
                        <Badge variant="outline" className={
                          node.threatLevel === 'minimal' ? "bg-green-500/10 text-green-600" :
                          node.threatLevel === 'low' ? "bg-blue-500/10 text-blue-600" :
                          node.threatLevel === 'medium' ? "bg-yellow-500/10 text-yellow-600" :
                          "bg-red-500/10 text-red-600"
                        }>
                          {node.threatLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Confidential Computing</p>
                        <Badge variant="outline" className={node.confidentialComputing ? 
                          "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                          {node.confidentialComputing ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Attestation Support</p>
                        <Badge variant="outline" className={node.attestationSupport ? 
                          "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                          {node.attestationSupport ? "Supported" : "Not Supported"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
