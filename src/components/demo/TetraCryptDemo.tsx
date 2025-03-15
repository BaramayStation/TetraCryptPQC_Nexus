import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { 
  Lock, 
  Key, 
  Shield, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Send,
  Download,
  Cpu,
  FileText,
  Globe,
  Rocket,
  Satellite,
  Loader
} from "lucide-react";

import { 
  generateRandomBytes, 
  toHexString,
  encapsulateKey, 
  decapsulateKey,
  signData,
  verifySignature,
  deriveKey,
  symmetricEncrypt,
  symmetricDecrypt,
  sendDTNMessage,
  DTNMessage,
  PQC
} from "@/lib/pqcrypto-core";

// Demo for ML-KEM Key Encapsulation
const KeyEncapsulationDemo: React.FC = () => {
  const [generatingKeys, setGeneratingKeys] = useState(false);
  const [encapsulating, setEncapsulating] = useState(false);
  const [decapsulating, setDecapsulating] = useState(false);
  const [keyPair, setKeyPair] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [ciphertext, setCiphertext] = useState<string | null>(null);
  const [sharedSecret, setSharedSecret] = useState<string | null>(null);
  const [decapsulatedSecret, setDecapsulatedSecret] = useState<string | null>(null);
  const [secretsMatch, setSecretsMatch] = useState<boolean | null>(null);
  const { toast } = useToast();

  const generateKeyPair = async () => {
    setGeneratingKeys(true);
    try {
      // For demo, simulate ML-KEM key generation
      const publicKeyBytes = generateRandomBytes(1536); // ML-KEM-1024 public key size
      const privateKeyBytes = generateRandomBytes(3168); // ML-KEM-1024 private key size
      
      setKeyPair({
        publicKey: toHexString(publicKeyBytes),
        privateKey: toHexString(privateKeyBytes)
      });
      
      toast({
        title: "Keys Generated",
        description: "ML-KEM-1024 key pair generated successfully",
      });
      
      // Reset other states
      setCiphertext(null);
      setSharedSecret(null);
      setDecapsulatedSecret(null);
      setSecretsMatch(null);
    } catch (error) {
      console.error("Error generating key pair:", error);
      toast({
        title: "Key Generation Failed",
        description: "Could not generate ML-KEM key pair",
        variant: "destructive",
      });
    } finally {
      setGeneratingKeys(false);
    }
  };

  const performEncapsulation = async () => {
    if (!keyPair) {
      toast({
        title: "No Keys Available",
        description: "Please generate a key pair first",
        variant: "destructive",
      });
      return;
    }
    
    setEncapsulating(true);
    try {
      const result = await encapsulateKey(keyPair.publicKey);
      setCiphertext(result.ciphertext);
      setSharedSecret(result.sharedSecret);
      
      toast({
        title: "Encapsulation Successful",
        description: "Shared secret encapsulated with public key",
      });
    } catch (error) {
      console.error("Error during encapsulation:", error);
      toast({
        title: "Encapsulation Failed",
        description: "Could not encapsulate shared secret",
        variant: "destructive",
      });
    } finally {
      setEncapsulating(false);
    }
  };

  const performDecapsulation = async () => {
    if (!keyPair || !ciphertext) {
      toast({
        title: "Missing Data",
        description: "Key pair and ciphertext are required for decapsulation",
        variant: "destructive",
      });
      return;
    }
    
    setDecapsulating(true);
    try {
      const result = await decapsulateKey(ciphertext, keyPair.privateKey);
      setDecapsulatedSecret(result);
      
      // Check if decapsulated secret matches the original shared secret
      const match = result === sharedSecret;
      setSecretsMatch(match);
      
      toast({
        title: match ? "Decapsulation Successful" : "Secret Mismatch",
        description: match ? "Shared secret recovered successfully" : "Decapsulated secret does not match original",
        variant: match ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error during decapsulation:", error);
      toast({
        title: "Decapsulation Failed",
        description: "Could not recover shared secret",
        variant: "destructive",
      });
    } finally {
      setDecapsulating(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-primary" />
          <CardTitle>ML-KEM Key Encapsulation</CardTitle>
        </div>
        <CardDescription>
          NIST FIPS 205 standardized post-quantum key encapsulation mechanism
        </CardDescription>
        <Badge className="w-fit" variant="outline">{PQC.SECURITY_LEVEL.L5}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>ML-KEM-1024 Key Pair</Label>
              <Button 
                size="sm" 
                onClick={generateKeyPair} 
                disabled={generatingKeys}
                variant="outline"
              >
                {generatingKeys ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Key className="h-4 w-4 mr-2" />}
                Generate Keys
              </Button>
            </div>
            {keyPair && (
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Public Key</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-16 overflow-y-auto">
                    {keyPair.publicKey}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Private Key (protected)</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-16 overflow-y-auto">
                    {keyPair.privateKey.substring(0, 64)}...
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Key Encapsulation</Label>
              <Button 
                size="sm" 
                onClick={performEncapsulation} 
                disabled={!keyPair || encapsulating}
                variant="outline"
              >
                {encapsulating ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Shield className="h-4 w-4 mr-2" />}
                Encapsulate
              </Button>
            </div>
            {ciphertext && (
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Ciphertext</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-10 overflow-y-auto">
                    {ciphertext}
                  </div>
                </div>
                {sharedSecret && (
                  <div>
                    <Label className="text-xs">Shared Secret</Label>
                    <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-10 overflow-y-auto">
                      {sharedSecret}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Key Decapsulation</Label>
              <Button 
                size="sm" 
                onClick={performDecapsulation} 
                disabled={!keyPair || !ciphertext || decapsulating}
                variant="outline"
              >
                {decapsulating ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Key className="h-4 w-4 mr-2" />}
                Decapsulate
              </Button>
            </div>
            {decapsulatedSecret && (
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Decapsulated Secret</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-10 overflow-y-auto">
                    {decapsulatedSecret}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {secretsMatch !== null && (
                    secretsMatch ? (
                      <Alert variant="default" className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Secrets match! Key encapsulation/decapsulation successful.</AlertDescription>
                      </Alert>
                    ) : (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Secret mismatch! Key encapsulation/decapsulation failed.</AlertDescription>
                      </Alert>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Demo for SLH-DSA Digital Signatures
const DigitalSignatureDemo: React.FC = () => {
  const [generatingKeys, setGeneratingKeys] = useState(false);
  const [signing, setSigning] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [keyPair, setKeyPair] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const { toast } = useToast();

  const generateKeyPair = async () => {
    setGeneratingKeys(true);
    try {
      // For demo, simulate SLH-DSA key generation
      const publicKeyBytes = generateRandomBytes(1312); // SLH-DSA Dilithium5 public key size
      const privateKeyBytes = generateRandomBytes(2528); // SLH-DSA Dilithium5 private key size
      
      setKeyPair({
        publicKey: toHexString(publicKeyBytes),
        privateKey: toHexString(privateKeyBytes)
      });
      
      toast({
        title: "Keys Generated",
        description: "SLH-DSA Dilithium5 key pair generated successfully",
      });
      
      // Reset other states
      setSignature(null);
      setVerificationResult(null);
    } catch (error) {
      console.error("Error generating key pair:", error);
      toast({
        title: "Key Generation Failed",
        description: "Could not generate SLH-DSA key pair",
        variant: "destructive",
      });
    } finally {
      setGeneratingKeys(false);
    }
  };

  const signMessage = async () => {
    if (!keyPair || !message) {
      toast({
        title: "Missing Data",
        description: "Key pair and message are required for signing",
        variant: "destructive",
      });
      return;
    }
    
    setSigning(true);
    try {
      const result = await signData(message, keyPair.privateKey);
      setSignature(result);
      setVerificationResult(null); // Reset verification
      
      toast({
        title: "Signing Successful",
        description: "Message signed with SLH-DSA Dilithium5",
      });
    } catch (error) {
      console.error("Error during signing:", error);
      toast({
        title: "Signing Failed",
        description: "Could not sign message",
        variant: "destructive",
      });
    } finally {
      setSigning(false);
    }
  };

  const verifyMessageSignature = async () => {
    if (!keyPair || !message || !signature) {
      toast({
        title: "Missing Data",
        description: "Key pair, message, and signature are required for verification",
        variant: "destructive",
      });
      return;
    }
    
    setVerifying(true);
    try {
      const result = await verifySignature(message, signature, keyPair.publicKey);
      setVerificationResult(result);
      
      toast({
        title: result ? "Verification Successful" : "Verification Failed",
        description: result ? "Signature is valid" : "Invalid signature detected",
        variant: result ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error during verification:", error);
      toast({
        title: "Verification Error",
        description: "Could not verify signature",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleTamper = () => {
    if (!signature) return;
    
    // Modify a character in the signature to simulate tampering
    const sigArray = signature.split('');
    const randomIndex = Math.floor(Math.random() * sigArray.length);
    sigArray[randomIndex] = sigArray[randomIndex] === 'f' ? '0' : 'f';
    
    setSignature(sigArray.join(''));
    setVerificationResult(null); // Reset verification
    
    toast({
      title: "Signature Tampered",
      description: "Signature has been modified to simulate an attack",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>SLH-DSA Digital Signatures</CardTitle>
        </div>
        <CardDescription>
          NIST FIPS 206 standardized post-quantum digital signature algorithm
        </CardDescription>
        <Badge className="w-fit" variant="outline">{PQC.SECURITY_LEVEL.L5}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>SLH-DSA Dilithium5 Key Pair</Label>
              <Button 
                size="sm" 
                onClick={generateKeyPair} 
                disabled={generatingKeys}
                variant="outline"
              >
                {generatingKeys ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Key className="h-4 w-4 mr-2" />}
                Generate Keys
              </Button>
            </div>
            {keyPair && (
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Public Key</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-12 overflow-y-auto">
                    {keyPair.publicKey}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Private Key (protected)</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-12 overflow-y-auto">
                    {keyPair.privateKey.substring(0, 64)}...
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label>Message to Sign</Label>
            <Textarea
              placeholder="Enter a message to sign..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-20"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Digital Signature</Label>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={signMessage} 
                  disabled={!keyPair || !message || signing}
                  variant="outline"
                >
                  {signing ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
                  Sign
                </Button>
                {signature && (
                  <Button 
                    size="sm" 
                    onClick={handleTamper}
                    variant="destructive"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Tamper
                  </Button>
                )}
              </div>
            </div>
            {signature && (
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Signature</Label>
                  <div className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto h-20 overflow-y-auto">
                    {signature}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Signature Verification</Label>
              <Button 
                size="sm" 
                onClick={verifyMessageSignature} 
                disabled={!keyPair || !message || !signature || verifying}
                variant="outline"
              >
                {verifying ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                Verify
              </Button>
            </div>
            {verificationResult !== null && (
              <Alert variant={verificationResult ? "default" : "destructive"} className={verificationResult ? "bg-green-50 border-green-200" : ""}>
                {verificationResult ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <AlertTitle>{verificationResult ? "Valid Signature" : "Invalid Signature"}</AlertTitle>
                <AlertDescription>
                  {verificationResult 
                    ? "The signature is authentic and the message has not been tampered with." 
                    : "Signature verification failed. The message may have been altered or the signature is invalid."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Demo for Delay-Tolerant Networking with Post-Quantum Security
const DTNSecureMessagingDemo: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<'plaintext' | 'encrypted'>('encrypted');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [delay, setDelay] = useState<number>(3000); // 3 seconds
  const [isSending, setIsSending] = useState(false);
  const [sentMessages, setSentMessages] = useState<DTNMessage[]>([]);
  const [deliveredMessages, setDeliveredMessages] = useState<DTNMessage[]>([]);
  const [decryptedMessages, setDecryptedMessages] = useState<{[id: string]: string}>({});
  
  const { toast } = useToast();

  const simulateInterstellarTransmission = async () => {
    if (!message) {
      toast({
        title: "Empty Message",
        description: "Please enter a message to send",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    try {
      // Generate sender and recipient IDs
      const senderId = `earth-station-${Math.floor(Math.random() * 1000)}`;
      const recipientId = `asteroid-miner-${Math.floor(Math.random() * 1000)}`;
      
      // Generate encryption key for the message (in real system, this would use ML-KEM)
      const encryptionKey = toHexString(generateRandomBytes(32));
      
      // Encrypt or keep plaintext based on selection
      let messageData = message;
      let encrypted = false;
      
      if (messageType === 'encrypted') {
        messageData = await symmetricEncrypt(message, encryptionKey);
        encrypted = true;
      }
      
      // Create a DTN message
      const dtnMessage: DTNMessage = {
        id: `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        data: messageData,
        encrypted,
        sender: senderId,
        recipient: recipientId,
        timestamp: new Date().toISOString(),
        priority,
        ttl: 86400, // 24 hours
        hops: 0,
        status: 'sending',
        delay: delay
      };
      
      // Add to sent messages
      setSentMessages(prev => [...prev, dtnMessage]);
      
      // Send the message (simulated with delay)
      const messageId = await sendDTNMessage(dtnMessage);
      
      // Update delivered messages after successful transmission
      setDeliveredMessages(prev => [
        ...prev, 
        { ...dtnMessage, status: 'delivered', hops: Math.floor(Math.random() * 5) + 1 }
      ]);
      
      // If encrypted, store the decryption result for demo purposes
      if (encrypted) {
        setDecryptedMessages(prev => ({
          ...prev,
          [dtnMessage.id]: message
        }));
      }
      
      toast({
        title: "Transmission Complete",
        description: `Message delivered after ${delay/1000} seconds`,
      });
    } catch (error) {
      console.error("Error during transmission:", error);
      toast({
        title: "Transmission Failed",
        description: "Could not deliver the message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const decryptMessage = async (msgId: string) => {
    const message = deliveredMessages.find(msg => msg.id === msgId);
    if (!message || !message.encrypted) return;
    
    // In a real system, this would use the proper decryption key
    // For demo, we already have the decrypted contents
    
    toast({
      title: "Message Decrypted",
      description: `Original message: "${decryptedMessages[msgId]}"`,
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Satellite className="h-5 w-5 text-primary" />
          <CardTitle>Delay-Tolerant Networking</CardTitle>
        </div>
        <CardDescription>
          Secure interstellar communication with post-quantum encryption
        </CardDescription>
        <Badge className="w-fit" variant="outline">Helium-3 Mining Operations</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea
                  placeholder="Enter message for interstellar transmission..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Security</Label>
                  <Select 
                    value={messageType} 
                    onValueChange={(value) => setMessageType(value as 'plaintext' | 'encrypted')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encrypted">PQC Encrypted</SelectItem>
                      <SelectItem value="plaintext">Plaintext</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={priority} 
                    onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high' | 'critical')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Transmission Delay ({delay/1000}s)</Label>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="1000"
                  value={delay}
                  onChange={(e) => setDelay(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1s</span>
                  <span>5s</span>
                  <span>10s</span>
                </div>
              </div>
              
              <Button 
                onClick={simulateInterstellarTransmission} 
                disabled={isSending || !message}
                className="w-full"
              >
                {isSending ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Transmit Message
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Delivered Messages</Label>
              <div className="bg-muted rounded-md h-[300px] overflow-y-auto">
                {deliveredMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No messages delivered yet
                  </div>
                ) : (
                  <div className="space-y-2 p-2">
                    {deliveredMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className="bg-card p-3 rounded-md border text-sm space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <Badge variant={
                            msg.priority === 'critical' ? 'destructive' :
                            msg.priority === 'high' ? 'default' :
                            'outline'
                          }>
                            {msg.priority}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {msg.encrypted ? 'Encrypted' : 'Plaintext'}
                            </Badge>
                            {msg.encrypted && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-6 px-2"
                                onClick={() => decryptMessage(msg.id)}
                              >
                                <Lock className="h-3 w-3 mr-1" />
                                Decrypt
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-xs font-mono bg-background p-2 rounded-md break-all">
                          {msg.encrypted ? (
                            msg.data.substring(0, 32) + '...'
                          ) : (
                            msg.data
                          )}
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>From: {msg.sender}</span>
                          <span>To: {msg.recipient}</span>
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Hops: {msg.hops}</span>
                          <span>Delay: {msg.delay / 1000}s</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Demo Component
const TetraCryptDemo: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">TetraCryptPQC Academic Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive demonstration of post-quantum cryptographic capabilities for secure interstellar communications
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="key-exchange">Key Exchange</TabsTrigger>
          <TabsTrigger value="signatures">Digital Signatures</TabsTrigger>
          <TabsTrigger value="interstellar">Interstellar DTN</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                TetraCryptPQC System Overview
              </CardTitle>
              <CardDescription>
                Post-quantum cryptography framework for secure communication in quantum-threatened environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">ML-KEM</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Module Lattice-based Key Encapsulation Mechanism for quantum-resistant key exchange.
                  </p>
                  <Badge variant="outline">{PQC.STANDARD.FIPS_205}</Badge>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">SLH-DSA</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Stateless Hash-based Digital Signature Algorithm for secure message authentication.
                  </p>
                  <Badge variant="outline">{PQC.STANDARD.FIPS_206}</Badge>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">DTN Security</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Delay-Tolerant Networking protocols with quantum-resistant security for interstellar communications.
                  </p>
                  <Badge variant="outline">Interstellar Operations</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Security Level Comparison</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Classical (RSA-2048)</span>
                      <span>112-bit</span>
                    </div>
                    <Progress value={44} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Classical (ECC P-256)</span>
                      <span>128-bit</span>
                    </div>
                    <Progress value={50} className="h
