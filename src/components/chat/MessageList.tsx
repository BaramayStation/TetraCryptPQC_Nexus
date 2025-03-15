
import React from "react";
import { Message } from "@/lib/storage-types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCheck, Check, Lock, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

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
                  : "bg-muted"
              )}>
                <p className="text-sm">{message.content}</p>
                
                {message.encrypted && (
                  <div className="flex items-center gap-1 mt-1">
                    <Lock className="h-3 w-3 text-current opacity-70" />
                    <span className="text-xs opacity-70">{message.encryptionType || "Encrypted"}</span>
                  </div>
                )}
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
                      <CheckCheck className="h-3 w-3 text-primary" />
                    ) : message.status === "delivered" ? (
                      <CheckCheck className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <Check className="h-3 w-3 text-muted-foreground" />
                    )}
                  </>
                )}
                
                {message.verified === false && (
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
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
