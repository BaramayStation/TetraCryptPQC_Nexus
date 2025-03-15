
import React from "react";
import { Message } from "@/lib/storage-types";
import { Shield, CheckCheck, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { getUserProfile, getContactById } from "@/lib/storage";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  contactName: string;
  contactId?: string; // Added to fix type error
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId,
  contactName,
  contactId
}) => {
  // Format date for display
  const formatMessageTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return timestamp;
    }
  };

  if (messages.length === 0) {
    return (
      <div className="py-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <Shield className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No messages yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Your conversation will be end-to-end encrypted with post-quantum cryptography
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.sender === currentUserId;
        
        return (
          <div 
            key={message.id} 
            className={cn(
              "flex flex-col max-w-[85%]",
              isCurrentUser ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className="flex items-end gap-2">
              <div 
                className={cn(
                  "px-4 py-2.5 rounded-2xl",
                  isCurrentUser 
                    ? "bg-primary text-primary-foreground rounded-br-none" 
                    : "bg-muted rounded-bl-none"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <span>{isCurrentUser ? "You" : contactName}</span>
              <span>•</span>
              <span>{formatMessageTime(message.timestamp)}</span>
              
              {message.verified && (
                <span className="flex items-center gap-1 ml-1">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">Verified</span>
                </span>
              )}
              
              {isCurrentUser && message.verified && (
                <CheckCheck className="h-3 w-3 ml-1" />
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs">
              {message.encrypted && (
                <Badge variant="outline" className="text-[10px] h-4 px-1 mt-0.5 bg-accent/5">
                  <Shield className="h-2 w-2 mr-0.5" />
                  {message.encryptionType}
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
