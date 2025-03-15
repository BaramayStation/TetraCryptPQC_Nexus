
import { useEffect, useState, useCallback } from 'react';
import { getTetraCryptMessaging, P2PMessage, ConnectionState } from '@/lib/p2p-messaging';
import { useToast } from '@/components/ui/use-toast';

export function useP2PMessaging(recipientId?: string) {
  const { toast } = useToast();
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [peerCount, setPeerCount] = useState(0);
  const [messages, setMessages] = useState<P2PMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const messaging = getTetraCryptMessaging();
    
    // Set initial state
    setConnectionState(messaging.getConnectionState());
    setPeerCount(messaging.getPeerCount());
    
    // Listen for connection state changes
    const unsubscribeConnection = messaging.onConnectionStateChange((state) => {
      setConnectionState(state);
      setPeerCount(messaging.getPeerCount());
    });
    
    // Listen for messages
    const unsubscribeMessages = messaging.onMessage((message) => {
      // If recipientId is specified, only show messages to/from that recipient
      if (!recipientId || message.recipientId === recipientId || message.senderId === recipientId) {
        setMessages(prev => [...prev, message].sort((a, b) => a.timestamp - b.timestamp));
      }
    });
    
    return () => {
      unsubscribeConnection();
      unsubscribeMessages();
    };
  }, [recipientId]);
  
  const sendMessage = useCallback(async (content: string, recipient: string = recipientId || "") => {
    if (!content.trim() || !recipient.trim()) {
      toast({
        title: "Error",
        description: "Message content and recipient are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const messaging = getTetraCryptMessaging();
      await messaging.sendMessage(recipient, content);
      toast({
        title: "Message Sent",
        description: "Your secure message has been sent",
      });
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Send Failed",
        description: "Failed to send your message",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [recipientId, toast]);
  
  const reconnect = useCallback(() => {
    const messaging = getTetraCryptMessaging();
    messaging.reconnect();
  }, []);
  
  return {
    connectionState,
    peerCount,
    messages,
    isLoading,
    sendMessage,
    reconnect,
  };
}
