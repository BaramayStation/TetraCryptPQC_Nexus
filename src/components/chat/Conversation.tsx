
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
  
  // Get user profile to check for advanced features
  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;
  const hasQKD = user && (user as any).qkdInfo;
  const hasHSM = user && (user as any).hsmInfo;
  
  useEffect(() => {
    // Load messages
    loadMessages();
    
    // Mark messages as read
    markMessagesAsRead(contact.id);
    
    // Generate a session key if needed
    if (!sessionKey) {
      generateSessionKey().then(key => {
        setSessionKey(key);
      });
    }
    
    // Set up periodic refresh
    const interval = setInterval(loadMessages, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, [contact.id]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const loadMessages = () => {
    const loadedMessages = getMessagesForContact(contact.id);
    setMessages(loadedMessages);
    
    // Mark messages as read
    markMessagesAsRead(contact.id);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async (content: string) => {
    const user = getUserProfile();
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
      const signature = await signMessage(encryptedContent, user.keyPairs.falcon.privateKey);
      
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
      
      // Add encryption mode metadata
      (newMessage as any).encryptionMode = encryptionMode;
      
      // If we have Web3 DID, add verification info
      if (hasWebDID) {
        const didVerified = await verifyDID((user as any).didDocument);
        (newMessage as any).didVerified = didVerified;
      }
      
      // Add message to storage
      addMessage(newMessage);
      
      // Refresh message list
      loadMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  
  const renderMessageStatus = (status: 'sent' | 'delivered' | 'read') => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-accent" />;
    }
  };
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const renderEncryptionBadge = (mode?: "aes" | "chacha" | "homomorphic") => {
    switch (mode) {
      case "chacha":
        return <Badge variant="outline" className="text-xs py-0">ChaCha20</Badge>;
      case "homomorphic":
        return <Badge variant="outline" className="text-xs py-0">Homomorphic</Badge>;
      case "aes":
      default:
        return <Badge variant="outline" className="text-xs py-0">AES-256</Badge>;
    }
  };
  
  const renderMessages = () => {
    if (!user) return null;
    
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <GlassContainer className="p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-2">{contact.name}</h3>
              <p className="text-muted-foreground mb-4">
                Start a secure, end-to-end encrypted conversation with TetraCryptPQC. Your messages are protected with NIST-compliant post-quantum encryption.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• ML-KEM-1024 key exchange (NIST FIPS 205)</p>
                <p>• SLH-DSA digital signatures (NIST FIPS 205)</p>
                <p>• AES-256-GCM encryption (NIST FIPS 197)</p>
                {hasWebDID && <p>• Web3 Decentralized Identity verification</p>}
                {hasQKD && <p>• Quantum Key Distribution (QKD)</p>}
                {hasHSM && <p>• Hardware Security Module (HSM) protection</p>}
              </div>
              
              {!isMobile && (
                <div className="mt-4 flex justify-center space-x-2">
                  <Button 
                    size="sm" 
                    variant={encryptionMode === "aes" ? "default" : "outline"}
                    onClick={() => setEncryptionMode("aes")}
                  >
                    AES-256
                  </Button>
                  <Button 
                    size="sm" 
                    variant={encryptionMode === "chacha" ? "default" : "outline"}
                    onClick={() => setEncryptionMode("chacha")}
                  >
                    ChaCha20
                  </Button>
                  <Button 
                    size="sm" 
                    variant={encryptionMode === "homomorphic" ? "default" : "outline"}
                    onClick={() => setEncryptionMode("homomorphic")}
                  >
                    Homomorphic
                  </Button>
                </div>
              )}
            </GlassContainer>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isUserMessage = message.senderId === user.id;
              const messageEncMode = (message as any).encryptionMode || "aes";
              const didVerified = (message as any).didVerified;
              
              return (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex",
                    isUserMessage ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[75%] rounded-lg px-4 py-2 shadow-sm",
                      isUserMessage 
                        ? "bg-accent text-accent-foreground" 
                        : "glass"
                    )}
                  >
                    <div className="break-words">
                      {message.encryptedContent}
                    </div>
                    <div 
                      className={cn(
                        "flex items-center justify-end gap-1 mt-1",
                        isUserMessage 
                          ? "text-accent-foreground/70" 
                          : "text-muted-foreground"
                      )}
                    >
                      {renderEncryptionBadge(messageEncMode)}
                      
                      {didVerified && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="ml-1">
                                <Database className="h-3 w-3" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">DID Verified</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      
                      <span className="text-xs ml-1">
                        {formatTime(message.timestamp)}
                      </span>
                      
                      {isUserMessage && renderMessageStatus(message.status)}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    );
  };
  
  const ConversationHeader = () => (
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
      
      {isMobile && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="sm">
              Encryption
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 space-y-4">
              <h4 className="font-medium">Encryption Method</h4>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={encryptionMode === "aes" ? "default" : "outline"}
                  onClick={() => setEncryptionMode("aes")}
                >
                  AES-256-GCM (NIST)
                </Button>
                <Button 
                  variant={encryptionMode === "chacha" ? "default" : "outline"}
                  onClick={() => setEncryptionMode("chacha")}
                >
                  ChaCha20-Poly1305
                </Button>
                <Button 
                  variant={encryptionMode === "homomorphic" ? "default" : "outline"}
                  onClick={() => setEncryptionMode("homomorphic")}
                >
                  Homomorphic Encryption
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
  
  if (isMobile) {
    return (
      <div className="h-full flex flex-col">
        <ConversationHeader />
        {renderMessages()}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <ConversationHeader />
      {renderMessages()}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Conversation;
