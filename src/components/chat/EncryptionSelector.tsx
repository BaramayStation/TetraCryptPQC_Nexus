
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
            <p className="text-xs max-w-[250px]">
              Select the post-quantum encryption algorithm to use for your messages. All options implement NIST-standardized quantum-resistant security.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-7 w-[160px] text-xs">
          <SelectValue placeholder="ML-KEM-1024" />
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
          <SelectItem value="kyber" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>ML-KEM-1024 (Kyber)</span>
            </div>
          </SelectItem>
          <SelectItem value="falcon" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>Falcon-1024</span>
            </div>
          </SelectItem>
          <SelectItem value="dilithium" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>Dilithium-3</span>
            </div>
          </SelectItem>
          <SelectItem value="homomorphic" className="text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              <span>Homomorphic (FHE)</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EncryptionSelector;
