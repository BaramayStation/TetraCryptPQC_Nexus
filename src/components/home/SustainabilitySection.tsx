
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, Cpu, Rocket, Shield } from "lucide-react";

const SustainabilitySection = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Million-Year Financial Sustainability</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            UM1 token secured by TetraCryptPQC for sustainable interstellar economies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SustainabilityCard 
            icon={<Clock className="h-6 w-6 text-accent" />}
            title="Million-Year Liquidity"
            description="Locked token distribution system"
            features={[
              "1 trillion UM1 tokens locked in smart contracts",
              "1 million UM1 released annually for 1 million years",
              "Quantum-secure multi-signature governance"
            ]}
          />
          
          <SustainabilityCard 
            icon={<Cpu className="h-6 w-6 text-accent" />}
            title="AI-Driven Governance"
            description="Autonomous economic management"
            features={[
              "Adaptive monetary policy based on economic data",
              "Privacy-preserving analytics with homomorphic encryption",
              "Self-evolving algorithms for generational adaptation"
            ]}
          />
          
          <SustainabilityCard 
            icon={<Rocket className="h-6 w-6 text-accent" />}
            title="Interstellar Applications"
            description="Post-human economic infrastructure"
            features={[
              "Cross-planetary settlement with light-speed latency compensation",
              "Autonomous economic systems for post-human civilizations",
              "Decentralized resources allocation across star systems"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

interface SustainabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const SustainabilityCard = ({ icon, title, description, features }: SustainabilityCardProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <div className="mb-2 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-2.5 w-2.5 text-accent" />
              </div>
              <p className="text-muted-foreground">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SustainabilitySection;
