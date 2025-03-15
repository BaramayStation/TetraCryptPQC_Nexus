
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlassContainer } from "@/components/ui/glass-container";
import {
  Shield,
  Wifi,
  Radio,
  Server,
  Lock,
  RefreshCw,
  AlertTriangle,
  Globe,
  Cpu,
  Monitor,
  Activity,
  Zap,
  Network,
  Signal,
  Database
} from "lucide-react";

import {
  UndergroundCommunicationNode,
  MilitaryMeshNetwork,
  QuantumSecureLink,
  SecurityHealthMetrics,
  EMPHardenedSystem,
  SatelliteConnection,
  DecentralizedStorageNode
} from "@/lib/storage-types";

import {
  initializeUndergroundNetwork,
  checkNetworkHealth,
  createEMPHardenedSystem,
  configureSatelliteUplink,
  initializeDecentralizedStorage
} from "@/lib/underground-comms-network";

const UndergroundNetworkDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [networkStatus, setNetworkStatus] = useState<"operational" | "degraded" | "critical" | "offline">("operational");
  const [nodes, setNodes] = useState<UndergroundCommunicationNode[]>([]);
  const [meshNetwork, setMeshNetwork] = useState<MilitaryMeshNetwork | null>(null);
  const [secureLinks, setSecureLinks] = useState<QuantumSecureLink[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityHealthMetrics | null>(null);
  const [empSystems, setEmpSystems] = useState<EMPHardenedSystem[]>([]);
  const [satellites, setSatellites] = useState<SatelliteConnection[]>([]);
  const [storageNodes, setStorageNodes] = useState<DecentralizedStorageNode[]>([]);
  const [threats, setThreats] = useState<{ severity: string; description: string }[]>([]);

  useEffect(() => {
    initializeNetwork();
  }, []);

  const initializeNetwork = async () => {
    setLoading(true);
    try {
      // Initialize the main network components
      const network = initializeUndergroundNetwork();
      setNodes(network.nodes);
      setMeshNetwork(network.meshNetwork);
      setSecureLinks(network.secureLinks);

      // Initialize additional components
      setEmpSystems([
        createEMPHardenedSystem("Primary EMP Shield"),
        createEMPHardenedSystem("Backup EMP Shield")
      ]);
      setSatellites([
        configureSatelliteUplink("Alpha Uplink", "starshield"),
        configureSatelliteUplink("Bravo Uplink", "classified")
      ]);
      setStorageNodes(initializeDecentralizedStorage());

      // Check network health
      const health = await checkNetworkHealth();
      setNetworkStatus(health.status);
      setSecurityMetrics(health.metrics);
      setThreats(health.threats);
    } catch (error) {
      console.error("Error initializing underground network:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshNetworkStatus = async () => {
    setLoading(true);
    try {
      const health = await checkNetworkHealth();
      setNetworkStatus(health.status);
      setSecurityMetrics(health.metrics);
      setThreats(health.threats);
    } catch (error) {
      console.error("Error refreshing network status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "operational":
      case "online":
      case "active":
      case "connected":
        return "bg-green-500/10 text-green-500";
      case "degraded":
        return "bg-yellow-500/10 text-yellow-500";
      case "critical":
      case "compromised":
        return "bg-red-500/10 text-red-500";
      case "offline":
      case "disconnected":
        return "bg-slate-500/10 text-slate-500";
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  };

  if (loading && !meshNetwork) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Initializing Secure Network</h2>
          <p className="text-muted-foreground mt-2">Establishing quantum-secure connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2 h-6 w-6 text-primary" />
            TetraCryptPQC Underground Network
          </h1>
          <p className="text-muted-foreground">
            Military-grade, post-quantum secure communications infrastructure
          </p>
        </div>
        <Badge className={getStatusBadgeClass(networkStatus)}>
          {networkStatus.toUpperCase()}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nodes">Nodes</TabsTrigger>
          <TabsTrigger value="links">Secure Links</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Network className="mr-2 h-4 w-4" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Classification:</span>
                    <Badge variant="outline">{meshNetwork?.classification.toUpperCase()}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Nodes:</span>
                    <span className="font-medium">{meshNetwork?.nodeCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Latency:</span>
                    <span className="font-medium">{meshNetwork?.communicationLatency || 0} ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PQC Enabled:</span>
                    <Badge variant={meshNetwork?.pqcEnabled ? "default" : "outline"}>
                      {meshNetwork?.pqcEnabled ? "YES" : "NO"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Encryption</span>
                      <span className="text-xs font-medium">
                        {securityMetrics?.securityScore || 0}%
                      </span>
                    </div>
                    <Progress value={securityMetrics?.securityScore || 0} className="h-1" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Quantum Resistance</span>
                      <span className="text-xs font-medium">
                        {securityMetrics?.patchLevel || 0}%
                      </span>
                    </div>
                    <Progress value={securityMetrics?.patchLevel || 0} className="h-1" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Resilience</span>
                      <span className="text-xs font-medium">
                        {meshNetwork?.resilienceScore || 0}%
                      </span>
                    </div>
                    <Progress value={meshNetwork?.resilienceScore || 0} className="h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  Threat Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                {threats.length === 0 ? (
                  <div className="flex items-center justify-center h-20">
                    <p className="text-sm text-muted-foreground">No active threats detected</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {threats.map((threat, index) => (
                      <Alert key={index} variant={threat.severity === "high" ? "destructive" : "default"}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-xs">
                          {threat.severity.toUpperCase()} Severity Threat
                        </AlertTitle>
                        <AlertDescription className="text-xs">{threat.description}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Coverage</CardTitle>
              <CardDescription>
                DUMCN quantum-secure mesh network deployment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <CoverageCard
                  title="Underground"
                  icon={<Server className="h-5 w-5" />}
                  active={meshNetwork?.coverage.underground || false}
                />
                <CoverageCard
                  title="Surface"
                  icon={<Globe className="h-5 w-5" />}
                  active={meshNetwork?.coverage.surface || false}
                />
                <CoverageCard
                  title="Aerial"
                  icon={<Wifi className="h-5 w-5" />}
                  active={meshNetwork?.coverage.aerial || false}
                />
                <CoverageCard
                  title="Maritime"
                  icon={<Activity className="h-5 w-5" />}
                  active={meshNetwork?.coverage.maritime || false}
                />
                <CoverageCard
                  title="Space"
                  icon={<Signal className="h-5 w-5" />}
                  active={meshNetwork?.coverage.space || false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nodes" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((node) => (
              <GlassContainer key={node.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {node.type === "relay" && <Radio className="h-4 w-4 mr-2" />}
                    {node.type === "gateway" && <Globe className="h-4 w-4 mr-2" />}
                    {node.type === "mesh-node" && <Wifi className="h-4 w-4 mr-2" />}
                    {node.type === "backbone" && <Server className="h-4 w-4 mr-2" />}
                    {node.type === "edge" && <Network className="h-4 w-4 mr-2" />}
                    <div>
                      <h3 className="text-sm font-medium">{node.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusBadgeClass(node.status)}>
                    {node.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-xs flex justify-between">
                    <span>Location:</span>
                    <span>{node.location.facility} ({node.location.depth}m)</span>
                  </div>
                  <div className="text-xs flex justify-between">
                    <span>Protocols:</span>
                    <span>{node.communicationProtocols.join(", ")}</span>
                  </div>
                  <div className="text-xs flex justify-between">
                    <span>Bandwidth:</span>
                    <span>{node.supportedBandwidth} Mbps</span>
                  </div>
                  <div className="text-xs flex justify-between">
                    <span>EMP Hardened:</span>
                    <span>{node.empHardened ? "Yes" : "No"}</span>
                  </div>
                  <div className="text-xs flex justify-between">
                    <span>AI Enabled:</span>
                    <span>{node.aiEnabled ? "Yes" : "No"}</span>
                  </div>
                </div>
              </GlassContainer>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secureLinks.map((link) => (
              <Card key={link.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      {link.name}
                    </CardTitle>
                    <Badge className={getStatusBadgeClass(link.status)}>
                      {link.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {link.type.toUpperCase()} Quantum-Secure Link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Endpoints:</span>
                      <span>{link.endpoints.join(" ↔ ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Key Rotation:</span>
                      <span>Every {link.keyRotationInterval} seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Latency:</span>
                      <span>{link.latency} ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verification:</span>
                      <span>{link.verificationMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Backup Links:</span>
                      <span>{link.backupLinks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                EMP-Hardened Systems
              </h3>
              {empSystems.map((system) => (
                <Card key={system.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">{system.name}</CardTitle>
                      <Badge className={getStatusBadgeClass(system.status)}>
                        {system.status.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {system.shieldingLevel.toUpperCase()} Shielding Level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protection Rating:</span>
                        <span>{system.protectionRating.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Backup Power:</span>
                        <span>{system.backupPowerDuration} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recovery Time:</span>
                        <span>{system.recoveryTime} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Tested:</span>
                        <span>{new Date(system.lastTested).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Signal className="mr-2 h-5 w-5" />
                Satellite Uplinks
              </h3>
              {satellites.map((satellite) => (
                <Card key={satellite.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">{satellite.name}</CardTitle>
                      <Badge className={getStatusBadgeClass(satellite.status)}>
                        {satellite.status.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {satellite.provider.toUpperCase()} Provider
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bandwidth Down:</span>
                        <span>{satellite.bandwidthDown} Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bandwidth Up:</span>
                        <span>{satellite.bandwidthUp} Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Latency:</span>
                        <span>{satellite.latency} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Signal Strength:</span>
                        <span>{satellite.signalStrength} dBm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PQC Enabled:</span>
                        <span>{satellite.pqcEnabled ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Metrics</CardTitle>
              <CardDescription>
                Quantum-resistant security metrics for the underground network
              </CardDescription>
            </CardHeader>
            <CardContent>
              {securityMetrics ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard 
                      title="Security Score" 
                      value={securityMetrics.securityScore} 
                      icon={<Shield className="h-5 w-5" />} 
                    />
                    <MetricCard 
                      title="Threat Detection Rate" 
                      value={securityMetrics.threatDetectionRate || 0} 
                      icon={<AlertTriangle className="h-5 w-5" />} 
                    />
                    <MetricCard 
                      title="Active Threats" 
                      value={securityMetrics.activeThreats} 
                      icon={<Activity className="h-5 w-5" />} 
                      suffix="threats"
                      reverse={true}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recommended Actions</h3>
                    {securityMetrics.recommendedActions ? (
                      <ul className="space-y-2">
                        {securityMetrics.recommendedActions.map((action, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-0.5">•</div>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No actions recommended at this time.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p>Loading security metrics...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storageNodes.map((node) => (
              <Card key={node.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm flex items-center">
                      <Database className="mr-2 h-4 w-4" />
                      {node.name}
                    </CardTitle>
                    <Badge className={getStatusBadgeClass(node.status)}>
                      {node.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {node.type.toUpperCase()} Decentralized Storage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Storage Usage</span>
                        <span>{Math.round((node.usedStorage / node.storageCapacity) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(node.usedStorage / node.storageCapacity) * 100} 
                        className="h-1" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{node.storageCapacity} GB</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Used</p>
                        <p className="font-medium">{node.usedStorage} GB</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Replication</p>
                        <p className="font-medium">Factor {node.replicationFactor}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Latency</p>
                        <p className="font-medium">{node.networkLatency} ms</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">PQC Enabled</p>
                        <p className="font-medium">{node.pqcEnabled ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Synced</p>
                        <p className="font-medium">{new Date(node.lastSynced).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={refreshNetworkStatus} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Status
        </Button>
      </div>
    </div>
  );
};

// Helper components
const CoverageCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  active: boolean;
}> = ({ title, icon, active }) => {
  return (
    <div className={`p-4 rounded-lg border ${active ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-muted/20"}`}>
      <div className="flex flex-col items-center text-center">
        <div className={`mb-2 ${active ? "text-primary" : "text-muted-foreground"}`}>{icon}</div>
        <h3 className="text-sm font-medium">{title}</h3>
        <Badge variant={active ? "default" : "outline"} className="mt-2">
          {active ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
  reverse?: boolean;
}> = ({ title, value, icon, suffix = "%", reverse = false }) => {
  // For metrics where lower is better (like active threats), reverse the color scale
  const getColorClass = () => {
    if (reverse) {
      if (value <= 1) return "text-green-500";
      if (value <= 3) return "text-yellow-500";
      return "text-red-500";
    } else {
      if (value >= 90) return "text-green-500";
      if (value >= 70) return "text-yellow-500";
      return "text-red-500";
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="flex items-end space-x-1">
        <span className={`text-2xl font-bold ${getColorClass()}`}>{value}</span>
        <span className="text-xs text-muted-foreground mb-1">{suffix}</span>
      </div>
      {!reverse && (
        <Progress value={value} className="h-1 mt-2" />
      )}
    </div>
  );
};

export default UndergroundNetworkDashboard;
