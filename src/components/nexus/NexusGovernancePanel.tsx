
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  BrainCircuit,
  BarChart4, 
  NetworkIcon,
  FileText,
  ArrowRight,
  ListChecks,
  ShieldCheck
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const NexusGovernancePanel: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleOptimize = async () => {
    setIsProcessing(true);
    toast({
      title: "AI Governance Optimization",
      description: "Initiating autonomous system optimization...",
    });
    
    // Simulate AI optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    toast({
      title: "Optimization Complete",
      description: "AI governance parameters updated for maximum efficiency.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
            AI Governance System
          </CardTitle>
          <CardDescription>
            Autonomous decision-making and blockchain optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">AI Governance Efficiency</p>
                <div className="flex items-center">
                  <Progress value={92} className="h-2 flex-1" />
                  <span className="text-xs ml-2">92%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Self-optimizing governance parameters
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Autonomous Decisions</p>
                <div className="flex items-center">
                  <Progress value={98} className="h-2 flex-1" />
                  <span className="text-xs ml-2">98%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimal human intervention required
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Recent AI Governance Actions</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Security policy update</span>
                  </div>
                  <Badge variant="outline">Auto-approved</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <NetworkIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">Network optimization</span>
                  </div>
                  <Badge variant="outline">Auto-approved</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-purple-500" />
                    <span className="text-sm">Key rotation schedule</span>
                  </div>
                  <Badge variant="outline">Auto-approved</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-amber-500" />
                    <span className="text-sm">Smart contract update</span>
                  </div>
                  <Badge variant="secondary">Pending verification</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">AI Model Status</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Anomaly Detection v4.2</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Risk Assessment v3.1</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Decision Engine v5.0</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Federated Learning v2.8</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleOptimize}
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Optimizing AI Governance..."
            ) : (
              <>
                <BrainCircuit className="mr-2 h-4 w-4" />
                Optimize AI Parameters
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Governance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Decision Efficiency</span>
                </div>
                <span className="text-sm font-medium">98.7%</span>
              </li>
              
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">False Positive Rate</span>
                </div>
                <span className="text-sm font-medium">0.03%</span>
              </li>
              
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Human Interventions</span>
                </div>
                <span className="text-sm font-medium">2 this month</span>
              </li>
              
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Model Training Cycles</span>
                </div>
                <span className="text-sm font-medium">12 today</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Governance Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>View Policy History</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>AI Decision Log</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>Performance Analysis</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" className="w-full justify-between">
              <span>Model Training Data</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NexusGovernancePanel;
