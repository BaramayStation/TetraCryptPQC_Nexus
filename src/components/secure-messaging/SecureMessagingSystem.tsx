
import React, { useState, useEffect } from "react";
import { 
  Conversation, 
  Message, 
  QuantumChannel 
} from "@/lib/storage-types/message-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Shield, 
  Lock, 
  UserPlus, 
  ChevronRight, 
  MessageSquare,
  BarChart4,
  RefreshCw
} from "lucide-react";
import SecureConversation from "./SecureConversation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { generateSecureToken } from "@/lib/secure-storage/security-utils";
import { CryptoAlgorithm } from "@/lib/quantum-utils/constants";
import { generateMLKEMKeypair, generateSLHDSAKeypair } from "@/lib/pqcrypto";

interface User {
  id: string;
  name: string;
  publicKey?: string;
  status?: "online" | "offline" | "away";
  lastSeen?: string;
}

interface SecureMessagingSystemProps {
  currentUserId: string;
  currentUserName: string;
}

// Mock data for demonstration
const MOCK_USERS: User[] = [
  { id: "user-1", name: "Alice Cooper", status: "online" },
  { id: "user-2", name: "Bob Smith", status: "online" },
  { id: "user-3", name: "Charlie Davis", status: "offline", lastSeen: "2023-10-15T14:30:00Z" },
  { id: "user-4", name: "Dana White", status: "away", lastSeen: "2023-10-16T08:15:00Z" }
];

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    participants: ["current-user", "user-1"],
    lastMessage: "Working on the quantum-safe implementation now.",
    lastMessageTime: "2023-10-16T10:30:00Z",
    unreadCount: 0,
    pqcEnabled: true,
    encryptionType: CryptoAlgorithm.ML_KEM_1024
  },
  {
    id: "conv-2",
    participants: ["current-user", "user-2"],
    lastMessage: "Did you review the latest PQC standards?",
    lastMessageTime: "2023-10-15T22:15:00Z",
    unreadCount: 2,
    pqcEnabled: true,
    encryptionType: CryptoAlgorithm.ML_KEM_768
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      senderId: "user-1",
      receiverId: "current-user",
      content: "Hey, did you implement the ML-KEM encryption yet?",
      timestamp: "2023-10-16T10:15:00Z",
      encrypted: true,
      encryptionType: CryptoAlgorithm.ML_KEM_1024,
      status: "read"
    },
    {
      id: "msg-2",
      senderId: "current-user",
      receiverId: "user-1",
      content: "Working on the quantum-safe implementation now.",
      timestamp: "2023-10-16T10:30:00Z",
      encrypted: true,
      encryptionType: CryptoAlgorithm.ML_KEM_1024,
      status: "delivered",
    }
  ]
};

const SecureMessagingSystem: React.FC<SecureMessagingSystemProps> = ({
  currentUserId,
  currentUserName
}) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEstablishingChannel, setIsEstablishingChannel] = useState(false);
  const [metrics, setMetrics] = useState<SecureChannelMetrics[]>([]);
  const [quantum, setQuantum] = useState<{ keypairs: number, channels: QuantumChannel[] }>({
    keypairs: 0,
    channels: []
  });
  
  const { toast } = useToast();

  // Initialize metrics
  useEffect(() => {
    setMetrics([
      {
        channelId: "global",
        encryptionStrength: "enhanced",
        latencyMs: 45,
        messageDeliverySuccessRate: 99.8,
        keyRotationInterval: 15 * 24 * 60 * 60 * 1000, // 15 days
        lastKeyRotation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        compromiseAttempts: 0,
        anomalyDetected: false,
        quantumResistanceVerified: true
      }
    ]);
    
    setQuantum({
      keypairs: 4,
      channels: [
        {
          id: "qchannel-1",
          participants: ["current-user", "user-1"],
          encryptionType: "ML-KEM-1024",
          signatureType: "ML-DSA-87",
          status: "active",
          establishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          lastActivityAt: new Date().toISOString(),
          messageCount: 24,
          forwardSecrecy: true,
          pqcVersion: "FIPS 205/206 1.0"
        }
      ]
    });
  }, []);

  // Load conversation messages when activeConversation changes
  useEffect(() => {
    if (activeConversation) {
      // In a real app, this would fetch messages from a secure storage or API
      setConversationMessages(MOCK_MESSAGES[activeConversation.id] || []);
    }
  }, [activeConversation]);

  const handleConversationSelect = (conversation: Conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversation.id
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleMessageSent = (message: Message) => {
    // Add message to conversation
    setConversationMessages(prev => [...prev, message]);
    
    // Update conversation last message
    if (activeConversation) {
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversation.id
            ? {
                ...conv,
                lastMessage: message.content,
                lastMessageTime: message.timestamp
              }
            : conv
        )
      );
    }
    
    // Update metrics
    setMetrics(prev => prev.map(metric => 
      metric.channelId === "global"
        ? {
            ...metric,
            messageDeliverySuccessRate: Math.min(100, metric.messageDeliverySuccessRate + 0.01)
          }
        : metric
    ));
    
    // Update quantum channels
    setQuantum(prev => ({
      ...prev,
      channels: prev.channels.map(channel => 
        channel.participants.includes("current-user") && channel.participants.includes(activeConversation?.participants.find(p => p !== "current-user") || "")
          ? {
              ...channel,
              messageCount: channel.messageCount + 1,
              lastActivityAt: new Date().toISOString()
            }
          : channel
      )
    }));
  };

  const handleCreateNewConversation = async () => {
    if (!selectedUser) return;
    
    setIsEstablishingChannel(true);
    
    try {
      // Simulate channel establishment with ML-KEM
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate ML-KEM and SLH-DSA keypairs
      const kemKeypair = await generateMLKEMKeypair();
      const dsaKeypair = await generateSLHDSAKeypair();
      
      // Create new conversation
      const newConversation: Conversation = {
        id: `conv-${generateSecureToken(8)}`,
        participants: ["current-user", selectedUser.id],
        lastMessage: "Quantum-secure channel established",
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        pqcEnabled: true,
        encryptionType: CryptoAlgorithm.ML_KEM_1024,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add conversation
      setConversations(prev => [...prev, newConversation]);
      
      // Create welcome message
      const welcomeMessage: Message = {
        id: `msg-${generateSecureToken(8)}`,
        senderId: "system",
        receiverId: "current-user",
        content: `Secure quantum-resistant channel established with ${selectedUser.name}`,
        timestamp: new Date().toISOString(),
        encrypted: true,
        encryptionType: CryptoAlgorithm.ML_KEM_1024,
        status: "delivered",
        pqSignatureType: CryptoAlgorithm.ML_DSA_87
      };
      
      // Set up mock messages for this conversation
      MOCK_MESSAGES[newConversation.id] = [welcomeMessage];
      
      // Set active conversation
      setActiveConversation(newConversation);
      setConversationMessages([welcomeMessage]);
      
      // Add new quantum channel
      setQuantum(prev => ({
        keypairs: prev.keypairs + 2, // KEM + DSA
        channels: [
          ...prev.channels,
          {
            id: `qchannel-${generateSecureToken(8)}`,
            participants: ["current-user", selectedUser.id],
            encryptionType: "ML-KEM-1024",
            signatureType: "ML-DSA-87",
            status: "active",
            establishedAt: new Date().toISOString(),
            lastActivityAt: new Date().toISOString(),
            messageCount: 1,
            forwardSecrecy: true,
            pqcVersion: "FIPS 205/206 1.0"
          }
        ]
      }));
      
      // Close dialog
      setIsNewConversationDialogOpen(false);
      setSelectedUser(null);
      
      // Show success toast
      toast({
        title: "Secure Channel Established",
        description: `Quantum-resistant channel with ${selectedUser.name} ready for communication`,
      });
    } catch (error) {
      console.error("Error establishing secure channel:", error);
      toast({
        title: "Channel Establishment Failed",
        description: "Could not establish secure quantum-resistant channel",
        variant: "destructive",
      });
    } finally {
      setIsEstablishingChannel(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    
    const otherParticipantId = conv.participants.find(id => id !== currentUserId);
    const otherParticipant = users.find(user => user.id === otherParticipantId);
    
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="grid grid-cols-4 gap-4 h-[80vh] secure-panel">
      <Card className="col-span-1 overflow-hidden border-border/60">
        <CardHeader className="px-4 py-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <CardTitle className="text-md">Conversations</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsNewConversationDialogOpen(true)}
              className="h-8 px-2"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(80vh-5rem)]">
            {filteredConversations.length > 0 ? (
              <div className="py-2">
                {filteredConversations.map((conversation) => {
                  const otherParticipantId = conversation.participants.find(id => id !== currentUserId);
                  const otherParticipant = users.find(user => user.id === otherParticipantId);
                  
                  if (!otherParticipant) return null;
                  
                  return (
                    <div
                      key={conversation.id}
                      className={cn(
                        "flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                        activeConversation?.id === conversation.id && "bg-muted"
                      )}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{otherParticipant.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(conversation.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate pr-4">
                            {conversation.lastMessage}
                          </p>
                          
                          {conversation.unreadCount > 0 && (
                            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {conversation.pqcEnabled && (
                            <Badge 
                              variant="outline" 
                              className="h-5 px-1 py-0 flex items-center text-[10px] bg-secure/10 text-secure border-secure/30"
                            >
                              <Lock className="h-2.5 w-2.5 mr-0.5" />
                              <span>{conversation.encryptionType}</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 px-4 text-center">
                <p className="text-sm text-muted-foreground">No conversations found</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsNewConversationDialogOpen(true)}
                  className="mt-2"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Start a secure conversation
                </Button>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card className="col-span-3 overflow-hidden border-border/60">
        {activeConversation ? (
          <Tabs defaultValue="conversation" className="flex flex-col h-full">
            <div className="border-b border-border/60">
              <TabsList className="h-10 px-4 bg-transparent">
                <TabsTrigger value="conversation" className="data-[state=active]:bg-muted">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversation
                </TabsTrigger>
                <TabsTrigger value="metrics" className="data-[state=active]:bg-muted">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Security Metrics
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="conversation" className="flex-1 p-0 m-0 data-[state=active]:flex data-[state=active]:flex-col">
              <SecureConversation
                recipientId={activeConversation.participants.find(id => id !== currentUserId) || ""}
                recipientName={
                  users.find(
                    user => user.id === activeConversation.participants.find(id => id !== currentUserId)
                  )?.name || "Unknown"
                }
                currentUserId={currentUserId}
                initialMessages={conversationMessages}
                onMessageSent={handleMessageSent}
              />
            </TabsContent>
            
            <TabsContent value="metrics" className="flex-1 p-4 m-0 data-[state=active]:block overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quantum Security Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 border-border/60">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Encryption Strength</h4>
                        <Badge variant="outline" className="bg-secure/10 text-secure border-secure/30">
                          {metrics[0]?.encryptionStrength === "standard" ? "Standard" : 
                           metrics[0]?.encryptionStrength === "enhanced" ? "Enhanced" : "Maximum"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Using {activeConversation.encryptionType} for post-quantum security
                      </p>
                    </Card>
                    
                    <Card className="p-4 border-border/60">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Message Delivery</h4>
                        <span className="text-secure font-medium">
                          {metrics[0]?.messageDeliverySuccessRate.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        End-to-end encrypted message delivery success rate
                      </p>
                    </Card>
                    
                    <Card className="p-4 border-border/60">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Key Rotation</h4>
                        <span className="text-amber-400 font-medium">
                          {Math.floor((Date.now() - new Date(metrics[0]?.lastKeyRotation).getTime()) / 
                           (24 * 60 * 60 * 1000))} days ago
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        ML-KEM keys are rotated every {metrics[0]?.keyRotationInterval / 
                         (24 * 60 * 60 * 1000)} days
                      </p>
                    </Card>
                    
                    <Card className="p-4 border-border/60">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Security Status</h4>
                        <Badge variant="outline" className="bg-secure/10 text-secure border-secure/30">
                          {metrics[0]?.compromiseAttempts > 0 ? "Under Attack" : "Secure"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {metrics[0]?.compromiseAttempts} compromise attempts detected
                      </p>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quantum Channels</h3>
                  <div className="space-y-3">
                    {quantum.channels.map(channel => (
                      <Card key={channel.id} className="p-4 border-border/60">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Channel {channel.id.substring(9, 13)}</h4>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "bg-secure/10 text-secure border-secure/30",
                              channel.status !== "active" && "bg-destructive/10 text-destructive border-destructive/30"
                            )}
                          >
                            {channel.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Encryption</p>
                            <p className="text-sm">{channel.encryptionType}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Signature</p>
                            <p className="text-sm">{channel.signatureType}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Messages</p>
                            <p className="text-sm">{channel.messageCount}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Last Activity</p>
                            <p className="text-sm">
                              {new Date(channel.lastActivityAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Security Scan Complete",
                        description: "Quantum-resistant security verified for all communication channels",
                      });
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Run Security Scan
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Shield className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">Quantum-Secure Messaging</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              Select a conversation or start a new one to begin communicating with quantum-resistant end-to-end encryption.
            </p>
            <Button 
              className="mt-4"
              onClick={() => setIsNewConversationDialogOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              New Secure Conversation
            </Button>
          </div>
        )}
      </Card>
      
      <Dialog open={isNewConversationDialogOpen} onOpenChange={setIsNewConversationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a New Secure Conversation</DialogTitle>
            <DialogDescription>
              Choose a contact to start a quantum-resistant secure conversation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="contact-search" className="mb-2 block">
              Search Contacts
            </Label>
            <Input
              id="contact-search"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            <ScrollArea className="h-60">
              <div className="space-y-2">
                {users
                  .filter(user => 
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(user => (
                    <div
                      key={user.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors",
                        selectedUser?.id === user.id && "bg-muted"
                      )}
                      onClick={() => setSelectedUser(user)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.status === "online" ? (
                            <span className="flex items-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-secure mr-1.5" />
                              Online
                            </span>
                          ) : (
                            <span>
                              {user.status === "away" ? "Away" : "Offline"}
                              {user.lastSeen && ` - Last seen ${new Date(user.lastSeen).toLocaleDateString()}`}
                            </span>
                          )}
                        </p>
                      </div>
                      
                      {selectedUser?.id === user.id && (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewConversationDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateNewConversation} 
              disabled={!selectedUser || isEstablishingChannel}
            >
              {isEstablishingChannel ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Establishing Secure Channel...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Start Secure Conversation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecureMessagingSystem;
