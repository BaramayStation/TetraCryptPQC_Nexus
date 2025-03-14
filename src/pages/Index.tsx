import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/lib/storage";
import { MainLayout } from "@/layout/MainLayout";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Lock, Key, Database, Cpu, FileCode, ChevronDown, CheckCircle2, ExternalLink } from "lucide-react";
import { staggeredDelay } from "@/lib/animations";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // ✅ Auto-Navigate if User is Already Logged In
    if (getUserProfile()) navigate("/chat");

    // ✅ Optimized Scroll Listener (Avoid Unnecessary Renders)
    const handleScroll = () => setHasScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: "smooth" });

  const featureDelays = staggeredDelay(100, 100, 6);

  // ✅ Core Features (Quantum-Secure Cryptography)
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
      description: "Web3-compatible DIDs (Decentralized Identifiers) secured with zk-STARKs and post-quantum cryptography.",
      delay: featureDelays[3]
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" />,
      title: "Homomorphic Encryption",
      description: "Privacy-preserving computation capabilities allowing operations on encrypted data without decryption.",
      delay: featureDelays[4]
    },
    {
      icon: <FileCode className="h-6 w-6 text-accent" />,
      title: "Open Source Security",
      description: "Fully auditable, open-source implementation following NIST PQC standards and best practices.",
      delay: featureDelays[5]
    }
  ];

  // ✅ Security Benefits
  const benefits = [
    "NIST FIPS 205/206 compliant encryption",
    "Resistant to both classical and quantum attacks",
    "Zero-Trust decentralized identity verification",
    "Post-Quantum zk-STARK proofs",
    "Hardware Security Module (HSM) integration",
    "Perfect Forward Secrecy (PFS)",
    "Quantum Key Distribution (QKD)"
  ];

  return (
    <MainLayout>
      {/* ✅ Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-background"></div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20" variant="outline">
              NIST FIPS 205/206 Compliant
            </Badge>

            <h1 className="text-5xl font-bold mb-6">TetraCrypt<span className="text-accent">PQC</span></h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              The Quantum-Secure Web3 Messaging & Identity Framework
            </p>

            <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-10">
              A fully open-source, post-quantum cryptography framework designed for developers and organizations securing against quantum threats.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigate("/chat")} size="lg" className="group">
                Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://github.com/BaramayStation/TetraCryptPQC-Nexus", "_blank")}
                className="gap-2"
              >
                GitHub Repository <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Scroll Down Indicator */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity ${hasScrolled ? 'opacity-0' : 'opacity-100'}`} onClick={scrollToFeatures}>
              <ChevronDown className="h-6 w-6 text-accent animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quantum-Resistant Framework</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Implementing the latest NIST-standardized post-quantum cryptography algorithms for real-world security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassContainer key={index} className="p-6" animation="slide-up" hover delay={feature.delay}>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Security Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Security Architecture</h2>
          <ul className="max-w-3xl mx-auto space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;