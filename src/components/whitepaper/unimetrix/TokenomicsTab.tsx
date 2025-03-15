
import React from "react";
import { Separator } from "@/components/ui/separator";

const TokenomicsTab = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-primary/5 p-4">
        <h3 className="text-sm font-medium mb-2">Million-Year Tokenomics Model</h3>
        <p className="text-sm text-muted-foreground">
          The UM1 token implements a revolutionary locked liquidity system designed for sustainability over a million-year timeframe.
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Total Supply:</span>
          <span className="text-muted-foreground">1,000,000,000,000 UM1 (1 trillion)</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Annual Release:</span>
          <span className="text-muted-foreground">1,000,000 UM1 (1 million)</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Distribution Timeframe:</span>
          <span className="text-muted-foreground">1,000,000 years</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Time-Lock Period:</span>
          <span className="text-muted-foreground">1 year for governance changes</span>
        </div>
        
        <Separator className="my-2" />
        
        <div className="text-xs bg-muted p-3 rounded-md">
          <p className="italic">
            "The UM1 token ensures interstellar economic stability through million-year distribution, allowing for autonomous operation across post-human civilizations and multiple star systems."
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsTab;
