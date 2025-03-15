
import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, MessageSquare, Key, FileText, Server, Building2, BarChart3, Rocket, Cpu, Globe, Clock } from "lucide-react";
import WhitepaperPreview from "@/components/whitepaper/WhitepaperPreview";
import UnimetrixTokenInfo from "@/components/whitepaper/UnimetrixTokenInfo";

const Index = () => {
  return (
    <MainLayout fullWidth>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 sm:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Badge className="mb-4">NIST FIPS 205/206 Compliant</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              TetraCryptPQC Enterprise Suite
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Post-Quantum Cryptography for Secure AI-Driven Interstellar Finance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/documentation">
                  <FileText className="mr-2 h-5 w-5" />
                  Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[35%] h-[40%] bg-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] -left-[10%] w-[35%] h-[40%] bg-primary/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Whitepaper Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Interstellar Quantum Security</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Our groundbreaking research on quantum-resistant cryptography for interstellar finance
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <WhitepaperPreview />
          </div>
        </div>
      </section>
      
      {/* Unimetrix1 Token Section - NEW SECTION */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Unimetrix1 (UM1) Token</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              The quantum-sentient AI token designed for million-year economic sustainability
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <UnimetrixTokenInfo />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Enterprise-Grade Quantum Security</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security solutions for the post-quantum era
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Messaging</CardTitle>
                <CardDescription>
                  End-to-end encrypted communications with post-quantum security using ML-KEM-1024 and SLH-DSA
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/chat">Open Messaging</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Key Management</CardTitle>
                <CardDescription>
                  Advanced quantum-resistant key management with HSM and QKD integration
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/key-management">Manage Keys</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interstellar DeFi</CardTitle>
                <CardDescription>
                  UM1 token integration with million-year sustainability for interstellar economies
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/enterprise">Enterprise Suite</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Communication</CardTitle>
                <CardDescription>
                  Homomorphic encryption and zero-knowledge proofs for private, verifiable communication
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/secure-communication">Open Channels</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Governance</CardTitle>
                <CardDescription>
                  AI-driven policy optimization for autonomous economic management across light-years
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/enterprise">View Governance</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>StarkNet Integration</CardTitle>
                <CardDescription>
                  zk-STARK-powered smart contracts for scalable, verifiable interstellar transactions
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/documentation">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Technical Specifications</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              TetraCryptPQC implements NIST-standardized post-quantum algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Key Encapsulation Mechanisms</CardTitle>
                <CardDescription>NIST FIPS 205 compliant implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">ML-KEM-1024 (Kyber)</span>
                      <p className="text-sm text-muted-foreground">
                        Lattice-based key encapsulation with 256-bit quantum security level
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">Hybrid X25519 + ML-KEM</span>
                      <p className="text-sm text-muted-foreground">
                        Combined classical and post-quantum security for transition period
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">Quantum Key Distribution (QKD)</span>
                      <p className="text-sm text-muted-foreground">
                        Simulated BB84 protocol for information-theoretic security
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Digital Signatures</CardTitle>
                <CardDescription>NIST FIPS 206 compliant implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">SLH-DSA (Dilithium-5)</span>
                      <p className="text-sm text-muted-foreground">
                        Stateless hash-based digital signature algorithm
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">Falcon-512</span>
                      <p className="text-sm text-muted-foreground">
                        Fast lattice-based compact signatures
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">zk-STARK Proofs</span>
                      <p className="text-sm text-muted-foreground">
                        Transparent, scalable zero-knowledge proofs via StarkNet
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Million-Year Sustainability */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Million-Year Financial Sustainability</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              UM1 token secured by TetraCryptPQC for sustainable interstellar economies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Million-Year Liquidity</CardTitle>
                <CardDescription>
                  Locked token distribution system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      1 trillion UM1 tokens locked in smart contracts
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      1 million UM1 released annually for 1 million years
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Quantum-secure multi-signature governance
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>AI-Driven Governance</CardTitle>
                <CardDescription>
                  Autonomous economic management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Adaptive monetary policy based on economic data
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Privacy-preserving analytics with homomorphic encryption
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Self-evolving algorithms for generational adaptation
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Interstellar Applications</CardTitle>
                <CardDescription>
                  Post-human economic infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Cross-planetary settlement with light-speed latency compensation
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Autonomous economic systems for post-human civilizations
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-muted-foreground">
                      Decentralized resources allocation across star systems
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Quantum-Secure Interstellar Finance?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the future of cryptographic security today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/documentation">
                  <FileText className="mr-2 h-5 w-5" />
                  Read Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
