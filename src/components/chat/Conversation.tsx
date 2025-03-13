
import React, { useEffect, useRef, useState } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { User, Check, CheckCheck, ChevronLeft } from "lucide-react";
import MessageInput from "./MessageInput";
import { Contact, Message, getMessagesForContact, markMessagesAsRead, getUserProfile, addMessage } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { encryptMessage, signMessage, generateSessionKey } from "@/lib/crypto";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConversationProps {
  contact: Contact;
  onBack?: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ contact, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionKey, setSessionKey] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
      // Encrypt message using AES-256-GCM (NIST FIPS 197)
      const encryptedContent = await encryptMessage(content, sessionKey);
      
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
  
  const user = getUserProfile();
  
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
                Start a secure, end-to-end encrypted conversation. Your messages are protected with NIST-compliant post-quantum encryption.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• ML-KEM-1024 key exchange (NIST FIPS 205)</p>
                <p>• SLH-DSA digital signatures (NIST FIPS 205)</p>
                <p>• AES-256-GCM encryption (NIST FIPS 197)</p>
              </div>
            </GlassContainer>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isUserMessage = message.senderId === user.id;
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
                      <span className="text-xs">
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
          <div className="text-xs text-muted-foreground">
            Secure • End-to-End Encrypted
          </div>
        </div>
      </div>
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
