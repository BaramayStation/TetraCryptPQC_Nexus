
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, Key, Lock, Server, Database, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/lib/storage";
import { HardwareSecurityManager } from "@/components/security/HardwareSecurityManager";
import { StarkNetAuth } from "@/components/security/StarkNetAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

const Security = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserProfile());
  const [securityScore, setSecurityScore] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    
    // Calculate security score
    let score = 0;
    
    // Basic setup: 20 points
    score += 20;
    
    // Hardware security: 20 points
    if (user.hardwareSecurityEnabled) {
      score += 20;
    }
    
    // Advanced auth: 15 points
    if (user.authType === "advanced") {
      score += 15;
    }
    
    // StarkNet: 15 points
    if (user.starkNetAccount) {
      score += 15;
    }
    
    // Key strength: 10 points each
    if (user.keyPairs?.pqkem?.algorithm === "ML-KEM-1024") {
      score += 10;
    }
    if (user.keyPairs?.signature?.algorithm === "SLH-DSA-Dilithium5") {
      score += 10;
    }
    
    // DID verification: 10 points
    if (user.didDocument) {
      score += 10;
    }
    
    setSecurityScore(score);
  }, [user, navigate]);

  const handleStarkNetConnect = (account: any) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      starkNetAccount: {
        address: account.address,
        publicKey: account.publicKey
      }
    };
    
    setUser(updatedUser);
  };

  const handleProofGenerated = (proofData: any) => {
    console.log("zk-STARK proof generated:", proofData);
  };

  const handleKeyGenerated = (keyData: any) => {
    console.log("Hardware-backed key generated:", keyData);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Security Center</h1>
        </div>

        <div className="mb-6">
          <GlassContainer animation="fade-in">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Post-Quantum Security Profile</h2>
                  <p className="text-muted-foreground">
                    Your current security configuration and protection level
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="8"
                        fill="transparent"
                        r="44"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-accent stroke-current"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        r="44"
                        cx="50"
                        cy="50"
                        style={{
                          strokeDasharray: 276,
                          strokeDashoffset: 276 - (securityScore / 100) * 276,
                          transition: "stroke-dashoffset 1s ease-in-out",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{securityScore}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium mt-2">Security Score</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg bg-background/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-accent/10">
                      <Key className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Encryption Level</h3>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs font-normal">
                          {user?.keyPairs?.pqkem?.algorithm || "None"}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-normal">
                          NIST FIPS 205
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg bg-background/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-accent/10">
                      <Shield className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Authentication</h3>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs font-normal">
                          {user?.authType === "advanced" ? "Advanced" : "Standard"}
                        </Badge>
                        {user?.starkNetAccount && (
                          <Badge variant="outline" className="text-xs font-normal">
                            StarkNet
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg bg-background/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-accent/10">
                      <Lock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Hardware Security</h3>
                      <div className="flex items-center gap-1">
                        <Badge 
                          variant={user?.hardwareSecurityEnabled ? "default" : "outline"} 
                          className="text-xs font-normal"
                        >
                          {user?.hardwareSecurityEnabled ? user.hardwareType : "Not Enabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hardware">Hardware Security</TabsTrigger>
            <TabsTrigger value="starknet">StarkNet Auth</TabsTrigger>
            <TabsTrigger value="ipfs">IPFS Storage</TabsTrigger>
            <TabsTrigger value="fhe">Homomorphic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Security Recommendations</CardTitle>
                  <CardDescription>
                    Enhance your post-quantum security with these steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {!user?.hardwareSecurityEnabled && (
                        <div className="flex gap-3 pb-3 border-b">
                          <div className="p-2 h-fit rounded-full bg-amber-100 dark:bg-amber-900/20">
                            <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Enable Hardware Security</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Use a YubiKey or TPM for hardware-protected key storage
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => setActiveTab("hardware")}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {!user?.starkNetAccount && (
                        <div className="flex gap-3 pb-3 border-b">
                          <div className="p-2 h-fit rounded-full bg-amber-100 dark:bg-amber-900/20">
                            <Database className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Connect StarkNet Wallet</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Use zk-STARKs for quantum-resistant identity verification
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => setActiveTab("starknet")}
                            >
                              Connect
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {!user?.securitySettings?.fipsCompliance && (
                        <div className="flex gap-3 pb-3 border-b">
                          <div className="p-2 h-fit rounded-full bg-amber-100 dark:bg-amber-900/20">
                            <FileCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Enable FIPS Compliance</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Strict adherence to NIST FIPS 205/206 standards
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => navigate("/settings")}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {!user?.securitySettings?.hybridEncryption && (
                        <div className="flex gap-3 pb-3 border-b">
                          <div className="p-2 h-fit rounded-full bg-amber-100 dark:bg-amber-900/20">
                            <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Enable Hybrid Encryption</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Combine classical and post-quantum methods for maximum security
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => navigate("/settings")}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-3 pb-3 border-b">
                        <div className="p-2 h-fit rounded-full bg-amber-100 dark:bg-amber-900/20">
                          <Server className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Configure IPFS Storage</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            Decentralized storage for quantum-resistant data backup
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={() => setActiveTab("ipfs")}
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Security Standards</CardTitle>
                  <CardDescription>
                    Post-quantum cryptography compliance status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>NIST FIPS 205 Compliance</span>
                        <span className="font-medium">
                          {user?.keyPairs?.pqkem?.algorithm === "ML-KEM-1024" ? "✓ Compliant" : "Not Compliant"}
                        </span>
                      </div>
                      <Progress 
                        value={user?.keyPairs?.pqkem?.algorithm === "ML-KEM-1024" ? 100 : 30} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>NIST FIPS 206 Compliance</span>
                        <span className="font-medium">
                          {user?.keyPairs?.signature?.algorithm === "SLH-DSA-Dilithium5" ? "✓ Compliant" : "Not Compliant"}
                        </span>
                      </div>
                      <Progress 
                        value={user?.keyPairs?.signature?.algorithm === "SLH-DSA-Dilithium5" ? 100 : 30} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Hardware Security Module</span>
                        <span className="font-medium">
                          {user?.hardwareSecurityEnabled ? "✓ Enabled" : "Not Enabled"}
                        </span>
                      </div>
                      <Progress 
                        value={user?.hardwareSecurityEnabled ? 100 : 0} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>StarkNet zk-STARK Identity</span>
                        <span className="font-medium">
                          {user?.starkNetAccount ? "✓ Connected" : "Not Connected"}
                        </span>
                      </div>
                      <Progress 
                        value={user?.starkNetAccount ? 100 : 0} 
                        className="h-2"
                      />
                    </div>
                    
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>Quantum-Ready Security</AlertTitle>
                      <AlertDescription className="text-xs">
                        TetraCryptPQC implements NIST-standardized post-quantum cryptographic 
                        algorithms designed to withstand attacks from both classical and 
                        quantum computers.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="hardware">
            <HardwareSecurityManager onKeyGenerated={handleKeyGenerated} />
          </TabsContent>
          
          <TabsContent value="starknet">
            <StarkNetAuth 
              onConnect={handleStarkNetConnect} 
              onProofGenerated={handleProofGenerated} 
            />
          </TabsContent>
          
          <TabsContent value="ipfs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-accent" />
                  IPFS & Filecoin Decentralized Storage
                </CardTitle>
                <CardDescription>
                  Securely store encrypted data on decentralized networks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertTitle>IPFS Integration</AlertTitle>
                  <AlertDescription>
                    IPFS integration allows you to store encrypted data in a distributed, 
                    censorship-resistant network. All data is encrypted with post-quantum 
                    algorithms before storage.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2 py-4">
                  <Button className="w-full mb-2">
                    Connect to IPFS Network
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Coming soon - IPFS storage integration
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fhe">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  Fully Homomorphic Encryption
                </CardTitle>
                <CardDescription>
                  Compute on encrypted data without exposing the plaintext
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertTitle>Homomorphic Encryption</AlertTitle>
                  <AlertDescription>
                    Fully Homomorphic Encryption (FHE) allows for computations on encrypted data
                    without decrypting it, preserving privacy while enabling data analysis.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2 py-4">
                  <Button className="w-full mb-2">
                    Enable FHE Features
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Coming soon - Homomorphic encryption features
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;
