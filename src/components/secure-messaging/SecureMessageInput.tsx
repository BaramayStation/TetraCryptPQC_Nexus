
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Lock, 
  ShieldCheck, 
  Database, 
  AlertTriangle,
  Clock 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/ui/glass-container";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SecureMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isEncrypting?: boolean;
  encryptionType: "ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305";
  onEncryptionChange: (value: "ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305") => void;
  didVerified?: boolean;
}

const SecureMessageInput: React.FC<SecureMessageInputProps> = ({ 
  value,
  onChange,
  onSend,
  isEncrypting = false,
  encryptionType = "ML-KEM-1024",
  onEncryptionChange,
  didVerified = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const getEncryptionLabel = () => {
    switch (encryptionType) {
      case "ChaCha20-Poly1305": return "ChaCha20-Poly1305";
      case "Hybrid": return "Hybrid PQC+Classical";
      case "ML-KEM-1024": 
      default: return "ML-KEM-1024 (FIPS 205)";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === "" || isEncrypting) return;
    onSend();
  };

  const toggleSecurityInfo = () => {
    setShowSecurityInfo(!showSecurityInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {showSecurityInfo && (
        <GlassContainer className="mb-3 p-3 animate-fade-in">
          <div className="text-xs space-y-2">
            <h4 className="font-medium flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              Message Security Information
            </h4>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <span className="text-muted-foreground">Encryption:</span>
                <div className="font-medium">{getEncryptionLabel()}</div>
              </div>
              
              <div>
                <span className="text-muted-foreground">Signature Algorithm:</span>
                <div className="font-medium">SLH-DSA (FIPS 206)</div>
              </div>
              
              <div>
                <span className="text-muted-foreground">Key Exchange:</span>
                <div className="font-medium">ML-KEM (FIPS 205)</div>
              </div>
              
              <div>
                <span className="text-muted-foreground">Identity Verification:</span>
                <div className="font-medium flex items-center gap-1">
                  {didVerified ? (
                    <>
                      <Database className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">DID Verified</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      <span className="text-amber-500">Basic</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Messages are secured with post-quantum cryptography and cannot be decrypted by third parties or future quantum computers.</span>
              </span>
            </div>
          </div>
        </GlassContainer>
      )}
      
      <div className="flex items-center gap-2 mb-2">
        <Select 
          value={encryptionType} 
          onValueChange={(value) => onEncryptionChange(value as "ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305")}
        >
          <SelectTrigger className="w-[180px]">
            <Lock className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Encryption Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ML-KEM-1024">ML-KEM-1024 (FIPS 205)</SelectItem>
            <SelectItem value="Hybrid">Hybrid PQC+Classical</SelectItem>
            <SelectItem value="ChaCha20-Poly1305">ChaCha20-Poly1305</SelectItem>
          </SelectContent>
        </Select>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                type="button"
                onClick={toggleSecurityInfo}
              >
                <ShieldCheck className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Show/Hide Security Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a secure message..."
        className={cn(
          "pr-14 py-3 min-h-[60px] max-h-[160px] transition-all duration-200",
          isFocused ? "glass" : "bg-background"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isEncrypting}
      />

      <Button
        type="submit"
        size="icon"
        className={cn(
          "absolute right-2 bottom-2",
          value.trim() === "" || isEncrypting ? "opacity-50 cursor-not-allowed" : "opacity-100"
        )}
        disabled={value.trim() === "" || isEncrypting}
      >
        <Send className="h-4 w-4" />
      </Button>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-3 w-3 text-accent" />
          <span>NIST FIPS 205 PQC Secure</span>
        </div>
        {didVerified && (
          <div className="flex items-center space-x-2">
            <Database className="h-3 w-3 text-accent" />
            <span>DID Verified</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default SecureMessageInput;
