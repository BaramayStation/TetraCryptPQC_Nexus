
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Lock, KeyRound, FileText, Send, RefreshCw, Download, Upload, Cpu, Globe, Network } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  encapsulateKey, 
  decapsulateKey, 
  signData, 
  verifySignature, 
  hashWithSHA3, 
  symmetricEncrypt, 
  symmetricDecrypt, 
  toHexString, 
  fromHexString, 
  generateRandomBytes,
  deriveKey,
  sendDTNMessage,
  DTNMessage
} from '@/lib/pqcrypto-core';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

interface EncapsulationResult {
  ciphertext: string;
  sharedSecret: string;
}

const TetraCryptDemo: React.FC = () => {
  // General state
  const [activeTab, setActiveTab] = useState("key-encapsulation");
  const [loading, setLoading] = useState(false);

  // Key Encapsulation state
  const [kemKeyPair, setKEMKeyPair] = useState<KeyPair | null>(null);
  const [encapsulationResult, setEncapsulationResult] = useState<EncapsulationResult | null>(null);
  const [decapsulatedSecret, setDecapsulatedSecret] = useState<string | null>(null);

  // Digital Signature state
  const [signatureKeyPair, setSignatureKeyPair] = useState<KeyPair | null>(null);
  const [messageToSign, setMessageToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  // Symmetric Encryption state
  const [symmetricKey, setSymmetricKey] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  // Hash state
  const [hashInput, setHashInput] = useState("");
  const [hashOutput, setHashOutput] = useState("");
  
  // DTN state
  const [dtnSender, setDtnSender] = useState("earth-station-1");
  const [dtnRecipient, setDtnRecipient] = useState("mars-outpost-12");
  const [dtnMessage, setDtnMessage] = useState("");
  const [dtnDelay, setDtnDelay] = useState(3000);
  const [dtnMessages, setDtnMessages] = useState<DTNMessage[]>([]);
  const [dtnStatus, setDtnStatus] = useState("");

  // Key Encapsulation functions
  const generateKEMKeyPair = async () => {
    setLoading(true);
    try {
      const publicKey = toHexString(generateRandomBytes(32));
      const privateKey = toHexString(generateRandomBytes(64));
      
      setKEMKeyPair({ publicKey, privateKey });
      toast({
        title: "ML-KEM Key Pair Generated",
        description: "Post-quantum key pair has been successfully generated.",
      });
    } catch (error) {
      console.error("Error generating key pair:", error);
      toast({
        title: "Key Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate key pair",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const performEncapsulation = async () => {
    if (!kemKeyPair) {
      toast({
        title: "No Key Pair",
        description: "Please generate a key pair first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await encapsulateKey(kemKeyPair.publicKey);
      setEncapsulationResult(result);
      toast({
        title: "Key Encapsulation Successful",
        description: "A shared secret has been encapsulated using ML-KEM.",
      });
    } catch (error) {
      console.error("Error encapsulating key:", error);
      toast({
        title: "Encapsulation Failed",
        description: error instanceof Error ? error.message : "Failed to encapsulate key",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const performDecapsulation = async () => {
    if (!kemKeyPair || !encapsulationResult) {
      toast({
        title: "Missing Data",
        description: "Key pair and encapsulation result are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const sharedSecret = await decapsulateKey(
        encapsulationResult.ciphertext,
        kemKeyPair.privateKey
      );
      
      setDecapsulatedSecret(sharedSecret);
      
      // Verify if the decapsulated secret matches the original
      const isMatch = sharedSecret === encapsulationResult.sharedSecret;
      
      toast({
        title: isMatch ? "Decapsulation Successful" : "Decapsulation Warning",
        description: isMatch 
          ? "The shared secret was correctly recovered." 
          : "The decapsulated secret does not match the original.",
        variant: isMatch ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error decapsulating key:", error);
      toast({
        title: "Decapsulation Failed",
        description: error instanceof Error ? error.message : "Failed to decapsulate key",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Digital Signature functions
  const generateSignatureKeyPair = async () => {
    setLoading(true);
    try {
      const publicKey = toHexString(generateRandomBytes(32));
      const privateKey = toHexString(generateRandomBytes(64));
      
      setSignatureKeyPair({ publicKey, privateKey });
      toast({
        title: "SLH-DSA Key Pair Generated",
        description: "Post-quantum signature key pair has been successfully generated.",
      });
    } catch (error) {
      console.error("Error generating signature key pair:", error);
      toast({
        title: "Key Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate signature key pair",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signMessage = async () => {
    if (!signatureKeyPair || !messageToSign) {
      toast({
        title: "Missing Data",
        description: "Key pair and message are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const signatureResult = await signData(messageToSign, signatureKeyPair.privateKey);
      setSignature(signatureResult);
      toast({
        title: "Message Signed",
        description: "Message has been signed using SLH-DSA.",
      });
    } catch (error) {
      console.error("Error signing message:", error);
      toast({
        title: "Signing Failed",
        description: error instanceof Error ? error.message : "Failed to sign message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyMessageSignature = async () => {
    if (!signatureKeyPair || !signature || !verificationMessage) {
      toast({
        title: "Missing Data",
        description: "Key pair, signature, and message are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const isValid = await verifySignature(
        verificationMessage,
        signature,
        signatureKeyPair.publicKey
      );
      
      setVerificationResult(isValid);
      toast({
        title: isValid ? "Signature Valid" : "Signature Invalid",
        description: isValid 
          ? "The signature is valid for this message and public key." 
          : "The signature verification failed.",
        variant: isValid ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error verifying signature:", error);
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify signature",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Symmetric Encryption functions
  const generateSymmetricKey = async () => {
    setLoading(true);
    try {
      const keyBytes = generateRandomBytes(32);
      const key = toHexString(keyBytes);
      setSymmetricKey(key);
      toast({
        title: "Symmetric Key Generated",
        description: "A 256-bit symmetric key has been generated.",
      });
    } catch (error) {
      console.error("Error generating symmetric key:", error);
      toast({
        title: "Key Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate symmetric key",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const encryptData = async () => {
    if (!symmetricKey || !plaintext) {
      toast({
        title: "Missing Data",
        description: "Symmetric key and plaintext are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const encrypted = await symmetricEncrypt(plaintext, symmetricKey);
      setCiphertext(encrypted);
      toast({
        title: "Data Encrypted",
        description: "Data has been encrypted using the symmetric key.",
      });
    } catch (error) {
      console.error("Error encrypting data:", error);
      toast({
        title: "Encryption Failed",
        description: error instanceof Error ? error.message : "Failed to encrypt data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const decryptData = async () => {
    if (!symmetricKey || !ciphertext) {
      toast({
        title: "Missing Data",
        description: "Symmetric key and ciphertext are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const decrypted = await symmetricDecrypt(ciphertext, symmetricKey);
      setDecryptedText(decrypted);
      toast({
        title: "Data Decrypted",
        description: "Data has been decrypted using the symmetric key.",
      });
    } catch (error) {
      console.error("Error decrypting data:", error);
      toast({
        title: "Decryption Failed",
        description: error instanceof Error ? error.message : "Failed to decrypt data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Hash functions
  const computeHash = async () => {
    if (!hashInput) {
      toast({
        title: "No Input",
        description: "Please provide data to hash",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const hash = await hashWithSHA3(hashInput);
      setHashOutput(hash);
      toast({
        title: "Hash Computed",
        description: "SHA-3 hash has been computed.",
      });
    } catch (error) {
      console.error("Error computing hash:", error);
      toast({
        title: "Hashing Failed",
        description: error instanceof Error ? error.message : "Failed to compute hash",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // DTN functions
  const sendInterstellarMessage = async () => {
    if (!dtnMessage || !dtnSender || !dtnRecipient) {
      toast({
        title: "Missing Data",
        description: "Sender, recipient, and message are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setDtnStatus("sending");
    
    try {
      // Create a DTN message
      const dtnMsg: DTNMessage = {
        id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        data: dtnMessage,
        encrypted: true,
        sender: dtnSender,
        recipient: dtnRecipient,
        timestamp: new Date().toISOString(),
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        ttl: 86400, // 24 hours
        hops: 0,
        status: 'sending',
        delay: parseInt(dtnDelay.toString())
      };
      
      // Add the message to the local list
      setDtnMessages(prev => [...prev, dtnMsg]);
      
      // Send the message
      await sendDTNMessage(dtnMsg);
      
      // Update message status in the list
      setDtnMessages(prev => 
        prev.map(msg => 
          msg.id === dtnMsg.id 
            ? { ...msg, status: 'delivered', hops: Math.floor(Math.random() * 5) + 1 } 
            : msg
        )
      );
      
      setDtnStatus("delivered");
      
      toast({
        title: "Message Sent",
        description: `Message will be delivered to ${dtnRecipient} after ${dtnDelay}ms delay.`,
      });
      
      // Clear the message input
      setDtnMessage("");
      
    } catch (error) {
      console.error("Error sending DTN message:", error);
      
      // Update message status in the list to failed
      setDtnMessages(prev => 
        prev.map(msg => 
          msg.sender === dtnSender && msg.status === 'sending'
            ? { ...msg, status: 'failed' } 
            : msg
        )
      );
      
      setDtnStatus("failed");
      
      toast({
        title: "Message Sending Failed",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">TetraCryptPQC Interactive Demo</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Explore post-quantum cryptography with this interactive demonstration of TetraCryptPQC's core capabilities.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="key-encapsulation" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span className="hidden sm:inline">Key Encapsulation</span>
            <span className="sm:hidden">KEM</span>
          </TabsTrigger>
          <TabsTrigger value="digital-signatures" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Digital Signatures</span>
            <span className="sm:hidden">Sign</span>
          </TabsTrigger>
          <TabsTrigger value="symmetric-encryption" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Symmetric Encryption</span>
            <span className="sm:hidden">Encrypt</span>
          </TabsTrigger>
          <TabsTrigger value="hashing" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Hashing</span>
            <span className="sm:hidden">Hash</span>
          </TabsTrigger>
          <TabsTrigger value="dtn" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Delay-Tolerant Networking</span>
            <span className="sm:hidden">DTN</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Key Encapsulation Tab Content */}
        <TabsContent value="key-encapsulation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" /> 
                ML-KEM Key Encapsulation Mechanism
              </CardTitle>
              <CardDescription>
                ML-KEM (formerly Kyber) is a key encapsulation mechanism that is secure against quantum computer attacks.
                It allows two parties to agree on a shared secret that can be used for symmetric encryption.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">1. Generate Key Pair</h3>
                  <Button 
                    variant="outline" 
                    onClick={generateKEMKeyPair}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Generate Key Pair
                  </Button>
                </div>
                
                {kemKeyPair && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="public-key">Public Key (Share with others)</Label>
                      <Textarea 
                        id="public-key" 
                        value={kemKeyPair.publicKey}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="private-key">Private Key (Keep secret)</Label>
                      <Textarea 
                        id="private-key" 
                        value={kemKeyPair.privateKey}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">2. Encapsulate Key</h3>
                  <Button 
                    variant="outline" 
                    onClick={performEncapsulation}
                    disabled={loading || !kemKeyPair}
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Encapsulate
                  </Button>
                </div>
                
                {encapsulationResult && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="ciphertext">Ciphertext (Send to recipient)</Label>
                      <Textarea 
                        id="ciphertext" 
                        value={encapsulationResult.ciphertext}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shared-secret">Shared Secret (Keep secret)</Label>
                      <Textarea 
                        id="shared-secret" 
                        value={encapsulationResult.sharedSecret}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">3. Decapsulate Key</h3>
                  <Button 
                    variant="outline" 
                    onClick={performDecapsulation}
                    disabled={loading || !kemKeyPair || !encapsulationResult}
                    className="flex items-center gap-2"
                  >
                    <KeyRound className="h-4 w-4" />
                    Decapsulate
                  </Button>
                </div>
                
                {decapsulatedSecret && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="decapsulated-secret">Decapsulated Shared Secret</Label>
                    <Textarea 
                      id="decapsulated-secret" 
                      value={decapsulatedSecret}
                      readOnly
                      className="font-mono text-xs h-20"
                    />
                    
                    <div className={`p-2 mt-2 rounded-md ${
                      decapsulatedSecret === encapsulationResult?.sharedSecret
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {decapsulatedSecret === encapsulationResult?.sharedSecret
                        ? "✅ Success! The decapsulated secret matches the original shared secret."
                        : "❌ Error! The decapsulated secret does not match the original."}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 text-muted-foreground text-sm px-6 py-4">
              ML-KEM is standardized in NIST FIPS 205 as part of the post-quantum cryptography standardization process.
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Digital Signatures Tab Content */}
        <TabsContent value="digital-signatures">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> 
                SLH-DSA Digital Signatures
              </CardTitle>
              <CardDescription>
                SLH-DSA (formerly Dilithium) is a digital signature algorithm that is secure against quantum computer attacks.
                It allows a sender to sign messages and recipients to verify the authenticity of those messages.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">1. Generate Signature Key Pair</h3>
                  <Button 
                    variant="outline" 
                    onClick={generateSignatureKeyPair}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Generate Key Pair
                  </Button>
                </div>
                
                {signatureKeyPair && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="sig-public-key">Public Key (Verification Key)</Label>
                      <Textarea 
                        id="sig-public-key" 
                        value={signatureKeyPair.publicKey}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sig-private-key">Private Key (Signing Key)</Label>
                      <Textarea 
                        id="sig-private-key" 
                        value={signatureKeyPair.privateKey}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">2. Sign a Message</h3>
                  <Button 
                    variant="outline" 
                    onClick={signMessage}
                    disabled={loading || !signatureKeyPair || !messageToSign}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Sign Message
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  <Label htmlFor="message-to-sign">Message to Sign</Label>
                  <Textarea 
                    id="message-to-sign" 
                    value={messageToSign}
                    onChange={(e) => setMessageToSign(e.target.value)}
                    placeholder="Enter a message to sign..."
                    className="h-20"
                  />
                </div>
                
                {signature && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="signature">Signature</Label>
                    <Textarea 
                      id="signature" 
                      value={signature}
                      readOnly
                      className="font-mono text-xs h-20"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">3. Verify a Signature</h3>
                  <Button 
                    variant="outline" 
                    onClick={verifyMessageSignature}
                    disabled={loading || !signatureKeyPair || !signature || !verificationMessage}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Verify Signature
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  <Label htmlFor="verification-message">Message to Verify</Label>
                  <Textarea 
                    id="verification-message" 
                    value={verificationMessage}
                    onChange={(e) => setVerificationMessage(e.target.value)}
                    placeholder="Enter the message to verify..."
                    className="h-20"
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      onClick={() => setVerificationMessage(messageToSign)}
                      disabled={!messageToSign}
                      className="text-xs"
                    >
                      Use same as signed message
                    </Button>
                  </div>
                </div>
                
                {verificationResult !== null && (
                  <div className={`p-4 mt-2 rounded-md ${
                    verificationResult
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {verificationResult
                      ? "✅ Signature Valid! The message was signed by the owner of the private key."
                      : "❌ Signature Invalid! The signature does not match the message or public key."}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 text-muted-foreground text-sm px-6 py-4">
              SLH-DSA is standardized in NIST FIPS 206 as part of the post-quantum cryptography standardization process.
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Symmetric Encryption Tab Content */}
        <TabsContent value="symmetric-encryption">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" /> 
                Symmetric Encryption
              </CardTitle>
              <CardDescription>
                Symmetric encryption uses the same key for both encryption and decryption.
                It is efficient for encrypting large amounts of data after key agreement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">1. Generate Symmetric Key</h3>
                  <Button 
                    variant="outline" 
                    onClick={generateSymmetricKey}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Generate Key
                  </Button>
                </div>
                
                {symmetricKey && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="symmetric-key">Symmetric Key (Share securely)</Label>
                    <div className="flex">
                      <Input 
                        id="symmetric-key" 
                        value={symmetricKey}
                        readOnly
                        className="font-mono text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">2. Encrypt Data</h3>
                  <Button 
                    variant="outline" 
                    onClick={encryptData}
                    disabled={loading || !symmetricKey || !plaintext}
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Encrypt
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  <Label htmlFor="plaintext">Plaintext</Label>
                  <Textarea 
                    id="plaintext" 
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    placeholder="Enter text to encrypt..."
                    className="h-20"
                  />
                </div>
                
                {ciphertext && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="ciphertext">Ciphertext</Label>
                    <Textarea 
                      id="ciphertext-sym" 
                      value={ciphertext}
                      readOnly
                      className="font-mono text-xs h-20"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">3. Decrypt Data</h3>
                  <Button 
                    variant="outline" 
                    onClick={decryptData}
                    disabled={loading || !symmetricKey || !ciphertext}
                    className="flex items-center gap-2"
                  >
                    <KeyRound className="h-4 w-4" />
                    Decrypt
                  </Button>
                </div>
                
                {decryptedText && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="decrypted-text">Decrypted Text</Label>
                    <Textarea 
                      id="decrypted-text" 
                      value={decryptedText}
                      readOnly
                      className="h-20"
                    />
                    
                    <div className={`p-2 mt-2 rounded-md ${
                      decryptedText === plaintext
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {decryptedText === plaintext
                        ? "✅ Success! The decrypted text matches the original plaintext."
                        : "❌ Error! The decrypted text does not match the original plaintext."}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 text-muted-foreground text-sm px-6 py-4">
              Symmetric encryption, such as AES-256-GCM, remains quantum-resistant with sufficiently large keys.
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Hashing Tab Content */}
        <TabsContent value="hashing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> 
                Cryptographic Hashing (SHA-3)
              </CardTitle>
              <CardDescription>
                Cryptographic hashing creates a fixed-size fingerprint of data. 
                SHA-3 (SHAKE-256) is resistant to quantum computer attacks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Hash Data</h3>
                  <Button 
                    variant="outline" 
                    onClick={computeHash}
                    disabled={loading || !hashInput}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Compute Hash
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  <Label htmlFor="hash-input">Input Data</Label>
                  <Textarea 
                    id="hash-input" 
                    value={hashInput}
                    onChange={(e) => setHashInput(e.target.value)}
                    placeholder="Enter data to hash..."
                    className="h-20"
                  />
                </div>
                
                {hashOutput && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="hash-output">SHA-3 Hash (SHAKE-256)</Label>
                    <Textarea 
                      id="hash-output" 
                      value={hashOutput}
                      readOnly
                      className="font-mono text-xs h-20"
                    />
                    
                    <div className="p-2 mt-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                      Hash functions are one-way operations - you cannot derive the original data from the hash.
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 text-muted-foreground text-sm px-6 py-4">
              SHA-3 is considered post-quantum secure, as Grover's algorithm only reduces security by a square root factor.
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* DTN Tab Content */}
        <TabsContent value="dtn">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" /> 
                Delay-Tolerant Networking (DTN)
              </CardTitle>
              <CardDescription>
                DTN is designed for space communications where long delays, disconnections, and limited bandwidth are common.
                It's essential for interstellar and interplanetary communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Send Interstellar Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dtn-sender">Sender Station</Label>
                    <Input 
                      id="dtn-sender" 
                      value={dtnSender}
                      onChange={(e) => setDtnSender(e.target.value)}
                      placeholder="Enter sender ID..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dtn-recipient">Recipient Station</Label>
                    <Input 
                      id="dtn-recipient" 
                      value={dtnRecipient}
                      onChange={(e) => setDtnRecipient(e.target.value)}
                      placeholder="Enter recipient ID..."
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dtn-message">Message Content</Label>
                  <Textarea 
                    id="dtn-message" 
                    value={dtnMessage}
                    onChange={(e) => setDtnMessage(e.target.value)}
                    placeholder="Enter your message..."
                    className="h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dtn-delay">
                    Transmission Delay (ms) - Simulates light-speed delay between planets
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="dtn-delay" 
                      type="number"
                      min={100}
                      max={10000}
                      value={dtnDelay}
                      onChange={(e) => setDtnDelay(Number(e.target.value))}
                    />
                    <Button 
                      onClick={sendInterstellarMessage}
                      disabled={loading || !dtnMessage || !dtnSender || !dtnRecipient}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Message Queue</h3>
                  
                  {dtnMessages.length === 0 ? (
                    <div className="p-4 bg-muted rounded-md text-center text-muted-foreground">
                      No messages in queue. Send a message to see it here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dtnMessages.map((msg) => (
                        <div key={msg.id} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="font-medium">
                                From: {msg.sender} → To: {msg.recipient}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ID: {msg.id.substring(0, 12)}...
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                              msg.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              msg.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                              msg.status === 'sending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {msg.status}
                            </div>
                          </div>
                          
                          <div className="mt-2 p-2 bg-muted/50 rounded-md">
                            {msg.data}
                          </div>
                          
                          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                            <div>
                              Priority: {msg.priority}
                            </div>
                            <div>
                              Hops: {msg.hops}
                            </div>
                            <div>
                              Delay: {msg.delay}ms
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 text-muted-foreground text-sm px-6 py-4">
              DTN was originally developed by NASA for deep space communications where traditional TCP/IP protocols fail.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TetraCryptDemo;
