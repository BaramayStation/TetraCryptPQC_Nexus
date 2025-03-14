import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Lock, ShieldCheck, Database, KeyRound, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { encryptMessage, encryptMessageChaCha, signMessage, homomorphicEncrypt } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";
import { saveToIPFS } from "@/lib/storage";
import { registerUser, storeMessage } from "@/lib/starknet";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");
  const [sending, setSending] = useState(false);

  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;
  const starknetKey = user?.starknetKey; // Fetch StarkNet key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!starknetKey) {
      console.error("User not registered on StarkNet");
      return;
    }

    if (message.trim() === "") return;

    setSending(true);

    try {
      let encryptedContent;

      // 🔹 Encrypt message based on selected encryption mode
      switch (encryptionMode) {
        case "chacha":
          encryptedContent = await encryptMessageChaCha(message.trim(), user.sessionKey);
          break;
        case "homomorphic":
          encryptedContent = await homomorphicEncrypt(message.trim());
          break;
        case "aes":
        default:
          encryptedContent = await encryptMessage(message.trim(), user.sessionKey);
          break;
      }

      // 🔹 Sign message using SLH-DSA (NIST FIPS 205)
      const signature = await signMessage(encryptedContent, user.keyPairs.signature.privateKey);

      // 🔹 Store message on IPFS
      const ipfsHash = await saveToIPFS({
        sender: user.id,
        receiver: "receiver_id_here",
        encryptedContent,
        signature,
      });

      // 🔹 Store message hash on StarkNet blockchain
      await storeMessage(user.id, "receiver_id_here", ipfsHash);

      // 🔹 Construct secure message
      const secureMessage = {
        content: encryptedContent,
        encryptionMode,
        signature,
        didVerified: hasWebDID ? "✔ Verified" : "❌ Unverified",
        ipfsHash,
      };

      // 🔹 Send message
      onSendMessage(JSON.stringify(secureMessage));

      // 🔹 Clear input
      setMessage("");
    } catch (error) {
      console.error("Message encryption failed:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-4 border-t shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          Secure Message Input
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a secure message..."
            className={cn(
              "pr-14 py-3 min-h-[60px] max-h-[160px] transition-all duration-200 rounded-lg",
              isFocused ? "border border-blue-500 shadow-lg" : "border border-gray-300"
            )}
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
            className={cn(
              "absolute right-2 bottom-2 transition-opacity",
              message.trim() === "" || sending ? "opacity-50 cursor-not-allowed" : "opacity-100"
            )}
            disabled={message.trim() === "" || sending}
          >
            {sending ? <UploadCloud className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>

          {/* Security Indicators */}
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>NIST FIPS 205 PQC Secure</span>
            </div>
            {hasWebDID && (
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-blue-500" />
                <span>DID Verified</span>
              </div>
            )}
          </div>

          {/* Encryption Mode Selector */}
          <div className="mt-4 flex justify-center space-x-3">
            <Button
              variant={encryptionMode === "aes" ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setEncryptionMode("aes")}
            >
              <KeyRound className="h-4 w-4" />
              AES-256-GCM
            </Button>
            <Button
              variant={encryptionMode === "chacha" ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setEncryptionMode("chacha")}
            >
              <KeyRound className="h-4 w-4" />
              ChaCha20-Poly1305
            </Button>
            <Button
              variant={encryptionMode === "homomorphic" ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setEncryptionMode("homomorphic")}
            >
              <KeyRound className="h-4 w-4" />
              Homomorphic
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MessageInput;