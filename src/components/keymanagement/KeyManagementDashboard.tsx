
import React, { useState } from "react";
import { Shield, Key, Upload, Download, Copy, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const KeyManagementDashboard: React.FC = () => {
  const { toast } = useToast();
  const [selectedKeyType, setSelectedKeyType] = useState<string>("ml-kem");
  const [keyGenerating, setKeyGenerating] = useState<boolean>(false);
  const [keyProgress, setKeyProgress] = useState<number>(0);
  const [keyData, setKeyData] = useState<{[key: string]: {publicKey: string, privateKey: string}}>({
    "ml-kem": {
      publicKey: "",
      privateKey: ""
    },
    "slh-dsa": {
      publicKey: "",
      privateKey: ""
    },
    "bike": {
      publicKey: "",
      privateKey: ""
    },
    "falcon": {
      publicKey: "",
      privateKey: ""
    }
  });

  const generateKey = (keyType: string) => {
    setKeyGenerating(true);
    setKeyProgress(0);
    
    // Simulate key generation progress
    const interval = setInterval(() => {
      setKeyProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 15);
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Mock generated keys with different formats based on type
          const mockKeys = {
            "ml-kem": {
              publicKey: "ML-KEM-1024-PUB-" + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
              privateKey: "ML-KEM-1024-PRV-" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            },
            "slh-dsa": {
              publicKey: "SLH-DSA-DILITHIUM5-PUB-" + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
              privateKey: "SLH-DSA-DILITHIUM5-PRV-" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            },
            "bike": {
              publicKey: "BIKE-L3-PUB-" + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
              privateKey: "BIKE-L3-PRV-" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            },
            "falcon": {
              publicKey: "FALCON-512-PUB-" + Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
              privateKey: "FALCON-512-PRV-" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            }
          };
          
          setKeyData(prev => ({
            ...prev,
            [keyType]: mockKeys[keyType as keyof typeof mockKeys]
          }));
          
          setKeyGenerating(false);
          
          toast({
            title: "Key Generated Successfully",
            description: `Your ${getKeyTypeName(keyType)} keys have been generated.`,
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const getKeyTypeName = (keyType: string): string => {
    switch (keyType) {
      case "ml-kem": return "ML-KEM (Key Encapsulation)";
      case "slh-dsa": return "SLH-DSA (Digital Signature)";
      case "bike": return "BIKE (Key Encapsulation)";
      case "falcon": return "Falcon (Digital Signature)";
      default: return keyType;
    }
  };

  const copyToClipboard = (text: string, keyPart: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${keyPart} has been copied to your clipboard.`,
    });
  };

  const downloadKey = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Key Downloaded",
      description: `Your key has been downloaded as ${filename}`,
    });
  };

  const importKey = (e: React.ChangeEvent<HTMLInputElement>, keyType: string, isPublic: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      
      setKeyData(prev => ({
        ...prev,
        [keyType]: {
          ...prev[keyType],
          [isPublic ? "publicKey" : "privateKey"]: content
        }
      }));
      
      toast({
        title: "Key Imported",
        description: `Your ${isPublic ? "public" : "private"} key has been imported successfully.`,
      });
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Key className="h-8 w-8 text-accent" />
            Post-Quantum Key Management
          </h1>
          <p className="text-muted-foreground">
            Generate, manage, and secure your quantum-resistant cryptographic keys
          </p>
        </div>
      </div>

      <Tabs defaultValue="key-management" className="space-y-4">
        <TabsList>
          <TabsTrigger value="key-management">Key Management</TabsTrigger>
          <TabsTrigger value="key-details">Security Details</TabsTrigger>
          <TabsTrigger value="hsm-integration">HSM Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="key-management" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className={`cursor-pointer border-2 ${selectedKeyType === "ml-kem" ? "border-accent" : "border-transparent"}`} onClick={() => setSelectedKeyType("ml-kem")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  ML-KEM
                  <Badge className="bg-accent">NIST</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Module Lattice-based Key Encapsulation</p>
                <Badge variant="outline" className="mt-2">FIPS 205</Badge>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer border-2 ${selectedKeyType === "slh-dsa" ? "border-accent" : "border-transparent"}`} onClick={() => setSelectedKeyType("slh-dsa")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  SLH-DSA
                  <Badge className="bg-accent">NIST</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Stateless Hash-based Digital Signature</p>
                <Badge variant="outline" className="mt-2">FIPS 206</Badge>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer border-2 ${selectedKeyType === "bike" ? "border-accent" : "border-transparent"}`} onClick={() => setSelectedKeyType("bike")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  BIKE
                  <Badge variant="outline">Alt</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Bit Flipping Key Encapsulation</p>
                <Badge variant="outline" className="mt-2">Round 4</Badge>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer border-2 ${selectedKeyType === "falcon" ? "border-accent" : "border-transparent"}`} onClick={() => setSelectedKeyType("falcon")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Falcon
                  <Badge variant="outline">Alt</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Fast-Fourier Lattice-based Compact Signatures</p>
                <Badge variant="outline" className="mt-2">Round 4</Badge>
              </CardContent>
            </Card>
          </div>

          <GlassContainer className="p-6">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-xl font-bold">{getKeyTypeName(selectedKeyType)}</h2>
                  <p className="text-sm text-muted-foreground">Manage your cryptographic keys for quantum-resistant security</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button 
                    onClick={() => generateKey(selectedKeyType)} 
                    disabled={keyGenerating}
                    className="bg-accent"
                  >
                    {keyGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        Generate New Key Pair
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {keyGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating {getKeyTypeName(selectedKeyType)}</span>
                    <span>{keyProgress}%</span>
                  </div>
                  <Progress value={keyProgress} className="h-2" />
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold">Public Key</h3>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(keyData[selectedKeyType].publicKey, "Public Key")}
                        disabled={!keyData[selectedKeyType].publicKey}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadKey(keyData[selectedKeyType].publicKey, `${selectedKeyType}-public.key`)}
                        disabled={!keyData[selectedKeyType].publicKey}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <Textarea 
                    className="h-48 font-mono text-xs"
                    placeholder="Public key will appear here when generated"
                    value={keyData[selectedKeyType].publicKey}
                    readOnly
                  />
                  
                  <div>
                    <Input
                      type="file"
                      id="import-public-key"
                      className="hidden"
                      accept=".key,.pem,.pub"
                      onChange={(e) => importKey(e, selectedKeyType, true)}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => document.getElementById("import-public-key")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Public Key
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold flex items-center">
                      Private Key
                      <Badge className="ml-2 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Sensitive</Badge>
                    </h3>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(keyData[selectedKeyType].privateKey, "Private Key")}
                        disabled={!keyData[selectedKeyType].privateKey}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadKey(keyData[selectedKeyType].privateKey, `${selectedKeyType}-private.key`)}
                        disabled={!keyData[selectedKeyType].privateKey}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <Textarea 
                    className="h-48 font-mono text-xs"
                    placeholder="Private key will appear here when generated"
                    value={keyData[selectedKeyType].privateKey}
                    readOnly
                  />
                  
                  <div>
                    <Input
                      type="file"
                      id="import-private-key"
                      className="hidden"
                      accept=".key,.pem"
                      onChange={(e) => importKey(e, selectedKeyType, false)}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => document.getElementById("import-private-key")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Private Key
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Security Recommendations</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Store private keys in a secure hardware security module (HSM)</li>
                      <li>• Rotate keys regularly according to your security policy</li>
                      <li>• Maintain offline backups of critical keys</li>
                      <li>• Use different key pairs for different applications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="key-details" className="space-y-4">
          <GlassContainer className="p-6">
            <h2 className="text-xl font-bold mb-4">Post-Quantum Algorithm Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-semibold mb-2">ML-KEM (Module Lattice-based Key Encapsulation)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  ML-KEM, formerly known as Kyber, is a key encapsulation mechanism based on the hardness of 
                  module lattice problems. It's standardized in NIST FIPS 205 and provides quantum-resistant key exchange.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">ML-KEM-512</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Security Level: AES-128 equivalent</p>
                      <p className="text-xs text-muted-foreground">Public Key: 800 bytes</p>
                      <p className="text-xs text-muted-foreground">Ciphertext: 768 bytes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">ML-KEM-768</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Security Level: AES-192 equivalent</p>
                      <p className="text-xs text-muted-foreground">Public Key: 1,184 bytes</p>
                      <p className="text-xs text-muted-foreground">Ciphertext: 1,088 bytes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">ML-KEM-1024</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Security Level: AES-256 equivalent</p>
                      <p className="text-xs text-muted-foreground">Public Key: 1,568 bytes</p>
                      <p className="text-xs text-muted-foreground">Ciphertext: 1,568 bytes</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-md font-semibold mb-2">SLH-DSA (Stateless Hash-based Digital Signature)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  SLH-DSA, formerly known as CRYSTALS-Dilithium, is a digital signature algorithm based on the hardness
                  of lattice problems. It's standardized in NIST FIPS 206 and provides quantum-resistant digital signatures.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">SLH-DSA-Dilithium2</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Security Level: AES-128 equivalent</p>
                      <p className="text-xs text-muted-foreground">Public Key: 1,312 bytes</p>
                      <p className="text-xs text-muted-foreground">Signature: 2,420 bytes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">SLH-DSA-Dilithium3</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Security Level: AES-192 equivalent</p>
                      <p className="text-xs text-muted-foreground">Public Key: 1,952 bytes</p>
                      <p className="text-xs text-muted-foreground">Signature: 3,293 bytes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">SLH-DSA-Dilithium5</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Security Level: AES-256 equivalent</p>
                      <p className="text-xs text-muted-foreground">Public Key: 2,592 bytes</p>
                      <p className="text-xs text-muted-foreground">Signature: 4,595 bytes</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="hsm-integration" className="space-y-4">
          <GlassContainer className="p-6">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              <div>
                <h2 className="text-xl font-bold">Hardware Security Module Integration</h2>
                <p className="text-sm text-muted-foreground">Coming soon: Integration with trusted HSM platforms for secure key storage</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Cloud HSM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Secure key storage and operations in cloud HSM services with FIPS 140-3 compliance.
                  </p>
                  <Badge variant="outline">Coming Soon</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">On-Premise HSM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Integration with dedicated hardware security modules for enterprise deployments.
                  </p>
                  <Badge variant="outline">Coming Soon</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Secure Enclaves</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Leverage trusted execution environments like Intel SGX and ARM TrustZone.
                  </p>
                  <Badge variant="outline">Coming Soon</Badge>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">HSM Benefits</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Physical protection of cryptographic keys</li>
                    <li>• FIPS 140-3 certified secure operations</li>
                    <li>• Tamper-resistant hardware</li>
                    <li>• Accelerated cryptographic operations</li>
                    <li>• Audit logging and compliance features</li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KeyManagementDashboard;
