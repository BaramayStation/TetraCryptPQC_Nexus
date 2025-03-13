
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === "") return;
    
    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type a secure message..."
          className={cn(
            "pr-14 py-3 min-h-[60px] max-h-[160px] transition-all duration-200",
            isFocused ? "glass" : "bg-background"
          )}
        />
        
        {isFocused && (
          <div className="absolute bottom-3 left-3 flex items-center text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            <span>End-to-end encrypted</span>
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
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
