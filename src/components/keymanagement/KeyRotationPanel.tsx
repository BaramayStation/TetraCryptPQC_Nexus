import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassContainer } from "@/components/ui/glass-container";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Key, RefreshCw, Lock, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getUserProfile, saveUserProfile } from "@/lib/storage";
import { generateMLKEMKeypair, generateSLHDSAKeypair } from "@/lib/pqcrypto";
import { PQCKey } from "@/lib/crypto";

const KeyRotationPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"kem" | "signature">("kem");
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [profile, setProfile] = useState(() => getUserProfile());
  
  // Ensure key pairs have created timestamp
  if (profile?.keyPairs?.pqkem && !profile.keyPairs.pqkem.created) {
    profile.keyPairs.pqkem.created = new Date().toISOString();
  }
  
  if (profile?.keyPairs?.signature && !profile.keyPairs.signature.created) {
    profile.keyPairs.signature.created = new Date().toISOString();
  }
  
  const kemLastRotated = profile?.keyPairs?.pqkem?.created ? new Date(profile.keyPairs.pqkem.created) : null;
  const signatureLastRotated = profile?.keyPairs?.signature?.created ? new Date(profile.keyPairs.signature.created) : null;
  
  const getDaysSinceRotation = (date: Date | null) => {
    if (!date) return "Never";
    const diffTime = Math.abs(new Date().getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const kemDaysSinceRotation = getDaysSinceRotation(kemLastRotated);
  const signatureDaysSinceRotation = getDaysSinceRotation(signatureLastRotated);
  
  const rotateKeys = async (type: "kem" | "signature") => {
    try {
      setIsRotating(true);
      
      if (!profile || !profile.keyPairs) {
        toast({
          title: "Error",
          description: "User profile or key pairs not found.",
          variant: "destructive",
        });
        return;
      }
      
      // Generate new keys
      let newKey: PQCKey;
      if (type === "kem") {
        newKey = await generateMLKEMKeypair();
        // Ensure created property exists
        if (!newKey.created) {
          newKey.created = new Date().toISOString();
        }
      } else {
        newKey = await generateSLHDSAKeypair();
        // Ensure created property exists
        if (!newKey.created) {
          newKey.created = new Date().toISOString();
        }
      }
      
      // Update profile
      if (type === "kem") {
        profile.keyPairs.pqkem = newKey;
      } else {
        profile.keyPairs.signature = newKey;
      }
      
      saveUserProfile(profile);
      setProfile({...profile});
      
      toast({
        title: "Keys Rotated Successfully",
        description: `Your ${type === "kem" ? "ML-KEM" : "SLH-DSA"} keys have been rotated.`,
      });
    } catch (error) {
      console.error("Key rotation error:", error);
      toast({
        title: "Key Rotation Failed",
        description: "There was an error rotating your keys. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRotating(false);
    }
  };
  
  const getRotationStatus = (days: string | number) => {
    if (days === "Never") return "warning";
    if (typeof days === "number") {
      if (days > 90) return "danger";
      if (days > 30) return "warning";
      return "safe";
    }
    return "unknown";
  };
  
  const kemRotationStatus = getRotationStatus(kemDaysSinceRotation);
  const signatureRotationStatus = getRotationStatus(signatureDaysSinceRotation);

  
  return (
    <GlassContainer className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Key Rotation Management</h2>
        </div>
        
        <p className="text-muted-foreground">
          Regularly rotating your cryptographic keys is an important security practice.
          It minimizes the impact of potential key compromise and ensures compliance with security policies.
        </p>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "kem" | "signature")}>
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="kem">
              <Key className="h-4 w-4 mr-2" />
              ML-KEM Keys
            </TabsTrigger>
            <TabsTrigger value="signature">
              <Lock className="h-4 w-4 mr-2" />
              SLH-DSA Keys
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="kem" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-accent" />
                  ML-KEM Key Rotation Status
                </CardTitle>
                <CardDescription>
                  NIST FIPS 205 compliant Key Encapsulation Mechanism
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Current Algorithm</h3>
                      <Badge>{profile?.keyPairs?.pqkem?.algorithm || "Not Found"}</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Security Strength</h3>
                      <span className="text-sm">{profile?.keyPairs?.pqkem?.strength || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">NIST Standard</h3>
                      <Badge variant="outline">{profile?.keyPairs?.pqkem?.standard || "Unknown"}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Last Rotation</h3>
                      <span className="text-sm">
                        {kemLastRotated ? kemLastRotated.toLocaleDateString() : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Days Since Rotation</h3>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className={`text-sm ${
                          kemRotationStatus === "danger" ? "text-destructive" : 
                          kemRotationStatus === "warning" ? "text-yellow-500" : 
                          "text-green-500"
                        }`}>
                          {kemDaysSinceRotation === "Never" ? "Never" : `${kemDaysSinceRotation} days`}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Status</h3>
                      <Badge className={`${
                        kemRotationStatus === "danger" ? "bg-destructive hover:bg-destructive" : 
                        kemRotationStatus === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : 
                        "bg-green-500 hover:bg-green-600"
                      }`}>
                        {kemRotationStatus === "danger" ? "Rotation Overdue" : 
                         kemRotationStatus === "warning" ? "Rotation Recommended" : 
                         "Good Standing"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-md bg-muted/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Key Rotation Recommendations</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Rotate ML-KEM keys every 30-90 days based on sensitivity</li>
                        <li>• Generate new keys immediately if compromise is suspected</li>
                        <li>• Ensure proper key transition when rotating production keys</li>
                        <li>• Verify new keys are properly deployed before deactivating old keys</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => rotateKeys("kem")} 
                  disabled={isRotating}
                  className="w-full"
                >
                  {isRotating && activeTab === "kem" ? (
                    <>Rotating Keys...</>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Rotate ML-KEM Keys
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="signature" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  SLH-DSA Key Rotation Status
                </CardTitle>
                <CardDescription>
                  NIST FIPS 206 compliant Digital Signature Algorithm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Current Algorithm</h3>
                      <Badge>{profile?.keyPairs?.signature?.algorithm || "Not Found"}</Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Security Strength</h3>
                      <span className="text-sm">{profile?.keyPairs?.signature?.strength || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">NIST Standard</h3>
                      <Badge variant="outline">{profile?.keyPairs?.signature?.standard || "Unknown"}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Last Rotation</h3>
                      <span className="text-sm">
                        {signatureLastRotated ? signatureLastRotated.toLocaleDateString() : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Days Since Rotation</h3>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className={`text-sm ${
                          signatureRotationStatus === "danger" ? "text-destructive" : 
                          signatureRotationStatus === "warning" ? "text-yellow-500" : 
                          "text-green-500"
                        }`}>
                          {signatureDaysSinceRotation === "Never" ? "Never" : `${signatureDaysSinceRotation} days`}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Status</h3>
                      <Badge className={`${
                        signatureRotationStatus === "danger" ? "bg-destructive hover:bg-destructive" : 
                        signatureRotationStatus === "warning" ? "bg-yellow-500 hover:bg-yellow-600" : 
                        "bg-green-500 hover:bg-green-600"
                      }`}>
                        {signatureRotationStatus === "danger" ? "Rotation Overdue" : 
                         signatureRotationStatus === "warning" ? "Rotation Recommended" : 
                         "Good Standing"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-md bg-muted/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Key Rotation Recommendations</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Rotate SLH-DSA keys every 180-365 days for good security practices</li>
                        <li>• Carefully manage certificate transitions when rotating signing keys</li>
                        <li>• Keep old signature verification keys active during transition period</li>
                        <li>• Update all verification points when rotating signature keys</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => rotateKeys("signature")} 
                  disabled={isRotating}
                  className="w-full"
                >
                  {isRotating && activeTab === "signature" ? (
                    <>Rotating Keys...</>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Rotate SLH-DSA Keys
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Rotation History</CardTitle>
            <CardDescription>Record of previous key rotation events</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profile?.keyPairs?.pqkem?.created && (
                  <TableRow>
                    <TableCell>{new Date(profile.keyPairs.pqkem.created).toLocaleDateString()}</TableCell>
                    <TableCell>{profile.keyPairs.pqkem.algorithm}</TableCell>
                    <TableCell>Key Encapsulation</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                )}
                {profile?.keyPairs?.signature?.created && (
                  <TableRow>
                    <TableCell>{new Date(profile.keyPairs.signature.created).toLocaleDateString()}</TableCell>
                    <TableCell>{profile.keyPairs.signature.algorithm}</TableCell>
                    <TableCell>Digital Signature</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                )}
                {(!profile?.keyPairs?.pqkem?.created && !profile?.keyPairs?.signature?.created) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No key rotation history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </GlassContainer>
  );
};

export default KeyRotationPanel;
