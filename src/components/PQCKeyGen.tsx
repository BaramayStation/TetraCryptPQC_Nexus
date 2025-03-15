
import React, { useState } from "react";
import { generateMLKEMKeypair, generateBIKEKeypair, generateSLHDSAKeypair } from "@/lib/pqcrypto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Shield, Lock } from "lucide-react";
import { GlassContainer } from "@/components/ui/glass-container";
import { useToast } from "@/components/ui/use-toast";

const PQCKeyGen = () => {
  const [keys, setKeys] = useState({ mlkem: null, bike: null, slhdsa: null });
  const [loading, setLoading] = useState({
    mlkem: false,
    bike: false,
    slhdsa: false
  });
  const { toast } = useToast();

  const generateMLKEMKeys = async () => {
    setLoading(prev => ({ ...prev, mlkem: true }));
    try {
      const mlkemKeys = await generateMLKEMKeypair();
      setKeys(prev => ({ ...prev, mlkem: mlkemKeys }));
      toast({
        title: "ML-KEM Keys Generated",
        description: "NIST FIPS 205 compliant post-quantum KEM keys created",
      });
    } catch (error) {
      console.error("Error generating ML-KEM keys:", error);
      toast({
        title: "Key Generation Failed",
        description: "Could not generate ML-KEM keys",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, mlkem: false }));
    }
  };

  const generateBIKEKeys = async () => {
    setLoading(prev => ({ ...prev, bike: true }));
    try {
      const bikeKeys = await generateBIKEKeypair();
      setKeys(prev => ({ ...prev, bike: bikeKeys }));
      toast({
        title: "BIKE Keys Generated",
        description: "NIST Round 4 Alternate post-quantum KEM keys created",
      });
    } catch (error) {
      console.error("Error generating BIKE keys:", error);
      toast({
        title: "Key Generation Failed",
        description: "Could not generate BIKE keys",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, bike: false }));
    }
  };

  const generateSLHDSAKeys = async () => {
    setLoading(prev => ({ ...prev, slhdsa: true }));
    try {
      const slhdsaKeys = await generateSLHDSAKeypair();
      setKeys(prev => ({ ...prev, slhdsa: slhdsaKeys }));
      toast({
        title: "SLH-DSA Keys Generated",
        description: "NIST FIPS 206 compliant post-quantum signature keys created",
      });
    } catch (error) {
      console.error("Error generating SLH-DSA keys:", error);
      toast({
        title: "Key Generation Failed",
        description: "Could not generate SLH-DSA keys",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, slhdsa: false }));
    }
  };

  const generateAllKeys = async () => {
    setLoading({ mlkem: true, bike: true, slhdsa: true });
    try {
      const [mlkemKeys, bikeKeys, slhdsaKeys] = await Promise.all([
        generateMLKEMKeypair(),
        generateBIKEKeypair(),
        generateSLHDSAKeypair(),
      ]);
      
      setKeys({ mlkem: mlkemKeys, bike: bikeKeys, slhdsa: slhdsaKeys });
      
      toast({
        title: "All PQC Keys Generated",
        description: "NIST FIPS 205/206 compliant post-quantum keys created",
      });
    } catch (error) {
      console.error("Error generating keys:", error);
      toast({
        title: "Key Generation Failed",
        description: "Could not generate some keys",
        variant: "destructive",
      });
    } finally {
      setLoading({ mlkem: false, bike: false, slhdsa: false });
    }
  };

  const formatKey = (key: string) => {
    if (!key) return "";
    // Format the key with spaces for better readability
    return key.match(/.{1,8}/g)?.join(" ") || key;
  };

  return (
    <GlassContainer className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Post-Quantum Cryptography Key Generator
          </h2>
          <Button 
            onClick={generateAllKeys} 
            disabled={loading.mlkem || loading.bike || loading.slhdsa}
            className="bg-accent hover:bg-accent/90"
          >
            Generate All PQC Keys
          </Button>
        </div>
        
        <Badge variant="outline" className="self-start">NIST FIPS 205/206 Compliant</Badge>
        
        <Tabs defaultValue="mlkem" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="mlkem">ML-KEM</TabsTrigger>
            <TabsTrigger value="bike">BIKE</TabsTrigger>
            <TabsTrigger value="slhdsa">SLH-DSA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mlkem">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-accent" />
                  ML-KEM Keys
                </CardTitle>
                <CardDescription>
                  Module Lattice-based Key Encapsulation Mechanism (NIST FIPS 205)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {keys.mlkem ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Algorithm</h4>
                      <p className="text-sm">{keys.mlkem.algorithm}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Public Key</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {formatKey(keys.mlkem.publicKey)}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Private Key (protected)</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {formatKey(keys.mlkem.privateKey.substring(0, 16))}...
                      </pre>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{keys.mlkem.strength}</Badge>
                      <Badge variant="outline">{keys.mlkem.standard}</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No ML-KEM keys generated yet.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateMLKEMKeys} 
                  disabled={loading.mlkem}
                  className="w-full"
                >
                  {loading.mlkem ? "Generating..." : "Generate ML-KEM Keys"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="bike">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-accent" />
                  BIKE Keys
                </CardTitle>
                <CardDescription>
                  Bit Flipping Key Encapsulation (NIST Round 4 Alternate)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {keys.bike ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Algorithm</h4>
                      <p className="text-sm">{keys.bike.algorithm}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Public Key</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {formatKey(keys.bike.publicKey)}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Private Key (protected)</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {formatKey(keys.bike.privateKey.substring(0, 16))}...
                      </pre>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{keys.bike.strength}</Badge>
                      <Badge variant="outline">{keys.bike.standard}</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No BIKE keys generated yet.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateBIKEKeys} 
                  disabled={loading.bike}
                  className="w-full"
                >
                  {loading.bike ? "Generating..." : "Generate BIKE Keys"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="slhdsa">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  SLH-DSA Keys
                </CardTitle>
                <CardDescription>
                  Stateless Hash-based Digital Signature Algorithm (NIST FIPS 206)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {keys.slhdsa ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Algorithm</h4>
                      <p className="text-sm">{keys.slhdsa.algorithm}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Public Key</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {formatKey(keys.slhdsa.publicKey)}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Private Key (protected)</h4>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {formatKey(keys.slhdsa.privateKey.substring(0, 16))}...
                      </pre>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{keys.slhdsa.strength}</Badge>
                      <Badge variant="outline">{keys.slhdsa.standard}</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No SLH-DSA keys generated yet.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateSLHDSAKeys} 
                  disabled={loading.slhdsa}
                  className="w-full"
                >
                  {loading.slhdsa ? "Generating..." : "Generate SLH-DSA Keys"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </GlassContainer>
  );
};

export default PQCKeyGen;
