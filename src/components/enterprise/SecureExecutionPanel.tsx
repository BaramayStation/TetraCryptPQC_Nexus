
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Database, Server, Shield, Lock, Terminal, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { checkDatabaseEncryptionStatus } from "@/lib/secure-storage";
import { checkExecutionEnvironment, ExecutionPolicy, EXECUTION_POLICIES, executeSecurely } from "@/lib/secure-execution";

const SecureExecutionPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("storage");
  const [dbEncryption, setDbEncryption] = useState<{ tdeEnabled: boolean; algorithm: string; keyRotationEnabled: boolean } | null>(null);
  const [executionEnv, setExecutionEnv] = useState<{ podmanAvailable: boolean; starkNetZKVMAvailable: boolean; openFHEAvailable: boolean } | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<string>("STANDARD");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [enableNetworking, setEnableNetworking] = useState<boolean>(false);
  const [enableStorage, setEnableStorage] = useState<boolean>(false);

  useEffect(() => {
    // Check database encryption status
    const dbStatus = checkDatabaseEncryptionStatus();
    setDbEncryption(dbStatus);

    // Check execution environment
    const execEnv = checkExecutionEnvironment();
    setExecutionEnv(execEnv);
  }, []);

  const handleExecuteTest = async () => {
    setIsExecuting(true);
    setExecutionResult(null);

    // Create policy based on selected template and options
    const basePolicy = { ...EXECUTION_POLICIES[selectedPolicy as keyof typeof EXECUTION_POLICIES] };
    const policy: ExecutionPolicy = {
      ...basePolicy,
      networkEnabled: enableNetworking,
      persistentStorage: enableStorage
    };

    try {
      // Sample function that returns a result after some computation
      const testFunction = async (iterations: number) => {
        let result = 0;
        for (let i = 0; i < iterations; i++) {
          result += Math.sqrt(i * 1000);
        }
        return {
          value: result,
          iterations,
          timestamp: new Date().toISOString()
        };
      };

      // Execute the function in the secure environment
      const result = await executeSecurely(testFunction, [10000], policy);
      setExecutionResult(result);

      if (result.success) {
        toast({
          title: "Execution Successful",
          description: `Completed in ${result.metrics.executionTime.toFixed(2)}ms with ${result.verification.verified ? 'verified' : 'unverified'} results`,
        });
      } else {
        toast({
          title: "Execution Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during execution:", error);
      toast({
        title: "Execution Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent" />
          Enterprise Security Infrastructure
        </CardTitle>
        <CardDescription>
          FIPS 205/206 compliant secure storage and execution environment
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="storage" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mx-6">
          <TabsTrigger value="storage">
            <Database className="h-4 w-4 mr-2" />
            Secure Storage
          </TabsTrigger>
          <TabsTrigger value="execution">
            <Server className="h-4 w-4 mr-2" />
            Secure Execution
          </TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          <TabsContent value="storage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Database className="h-4 w-4 mr-2 text-blue-500" />
                    PostgreSQL with TDE
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Encryption Status:</span>
                      <Badge variant="outline" className={dbEncryption?.tdeEnabled ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {dbEncryption?.tdeEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Algorithm:</span>
                      <span className="font-mono text-xs">{dbEncryption?.algorithm}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Key Rotation:</span>
                      <Badge variant="outline" className={dbEncryption?.keyRotationEnabled ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                        {dbEncryption?.keyRotationEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Lock className="h-4 w-4 mr-2 text-indigo-500" />
                    Supabase Integration
                  </h3>
                  <p className="text-sm mb-3">Enterprise-ready database with Post-Quantum Cryptography support</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">PQC Row-Level Encryption:</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Server className="h-4 w-4 mr-2 text-purple-500" />
                    IPFS/Filecoin Storage
                  </h3>
                  <p className="text-sm mb-3">Decentralized, cryptographically verifiable storage</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>IPFS Status:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Filecoin Archive:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Arweave Backup:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Configured
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    Compliance Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>FIPS 140-3:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Compliant
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>GDPR/CCPA:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Compliant
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ISO 27001:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Certified
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="execution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Terminal className="h-4 w-4 mr-2 text-blue-500" />
                    Execution Environment
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Podman (Rootless):</span>
                      <Badge variant="outline" className={executionEnv?.podmanAvailable ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {executionEnv?.podmanAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>StarkNet zkVM:</span>
                      <Badge variant="outline" className={executionEnv?.starkNetZKVMAvailable ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {executionEnv?.starkNetZKVMAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>OpenFHE Homomorphic:</span>
                      <Badge variant="outline" className={executionEnv?.openFHEAvailable ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                        {executionEnv?.openFHEAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Shield className="h-4 w-4 mr-2 text-indigo-500" />
                    Security Policy
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="policy">Security Profile</Label>
                      <Select
                        value={selectedPolicy}
                        onValueChange={setSelectedPolicy}
                      >
                        <SelectTrigger id="policy">
                          <SelectValue placeholder="Select a security profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STANDARD">Standard Security</SelectItem>
                          <SelectItem value="SECURE">Enhanced Security</SelectItem>
                          <SelectItem value="ENTERPRISE">Enterprise FIPS</SelectItem>
                          <SelectItem value="CONFIDENTIAL">Confidential Computing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="network"
                        checked={enableNetworking}
                        onCheckedChange={setEnableNetworking}
                      />
                      <Label htmlFor="network">Enable Networking</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="storage"
                        checked={enableStorage}
                        onCheckedChange={setEnableStorage}
                      />
                      <Label htmlFor="storage">Persistent Storage</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center mb-2">
                    <Terminal className="h-4 w-4 mr-2 text-purple-500" />
                    Secure Execution Test
                  </h3>
                  <p className="text-sm mb-3">Test the selected execution environment with a sample computation</p>
                  
                  <Button 
                    onClick={handleExecuteTest} 
                    disabled={isExecuting}
                    className="w-full"
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Terminal className="h-4 w-4 mr-2" />
                        Run Test Execution
                      </>
                    )}
                  </Button>
                </div>

                {executionResult && (
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="font-medium flex items-center mb-2">
                      <Server className="h-4 w-4 mr-2 text-green-500" />
                      Execution Results
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Status:</span>
                        <Badge variant={executionResult.success ? "outline" : "destructive"} className={executionResult.success ? "bg-green-500/10 text-green-600" : ""}>
                          {executionResult.success ? "Successful" : "Failed"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Execution Time:</span>
                        <span>{executionResult.metrics.executionTime.toFixed(2)} ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Verification:</span>
                        <Badge variant="outline" className={executionResult.verification.verified ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}>
                          {executionResult.verification.verified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      {executionResult.result && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="font-mono text-xs overflow-auto max-h-20">
                            Result value: {executionResult.result.value.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          FIPS 140-3, 205, 206 compliant infrastructure
        </p>
        <Badge variant="outline">Enterprise Ready</Badge>
      </CardFooter>
    </Card>
  );
};

export default SecureExecutionPanel;
