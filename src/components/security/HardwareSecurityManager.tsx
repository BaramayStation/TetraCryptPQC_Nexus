
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Key, Check, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { checkYubiKeyPresence, authenticateWithYubiKey } from "@/services/YubiKeyService";
import { HSMType } from "@/lib/storage-types";

export interface HardwareSecurityManagerProps {
  onDeviceDetected?: (deviceType: HSMType) => void;
  onAuthenticated?: (success: boolean) => void;
}

const HardwareSecurityManager: React.FC<HardwareSecurityManagerProps> = ({
  onDeviceDetected,
  onAuthenticated
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deviceDetected, setDeviceDetected] = useState<HSMType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<HSMType>("YubiKey");
  
  // Check for hardware security module on component mount
  useEffect(() => {
    detectHardwareDevice();
  }, []);
  
  const detectHardwareDevice = async () => {
    try {
      setIsChecking(true);
      setError("");
      setProgress(20);
      
      // Check for YubiKey
      const yubiKeyResult = await checkYubiKeyPresence();
      
      if (yubiKeyResult.detected) {
        setDeviceDetected("YubiKey");
        if (onDeviceDetected) {
          onDeviceDetected("YubiKey");
        }
        setProgress(100);
      } else {
        // Check for TPM
        // This would be platform-specific implementation
        const tpmAvailable = false; // Placeholder for actual TPM detection
        
        if (tpmAvailable) {
          setDeviceDetected("TPM");
          if (onDeviceDetected) {
            onDeviceDetected("TPM");
          }
          setProgress(100);
        } else {
          // Check for Secure Enclave (Apple devices)
          // This would be platform-specific implementation
          const secureEnclaveAvailable = false; // Placeholder for actual Secure Enclave detection
          
          if (secureEnclaveAvailable) {
            setDeviceDetected("SecureEnclave");
            if (onDeviceDetected) {
              onDeviceDetected("SecureEnclave");
            }
            setProgress(100);
          } else {
            setDeviceDetected(null);
            setProgress(0);
          }
        }
      }
    } catch (err) {
      setError("Failed to detect hardware security module");
      setProgress(0);
      setDeviceDetected(null);
    } finally {
      setIsChecking(false);
    }
  };
  
  const authenticateDevice = async () => {
    try {
      setIsChecking(true);
      setError("");
      setProgress(20);
      
      if (deviceDetected === "YubiKey" || selectedDevice === "YubiKey") {
        const authResult = await authenticateWithYubiKey();
        
        if (authResult.success) {
          setIsAuthenticated(true);
          setProgress(100);
          if (onAuthenticated) {
            onAuthenticated(true);
          }
        } else {
          throw new Error(authResult.error || "Authentication failed");
        }
      } else {
        // Handle TPM or Secure Enclave authentication
        // This would be platform-specific implementation
        setError("Authentication not implemented for this device type");
        setProgress(0);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
      setProgress(0);
      setIsAuthenticated(false);
      if (onAuthenticated) {
        onAuthenticated(false);
      }
    } finally {
      setIsChecking(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-accent" />
          Hardware Security Integration
        </CardTitle>
        <CardDescription>
          Secure your cryptographic keys using hardware security modules for maximum protection
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isChecking && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Checking for hardware security modules...</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {deviceDetected ? (
          <Alert variant="default" className="bg-accent/10 border-accent">
            <Check className="h-4 w-4 text-accent" />
            <AlertTitle>Hardware Device Detected</AlertTitle>
            <AlertDescription className="flex items-center gap-2">
              <span>{deviceDetected} is available for securing your cryptographic keys</span>
              <Badge variant="outline" className="ml-2 bg-accent/10">
                {deviceDetected}
              </Badge>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Hardware Security Type</label>
            <Select 
              value={selectedDevice} 
              onValueChange={(value) => setSelectedDevice(value as HSMType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hardware type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YubiKey">YubiKey</SelectItem>
                <SelectItem value="TPM">Trusted Platform Module (TPM)</SelectItem>
                <SelectItem value="SecureEnclave">Apple Secure Enclave</SelectItem>
                <SelectItem value="None">Software-Only (Less Secure)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {isAuthenticated && (
          <Alert variant="default" className="bg-green-50 border-green-500 dark:bg-green-900/10 dark:border-green-900">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle>Authentication Successful</AlertTitle>
            <AlertDescription>
              Your cryptographic keys are now protected by hardware security
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={detectHardwareDevice}
          disabled={isChecking}
          className="flex-1"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        
        <Button 
          onClick={authenticateDevice}
          disabled={isChecking || (!deviceDetected && selectedDevice === "None")}
          className="flex-1"
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              {isAuthenticated ? "Re-Authenticate" : "Authenticate"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HardwareSecurityManager;
