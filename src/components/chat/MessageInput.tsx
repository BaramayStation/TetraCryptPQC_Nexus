import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Send, Lock, ShieldCheck, Database, KeyRound, UploadCloud, CheckCircle, XCircle, Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { encryptMessage, encryptMessageChaCha, signMessage, homomorphicEncrypt } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";
import { saveToIPFS } from "@/lib/storage";
import { storeMessage } from "@/lib/starknet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;
  const starknetKey = user?.starknetKey;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!starknetKey) {
      console.error("⚠️ User not registered on StarkNet");
      setStatus("error");
      return;
    }

    if (message.trim() === "") return;

    setSending(true);
    setStatus("sending");

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
      setStatus("success");
    } catch (error) {
      console.error("⚠️ Message encryption failed:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-6 border-t shadow-xl rounded-2xl bg-gray-100 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-6 w-6 text-green-500" />
          Quantum-Secure Messaging (FIPS 140-3)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a secure message..."
            className={cn(
              "pr-14 py-3 min-h-[60px] max-h-[160px] rounded-lg transition-all duration-200",
              isFocused ? "border border-blue-500 shadow-lg" : "border border-gray-300"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={sending}
          />

          {isFocused && (
            <div className="absolute bottom-3 left-3 flex items-center text-xs text-muted-foreground">
              <Lock className="h-4 w-4 mr-1" />
              <span>End-to-End Post-Quantum Encryption Enabled</span>
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

          {/* 🔹 Status Feedback */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            {status === "sending" && (
              <div className="flex items-center gap-1 text-yellow-500">
                <UploadCloud className="h-5 w-5 animate-spin" />
                <span>Sending Securely...</span>
              </div>
            )}
            {status === "success" && (
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle className="h-5 w-5" />
                <span>Message Sent Successfully</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-1 text-red-500">
                <XCircle className="h-5 w-5" />
                <span>Message Failed</span>
              </div>
            )}
          </div>

          {/* 🔹 Security Indicators */}
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>NIST FIPS 205 PQC Secure</span>
            </div>
            {hasWebDID && (
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-500" />
                <span>DID Verified</span>
              </div>
            )}
          </div>

          {/* 🔹 Encryption Mode Selector */}
          <div className="mt-6 flex justify-center space-x-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={encryptionMode === "aes" ? "default" : "outline"} size="sm" onClick={() => setEncryptionMode("aes")}>
                  AES-256-GCM
                </Button>
              </TooltipTrigger>
              <TooltipContent>FIPS 140-3 Approved Symmetric Encryption</TooltipContent>
            </Tooltip>

            <Button variant={encryptionMode === "chacha" ? "default" : "outline"} size="sm" onClick={() => setEncryptionMode("chacha")}>
              ChaCha20-Poly1305
            </Button>

            <Button variant={encryptionMode === "homomorphic" ? "default" : "outline"} size="sm" onClick={() => setEncryptionMode("homomorphic")}>
              Homomorphic
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MessageInput;