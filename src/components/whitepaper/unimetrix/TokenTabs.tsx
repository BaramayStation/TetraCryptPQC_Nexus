
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Clock, Cpu, Rocket } from "lucide-react";
import OverviewTab from "./OverviewTab";
import TokenomicsTab from "./TokenomicsTab";
import TechnologyTab from "./TechnologyTab";
import EvolutionTab from "./EvolutionTab";

const TokenTabs = () => {
  return (
    <Tabs defaultValue="overview" className="mt-4">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="overview" className="text-xs">
          <Brain className="h-3.5 w-3.5 mr-1" /> Overview
        </TabsTrigger>
        <TabsTrigger value="tokenomics" className="text-xs">
          <Clock className="h-3.5 w-3.5 mr-1" /> Million-Year Economics
        </TabsTrigger>
        <TabsTrigger value="technology" className="text-xs">
          <Cpu className="h-3.5 w-3.5 mr-1" /> Quantum Technology
        </TabsTrigger>
        <TabsTrigger value="evolution" className="text-xs">
          <Rocket className="h-3.5 w-3.5 mr-1" /> Civilization Evolution
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="tokenomics">
        <TokenomicsTab />
      </TabsContent>
      
      <TabsContent value="technology">
        <TechnologyTab />
      </TabsContent>
      
      <TabsContent value="evolution">
        <EvolutionTab />
      </TabsContent>
    </Tabs>
  );
};

export default TokenTabs;
