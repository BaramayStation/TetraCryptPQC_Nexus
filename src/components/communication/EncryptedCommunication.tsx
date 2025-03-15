
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Send, FileText, Download, Upload, RefreshCw } from "lucide-react";
import { GlassContainer } from "@/components/ui/glass-container";

const EncryptedCommunication: React.FC = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [encryptionMethod, setEncryptionMethod] = useState('ml-kem');
  const [signatureMethod, setSignatureMethod] = useState('slh-dsa');
  const [operationStatus, setOperationStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Mock function for quantum-resistant encryption
  const encryptMessage = () => {
    if (!message || !recipient) {
      setOperationStatus({ 
        type: 'error', 
        message: 'Please enter both message and recipient' 
      });
      return;
    }
    
    setOperationStatus({ 
      type: 'success', 
      message: `Message encrypted with ${encryptionMethod.toUpperCase()} and signed with ${signatureMethod.toUpperCase()}` 
    });
    
    // In a real implementation, this would use the actual cryptographic functions
    console.log(`Encrypting message with ${encryptionMethod}`);
    console.log(`Signing message with ${signatureMethod}`);
    
    // Reset form after "sending"
    setTimeout(() => {
      setMessage('');
      setOperationStatus({ type: 'idle', message: '' });
    }, 3000);
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Lock className="h-8 w-8 text-accent" />
            Post-Quantum Secure Communication
          </h1>
          <p className="text-muted-foreground">
            Send messages encrypted with NIST-approved post-quantum algorithms
          </p>
        </div>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList>
          <TabsTrigger value="send">Send Message</TabsTrigger>
          <TabsTrigger value="receive">Receive Messages</TabsTrigger>
          <TabsTrigger value="keys">Key Management</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <GlassContainer className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Compose Secure Message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Recipient</label>
                    <Input 
                      placeholder="Enter recipient DID or public key" 
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <textarea 
                      className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
                      placeholder="Enter your message" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-between space-x-2">
                    <Button onClick={encryptMessage} className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Encrypt & Send
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Attach File
                    </Button>
                  </div>
                  
                  {operationStatus.type !== 'idle' && (
                    <div className={`p-3 rounded-md ${
                      operationStatus.type === 'success' ? 'bg-green-500/10 text-green-600' : 
                      'bg-red-500/10 text-red-600'
                    }`}>
                      {operationStatus.message}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Encryption Settings</h3>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Key Encapsulation Mechanism</CardTitle>
                    <CardDescription>Choose the encryption algorithm</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        onClick={() => setEncryptionMethod('ml-kem')}
                        className={`cursor-pointer ${encryptionMethod === 'ml-kem' ? 'bg-accent' : 'bg-secondary'}`}
                      >
                        ML-KEM 1024 (FIPS 205)
                      </Badge>
                      <Badge
                        onClick={() => setEncryptionMethod('bike')}
                        className={`cursor-pointer ${encryptionMethod === 'bike' ? 'bg-accent' : 'bg-secondary'}`}
                      >
                        BIKE-L3
                      </Badge>
                      <Badge
                        onClick={() => setEncryptionMethod('classic-mceliece')}
                        className={`cursor-pointer ${encryptionMethod === 'classic-mceliece' ? 'bg-accent' : 'bg-secondary'}`}
                      >
                        Classic McEliece
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    ML-KEM (Kyber) is NIST's recommended post-quantum KEM
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Digital Signature Algorithm</CardTitle>
                    <CardDescription>Choose the signing algorithm</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        onClick={() => setSignatureMethod('slh-dsa')}
                        className={`cursor-pointer ${signatureMethod === 'slh-dsa' ? 'bg-accent' : 'bg-secondary'}`}
                      >
                        SLH-DSA (FIPS 206)
                      </Badge>
                      <Badge
                        onClick={() => setSignatureMethod('falcon')}
                        className={`cursor-pointer ${signatureMethod === 'falcon' ? 'bg-accent' : 'bg-secondary'}`}
                      >
                        Falcon-512
                      </Badge>
                      <Badge
                        onClick={() => setSignatureMethod('sphincs+')}
                        className={`cursor-pointer ${signatureMethod === 'sphincs+' ? 'bg-accent' : 'bg-secondary'}`}
                      >
                        SPHINCS+
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    SLH-DSA (Dilithium) is NIST's recommended post-quantum signature scheme
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Security Strength</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Post-Quantum Security Level: <strong>256-bit</strong></span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Lock className="h-4 w-4 text-green-500" />
                      <span className="text-sm">NIST Security Level: <strong>Level 5</strong></span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="receive" className="space-y-4">
          <GlassContainer className="p-6">
            <h3 className="text-lg font-semibold mb-4">Secure Inbox</h3>
            <div className="text-center py-12">
              <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your secure inbox is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Received messages will appear here</p>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <GlassContainer className="p-6">
            <h3 className="text-lg font-semibold mb-4">Key Management</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ML-KEM Key Pair</CardTitle>
                  <CardDescription>Quantum-resistant key encapsulation mechanism</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Status:</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Creation Date:</span>
                      <span className="text-sm">2024-04-15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Compliance:</span>
                      <span className="text-sm">NIST FIPS 205</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Public Key
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate Keys
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SLH-DSA Key Pair</CardTitle>
                  <CardDescription>Quantum-resistant digital signature algorithm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Status:</span>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Creation Date:</span>
                      <span className="text-sm">2024-04-15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Compliance:</span>
                      <span className="text-sm">NIST FIPS 206</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Public Key
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate Keys
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EncryptedCommunication;
