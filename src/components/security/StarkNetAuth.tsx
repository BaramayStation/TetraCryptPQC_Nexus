
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const StarkNetAuth: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [starkNetAddress, setStarkNetAddress] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'success' | 'failure'>('none');

  // Simulated connection function - in a real app, this would connect to StarkNet
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock StarkNet address
      const mockAddress = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;
      
      setStarkNetAddress(mockAddress);
      
      toast({
        title: "StarkNet Connected",
        description: `Connected to address: ${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
      });
    } catch (error) {
      console.error("StarkNet connection error:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to StarkNet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleVerify = async () => {
    if (!starkNetAddress) return;
    
    setVerificationStatus('pending');
    
    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (90% success rate)
      const isVerified = Math.random() > 0.1;
      
      if (isVerified) {
        setVerificationStatus('success');
        toast({
          title: "StarkNet Verification Successful",
          description: "Your StarkNet identity has been verified.",
        });
      } else {
        setVerificationStatus('failure');
        toast({
          title: "Verification Failed",
          description: "Failed to verify StarkNet identity.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setVerificationStatus('failure');
      console.error("StarkNet verification error:", error);
      toast({
        title: "Verification Error",
        description: error instanceof Error ? error.message : "An error occurred during verification",
        variant: "destructive",
      });
    }
  };
  
  const handleDisconnect = () => {
    setStarkNetAddress(null);
    setVerificationStatus('none');
    
    toast({
      title: "StarkNet Disconnected",
      description: "Successfully disconnected from StarkNet.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-accent" />
          StarkNet Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!starkNetAddress ? (
          <div className="text-center py-4">
            <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4 text-muted-foreground">
              Connect to StarkNet to enhance your security with blockchain-based authentication
            </p>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect to StarkNet"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm font-medium">Connected Account</div>
              <div className="mt-1 text-sm text-muted-foreground break-all">
                {starkNetAddress}
              </div>
            </div>
            
            {verificationStatus === 'none' && (
              <Button onClick={handleVerify} className="w-full">
                Verify StarkNet Identity
              </Button>
            )}
            
            {verificationStatus === 'pending' && (
              <Button disabled className="w-full">
                Verifying...
              </Button>
            )}
            
            {verificationStatus === 'success' && (
              <div className="flex items-center text-green-500 p-3 border border-green-200 bg-green-50 rounded-md">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>StarkNet identity verified successfully</span>
              </div>
            )}
            
            {verificationStatus === 'failure' && (
              <div className="flex items-center text-red-500 p-3 border border-red-200 bg-red-50 rounded-md">
                <XCircle className="h-5 w-5 mr-2" />
                <span>Failed to verify StarkNet identity</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {starkNetAddress && (
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={handleDisconnect} 
            className="w-full"
          >
            Disconnect from StarkNet
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StarkNetAuth;
