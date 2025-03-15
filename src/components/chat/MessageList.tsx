import React from "react";
import { Message } from "@/lib/storage-types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCheck, 
  Check, 
  Lock, 
  AlertTriangle, 
  Shield, 
  Database, 
  FileCheck, 
  RefreshCw, 
  Zap, 
  Key
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  contactName: string;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId,
  contactName
}) => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-muted-foreground text-center">
          No messages yet. Start a conversation with quantum-safe encryption.
        </p>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "unknown time";
    }
  };

  const getEncryptionTypeColor = (type?: string) => {
    switch (type) {
      case "ML-KEM-1024":
        return "bg-green-500/20 text-green-600";
      case "Hybrid":
        return "bg-purple-500/20 text-purple-600";
      case "Falcon-1024":
        return "bg-blue-500/20 text-blue-600";
      case "Classic-RSA":
        return "bg-amber-500/20 text-amber-600";
      default:
        return "bg-accent/20";
    }
  };

  const getSecurityBadge = (message: Message) => {
    if (!message.encrypted) return null;
    
    const encType = message.kemType || message.encryptionType || "Encrypted";
    const isPQC = encType.includes("ML-KEM") || encType.includes("Falcon");
    
    return (
      <Badge 
        variant="outline" 
        className={cn(
          "flex items-center gap-1 mt-1.5 text-xs py-0.5 h-5",
          getEncryptionTypeColor(encType)
        )}
      >
        <Lock className="h-3 w-3" />
        <span>{encType}{isPQC && " PQC"}</span>
      </Badge>
    );
  };

  const getSignatureBadge = (message: Message) => {
    if (!message.pqSignatureType) return null;
    
    return (
      <Badge 
        variant="outline" 
        className="flex items-center gap-1 mt-1.5 text-xs py-0.5 h-5 bg-cyan-500/20 text-cyan-600"
      >
        <Key className="h-3 w-3" />
        <span>{message.pqSignatureType}</span>
      </Badge>
    );
  };
  
  const getSelfHealingBadge = (message: Message) => {
    if (!message.selfHealingStatus) return null;
    
    let badgeStyle = "bg-green-500/20 text-green-600";
    let icon = <RefreshCw className="h-3 w-3" />;
    
    if (message.selfHealingStatus === "healing") {
      badgeStyle = "bg-amber-500/20 text-amber-600 animate-pulse";
    } else if (message.selfHealingStatus === "compromised") {
      badgeStyle = "bg-red-500/20 text-red-600";
      icon = <AlertTriangle className="h-3 w-3" />;
    }
    
    return (
      <Badge 
        variant="outline" 
        className={cn("flex items-center gap-1 mt-1.5 text-xs py-0.5 h-5", badgeStyle)}
      >
        {icon}
        <span>AI Self-Healing {message.selfHealingStatus}</span>
      </Badge>
    );
  };

  const getVerificationIcon = (message: Message) => {
    if (message.verified === false) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex bg-amber-500/20 text-amber-600 p-1 rounded-full">
                <AlertTriangle className="h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Signature verification failed</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    if (message.verified === true) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex bg-green-500/20 text-green-600 p-1 rounded-full">
                <FileCheck className="h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Message verified with {message.pqSignatureType || "PQC signature"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return null;
  };

  const getWebRTCSecurityIcon = (message: Message) => {
    if (!message.webrtcSecured) return null;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex bg-indigo-500/20 text-indigo-600 p-1 rounded-full ml-1">
              <Zap className="h-3 w-3" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Secured with P2P WebRTC + zk-STARK</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUserId;
        
        return (
          <div 
            key={message.id} 
            className={cn(
              "flex gap-3 max-w-[80%]",
              isCurrentUser ? "ml-auto flex-row-reverse" : ""
            )}
          >
            {!isCurrentUser && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>{contactName[0]}</AvatarFallback>
              </Avatar>
            )}
            
            <div>
              <div className={cn(
                "rounded-lg p-3",
                isCurrentUser 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted",
                message.selfHealingStatus === "healing" && "border-2 border-amber-400 border-opacity-50",
                message.selfHealingStatus === "compromised" && "border-2 border-red-500 border-opacity-50"
              )}>
                <p className="text-sm">{message.content}</p>
                
                <div className="flex flex-wrap gap-2 mt-1">
                  {getSecurityBadge(message)}
                  {getSignatureBadge(message)}
                  {getSelfHealingBadge(message)}
                  
                  {message.zkProofVerified && (
                    <Badge variant="outline" className="flex items-center gap-1 h-5 py-0.5 bg-indigo-500/20 text-indigo-600">
                      <Shield className="h-3 w-3" />
                      <span>zk-STARK Verified</span>
                    </Badge>
                  )}
                  
                  {message.didVerified && (
                    <Badge variant="outline" className="flex items-center gap-1 h-5 py-0.5 bg-blue-500/20 text-blue-600">
                      <Database className="h-3 w-3" />
                      <span>DID Verified</span>
                    </Badge>
                  )}
                  
                  {message.starkNetValidated && (
                    <Badge variant="outline" className="flex items-center gap-1 h-5 py-0.5 bg-purple-500/20 text-purple-600">
                      <Shield className="h-3 w-3" />
                      <span>StarkNet Validated</span>
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className={cn(
                "flex items-center gap-1 mt-1 text-xs",
                isCurrentUser ? "justify-end" : ""
              )}>
                <span className="text-muted-foreground">
                  {formatTimestamp(message.timestamp)}
                </span>
                
                {getVerificationIcon(message)}
                {getWebRTCSecurityIcon(message)}
                
                {isCurrentUser && (
                  <>
                    {message.status === "read" ? (
                      <CheckCheck className="h-3 w-3 text-primary" />
                    ) : message.status === "delivered" ? (
                      <CheckCheck className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <Check className="h-3 w-3 text-muted-foreground" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
