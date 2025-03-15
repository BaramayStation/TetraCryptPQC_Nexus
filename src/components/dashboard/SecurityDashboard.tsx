import React, { useState, useEffect } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Key, AlertTriangle, Activity, Clock, FileCheck, Server } from "lucide-react";
import { getUserProfile } from "@/lib/storage";
import { checkIPFSStatus } from "@/lib/web3Storage";
import { Progress } from "@/components/ui/progress";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const securityEvents = [
  { date: "2023-10-01", quantum: 5, classical: 12 },
  { date: "2023-10-02", quantum: 3, classical: 8 },
  { date: "2023-10-03", quantum: 7, classical: 15 },
  { date: "2023-10-04", quantum: 2, classical: 10 },
  { date: "2023-10-05", quantum: 6, classical: 9 },
  { date: "2023-10-06", quantum: 4, classical: 11 },
  { date: "2023-10-07", quantum: 8, classical: 14 },
];

const keyStrengths = [
  { name: "RSA-2048", value: 112, standard: "Classical" },
  { name: "ECC P-256", value: 128, standard: "Classical" },
  { name: "ML-KEM-768", value: 192, standard: "Post-Quantum" },
  { name: "ML-KEM-1024", value: 256, standard: "Post-Quantum" },
  { name: "SLH-DSA", value: 256, standard: "Post-Quantum" },
];

const securityMetricsConfig = {
  quantum: {
    label: "Quantum",
    theme: {
      light: "#0ea5e9",
      dark: "#0ea5e9",
    },
  },
  classical: {
    label: "Classical",
    theme: {
      light: "#94a3b8",
      dark: "#94a3b8",
    },
  },
};

const barColors = {
  "Post-Quantum": "#0ea5e9",
  "Classical": "#94a3b8"
};

const SecurityDashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeKeys, setActiveKeys] = useState<number>(0);
  const [ipfsStatus, setIpfsStatus] = useState<string>("Checking");
  const [securityScore, setSecurityScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const profile = getUserProfile();
        setUserProfile(profile);
        
        const ipfsActive = await checkIPFSStatus();
        setIpfsStatus(ipfsActive ? "Active" : "Offline");
        
        const keyPairs = profile?.keyPairs;
        setActiveKeys(keyPairs ? Object.keys(keyPairs).length : 0);
        
        let score = 0;
        if (profile) {
          score += 20;
          
          if (profile.keyPairs?.pqkem) score += 25;
          if (profile.keyPairs?.signature) score += 25;
          
          if (profile.didDocument) score += 15;
          
          if (profile.hsmInfo) score += 10;
          if (profile.qkdInfo) score += 5;
        }
        setSecurityScore(score);
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            Enterprise Security Dashboard
          </h1>
          <p className="text-muted-foreground">
            Post-quantum cryptographic security monitoring and management
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileCheck className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Security Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{securityScore}%</div>
              <Badge variant={securityScore > 80 ? "default" : "outline"} className="bg-accent">
                {securityScore > 80 ? "Strong" : "Needs Improvement"}
              </Badge>
            </div>
            <Progress value={securityScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{activeKeys}</div>
              <Key className="h-4 w-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {activeKeys > 0 ? "Post-quantum keys active" : "No keys generated"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Identity Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {userProfile?.didDocument ? "Verified" : "Unverified"}
              </div>
              <Badge variant={userProfile?.didDocument ? "default" : "outline"} className={userProfile?.didDocument ? "bg-green-500" : ""}>
                {userProfile?.didDocument ? "DID Active" : "No DID"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {userProfile?.didDocument ? "Decentralized identity verified" : "DID not configured"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{ipfsStatus}</div>
              <Server className="h-4 w-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {ipfsStatus === "Active" ? "Decentralized storage online" : "Storage issue detected"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keys">Cryptographic Keys</TabsTrigger>
          <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GlassContainer className="p-4">
              <h3 className="text-lg font-semibold mb-4">Security Events (Classical vs Quantum)</h3>
              <div className="h-80">
                <ChartContainer config={securityMetricsConfig}>
                  <LineChart
                    data={securityEvents}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="quantum"
                      stroke="var(--color-quantum)"
                      strokeWidth={2}
                      dot={false}
                      name="Quantum Threats"
                    />
                    <Line
                      type="monotone"
                      dataKey="classical"
                      stroke="var(--color-classical)"
                      strokeWidth={2}
                      dot={false}
                      name="Classical Threats"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </GlassContainer>

            <GlassContainer className="p-4">
              <h3 className="text-lg font-semibold mb-4">Cryptographic Strength Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={keyStrengths}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Security Bits', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      fill="#0ea5e9"
                      name="Security Bits"
                    >
                      {keyStrengths.map((entry, index) => (
                        <rect
                          key={`rect-${index}`}
                          x={0}
                          y={0}
                          width={0}
                          height={0}
                          fill={entry.standard === "Post-Quantum" ? "#0ea5e9" : "#94a3b8"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassContainer>
          </div>

          <GlassContainer className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Enterprise Security Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Post-Quantum Readiness</span>
                  <Badge variant={userProfile?.keyPairs?.pqkem ? "default" : "outline"} className="bg-accent">
                    {userProfile?.keyPairs?.pqkem ? "Ready" : "Not Ready"}
                  </Badge>
                </div>
                <Progress value={userProfile?.keyPairs?.pqkem ? 100 : 0} className="h-2" />
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium">Zero-Trust Authentication</span>
                  <Badge variant={userProfile?.didDocument ? "default" : "outline"} className="bg-accent">
                    {userProfile?.didDocument ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Progress value={userProfile?.didDocument ? 100 : 0} className="h-2" />
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium">Secure Data Storage</span>
                  <Badge variant={ipfsStatus === "Active" ? "default" : "outline"} className="bg-accent">
                    {ipfsStatus === "Active" ? "Online" : "Offline"}
                  </Badge>
                </div>
                <Progress value={ipfsStatus === "Active" ? 100 : 0} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Hardware Security Module</span>
                  <Badge variant={userProfile?.hsmInfo ? "default" : "outline"} className="bg-accent">
                    {userProfile?.hsmInfo ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
                <Progress value={userProfile?.hsmInfo ? 100 : 0} className="h-2" />
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium">Quantum Key Distribution</span>
                  <Badge variant={userProfile?.qkdInfo ? "default" : "outline"} className="bg-accent">
                    {userProfile?.qkdInfo ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <Progress value={userProfile?.qkdInfo ? 100 : 0} className="h-2" />
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium">FIPS 205/206 Compliance</span>
                  <Badge variant={userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature ? "default" : "outline"} className="bg-accent">
                    {userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature ? "Compliant" : "Non-Compliant"}
                  </Badge>
                </div>
                <Progress value={userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature ? 100 : 0} className="h-2" />
              </div>
            </div>
            
            <div className="mt-4 bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Security Recommendations</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    {!userProfile?.keyPairs?.pqkem && <li>• Generate ML-KEM post-quantum encryption keys</li>}
                    {!userProfile?.keyPairs?.signature && <li>• Generate SLH-DSA post-quantum signature keys</li>}
                    {!userProfile?.didDocument && <li>• Set up decentralized identity verification</li>}
                    {!userProfile?.hsmInfo && <li>• Connect to a hardware security module (HSM)</li>}
                    {!userProfile?.qkdInfo && <li>• Enable quantum key distribution (QKD)</li>}
                    {ipfsStatus !== "Active" && <li>• Resolve decentralized storage connectivity issues</li>}
                    {(userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature && 
                      userProfile?.didDocument && userProfile?.hsmInfo && 
                      userProfile?.qkdInfo && ipfsStatus === "Active") && 
                      <li>• All security measures are currently in place</li>}
                  </ul>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <GlassContainer className="p-4">
            <h3 className="text-lg font-semibold mb-4">Cryptographic Key Management</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium flex items-center">
                  <Key className="h-4 w-4 mr-2 text-accent" />
                  Key Encapsulation Mechanism (KEM)
                </h4>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Algorithm</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Strength</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Compliance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">ML-KEM-1024</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge variant={userProfile?.keyPairs?.pqkem ? "default" : "outline"} className={userProfile?.keyPairs?.pqkem ? "bg-green-500" : ""}>
                            {userProfile?.keyPairs?.pqkem ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">256-bit (Quantum Secure)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">NIST FIPS 205</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm" disabled={!userProfile?.keyPairs?.pqkem}>
                            {userProfile?.keyPairs?.pqkem ? "Rotate Key" : "Generate Key"}
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">BIKE-L3</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge variant={userProfile?.keyPairs?.bike ? "default" : "outline"} className={userProfile?.keyPairs?.bike ? "bg-green-500" : ""}>
                            {userProfile?.keyPairs?.bike ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">192-bit (Quantum Secure)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">NIST Round 4 Alternate</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm" disabled={!userProfile?.keyPairs?.bike}>
                            {userProfile?.keyPairs?.bike ? "Rotate Key" : "Generate Key"}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-accent" />
                  Digital Signature Algorithm (DSA)
                </h4>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Algorithm</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Strength</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Compliance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">SLH-DSA-Dilithium5</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge variant={userProfile?.keyPairs?.signature ? "default" : "outline"} className={userProfile?.keyPairs?.signature ? "bg-green-500" : ""}>
                            {userProfile?.keyPairs?.signature ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">256-bit (Quantum Secure)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">NIST FIPS 206</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm" disabled={!userProfile?.keyPairs?.signature}>
                            {userProfile?.keyPairs?.signature ? "Rotate Key" : "Generate Key"}
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">Falcon-512</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge variant={userProfile?.keyPairs?.falcon ? "default" : "outline"} className={userProfile?.keyPairs?.falcon ? "bg-green-500" : ""}>
                            {userProfile?.keyPairs?.falcon ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">128-bit (Quantum Secure)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">NIST Round 4 Alternate</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm" disabled={!userProfile?.keyPairs?.falcon}>
                            {userProfile?.keyPairs?.falcon ? "Rotate Key" : "Generate Key"}
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <GlassContainer className="p-4">
            <h3 className="text-lg font-semibold mb-4">Quantum Threat Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-yellow-500/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Quantum Computing Timeline</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current estimates suggest that quantum computers capable of breaking RSA-2048 
                    and ECC P-256 may be available as early as 2030. NIST PQC standardization is 
                    complete, and migration to quantum-resistant algorithms should be prioritized.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Classical Cryptography Risks</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>RSA and ECC vulnerable to Shor's Algorithm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>AES-128 vulnerable to Grover's Algorithm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>SHA-256 reduced security margin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>"Harvest now, decrypt later" attacks</span>
                    </li>
                  </ul>
                </div>

                <div className="border p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Post-Quantum Solutions</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="h-4 px-1 text-xs bg-green-500/20">
                        ML-KEM
                      </Badge>
                      <span>Module Lattice-based Key Encapsulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="h-4 px-1 text-xs bg-green-500/20">
                        SLH-DSA
                      </Badge>
                      <span>Stateless Hash-based Digital Signatures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="h-4 px-1 text-xs bg-green-500/20">
                        AES-256
                      </Badge>
                      <span>Symmetric encryption resistant to Grover's</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="h-4 px-1 text-xs bg-green-500/20">
                        SHA-384
                      </Badge>
                      <span>Quantum-resistant hash functions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <GlassContainer className="p-4">
            <h3 className="text-lg font-semibold mb-4">Regulatory Compliance Status</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Current Standards</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">NIST FIPS 205 (KEM)</span>
                      <Badge variant={userProfile?.keyPairs?.pqkem ? "default" : "outline"} className={userProfile?.keyPairs?.pqkem ? "bg-green-500" : ""}>
                        {userProfile?.keyPairs?.pqkem ? "Compliant" : "Non-Compliant"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">NIST FIPS 206 (Signatures)</span>
                      <Badge variant={userProfile?.keyPairs?.signature ? "default" : "outline"} className={userProfile?.keyPairs?.signature ? "bg-green-500" : ""}>
                        {userProfile?.keyPairs?.signature ? "Compliant" : "Non-Compliant"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">FIPS 140-3</span>
                      <Badge variant={userProfile?.hsmInfo ? "default" : "outline"} className={userProfile?.hsmInfo ? "bg-green-500" : ""}>
                        {userProfile?.hsmInfo ? "Compliant" : "Non-Compliant"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">OMB Memo M-23-02</span>
                      <Badge variant="outline" className="bg-yellow-500">In Progress</Badge>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Future Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">NSA CNSA 2.0</span>
                      <Badge variant={userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature ? "default" : "outline"} className={userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature ? "bg-green-500" : ""}>
                        {userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature ? "Ready" : "Not Ready"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">EU NIS2 Directive</span>
                      <Badge variant="outline" className="bg-yellow-500">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ISO/IEC 27001:2022</span>
                      <Badge variant={userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature && userProfile?.didDocument ? "default" : "outline"} className={userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature && userProfile?.didDocument ? "bg-green-500" : ""}>
                        {userProfile?.keyPairs?.pqkem && userProfile?.keyPairs?.signature && userProfile?.didDocument ? "Ready" : "Not Ready"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GDPR (Art. 32)</span>
                      <Badge variant={userProfile?.keyPairs?.pqkem ? "default" : "outline"} className={userProfile?.keyPairs?.pqkem ? "bg-green-500" : ""}>
                        {userProfile?.keyPairs?.pqkem ? "Ready" : "Not Ready"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold">Compliance Timeline</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li><strong>2023:</strong> NIST PQC Standards finalized (FIPS 205, FIPS 206)</li>
                      <li><strong>2024-2025:</strong> Federal agencies begin post-quantum migrations</li>
                      <li><strong>2025-2027:</strong> Industry-wide adoption expected for critical sectors</li>
                      <li><strong>2030:</strong> Anticipated deadline for full post-quantum compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
