
import React from 'react';
import { MainLayout } from '@/layout/MainLayout';
import FailsafeNetworkPanel from '@/components/failsafe/FailsafeNetworkPanel';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Shield, Radio, Lock, ServerCrash, HardDrive, Network, LinkIcon } from 'lucide-react';

const FailsafeNetwork: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Multi-Layer Failsafe Network</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          TetraCryptPQC implements a comprehensive multi-layer failsafe infrastructure that ensures 
          continued operation during infrastructure failures, network outages, or cryptographic breakthroughs.
          Each component has multiple implementations that can be automatically or manually activated.
        </p>
        
        <Alert className="border-primary/50 bg-primary/5 max-w-3xl">
          <Shield className="h-4 w-4 text-primary" />
          <AlertTitle>Layered Failsafe Architecture</AlertTitle>
          <AlertDescription>
            This system provides automatic detection and failover for cryptography, storage, 
            communication, identity, and execution environments, ensuring continual secure operation
            even during extreme scenarios.
          </AlertDescription>
        </Alert>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Multi-Algorithm Cryptography
              </CardTitle>
              <CardDescription>Cryptographic Resilience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>ML-KEM (Kyber) primary implementation</li>
                <li>BIKE secondary implementation</li>
                <li>FrodoKEM tertiary implementation</li>
                <li>SLH-DSA (Dilithium) for signatures</li>
                <li>Automatic algorithm switching on failure</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                Distributed Storage
              </CardTitle>
              <CardDescription>Data Resilience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Encrypted local storage primary</li>
                <li>IndexedDB fallback storage</li>
                <li>In-memory emergency storage</li>
                <li>P2P distributed storage option</li>
                <li>Web3 decentralized storage option</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Radio className="h-5 w-5 text-primary" />
                Multi-Protocol Communication
              </CardTitle>
              <CardDescription>Network Resilience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>WebSocket primary transport</li>
                <li>WebRTC peer-to-peer fallback</li>
                <li>HTTP long-polling tertiary option</li>
                <li>Automatic protocol negotiation</li>
                <li>Cross-platform libp2p compatibility</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              Cross-Platform Implementation Support
            </CardTitle>
            <CardDescription>
              Multi-language failsafe for maximum compatibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Core Implementations</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>go-libp2p for server environments</li>
                  <li>js-libp2p for browsers & Node.js</li>
                  <li>rust-libp2p with WebAssembly support</li>
                  <li>py-libp2p for data science applications</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Alternative Implementations</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>cpp-libp2p for performance-critical systems</li>
                  <li>swift-libp2p for iOS applications</li>
                  <li>jvm-libp2p for Java/Kotlin environments</li>
                  <li>dotnet-libp2p for .NET compatibility</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Implementation Language Detection & Switching</h3>
              <p className="text-sm text-muted-foreground">
                TetraCryptPQC's failsafe system automatically detects the optimal implementation 
                for the current environment and can dynamically switch between implementations
                based on availability and performance metrics.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <FailsafeNetworkPanel />
      </div>
    </MainLayout>
  );
};

export default FailsafeNetwork;
