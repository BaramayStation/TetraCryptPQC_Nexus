import React, { useEffect, useRef, useState } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { User, Check, CheckCheck, ChevronLeft, Shield, Database, Fingerprint, Lock } from "lucide-react";
import MessageInput from "./MessageInput";
import { Contact, Message, getMessagesForContact, markMessagesAsRead, getUserProfile, addMessage } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { 
  encryptMessage, 
  encryptMessageChaCha,
  signMessage, 
  generateSessionKey,
  homomorphicEncrypt,
  verifyDID
} from "@/lib/crypto";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConversationProps {
  contact: Contact;
  onBack?: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ contact, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionKey, setSessionKey] = useState<string>("");
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Load user profile for security features
  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;
  const hasQKD = user && (user as any).qkdInfo;
  const hasHSM = user && (user as any).hsmInfo;

  useEffect(() => {
    // Load messages
    loadMessages();

    // Mark messages as read
    markMessagesAsRead(contact.id);

    // Generate session key if missing
    if (!sessionKey) {
      generateSessionKey().then(setSessionKey);
    }

    // Periodic refresh
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [contact.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    setMessages(getMessagesForContact(contact.id));
    markMessagesAsRead(contact.id);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!user || !sessionKey) return;

    try {
      // Encrypt message based on selected encryption mode
      let encryptedContent;
      switch (encryptionMode) {
        case "chacha":
          encryptedContent = await encryptMessageChaCha(content, sessionKey);
          break;
        case "homomorphic":
          encryptedContent = await homomorphicEncrypt(content);
          break;
        case "aes":
        default:
          encryptedContent = await encryptMessage(content, sessionKey);
          break;
      }

      // Sign message using SLH-DSA (NIST FIPS 205)
      const signature = await signMessage(encryptedContent, user.keyPairs.signature.privateKey);

      // Create message object
      const newMessage: Message = {
        id: crypto.randomUUID(),
        senderId: user.id,
        receiverId: contact.id,
        encryptedContent,
        timestamp: new Date().toISOString(),
        signature,
        status: 'sent',
        sessionKey,
      };

      // Attach encryption metadata
      (newMessage as any).encryptionMode = encryptionMode;

      // If Web3 DID is available, verify it
      if (hasWebDID) {
        (newMessage as any).didVerified = await verifyDID((user as any).didDocument);
      }

      // Store message
      addMessage(newMessage);
      loadMessages();
    } catch (error) {
      console.error("Message send failed:", error);
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

  const renderEncryptionBadge = (mode: "aes" | "chacha" | "homomorphic") => {
    return <Badge variant="outline" className="text-xs py-0">{mode.toUpperCase()}</Badge>;
  };

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
            </div>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground text-center">No messages yet.</p>
        ) : (
          messages.map((message) => {
            const isUserMessage = message.senderId === user.id;
            return (
              <div key={message.id} className={cn("flex", isUserMessage ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] rounded-lg px-4 py-2", isUserMessage ? "bg-accent" : "glass")}>
                  <p>{message.encryptedContent}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-xs">
                    {renderEncryptionBadge((message as any).encryptionMode)}
                    <span>{formatTime(message.timestamp)}</span>
                    {isUserMessage && renderMessageStatus(message.status)}
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
