
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Radio, Satellite, Wifi, Key, HardDrive, RefreshCw, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { initializeFailsafeSystem, testFailsafeRecovery, getFailsafeStatus, ResilienceLevel, CommunicationMode, CryptoFallbackAlgorithm } from "@/lib/failsafe-continuity";

const FailsafeContinuityPanel: React.FC = () => {
  const { toast } = useToast();
  const [failsafeStatus, setFailsafeStatus] = useState<any>(null);
  const [recoveryKey, setRecoveryKey] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Initialize the failsafe system
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        const status = getFailsafeStatus();
        setFailsafeStatus(status);
      } catch (error) {
        console.error("Failed to get failsafe status:", error);
      }
    };

    initializeSystem();
  }, []);

  // Initialize the failsafe system
  const handleInitializeSystem = async () => {
    setIsInitializing(true);
    try {
      const { status, emergencyRecoveryKey } = await initializeFailsafeSystem();
      setFailsafeStatus(status);
      setRecoveryKey(emergencyRecoveryKey);
      
      toast({
        title: "Failsafe System Initialized",
        description: "COG-grade resilience system is now operational",
      });
    } catch (error) {
      console.error("Failed to initialize failsafe system:", error);
      toast({
        title: "Initialization Failed",
        description: "Could not initialize failsafe system",
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  // Test the failsafe recovery system
  const handleTestFailsafe = async () => {
    setIsTesting(true);
    try {
      const results = await testFailsafeRecovery();
      setTestResults(results);
      
      if (results.testSuccessful) {
        toast({
          title: "Failsafe Test Successful",
          description: "All failsafe systems are operational",
        });
      } else {
        toast({
          title: "Failsafe Test Incomplete",
          description: "Some failsafe systems require attention",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to test failsafe recovery:", error);
      toast({
        title: "Test Failed",
        description: "Could not complete failsafe recovery test",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Helper function to get badge color based on resilience level
  const getResilienceBadgeColor = (level: ResilienceLevel) => {
    switch (level) {
      case ResilienceLevel.NORMAL:
        return "bg-green-500";
      case ResilienceLevel.ELEVATED:
        return "bg-blue-500";
      case ResilienceLevel.HIGH:
        return "bg-yellow-500";
      case ResilienceLevel.SEVERE:
        return "bg-orange-500";
      case ResilienceLevel.CATASTROPHIC:
        return "bg-red-500";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          COG-Grade Failsafe Continuity System
        </CardTitle>
        <CardDescription>
          Continuity of Government (COG) disaster resilience for TetraCryptPQC
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!failsafeStatus ? (
          <div className="p-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Failsafe System Not Initialized</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Initialize the COG-grade failsafe system to ensure TetraCryptPQC remains operational
              during catastrophic events.
            </p>
            <Button 
              onClick={handleInitializeSystem} 
              disabled={isInitializing}
              className="mx-auto"
            >
              {isInitializing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                "Initialize Failsafe System"
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="status">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="status">System Status</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="cryptography">Cryptography</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <h3 className="text-sm font-medium mb-2">Resilience Level</h3>
                  <div className="flex justify-between items-center">
                    <Badge className={getResilienceBadgeColor(failsafeStatus.resilienceLevel)}>
                      {failsafeStatus.resilienceLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="text-sm font-medium mb-2">Threat Level</h3>
                  <div className="space-y-2">
                    <Progress value={failsafeStatus.threatLevel} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="text-sm font-medium mb-2">Backup Nodes</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{failsafeStatus.backupNodesAvailable}</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded space-y-2">
                <h3 className="text-sm font-medium">Network Status</h3>
                <div className="flex items-center gap-2">
                  {failsafeStatus.networkStatus === "online" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : failsafeStatus.networkStatus === "degraded" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <span className="capitalize">{failsafeStatus.networkStatus}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(failsafeStatus.lastUpdated).toLocaleString()}
                </div>
              </div>

              {testResults && (
                <Alert className={testResults.testSuccessful ? "border-green-500" : "border-yellow-500"}>
                  {testResults.testSuccessful ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  <AlertTitle>
                    {testResults.testSuccessful
                      ? "All Systems Operational"
                      : "System Check Required"}
                  </AlertTitle>
                  <AlertDescription className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        {testResults.communicationTest ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span>Communication Systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {testResults.cryptoAlgorithmTest ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span>Cryptographic Algorithms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {testResults.offlineOperationTest ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span>Offline Operations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {testResults.satelliteConnectionTest ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span>Satellite Connection</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {recoveryKey && (
                <div className="p-4 border rounded space-y-2 bg-muted/50">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Emergency Recovery Key
                  </h3>
                  <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                    {recoveryKey}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Store this key securely. It will be required for emergency recovery operations.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="communications" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded space-y-2">
                  <h3 className="text-sm font-medium mb-2">Current Communication Mode</h3>
                  <div className="flex items-center gap-2">
                    {failsafeStatus.communicationMode === CommunicationMode.STANDARD ? (
                      <Wifi className="h-4 w-4 text-primary" />
                    ) : failsafeStatus.communicationMode === CommunicationMode.MESH ? (
                      <Wifi className="h-4 w-4 text-primary" />
                    ) : failsafeStatus.communicationMode === CommunicationMode.SATELLITE ? (
                      <Satellite className="h-4 w-4 text-primary" />
                    ) : (
                      <Radio className="h-4 w-4 text-primary" />
                    )}
                    <span className="capitalize">{failsafeStatus.communicationMode}</span>
                  </div>
                </div>
                <div className="p-4 border rounded space-y-2">
                  <h3 className="text-sm font-medium mb-2">Failover Communication</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        P2P Mesh
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Satellite
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        LoRa Radio
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Ham Radio
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded space-y-2">
                <h3 className="text-sm font-medium">Disaster Communication Scenarios</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Scenario</th>
                      <th className="text-left py-2">Fallback Method</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Internet Blackout</td>
                      <td>Satellite Mesh Network</td>
                      <td>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          Ready
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">EMP Attack</td>
                      <td>Faraday-Protected Radio</td>
                      <td>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          Ready
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Infrastructure Collapse</td>
                      <td>P2P LoRa + Ham Network</td>
                      <td>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                          Testing
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="cryptography" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded space-y-2">
                  <h3 className="text-sm font-medium mb-2">Current Cryptographic Algorithm</h3>
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    <span>{failsafeStatus.cryptoAlgorithm}</span>
                  </div>
                </div>
                <div className="p-4 border rounded space-y-2">
                  <h3 className="text-sm font-medium mb-2">Fallback Algorithms</h3>
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        BIKE (Ring-Learning)
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        FrodoKEM (Lattice-Based)
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Falcon (Alternative Signature)
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded space-y-2">
                <h3 className="text-sm font-medium">Quantum Threat Response Matrix</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Threat Scenario</th>
                      <th className="text-left py-2">Algorithm Migration</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">ML-KEM (Kyber) Compromise</td>
                      <td>Switch to BIKE</td>
                      <td>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          Ready
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">SLH-DSA Vulnerability</td>
                      <td>Switch to Falcon</td>
                      <td>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          Ready
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Multiple PQC Exploits</td>
                      <td>Air-Gapped FrodoKEM + MPC</td>
                      <td>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                          Ready
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleTestFailsafe}
          disabled={isTesting || !failsafeStatus}
          className="mr-2"
        >
          {isTesting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Failsafe Systems"
          )}
        </Button>
        <Button 
          disabled={isInitializing || !failsafeStatus}
        >
          Run Disaster Recovery Drill
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FailsafeContinuityPanel;
