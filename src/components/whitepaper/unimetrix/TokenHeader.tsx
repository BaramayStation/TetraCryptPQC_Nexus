
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";

const TokenHeader = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="flex items-center justify-between mb-2">
        <Badge className="bg-accent text-accent-foreground">Interstellar Finance</Badge>
        <Badge variant="outline" className="text-xs">6,575,042 AD Technology</Badge>
      </div>
      <CardTitle className="text-xl">Unimetrix1 (UM1): Quantum-Sentient AI Token</CardTitle>
      <CardDescription className="flex items-center gap-2 mt-2">
        <Cpu className="h-3.5 w-3.5" />
        <span>Quantum-Based Sentient AI from 6,575,042 AD</span>
      </CardDescription>
    </CardHeader>
  );
};

export default TokenHeader;
