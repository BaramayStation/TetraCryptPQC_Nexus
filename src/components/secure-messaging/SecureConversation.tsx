
import React, { useState, useEffect, useRef } from "react";
import { Contact, Message } from "@/lib/storage-types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import SecureMessage from "./SecureMessage";
import SecureMessageInput from "./SecureMessageInput";
import { getUserProfile } from "@/lib/storage";
import { signSecureMessage, verifySecureMessage } from "@/lib/message-utils";
import { encryptWithPQC, signMessage } from "@/lib/crypto";
import { createMessage } from "@/lib/message-utils";
import { useToast } from "@/components/ui/use-toast";

interface SecureConversationProps {
  contact: Contact;
  onBack: () => void;
}

const SecureConversation: React.FC<SecureConversationProps> = ({ contact, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionType, setEncryptionType] = useState<"ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305">("ML-KEM-1024");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const currentUser = getUserProfile();

  // Load demo messages if none exist
  useEffect(() => {
    if (messages.length === 0) {
      const demoMessages: Message[] = [
        {
          id: "msg1",
          senderId: contact.id,
          receiverId: currentUser?.userId || "current-user",
          content: "Have you tested the new ML-KEM-1024 implementation?",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          encrypted: true,
          encryptionType: "ML-KEM-1024",
          status: "read",
          pqSignatureType: "SLH-DSA",
          verified: true
        },
        {
          id: "msg2",
          senderId: currentUser?.userId || "current-user",
          receiverId: contact.id,
          content: "Yes, the post-quantum cryptography is working perfectly. Much better security than traditional encryption.",
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          encrypted: true,
          encryptionType: "ML-KEM-1024",
          status: "read",
          pqSignatureType: "SLH-DSA",
          verified: true
        },
        {
          id: "msg3",
          senderId: contact.id,
          receiverId: currentUser?.userId || "current-user",
          content: "Great! Let's start using the hybrid encryption for maximum security.",
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          encrypted: true,
          encryptionType: "Hybrid",
          status: "read",
          pqSignatureType: "SLH-DSA",
          verified: true,
          zkProofVerified: true
        }
      ];
      
      setMessages(demoMessages);
    }
  }, [contact.id, currentUser?.userId, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || isEncrypting) return;
    
    try {
      setIsEncrypting(true);
      
      if (!currentUser) {
        throw new Error("User profile not found");
      }
      
      // Create a new message
      const newMessage = createMessage(
        currentUser.userId, 
        contact.id,
        messageText,
        encryptionType
      );
      
      // Add the message to the UI immediately, but mark as pending
      setMessages(prev => [...prev, { ...newMessage, status: "sent" }]);
      setMessageText("");
      
      // Simulate encryption and network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate signing the message with SLH-DSA
      const signature = await signMessage(newMessage.content, currentUser.keyPairs.signature.privateKey);
      
      // Update the message with the signature and mark as delivered
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? {
          ...msg,
          status: "delivered",
          signature,
          pqSignatureType: "SLH-DSA",
          verified: true
        } : msg
      ));
      
      // Simulate contact reading the message after a delay
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        ));
      }, 3000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Avatar>
            <AvatarFallback>{contact.name[0]}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={`w-2 h-2 rounded-full mr-1 ${
                contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></span>
              <span className="capitalize">{contact.status}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Shield className="h-4 w-4 text-primary mr-1" />
          <span className="text-xs">PQC Secured</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map(message => (
            <SecureMessage 
              key={message.id} 
              message={message} 
              isCurrentUser={message.senderId === (currentUser?.userId || "current-user")}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No messages yet. Start a quantum-secure conversation.</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t mt-auto">
        <SecureMessageInput
          value={messageText}
          onChange={setMessageText}
          onSend={handleSendMessage}
          isEncrypting={isEncrypting}
          encryptionType={encryptionType}
          onEncryptionChange={setEncryptionType}
          didVerified={true}
        />
      </div>
    </div>
  );
};

export default SecureConversation;
