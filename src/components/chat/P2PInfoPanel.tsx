
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Wifi, Lock, Activity, Server, Fingerprint, Database, SatelliteDish } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const P2PInfoPanel = ({ isP2PEnabled, peerCount = 0, connectionState = 'disconnected' }) => {
  return (
    <Card className="border-accent/20 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            <Wifi className="h-4 w-4 text-accent" />
            Quantum-Secure Network
          </CardTitle>
          <Badge variant={isP2PEnabled ? "default" : "outline"}>
            {isP2PEnabled ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          TetraCryptPQC decentralized end-to-end messaging
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Server className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs">Connected Peers:</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {peerCount}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs">Connection Status:</span>
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs ${
                connectionState === 'connected' 
                  ? 'bg-green-500/10 text-green-600' 
                  : connectionState === 'connecting' 
                    ? 'bg-amber-500/10 text-amber-600'
                    : 'bg-red-500/10 text-red-600'
              }`}
            >
              {connectionState === 'connected' 
                ? 'Connected' 
                : connectionState === 'connecting'
                  ? 'Connecting...'
                  : 'Disconnected'
              }
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs">Encryption:</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600">
                    ML-KEM-1024
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    Module Lattice-based Key Encapsulation Mechanism (ML-KEM-1024/Kyber), NIST FIPS 205 standardized quantum-resistant encryption.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Fingerprint className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs">Authentication:</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600">
                    SLH-DSA
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    Stateless Hash-based Digital Signature Algorithm (SLH-DSA/Dilithium), NIST FIPS 206 standardized quantum-resistant signatures.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Database className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs">Storage:</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600">
                    IPFS/StarkNet
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    Decentralized storage using IPFS with StarkNet zk-STARK verification for message integrity.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <SatelliteDish className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs">Interstellar Ready:</span>
            </div>
            <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-600">
              Enabled
            </Badge>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground text-center">
            <div className="flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-accent" />
              <span>AI-enhanced quantum-resistant security</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default P2PInfoPanel;
