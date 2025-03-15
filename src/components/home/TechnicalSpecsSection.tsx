
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const TechnicalSpecsSection = () => {
  return (
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
                <TechSpec 
                  title="ML-KEM-1024 (Kyber)"
                  description="Lattice-based key encapsulation with 256-bit quantum security level"
                />
                <TechSpec 
                  title="Hybrid X25519 + ML-KEM"
                  description="Combined classical and post-quantum security for transition period"
                />
                <TechSpec 
                  title="Quantum Key Distribution (QKD)"
                  description="Simulated BB84 protocol for information-theoretic security"
                />
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
                <TechSpec 
                  title="SLH-DSA (Dilithium-5)"
                  description="Stateless hash-based digital signature algorithm"
                />
                <TechSpec 
                  title="Falcon-512"
                  description="Fast lattice-based compact signatures"
                />
                <TechSpec 
                  title="zk-STARK Proofs"
                  description="Transparent, scalable zero-knowledge proofs via StarkNet"
                />
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

interface TechSpecProps {
  title: string;
  description: string;
}

const TechSpec = ({ title, description }: TechSpecProps) => {
  return (
    <li className="flex items-start">
      <Shield className="h-5 w-5 text-green-500 mr-2" />
      <div>
        <span className="font-medium">{title}</span>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  );
};

export default TechnicalSpecsSection;
