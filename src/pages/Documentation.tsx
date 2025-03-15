
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Server, Lock, FileCode, Database, CreditCard, GitFork, Fingerprint, List, BookOpen, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          TetraCryptPQC Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Complete technical reference for the post-quantum cryptography framework
        </p>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="architecture" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden md:inline">Architecture</span>
          </TabsTrigger>
          <TabsTrigger value="cryptography" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Cryptography</span>
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            <span className="hidden md:inline">Implementation</span>
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">Deployment</span>
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" /> 
                TetraCryptPQC Overview
              </CardTitle>
              <CardDescription>
                A comprehensive post-quantum cryptography framework for secure messaging and identity verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                TetraCryptPQC is a fully-featured post-quantum cryptography framework designed to protect 
                systems and communications against both classical and quantum computing threats. It implements
                NIST FIPS 205/206 compliant cryptographic algorithms and provides a robust, future-proof
                security infrastructure.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Key Features</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>NIST-standardized post-quantum cryptography</li>
                    <li>Multi-layer cryptographic failsafe system</li>
                    <li>Zero-knowledge proof authentication</li>
                    <li>Decentralized identity verification</li>
                    <li>Secure P2P messaging with quantum resistance</li>
                    <li>Enterprise-grade key management</li>
                    <li>Formal verification and security auditing</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Security Standards</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>NIST FIPS 205 (ML-KEM) compliant</li>
                    <li>NIST FIPS 206 (SLH-DSA) compliant</li>
                    <li>Designed for 256-bit quantum security level</li>
                    <li>Beyond 2060 future-proofing</li>
                    <li>Compatible with DoD, NSA, and NATO requirements</li>
                    <li>Hardware security module integration</li>
                    <li>Formal verification of critical components</li>
                  </ul>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important Security Notice</AlertTitle>
                <AlertDescription>
                  TetraCryptPQC is designed for high-security environments. Proper key management and 
                  implementation are critical. Always follow the recommended deployment guidelines
                  and security best practices.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Documentation Guide
              </CardTitle>
              <CardDescription>
                How to use this documentation effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This documentation is organized into several sections to help you understand
                and implement TetraCryptPQC effectively:
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Architecture</TableCell>
                    <TableCell>System design, components, and interactions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Cryptography</TableCell>
                    <TableCell>Detailed information on the cryptographic algorithms and protocols</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Implementation</TableCell>
                    <TableCell>Code examples, API references, and integration guidelines</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Deployment</TableCell>
                    <TableCell>Installation, configuration, and operational security</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ARCHITECTURE TAB */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                System Architecture
              </CardTitle>
              <CardDescription>
                High-level design and component structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                TetraCryptPQC follows a modular, layered architecture with redundant security mechanisms
                and failsafe protocols. The system is designed to maintain security even if individual
                components are compromised.
              </p>

              <h3 className="text-lg font-semibold mt-4">Core Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Cryptographic Core</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>ML-KEM (Kyber) implementation</li>
                    <li>SLH-DSA (Dilithium) implementation</li>
                    <li>SPHINCS+ backup signatures</li>
                    <li>Hybrid encryption system</li>
                    <li>Key generation and management</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Failsafe System</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Multi-layered cryptographic redundancy</li>
                    <li>Automatic key rotation protocols</li>
                    <li>Algorithm agility framework</li>
                    <li>Fallback mechanisms</li>
                    <li>Emergency recovery systems</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Identity & Authentication</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Decentralized identity verification</li>
                    <li>Zero-knowledge proof authentication</li>
                    <li>Multi-factor authentication</li>
                    <li>Hardware security integration</li>
                    <li>Biometric verification protocols</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Secure Communication</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>End-to-end encrypted messaging</li>
                    <li>P2P secure networking</li>
                    <li>Perfect forward secrecy</li>
                    <li>Metadata protection</li>
                    <li>Secure group communications</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">Architectural Principles</h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Defense in Depth</AccordionTrigger>
                  <AccordionContent>
                    TetraCryptPQC employs multiple layers of security controls. Each layer provides
                    different security mechanisms, and the compromise of one layer does not compromise
                    the entire system. This includes cryptographic redundancy, with multiple algorithms
                    protecting the same data.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Cryptographic Agility</AccordionTrigger>
                  <AccordionContent>
                    The framework is designed to seamlessly transition between cryptographic algorithms
                    without disrupting operations. This ensures that as vulnerabilities are discovered
                    or new standards emerge, the system can quickly adapt without major reengineering.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Secure by Default</AccordionTrigger>
                  <AccordionContent>
                    All components are configured with the strongest security settings by default.
                    No insecure fallbacks are permitted, and cryptographic parameters always default
                    to the highest security level (256-bit quantum security).
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Zero Trust Architecture</AccordionTrigger>
                  <AccordionContent>
                    The system assumes no implicit trust between components. All communications are
                    authenticated and encrypted, even within internal subsystems. Every operation
                    requires verification of identity and authorization.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Formal Verification</AccordionTrigger>
                  <AccordionContent>
                    Critical components undergo formal mathematical verification to prove correctness
                    and security properties. This ensures that implementation flaws cannot compromise
                    the theoretical security guarantees of the underlying algorithms.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CRYPTOGRAPHY TAB */}
        <TabsContent value="cryptography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Post-Quantum Cryptographic Algorithms
              </CardTitle>
              <CardDescription>
                NIST-standardized algorithms and implementation details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="mb-6">
                <Shield className="h-4 w-4" />
                <AlertTitle>NIST/FIPS Compliance</AlertTitle>
                <AlertDescription>
                  TetraCryptPQC implements NIST FIPS 205 and FIPS 206 standard algorithms with the highest
                  security parameters, ensuring compatibility with government and military requirements.
                </AlertDescription>
              </Alert>

              <h3 className="text-lg font-semibold mt-4">Core Algorithms</h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Algorithm</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Security Level</TableHead>
                    <TableHead>Standard</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">ML-KEM-1024</TableCell>
                    <TableCell>Key Encapsulation</TableCell>
                    <TableCell>256-bit quantum</TableCell>
                    <TableCell>FIPS 205</TableCell>
                    <TableCell>Encryption, Key Exchange</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SLH-DSA-65</TableCell>
                    <TableCell>Digital Signature</TableCell>
                    <TableCell>192-bit quantum</TableCell>
                    <TableCell>FIPS 206</TableCell>
                    <TableCell>Authentication, Document Signing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SLH-DSA-87</TableCell>
                    <TableCell>Digital Signature</TableCell>
                    <TableCell>256-bit quantum</TableCell>
                    <TableCell>FIPS 206</TableCell>
                    <TableCell>Long-term Document Signing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FALCON-1024</TableCell>
                    <TableCell>Digital Signature</TableCell>
                    <TableCell>256-bit quantum</TableCell>
                    <TableCell>NIST Round 3</TableCell>
                    <TableCell>Backup Signature Algorithm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SPHINCS+-256</TableCell>
                    <TableCell>Digital Signature</TableCell>
                    <TableCell>256-bit quantum</TableCell>
                    <TableCell>NIST Round 3</TableCell>
                    <TableCell>Hash-based Fallback Signatures</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">AES-256-GCM</TableCell>
                    <TableCell>Symmetric Encryption</TableCell>
                    <TableCell>256-bit classical</TableCell>
                    <TableCell>FIPS 197</TableCell>
                    <TableCell>Hybrid Encryption</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SHA-3 / SHAKE-256</TableCell>
                    <TableCell>Hash Function / XOF</TableCell>
                    <TableCell>256-bit</TableCell>
                    <TableCell>FIPS 202</TableCell>
                    <TableCell>Hashing, KDF, PRNG</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-6">Hybrid Cryptography Implementation</h3>
              <p className="mb-4">
                TetraCryptPQC implements a hybrid cryptographic approach that combines 
                post-quantum algorithms with well-established classical algorithms,
                providing defense-in-depth against both quantum and classical attacks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Hybrid Encryption Protocol</h4>
                  <ol className="list-decimal pl-6 space-y-1 text-sm">
                    <li>Generate a random AES-256 symmetric key</li>
                    <li>Encapsulate the key using ML-KEM-1024</li>
                    <li>Also encapsulate using a classical algorithm (optional)</li>
                    <li>Encrypt the message with AES-256-GCM</li>
                    <li>Combine encapsulated keys and ciphertext</li>
                    <li>Sign the entire package with SLH-DSA</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Hybrid Authentication Protocol</h4>
                  <ol className="list-decimal pl-6 space-y-1 text-sm">
                    <li>Generate message digest using SHAKE-256</li>
                    <li>Sign the digest with SLH-DSA-87</li>
                    <li>Also sign with FALCON-1024 as backup</li>
                    <li>Include timestamps and nonces</li>
                    <li>Combine signatures into an authentication package</li>
                    <li>Verify using corresponding public keys</li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">Key Management</h3>
              <p>
                Proper key management is critical for ensuring the security of post-quantum cryptography.
                TetraCryptPQC implements robust key management practices including:
              </p>

              <Accordion type="single" collapsible className="w-full mt-2">
                <AccordionItem value="key-1">
                  <AccordionTrigger>Key Generation</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">All keys are generated using quantum-resistant algorithms with proper entropy sources:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Hardware-based entropy sources when available</li>
                      <li>NIST SP 800-90A compliant DRBGs</li>
                      <li>Strict parameter validation and testing</li>
                      <li>Key quality verification before use</li>
                      <li>Hardware security module (HSM) integration where available</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="key-2">
                  <AccordionTrigger>Key Storage and Protection</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Private keys are stored with the highest level of protection:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Hardware-based secure storage when available (TPM, HSM)</li>
                      <li>Encrypted storage with strong KDF (SHAKE-256 based)</li>
                      <li>Memory protection against side-channel attacks</li>
                      <li>Anti-tampering mechanisms and monitoring</li>
                      <li>Secure key backup and recovery mechanisms</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="key-3">
                  <AccordionTrigger>Key Distribution</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Public keys are distributed through secure channels:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Certificate-based authentication</li>
                      <li>Decentralized verification through multiple paths</li>
                      <li>Transparency logs and verification</li>
                      <li>Trust-on-first-use with verification</li>
                      <li>Out-of-band verification mechanisms</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="key-4">
                  <AccordionTrigger>Key Rotation and Revocation</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Keys are regularly rotated and can be immediately revoked:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Automatic key rotation based on time and usage</li>
                      <li>Immediate key revocation through multiple channels</li>
                      <li>Revocation status verification before key use</li>
                      <li>Forward secrecy through continuous key updating</li>
                      <li>Cryptographic proof of revocation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IMPLEMENTATION TAB */}
        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                Implementation Guidelines
              </CardTitle>
              <CardDescription>
                Code examples, API usage, and integration patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Required Dependencies</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>liboqs: Open Quantum Safe library</li>
                    <li>libsodium: For hybrid cryptography</li>
                    <li>OpenSSL 3.x: For classical algorithms</li>
                    <li>CIRCL: Cloudflare's cryptographic library</li>
                    <li>libpqcrypto: PQCrypto library</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Integration Options</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Direct API integration</li>
                    <li>WebAssembly module for web applications</li>
                    <li>Native libraries for desktop applications</li>
                    <li>Mobile SDK for iOS and Android</li>
                    <li>Microservice architecture via gRPC</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-4">API Examples</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="code-1">
                  <AccordionTrigger>Key Generation Example</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                      <code className="text-sm font-mono">
{`// Generate ML-KEM keys
const generateMLKEMKeypair = async () => {
  try {
    // Use the TetraCryptPQC API
    const keypair = await tetracrypt.crypto.generateKeypair({
      algorithm: 'ML-KEM-1024',
      format: 'spki',  // SubjectPublicKeyInfo format
      extractable: false,
      hardwareBackedIfAvailable: true
    });
    
    return {
      publicKey: keypair.publicKey,
      privateKey: keypair.privateKey,
      algorithm: 'ML-KEM-1024',
      strength: '256-bit quantum security',
      standard: 'NIST FIPS 205',
      created: new Date().toISOString(),
      hardwareProtected: keypair.hardwareProtected
    };
  } catch (error) {
    console.error('Error generating ML-KEM keypair:', error);
    throw new Error('Key generation failed');
  }
};`}
                      </code>
                    </pre>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="code-2">
                  <AccordionTrigger>Encryption and Decryption Example</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                      <code className="text-sm font-mono">
{`// Encrypt data using hybrid encryption
const encryptWithPQC = async (data, recipientPublicKey) => {
  try {
    // Convert data to Uint8Array if it's a string
    const dataBuffer = typeof data === 'string' 
      ? new TextEncoder().encode(data) 
      : data;
    
    // Use the TetraCryptPQC API for hybrid encryption
    const encryptedData = await tetracrypt.crypto.encrypt({
      data: dataBuffer,
      recipientPublicKey,
      algorithm: 'HYBRID-ML-KEM-AES',
      aesBits: 256,
      aad: null,  // Additional authenticated data
      padding: 'OAEP'
    });
    
    return encryptedData;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw new Error('Encryption failed');
  }
};

// Decrypt data using hybrid decryption
const decryptWithPQC = async (encryptedData, privateKey) => {
  try {
    // Use the TetraCryptPQC API for hybrid decryption
    const decryptedData = await tetracrypt.crypto.decrypt({
      encryptedData,
      privateKey,
      algorithm: 'HYBRID-ML-KEM-AES'
    });
    
    // Convert Uint8Array to string if needed
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw new Error('Decryption failed');
  }
};`}
                      </code>
                    </pre>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="code-3">
                  <AccordionTrigger>Signing and Verification Example</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                      <code className="text-sm font-mono">
{`// Sign data using SLH-DSA
const signMessage = async (data, privateKey) => {
  try {
    // Convert data to Uint8Array if it's a string
    const dataBuffer = typeof data === 'string' 
      ? new TextEncoder().encode(data) 
      : data;
    
    // Use the TetraCryptPQC API for digital signatures
    const signature = await tetracrypt.crypto.sign({
      data: dataBuffer,
      privateKey,
      algorithm: 'SLH-DSA-87',
      includeCertificate: true,
      timestamp: true
    });
    
    return signature;
  } catch (error) {
    console.error('Error signing data:', error);
    throw new Error('Signing failed');
  }
};

// Verify a signature using SLH-DSA
const verifySignature = async (data, signature, publicKey) => {
  try {
    // Convert data to Uint8Array if it's a string
    const dataBuffer = typeof data === 'string' 
      ? new TextEncoder().encode(data) 
      : data;
    
    // Use the TetraCryptPQC API for signature verification
    const result = await tetracrypt.crypto.verify({
      data: dataBuffer,
      signature,
      publicKey,
      algorithm: 'SLH-DSA-87',
      checkRevocation: true,
      maxAgeSeconds: 86400 // 24 hours
    });
    
    return result.valid;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
};`}
                      </code>
                    </pre>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="code-4">
                  <AccordionTrigger>Key Exchange Example</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                      <code className="text-sm font-mono">
{`// Establish a secure session using ML-KEM key exchange
const establishSecureSession = async (remotePublicKey) => {
  try {
    // Generate ephemeral keypair
    const ephemeralKeypair = await tetracrypt.crypto.generateKeypair({
      algorithm: 'ML-KEM-1024',
      ephemeral: true
    });
    
    // Use the TetraCryptPQC API for key encapsulation
    const encapsulation = await tetracrypt.crypto.encapsulate({
      recipientPublicKey: remotePublicKey,
      senderKeyPair: ephemeralKeypair,
      kdfAlgorithm: 'SHAKE-256',
      outputBits: 256,
      info: 'session-key'
    });
    
    return {
      sessionKey: encapsulation.sharedSecret,
      encapsulatedKey: encapsulation.ciphertext,
      ephemeralPublicKey: ephemeralKeypair.publicKey
    };
  } catch (error) {
    console.error('Error establishing secure session:', error);
    throw new Error('Key exchange failed');
  }
};

// Receive a session key using ML-KEM key decapsulation
const receiveSecureSession = async (encapsulatedKey, privateKey) => {
  try {
    // Use the TetraCryptPQC API for key decapsulation
    const decapsulation = await tetracrypt.crypto.decapsulate({
      encapsulatedKey,
      privateKey,
      kdfAlgorithm: 'SHAKE-256',
      outputBits: 256,
      info: 'session-key'
    });
    
    return {
      sessionKey: decapsulation.sharedSecret
    };
  } catch (error) {
    console.error('Error receiving secure session:', error);
    throw new Error('Key exchange failed');
  }
};`}
                      </code>
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <h3 className="text-lg font-semibold mt-6">Integration Patterns</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Secure Messaging Integration</h4>
                  <p className="text-sm mb-2">
                    Implement end-to-end encrypted messaging using TetraCryptPQC:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1 text-sm">
                    <li>Generate ML-KEM keypairs for all users</li>
                    <li>Exchange public keys through secure channels</li>
                    <li>Encrypt messages with recipient's public key</li>
                    <li>Sign messages with sender's private key</li>
                    <li>Implement perfect forward secrecy with key rotation</li>
                    <li>Verify signatures before displaying messages</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Secure API Authentication</h4>
                  <p className="text-sm mb-2">
                    Implement quantum-resistant API authentication:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1 text-sm">
                    <li>Generate SLH-DSA keypairs for API clients</li>
                    <li>Sign API requests with client's private key</li>
                    <li>Include timestamp and nonce in signed data</li>
                    <li>Verify signatures on the server side</li>
                    <li>Implement key rotation and revocation</li>
                    <li>Use ML-KEM for secure session establishment</li>
                  </ol>
                </div>
              </div>
              
              <Alert className="mt-4">
                <Fingerprint className="h-4 w-4" />
                <AlertTitle>Best Practices</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Never implement cryptography from scratch. Use the provided APIs.</li>
                    <li>Always verify signatures before processing encrypted data.</li>
                    <li>Implement regular key rotation and secure key backup procedures.</li>
                    <li>Use hardware security modules when available for key storage.</li>
                    <li>Monitor for cryptographic failures and implement appropriate alerts.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DEPLOYMENT TAB */}
        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Deployment and Operations
              </CardTitle>
              <CardDescription>
                Installation, configuration, and operational security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-semibold">Secure Deployment Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Containerized Deployment</h4>
                  <Badge className="mb-2">Recommended</Badge>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Podman/Docker containers with SELinux</li>
                    <li>Container-specific security policies</li>
                    <li>Immutable infrastructure patterns</li>
                    <li>Kubernetes with security operators</li>
                    <li>Secure CI/CD pipeline integration</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">On-Premises Deployment</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Hardened Linux installation</li>
                    <li>Physical security requirements</li>
                    <li>Air-gapped deployment options</li>
                    <li>Hardware security module integration</li>
                    <li>Secure boot and TPM verification</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Cloud Deployment</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Confidential computing platforms</li>
                    <li>Cloud HSM integration</li>
                    <li>Zero-trust network architecture</li>
                    <li>Encrypted storage and in-transit data</li>
                    <li>Cloud provider security best practices</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">Security Hardening</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="deploy-1">
                  <AccordionTrigger>Operating System Hardening</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Minimal installation with only required components</li>
                      <li>SELinux/AppArmor mandatory access control</li>
                      <li>Regular security updates and patch management</li>
                      <li>Secure boot and firmware verification</li>
                      <li>File integrity monitoring and logging</li>
                      <li>Memory protection and ASLR enforcement</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="deploy-2">
                  <AccordionTrigger>Network Security</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Zero-trust network architecture</li>
                      <li>Post-quantum TLS (PQ-TLS) for all communications</li>
                      <li>Network segmentation and microsegmentation</li>
                      <li>Encrypted DNS and DNSSEC implementation</li>
                      <li>Intrusion detection and prevention systems</li>
                      <li>Regular network security audits and penetration testing</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="deploy-3">
                  <AccordionTrigger>Container and Application Security</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Rootless container deployment</li>
                      <li>Minimal container images with security scanning</li>
                      <li>Read-only file systems for containers</li>
                      <li>Application sandboxing and isolation</li>
                      <li>Runtime application self-protection (RASP)</li>
                      <li>Regular vulnerability scanning and patching</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="deploy-4">
                  <AccordionTrigger>Key Management Infrastructure</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Hardware security modules (HSMs) for key storage</li>
                      <li>Secure key backup and recovery procedures</li>
                      <li>Role-based access control for key management</li>
                      <li>Key usage auditing and monitoring</li>
                      <li>Automated key rotation and lifecycle management</li>
                      <li>Split knowledge procedures for critical keys</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <h3 className="text-lg font-semibold mt-6">Continuous Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Monitoring and Detection</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Cryptographic operation monitoring</li>
                    <li>Anomaly detection for key usage patterns</li>
                    <li>Security information and event management (SIEM)</li>
                    <li>Real-time threat intelligence integration</li>
                    <li>Behavioral analysis and heuristic detection</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Incident Response</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Predefined cryptographic compromise procedures</li>
                    <li>Emergency key rotation capabilities</li>
                    <li>Secure backup and recovery mechanisms</li>
                    <li>Forensic readiness and evidence collection</li>
                    <li>Tabletop exercises and response simulation</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">Compliance and Auditing</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Standard</TableHead>
                    <TableHead>Compliance Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">NIST SP 800-207</TableCell>
                    <TableCell>Zero Trust Architecture implementation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FIPS 140-3</TableCell>
                    <TableCell>Cryptographic module validation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Common Criteria</TableCell>
                    <TableCell>Evaluation Assurance Level (EAL) certification</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">NIST SP 800-53</TableCell>
                    <TableCell>Security and privacy controls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ISO/IEC 27001</TableCell>
                    <TableCell>Information security management system</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Alert>
                <CreditCard className="h-4 w-4" />
                <AlertTitle>Enterprise Support</AlertTitle>
                <AlertDescription>
                  Enterprise customers have access to additional deployment options,
                  including on-site implementation assistance, customized security configurations,
                  and 24/7 operational support. Contact our enterprise team for more details.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <footer className="text-center text-sm text-muted-foreground space-y-2">
        <div className="flex justify-center items-center gap-2">
          <GitFork className="h-4 w-4" />
          <span>TetraCryptPQC is open source and available under MIT license</span>
        </div>
        <p>Documentation Version 2.0.0 | Last Updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
};

export default Documentation;
