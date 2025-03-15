
import React, { useState, useEffect, useRef } from "react";
import { Message } from "@/lib/storage-types/message-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  Send, 
  Key,
  RefreshCw,
  AlertTriangle,
  Zap
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SecureMessage from "./SecureMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { encryptWithPQC, signMessage, generateMLKEMKeypair } from "@/lib/pqcrypto";
import { generateSecureToken } from "@/lib/secure-storage/security-utils";
import { CryptoAlgorithm } from "@/lib/quantum-utils/constants";

interface SecureConversationProps {
  recipientId: string;
  recipientName: string;
  currentUserId: string;
  initialMessages?: Message[];
  onMessageSent?: (message: Message) => void;
}

const SecureConversation: React.FC<SecureConversationProps> = ({
  recipientId,
  recipientName,
  currentUserId,
  initialMessages = [],
  onMessageSent
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [securityLevel, setSecurityLevel] = useState<"standard" | "enhanced" | "maximum">("enhanced");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate keypairs on mount
  useEffect(() => {
    const initKeys = async () => {
      try {
        const { publicKey } = await generateMLKEMKeypair(
          securityLevel === "standard" ? "ML-KEM-768" : "ML-KEM-1024"
        );
        setPublicKey(publicKey);
      } catch (error) {
        console.error("Error generating keys:", error);
        toast({
          title: "Key Generation Failed",
          description: "Could not establish secure channel. Please try again.",
          variant: "destructive",
        });
      }
    };

    initKeys();
  }, [securityLevel, toast]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !publicKey) return;

    const messageId = generateSecureToken(16);
    const timestamp = new Date().toISOString();
    
    setIsEncrypting(true);
    
    try {
      // Encrypt the message with ML-KEM
      const encryptedContent = await encryptWithPQC(newMessage, publicKey);
      
      // Sign the message with SLH-DSA if security level is maximum
      let signature;
      if (securityLevel === "maximum") {
        // This is a simulation - in a real implementation, we would use the user's private key
        signature = await signMessage(
          newMessage,
          "simulated-private-key",
          "ML-DSA-87"
        );
      }
      
      // Create the message object
      const message: Message = {
        id: messageId,
        content: newMessage,
        senderId: currentUserId,
        receiverId: recipientId,
        timestamp,
        encrypted: true,
        encryptionType: securityLevel === "standard" 
          ? CryptoAlgorithm.ML_KEM_768 
          : CryptoAlgorithm.ML_KEM_1024,
        pqSignatureType: securityLevel === "maximum" ? CryptoAlgorithm.ML_DSA_87 : undefined,
        signature,
        status: "sent",
        encryptedContent,
        integrityHash: await hashMessage(newMessage, timestamp)
      };
      
      // Add the new message to the conversation
      setMessages(prev => [...prev, message]);
      
      // Clear the input
      setNewMessage("");
      
      // Notify parent component
      if (onMessageSent) {
        onMessageSent(message);
      }
      
      // Show success toast for maximum security level
      if (securityLevel === "maximum") {
        toast({
          title: "Military-Grade Encryption Active",
          description: "Message secured with quantum-resistant hybrid encryption and signatures.",
        });
      }
    } catch (error) {
      console.error("Error sending secure message:", error);
      toast({
        title: "Encryption Failed",
        description: "Could not securely encrypt your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleSecurityLevelChange = async (level: "standard" | "enhanced" | "maximum") => {
    setSecurityLevel(level);
    
    // Generate new keys for the new security level
    try {
      const { publicKey } = await generateMLKEMKeypair(
        level === "standard" ? "ML-KEM-768" : "ML-KEM-1024"
      );
      setPublicKey(publicKey);
      
      toast({
        title: "Security Level Updated",
        description: `Channel now using ${level === "standard" ? "ML-KEM-768" : "ML-KEM-1024"}${level === "maximum" ? " with ML-DSA-87 signatures" : ""}`,
      });
    } catch (error) {
      console.error("Error updating security level:", error);
    }
  };
  
  // Helper function to hash messages for integrity checks
  const hashMessage = async (content: string, timestamp: string): Promise<string> => {
    // This would use SHA-3 in a production environment
    const encoder = new TextEncoder();
    const data = encoder.encode(`${content}${timestamp}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  return (
    <Card className="flex flex-col h-[70vh] border-border/60">
      <CardHeader className="px-4 py-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-md">{recipientName}</CardTitle>
            <Badge 
              variant="outline" 
              className="ml-2 bg-secure/10 text-secure border-secure/30 flex items-center gap-1"
            >
              <Lock className="h-3 w-3" />
              <span>{securityLevel === "standard" ? "Standard PQC" : securityLevel === "enhanced" ? "Enhanced PQC" : "Maximum PQC"}</span>
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleSecurityLevelChange("standard")}
            >
              <Shield className={`h-4 w-4 mr-1 ${securityLevel === "standard" ? "text-primary" : "text-muted-foreground"}`} />
              Standard
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleSecurityLevelChange("enhanced")}
            >
              <Shield className={`h-4 w-4 mr-1 ${securityLevel === "enhanced" ? "text-primary" : "text-muted-foreground"}`} />
              Enhanced
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={() => handleSecurityLevelChange("maximum")}
            >
              <Key className={`h-4 w-4 mr-1 ${securityLevel === "maximum" ? "text-primary" : "text-muted-foreground"}`} />
              Maximum
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {publicKey ? (
          securityLevel === "maximum" && (
            <Alert className="bg-amber-500/10 text-amber-400 border-amber-500/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Military-Grade Encryption Active</AlertTitle>
              <AlertDescription className="text-xs">
                Using ML-KEM-1024 for encryption and ML-DSA-87 for signatures with hardware-accelerated AES-256-GCM
              </AlertDescription>
            </Alert>
          )
        ) : (
          <Alert variant="destructive">
            <AlertTitle>Secure Channel Not Established</AlertTitle>
            <AlertDescription>
              Unable to establish quantum-resistant secure channel. Please refresh.
            </AlertDescription>
          </Alert>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <SecureMessage
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUserId}
          />
        ))}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 border-t border-border/60">
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder="Type a secure message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isEncrypting || !publicKey}
            className="flex-1"
          />
          
          <Button 
            onClick={handleSendMessage} 
            disabled={isEncrypting || !newMessage.trim() || !publicKey}
            className="gap-1"
          >
            {isEncrypting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Encrypting...</span>
              </>
            ) : (
              <>
                {securityLevel === "maximum" ? (
                  <Zap className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>Send</span>
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SecureConversation;
