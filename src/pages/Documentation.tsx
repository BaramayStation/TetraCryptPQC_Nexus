
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, FileText, Code, Server, HardDrive, Lock, KeyRound } from "lucide-react";

const Documentation: React.FC = () => {
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-7 w-7 text-primary" />
          TetraCryptPQC Documentation
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Comprehensive documentation for the TetraCryptPQC framework, including technical specifications,
          implementation guidelines, and deployment instructions.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>FIPS 205/206 Compliance Notice</AlertTitle>
        <AlertDescription>
          This framework implements NIST FIPS 205 (ML-KEM) and FIPS 206 (SLH-DSA) standards for post-quantum cryptography,
          providing quantum-resistant security for critical applications.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="architecture" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
              <CardDescription>
                Overview of TetraCryptPQC's post-quantum cryptographic architecture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Core Cryptographic Components</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>ML-KEM (Kyber)</strong>: FIPS 205 compliant Key Encapsulation Mechanism with 256-bit security level (ML-KEM-1024)</li>
                <li><strong>SLH-DSA (Dilithium)</strong>: FIPS 206 compliant digital signature algorithm with 256-bit security level (Dilithium5)</li>
                <li><strong>FALCON</strong>: Alternative lattice-based signature scheme with efficient signature sizes</li>
                <li><strong>SPHINCS+</strong>: Stateless hash-based signature scheme for long-term security assurance</li>
                <li><strong>AES-256-GCM</strong>: Symmetric encryption in hybrid mode with ML-KEM</li>
                <li><strong>SHAKE-256</strong>: Extendable-output function (XOF) for key derivation and hashing</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Resilient Architecture</h3>
              <p>TetraCryptPQC implements a multi-layered failsafe approach:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Primary Layer</h4>
                  <ul className="list-disc pl-6 mt-2">
                    <li>ML-KEM-1024 (Kyber)</li>
                    <li>SLH-DSA-Dilithium5</li>
                    <li>AES-256-GCM with ML-KEM</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Secondary Layer</h4>
                  <ul className="list-disc pl-6 mt-2">
                    <li>FALCON-1024</li>
                    <li>BIKE (Code-based KEM)</li>
                    <li>ChaCha20-Poly1305</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Tertiary Layer</h4>
                  <ul className="list-disc pl-6 mt-2">
                    <li>SPHINCS+</li>
                    <li>FrodoKEM</li>
                    <li>HMAC-SHAKE256</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Hybrid Protection</h4>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Quantum + Classical encryption</li>
                    <li>Multiple algorithm families</li>
                    <li>Cross-verification protocols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crypto Agility Framework</CardTitle>
              <CardDescription>
                Dynamic cryptographic algorithm selection and fallback mechanisms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                TetraCryptPQC implements a crypto-agility framework that allows for seamless transitions
                between cryptographic algorithms as standards evolve or vulnerabilities are discovered.
              </p>
              
              <div className="bg-muted p-4 rounded-md my-4">
                <h4 className="font-medium mb-2">Algorithm Selection Strategy</h4>
                <p className="text-sm mb-2">The system automatically selects the appropriate algorithm based on:</p>
                <ul className="list-disc pl-6 text-sm">
                  <li>Security requirements</li>
                  <li>Performance constraints</li>
                  <li>Threat intelligence</li>
                  <li>Compliance requirements</li>
                  <li>Available hardware acceleration</li>
                </ul>
              </div>
              
              <h4 className="font-medium mt-4">Implementation Architecture</h4>
              <p className="text-sm mb-2">
                The framework uses a coordinator pattern with strategy implementations for each algorithm:
              </p>
              <pre className="bg-secondary p-3 rounded-md text-xs my-2 overflow-auto">
{`// Coordinator manages algorithm selection and fallback
class CryptoFailsafeCoordinator {
  // Registers available implementations
  registerImplementation(impl: FailsafeImplementation<CryptoImplementation>): void
  
  // Monitors and automatically switches algorithms when needed
  monitorAlgorithmHealth(): void
  
  // API for manual algorithm selection
  switchToAlgorithm(algorithm: CryptoAlgorithm): Promise<boolean>
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FIPS 205/206 Implementation</CardTitle>
              <CardDescription>
                Technical implementation details for ML-KEM and SLH-DSA algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold">ML-KEM (Kyber) Implementation</h3>
                  <p className="text-sm mt-2">
                    TetraCryptPQC implements ML-KEM-1024 (formerly Kyber1024) as specified in FIPS 205,
                    providing 256-bit post-quantum security level.
                  </p>
                  
                  <h4 className="font-medium mt-4">Example Usage:</h4>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`// Generate ML-KEM keypair
const { publicKey, privateKey } = await mlkem.generateKeypair();

// Encapsulate a shared secret using the public key
const { ciphertext, sharedSecret } = 
  await mlkem.encapsulate(publicKey);

// Decapsulate the shared secret using the private key
const decapsulatedSecret = 
  await mlkem.decapsulate(ciphertext, privateKey);

// Use the shared secret for encryption
const encrypted = await aes.encrypt(message, sharedSecret);`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">SLH-DSA (Dilithium) Implementation</h3>
                  <p className="text-sm mt-2">
                    TetraCryptPQC implements SLH-DSA-Dilithium5 as specified in FIPS 206,
                    providing 256-bit post-quantum security for digital signatures.
                  </p>
                  
                  <h4 className="font-medium mt-4">Example Usage:</h4>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`// Generate SLH-DSA keypair
const { publicKey, privateKey } = await slhdsa.generateKeypair();

// Sign a message using the private key
const signature = await slhdsa.sign(message, privateKey);

// Verify the signature using the public key
const isValid = await slhdsa.verify(
  message, 
  signature, 
  publicKey
);

console.log(isValid ? "Signature valid" : "Invalid signature");`}
                  </pre>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">Integration with Open Quantum Safe (OQS)</h3>
              <p className="text-sm">
                TetraCryptPQC leverages the Open Quantum Safe project's libraries for core cryptographic operations:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">WebAssembly Integration</h4>
                  <p className="text-xs mt-2">
                    TetraCryptPQC uses WebAssembly modules compiled from C/C++ liboqs implementations
                    to provide high-performance post-quantum cryptography in the browser.
                  </p>
                  <pre className="bg-secondary p-2 rounded-md text-xs mt-2 overflow-auto">
{`// Initialize WASM modules
await initializeOQSWasm();

// Use OQS through WebAssembly
const result = await oqs.kemEncapsulate(publicKey);`}
                  </pre>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">React Hooks API</h4>
                  <p className="text-xs mt-2">
                    The framework provides React hooks for easy integration with React applications.
                  </p>
                  <pre className="bg-secondary p-2 rounded-md text-xs mt-2 overflow-auto">
{`// In a React component
function SecureComponent() {
  const { 
    generateKeypair, 
    encrypt, 
    decrypt,
    sign,
    verify,
    isLoading
  } = usePQCrypto();
  
  // Use PQC operations in React components
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hybrid Encryption Implementation</CardTitle>
              <CardDescription>
                Technical details for implementing hybrid classical/post-quantum encryption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium">Hybrid Encryption Flow</h3>
              <p className="text-sm mt-2 mb-4">
                TetraCryptPQC implements hybrid encryption combining ML-KEM with AES-256-GCM for
                maximum security against both classical and quantum threats.
              </p>

              <div className="relative overflow-hidden rounded-xl border bg-background p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium">Encryption Process</h4>
                    <ol className="list-decimal pl-6 text-xs mt-2 space-y-1">
                      <li>Generate random AES-256 data encryption key (DEK)</li>
                      <li>Encrypt message using AES-256-GCM with DEK</li>
                      <li>Use ML-KEM to encapsulate a key for the recipient</li>
                      <li>Encrypt DEK with the encapsulated ML-KEM shared secret</li>
                      <li>Combine encrypted DEK, ML-KEM ciphertext, and encrypted message</li>
                      <li>Sign the entire package with SLH-DSA (optional)</li>
                    </ol>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium">Decryption Process</h4>
                    <ol className="list-decimal pl-6 text-xs mt-2 space-y-1">
                      <li>Verify signature if present</li>
                      <li>Extract ML-KEM ciphertext</li>
                      <li>Decapsulate shared secret using ML-KEM private key</li>
                      <li>Decrypt DEK using decapsulated ML-KEM shared secret</li>
                      <li>Use decrypted DEK to decrypt message with AES-256-GCM</li>
                      <li>Verify message authentication tag</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-4 p-4 border rounded-lg">
                  <h4 className="text-sm font-medium">Example Implementation</h4>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`// Hybrid encryption function
async function hybridEncrypt(message, recipientPublicKey) {
  // Generate random AES key (DEK)
  const dek = crypto.getRandomValues(new Uint8Array(32));
  
  // Encrypt message with AES-GCM
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await aesGcmEncrypt(message, dek, iv);
  
  // Encapsulate key with ML-KEM
  const { ciphertext, sharedSecret } = 
    await mlkem.encapsulate(recipientPublicKey);
    
  // Encrypt DEK with shared secret
  const encryptedDek = await aesGcmEncrypt(dek, sharedSecret);
  
  // Return complete encrypted package
  return {
    mlkemCiphertext: ciphertext,
    encryptedDek: encryptedDek,
    iv: iv,
    encryptedMessage: encrypted
  };
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Instructions</CardTitle>
              <CardDescription>
                Guidelines for secure deployment of TetraCryptPQC in various environments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Browser-Based Deployment</h3>
                  <p className="text-sm mt-2">
                    TetraCryptPQC can be deployed as a client-side application with WebAssembly
                    modules for cryptographic operations:
                  </p>
                  <ol className="list-decimal pl-6 text-sm mt-2 space-y-1">
                    <li>Install the TetraCryptPQC package via npm or yarn</li>
                    <li>Include the WebAssembly modules in your build process</li>
                    <li>Configure CSP headers to allow WebAssembly execution</li>
                    <li>Initialize the cryptographic modules at application startup</li>
                    <li>Implement secure key storage using browser capabilities (WebCrypto)</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Server-Side Deployment</h3>
                  <p className="text-sm mt-2">
                    For server environments, TetraCryptPQC can be deployed as:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <Server className="h-5 w-5 text-primary mb-2" />
                      <h4 className="font-medium">Node.js Service</h4>
                      <p className="text-xs mt-2">
                        Deploy as a Node.js microservice with native bindings to liboqs
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <HardDrive className="h-5 w-5 text-primary mb-2" />
                      <h4 className="font-medium">Container Deployment</h4>
                      <p className="text-xs mt-2">
                        Deploy as a Podman/Docker container with SELinux policies
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <Lock className="h-5 w-5 text-primary mb-2" />
                      <h4 className="font-medium">HSM Integration</h4>
                      <p className="text-xs mt-2">
                        Deploy with hardware security module (HSM) for key protection
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Security Guidelines</h3>
                  <p className="text-sm mt-2">
                    When deploying TetraCryptPQC, follow these security guidelines:
                  </p>
                  <ul className="list-disc pl-6 text-sm mt-2 space-y-1">
                    <li>Use hardware security modules (HSMs) when available for key storage</li>
                    <li>Implement proper key management with regular rotation policies</li>
                    <li>Configure secure application headers (HSTS, CSP, etc.)</li>
                    <li>Monitor for cryptographic operation failures and implement fallbacks</li>
                    <li>Maintain an up-to-date threat model and security assessment</li>
                    <li>Establish a vulnerability disclosure process</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise Integration Patterns</CardTitle>
              <CardDescription>
                Patterns for integrating TetraCryptPQC with enterprise systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold">Identity Integration</h3>
                  <p className="text-sm mt-2">
                    TetraCryptPQC can integrate with existing identity providers using:
                  </p>
                  <ul className="list-disc pl-6 text-sm mt-2 space-y-1">
                    <li><strong>SAML/OIDC Extensions</strong>: Post-quantum extensions for SAML and OIDC</li>
                    <li><strong>X.509 Integration</strong>: Hybrid certificates with classical and PQC signatures</li>
                    <li><strong>Zero-Knowledge Proofs</strong>: PQC-secured ZKP for authentication</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">API Security</h3>
                  <p className="text-sm mt-2">
                    Secure API communications with:
                  </p>
                  <ul className="list-disc pl-6 text-sm mt-2 space-y-1">
                    <li><strong>PQC TLS</strong>: Hybrid TLS with post-quantum key exchange</li>
                    <li><strong>Message-Level Security</strong>: End-to-end PQC encryption for API payloads</li>
                    <li><strong>Token Security</strong>: PQC-signed JWTs and authorization tokens</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Compliance Documentation</h3>
                <p className="text-sm mt-2">
                  TetraCryptPQC provides documentation to support compliance requirements:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">NIST Compliance</h4>
                    <p className="text-xs mt-2">
                      Documentation for FIPS 140-3, 800-53, 800-207 (Zero Trust)
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">DoD/Military Standards</h4>
                    <p className="text-xs mt-2">
                      Documentation for military-grade security requirements
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Regulated Industries</h4>
                    <p className="text-xs mt-2">
                      Documentation for HIPAA, PCI-DSS, GDPR, and financial regulations
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Example code snippets for common TetraCryptPQC usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">React Component Example</h3>
                  <p className="text-sm mt-2">
                    Using TetraCryptPQC in a React application:
                  </p>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`import React, { useState } from 'react';
import { usePQCrypto } from '@/hooks/usePQCrypto';
import { Button } from '@/components/ui/button';

function SecureMessageComponent() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  
  const { 
    generateKeypair, 
    encryptMessage, 
    decryptMessage,
    isLoading
  } = usePQCrypto();
  
  const [keyPair, setKeyPair] = useState(null);
  
  const handleGenerateKeys = async () => {
    const newKeyPair = await generateKeypair();
    setKeyPair(newKeyPair);
  };
  
  const handleEncrypt = async () => {
    if (!keyPair) return;
    
    const encrypted = await encryptMessage(
      message, 
      keyPair.publicKey
    );
    setEncryptedMessage(encrypted);
  };
  
  const handleDecrypt = async () => {
    if (!keyPair) return;
    
    const decrypted = await decryptMessage(
      encryptedMessage, 
      keyPair.privateKey
    );
    setDecryptedMessage(decrypted);
  };
  
  return (
    <div className="space-y-4">
      <Button onClick={handleGenerateKeys} disabled={isLoading}>
        Generate PQC Keypair
      </Button>
      
      {keyPair && (
        <div className="space-y-4">
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to encrypt"
            className="w-full p-2 border rounded"
          />
          
          <Button onClick={handleEncrypt} disabled={isLoading}>
            Encrypt with ML-KEM
          </Button>
          
          {encryptedMessage && (
            <>
              <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                {encryptedMessage}
              </div>
              
              <Button onClick={handleDecrypt} disabled={isLoading}>
                Decrypt with ML-KEM
              </Button>
              
              {decryptedMessage && (
                <div className="p-4 border rounded">
                  <h4>Decrypted Message:</h4>
                  <p>{decryptedMessage}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Authentication Example</h3>
                  <p className="text-sm mt-2">
                    Using TetraCryptPQC for secure authentication:
                  </p>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`import { slhdsa } from '@/lib/pqcrypto';

// Authentication challenge-response using SLH-DSA
async function authChallengeResponse(challenge, privateKey, publicKey) {
  // Sign the challenge with SLH-DSA private key
  const signature = await slhdsa.sign(challenge, privateKey);
  
  // Send the signature and public key to the server
  const response = await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      challenge,
      signature,
      publicKey
    })
  });
  
  return response.json();
}

// Server-side verification (Node.js example)
app.post('/api/auth/verify', async (req, res) => {
  const { challenge, signature, publicKey } = req.body;
  
  // Verify the signature
  const isValid = await slhdsa.verify(
    challenge, 
    signature, 
    publicKey
  );
  
  if (isValid) {
    // Create and sign a session token
    const token = await createSessionToken(publicKey);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid signature' 
    });
  }
});`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Examples</CardTitle>
              <CardDescription>
                Examples of integrating TetraCryptPQC with other systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Secure Communication Channel</h3>
                  <p className="text-sm mt-2">
                    Establishing a secure communication channel with PQC:
                  </p>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`import { mlkem, aes, slhdsa } from '@/lib/pqcrypto';

// Create a secure channel
async function createSecureChannel(peerPublicKey, ourKeypair) {
  // Key establishment
  const { ciphertext, sharedSecret } = 
    await mlkem.encapsulate(peerPublicKey);
  
  // Sign the ciphertext
  const signature = await slhdsa.sign(
    ciphertext, 
    ourKeypair.slhdsaPrivateKey
  );
  
  // Derive channel keys from shared secret
  const encryptionKey = await deriveKey(sharedSecret, 'enc');
  const macKey = await deriveKey(sharedSecret, 'mac');
  
  // Return secure channel interface
  return {
    // Send encrypted message
    send: async (message) => {
      const encrypted = await aes.encrypt(
        message, 
        encryptionKey
      );
      return { encrypted, signature };
    },
    
    // Receive encrypted message
    receive: async (data) => {
      // Verify signature if present
      if (data.signature) {
        const isValid = await slhdsa.verify(
          data.encrypted,
          data.signature,
          peerPublicKey
        );
        if (!isValid) throw new Error('Invalid signature');
      }
      
      // Decrypt the message
      return aes.decrypt(data.encrypted, encryptionKey);
    }
  };
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Failsafe Protocol Example</h3>
                  <p className="text-sm mt-2">
                    Using the failsafe protocol for resilient communications:
                  </p>
                  <pre className="bg-secondary p-3 rounded-md text-xs mt-2 overflow-auto">
{`import { 
  CryptoFailsafeCoordinator,
  switchCryptoAlgorithm,
  CryptoAlgorithm
} from '@/lib/failsafe/crypto';

// Setup failsafe protocol
async function setupFailsafeProtocol() {
  const failsafe = new CryptoFailsafeCoordinator();
  
  // Register implementations in priority order
  failsafe.registerImplementation({
    id: \`\${CryptoAlgorithm.ML_KEM}-primary\`,
    priority: 100,
    // Implementation details...
  });
  
  failsafe.registerImplementation({
    id: \`\${CryptoAlgorithm.BIKE}-secondary\`,
    priority: 50,
    // Implementation details...
  });
  
  failsafe.registerImplementation({
    id: \`\${CryptoAlgorithm.FRODO_KEM}-tertiary\`,
    priority: 25,
    // Implementation details...
  });
  
  // Monitor algorithm health
  failsafe.monitorAlgorithmHealth();
  
  return failsafe;
}

// Handle crypto failures with automatic fallback
async function sendSecureMessageWithFailsafe(message, recipientKey) {
  const failsafe = await setupFailsafeProtocol();
  
  try {
    // Try with primary algorithm
    return await failsafe.encryptMessage(message, recipientKey);
  } catch (error) {
    console.error('Primary algorithm failed:', error);
    
    // Switch to secondary algorithm
    await failsafe.switchToAlgorithm(CryptoAlgorithm.BIKE);
    
    // Retry with secondary algorithm
    return await failsafe.encryptMessage(message, recipientKey);
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
