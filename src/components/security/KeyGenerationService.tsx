
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  generateMLKEMKeypair,
  generateSLHDSAKeypair,
  generateFalconKeypair,
  generateBIKEKeypair 
} from "@/lib/pqcrypto";
import { shield } from 'lucide-react';
import { PQCKey } from '@/lib/crypto';
import { toast } from "@/components/ui/use-toast";

const KeyGenerationService: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'ml-kem' | 'slh-dsa' | 'falcon' | 'bike'>('ml-kem');
  const [generatedKey, setGeneratedKey] = useState<PQCKey | null>(null);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    setGeneratedKey(null);
    
    try {
      let keyPair: PQCKey;
      
      switch (selectedAlgorithm) {
        case 'ml-kem':
          keyPair = await generateMLKEMKeypair();
          break;
        case 'slh-dsa':
          keyPair = await generateSLHDSAKeypair();
          break;
        case 'falcon':
          keyPair = await generateFalconKeypair();
          break;
        case 'bike':
          keyPair = await generateBIKEKeypair();
          break;
        default:
          throw new Error('Invalid algorithm selected');
      }
      
      setGeneratedKey(keyPair);
      
      toast({
        title: "PQC Key Generated",
        description: `Successfully generated ${keyPair.algorithm} keypair`,
      });
    } catch (error) {
      console.error('Error generating key:', error);
      toast({
        title: "Key Generation Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d={shield} />
          </svg>
          Post-Quantum Key Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedAlgorithm} 
          onValueChange={(value) => setSelectedAlgorithm(value as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="ml-kem">ML-KEM</TabsTrigger>
            <TabsTrigger value="slh-dsa">SLH-DSA</TabsTrigger>
            <TabsTrigger value="falcon">Falcon</TabsTrigger>
            <TabsTrigger value="bike">BIKE</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ml-kem" className="space-y-4">
            <div>
              <h3 className="font-medium">ML-KEM (Kyber)</h3>
              <p className="text-sm text-muted-foreground">
                NIST FIPS 205 approved lattice-based key encapsulation mechanism.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>FIPS 205</Badge>
                <Badge>256-bit security</Badge>
                <Badge>Lattice-based</Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="slh-dsa" className="space-y-4">
            <div>
              <h3 className="font-medium">SLH-DSA (Dilithium)</h3>
              <p className="text-sm text-muted-foreground">
                NIST FIPS 206 approved lattice-based digital signature algorithm.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>FIPS 206</Badge>
                <Badge>256-bit security</Badge>
                <Badge>Lattice-based</Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="falcon" className="space-y-4">
            <div>
              <h3 className="font-medium">Falcon</h3>
              <p className="text-sm text-muted-foreground">
                Fast-Fourier lattice-based compact signatures.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>NIST Round 4</Badge>
                <Badge>128-bit security</Badge>
                <Badge>Alternate</Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bike" className="space-y-4">
            <div>
              <h3 className="font-medium">BIKE</h3>
              <p className="text-sm text-muted-foreground">
                Bit Flipping Key Encapsulation based on QC-MDPC codes.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>NIST Round 4</Badge>
                <Badge>192-bit security</Badge>
                <Badge>Code-based</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={handleGenerateKey} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate Key Pair"}
        </Button>
      </CardFooter>
      
      {generatedKey && (
        <CardContent className="border-t pt-4 mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Generated Key Details</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Algorithm:</div>
                <div>{generatedKey.algorithm}</div>
                
                <div className="font-medium">Security Strength:</div>
                <div>{generatedKey.strength}</div>
                
                <div className="font-medium">Standard:</div>
                <div>{generatedKey.standard}</div>
                
                <div className="font-medium">Created:</div>
                <div>{new Date(generatedKey.created).toLocaleString()}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Public Key (first 24 chars)</h3>
              <div className="mt-1 p-2 bg-muted rounded font-mono text-xs overflow-hidden text-ellipsis">
                {generatedKey.publicKey.substring(0, 24)}...
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Private Key (first 20 chars)</h3>
              <div className="mt-1 p-2 bg-muted rounded font-mono text-xs overflow-hidden text-ellipsis">
                {generatedKey.privateKey.substring(0, 20)}...
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default KeyGenerationService;
