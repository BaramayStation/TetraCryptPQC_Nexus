
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Shield, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getUserProfile, saveUserProfile } from "@/lib/storage";

const KeyRotationPanel = () => {
  const { toast } = useToast();
  const [isRotating, setIsRotating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotatedKey, setRotatedKey] = useState<string | null>(null);
  
  const profile = getUserProfile();
  const kemKey = profile?.keyPairs?.pqkem;
  const signatureKey = profile?.keyPairs?.signature;
  
  // Calculate days since creation for each key
  const calculateDaysSinceCreation = (dateString?: string) => {
    if (!dateString) return 0;
    
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const kemKeyAge = calculateDaysSinceCreation(kemKey?.created);
  const signatureKeyAge = calculateDaysSinceCreation(signatureKey?.created);
  
  // Determine if rotation is needed (over 90 days)
  const kemNeedsRotation = kemKeyAge > 90;
  const signatureNeedsRotation = signatureKeyAge > 90;
  
  const rotateKEMKey = async () => {
    setIsRotating(true);
    setProgress(0);
    setRotatedKey(null);
    
    try {
      // Simulate key rotation process
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(20);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(40);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(60);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(80);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(100);
      
      // Create new key with current date
      if (profile && profile.keyPairs && profile.keyPairs.pqkem) {
        const newKey = {
          ...profile.keyPairs.pqkem,
          publicKey: `MLKEM1024_${Math.random().toString(36).substring(2, 15)}`,
          privateKey: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
          created: new Date().toISOString()
        };
        
        profile.keyPairs.pqkem = newKey;
        saveUserProfile(profile);
        setRotatedKey("ML-KEM");
        
        toast({
          title: "ML-KEM Key Rotated Successfully",
          description: "Your new key has been generated and is now active.",
        });
      }
    } catch (error) {
      console.error("Error rotating key:", error);
      toast({
        title: "Key Rotation Failed",
        description: "There was an error rotating your key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsRotating(false);
      }, 500);
    }
  };
  
  const rotateSignatureKey = async () => {
    setIsRotating(true);
    setProgress(0);
    setRotatedKey(null);
    
    try {
      // Simulate key rotation process
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(20);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(40);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(60);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(80);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(100);
      
      // Create new key with current date
      if (profile && profile.keyPairs && profile.keyPairs.signature) {
        const newKey = {
          ...profile.keyPairs.signature,
          publicKey: `SLHDSA5_${Math.random().toString(36).substring(2, 15)}`,
          privateKey: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
          created: new Date().toISOString()
        };
        
        profile.keyPairs.signature = newKey;
        saveUserProfile(profile);
        setRotatedKey("SLH-DSA");
        
        toast({
          title: "SLH-DSA Key Rotated Successfully",
          description: "Your new key has been generated and is now active.",
        });
      }
    } catch (error) {
      console.error("Error rotating key:", error);
      toast({
        title: "Key Rotation Failed",
        description: "There was an error rotating your key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsRotating(false);
      }, 500);
    }
  };

  return (
    <GlassContainer className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-semibold">Key Rotation Management</h2>
      </div>
      
      <Alert className="mb-6 bg-accent/10 border-accent/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Key Rotation Best Practices</AlertTitle>
        <AlertDescription>
          NIST recommends rotating cryptographic keys periodically to minimize the risk of compromise.
          For high-security environments, rotate keys every 90 days.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>ML-KEM (FIPS 205)</span>
              {kemNeedsRotation ? (
                <Badge className="bg-yellow-500">Rotation Needed</Badge>
              ) : (
                <Badge className="bg-green-500">Active</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Key Encapsulation Mechanism
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kemKey ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Algorithm</h3>
                    <p className="text-sm">{kemKey.algorithm}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Created {kemKeyAge} days ago</span>
                  </div>
                  
                  {kemKeyAge > 60 && kemKeyAge <= 90 ? (
                    <Alert className="bg-yellow-500/10 border-yellow-500/20">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <AlertDescription className="text-sm">
                        This key will need rotation in {90 - kemKeyAge} days
                      </AlertDescription>
                    </Alert>
                  ) : kemKeyAge > 90 ? (
                    <Alert className="bg-red-500/10 border-red-500/20">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-sm">
                        This key is {kemKeyAge - 90} days past recommended rotation period
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No ML-KEM key found</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {isRotating && rotatedKey === null ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rotating ML-KEM key...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <Button 
                className="w-full" 
                disabled={!kemKey || isRotating}
                onClick={rotateKEMKey}
                variant={kemNeedsRotation ? "default" : "outline"}
              >
                {rotatedKey === "ML-KEM" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Key Rotated Successfully
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate ML-KEM Key
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>SLH-DSA (FIPS 206)</span>
              {signatureNeedsRotation ? (
                <Badge className="bg-yellow-500">Rotation Needed</Badge>
              ) : (
                <Badge className="bg-green-500">Active</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Digital Signature Algorithm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signatureKey ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Algorithm</h3>
                    <p className="text-sm">{signatureKey.algorithm}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Created {signatureKeyAge} days ago</span>
                  </div>
                  
                  {signatureKeyAge > 60 && signatureKeyAge <= 90 ? (
                    <Alert className="bg-yellow-500/10 border-yellow-500/20">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <AlertDescription className="text-sm">
                        This key will need rotation in {90 - signatureKeyAge} days
                      </AlertDescription>
                    </Alert>
                  ) : signatureKeyAge > 90 ? (
                    <Alert className="bg-red-500/10 border-red-500/20">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-sm">
                        This key is {signatureKeyAge - 90} days past recommended rotation period
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No SLH-DSA key found</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {isRotating && rotatedKey === null ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rotating SLH-DSA key...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <Button 
                className="w-full" 
                disabled={!signatureKey || isRotating}
                onClick={rotateSignatureKey}
                variant={signatureNeedsRotation ? "default" : "outline"}
              >
                {rotatedKey === "SLH-DSA" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Key Rotated Successfully
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate SLH-DSA Key
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </GlassContainer>
  );
};

export default KeyRotationPanel;
