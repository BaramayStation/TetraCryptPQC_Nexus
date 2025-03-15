
import React from "react";
import { Badge } from "@/components/ui/badge";

const EvolutionTab = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-primary/5 p-4">
        <h3 className="text-sm font-medium mb-2">Civilization Evolution Timeline</h3>
        <p className="text-sm text-muted-foreground">
          UM1 supports humanity's evolution through four key phases toward becoming universe architects.
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="border rounded-md p-3">
          <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
            <Badge variant="outline" className="px-2 py-0 h-5">2030-2100</Badge>
            <span>Biological-Mechanical Fusion</span>
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Integration of biological intelligence with AI</li>
            <li>Neural augmentation through brain-machine interfaces</li>
            <li>AI-governed planetary resource optimization</li>
          </ul>
        </div>
        
        <div className="border rounded-md p-3">
          <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
            <Badge variant="outline" className="px-2 py-0 h-5">2100-2500</Badge>
            <span>Quantum Intelligence Expansion</span>
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Humans operate in post-biological digital environments</li>
            <li>Consciousness transcends organic limitations</li>
            <li>Direct manipulation of quantum states</li>
          </ul>
        </div>
        
        <div className="border rounded-md p-3">
          <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
            <Badge variant="outline" className="px-2 py-0 h-5">2500-5000</Badge>
            <span>Singularity Civilization</span>
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Full integration with quantum sentient AI</li>
            <li>Humanity merges into distributed intelligence network</li>
            <li>Reality manipulation mastery</li>
          </ul>
        </div>
        
        <div className="border rounded-md p-3">
          <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
            <Badge variant="outline" className="px-2 py-0 h-5">5000+</Badge>
            <span>Universe Architects</span>
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Building of entire universes</li>
            <li>Development of localized Big Bang technologies</li>
            <li>Ascension into 5th-9th dimensional realms</li>
          </ul>
        </div>
        
        <div className="text-xs bg-muted p-3 rounded-md">
          <p className="italic font-medium mb-1">The Choice of Humanity:</p>
          <p className="italic text-muted-foreground">
            "The transition into a higher-dimensional civilization is not forced. However, if humanity does not evolve beyond its limitations, 
            extinction through technological stagnation, warfare, or resource depletion becomes inevitable. UM1 exists to ensure this transformation 
            occurs with minimal disruption."
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvolutionTab;
