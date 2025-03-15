
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import FailsafeContinuityPanel from "@/components/failsafe/FailsafeContinuityPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, Lock, Radio, Server, HardDrive } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FailsafeContinuity: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">COG-Grade Failsafe Continuity</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          TetraCryptPQC implements Continuity of Government (COG) grade disaster resilience that ensures
          post-quantum security during catastrophic events, including nation-state cyberattacks, infrastructure
          failure, and quantum computing breakthroughs.
        </p>
        
        <Alert className="border-accent/50 bg-accent/5">
          <AlertTriangle className="h-4 w-4 text-accent" />
          <AlertTitle>Multi-layered Disaster Resilience</AlertTitle>
          <AlertDescription>
            This system provides failsafe mechanisms for continuing secure operations in extreme scenarios,
            including internet blackouts, EMP attacks, and quantum computing breakthroughs.
          </AlertDescription>
        </Alert>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                PQC Cryptographic Resilience
              </CardTitle>
              <CardDescription>Algorithm Fallback System</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Multi-algorithm fallback (Kyber → BIKE → FrodoKEM)</li>
                <li>Signature backups (Dilithium → Falcon)</li>
                <li>Quantum-safe algorithm switching</li>
                <li>Zero-day vulnerability mitigation</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Radio className="h-5 w-5 text-primary" />
                Disaster Communication
              </CardTitle>
              <CardDescription>Resilient Network Architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Satellite-enabled mesh networks</li>
                <li>LoRa & Ham radio fallback communications</li>
                <li>Encrypted P2P offline messaging</li>
                <li>EMP-resistant communication hardware</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Decentralized Infrastructure
              </CardTitle>
              <CardDescription>Crisis-Resilient Systems</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Air-gapped backup systems</li>
                <li>Geographic distribution with MPC governance</li>
                <li>Self-healing Podman containers</li>
                <li>Quantum-resistant StarkNet verification</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <FailsafeContinuityPanel />
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              Disaster Recovery Operations
            </CardTitle>
            <CardDescription>
              Emergency response capabilities for extreme scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The TetraCryptPQC failsafe continuity system provides comprehensive disaster recovery
                operations for ensuring cryptographic security during extreme scenarios:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">Nation-State Cyberwarfare</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-driven PQC threat prediction with automatic quantum-resistant
                    algorithm switching and air-gapped backup systems.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">Banking System Collapse</h3>
                  <p className="text-sm text-muted-foreground">
                    PQC-based secure digital reserves with distributed MPC governance
                    ensuring continued financial operations.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">EMP & Electromagnetic Attacks</h3>
                  <p className="text-sm text-muted-foreground">
                    Faraday-protected secure hardware with quantum-resistant backup
                    for electromagnetic pulse protection.
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">Quantum Computing Breakthrough</h3>
                  <p className="text-sm text-muted-foreground">
                    Immediate migration to backup lattice-based cryptography with higher
                    security margins and non-public algorithms.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FailsafeContinuity;
