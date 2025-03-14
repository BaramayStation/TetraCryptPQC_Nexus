import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { decryptAES, verifyZKProof } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";

const WEBSOCKET_URL = "ws://localhost:8080"; // ✅ Uses Free P2P WebSocket

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesRef = useRef<Message[]>([]); // Prevents stale state issues
  const user = getUserProfile();

  // ✅ WebSocket Real-Time Updates with Auto-Reconnect & Async Handling
  useEffect(() => {
    if (!user) return;

    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const websocket = new WebSocket(WEBSOCKET_URL);
      wsRef.current = websocket;

      websocket.onopen = () => {
        console.log("🔹 WebSocket Connected to P2P Network");
      };

      websocket.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          // Prevent duplicate messages
          if (messagesRef.current.some((msg) => msg.content === data.encrypted_content)) {
            console.warn("⚠️ Duplicate message detected. Skipping.");
            return;
          }

          // Validate zk-STARK Proof
          if (!(await verifyZKProof(data.encrypted_content))) {
            console.warn("❌ Invalid zk-STARK proof detected. Ignoring message.");
            return;
          }

          // Decrypt the message
          const decryptedContent = await decryptAES(data.encrypted_content, user.sessionKey);

          setMessages((prevMessages) => {
            const updatedMessages = [
              ...prevMessages,
              { sender: data.sender, content: decryptedContent, timestamp: Date.now() },
            ];
            messagesRef.current = updatedMessages;
            return updatedMessages;
          });
        } catch (error) {
          console.error("❌ Error processing WebSocket message:", error);
        }
      };

      websocket.onclose = () => {
        console.log("🔴 WebSocket Disconnected. Reconnecting in 3s...");
        setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
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
              <span className="font-bold">{msg.sender}:</span> {msg.content}
              <p className="text-xs text-gray-400">
                📅 {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>

      <Button onClick={() => console.log("Manually Fetching Messages")} className="mt-4 bg-blue-600 hover:bg-blue-700">
        🔄 Refresh Messages
      </Button>
    </div>
  );
};

export default MessageList;
