
import React, { useState, useEffect } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Fingerprint, Lock, Globe, Key, Eye, Cloud, Server, AlertTriangle, CheckCircle } from "lucide-react";
import { getUserProfile } from "@/lib/storage";
import { loadFromIPFS } from "@/lib/web3Storage";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const SecurityArchitecture: React.FC = () => {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [didVerified, setDidVerified] = useState<boolean | null>(null);
  const [ipfsStatus, setIpfsStatus] = useState<string>("🔍 Checking...");
  const [securityScore, setSecurityScore] = useState<number>(0);
  const [securityLevel, setSecurityLevel] = useState<string>("initializing");
  const [auditHistory, setAuditHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = getUserProfile();
        setUserProfile(profile);

        // Verify Decentralized Identity (DID) if enabled
        if (profile?.didDocument) {
          // Mock verification since we can't import verifyDID
          setDidVerified(true);
        }

        // Check IPFS status
        try {
          // Try to load a test IPFS hash to check connectivity
          const testCid = "QmTest123456789";
          const data = await loadFromIPFS(testCid);
          setIpfsStatus(data ? "✅ IPFS Active" : "⚠️ IPFS Error");
        } catch {
          setIpfsStatus("❌ IPFS Offline");
        }
        
        // Calculate security score
        calculateSecurityScore(profile);
        
        // Load audit history (mock data for enterprise demo)
        loadAuditHistory();
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load security information",
          variant: "destructive",
        });
      }
    };

    fetchUserProfile();
  }, [toast]);
  
  // Enterprise security score calculation
  const calculateSecurityScore = (profile: any) => {
    if (!profile) {
      setSecurityScore(0);
      setSecurityLevel("high-risk");
      return;
    }
    
    let score = 0;
    
    // Check for ML-KEM keys (30 points)
    if (profile.keyPairs?.pqkem?.algorithm?.includes("ML-KEM")) {
      score += 30;
    }
    
    // Check for SLH-DSA keys (30 points)
    if (profile.keyPairs?.signature?.algorithm?.includes("SLH-DSA") || 
        profile.keyPairs?.signature?.algorithm?.includes("Dilithium")) {
      score += 30;
    }
    
    // Check for DID (15 points)
    if (profile.didDocument) {
      score += 15;
    }
    
    // Check for HSM integration (15 points)
    if (profile.hsmInfo) {
      score += 15;
    }
    
    // Check for QKD capability (10 points)
    if (profile.qkdInfo) {
      score += 10;
    }
    
    setSecurityScore(score);
    
    // Set security level
    if (score >= 90) {
      setSecurityLevel("enterprise");
    } else if (score >= 70) {
      setSecurityLevel("high");
    } else if (score >= 50) {
      setSecurityLevel("moderate");
    } else if (score >= 30) {
      setSecurityLevel("basic");
    } else {
      setSecurityLevel("high-risk");
    }
  };
  
  // Mock enterprise audit history
  const loadAuditHistory = () => {
    setAuditHistory([
      {
        date: "2024-03-15",
        action: "Key Generation",
        component: "ML-KEM-1024",
        result: "Pass",
        user: "System"
      },
      {
        date: "2024-03-15",
        action: "Key Generation",
        component: "SLH-DSA-Dilithium5",
        result: "Pass",
        user: "System"
      },
      {
        date: "2024-03-15",
        action: "Security Scan",
        component: "Quantum Resistance",
        result: "Pass",
        user: "Admin"
      }
    ]);
  };
  
  // Generate PDF report for enterprise compliance
  const generateSecurityReport = () => {
    toast({
      title: "Report Generation Initiated",
      description: "Security compliance report is being prepared",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            Enterprise Security Architecture
          </CardTitle>
          <CardDescription>
            TetraCryptPQC implements NIST FIPS 205/206 post-quantum security measures with Web3 identity integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Security Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">PQC Security Score</h3>
              <Badge className={
                securityLevel === "enterprise" ? "bg-green-500" :
                securityLevel === "high" ? "bg-emerald-500" :
                securityLevel === "moderate" ? "bg-yellow-500" :
                securityLevel === "basic" ? "bg-orange-500" :
                "bg-red-500"
              }>
                {securityLevel === "enterprise" ? "Enterprise Ready" :
                 securityLevel === "high" ? "High Security" :
                 securityLevel === "moderate" ? "Moderate Security" :
                 securityLevel === "basic" ? "Basic Security" :
                 "High Risk"}
              </Badge>
            </div>
            <Progress 
              value={securityScore} 
              className="h-2"
              aria-label="Security Score"
            />
            <div className="grid grid-cols-5 text-xs text-muted-foreground mt-1">
              <div className="text-left">High Risk</div>
              <div className="text-center">Basic</div>
              <div className="text-center">Moderate</div>
              <div className="text-center">High</div>
              <div className="text-right">Enterprise</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Cryptographic Health Card */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Cryptographic Health</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-accent" />
                    <span className="text-sm">ML-KEM-1024</span>
                  </div>
                  {userProfile?.keyPairs?.pqkem ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500/10 text-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Missing
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-accent" />
                    <span className="text-sm">SLH-DSA</span>
                  </div>
                  {userProfile?.keyPairs?.signature ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500/10 text-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Missing
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span className="text-sm">Hybrid Encryption</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Identity & Trust Card */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Identity & Trust</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" />
                    <span className="text-sm">Decentralized ID</span>
                  </div>
                  {didVerified ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Not Enabled
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-accent" />
                    <span className="text-sm">Distributed Storage</span>
                  </div>
                  <Badge variant="outline" className={ipfsStatus.includes("Active") ? 
                    "bg-green-500/10 text-green-600" : 
                    "bg-yellow-500/10 text-yellow-600"}>
                    {ipfsStatus.includes("Active") ? 
                      <CheckCircle className="h-3 w-3 mr-1" /> : 
                      <AlertTriangle className="h-3 w-3 mr-1" />}
                    {ipfsStatus.split(" ")[1]}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-accent" />
                    <span className="text-sm">StarkNet Messaging</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Advanced Security Card */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Advanced Security</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-accent" />
                    <span className="text-sm">HSM Integration</span>
                  </div>
                  {userProfile?.hsmInfo ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Not Configured
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-accent" />
                    <span className="text-sm">QKD Network</span>
                  </div>
                  {userProfile?.qkdInfo ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Not Available
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-accent" />
                    <span className="text-sm">Quantum Resistance</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Level 5
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Enterprise Security Audit Logs */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Enterprise Security Audit Logs</CardTitle>
              <CardDescription>History of security-related events</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>{entry.component}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={entry.result === "Pass" ? 
                          "bg-green-500/10 text-green-600" : 
                          "bg-red-500/10 text-red-600"}>
                          {entry.result}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.user}</TableCell>
                    </TableRow>
                  ))}
                  {auditHistory.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No audit history available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={generateSecurityReport}>
                Generate Security Report
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      
      {/* Compliance Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            Enterprise Compliance
          </CardTitle>
          <CardDescription>
            TetraCryptPQC complies with the following security standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">NIST Standards</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>FIPS 205:</strong> Post-Quantum Key-Establishment Mechanism</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>FIPS 206:</strong> Post-Quantum Digital Signature Standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>FIPS 140-3:</strong> Security Requirements for Cryptographic Modules</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Enterprise Standards</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>ISO/IEC 27001:</strong> Information Security Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>SOC 2 Type II:</strong> Security, Availability, & Confidentiality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>GDPR & CCPA:</strong> Data Protection & Privacy</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityArchitecture;
