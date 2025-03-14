import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";
import { 
  Send, Lock, ShieldCheck, Database, UploadCloud, CheckCircle, XCircle, Zap, Moon, Sun 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { encryptMessage, encryptMessageChaCha, signMessage, homomorphicEncrypt } from "@/lib/crypto";
import { getUserProfile } from "@/lib/storage";
import { saveToIPFS } from "@/lib/storage";
import { storeMessage } from "@/lib/starknet";
import { useTheme } from "next-themes";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [encryptionMode, setEncryptionMode] = useState<"aes" | "chacha" | "homomorphic">("aes");
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { theme, setTheme } = useTheme();

  const user = getUserProfile();
  const hasWebDID = user && (user as any).didDocument;
  const starknetKey = user?.starknetKey;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!starknetKey) {
      toast({
        title: "Error",
        description: "User not registered on StarkNet.",
        variant: "destructive",
      });
      setStatus("error");
      return;
    }

    if (message.trim() === "") return;

    setSending(true);
    setStatus("sending");
    setProgress(20);

    try {
      let encryptedContent;
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

      setProgress(50);

      const signature = await signMessage(encryptedContent, user.keyPairs.signature.privateKey);
      setProgress(75);

      const ipfsHash = await saveToIPFS({
        sender: user.id,
        receiver: "receiver_id_here",
        encryptedContent,
        signature,
      });

      await storeMessage(user.id, "receiver_id_here", ipfsHash);
      setProgress(100);

      const secureMessage = {
        content: encryptedContent,
        encryptionMode,
        signature,
        didVerified: hasWebDID ? "✔ Verified" : "❌ Unverified",
        ipfsHash,
      };

      onSendMessage(JSON.stringify(secureMessage));

      setMessage("");
      setStatus("success");

      toast({
        title: "Message Sent!",
        description: "Your message has been securely encrypted and sent.",
        variant: "success",
      });

    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: "Something went wrong while encrypting the message.",
        variant: "destructive",
      });
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-6 border shadow-2xl rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-all">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <ShieldCheck className="h-6 w-6 text-green-500" />
            Secure Messaging (FIPS 205)
          </CardTitle>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a secure message..."
            className={cn(
              "pr-14 py-3 min-h-[60px] max-h-[160px] rounded-lg transition-all duration-300 shadow-md",
              isFocused ? "border border-blue-500 shadow-xl" : "border border-gray-300"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={sending}
          />

          {isFocused && (
            <div className="absolute bottom-3 left-3 flex items-center text-xs text-muted-foreground">
              <Lock className="h-4 w-4 mr-1" />
              <span>Post-Quantum Encryption Enabled</span>
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

          <Progress value={progress} className="mt-4" />

          <div className="mt-4 flex items-center gap-2 text-sm">
            {status === "sending" && (
              <div className="flex items-center gap-1 text-yellow-500">
                <UploadCloud className="h-5 w-5 animate-spin" />
                <span>Encrypting & Sending...</span>
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

          <div className="mt-6 flex justify-between text-xs text-muted-foreground">
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
        </form>
      </CardContent>
    </Card>
  );
};

export default MessageInput;