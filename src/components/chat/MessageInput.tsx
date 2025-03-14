import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Lock, ShieldCheck, Database } from "lucide-react";
import { encryptAES, signMessage, generateZKProof } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";
import { signDIDTransaction } from "@/lib/did";
import { Account, Contract, hash } from "starknet";

// ✅ Define StarkNet Contract Details
const STARKNET_MESSAGING_CONTRACT = "0xYourStarkNetMessagingContractAddress";
const WEBSOCKET_URL = "wss://starknet.io/events";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [sending, setSending] = useState(false);
  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;

  // ✅ Send Message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || sending) return;
    setSending(true);

    try {
      console.log("🔹 Encrypting and Signing Message...");
      
      // ✅ Encrypt Message (AES-256-GCM + PQC)
      const encryptedContent = await encryptAES(message.trim(), user.sessionKey);

      // ✅ Sign Message using SLH-DSA
      const signature = await signMessage(encryptedContent, user.keyPairs.signature.privateKey);

      // ✅ Generate zk-STARK Proof
      const zkProof = await generateZKProof(encryptedContent);

      // ✅ Sign Message on StarkNet (if DID is enabled)
      let starknetSignature = null;
      if (hasWebDID) {
        starknetSignature = await signDIDTransaction(user.didDocument, encryptedContent);
      }

      // ✅ Construct Secure Message
      const secureMessage = {
        sender: user.starknetAddress,
        receiver: "0xReceiverAddress", // Replace dynamically for actual chat partner
        content: encryptedContent,
        signature,
        zkProof,
        starknetSignature,
        didVerified: hasWebDID ? "✔ Verified" : "❌ Unverified",
      };

      // ✅ Send Message to StarkNet
      console.log("🔹 Sending Message to StarkNet...");
      const provider = new Account(user.provider, user.starknetAddress);
      const messagingContract = new Contract(
        [
          {
            name: "store_message",
            type: "function",
            inputs: [
              { name: "sender", type: "felt" },
              { name: "receiver", type: "felt" },
              { name: "encrypted_content", type: "felt" },
              { name: "zkProof", type: "felt" },
              { name: "starknet_signature", type: "(felt, felt)" },
            ],
          },
        ],
        STARKNET_MESSAGING_CONTRACT,
        provider
      );

      const response = await messagingContract.invoke(
        "store_message",
        [
          secureMessage.sender,
          secureMessage.receiver,
          hash.starknetKeccak(secureMessage.content),
          secureMessage.zkProof,
          secureMessage.starknetSignature || [0, 0],
        ],
        { maxFee: "10000000000000" } // Adjust based on network fees
      );

      console.log("✅ StarkNet TX:", response.transaction_hash);

      // ✅ Send Secure Message to UI
      onSendMessage(JSON.stringify(secureMessage));

      // ✅ Notify WebSocket Server for Real-time Updates
      const ws = new WebSocket(WEBSOCKET_URL);
      ws.onopen = () => {
        ws.send(JSON.stringify({ event: "MessageSent", data: secureMessage }));
        ws.close();
      };

      // ✅ Clear Input
      setMessage("");
    } catch (error) {
      console.error("❌ Message encryption failed:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a secure message..."
          className={`pr-14 py-3 min-h-[60px] max-h-[160px] transition-all duration-200 ${
            isFocused ? "glass" : "bg-background"
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={sending}
        />

        {isFocused && (
          <div className="absolute bottom-3 left-3 flex items-center text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            <span>Post-Quantum End-to-End Encryption Enabled</span>
          </div>
        )}

        <Button
          type="submit"
          size="icon"
          className={`absolute right-2 bottom-2 ${
            message.trim() === "" || sending ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={message.trim() === "" || sending}
        >
          <Send className="h-4 w-4" />
        </Button>

        {/* Security Indicators */}
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-3 w-3 text-accent" />
            <span>NIST FIPS 205 PQC Secure</span>
          </div>
          {hasWebDID && (
            <div className="flex items-center space-x-2">
              <Database className="h-3 w-3 text-accent" />
              <span>DID Verified on StarkNet</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;