
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Key, Rocket, Lock, Cpu, Globe } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Enterprise-Grade Quantum Security</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security solutions for the post-quantum era
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<MessageSquare className="h-6 w-6 text-primary" />} 
            title="Secure Messaging" 
            description="End-to-end encrypted communications with post-quantum security using ML-KEM-1024 and SLH-DSA"
            link="/chat"
            linkText="Open Messaging"
          />

          <FeatureCard 
            icon={<Key className="h-6 w-6 text-primary" />} 
            title="Key Management" 
            description="Advanced quantum-resistant key management with HSM and QKD integration"
            link="/key-management"
            linkText="Manage Keys"
          />

          <FeatureCard 
            icon={<Rocket className="h-6 w-6 text-primary" />} 
            title="Interstellar DeFi" 
            description="UM1 token integration with million-year sustainability for interstellar economies"
            link="/enterprise"
            linkText="Enterprise Suite"
          />

          <FeatureCard 
            icon={<Lock className="h-6 w-6 text-primary" />} 
            title="Secure Communication" 
            description="Homomorphic encryption and zero-knowledge proofs for private, verifiable communication"
            link="/secure-communication"
            linkText="Open Channels"
          />

          <FeatureCard 
            icon={<Cpu className="h-6 w-6 text-primary" />} 
            title="AI Governance" 
            description="AI-driven policy optimization for autonomous economic management across light-years"
            link="/enterprise"
            linkText="View Governance"
          />

          <FeatureCard 
            icon={<Globe className="h-6 w-6 text-primary" />} 
            title="StarkNet Integration" 
            description="zk-STARK-powered smart contracts for scalable, verifiable interstellar transactions"
            link="/documentation"
            linkText="Learn More"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureCard = ({ icon, title, description, link, linkText }: FeatureCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturesSection;
