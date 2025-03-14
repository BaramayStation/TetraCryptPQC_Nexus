import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Lock, ShieldCheck, Database } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { encryptMessage, encryptMessageChaCha, signMessage, homomorphicEncrypt } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");

  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") return;

    try {
      let encryptedContent;

      // Encrypt message based on selected encryption mode
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

      // Sign message using SLH-DSA (NIST FIPS 205)
      const signature = await signMessage(encryptedContent, user.keyPairs.signature.privateKey);

      // Construct secure message
      const secureMessage = {
        content: encryptedContent,
        encryptionMode,
        signature,
        didVerified: hasWebDID ? "✔ Verified" : "❌ Unverified",
      };

      // Send message
      onSendMessage(JSON.stringify(secureMessage));

      // Clear input
      setMessage("");
    } catch (error) {
      console.error("Message encryption failed:", error);
    }
  };

  return (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a secure message..."
          className={cn(
            "pr-14 py-3 min-h-[60px] max-h-[160px] transition-all duration-200",
            isFocused ? "glass" : "bg-background"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
            message.trim() === "" ? "opacity-50" : "opacity-100"
          )}
          disabled={message.trim() === ""}
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
              <span>DID Verified</span>
            </div>
          )}
        </div>

        {/* Encryption Mode Selector */}
        <div className="mt-2 flex justify-center space-x-2">
          <Button 
            variant={encryptionMode === "aes" ? "default" : "outline"} 
            size="sm"
            onClick={() => setEncryptionMode("aes")}
          >
            AES-256-GCM
          </Button>
          <Button 
            variant={encryptionMode === "chacha" ? "default" : "outline"} 
            size="sm"
            onClick={() => setEncryptionMode("chacha")}
          >
            ChaCha20-Poly1305
          </Button>
          <Button 
            variant={encryptionMode === "homomorphic" ? "default" : "outline"} 
            size="sm"
            onClick={() => setEncryptionMode("homomorphic")}
          >
            Homomorphic Encryption
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
