
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  generateMLKEMKeypair,
  generateSLHDSAKeypair,
  generateFalconKeypair,
  generateBIKEKeypair 
} from "@/lib/pqcrypto";
import { PQCKey } from '@/lib/crypto';
import { toast } from "@/components/ui/use-toast";
import { Shield, Key } from "lucide-react";

// KeyGenerationService Component
const KeyGenerationService: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [algorithm, setAlgorithm] = useState('ml-kem');
  const [generatedKeys, setGeneratedKeys] = useState<PQCKey | null>(null);

  const handleGenerateKeys = async () => {
    setIsGenerating(true);
    try {
      let keyPair: PQCKey;
      
      switch (algorithm) {
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
      
      setGeneratedKeys(keyPair);
      
      toast({
        title: "Keys Generated Successfully",
        description: `Generated ${keyPair.algorithm} key pair with ${keyPair.strength} security level.`,
      });
    } catch (error) {
      console.error("Error generating keys:", error);
      toast({
        title: "Key Generation Failed",
        description: "There was an error generating your keys. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Post-Quantum Key Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Select Algorithm Type</h3>
          <RadioGroup value={algorithm} onValueChange={setAlgorithm} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ml-kem" id="ml-kem" />
              <Label htmlFor="ml-kem" className="flex items-center gap-2">
                <span className="font-medium">ML-KEM (Kyber)</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">FIPS 205</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="slh-dsa" id="slh-dsa" />
              <Label htmlFor="slh-dsa" className="flex items-center gap-2">
                <span className="font-medium">SLH-DSA (Dilithium)</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">FIPS 206</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="falcon" id="falcon" />
              <Label htmlFor="falcon">Falcon (Alternate)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bike" id="bike" />
              <Label htmlFor="bike">BIKE (Alternate)</Label>
            </div>
          </RadioGroup>
        </div>

        <Button 
          onClick={handleGenerateKeys} 
          disabled={isGenerating} 
          className="w-full"
        >
          {isGenerating ? (
            <>Generating Keys...</>
          ) : (
            <>
              <Key className="mr-2 h-4 w-4" />
              Generate Post-Quantum Keys
            </>
          )}
        </Button>

        {generatedKeys && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div>
              <h3 className="text-sm font-medium">Generated Keys Info</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm mt-2">
                <span className="text-muted-foreground">Algorithm:</span>
                <span>{generatedKeys.algorithm}</span>
                <span className="text-muted-foreground">Security Level:</span>
                <span>{generatedKeys.strength}</span>
                <span className="text-muted-foreground">Standard:</span>
                <span>{generatedKeys.standard}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Public Key (truncated)</h3>
              <div className="p-2 bg-muted rounded-md mt-1 font-mono text-xs">
                {generatedKeys.publicKey.substring(0, 40)}...
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Private Key (truncated)</h3>
              <div className="p-2 bg-muted rounded-md mt-1 font-mono text-xs">
                {generatedKeys.privateKey.substring(0, 40)}...
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyGenerationService;
