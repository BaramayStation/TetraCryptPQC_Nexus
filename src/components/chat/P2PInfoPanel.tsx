
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wifi, 
  WifiOff, 
  Users, 
  Shield, 
  RefreshCw, 
  Info,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConnectionState } from "@/lib/p2p-messaging";

interface P2PInfoPanelProps {
  isP2PEnabled?: any;
  peerCount?: number;
  connectionState?: string;
  onReconnect?: () => void; // Added to fix type error
}

const P2PInfoPanel: React.FC<P2PInfoPanelProps> = ({ 
  isP2PEnabled = true,
  peerCount = 0, 
  connectionState = 'disconnected',
  onReconnect
}) => {
  // Get connection status color
  const getConnectionStatusColor = () => {
    switch (connectionState) {
      case 'connected': return "text-green-500";
      case 'connecting': return "text-yellow-500";
      case 'disconnected': return "text-gray-500";
      case 'error': return "text-red-500";
      default: return "text-gray-500";
    }
  };
  
  // Get connection icon
  const getConnectionIcon = () => {
    switch (connectionState) {
      case 'connected': return <Wifi className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
      case 'connecting': return <Wifi className={`h-5 w-5 ${getConnectionStatusColor()} animate-pulse`} />;
      case 'disconnected': return <WifiOff className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
      case 'error': return <AlertCircle className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
      default: return <WifiOff className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
    }
  };
  
  return (
    <div className="p-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getConnectionIcon()}
              <div>
                <h3 className="font-semibold text-base">P2P Network Status</h3>
                <p className="text-xs text-muted-foreground">
                  {connectionState === 'connected' 
                    ? `Connected to ${peerCount} peers` 
                    : connectionState === 'connecting'
                      ? 'Connecting to network...'
                      : connectionState === 'error'
                        ? 'Connection error'
                        : 'Disconnected'}
                </p>
              </div>
            </div>
            
            {onReconnect && (
              <Button variant="outline" size="sm" onClick={onReconnect}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reconnect
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Post-Quantum Secure</span>
              </div>
              <Badge variant={isP2PEnabled ? "default" : "outline"}>
                {isP2PEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Connected Peers</span>
              </div>
              <Badge variant="outline">{peerCount}</Badge>
            </div>
            
            {connectionState === 'disconnected' && (
              <div className="mt-4 p-3 border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/50 rounded-md flex items-start gap-2">
                <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="text-xs text-yellow-700 dark:text-yellow-300">
                  Your P2P connection is currently disconnected. Click "Reconnect" to join the TetraCrypt network.
                </div>
              </div>
            )}
            
            {connectionState === 'error' && (
              <div className="mt-4 p-3 border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50 rounded-md flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                <div className="text-xs text-red-700 dark:text-red-300">
                  There was an error connecting to the P2P network. Please check your internet connection and try again.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default P2PInfoPanel;
