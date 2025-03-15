
import React, { useEffect, useRef, useState, useCallback } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { User, Check, CheckCheck, ChevronLeft, Shield, Database, Fingerprint, Lock, Wifi, RefreshCw } from "lucide-react";
import MessageInput from "./MessageInput";
import { Contact, Message, getMessages, getUserProfile, addMessage } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { encryptAES, signMessage, generateSessionKey } from "@/lib/crypto";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useP2PMessaging } from "@/hooks/use-p2p-messaging";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ConversationProps {
  contact: Contact;
  onBack?: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ contact, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");
  const [useP2P, setUseP2P] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Load user profile for security features
  const user = getUserProfile();
  const hasWebDID = user && user.didDocument;
  const hasQKD = user && user.qkdInfo;
  const hasHSM = user && user.hsmInfo;

  // P2P messaging hook
  const p2pMessaging = useP2PMessaging(contact.id);

  // Load Messages on Mount and Listen for Updates
  useEffect(() => {
    const initializeSessionKey = async () => {
      if (!sessionKey) {
        const key = await generateSessionKey();
        setSessionKey(key);
      }
    };

    initializeSessionKey();
    loadMessages();

    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [contact.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, p2pMessaging.messages]);

  const loadMessages = useCallback(() => {
    if (!user) return;
    const fetchedMessages = getMessages(user.id, contact.id);
    setMessages(fetchedMessages);
  }, [contact.id, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!user) return;

    if (useP2P) {
      // Send via P2P network
      await p2pMessaging.sendMessage(content, contact.id);
    } else {
      // Use traditional E2E encryption
      try {
        // Encrypt message
        if (!sessionKey) return;
        const encryptedContent = await encryptAES(content, sessionKey);
        
        // Sign message
        const signature = await signMessage(encryptedContent, user.keyPairs.signature.privateKey);

        // Create message object
        const newMessage: Message = {
          id: crypto.randomUUID(),
          senderId: user.id,
          receiverId: contact.id,
          content: content,
          encrypted: true,
          encryptedContent: encryptedContent,
          signature,
          status: 'sent',
          timestamp: new Date().toISOString(),
          sessionKey,
        };

        // Store message
        addMessage(newMessage);
        loadMessages();
      } catch (error) {
        console.error("❌ Message Send Failed:", error);
      }
    }
  };

  const renderMessageStatus = (status: 'sent' | 'delivered' | 'read') => {
    return status === 'read' 
      ? <CheckCheck className="h-3 w-3 text-accent" /> 
      : <Check className="h-3 w-3 text-muted-foreground" />;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderEncryptionBadge = (mode: string) => {
    return <Badge variant="outline" className="text-xs py-0">{mode.toUpperCase()}</Badge>;
  };

  // Combined messages from both regular E2E and P2P (when enabled)
  const allMessages = useP2P
    ? p2pMessaging.messages.map(pm => ({
        id: pm.id,
        senderId: pm.senderId,
        receiverId: pm.recipientId,
        content: "[P2P Encrypted Message]", // In a real app, you'd decrypt this
        timestamp: new Date(pm.timestamp).toISOString(),
        status: 'sent' as const
      }))
    : messages;

  return (
    <div className="h-full flex flex-col">
      {/* Conversation Header */}
      <div className="border-b p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="font-medium">{contact.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Shield className="h-3 w-3" /> TetraCryptPQC Secure
              {hasWebDID && <Database className="h-3 w-3 ml-1" />}
              {hasHSM && <Fingerprint className="h-3 w-3 ml-1" />}
              {hasQKD && <Lock className="h-3 w-3 ml-1" />}
              {useP2P && <Wifi className="h-3 w-3 ml-1" />}
            </div>
          </div>
        </div>
        
        {/* P2P Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="p2p-mode"
              checked={useP2P}
              onCheckedChange={setUseP2P}
            />
            <Label htmlFor="p2p-mode" className="text-xs">P2P Mode</Label>
          </div>
          
          {useP2P && (
            <Button variant="ghost" size="icon" onClick={p2pMessaging.reconnect} 
              disabled={p2pMessaging.connectionState === 'connecting'}>
              <RefreshCw className={cn("h-4 w-4", 
                p2pMessaging.connectionState === 'connecting' && "animate-spin")} />
            </Button>
          )}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <p className="text-muted-foreground text-center">No messages yet.</p>
        ) : (
          allMessages.map((message) => {
            const isUserMessage = message.senderId === user?.id;
            return (
              <div key={message.id} className={cn("flex", isUserMessage ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] rounded-lg px-4 py-2", isUserMessage ? "bg-accent" : "glass")}>
                  <p>{message.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-xs">
                    {renderEncryptionBadge(useP2P ? "P2P" : encryptionMode)}
                    <span>{formatTime(message.timestamp)}</span>
                    {isUserMessage && message.status && renderMessageStatus(message.status)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Conversation;
