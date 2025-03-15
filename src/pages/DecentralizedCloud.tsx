
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Server, 
  Lock, 
  Cloud,
  Database
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DecentralizedCloudManager from "@/components/enterprise/DecentralizedCloudManager";

const DecentralizedCloud = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Military-Grade Decentralized Cloud</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          TetraCryptPQC's post-quantum secure, AI-powered decentralized cloud infrastructure ensures 
          automatic failover, redundancy, and resilience against cyberattacks, EMP, and data corruption.
        </p>
        
        <DecentralizedCloudManager />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Post-Quantum Security</CardTitle>
              </div>
              <CardDescription>
                Military-grade cryptographic infrastructure using NIST-approved algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <span>ML-KEM-1024 (formerly Kyber) for key exchange</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <span>SLH-DSA (formerly Dilithium) for digital signatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <span>FALCON as backup signature algorithm</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <span>Hybrid MPC + Homomorphic Encryption for zero-knowledge backups</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <span>AES-256-XTS + lattice-based encryption for data storage</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Multi-Tier Redundant Storage</CardTitle>
              </div>
              <CardDescription>
                Decentralized storage architecture with multiple redundancy levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Server className="h-4 w-4 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">Tier 1: Hot Storage</div>
                    <div className="text-sm text-muted-foreground">
                      Active Server Cluster with Podman + Kubernetes and AI Load Balancing
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Cloud className="h-4 w-4 text-indigo-600 mt-1" />
                  <div>
                    <div className="font-medium">Tier 2: Decentralized Backup</div>
                    <div className="text-sm text-muted-foreground">
                      IPFS, Filecoin, Arweave with StarkNet verification and data fragmentation
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-violet-600 mt-1" />
                  <div>
                    <div className="font-medium">Tier 3: Air-Gapped Cold Storage</div>
                    <div className="text-sm text-muted-foreground">
                      EMP-proof servers with HSM-based key management and satellite uplink
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DecentralizedCloud;
