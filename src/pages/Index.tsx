
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Key, BarChart, ArrowRight, MessageSquare, FileCode, Database, Cpu } from "lucide-react";

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
      description: "Protected by NIST FIPS 205/206 compliant ML-KEM and SLH-DSA cryptography resistant to quantum attacks."
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: "Zero-Trust Architecture",
      description: "End-to-end encryption with no centralized trust points and optional decentralized identity verification."
    },
    {
      icon: <Key className="h-6 w-6 text-accent" />,
      title: "Quantum Key Distribution",
      description: "Simulation of quantum-resistant key exchange with perfect forward secrecy and HSM integration."
    },
    {
      icon: <Database className="h-6 w-6 text-accent" />,
      title: "Decentralized Identity",
      description: "Optional Web3 integration with DIDs (Decentralized Identifiers) and zero-knowledge proofs."
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" />,
      title: "Homomorphic Encryption",
      description: "Privacy-preserving computation capabilities allowing operations on encrypted data."
    },
    {
      icon: <FileCode className="h-6 w-6 text-accent" />,
      title: "Open Source Security",
      description: "100% open source implementation with transparent cryptographic primitives for public audit."
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
            NIST FIPS 205/206 Compliant
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            TetraCrypt<span className="text-accent">PQC</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            The Quantum-Secure Web3 Messaging & Identity Framework
          </p>
          
          <p className="text-sm md:text-md text-muted-foreground max-w-3xl mb-10 animate-slide-up" style={{ animationDelay: "150ms" }}>
            Designed for real-world implementation of post-quantum cryptography, TetraCryptPQC provides open-source tools for developers and organizations to secure communications against both classical and quantum threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button onClick={handleGetStarted} size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={() => window.open("https://github.com/tetra-pqc/tetracryptpqc", "_blank")}
            >
              GitHub Repository
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Future-Proof Security</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quantum-Resistant Framework</h2>
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
      
      {/* Technical Overview Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Technical Specifications</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TetraCryptPQC follows NIST standards and best practices for quantum-resistant security
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassContainer className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Post-Quantum Cryptography
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">ML-KEM-1024</span>: NIST FIPS 205 compliant key encapsulation mechanism for quantum-resistant key exchange
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">SLH-DSA</span>: NIST FIPS 205 compliant digital signature algorithm for quantum-resistant message authentication
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">AES-256-GCM</span>: NIST FIPS 197 compliant symmetric encryption for message content protection
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">ChaCha20-Poly1305</span>: Alternative high-performance authenticated encryption
                  </div>
                </li>
              </ul>
            </GlassContainer>
            
            <GlassContainer className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                Web3 Integration & Privacy
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">W3C DID</span>: Decentralized Identifiers for self-sovereign identity verification
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">Zero-Knowledge Proofs</span>: zk-SNARKs for privacy-preserving authentication without data exposure
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">Homomorphic Encryption</span>: Ability to perform computation on encrypted data without decryption
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-accent">✓</span>
                  </div>
                  <div>
                    <span className="font-medium">Hardware Security</span>: HSM and Trusted Execution Environment simulation for maximum key protection
                  </div>
                </li>
              </ul>
            </GlassContainer>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Real-World Applications</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Real-World Use</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TetraCryptPQC is built for practical implementation in various security-critical domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassContainer className="p-6" animation="fade-in" hover={true}>
              <h3 className="text-xl font-semibold mb-3">Financial Services</h3>
              <p className="text-muted-foreground">
                Secure banking communications, financial transactions, and customer data with quantum-resistant encryption.
              </p>
            </GlassContainer>
            
            <GlassContainer className="p-6" animation="fade-in" hover={true} style={{ animationDelay: "100ms" }}>
              <h3 className="text-xl font-semibold mb-3">Healthcare</h3>
              <p className="text-muted-foreground">
                Protect sensitive patient data, telemedicine communications, and medical records with future-proof encryption.
              </p>
            </GlassContainer>
            
            <GlassContainer className="p-6" animation="fade-in" hover={true} style={{ animationDelay: "200ms" }}>
              <h3 className="text-xl font-semibold mb-3">Government & Defense</h3>
              <p className="text-muted-foreground">
                Secure classified communications and critical infrastructure against current and future threats.
              </p>
            </GlassContainer>
            
            <GlassContainer className="p-6" animation="fade-in" hover={true} style={{ animationDelay: "300ms" }}>
              <h3 className="text-xl font-semibold mb-3">Enterprise Communications</h3>
              <p className="text-muted-foreground">
                Ensure business continuity with messaging systems resistant to quantum computing threats.
              </p>
            </GlassContainer>
            
            <GlassContainer className="p-6" animation="fade-in" hover={true} style={{ animationDelay: "400ms" }}>
              <h3 className="text-xl font-semibold mb-3">Web3 & Blockchain</h3>
              <p className="text-muted-foreground">
                Protect decentralized applications and smart contracts with quantum-resistant cryptography.
              </p>
            </GlassContainer>
            
            <GlassContainer className="p-6" animation="fade-in" hover={true} style={{ animationDelay: "500ms" }}>
              <h3 className="text-xl font-semibold mb-3">Personal Privacy</h3>
              <p className="text-muted-foreground">
                Give individuals control over their digital communications with open-source, auditable security.
              </p>
            </GlassContainer>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to secure your communications?</h2>
              <p className="text-muted-foreground mb-6">
                TetraCryptPQC is 100% open source and ready for real-world implementation. Start building quantum-secure applications today.
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
                TetraCryptPQC
              </h2>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} • NIST FIPS 205/206 Compliant • 100% Open Source
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
