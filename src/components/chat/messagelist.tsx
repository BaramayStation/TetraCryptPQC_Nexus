import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Database } from "lucide-react";
import { decryptAES } from "@/lib/crypto";
import { Account, Contract, hash } from "starknet";
import { getUserProfile } from "@/lib/storage";

// ✅ StarkNet Messaging Contract Address
const STARKNET_MESSAGING_CONTRACT = "0xYourStarkNetMessagingContractAddress";

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

// ✅ MessageList Component
const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const user = getUserProfile();

  // ✅ Fetch Messages from StarkNet
  const fetchMessages = async () => {
    setLoading(true);

    try {
      const provider = new Account(user.provider, user.starknetAddress);
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
        "0xReceiverAddress", // Change dynamically based on chat partner
      ]);

      const encryptedContent = response.encrypted_content;

      // ✅ Decrypt Messages
      const decryptedMessage = decryptAES(encryptedContent, user.sessionKey);

      setMessages([
        ...messages,
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

  // ✅ Auto-Fetch Messages on Load
  useEffect(() => {
    fetchMessages();
  }, []);

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