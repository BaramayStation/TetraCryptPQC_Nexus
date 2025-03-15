
import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, MessageSquare, Key, FileText, Server, Building2, BarChart3 } from "lucide-react";

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
              Post-Quantum Cryptography for Secure AI-Driven Enterprises
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

      {/* Features Section */}
      <section className="py-16 bg-background">
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
                  End-to-end encrypted communications with post-quantum security
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
                  Advanced cryptographic key management with quantum resistance
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
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  AI-enhanced security monitoring and threat analysis
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
                  Channel-based secure communication for teams and organizations
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
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Execution</CardTitle>
                <CardDescription>
                  Podman-based secure execution environment for sensitive operations
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/enterprise">Open Execution</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Organization Management</CardTitle>
                <CardDescription>
                  Advanced identity and access management for enterprises
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/settings">Manage Access</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 bg-secondary/10">
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
                      <span className="font-medium">ML-KEM-1024</span>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Enterprise?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get started with TetraCryptPQC Enterprise Suite today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/documentation">
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
