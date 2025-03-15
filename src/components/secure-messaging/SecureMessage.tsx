
import React from "react";
import { Message } from "@/lib/storage-types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  CheckCheck, 
  Check, 
  Lock, 
  Shield, 
  Clock,
  Key
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SecureMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const SecureMessage: React.FC<SecureMessageProps> = ({ message, isCurrentUser }) => {
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "unknown time";
    }
  };

  const getEncryptionBadge = () => {
    if (!message.encrypted) return null;
    
    const encType = message.kemType || message.encryptionType || "ML-KEM-1024";
    const isPQC = encType.includes("ML-KEM") || encType.includes("Kyber");
    
    let badgeStyle = "bg-green-500/20 text-green-600";
    if (encType === "Hybrid") {
      badgeStyle = "bg-purple-500/20 text-purple-600";
    }
    
    return (
      <Badge 
        variant="outline" 
        className={cn(
          "flex items-center gap-1 mt-1.5 text-xs py-0.5 h-5",
          badgeStyle
        )}
      >
        <Lock className="h-3 w-3" />
        <span>{encType}{isPQC ? " PQC" : ""}</span>
      </Badge>
    );
  };

  const getSignatureBadge = () => {
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

  return (
    <div 
      className={cn(
        "flex gap-3 max-w-[80%]",
        isCurrentUser ? "ml-auto flex-row-reverse" : ""
      )}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>{message.senderId[0]}</AvatarFallback>
        </Avatar>
      )}
      
      <div>
        <div className={cn(
          "rounded-lg p-3",
          isCurrentUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}>
          <p className="text-sm">{message.content}</p>
          
          <div className="flex flex-wrap gap-2 mt-1">
            {getEncryptionBadge()}
            {getSignatureBadge()}
            
            {message.zkProofVerified && (
              <Badge variant="outline" className="flex items-center gap-1 h-5 py-0.5 bg-indigo-500/20 text-indigo-600">
                <Shield className="h-3 w-3" />
                <span>Zero-Knowledge Verified</span>
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
          
          {isCurrentUser && (
            <>
              {message.status === "read" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCheck className="h-3 w-3 text-primary" />
                    </TooltipTrigger>
                    <TooltipContent>Read</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : message.status === "delivered" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCheck className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Delivered</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Check className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Sent</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecureMessage;
