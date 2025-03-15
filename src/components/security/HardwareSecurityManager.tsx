
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Key, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Fingerprint,
  Lock,
  RefreshCw,
  Upload,
  Download,
  Trash2
} from "lucide-react";
import { detectYubiKey, generatePQCKeyPairWithYubiKey, resetYubiKey, verifyYubiKeyPin } from "@/services/YubiKeyService";
import { checkHardwareSecurity } from "@/lib/tetracrypt-ffi";
import { HSMType, PQCAlgorithm } from "@/lib/storage-types";
import { useToast } from "@/components/ui/use-toast";

export interface HardwareSecurityManagerProps {
  onKeyGenerated?: (keyData: any) => void;
}

const HardwareSecurityManager: React.FC<HardwareSecurityManagerProps> = ({ 
  onKeyGenerated 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"detect" | "generate" | "manage">("detect");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [pin, setPin] = useState("");
  const [algorithm, setAlgorithm] = useState<PQCAlgorithm>("ML-KEM-1024");
  const [hardwareInfo, setHardwareInfo] = useState<{
    available: boolean;
    type: HSMType;
    features: string[];
    serialNumber?: string;
    firmware?: string;
  } | null>(null);

  // Detect hardware security on mount
  useEffect(() => {
    detectHardwareSecurityModules();
  }, []);

  // Detect hardware security modules
  const detectHardwareSecurityModules = async () => {
    try {
      setIsLoading(true);
      setStatus("Detecting hardware security modules...");
      setProgress(20);
      
      // Check for general hardware security modules
      const hwSecurity = await checkHardwareSecurity();
      
      setProgress(60);
      
      // Check specifically for YubiKey
      const yubiKeyStatus = await detectYubiKey();
      
      setProgress(100);
      
      if (yubiKeyStatus.connected) {
        setHardwareInfo({
          available: true,
          type: "YubiKey",
          features: yubiKeyStatus.device?.capabilities || [],
          serialNumber: yubiKeyStatus.device?.serialNumber,
          firmware: yubiKeyStatus.device?.firmware
        });
        
        setStatus(`YubiKey detected: ${yubiKeyStatus.device?.serialNumber}`);
      } else if (hwSecurity.available) {
        setHardwareInfo({
          available: true,
          type: hwSecurity.type as HSMType,
          features: hwSecurity.features
        });
        
        setStatus(`${hwSecurity.type} detected`);
      } else {
        setHardwareInfo({
          available: false,
          type: "None",
          features: []
        });
        
        setStatus("No hardware security modules detected");
      }
      
      toast({
        title: hardwareInfo?.available 
          ? `${hardwareInfo.type} detected` 
          : "Hardware security not available",
        description: hardwareInfo?.available 
          ? `${hardwareInfo.features.join(", ")}` 
          : "Using software-based security instead",
      });
    } catch (error) {
      console.error("Error detecting hardware security:", error);
      setStatus("Error detecting hardware security");
      
      toast({
        title: "Detection Error",
        description: "Failed to detect hardware security modules",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate key pair using YubiKey
  const generateKeyPair = async () => {
    try {
      if (!hardwareInfo?.available || hardwareInfo.type !== "YubiKey") {
        throw new Error("YubiKey required for key generation");
      }
      
      // Validate PIN if provided
      if (pin) {
        setIsLoading(true);
        setStatus("Verifying PIN...");
        setProgress(20);
        
        const pinResult = await verifyYubiKeyPin(pin);
        if (!pinResult.success) {
          throw new Error(pinResult.error || "Invalid PIN");
        }
        
        setProgress(40);
      }
      
      // Generate key pair
      setStatus(`Generating ${algorithm} key pair on YubiKey...`);
      setProgress(60);
      
      const result = await generatePQCKeyPairWithYubiKey(algorithm, pin);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to generate key pair");
      }
      
      setProgress(100);
      setStatus("Key pair generated successfully");
      
      // Notify parent component
      if (onKeyGenerated) {
        onKeyGenerated(result.data);
      }
      
      toast({
        title: "Key Generation Success",
        description: `${algorithm} key pair generated on YubiKey`,
      });
    } catch (error) {
      console.error("Error generating key pair:", error);
      setStatus("Error generating key pair");
      
      toast({
        title: "Generation Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset YubiKey
  const resetHardwareSecurity = async () => {
    try {
      if (!hardwareInfo?.available || hardwareInfo.type !== "YubiKey") {
        throw new Error("YubiKey required for reset");
      }
      
      setIsLoading(true);
      setStatus("Resetting YubiKey...");
      setProgress(30);
      
      const result = await resetYubiKey();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to reset YubiKey");
      }
      
      setProgress(100);
      setStatus("YubiKey reset successfully");
      
      toast({
        title: "YubiKey Reset",
        description: "YubiKey has been reset successfully. All keys have been deleted.",
      });
    } catch (error) {
      console.error("Error resetting YubiKey:", error);
      setStatus("Error resetting YubiKey");
      
      toast({
        title: "Reset Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          Hardware Security Module
        </CardTitle>
        <CardDescription>
          Manage YubiKey, TPM, and other hardware security devices
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="detect">
              <Fingerprint className="h-4 w-4 mr-2" />
              Detect
            </TabsTrigger>
            <TabsTrigger value="generate">
              <Key className="h-4 w-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="manage">
              <Lock className="h-4 w-4 mr-2" />
              Manage
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="detect" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Hardware Status</h3>
                <p className="text-xs text-muted-foreground">
                  Current hardware security module status
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={detectHardwareSecurityModules}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {hardwareInfo && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Module Type:</span>
                    <Badge variant={hardwareInfo.available ? "default" : "destructive"}>
                      {hardwareInfo.type === "None" ? "Not Available" : hardwareInfo.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    {hardwareInfo.available ? (
                      <Badge className="bg-green-500">Available</Badge>
                    ) : (
                      <Badge variant="outline" className="text-destructive">Not Detected</Badge>
                    )}
                  </div>
                </div>
                
                {hardwareInfo.serialNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Serial Number:</span>
                    <span className="text-sm">{hardwareInfo.serialNumber}</span>
                  </div>
                )}
                
                {hardwareInfo.firmware && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Firmware:</span>
                    <span className="text-sm">{hardwareInfo.firmware}</span>
                  </div>
                )}
                
                {hardwareInfo.features.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Features:</span>
                    <div className="flex flex-wrap gap-2">
                      {hardwareInfo.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {!hardwareInfo.available && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Hardware Security Not Available</AlertTitle>
                    <AlertDescription>
                      No hardware security module was detected. Post-quantum operations will use software-based security instead.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="generate" className="space-y-4 mt-4">
            {hardwareInfo?.available && hardwareInfo.type === "YubiKey" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">PQC Algorithm</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as PQCAlgorithm)}
                    disabled={isLoading}
                  >
                    <optgroup label="ML-KEM (NIST FIPS 205)">
                      <option value="ML-KEM-512">ML-KEM-512 (128-bit security)</option>
                      <option value="ML-KEM-768">ML-KEM-768 (192-bit security)</option>
                      <option value="ML-KEM-1024">ML-KEM-1024 (256-bit security)</option>
                    </optgroup>
                    <optgroup label="SLH-DSA (NIST FIPS 206)">
                      <option value="SLH-DSA-Dilithium2">SLH-DSA-Dilithium2 (128-bit security)</option>
                      <option value="SLH-DSA-Dilithium3">SLH-DSA-Dilithium3 (192-bit security)</option>
                      <option value="SLH-DSA-Dilithium5">SLH-DSA-Dilithium5 (256-bit security)</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">YubiKey PIN (optional)</label>
                  <Input 
                    type="password" 
                    placeholder="Enter PIN if required" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{status}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={generateKeyPair}
                  disabled={isLoading}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Generate Key Pair on YubiKey
                </Button>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>YubiKey Required</AlertTitle>
                <AlertDescription>
                  A YubiKey is required to generate hardware-backed post-quantum keys. 
                  Please connect a YubiKey and refresh the detection.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4 mt-4">
            {hardwareInfo?.available && hardwareInfo.type === "YubiKey" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" disabled={isLoading}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Keys to YubiKey
                  </Button>
                  
                  <Button variant="outline" disabled={isLoading}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Public Keys
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Danger Zone</h3>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Reset YubiKey</AlertTitle>
                    <AlertDescription>
                      This will reset your YubiKey and delete all keys stored on it. 
                      This action cannot be undone.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={resetHardwareSecurity}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset YubiKey
                  </Button>
                </div>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>YubiKey Required</AlertTitle>
                <AlertDescription>
                  A YubiKey is required to manage hardware-backed security. 
                  Please connect a YubiKey and refresh the detection.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        <p className="text-xs text-muted-foreground">
          Hardware security modules enable the highest level of protection for your post-quantum cryptographic keys,
          protecting them from extraction even if your device is compromised.
        </p>
      </CardFooter>
    </Card>
  );
};

export default HardwareSecurityManager;
