
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { getTetraCryptMessaging, ConnectionState, P2PMessage } from "@/lib/p2p-messaging";
import { getUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

const P2PMessagingPanel: React.FC<{ recipientId?: string }> = ({ recipientId }) => {
  const { toast } = useToast();
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [peerCount, setPeerCount] = useState(0);
  const [messages, setMessages] = useState<P2PMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const [recipient, setRecipient] = useState(recipientId || "");
  const user = getUserProfile();
  
  useEffect(() => {
    const messagingClient = getTetraCryptMessaging();
    
    // Update initial state
    setConnectionState(messagingClient.getConnectionState());
    setPeerCount(messagingClient.getPeerCount());
    
    // Listen for connection state changes
    const unsubscribeConnection = messagingClient.onConnectionStateChange((state) => {
      setConnectionState(state);
      setPeerCount(messagingClient.getPeerCount());
      
      if (state === 'connected') {
        toast({
          title: "Network Connected",
          description: `Connected to ${messagingClient.getPeerCount()} peers in the TetraCrypt network.`,
        });
      } else if (state === 'error') {
        toast({
          title: "Connection Error",
          description: "Failed to connect to the TetraCrypt P2P network.",
          variant: "destructive",
        });
      }
    });
    
    // Listen for incoming messages
    const unsubscribeMessages = messagingClient.onMessage((message) => {
      setMessages(prev => [...prev, message].sort((a, b) => a.timestamp - b.timestamp));
    });
    
    return () => {
      unsubscribeConnection();
      unsubscribeMessages();
    };
  }, [toast]);
  
  const handleSendMessage = async () => {
    if (!messageText.trim() || !recipient.trim() || sending) return;
    
    setSending(true);
    try {
      const messagingClient = getTetraCryptMessaging();
      await messagingClient.sendMessage(recipient, messageText);
      setMessageText("");
      toast({
        title: "Message Sent",
        description: "Your secure message has been sent.",
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Send Failed",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };
  
  const handleReconnect = () => {
    const messagingClient = getTetraCryptMessaging();
    messagingClient.reconnect();
    toast({
      title: "Reconnecting",
      description: "Attempting to reconnect to the TetraCrypt P2P network...",
    });
  };
  
  const getConnectionStatusColor = () => {
    switch (connectionState) {
      case 'connected': return "text-green-500";
      case 'connecting': return "text-yellow-500";
      case 'disconnected': return "text-gray-500";
      case 'error': return "text-red-500";
      default: return "text-gray-500";
    }
  };
  
  const getConnectionIcon = () => {
    switch (connectionState) {
      case 'connected': return <Wifi className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
      case 'connecting': return <Wifi className={`h-5 w-5 ${getConnectionStatusColor()} animate-pulse`} />;
      case 'disconnected': return <WifiOff className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
      case 'error': return <AlertCircle className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
      default: return <WifiOff className={`h-5 w-5 ${getConnectionStatusColor()}`} />;
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
    <Card className="shadow-lg border overflow-hidden">
      {/* Network Status Header */}
      <div className="p-3 bg-muted/50 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getConnectionIcon()}
          <div>
            <div className="font-medium">TetraCrypt P2P Network</div>
            <div className="text-xs text-muted-foreground">
              {connectionState === 'connected' 
                ? `Connected to ${peerCount} peers` 
                : connectionState.charAt(0).toUpperCase() + connectionState.slice(1)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="gap-1 px-2 py-1">
            <Shield className="h-3 w-3" />
            <span>Post-Quantum Secure</span>
          </Badge>
          <Button size="icon" variant="ghost" onClick={handleReconnect}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Message Area */}
      <div className="bg-background p-4 h-[400px] flex flex-col">
        {/* Recipient Input */}
        {!recipientId && (
          <div className="mb-4">
            <Input
              placeholder="Recipient ID"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mb-2"
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
                    {/* Since the real message would be encrypted, we're showing a placeholder */}
                    <p>
                      {message.senderId === user.id 
                        ? "[Encrypted message you sent]" 
                        : "[Encrypted message from sender]"}
                    </p>
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
            disabled={connectionState !== 'connected' || sending}
          />
          <Button 
            size="icon" 
            className="absolute bottom-2 right-2" 
            disabled={!messageText.trim() || !recipient.trim() || connectionState !== 'connected' || sending}
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
