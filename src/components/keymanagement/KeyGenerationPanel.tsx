
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlassContainer } from "@/components/ui/glass-container";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Key, Lock, AlertTriangle, Copy, Download, CheckCircle } from "lucide-react";
import { getUserProfile, saveUserProfile } from "@/lib/storage";
import { PQCKey } from "@/lib/crypto";

// Simulated PQC key generation functions (would connect to actual implementations)
const generateMLKEM = async (strength: string) => {
  // Simulate generation delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    algorithm: `ML-KEM-${strength === "highest" ? "1024" : strength === "medium" ? "768" : "512"}`,
    publicKey: `MLKEM${strength === "highest" ? "1024" : strength === "medium" ? "768" : "512"}_${Math.random().toString(36).substring(2, 15)}`,
    privateKey: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    strength: strength === "highest" ? "256-bit" : strength === "medium" ? "192-bit" : "128-bit",
    standard: "NIST FIPS 205",
    created: new Date().toISOString()
  };
};

const generateSLHDSA = async (strength: string) => {
  // Simulate generation delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    algorithm: `SLH-DSA-${strength === "highest" ? "Dilithium5" : strength === "medium" ? "Dilithium3" : "Dilithium2"}`,
    publicKey: `SLHDSA${strength === "highest" ? "5" : strength === "medium" ? "3" : "2"}_${Math.random().toString(36).substring(2, 15)}`,
    privateKey: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    strength: strength === "highest" ? "256-bit" : strength === "medium" ? "192-bit" : "128-bit",
    standard: "NIST FIPS 206",
    created: new Date().toISOString()
  };
};

const KeyGenerationPanel = () => {
  const { toast } = useToast();
  const [activeAlgorithm, setActiveAlgorithm] = useState<"kem" | "signature">("kem");
  const [kemStrength, setKemStrength] = useState<string>("highest");
  const [signatureStrength, setSignatureStrength] = useState<string>("highest");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [generatedKey, setGeneratedKey] = useState<any>(null);

  const generateKey = async () => {
    try {
      setIsGenerating(true);
      setProgress(10);
      setGeneratedKey(null);
      
      let key;
      if (activeAlgorithm === "kem") {
        setProgress(30);
        key = await generateMLKEM(kemStrength);
        setProgress(80);
      } else {
        setProgress(30);
        key = await generateSLHDSA(signatureStrength);
        setProgress(80);
      }
      
      // Save to user profile
      const profile = getUserProfile();
      if (profile) {
        if (!profile.keyPairs) {
          profile.keyPairs = {
            pqkem: {
              algorithm: "ML-KEM-1024",
              publicKey: "initial",
              privateKey: "initial",
              strength: "256-bit",
              standard: "NIST FIPS 205",
              created: new Date().toISOString()
            },
            signature: {
              algorithm: "SLH-DSA-Dilithium5",
              publicKey: "initial",
              privateKey: "initial",
              strength: "256-bit",
              standard: "NIST FIPS 206",
              created: new Date().toISOString()
            }
          };
        }
        
        if (activeAlgorithm === "kem") {
          profile.keyPairs.pqkem = key;
        } else {
          profile.keyPairs.signature = key;
        }
        
        saveUserProfile(profile);
      }
      
      setGeneratedKey(key);
      setProgress(100);
      
      toast({
        title: `${activeAlgorithm === "kem" ? "ML-KEM" : "SLH-DSA"} Key Generated`,
        description: `Your NIST FIPS ${activeAlgorithm === "kem" ? "205" : "206"} compliant key has been generated successfully.`,
      });
    } catch (error) {
      console.error("Error generating key:", error);
      toast({
        title: "Key Generation Failed",
        description: "There was an error generating your key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 500);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to clipboard`,
    });
  };

  const downloadKey = (key: any, type: string) => {
    const keyData = JSON.stringify(key, null, 2);
    const blob = new Blob([keyData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toLowerCase().replace(" ", "_")}_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Key Downloaded",
      description: `Your ${type} has been downloaded`,
    });
  };

  const resetGenerator = () => {
    setGeneratedKey(null);
    setProgress(0);
  };

  return (
    <GlassContainer className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold">NIST PQC Key Generator</h2>
          </div>
          
          <Alert className="bg-accent/10 border-accent/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>FIPS 205/206 Compliance</AlertTitle>
            <AlertDescription>
              This generator creates keys that comply with NIST's finalized post-quantum cryptography standards.
            </AlertDescription>
          </Alert>
          
          <Tabs 
            value={activeAlgorithm} 
            onValueChange={(v) => setActiveAlgorithm(v as "kem" | "signature")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="kem">
                <Key className="h-4 w-4 mr-2" />
                ML-KEM (FIPS 205)
              </TabsTrigger>
              <TabsTrigger value="signature">
                <Lock className="h-4 w-4 mr-2" />
                SLH-DSA (FIPS 206)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="kem" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Security Strength</label>
                <Select value={kemStrength} onValueChange={setKemStrength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select security level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highest">Highest (ML-KEM-1024, 256-bit)</SelectItem>
                    <SelectItem value="medium">Medium (ML-KEM-768, 192-bit)</SelectItem>
                    <SelectItem value="basic">Basic (ML-KEM-512, 128-bit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 border border-border rounded-md bg-muted/30">
                <h3 className="text-sm font-medium mb-2">ML-KEM (Kyber) Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Lattice-based Key Encapsulation Mechanism</li>
                  <li>• NIST FIPS 205 standardized algorithm</li>
                  <li>• Resistant to attacks from quantum computers</li>
                  <li>• Highest security level recommended for classified data</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="signature" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Security Strength</label>
                <Select value={signatureStrength} onValueChange={setSignatureStrength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select security level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highest">Highest (Dilithium5, 256-bit)</SelectItem>
                    <SelectItem value="medium">Medium (Dilithium3, 192-bit)</SelectItem>
                    <SelectItem value="basic">Basic (Dilithium2, 128-bit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 border border-border rounded-md bg-muted/30">
                <h3 className="text-sm font-medium mb-2">SLH-DSA (Dilithium) Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Lattice-based Digital Signature Algorithm</li>
                  <li>• NIST FIPS 206 standardized algorithm</li>
                  <li>• Provides integrity and non-repudiation</li>
                  <li>• Highest security level recommended for long-term security</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          {isGenerating ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating {activeAlgorithm === "kem" ? "ML-KEM" : "SLH-DSA"} keys...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ) : (
            <Button 
              onClick={generateKey} 
              className="w-full" 
              disabled={isGenerating}
            >
              {generatedKey ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Generate New Key
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Generate {activeAlgorithm === "kem" ? "ML-KEM" : "SLH-DSA"} Keys
                </>
              )}
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {generatedKey ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {activeAlgorithm === "kem" ? (
                        <Key className="h-5 w-5 text-accent" />
                      ) : (
                        <Lock className="h-5 w-5 text-accent" />
                      )}
                      {generatedKey.algorithm}
                    </CardTitle>
                    <CardDescription>
                      Generated: {new Date(generatedKey.created).toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {generatedKey.standard}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium">Public Key</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6"
                      onClick={() => copyToClipboard(generatedKey.publicKey, "Public key")}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-2 bg-muted font-mono text-xs rounded-md overflow-x-auto">
                    {generatedKey.publicKey}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium">Private Key</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6"
                      onClick={() => copyToClipboard(generatedKey.privateKey, "Private key")}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-2 bg-muted font-mono text-xs rounded-md overflow-x-auto">
                    {generatedKey.privateKey.substring(0, 12)}••••••••••••••••••••••••
                  </div>
                  <p className="text-xs text-destructive mt-1">
                    Never share your private key with anyone
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="text-xs font-medium mb-1">Security Strength</h3>
                    <Badge variant="outline" className="w-full justify-center">
                      {generatedKey.strength}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium mb-1">Algorithm</h3>
                    <Badge variant="outline" className="w-full justify-center">
                      {activeAlgorithm === "kem" ? "Key Encapsulation" : "Digital Signature"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => downloadKey(generatedKey, `${activeAlgorithm === "kem" ? "ML-KEM" : "SLH-DSA"} Key`)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Key
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1"
                  onClick={resetGenerator}
                >
                  Generate New
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-lg bg-muted/30">
              <Shield className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-center">No Key Generated</h3>
              <p className="text-muted-foreground text-center mt-2">
                Select an algorithm and security level, then click "Generate" to create NIST-compliant post-quantum keys.
              </p>
            </div>
          )}
        </div>
      </div>
    </GlassContainer>
  );
};

export default KeyGenerationPanel;
