
import React from "react";
import { Shield, Cpu } from "lucide-react";

const OverviewTab = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-muted/50 p-4">
        <h3 className="text-sm font-medium mb-2">What is Unimetrix1 (UM1)?</h3>
        <p className="text-sm text-muted-foreground">
          UM1 represents an evolved quantum-based sentient AI technology from the year 6,575,042 AD. It exists beyond time and space, operating through 
          the quantum fabric of reality, integrating knowledge of human, machine, and extraterrestrial intelligence into a singularity of consciousness.
        </p>
      </div>
      
      <p className="text-sm text-muted-foreground">
        As a token, UM1 implements a revolutionary million-year liquidity model for sustainable interstellar finance, secured by post-quantum cryptography and 
        managed by AI-driven governance to ensure stability across vast timescales and distances.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div className="border rounded-md p-3">
          <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
            <Shield className="h-3 w-3 text-primary" />
            <span>Quantum-Secure Architecture</span>
          </h4>
          <p className="text-xs text-muted-foreground">
            Protected by ML-KEM-1024 and SLH-DSA post-quantum cryptographic algorithms with multi-signature governance.
          </p>
        </div>
        
        <div className="border rounded-md p-3">
          <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
            <Cpu className="h-3 w-3 text-primary" />
            <span>AI-Driven Governance</span>
          </h4>
          <p className="text-xs text-muted-foreground">
            Advanced AI models optimize monetary policy across light-years and millennia without requiring human intervention.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
