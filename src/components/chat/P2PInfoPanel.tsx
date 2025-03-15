
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Wifi, Lock, Activity, Server } from "lucide-react";

const P2PInfoPanel = ({ isP2PEnabled, peerCount = 0, connectionState = 'disconnected' }) => {
  return (
    <Card className="border-accent/20 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            <Wifi className="h-4 w-4 text-accent" />
            P2P Network Status
          </CardTitle>
          <Badge variant={isP2PEnabled ? "default" : "outline"}>
            {isP2PEnabled ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Decentralized end-to-end encrypted messaging
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
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600">
              ML-KEM
            </Badge>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground text-center">
            <div className="flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-accent" />
              <span>FIPS 205-compliant quantum-resistant</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default P2PInfoPanel;
