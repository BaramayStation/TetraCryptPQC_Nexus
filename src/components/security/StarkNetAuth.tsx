
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Shield, Check, AlertTriangle, Loader2 } from "lucide-react";
import { connectStarkNet, verifyStarkNetIdentity } from "@/services/StarkNetService";

export interface StarkNetAuthProps {
  onSuccess?: (starkNetId: string) => void;
  onError?: (error: string) => void;
}

const StarkNetAuth: React.FC<StarkNetAuthProps> = ({ onSuccess, onError }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [starkNetId, setStarkNetId] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  
  const connectToStarkNet = async () => {
    try {
      setIsConnecting(true);
      setError("");
      setProgress(10);
      setStatus("Initializing StarkNet connection...");
      
      // Connect to StarkNet
      setProgress(30);
      setStatus("Connecting to StarkNet network...");
      const connectionResult = await connectStarkNet();
      
      if (!connectionResult.success) {
        throw new Error(connectionResult.error || "Failed to connect to StarkNet");
      }
      
      // Verify identity
      setProgress(60);
      setStatus("Verifying StarkNet identity...");
      const verificationResult = await verifyStarkNetIdentity();
      
      if (!verificationResult.success) {
        throw new Error(verificationResult.error || "Failed to verify StarkNet identity");
      }
      
      // Set verified state
      setProgress(100);
      setStatus("StarkNet identity verified");
      setStarkNetId(verificationResult.starkNetId);
      setIsVerified(true);
      
      if (onSuccess) {
        onSuccess(verificationResult.starkNetId);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setProgress(0);
      setStatus("Connection failed");
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          StarkNet Zero-Knowledge Authentication
        </CardTitle>
        <CardDescription>
          Verify your identity using StarkNet's zero-knowledge proof system for enhanced security
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isVerified ? (
          <Alert variant="default" className="bg-accent/10 border-accent">
            <Check className="h-4 w-4 text-accent" />
            <AlertTitle>StarkNet Identity Verified</AlertTitle>
            <AlertDescription>
              Your identity has been verified using StarkNet's zero-knowledge proof system.
              <div className="mt-2 font-mono text-xs">
                StarkNet ID: {starkNetId.substring(0, 8)}...{starkNetId.substring(starkNetId.length - 8)}
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {isConnecting && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{status}</span>
                  <span className="text-sm">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="starkKeyInput" className="text-sm font-medium">
                StarkNet Account (Optional)
              </label>
              <Input
                id="starkKeyInput"
                placeholder="0x..."
                disabled={isConnecting}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to create a new StarkNet account or enter your existing account address
              </p>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter>
        {!isVerified ? (
          <Button
            className="w-full"
            onClick={connectToStarkNet}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting to StarkNet...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Connect with StarkNet
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsVerified(false);
              setStarkNetId("");
              setProgress(0);
              setStatus("");
            }}
          >
            Disconnect StarkNet
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StarkNetAuth;
