
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { decryptAES, verifyZKProof } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";
import { Message } from "@/lib/storage-types";

// Define a mock WebSocket URL for development
const WEBSOCKET_URL = "wss://example.com/events"; // This is just a placeholder

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const user = getUserProfile();

  // Mock fetch messages function
  const fetchMessages = async () => {
    setLoading(true);

    try {
      console.log("Fetching messages...");
      // In a real app, this would connect to StarkNet or another backend
      // This is just a mock implementation for development
      
      setTimeout(() => {
        const mockMessages = [
          {
            id: "1",
            senderId: "mock-sender",
            receiverId: user?.id || "current-user",
            encryptedContent: "This is a mock encrypted message",
            timestamp: new Date().toISOString(),
            status: 'sent' as const
          }
        ];
        
        setMessages(mockMessages);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("❌ Failed to retrieve messages:", error);
      setLoading(false);
    }
  };

  // WebSocket setup with proper async handling
  useEffect(() => {
    if (!user) return;

    const connectWebSocket = () => {
      // In development, we don't actually connect to a WebSocket
      console.log("🔹 WebSocket would connect in production mode");
      
      // Mock the WebSocket behavior
      const mockWebSocketReceive = () => {
        // Simulate receiving a message
        setTimeout(() => {
          const newMessage: Message = {
            id: Date.now().toString(),
            senderId: "mock-sender",
            receiverId: user.id,
            encryptedContent: "New message from WebSocket",
            timestamp: new Date().toISOString(),
            status: 'sent'
          };
          
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }, 5000); // Simulate a message after 5 seconds
      };
      
      // Call once for demo
      mockWebSocketReceive();
    };

    connectWebSocket();

    return () => {
      console.log("🔹 WebSocket would disconnect in production mode");
    };
  }, [user]);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold">📩 Secure Messages</h2>

      {loading && <p className="text-gray-400">🔄 Loading messages...</p>}

      <div className="mt-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="p-3 rounded-lg bg-gray-800">
              <span className="font-bold">{msg.senderId}:</span> {msg.encryptedContent}
              <p className="text-xs text-gray-400">
                📅 {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>

      <Button onClick={fetchMessages} className="mt-4 bg-blue-600 hover:bg-blue-700">
        🔄 Refresh Messages
      </Button>
    </div>
  );
};

export default MessageList;
