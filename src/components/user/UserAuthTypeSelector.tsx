
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Lock } from "lucide-react";

interface UserAuthTypeSelectorProps {
  value: "standard" | "advanced";
  onChange: (value: "standard" | "advanced") => void;
}

const UserAuthTypeSelector: React.FC<UserAuthTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Select Authentication Level</div>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as "standard" | "advanced")}
        className="grid grid-cols-1 gap-4"
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 relative">
          <RadioGroupItem value="standard" id="standard" />
          <div className="flex-1">
            <Label htmlFor="standard" className="text-sm font-medium">Standard Security</Label>
            <p className="text-xs text-muted-foreground">
              Basic post-quantum protection with ML-KEM-768 for everyday communications
            </p>
          </div>
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex items-center space-x-2 border rounded-md p-3 relative border-accent/50 bg-accent/5">
          <RadioGroupItem value="advanced" id="advanced" />
          <div className="flex-1">
            <Label htmlFor="advanced" className="text-sm font-medium">Advanced Security</Label>
            <p className="text-xs text-muted-foreground">
              Military-grade protection with ML-KEM-1024 and multiple signature schemes
            </p>
          </div>
          <Shield className="h-5 w-5 text-accent" />
        </div>
      </RadioGroup>
    </div>
  );
};

export default UserAuthTypeSelector;
