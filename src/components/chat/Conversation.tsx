import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, Send, Info, Clock, Check, CheckCheck, Lock, FileText, Paperclip, Smile, MoreVertical, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatInfoModal from "./ChatInfoModal";
import EncryptionSelector from "./EncryptionSelector";

interface Message {
  id: string;
  content: string;
  sender: "user" | "contact";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
  encrypted: boolean;
}

interface ConversationProps {
  contactName: string;
  contactAvatar?: string;
  contactInitials: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

const Conversation: React.FC<ConversationProps> = ({
  contactName,
  contactAvatar,
  contactInitials,
  isOnline = false,
  lastSeen,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm using TetraCryptPQC for secure messaging.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "read",
      encrypted: true,
    },
    {
      id: "2",
      content: "That's great! I've been looking for a quantum-secure messaging platform.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
      status: "read",
      encrypted: true,
    },
    {
      id: "3",
      content: "Have you checked out the new ML-KEM-1024 encryption? It's resistant to quantum attacks.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "read",
      encrypted: true,
    },
    {
      id: "4",
      content: "Yes, I'm impressed by the post-quantum cryptography implementation here.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      status: "read",
      encrypted: true,
    },
    {
      id: "5",
      content: "The zero-knowledge proofs for identity verification are also quite innovative.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      status: "read",
      encrypted: true,
    },
    {
      id: "6",
      content: "Absolutely. And I like how it integrates with StarkNet for decentralized message storage.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      status: "delivered",
      encrypted: true,
    },
    {
      id: "7",
      content: "The UM1 token integration for million-year sustainability is fascinating too.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      status: "read",
      encrypted: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [encryptionType, setEncryptionType] = useState("kyber");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
      encrypted: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate message being sent
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, status: "sent" } : msg
        )
      );

      // Simulate message being delivered
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.id ? { ...msg, status: "delivered" } : msg
          )
        );

        // Simulate message being read
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === message.id ? { ...msg, status: "read" } : msg
            )
          );
        }, 2000);
      }, 1000);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Conversation Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            {contactAvatar && <AvatarImage src={contactAvatar} alt={contactName} />}
            <AvatarFallback>{contactInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{contactName}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              {isOnline ? (
                <>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Online</span>
                </>
              ) : lastSeen ? (
                <>Last seen {lastSeen.toLocaleString()}</>
              ) : (
                <>Offline</>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Attach File (End-to-End Encrypted)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ChatInfoModal>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4" />
            </Button>
          </ChatInfoModal>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div className="flex flex-col max-w-[80%]">
                <div
                  className={cn(
                    "px-4 py-2 rounded-lg",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  )}
                >
                  {message.content}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 mt-1 text-xs",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </div>
                  {message.encrypted && (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
                  {message.sender === "user" && (
                    <div>{getStatusIcon(message.status)}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Encryption Info Card */}
      <Card className="mx-4 mb-4 border-accent/50 bg-accent/5">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <div className="text-xs font-medium">Post-Quantum Encrypted</div>
            </div>
            <Badge variant="outline" className="text-xs h-5 px-2 gap-1 flex items-center">
              <Lock className="h-3 w-3" />
              <span>ML-KEM-1024</span>
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Your messages are secured with NIST-standardized post-quantum cryptography
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <EncryptionSelector
            value={encryptionType}
            onChange={setEncryptionType}
          />
          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
            <a href="/documentation">
              <FileText className="h-3.5 w-3.5 mr-1" />
              Security Docs
            </a>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
            size="icon"
            className="h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
