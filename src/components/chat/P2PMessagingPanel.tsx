
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wifi, 
  WifiOff, 
  Users, 
  Shield, 
  RefreshCw, 
  Send,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

// Define the P2PMessage type if it's not already imported
interface P2PMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: number;
  signature?: string;
}

interface P2PMessagingPanelProps {
  recipientId?: string;
  // Added new props to match what's being passed in Chat.tsx
  messages?: P2PMessage[];
  sendMessage?: (content: string, recipient?: string) => Promise<boolean>;
  isLoading?: boolean;
}

const P2PMessagingPanel: React.FC<P2PMessagingPanelProps> = ({ 
  recipientId,
  messages = [],
  sendMessage,
  isLoading = false
}) => {
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  const [recipient, setRecipient] = useState(recipientId || "");
  const user = getUserProfile();
  
  const handleSendMessage = async () => {
    if (!messageText.trim() || !recipient.trim() || isLoading || !sendMessage) return;
    
    try {
      await sendMessage(messageText, recipient);
      setMessageText("");
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Send Failed",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!user) {
    return (
      <Card className="p-6 text-center">
        <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
        <h3 className="text-lg font-medium">User Profile Required</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Please set up your TetraCrypt profile before using the P2P messaging system.
        </p>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-lg border overflow-hidden h-full flex flex-col">
      {/* Network Status Header */}
      <div className="p-3 bg-muted/50 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wifi className="h-5 w-5 text-green-500" />
          <div>
            <div className="font-medium">TetraCrypt P2P Network</div>
            <div className="text-xs text-muted-foreground">
              Secure Post-Quantum Messaging
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="gap-1 px-2 py-1">
            <Shield className="h-3 w-3" />
            <span>ML-KEM-1024</span>
          </Badge>
        </div>
      </div>
      
      {/* Message Area */}
      <div className="bg-background p-4 flex-1 flex flex-col">
        {/* Recipient Input */}
        {!recipientId && (
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Recipient ID"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
        )}
        
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4 mb-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <Users className="h-12 w-12 mb-2 opacity-20" />
              <p>No messages yet</p>
              <p className="text-xs mt-1">
                Start a conversation with post-quantum encryption
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.senderId === user.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(message.timestamp, { addSuffix: true })}</span>
                      {message.senderId === user.id && (
                        <CheckCircle2 className="h-3 w-3 ml-1" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {/* Message Input */}
        <div className="relative">
          <Textarea
            placeholder="Type a secure message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="pr-14 min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            className="absolute bottom-2 right-2" 
            disabled={!messageText.trim() || !recipient.trim() || isLoading}
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default P2PMessagingPanel;
