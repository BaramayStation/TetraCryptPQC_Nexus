
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Shield, Server, Key, Lock, RefreshCw, CheckCircle, AlertTriangle, Cpu } from "lucide-react";
import { checkHardwareSecurityCapabilities } from "@/lib/secure-infrastructure"; // Now properly imported
import { detectHardwareSecurity } from "@/lib/enterprise-security";
import EncryptionSelector from "./EncryptionSelector";

interface EncryptionSettingsProps {
  encryptionType: string;
  onEncryptionChange: (type: string) => void;
}

const EncryptionSettingsPanel: React.FC<EncryptionSettingsProps> = ({
  encryptionType,
  onEncryptionChange
}) => {
  const [hwCapabilities, setHwCapabilities] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tpmProtection, setTpmProtection] = useState(false);
  const [rotateKeys, setRotateKeys] = useState(true);
  const [verifyRecipient, setVerifyRecipient] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Load hardware security capabilities on component mount
  useEffect(() => {
    const loadCapabilities = async () => {
      try {
        // Check hardware security capabilities
        const capabilities = await checkHardwareSecurityCapabilities();
        setHwCapabilities(capabilities);
        
        // Check if TPM is available
        if (capabilities.tpmAvailable) {
          setTpmProtection(true);
        }
      } catch (error) {
        console.error("Error checking hardware capabilities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCapabilities();
  }, []);
  
  // Handle updating encryption settings
  const handleUpdateSettings = async () => {
    setIsUpdating(true);
    
    try {
      // Simulate update delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update encryption type
      onEncryptionChange(encryptionType);
      
      // Show success toast
      toast({
        title: "Encryption Settings Updated",
        description: `Using ${encryptionType} with ${tpmProtection ? 'TPM protection' : 'software protection'}`,
      });
    } catch (error) {
      console.error("Error updating encryption settings:", error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-accent" />
          Encryption Settings
        </CardTitle>
        <CardDescription>
          Configure post-quantum encryption with TPM/SGX hardware security
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Hardware Security Status */}
        {!isLoading && hwCapabilities && (
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-medium flex items-center mb-2">
              <Cpu className="h-4 w-4 mr-2 text-blue-500" />
              Hardware Security Status
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">TPM</span>
                <Badge variant="outline" className={hwCapabilities.tpmAvailable ? 
                  "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                  {hwCapabilities.tpmAvailable ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
                  ) : (
                    <><AlertTriangle className="h-3 w-3 mr-1" /> Not Available</>
                  )}
                </Badge>
                {hwCapabilities.tpmAvailable && hwCapabilities.tpmVersion && (
                  <span className="text-xs text-muted-foreground">Version: {hwCapabilities.tpmVersion}</span>
                )}
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Intel SGX</span>
                <Badge variant="outline" className={hwCapabilities.sgxAvailable ? 
                  "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                  {hwCapabilities.sgxAvailable ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
                  ) : (
                    <><AlertTriangle className="h-3 w-3 mr-1" /> Not Available</>
                  )}
                </Badge>
                {hwCapabilities.sgxAvailable && hwCapabilities.sgxVersion && (
                  <span className="text-xs text-muted-foreground">Version: {hwCapabilities.sgxVersion}</span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Encryption Settings */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="encryption-type">Encryption Algorithm</Label>
            <EncryptionSelector 
              value={encryptionType} 
              onChange={onEncryptionChange}
            />
            <p className="text-xs text-muted-foreground">
              {encryptionType === 'ML-KEM-1024' ? 
                'NIST FIPS 205 standardized post-quantum key encapsulation (256-bit security)' :
                encryptionType === 'Hybrid' ? 
                'Combined ML-KEM + ECC for maximum security against both quantum and classical attacks' :
                'High-performance authenticated encryption for classical security'}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="tpm-protection" className="block">TPM/SGX Key Protection</Label>
                <p className="text-xs text-muted-foreground">Store encryption keys in hardware security module</p>
              </div>
              <Switch
                id="tpm-protection"
                checked={tpmProtection}
                onCheckedChange={setTpmProtection}
                disabled={!hwCapabilities?.tpmAvailable && !hwCapabilities?.sgxAvailable}
              />
            </div>
            
            {!hwCapabilities?.tpmAvailable && !hwCapabilities?.sgxAvailable && tpmProtection && (
              <div className="flex items-center text-xs text-amber-500">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>Hardware security module not available. Using software fallback.</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-rotate" className="block">Automatic Key Rotation</Label>
                <p className="text-xs text-muted-foreground">Periodically rotate encryption keys</p>
              </div>
              <Switch
                id="auto-rotate"
                checked={rotateKeys}
                onCheckedChange={setRotateKeys}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="verify-recipient" className="block">Verify Recipient Identity</Label>
                <p className="text-xs text-muted-foreground">Use StarkNet identity verification before sending</p>
              </div>
              <Switch
                id="verify-recipient"
                checked={verifyRecipient}
                onCheckedChange={setVerifyRecipient}
              />
            </div>
          </div>
        </div>
        
        {/* Security Status */}
        <div className="bg-secondary/20 p-4 rounded-lg">
          <h3 className="font-medium flex items-center mb-2">
            <Shield className="h-4 w-4 mr-2 text-green-500" />
            Encryption Security Status
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Quantum Resistance</span>
              <Badge variant="outline" className={
                encryptionType === 'ML-KEM-1024' || encryptionType === 'Hybrid' ?
                "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }>
                {encryptionType === 'ML-KEM-1024' || encryptionType === 'Hybrid' ?
                  "Protected" : "Vulnerable"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Key Storage</span>
              <Badge variant="outline" className={
                (hwCapabilities?.tpmAvailable || hwCapabilities?.sgxAvailable) && tpmProtection ?
                "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
              }>
                {(hwCapabilities?.tpmAvailable || hwCapabilities?.sgxAvailable) && tpmProtection ?
                  "Hardware Protected" : "Software Protected"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Forward Secrecy</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                {rotateKeys ? "Enhanced" : "Basic"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>FIPS 140-3 Compliance</span>
              <Badge variant="outline" className={
                encryptionType === 'ML-KEM-1024' && tpmProtection ?
                "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
              }>
                {encryptionType === 'ML-KEM-1024' && tpmProtection ?
                  "Compliant" : "Partial"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleUpdateSettings}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Update Encryption Settings
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EncryptionSettingsPanel;
