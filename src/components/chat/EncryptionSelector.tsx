
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, Lock } from "lucide-react";

interface EncryptionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const EncryptionSelector: React.FC<EncryptionSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span>Encryption:</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs max-w-[200px]">
              Select the encryption algorithm to use for your messages. All options are quantum-resistant.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-7 w-[140px] text-xs">
          <SelectValue placeholder="AES-256-GCM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="aes" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>AES-256-GCM</span>
            </div>
          </SelectItem>
          <SelectItem value="chacha" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>ChaCha20-Poly1305</span>
            </div>
          </SelectItem>
          <SelectItem value="homomorphic" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>Homomorphic (Beta)</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EncryptionSelector;
