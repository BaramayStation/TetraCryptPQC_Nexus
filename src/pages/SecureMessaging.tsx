
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SecureMessagingSystem from "@/components/secure-messaging/SecureMessagingSystem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Info } from "lucide-react";

const SecureMessaging: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Quantum-Resistant Secure Messaging</h1>
        <p className="text-muted-foreground">
          End-to-end encrypted communication with NIST FIPS 205/206 compliant post-quantum cryptography
        </p>
      </div>
      
      <Alert className="bg-muted border-border/60">
        <Info className="h-4 w-4" />
        <AlertTitle>Military-Grade Encryption</AlertTitle>
        <AlertDescription>
          All messages are protected with ML-KEM-1024 and ML-DSA-87 algorithms for post-quantum security.
          Zero-knowledge proofs ensure perfect forward secrecy and quantum-resistant verification.
        </AlertDescription>
      </Alert>
      
      <SecureMessagingSystem 
        currentUserId="current-user"
        currentUserName="Agent Cooper"
      />
      
      <Card className="bg-card/50 border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Technical Security Details
          </CardTitle>
          <CardDescription>
            Post-quantum cryptographic protocols and security measures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Encryption</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ML-KEM-1024 (CRYSTALS-Kyber) for key encapsulation</li>
                <li>• AES-256-GCM for symmetric encryption</li>
                <li>• HKDF-SHA-512 for key derivation</li>
                <li>• Perfect forward secrecy with ephemeral keys</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Authentication</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ML-DSA-87 (CRYSTALS-Dilithium) for signatures</li>
                <li>• Zero-knowledge identity verification</li>
                <li>• Hardware-backed secure element (when available)</li>
                <li>• Multi-factor biometric authentication</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Security Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time quantum threat monitoring</li>
                <li>• Automatic key rotation every 7-30 days</li>
                <li>• Secure deletion with verification</li>
                <li>• Tamper-evident timestamping</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p>
              <strong>Compliance:</strong> NIST FIPS 205/206, FIPS 140-3, NSA CSfC, and Common Criteria EAL 5+
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureMessaging;
