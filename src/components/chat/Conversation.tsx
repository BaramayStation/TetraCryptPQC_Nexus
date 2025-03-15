
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Send, 
  Check, 
  CheckCheck, 
  Lock, 
  FileText, 
  Image, 
  Paperclip,
  MoreHorizontal,
  AlertTriangle
} from "lucide-react";
import { Contact, Message, Conversation as ConversationType } from "@/lib/storage-types";
import { formatDistanceToNow } from "date-fns";
import EncryptionSelector from "./EncryptionSelector";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { encryptAES, signMessage } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";

export interface ConversationProps {
  contact: Contact;
  onBack?: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ contact, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [encryptionType, setEncryptionType] = useState<"ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305">("ML-KEM-1024");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const userProfile = getUserProfile();

  // Load conversation messages
  useEffect(() => {
    // Simulate loading messages from storage
    const simulatedMessages: Message[] = [
      {
        id: "1",
        senderId: contact.id,
        recipientId: userProfile?.userId || "",
        content: "Hey, how are you? Let's test this post-quantum encryption!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        encrypted: true,
        signature: "valid-signature-hash",
        verified: true,
        encryptionType: "ML-KEM-1024",
        status: "read"
      },
      {
        id: "2",
        senderId: userProfile?.userId || "",
        recipientId: contact.id,
        content: "I'm good! The ML-KEM-1024 encryption is working great. Let's see if we can also integrate StarkNet for identity.",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        encrypted: true,
        signature: "valid-signature-hash",
        verified: true,
        encryptionType: "ML-KEM-1024",
        status: "delivered"
      },
      {
        id: "3",
        senderId: contact.id,
        recipientId: userProfile?.userId || "",
        content: "Perfect! We should also test the hardware security module integration when you get a chance.",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        encrypted: true,
        signature: "valid-signature-hash",
        verified: true,
        encryptionType: "ML-KEM-1024",
        status: "read"
      }
    ];
    
    setMessages(simulatedMessages);
  }, [contact.id]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !userProfile) return;
    
    try {
      setIsEncrypting(true);
      
      // Generate a unique message ID
      const messageId = crypto.randomUUID();
      
      // Get current timestamp
      const timestamp = new Date().toISOString();
      
      // Encrypt the message content (in a real app, this would use the contact's public key)
      // For demo purposes, we're just simulating the encryption
      const encryptedContent = await encryptAES(inputValue, "demo-key");
      
      // Sign the message for authentication
      const signature = await signMessage(inputValue, userProfile.keyPairs?.signature?.privateKey || "");
      
      // Create the new message
      const newMessage: Message = {
        id: messageId,
        senderId: userProfile.userId,
        recipientId: contact.id,
        content: inputValue, // In a real app, this would be the encrypted content
        timestamp,
        encrypted: true,
        signature,
        verified: true, // Self-messages are always verified
        encryptionType,
        status: "sent"
      };
      
      // Add to messages
      setMessages(prev => [...prev, newMessage]);
      
      // Clear input
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      <div className="flex items-center justify-between p-4 border-b">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </Button>
        )}
        
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{contact.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 bg-accent/10">
            <Lock className="h-3 w-3" />
            <span>{encryptionType}</span>
          </Badge>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Message list */}
      <ScrollArea className="flex-1 p-4">
        <MessageList 
          messages={messages} 
          currentUserId={userProfile?.userId || ""}
          contactName={contact.name}
        />
        <div ref={messageEndRef} />
      </ScrollArea>
      
      {/* Encryption selector */}
      <div className="p-2 border-t">
        <EncryptionSelector 
          value={encryptionType} 
          onChange={(value) => setEncryptionType(value as any)} 
        />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t">
        <MessageInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isEncrypting={isEncrypting}
        />
      </div>
    </div>
  );
};

export default Conversation;
