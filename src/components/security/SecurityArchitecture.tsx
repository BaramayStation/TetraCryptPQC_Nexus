
import React from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Key, Fingerprint, Database, Server } from "lucide-react";

const SecurityArchitecture = () => {
  return (
    <GlassContainer className="p-6 space-y-6" animation="fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          TetraCryptPQC Security Architecture
        </h2>
        <p className="text-sm text-muted-foreground">
          Our multi-layered security approach ensures protection against both classical and quantum threats
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Key className="h-4 w-4 text-accent" />
            Cryptographic Layer
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">ML-KEM-1024 (FIPS 205)</h4>
              <p className="text-muted-foreground">
                Module Lattice-based Key Encapsulation Mechanism provides quantum-resistant key exchange with 256-bit security level.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">SLH-DSA (FIPS 205)</h4>
              <p className="text-muted-foreground">
                Stateless Hash-based Digital Signature Algorithm ensures message integrity and authentication against quantum attacks.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">AES-256-GCM (FIPS 197)</h4>
              <p className="text-muted-foreground">
                Authenticated encryption providing confidentiality, integrity, and authenticity for message contents.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Database className="h-4 w-4 text-accent" />
            Identity & Privacy Layer
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">W3C Decentralized Identifiers (DIDs)</h4>
              <p className="text-muted-foreground">
                Self-sovereign identity verification without reliance on centralized authorities.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Zero-Knowledge Proofs</h4>
              <p className="text-muted-foreground">
                Verify identity and attributes without revealing sensitive information.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Homomorphic Encryption</h4>
              <p className="text-muted-foreground">
                Perform computation on encrypted data without exposing the plaintext.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-accent" />
            Key Management
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Perfect Forward Secrecy</h4>
              <p className="text-muted-foreground">
                Regular key rotation ensures compromised keys cannot decrypt past messages.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Quantum Key Distribution (QKD)</h4>
              <p className="text-muted-foreground">
                Simulation of quantum communication channels for ultra-secure key exchange.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Hardware Security</h4>
              <p className="text-muted-foreground">
                Simulated HSM integration protects private keys from extraction or misuse.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Server className="h-4 w-4 text-accent" />
            System Architecture
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Zero-Trust Security Model</h4>
              <p className="text-muted-foreground">
                No implicit trust, with verification required at every system boundary.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Decentralized Infrastructure</h4>
              <p className="text-muted-foreground">
                Optional federation and Web3 integration removes central points of failure.
              </p>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-lg">
              <h4 className="font-medium mb-1">Defense in Depth</h4>
              <p className="text-muted-foreground">
                Multiple security layers provide protection even if one layer is compromised.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border border-accent/20 rounded-lg bg-accent/5 mt-4">
        <h3 className="text-md font-medium flex items-center gap-2 mb-2">
          <Fingerprint className="h-4 w-4 text-accent" />
          Real-World Security Implementation
        </h3>
        <p className="text-sm text-muted-foreground">
          TetraCryptPQC is designed for genuine real-world security applications, following NIST standards and industry best practices. The cryptographic implementations are transparent and open-source, enabling public audit and verification. This framework offers practical protection against both current threats and future quantum computing attacks.
        </p>
      </div>
    </GlassContainer>
  );
};

export default SecurityArchitecture;
