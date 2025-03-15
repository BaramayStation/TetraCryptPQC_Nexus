
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Lock,
  Database,
  Radio,
  UserCircle,
  AlertTriangle,
  Server,
  RefreshCw,
  Zap,
  PuzzleIcon
} from 'lucide-react';

// Import the failsafe system
import { 
  TetraCryptFailsafe,
  FailsafeComponentType,
  FailsafeStatus,
  FailsafeSystemReport,
  CryptoAlgorithm,
  StorageMedium,
  CommunicationMedium,
  IdentityMethod
} from '@/lib/failsafe';

const FailsafeNetworkPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState<FailsafeSystemReport | null>(null);
  const [testResults, setTestResults] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Load the initial status
    updateSystemStatus();
  }, []);
  
  const updateSystemStatus = async () => {
    setLoading(true);
    try {
      const status = await TetraCryptFailsafe.getSystemStatus();
      setSystemStatus(status);
    } catch (error) {
      console.error("Failed to get system status:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTestAll = async () => {
    setLoading(true);
    try {
      const allPassed = await TetraCryptFailsafe.testAll();
      const status = await TetraCryptFailsafe.getSystemStatus();
      setSystemStatus(status);
      setTestResults({
        timestamp: new Date().toISOString(),
        allPassed,
        message: allPassed 
          ? "All failsafe systems tested successfully" 
          : "Some failsafe systems failed testing"
      });
    } catch (error) {
      console.error("Error testing failsafe systems:", error);
      setTestResults({
        timestamp: new Date().toISOString(),
        allPassed: false,
        message: `Error during testing: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSimulateFailure = async (componentType: FailsafeComponentType) => {
    setLoading(true);
    try {
      const result = await TetraCryptFailsafe.simulateFailure(componentType);
      // Update the status after simulation
      updateSystemStatus();
      return result;
    } catch (error) {
      console.error(`Error simulating ${componentType} failure:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitchCryptoAlgorithm = async (algorithm: CryptoAlgorithm) => {
    setLoading(true);
    try {
      await TetraCryptFailsafe.crypto.switchToAlgorithm(algorithm);
      updateSystemStatus();
    } catch (error) {
      console.error(`Error switching to crypto algorithm ${algorithm}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitchStorageMedium = async (medium: StorageMedium) => {
    setLoading(true);
    try {
      await TetraCryptFailsafe.storage.switchToMedium(medium);
      updateSystemStatus();
    } catch (error) {
      console.error(`Error switching to storage medium ${medium}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitchCommunicationMedium = async (medium: CommunicationMedium) => {
    setLoading(true);
    try {
      await TetraCryptFailsafe.communication.switchToMedium(medium);
      updateSystemStatus();
    } catch (error) {
      console.error(`Error switching to communication medium ${medium}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitchIdentityMethod = async (method: IdentityMethod) => {
    setLoading(true);
    try {
      await TetraCryptFailsafe.identity.switchToMethod(method);
      updateSystemStatus();
    } catch (error) {
      console.error(`Error switching to identity method ${method}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadgeClass = (status: FailsafeStatus) => {
    switch (status) {
      case FailsafeStatus.ONLINE:
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case FailsafeStatus.DEGRADED:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case FailsafeStatus.FALLBACK:
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case FailsafeStatus.EMERGENCY:
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case FailsafeStatus.OFFLINE:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
    }
  };
  
  const getComponentIcon = (componentType: FailsafeComponentType) => {
    switch (componentType) {
      case FailsafeComponentType.CRYPTOGRAPHY:
        return <Lock className="h-4 w-4" />;
      case FailsafeComponentType.STORAGE:
        return <Database className="h-4 w-4" />;
      case FailsafeComponentType.COMMUNICATION:
        return <Radio className="h-4 w-4" />;
      case FailsafeComponentType.IDENTITY:
        return <UserCircle className="h-4 w-4" />;
      case FailsafeComponentType.EXECUTION:
        return <Server className="h-4 w-4" />;
      case FailsafeComponentType.NETWORK:
        return <PuzzleIcon className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };
  
  if (!systemStatus) {
    return (
      <div className="p-4 text-center">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
        <p>Loading failsafe system status...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            TetraCryptPQC Multi-Layer Failsafe Network
          </CardTitle>
          <CardDescription>
            Comprehensive failsafe system ensuring continued operation during infrastructure failure or attacks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="crypto">Cryptography</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="identity">Identity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">System Status</h3>
                  <Badge className={getStatusBadgeClass(systemStatus.overallStatus)}>
                    {systemStatus.overallStatus.toUpperCase()}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={handleTestAll}
                  disabled={loading}
                >
                  <RefreshCw className={`mr-1 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Test All Systems
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(systemStatus.componentStatuses).map(([type, status]) => (
                  <Card key={type} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {getComponentIcon(type as FailsafeComponentType)}
                          <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        </div>
                        <Badge className={getStatusBadgeClass(status.status)}>
                          {status.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 pt-0">
                      <div className="text-xs text-muted-foreground mb-1.5">
                        Active: {status.activeImplementation || "None"}
                      </div>
                      <Progress
                        value={
                          status.status === FailsafeStatus.ONLINE ? 100 :
                          status.status === FailsafeStatus.DEGRADED ? 75 :
                          status.status === FailsafeStatus.FALLBACK ? 50 :
                          status.status === FailsafeStatus.EMERGENCY ? 25 : 0
                        }
                        className="h-1.5 mb-2"
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Implementations: {status.availableImplementations.length}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSimulateFailure(type as FailsafeComponentType)}
                          disabled={loading}
                          className="h-7 text-xs"
                        >
                          Test Failover
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {systemStatus.recommendations.length > 0 && (
                <Alert className="mt-4 bg-amber-500/10 border-amber-500/50">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertTitle>Recommendations</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {systemStatus.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              {testResults && (
                <Alert className={`mt-4 ${testResults.allPassed ? 
                  'bg-green-500/10 border-green-500/50' : 
                  'bg-red-500/10 border-red-500/50'}`}>
                  <Zap className={`h-4 w-4 ${testResults.allPassed ? 'text-green-500' : 'text-red-500'}`} />
                  <AlertTitle>Test Results</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm">{testResults.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(testResults.timestamp).toLocaleString()}
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="crypto" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Lock className="h-4 w-4" />
                    Cryptographic Algorithms
                  </CardTitle>
                  <CardDescription>
                    Post-quantum secure algorithms with failover capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Current Algorithm</div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary">{
                          systemStatus.componentStatuses[FailsafeComponentType.CRYPTOGRAPHY]?.activeImplementation || "None"
                        }</Badge>
                        <div className="text-xs text-muted-foreground">
                          Status: {systemStatus.componentStatuses[FailsafeComponentType.CRYPTOGRAPHY]?.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Switch Algorithm</div>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => handleSwitchCryptoAlgorithm(value as CryptoAlgorithm)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select algorithm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={CryptoAlgorithm.ML_KEM}>ML-KEM (Kyber)</SelectItem>
                            <SelectItem value={CryptoAlgorithm.BIKE}>BIKE</SelectItem>
                            <SelectItem value={CryptoAlgorithm.FRODO_KEM}>FrodoKEM</SelectItem>
                            <SelectItem value={CryptoAlgorithm.SLH_DSA}>SLH-DSA (Dilithium)</SelectItem>
                            <SelectItem value={CryptoAlgorithm.FALCON}>Falcon</SelectItem>
                            <SelectItem value={CryptoAlgorithm.SPHINCS_PLUS}>SPHINCS+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="text-sm font-medium mb-2">Failover Chain</div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500/10 text-green-500">{CryptoAlgorithm.ML_KEM}</Badge>
                        <span className="text-xs">→</span>
                        <Badge className="bg-blue-500/10 text-blue-500">{CryptoAlgorithm.BIKE}</Badge>
                        <span className="text-xs">→</span>
                        <Badge className="bg-orange-500/10 text-orange-500">{CryptoAlgorithm.FRODO_KEM}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Database className="h-4 w-4" />
                    Storage Systems
                  </CardTitle>
                  <CardDescription>
                    Secure data storage with multiple fallback options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Current Storage</div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary">{
                          systemStatus.componentStatuses[FailsafeComponentType.STORAGE]?.activeImplementation || "None"
                        }</Badge>
                        <div className="text-xs text-muted-foreground">
                          Status: {systemStatus.componentStatuses[FailsafeComponentType.STORAGE]?.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Switch Storage</div>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => handleSwitchStorageMedium(value as StorageMedium)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select storage medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={StorageMedium.LOCAL_STORAGE}>Local Storage</SelectItem>
                            <SelectItem value={StorageMedium.INDEXED_DB}>IndexedDB</SelectItem>
                            <SelectItem value={StorageMedium.IN_MEMORY}>In-Memory</SelectItem>
                            <SelectItem value={StorageMedium.P2P_DISTRIBUTED}>P2P Distributed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="communication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Radio className="h-4 w-4" />
                    Communication Networks
                  </CardTitle>
                  <CardDescription>
                    Multi-protocol communication with automatic failover
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Current Network</div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary">{
                          systemStatus.componentStatuses[FailsafeComponentType.COMMUNICATION]?.activeImplementation || "None"
                        }</Badge>
                        <div className="text-xs text-muted-foreground">
                          Status: {systemStatus.componentStatuses[FailsafeComponentType.COMMUNICATION]?.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Switch Network</div>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => handleSwitchCommunicationMedium(value as CommunicationMedium)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select communication medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={CommunicationMedium.WEBSOCKET}>WebSocket</SelectItem>
                            <SelectItem value={CommunicationMedium.WEBRTC}>WebRTC</SelectItem>
                            <SelectItem value={CommunicationMedium.WEBTRANSPORT}>WebTransport</SelectItem>
                            <SelectItem value={CommunicationMedium.HTTP}>HTTP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="identity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <UserCircle className="h-4 w-4" />
                    Identity Systems
                  </CardTitle>
                  <CardDescription>
                    Post-quantum secure identity with multiple authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Current Identity Method</div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary">{
                          systemStatus.componentStatuses[FailsafeComponentType.IDENTITY]?.activeImplementation || "None"
                        }</Badge>
                        <div className="text-xs text-muted-foreground">
                          Status: {systemStatus.componentStatuses[FailsafeComponentType.IDENTITY]?.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium">Switch Identity</div>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => handleSwitchIdentityMethod(value as IdentityMethod)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select identity method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={IdentityMethod.PQC_KEYPAIR}>PQC Keypair</SelectItem>
                            <SelectItem value={IdentityMethod.DECENTRALIZED_ID}>Decentralized ID</SelectItem>
                            <SelectItem value={IdentityMethod.STARKNET_ID}>StarkNet ID</SelectItem>
                            <SelectItem value={IdentityMethod.MULTISIG}>Multi-signature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(systemStatus.timestamp).toLocaleString()}
          </div>
          <Button size="sm" onClick={updateSystemStatus} disabled={loading}>
            <RefreshCw className={`mr-1 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FailsafeNetworkPanel;
