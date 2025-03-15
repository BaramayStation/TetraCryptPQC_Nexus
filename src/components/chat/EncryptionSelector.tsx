
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react"; // Using lucide-react instead of radix icons
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield } from "lucide-react";

export interface EncryptionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EncryptionSelector: React.FC<EncryptionSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Shield className="h-4 w-4 text-muted-foreground" />
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select encryption" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ML-KEM-1024">
            <div className="flex items-center">
              <span>ML-KEM-1024</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="ml-2">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      NIST standardized post-quantum key encapsulation mechanism (FIPS 205),
                      providing 256-bit security level against quantum computers.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SelectItem>
          <SelectItem value="Hybrid">
            <div className="flex items-center">
              <span>Hybrid PQC+Classical</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="ml-2">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Combined ML-KEM + ECC for hybrid protection against both
                      classical and quantum attacks. Recommended for maximum security.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SelectItem>
          <SelectItem value="ChaCha20-Poly1305">
            <div className="flex items-center">
              <span>ChaCha20-Poly1305</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="ml-2">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      High-performance authenticated encryption with excellent security
                      properties for classical computing threats.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EncryptionSelector;
