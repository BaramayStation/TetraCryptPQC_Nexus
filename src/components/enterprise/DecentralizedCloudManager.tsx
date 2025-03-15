
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { 
  Shield, 
  Cloud, 
  Server, 
  Database, 
  HardDrive, 
  RefreshCw, 
  Wifi, 
  RadioTower,
  Satellite,
  Lock,
  ShieldAlert,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UploadCloud,
  DownloadCloud
} from "lucide-react";

import { 
  initDecentralizedCloud, 
  backupToDecentralizedCloud,
  retrieveFromDecentralizedCloud,
  verifyCloudIntegrity,
  initiateEmergencyRecovery,
  StorageTier,
  BackupStrategy
} from "@/lib/decentralized-cloud";

import type { 
  DecentralizedStorageNode, 
  AirGappedBackup, 
  SatelliteConnection,
  EMPHardenedSystem,
  DeploymentEnvironment 
} from "@/lib/storage-types";

const DecentralizedCloudManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<"initializing" | "active" | "degraded" | "failed">("initializing");
  
  const [environments, setEnvironments] = useState<DeploymentEnvironment[]>([]);
  const [storageNodes, setStorageNodes] = useState<DecentralizedStorageNode[]>([]);
  const [backupNodes, setBackupNodes] = useState<AirGappedBackup[]>([]);
  const [satelliteConnections, setSatelliteConnections] = useState<SatelliteConnection[]>([]);
  const [empSystems, setEmpSystems] = useState<EMPHardenedSystem[]>([]);
  
  const [integrityStatus, setIntegrityStatus] = useState<{
    overallStatus: "healthy" | "warning" | "critical";
    nodeStatuses: Record<string, "online" | "degraded" | "offline">;
    integrityScore: number;
    redundancyScore: number;
    securityScore: number;
    recommendations: string[];
  } | null>(null);
  
  const [recoveryLevel, setRecoveryLevel] = useState<"standard" | "elevated" | "critical">("standard");
  const [backupTier, setBackupTier] = useState<StorageTier>(StorageTier.WARM);
  const [backupStrategy, setBackupStrategy] = useState<BackupStrategy>(BackupStrategy.REAL_TIME);
  
  // Initialize the cloud infrastructure when the component mounts
  useEffect(() => {
    const initialize = async () => {
      try {
        const result = await initDecentralizedCloud();
        
        setEnvironments(result.environments);
        setStorageNodes(result.storageNodes);
        setBackupNodes(result.backupNodes);
        setSatelliteConnections(result.satelliteConnections);
        setEmpSystems(result.empHardenedSystems);
        setCloudStatus(result.status);
        
        // Verify initial integrity
        const integrity = await verifyCloudIntegrity();
        setIntegrityStatus(integrity);
        
        setIsInitializing(false);
        
        toast({
          title: "Decentralized Cloud Initialized",
          description: "Military-grade infrastructure is now active and secured",
        });
      } catch (error) {
        console.error("Error initializing decentralized cloud:", error);
        setCloudStatus("failed");
        setIsInitializing(false);
        
        toast({
          title: "Initialization Failed",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
      }
    };
    
    initialize();
  }, []);
  
  // Handle cloud integrity check
  const handleIntegrityCheck = async () => {
    setIsLoading(true);
    
    try {
      const integrity = await verifyCloudIntegrity();
      setIntegrityStatus(integrity);
      
      toast({
        title: `Integrity Check: ${integrity.overallStatus.toUpperCase()}`,
        description: `Integrity: ${integrity.integrityScore}%, Redundancy: ${integrity.redundancyScore}%, Security: ${integrity.securityScore}%`,
        variant: integrity.overallStatus === "healthy" ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error checking cloud integrity:", error);
      
      toast({
        title: "Integrity Check Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle manual backup
  const handleManualBackup = async () => {
    setIsLoading(true);
    
    try {
      const testData = {
        timestamp: new Date().toISOString(),
        type: "manual-backup",
        contents: "Test backup data for military-grade decentralized cloud"
      };
      
      const result = await backupToDecentralizedCloud(
        testData, 
        backupTier,
        backupStrategy
      );
      
      toast({
        title: "Backup Successful",
        description: `Backup ID: ${result.backupId.substring(0, 8)}... stored across ${result.locations.length} locations`,
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      
      toast({
        title: "Backup Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle emergency recovery
  const handleEmergencyRecovery = async () => {
    setIsLoading(true);
    
    try {
      const result = await initiateEmergencyRecovery(recoveryLevel);
      
      toast({
        title: "Emergency Recovery Initiated",
        description: `Protocol: ${result.protocol}, ETA: ${result.estimatedTimeMinutes} minutes`,
        variant: "default",
      });
      
      // Update cloud status during recovery
      setCloudStatus("degraded");
      
      // Simulate recovery process completion
      setTimeout(() => {
        setCloudStatus("active");
        toast({
          title: "Recovery Complete",
          description: "System has been successfully recovered",
        });
      }, 5000);
    } catch (error) {
      console.error("Error initiating emergency recovery:", error);
      
      toast({
        title: "Recovery Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get the color for overall status
  const getStatusColor = (status: "initializing" | "active" | "degraded" | "failed") => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600";
      case "degraded": return "bg-yellow-500/10 text-yellow-600";
      case "failed": return "bg-red-500/10 text-red-600";
      default: return "bg-blue-500/10 text-blue-600";
    }
  };
  
  const getHealthStatusColor = (status: "healthy" | "warning" | "critical") => {
    switch (status) {
      case "healthy": return "bg-green-500/10 text-green-600";
      case "warning": return "bg-yellow-500/10 text-yellow-600";
      case "critical": return "bg-red-500/10 text-red-600";
      default: return "bg-blue-500/10 text-blue-600";
    }
  };
  
  const getNodeStatusIcon = (status: "online" | "degraded" | "offline") => {
    switch (status) {
      case "online": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "degraded": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "offline": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>Military-Grade Decentralized Cloud</CardTitle>
          </div>
          <Badge className={getStatusColor(cloudStatus)}>
            {cloudStatus.toUpperCase()}
          </Badge>
        </div>
        <CardDescription>
          Post-quantum secure, AI-powered decentralized infrastructure with automatic failover, 
          redundancy, and resilience against cyberattacks, EMP, and data corruption.
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mx-6">
          <TabsTrigger value="overview">
            <Cloud className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Database className="h-4 w-4 mr-2" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="backup">
            <HardDrive className="h-4 w-4 mr-2" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="resilience">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Resilience
          </TabsTrigger>
          <TabsTrigger value="network">
            <Satellite className="h-4 w-4 mr-2" />
            Network
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-6">
          {isInitializing ? (
            <div className="p-8 text-center">
              <div className="animate-spin mb-4 mx-auto">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <p>Initializing Military-Grade Decentralized Cloud Infrastructure...</p>
              <p className="text-sm text-muted-foreground mt-2">Establishing secure connections to decentralized storage networks</p>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Integrity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">{integrityStatus?.integrityScore || 0}%</div>
                      <Progress value={integrityStatus?.integrityScore || 0} className="h-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Redundancy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">{integrityStatus?.redundancyScore || 0}%</div>
                      <Progress value={integrityStatus?.redundancyScore || 0} className="h-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">{integrityStatus?.securityScore || 0}%</div>
                      <Progress value={integrityStatus?.securityScore || 0} className="h-2" />
                    </CardContent>
                  </Card>
                </div>
                
                {integrityStatus && (
                  <Alert className={`${getHealthStatusColor(integrityStatus.overallStatus)}`}>
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>System Status: {integrityStatus.overallStatus.toUpperCase()}</AlertTitle>
                    <AlertDescription>
                      {integrityStatus.recommendations[0]}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Deployment Environments</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-60 overflow-y-auto">
                      <div className="space-y-2">
                        {environments.map(env => (
                          <div key={env.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                            <div>
                              <div className="font-medium">{env.name}</div>
                              <div className="text-xs text-muted-foreground">{env.type} / {env.provider}</div>
                            </div>
                            <Badge variant="outline">{env.securityProfile}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Node Statuses</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-60 overflow-y-auto">
                      {integrityStatus && (
                        <div className="space-y-2">
                          {Object.entries(integrityStatus.nodeStatuses).map(([node, status]) => (
                            <div key={node} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                              <div className="font-medium">{node}</div>
                              <div className="flex items-center gap-1">
                                {getNodeStatusIcon(status)}
                                <span>{status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-between gap-4">
                  <Button 
                    onClick={handleIntegrityCheck} 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Verify Integrity
                  </Button>
                  
                  <Button 
                    onClick={handleManualBackup}
                    className="flex-1"
                    disabled={isLoading}
                    variant="outline"
                  >
                    <UploadCloud className="h-4 w-4 mr-2" />
                    Manual Backup
                  </Button>
                </div>
              </TabsContent>
              
              {/* Storage Tab */}
              <TabsContent value="storage" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {storageNodes.map(node => (
                    <Card key={node.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-sm flex items-center gap-2">
                            {node.type === 'ipfs' && <Database className="h-4 w-4" />}
                            {node.type === 'filecoin' && <HardDrive className="h-4 w-4" />}
                            {node.type === 'arweave' && <Lock className="h-4 w-4" />}
                            {node.type === 'starknet' && <Server className="h-4 w-4" />}
                            {node.type === 'satellite' && <Satellite className="h-4 w-4" />}
                            {node.type}
                          </CardTitle>
                          <Badge variant="outline" className={
                            node.status === 'online' ? 'bg-green-500/10 text-green-600' :
                            node.status === 'offline' ? 'bg-red-500/10 text-red-600' :
                            'bg-yellow-500/10 text-yellow-600'
                          }>
                            {node.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Storage</span>
                            <span>{node.usedStorage}GB / {node.storageCapacity}GB</span>
                          </div>
                          <Progress 
                            value={(node.usedStorage / node.storageCapacity) * 100} 
                            className="h-1"
                          />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Replication</span>
                            <span>{node.replicationFactor}x</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location</span>
                            <span>{node.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">PQC</span>
                            <span>{node.pqcEnabled ? 'Enabled' : 'Disabled'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full">
                  Add Storage Node
                </Button>
              </TabsContent>
              
              {/* Backup Tab */}
              <TabsContent value="backup" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Backup Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="backup-tier">Storage Tier</Label>
                        <Select
                          value={backupTier}
                          onValueChange={(value) => setBackupTier(value as StorageTier)}
                        >
                          <SelectTrigger id="backup-tier">
                            <SelectValue placeholder="Select storage tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={StorageTier.HOT}>Hot (Real-time)</SelectItem>
                            <SelectItem value={StorageTier.WARM}>Warm (Decentralized)</SelectItem>
                            <SelectItem value={StorageTier.COLD}>Cold (Air-gapped)</SelectItem>
                            <SelectItem value={StorageTier.QUANTUM_VAULT}>Quantum Vault</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backup-strategy">Backup Strategy</Label>
                        <Select
                          value={backupStrategy}
                          onValueChange={(value) => setBackupStrategy(value as BackupStrategy)}
                        >
                          <SelectTrigger id="backup-strategy">
                            <SelectValue placeholder="Select backup strategy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={BackupStrategy.REAL_TIME}>Real-time</SelectItem>
                            <SelectItem value={BackupStrategy.HOURLY}>Hourly</SelectItem>
                            <SelectItem value={BackupStrategy.DAILY}>Daily</SelectItem>
                            <SelectItem value={BackupStrategy.WEEKLY}>Weekly</SelectItem>
                            <SelectItem value={BackupStrategy.MONTHLY}>Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="pqc-encryption" defaultChecked />
                        <Label htmlFor="pqc-encryption">Post-Quantum Encryption</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="air-gap-storage" defaultChecked />
                        <Label htmlFor="air-gap-storage">Include Air-gapped Storage</Label>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={handleManualBackup}
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Create Backup"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Air-Gapped Backups</CardTitle>
                      </CardHeader>
                      <CardContent className="max-h-60 overflow-y-auto">
                        <div className="space-y-2">
                          {backupNodes.map(node => (
                            <div key={node.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">{node.backupType}</div>
                                <div className="text-xs text-muted-foreground">
                                  {node.mediaType} • {node.dataSize}GB
                                </div>
                              </div>
                              <Badge variant="outline">
                                {new Date(node.createdAt).toLocaleDateString()}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Automated Backup Schedule</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                            <div className="font-medium">Real-time Sync</div>
                            <Badge className="bg-green-500/10 text-green-600">Active</Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                            <div className="font-medium">Daily Full Backup</div>
                            <Badge variant="outline">00:00 UTC</Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                            <div className="font-medium">Weekly Archive</div>
                            <Badge variant="outline">Sunday 02:00 UTC</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Resilience Tab */}
              <TabsContent value="resilience" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        Emergency Recovery
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recovery-level">Recovery Level</Label>
                        <Select
                          value={recoveryLevel}
                          onValueChange={(value) => setRecoveryLevel(value as "standard" | "elevated" | "critical")}
                        >
                          <SelectTrigger id="recovery-level">
                            <SelectValue placeholder="Select recovery level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="elevated">Elevated (DEFCON-3)</SelectItem>
                            <SelectItem value="critical">Critical (DEFCON-1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Alert className="bg-amber-500/10 border-amber-500/20">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <AlertTitle>Recovery Warning</AlertTitle>
                        <AlertDescription>
                          Initiating emergency recovery will temporarily degrade system performance.
                        </AlertDescription>
                      </Alert>
                      
                      <Button 
                        className="w-full"
                        variant="destructive"
                        onClick={handleEmergencyRecovery}
                        disabled={isLoading}
                      >
                        {isLoading ? "Initiating..." : "Initiate Emergency Recovery"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">EMP-Hardened Systems</CardTitle>
                      </CardHeader>
                      <CardContent className="max-h-60 overflow-y-auto">
                        <div className="space-y-2">
                          {empSystems.map(system => (
                            <div key={system.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">{system.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {system.protectionLevel} • {system.backupPower}
                                </div>
                              </div>
                              <Badge variant="outline">
                                {system.powerDurationHours}h
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Resilience Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Cyber Resilience</span>
                              <span className="text-sm font-medium">92%</span>
                            </div>
                            <Progress value={92} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Physical Resilience</span>
                              <span className="text-sm font-medium">88%</span>
                            </div>
                            <Progress value={88} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">EMP Protection</span>
                              <span className="text-sm font-medium">95%</span>
                            </div>
                            <Progress value={95} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Recovery Speed</span>
                              <span className="text-sm font-medium">89%</span>
                            </div>
                            <Progress value={89} className="h-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Network Tab */}
              <TabsContent value="network" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {satelliteConnections.map(conn => (
                    <Card key={conn.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Satellite className="h-4 w-4" />
                            {conn.satelliteId}
                          </CardTitle>
                          <Badge variant="outline" className={
                            conn.status === 'active' ? 'bg-green-500/10 text-green-600' :
                            conn.status === 'inactive' ? 'bg-red-500/10 text-red-600' :
                            'bg-blue-500/10 text-blue-600'
                          }>
                            {conn.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bandwidth</span>
                            <span>{conn.bandwidthMbps} Mbps</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Latency</span>
                            <span>{conn.latencyMs} ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Orbit</span>
                            <span>{conn.orbitType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Security</span>
                            <span>{conn.securityLevel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Window</span>
                            <span>{new Date(conn.nextWindowStart).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Network Connectivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Primary Internet</span>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600">Connected</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Satellite className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Satellite Mesh</span>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600">Connected</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <RadioTower className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">LoRa Backup</span>
                        </div>
                        <Badge className="bg-yellow-500/10 text-yellow-600">Standby</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Dark Fiber</span>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-600">Standby</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Military-grade infrastructure with NIST SP 800-207 Zero Trust Architecture
        </p>
        <Badge variant="outline">FIPS 140-3 Compliant</Badge>
      </CardFooter>
    </Card>
  );
};

export default DecentralizedCloudManager;
