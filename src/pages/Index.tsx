
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Database, Key, MessageSquare, Fingerprint } from "lucide-react";
import SecurityArchitecture from "@/components/security/SecurityArchitecture";
import PQCKeyGen from "@/components/PQCKeyGen";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
      <div className="container py-10 space-y-10">
        {/* Hero Section */}
        <GlassContainer className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Shield className="h-16 w-16 text-accent" />
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">TetraCryptPQC_Nexus</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The next-generation, fully quantum-secure Web3 messaging and identity verification framework.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link to="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Secure Messaging
                </Link>
              </Button>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
          </div>
        </GlassContainer>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassContainer className="p-6 space-y-4">
            <div className="bg-accent/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Post-Quantum Security</h3>
            <p className="text-muted-foreground">
              NIST FIPS 205/206 compliant algorithms resist both classical and quantum attacks.
            </p>
          </GlassContainer>
          
          <GlassContainer className="p-6 space-y-4">
            <div className="bg-accent/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <Database className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Decentralized Identity</h3>
            <p className="text-muted-foreground">
              Self-sovereign identity with zk-STARK verification for trustless authentication.
            </p>
          </GlassContainer>
          
          <GlassContainer className="p-6 space-y-4">
            <div className="bg-accent/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <Key className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">End-to-End Encryption</h3>
            <p className="text-muted-foreground">
              AES-256-GCM and ChaCha20-Poly1305 with perfect forward secrecy.
            </p>
          </GlassContainer>
        </div>

        {/* Security Architecture */}
        <SecurityArchitecture />

        {/* Key Generation */}
        <PQCKeyGen />

        {/* About/Documentation */}
        <GlassContainer className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">About TetraCryptPQC_Nexus</h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            TetraCryptPQC_Nexus is designed to resist both classical and quantum computing threats 
            while providing decentralized, secure, and privacy-preserving communication.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Security Architecture
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-accent mt-1" />
                  <span>ML-KEM-1024 / Kyber for Key Exchange</span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="h-4 w-4 text-accent mt-1" />
                  <span>SLH-DSA / Dilithium for Digital Signatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="h-4 w-4 text-accent mt-1" />
                  <span>StarkNet Smart Contracts for Storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Fingerprint className="h-4 w-4 text-accent mt-1" />
                  <span>zk-STARK Proofs for Message Integrity</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Implementation</h3>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>NIST-standardized Post-Quantum Cryptography (PQC)</li>
                <li>Zero-Trust Architecture with Cryptographic Integrity</li>
                <li>IPFS & Web3Storage for Decentralized Storage</li>
                <li>StarkNet Smart Contracts for Verification</li>
                <li>Hardware Security Module (HSM) Support</li>
                <li>End-to-End Encrypted Messaging</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button>View Documentation</Button>
          </div>
        </GlassContainer>
      </div>
    </MainLayout>
  );
};

export default Index;
