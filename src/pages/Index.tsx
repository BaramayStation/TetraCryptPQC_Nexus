
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/lib/storage";
import { MainLayout } from "@/layout/MainLayout";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Lock, Key, Database, Cpu, FileCode, ChevronDown, CheckCircle2, ExternalLink } from "lucide-react";
import { staggeredDelay } from "@/lib/animations";

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    // Check if user is already set up
    const user = getUserProfile();
    if (user) {
      navigate("/chat");
    }
    
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);
  
  const handleGetStarted = () => {
    navigate("/chat");
  };
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Features data with staggered animation delays
  const featureDelays = staggeredDelay(100, 100, 6);
  
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Post-Quantum Security",
      description: "Protected by NIST FIPS 205/206 compliant ML-KEM and SLH-DSA cryptography resistant to quantum attacks.",
      delay: featureDelays[0]
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: "Zero-Trust Architecture",
      description: "End-to-end encryption with no centralized trust points and optional decentralized identity verification.",
      delay: featureDelays[1]
    },
    {
      icon: <Key className="h-6 w-6 text-accent" />,
      title: "Quantum Key Distribution",
      description: "Simulation of quantum-resistant key exchange with perfect forward secrecy and HSM integration.",
      delay: featureDelays[2]
    },
    {
      icon: <Database className="h-6 w-6 text-accent" />,
      title: "Decentralized Identity",
      description: "Optional Web3 integration with DIDs (Decentralized Identifiers) and zero-knowledge proofs.",
      delay: featureDelays[3]
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" />,
      title: "Homomorphic Encryption",
      description: "Privacy-preserving computation capabilities allowing operations on encrypted data.",
      delay: featureDelays[4]
    },
    {
      icon: <FileCode className="h-6 w-6 text-accent" />,
      title: "Open Source Security",
      description: "100% open source implementation with transparent cryptographic primitives for public audit.",
      delay: featureDelays[5]
    }
  ];
  
  // Benefits with security features
  const benefits = [
    "NIST FIPS 205/206 compliant algorithms",
    "Resistant to both classical and quantum attacks",
    "Decentralized identity verification",
    "Privacy-preserving computation",
    "Hardware security module integration",
    "Perfect forward secrecy",
    "Zero-knowledge proofs for authentication"
  ];
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-background z-0"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge 
              className="mb-6 animate-fade-in bg-accent/10 text-accent hover:bg-accent/20"
              variant="outline"
            >
              NIST FIPS 205/206 Compliant
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              TetraCrypt<span className="text-accent">PQC</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              The Quantum-Secure Web3 Messaging & Identity Framework
            </p>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "150ms" }}>
              Designed for real-world implementation of post-quantum cryptography, TetraCryptPQC provides open-source tools for developers and organizations to secure communications against both classical and quantum threats.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button onClick={handleGetStarted} size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open("https://github.com/BaramayStation/TetraCryptPQC-Nexus", "_blank")}
                className="gap-2"
              >
                GitHub Repository
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Scroll Down Indicator */}
            <div 
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-12 cursor-pointer transition-opacity duration-500 ${hasScrolled ? 'opacity-0' : 'opacity-100'}`}
              onClick={scrollToFeatures}
            >
              <span className="text-sm text-muted-foreground mb-2">Discover More</span>
              <ChevronDown className="h-6 w-6 text-accent animate-bounce" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Future-Proof Security
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quantum-Resistant Framework
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TetraCryptPQC implements the latest NIST standardized post-quantum cryptography algorithms, designed for real-world applications and open-source adoption.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassContainer 
                key={index} 
                className="p-6" 
                animation="slide-up" 
                hover={true}
                delay={feature.delay}
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
      
      {/* Security Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4" variant="outline">Technical Specifications</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Architecture</h2>
                <p className="text-muted-foreground mb-8">
                  TetraCryptPQC follows NIST standards and best practices for quantum-resistant security. Our framework is designed for the most security-critical applications.
                </p>
                
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button onClick={handleGetStarted} className="group">
                    Experience Quantum-Secure Messaging
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              <GlassContainer animation="blur-in" className="overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
                  <h3 className="text-xl font-semibold mb-4">Cryptographic Primitives</h3>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <div className="p-3 bg-black/10 rounded-md">
                      <p className="text-accent">// ML-KEM-1024 (Key Encapsulation)</p>
                      <p>const keyPair = await generateMLKEMKeypair();</p>
                    </div>
                    
                    <div className="p-3 bg-black/10 rounded-md">
                      <p className="text-accent">// SLH-DSA (Digital Signatures)</p>
                      <p>const signature = await signMessage(message, privateKey);</p>
                    </div>
                    
                    <div className="p-3 bg-black/10 rounded-md">
                      <p className="text-accent">// Decentralized Identity (DID)</p>
                      <p>const didDocument = await generateDID();</p>
                    </div>
                    
                    <div className="p-3 bg-black/10 rounded-md">
                      <p className="text-accent">// Zero-Knowledge Proof</p>
                      <p>const zkProof = await generateZKProof(message);</p>
                    </div>
                  </div>
                </div>
              </GlassContainer>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="outline">
              Open Source Project
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to implement quantum-secure messaging?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              TetraCryptPQC is 100% open source and ready for real-world implementation. Start building quantum-secure applications today.
            </p>
            
            <Button onClick={handleGetStarted} size="lg" className="group">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
