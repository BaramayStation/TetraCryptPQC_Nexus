
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, FileText, ArrowRight, BookOpen } from 'lucide-react';
import WikiLayout from '@/components/layout/WikiLayout';

const CodeExamples: React.FC = () => {
  return (
    <WikiLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Code className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs">Examples</Badge>
          </div>
          <h1 className="text-3xl font-bold">TetraCryptPQC Code Examples</h1>
          <p className="mt-2 text-muted-foreground">
            Example code and snippets for common TetraCryptPQC implementations
          </p>
        </div>
        
        <Tabs defaultValue="javascript">
          <TabsList className="mb-4">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="rust">Rust</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          
          <TabsContent value="javascript" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">JavaScript Examples</h2>
                
                <div className="space-y-6 mt-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Key Generation
                    </h3>
                    
                    <pre className="text-sm bg-muted p-3 rounded-md mt-3 overflow-x-auto">
{`// Key Generation Example
import { generateMLKEMKeypair, generateSLHDSAKeypair } from 'tetracryptpqc';

async function generatePostQuantumKeys() {
  try {
    // Generate ML-KEM key pair for encryption
    const encryptionKey = await generateMLKEMKeypair();
    console.log('ML-KEM Key Generated:');
    console.log('Algorithm:', encryptionKey.algorithm);
    console.log('Strength:', encryptionKey.strength);
    console.log('Public Key (truncated):', encryptionKey.publicKey.substring(0, 32) + '...');
    
    // Generate SLH-DSA key pair for signatures
    const signatureKey = await generateSLHDSAKeypair();
    console.log('\\nSLH-DSA Key Generated:');
    console.log('Algorithm:', signatureKey.algorithm);
    console.log('Strength:', signatureKey.strength);
    console.log('Public Key (truncated):', signatureKey.publicKey.substring(0, 32) + '...');
    
    return {
      encryption: encryptionKey,
      signature: signatureKey
    };
  } catch (error) {
    console.error('Error generating keys:', error);
    throw error;
  }
}

// Usage
generatePostQuantumKeys()
  .then(keys => {
    // Store keys or use them for cryptographic operations
    console.log('Key generation complete!');
  })
  .catch(error => {
    console.error('Failed to generate keys:', error);
  });`}
                    </pre>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Message Signing and Verification
                    </h3>
                    
                    <pre className="text-sm bg-muted p-3 rounded-md mt-3 overflow-x-auto">
{`// Message Signing Example
import { signMessage, verifySignature } from 'tetracryptpqc';

async function signAndVerifyExample() {
  try {
    // For this example, assume we have generated keys
    const keys = await generatePostQuantumKeys();
    
    const message = 'This is a secure message that needs to be signed';
    
    // Sign the message with the private key
    console.log('\\nSigning message...');
    const signature = await signMessage(message, keys.signature.privateKey);
    console.log('Signature created (truncated):', signature.substring(0, 32) + '...');
    
    // Verify the signature with the public key
    console.log('\\nVerifying signature...');
    const isValid = await verifySignature(message, signature, keys.signature.publicKey);
    
    console.log('Signature valid:', isValid);
    
    // Try verifying with a tampered message
    const tamperedMessage = message + ' (tampered)';
    const isTamperedValid = await verifySignature(tamperedMessage, signature, keys.signature.publicKey);
    
    console.log('Tampered message signature valid:', isTamperedValid); // Should be false
    
    return { signature, isValid };
  } catch (error) {
    console.error('Error in signing example:', error);
    throw error;
  }
}

// Usage
signAndVerifyExample()
  .then(result => {
    console.log('Signing demonstration complete!');
  })
  .catch(error => {
    console.error('Failed to complete signing demonstration:', error);
  });`}
                    </pre>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Secure Messaging
                    </h3>
                    
                    <pre className="text-sm bg-muted p-3 rounded-md mt-3 overflow-x-auto">
{`// Secure Messaging Example
import { 
  generateMLKEMKeypair, 
  generateSLHDSAKeypair,
  encryptMessage,
  decryptMessage,
  signMessage,
  verifySignature
} from 'tetracryptpqc';

// Simulate a secure messaging system
async function secureMessagingExample() {
  // Generate keys for Alice
  console.log('Generating keys for Alice...');
  const aliceKeys = {
    encryption: await generateMLKEMKeypair(),
    signature: await generateSLHDSAKeypair()
  };
  
  // Generate keys for Bob
  console.log('Generating keys for Bob...');
  const bobKeys = {
    encryption: await generateMLKEMKeypair(),
    signature: await generateSLHDSAKeypair()
  };
  
  // Alice wants to send a message to Bob
  const message = 'Hello Bob, this is a secure message from Alice!';
  
  // Step 1: Alice encrypts the message with Bob's public key
  console.log('\\nAlice encrypting message for Bob...');
  const encryptedMessage = await encryptMessage(message, bobKeys.encryption.publicKey);
  
  // Step 2: Alice signs the encrypted message with her private key
  console.log('Alice signing the encrypted message...');
  const signature = await signMessage(encryptedMessage, aliceKeys.signature.privateKey);
  
  // Step 3: Alice sends the encrypted message and signature to Bob
  console.log('Sending encrypted message and signature to Bob...');
  
  // Step 4: Bob verifies the signature using Alice's public key
  console.log('\\nBob verifying Alice\\'s signature...');
  const isSignatureValid = await verifySignature(
    encryptedMessage, 
    signature, 
    aliceKeys.signature.publicKey
  );
  
  console.log('Signature verification:', isSignatureValid ? 'Valid' : 'Invalid');
  
  if (isSignatureValid) {
    // Step 5: Bob decrypts the message using his private key
    console.log('Bob decrypting the message...');
    const decryptedMessage = await decryptMessage(
      encryptedMessage, 
      bobKeys.encryption.privateKey
    );
    
    console.log('\\nDecrypted message:', decryptedMessage);
    console.log('Original message:', message);
    console.log('Message integrity:', decryptedMessage === message ? 'Intact' : 'Compromised');
  } else {
    console.log('Message signature verification failed. Rejecting message.');
  }
}

// Usage
secureMessagingExample()
  .then(() => {
    console.log('Secure messaging demonstration complete!');
  })
  .catch(error => {
    console.error('Error in secure messaging example:', error);
  });`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="python" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Python Examples</h2>
                
                <div className="space-y-6 mt-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Key Generation in Python
                    </h3>
                    
                    <pre className="text-sm bg-muted p-3 rounded-md mt-3 overflow-x-auto">
{`# Key Generation Example in Python
from tetracryptpqc import generate_mlkem_keypair, generate_slhdsa_keypair

def generate_post_quantum_keys():
    try:
        # Generate ML-KEM key pair for encryption
        encryption_key = generate_mlkem_keypair()
        print('ML-KEM Key Generated:')
        print(f'Algorithm: {encryption_key["algorithm"]}')
        print(f'Strength: {encryption_key["strength"]}')
        print(f'Public Key (truncated): {encryption_key["public_key"][:32]}...')
        
        # Generate SLH-DSA key pair for signatures
        signature_key = generate_slhdsa_keypair()
        print('\nSLH-DSA Key Generated:')
        print(f'Algorithm: {signature_key["algorithm"]}')
        print(f'Strength: {signature_key["strength"]}')
        print(f'Public Key (truncated): {signature_key["public_key"][:32]}...')
        
        return {
            'encryption': encryption_key,
            'signature': signature_key
        }
    except Exception as e:
        print(f'Error generating keys: {e}')
        raise

# Usage
if __name__ == '__main__':
    try:
        keys = generate_post_quantum_keys()
        print('Key generation complete!')
    except Exception as e:
        print(f'Failed to generate keys: {e}')`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rust" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Rust Examples</h2>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Rust code examples would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="java" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Java Examples</h2>
                
                <div className="py-12 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Java code examples would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Related Documentation</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="/wiki/development/api-reference" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              API Reference
            </a>
            <a href="/wiki/development/sdk-documentation" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              SDK Documentation
            </a>
            <a href="/wiki/development/best-practices" className="text-primary hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 mr-1" />
              Best Practices
            </a>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
};

export default CodeExamples;
