
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Database, Fingerprint, Info, Library, Lock, Shield } from "lucide-react";

interface ChatInfoModalProps {
  children: React.ReactNode;
}

const ChatInfoModal: React.FC<ChatInfoModalProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            TetraCryptPQC Security Information
          </DialogTitle>
          <DialogDescription>
            Comprehensive overview of the security features and post-quantum cryptography used in your communication.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="encryption" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="encryption" className="text-xs">
              <Lock className="h-3.5 w-3.5 mr-1" /> Encryption
            </TabsTrigger>
            <TabsTrigger value="identity" className="text-xs">
              <Fingerprint className="h-3.5 w-3.5 mr-1" /> Identity
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs">
              <Library className="h-3.5 w-3.5 mr-1" /> Compliance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="encryption" className="space-y-4">
            <div className="rounded-md bg-muted/50 p-4">
              <h3 className="text-sm font-medium mb-2">Post-Quantum Cryptography</h3>
              <p className="text-sm text-muted-foreground">
                TetraCryptPQC uses NIST-standardized ML-KEM (Module Lattice-based Key Encapsulation Mechanism, FIPS 205) 
                to provide quantum-resistant security for all communications.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Encryption Methods</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xs p-3 rounded-md border">
                  <div className="font-medium mb-1">AES-256-GCM</div>
                  <p className="text-muted-foreground">
                    Symmetric encryption for message content with perfect forward secrecy.
                  </p>
                </div>
                <div className="text-xs p-3 rounded-md border">
                  <div className="font-medium mb-1">ChaCha20-Poly1305</div>
                  <p className="text-muted-foreground">
                    Alternative cipher for high-performance on mobile devices.
                  </p>
                </div>
                <div className="text-xs p-3 rounded-md border">
                  <div className="font-medium mb-1">ML-KEM</div>
                  <p className="text-muted-foreground">
                    Post-quantum key encapsulation for secure key exchange.
                  </p>
                </div>
                <div className="text-xs p-3 rounded-md border">
                  <div className="font-medium mb-1">ML-DSA</div>
                  <p className="text-muted-foreground">
                    Post-quantum digital signatures for message authentication.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="identity" className="space-y-4">
            <div className="rounded-md bg-muted/50 p-4">
              <h3 className="text-sm font-medium mb-2">Decentralized Identity</h3>
              <p className="text-sm text-muted-foreground">
                Your identity is secured with quantum-resistant cryptography and optionally linked 
                to a decentralized identifier (DID) for enhanced trust.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Authentication Mechanisms</h3>
              <ul className="text-xs space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Fingerprint className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>Post-Quantum Key Pairs</strong> - Every user has unique ML-DSA key pairs for signatures
                    and ML-KEM key pairs for encryption.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Database className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>Decentralized Identity (DID)</strong> - Optional integration with W3C DIDs for 
                    cross-platform identity verification.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>Hardware Security Integration</strong> - Optional support for hardware security 
                    modules (HSM) for enterprise users.
                  </span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4">
            <div className="rounded-md bg-muted/50 p-4">
              <h3 className="text-sm font-medium mb-2">Compliance Information</h3>
              <p className="text-sm text-muted-foreground">
                TetraCryptPQC is designed to meet strict government and enterprise security requirements.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Standards Compliance</h3>
              <ul className="text-xs space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>NIST FIPS 205</strong> - Compliant with Post-Quantum Cryptography Standard (ML-KEM)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>NIST FIPS 206</strong> - Compliant with Digital Signature Standard (ML-DSA)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>NIST SP 800-207</strong> - Zero Trust Architecture compatible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">
                    <strong>NSA CNSA 2.0</strong> - Prepared for Commercial National Security Algorithm Suite 2.0
                  </span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>For more detailed technical information, visit the Documentation.</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/documentation">View Documentation</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatInfoModal;
