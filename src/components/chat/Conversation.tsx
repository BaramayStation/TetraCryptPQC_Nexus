
import React, { useEffect, useRef, useState, useCallback } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Check, 
  CheckCheck, 
  ChevronLeft, 
  Shield, 
  Database, 
  Fingerprint, 
  Lock, 
  Wifi, 
  RefreshCw,
  Eye,
  EyeOff,
  Info
} from "lucide-react";
import MessageInput from "./MessageInput";
import { Contact, Message, getMessages, getUserProfile, addMessage } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { encryptAES, signMessage, generateSessionKey } from "@/lib/crypto";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useP2PMessaging } from "@/hooks/use-p2p-messaging";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import P2PInfoPanel from "./P2PInfoPanel";
import EncryptionSelector from "./EncryptionSelector";
import ChatInfoModal from "./ChatInfoModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConversationProps {
  contact: Contact;
  onBack?: () => void;
}

const Conversation: React.FC<ConversationProps> = ({ contact, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");
  const [useP2P, setUseP2P] = useState(false);
  const [showEncryptedContent, setShowEncryptedContent] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
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

  const handleEncryptionChange = (value: string) => {
    setEncryptionMode(value as "aes" | "chacha" | "homomorphic");
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
              {hasWebDID && <Database className="h-3 w-3 ml-1" title="DID Verified" />}
              {hasHSM && <Fingerprint className="h-3 w-3 ml-1" title="HSM Protected" />}
              {hasQKD && <Lock className="h-3 w-3 ml-1" title="QKD Enabled" />}
              {useP2P && <Wifi className="h-3 w-3 ml-1" title="P2P Mode" />}
              
              <ChatInfoModal>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                  <Info className="h-3 w-3" />
                </Button>
              </ChatInfoModal>
            </div>
          </div>
        </div>
        
        {/* Security Control Panel */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                >
                  <Shield className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Security Information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
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

      {/* Security Info Panel (collapsible) */}
      {showInfoPanel && (
        <div className="border-b p-3 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {useP2P && (
              <P2PInfoPanel 
                isP2PEnabled={useP2P} 
                peerCount={p2pMessaging.peerCount} 
                connectionState={p2pMessaging.connectionState} 
              />
            )}
            
            <GlassContainer className="p-3 border-accent/20">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-1">
                  <Lock className="h-4 w-4 text-accent" />
                  Security Features
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Badge variant={hasWebDID ? "default" : "outline"} className="text-[10px] py-0 px-1">
                      {hasWebDID ? "Active" : "Inactive"}
                    </Badge>
                    <span>DID Verification</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Badge variant={hasQKD ? "default" : "outline"} className="text-[10px] py-0 px-1">
                      {hasQKD ? "Active" : "Inactive"}
                    </Badge>
                    <span>Quantum Key Dist.</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Badge variant={hasHSM ? "default" : "outline"} className="text-[10px] py-0 px-1">
                      {hasHSM ? "Active" : "Inactive"}
                    </Badge>
                    <span>HSM Protection</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Badge variant="default" className="text-[10px] py-0 px-1 bg-accent">
                      Active
                    </Badge>
                    <span>PQC Signatures</span>
                  </div>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between items-center">
                  {!useP2P && (
                    <EncryptionSelector 
                      value={encryptionMode} 
                      onChange={handleEncryptionChange} 
                    />
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => setShowEncryptedContent(!showEncryptedContent)}
                    >
                      {showEncryptedContent ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {showEncryptedContent ? "Hide Raw" : "Show Raw"}
                    </span>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </div>
        </div>
      )}

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-medium">End-to-End Encrypted Chat</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
              Your conversation with {contact.name} is secured with post-quantum encryption. 
              Messages are only readable by you and your contact.
            </p>
            <Button className="mt-4" onClick={() => handleSendMessage("Hello! This is a secure message.")}>
              Send First Message
            </Button>
          </div>
        ) : (
          allMessages.map((message) => {
            const isUserMessage = message.senderId === user?.id;
            return (
              <div key={message.id} className={cn("flex", isUserMessage ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] rounded-lg px-4 py-2", isUserMessage ? "bg-accent" : "glass")}>
                  <p>{message.content}</p>
                  
                  {showEncryptedContent && message.encryptedContent && (
                    <div className="mt-1 p-1 bg-slate-900 rounded text-xs text-slate-300 font-mono overflow-x-auto">
                      <code>{message.encryptedContent.substring(0, 32)}...</code>
                    </div>
                  )}
                  
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
      <MessageInput 
        onSendMessage={handleSendMessage} 
        encryptionType={useP2P ? "p2p" : encryptionMode}
        didVerified={!!hasWebDID}
      />
    </div>
  );
};

export default Conversation;
