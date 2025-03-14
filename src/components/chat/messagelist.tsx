import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { decryptAES, verifyZKProof } from "@/lib/crypto"; // Ensures zk-STARK proof validation
import { Provider, Contract } from "starknet";
import { getUserProfile } from "@/lib/storage";

// ✅ StarkNet Messaging Contract Address
const STARKNET_MESSAGING_CONTRACT = "0xYourStarkNetMessagingContractAddress";
const WEBSOCKET_URL = "wss://starknet.io/events"; // WebSocket for real-time messages

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const user = getUserProfile();

  // ✅ Fetch Messages from StarkNet
  const fetchMessages = async () => {
    setLoading(true);

    try {
      const provider = new Provider({ rpc: { nodeUrl: "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" } });
      const messagingContract = new Contract(
        [
          {
            name: "get_message",
            type: "function",
            inputs: [
              { name: "sender", type: "felt" },
              { name: "receiver", type: "felt" },
            ],
            outputs: [{ name: "encrypted_content", type: "felt" }],
          },
        ],
        STARKNET_MESSAGING_CONTRACT,
        provider
      );

      const response = await messagingContract.call("get_message", [
        user.starknetAddress,
        "0xReceiverAddress", // Dynamically set based on chat partner
      ]);

      const encryptedContent = response.encrypted_content;

      // ✅ Validate zk-STARK Proof Before Decrypting
      if (!(await verifyZKProof(encryptedContent))) {
        console.warn("❌ Message validation failed: Invalid zk-STARK proof");
        return;
      }

      // ✅ Decrypt Messages
      const decryptedMessage = await decryptAES(encryptedContent, user.sessionKey);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "You",
          content: decryptedMessage,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error("❌ Failed to retrieve messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ WebSocket Real-Time Updates with Reconnection
  useEffect(() => {
    if (!user) return;

    const connectWebSocket = () => {
      const websocket = new WebSocket(WEBSOCKET_URL);

      websocket.onopen = () => {
        console.log("🔹 WebSocket Connected");
        websocket.send(JSON.stringify({ contract_address: STARKNET_MESSAGING_CONTRACT, event: "MessageSent" }));
      };

      websocket.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📩 New message received:", data);

          if (data.event === "MessageSent") {
            // ✅ Prevent Duplicates
            if (messages.some((msg) => msg.content === data.encrypted_content)) {
              console.warn("⚠️ Duplicate message detected. Skipping.");
              return;
            }

            // ✅ Validate zk-STARK Proof
            if (!(await verifyZKProof(data.encrypted_content))) {
              console.warn("❌ Invalid zk-STARK proof detected. Ignoring message.");
              return;
            }

            // ✅ Decrypt Message
            const decryptedContent = await decryptAES(data.encrypted_content, user.sessionKey);

            setMessages((prevMessages) => [
              ...prevMessages,
              {
                sender: data.sender,
                content: decryptedContent,
                timestamp: Date.now(),
              },
            ]);
          }
        } catch (error) {
          console.error("❌ Error processing WebSocket message:", error);
        }
      };

      websocket.onclose = () => {
        console.log("🔴 WebSocket Disconnected. Reconnecting in 3s...");
        setTimeout(connectWebSocket, 3000);
      };

      setWs(websocket);
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
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

      <Button onClick={fetchMessages} className="mt-4 bg-blue-600 hover:bg-blue-700">
        🔄 Refresh Messages
      </Button>
    </div>
  );
};

export default MessageList;