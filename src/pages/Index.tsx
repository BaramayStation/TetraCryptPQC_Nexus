
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Key, BarChart, ArrowRight, MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already set up
    const user = getUserProfile();
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);
  
  const handleGetStarted = () => {
    navigate("/chat");
  };
  
  // Feature data for the landing page
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Post-Quantum Security",
      description: "Protected against both classical and quantum computer attacks with Kyber-1024 and Falcon-1024."
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: "End-to-End Encryption",
      description: "Your messages are encrypted on your device and can only be decrypted by the recipient."
    },
    {
      icon: <Key className="h-6 w-6 text-accent" />,
      title: "Perfect Forward Secrecy",
      description: "New encryption keys for each conversation ensure past messages remain secure."
    },
    {
      icon: <BarChart className="h-6 w-6 text-accent" />,
      title: "Zero Knowledge Design",
      description: "No one, not even the server, can access your conversations or metadata."
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-background z-0"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
          <Badge className="mb-6 animate-fade-in" variant="outline">
            Post-Quantum Cryptography
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            The Future of <span className="text-accent">Secure</span> Messaging
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
            Communicate with confidence using post-quantum encryption that protects your privacy today and tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button onClick={handleGetStarted} size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quantum-Resistant Security</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our messaging system uses advanced cryptographic algorithms designed to resist attacks from both classical and quantum computers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlassContainer 
                key={index} 
                className="p-6" 
                animation="slide-up" 
                hover={true}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <GlassContainer className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0 animate-float">
              <MessageSquare className="h-12 w-12 text-accent" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start secure messaging?</h2>
              <p className="text-muted-foreground mb-6">
                Create your account in seconds and start sending end-to-end encrypted messages protected by post-quantum cryptography.
              </p>
              <Button onClick={handleGetStarted} size="lg" className="gap-2">
                Start Messaging
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </GlassContainer>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Quantum Secure Messaging
              </h2>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} • Post-Quantum Encrypted • Open Source
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
