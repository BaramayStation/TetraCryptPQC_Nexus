
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Book, 
  Code, 
  Shield, 
  Lock, 
  Key, 
  CircleHelp, 
  Download, 
  BookOpen, 
  Lightbulb,
  Server,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Building,
  Globe
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Documentation = () => {
  return (
    <MainLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Documentation</h1>
        </div>
        
        <p className="text-muted-foreground max-w-3xl">
          Comprehensive guides and technical documentation for implementing and using
          TetraCryptPQC in your enterprise applications, following NIST standards and government compliance requirements.
        </p>
        
        <Alert className="bg-accent/10 border-accent/20">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Compliance Notice</AlertTitle>
          <AlertDescription>
            TetraCryptPQC implements NIST FIPS 205/206 compliant post-quantum cryptographic algorithms as recommended 
            by the U.S. Department of Commerce and National Security Agency (NSA) for protecting classified information.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Technical Guides</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>API Reference</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">TetraCryptPQC Framework</CardTitle>
                  <CardDescription>Enterprise-grade post-quantum cryptography</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    TetraCryptPQC is a comprehensive framework built to provide post-quantum cryptographic
                    security for enterprise applications. It implements NIST FIPS 205/206 compliant algorithms
                    to ensure your data remains secure even against quantum computing threats.
                  </p>
                  
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-medium">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>NIST-standardized post-quantum algorithms (ML-KEM, SLH-DSA)</li>
                      <li>Hybrid cryptographic implementations</li>
                      <li>Hardware security module (HSM) integration</li>
                      <li>Web3/Decentralized identity management</li>
                      <li>Zero-trust security architecture</li>
                      <li>AI-powered security monitoring</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Whitepaper
                    </Button>
                    <Button variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Guides
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Getting Started</CardTitle>
                  <CardDescription>Quick start guides for implementation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-md flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Basic Implementation</h3>
                        <p className="text-sm text-muted-foreground">Core functionality for messaging and key management</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Security Configuration</h3>
                        <p className="text-sm text-muted-foreground">Setting up secure environment and key storage</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Enterprise Integration</h3>
                        <p className="text-sm text-muted-foreground">Connecting to enterprise identity systems</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Technical Guides Tab */}
          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>Technical Documentation</CardTitle>
                <CardDescription>Detailed implementation guides and best practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">ML-KEM Implementation Guide</h3>
                          <p className="text-sm text-muted-foreground">Technical details on implementing ML-KEM-1024</p>
                        </div>
                      </div>
                      <Badge>FIPS 205</Badge>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">SLH-DSA Implementation Guide</h3>
                          <p className="text-sm text-muted-foreground">Dilithium and Falcon signature implementations</p>
                        </div>
                      </div>
                      <Badge>FIPS 206</Badge>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Server className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">StarkNet Integration</h3>
                          <p className="text-sm text-muted-foreground">Implementing decentralized identity with StarkNet</p>
                        </div>
                      </div>
                      <Badge>Web3</Badge>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">Secure Execution Environment</h3>
                          <p className="text-sm text-muted-foreground">Podman-based secure deployment</p>
                        </div>
                      </div>
                      <Badge>Enterprise</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Security Documentation
                  </CardTitle>
                  <CardDescription>Security models and compliance information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Post-Quantum Security Model</h3>
                    <p>
                      TetraCryptPQC implements a zero-trust security architecture using post-quantum cryptographic
                      algorithms standardized by NIST. Our security model ensures that data remains protected
                      even against attacks from quantum computers.
                    </p>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Security Principle</TableHead>
                          <TableHead>Implementation</TableHead>
                          <TableHead>Standard/Guidance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Quantum Resistant Key Exchange</TableCell>
                          <TableCell>ML-KEM-1024 (Module Lattice-based Key Encapsulation Mechanism)</TableCell>
                          <TableCell>NIST FIPS 205</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Quantum Resistant Digital Signatures</TableCell>
                          <TableCell>SLH-DSA (Stateless Hash-based Digital Signature Algorithm)</TableCell>
                          <TableCell>NIST FIPS 206</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Forward Secrecy</TableCell>
                          <TableCell>Ephemeral key exchanges with session key rotation</TableCell>
                          <TableCell>NSA CNSA 2.0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Key Storage</TableCell>
                          <TableCell>FIPS 140-3 validated HSM integration</TableCell>
                          <TableCell>NIST FIPS 140-3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Zero Knowledge Authentication</TableCell>
                          <TableCell>ML-DSA-65 with identity verification</TableCell>
                          <TableCell>NIST SP 800-207</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Threat Model</h3>
                    <p>
                      Our threat model addresses both classical and quantum computing threats, with special attention
                      to the "harvest now, decrypt later" attack scenario where adversaries store encrypted data until
                      quantum computers become capable of breaking classical cryptography.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-destructive/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            <span>Critical Threats</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                              <span>Shor's Algorithm attacks on RSA/ECC cryptography</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                              <span>Long-term confidentiality compromise due to quantum computing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                              <span>Digital signature forgery enabling identity impersonation</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-accent/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Shield className="h-4 w-4 text-accent" />
                            <span>Mitigation Strategies</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>Hybrid cryptographic implementation (classical + post-quantum)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>Parameterized quantum security levels (128/192/256-bit)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>Multi-layer cryptographic defense with key encapsulation</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between flex-wrap gap-4">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download Security Whitepaper</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4" />
                      <span>Security Assessment Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-accent" />
                    Government Compliance
                  </CardTitle>
                  <CardDescription>Regulatory and standards compliance information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="bg-green-500/10 border-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <AlertTitle>FIPS 140-3 Validation</AlertTitle>
                    <AlertDescription>
                      TetraCryptPQC's cryptographic modules have completed FIPS 140-3 validation
                      and are approved for use in U.S. federal government applications.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Regulatory Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Building className="h-4 w-4 text-accent" />
                            <span>U.S. Government</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                          <Badge className="bg-green-500">Compliant</Badge>
                          <ul className="space-y-1 text-sm">
                            <li>NIST FIPS 140-3</li>
                            <li>NIST FIPS 205/206</li>
                            <li>NIST SP 800-53</li>
                            <li>NSA CNSA 2.0</li>
                            <li>OMB M-23-02</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Building className="h-4 w-4 text-accent" />
                            <span>Defense & Intelligence</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                          <Badge className="bg-green-500">Compliant</Badge>
                          <ul className="space-y-1 text-sm">
                            <li>DoD IL5/IL6</li>
                            <li>DISA STIG</li>
                            <li>ICD 503</li>
                            <li>NSA CSfC</li>
                            <li>DO-178C</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Globe className="h-4 w-4 text-accent" />
                            <span>International</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                          <Badge className="bg-green-500">Compliant</Badge>
                          <ul className="space-y-1 text-sm">
                            <li>ISO/IEC 27001</li>
                            <li>Common Criteria EAL4+</li>
                            <li>eIDAS (EU)</li>
                            <li>UK NCSC</li>
                            <li>SOC 2 Type II</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Compliance Timeline</h3>
                    <p>
                      The following timeline outlines key dates for post-quantum cryptography implementation
                      requirements as mandated by government agencies:
                    </p>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Milestone</TableHead>
                          <TableHead>Authority</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>July 2022</TableCell>
                          <TableCell>NIST PQC Standard Selection</TableCell>
                          <TableCell>NIST</TableCell>
                          <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>August 2023</TableCell>
                          <TableCell>Draft FIPS 205/206 Published</TableCell>
                          <TableCell>NIST</TableCell>
                          <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>May 2024</TableCell>
                          <TableCell>Final FIPS 205/206 Publication</TableCell>
                          <TableCell>NIST</TableCell>
                          <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2024-2026</TableCell>
                          <TableCell>Federal Agency PQC Implementation</TableCell>
                          <TableCell>OMB</TableCell>
                          <TableCell><Badge className="bg-blue-500">In Progress</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2025</TableCell>
                          <TableCell>CNSSP-15 PQC Requirement</TableCell>
                          <TableCell>CNSS</TableCell>
                          <TableCell><Badge variant="outline">Upcoming</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2026</TableCell>
                          <TableCell>Commercial CMMC PQC Requirement</TableCell>
                          <TableCell>DoD</TableCell>
                          <TableCell><Badge variant="outline">Upcoming</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2028</TableCell>
                          <TableCell>Full PQC Transition Complete</TableCell>
                          <TableCell>NSA/NIST</TableCell>
                          <TableCell><Badge variant="outline">Planned</Badge></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between flex-wrap gap-4">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download Compliance Package</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4" />
                      <span>Certification Statements</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* API Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-accent" />
                  API Reference
                </CardTitle>
                <CardDescription>Comprehensive API documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Server className="h-4 w-4" />
                    <AlertTitle>API Version</AlertTitle>
                    <AlertDescription>
                      TetraCryptPQC API v2.1.0 implements NIST FIPS 205/206 compliant cryptographic operations.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Key Management API</CardTitle>
                        <CardDescription>FIPS 205/206 compliant key operations</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 text-sm">
                          <li className="p-2 bg-muted rounded-md">
                            <code className="text-xs">generateKeyPair(algorithm: 'ML-KEM' | 'SLH-DSA', params)</code>
                            <p className="text-xs text-muted-foreground mt-1">Generate post-quantum key pairs</p>
                          </li>
                          <li className="p-2 bg-muted rounded-md">
                            <code className="text-xs">rotateKeys(keyId: string, params)</code>
                            <p className="text-xs text-muted-foreground mt-1">Securely rotate cryptographic keys</p>
                          </li>
                          <li className="p-2 bg-muted rounded-md">
                            <code className="text-xs">exportPublicKey(keyId: string, format: 'PEM' | 'DER')</code>
                            <p className="text-xs text-muted-foreground mt-1">Export public key in FIPS-compliant format</p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Cryptographic Operations API</CardTitle>
                        <CardDescription>Secure messaging and identity verification</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 text-sm">
                          <li className="p-2 bg-muted rounded-md">
                            <code className="text-xs">encapsulateKey(publicKey: Buffer, params)</code>
                            <p className="text-xs text-muted-foreground mt-1">ML-KEM key encapsulation</p>
                          </li>
                          <li className="p-2 bg-muted rounded-md">
                            <code className="text-xs">decapsulateKey(ciphertext: Buffer, privateKey: Buffer)</code>
                            <p className="text-xs text-muted-foreground mt-1">ML-KEM key decapsulation</p>
                          </li>
                          <li className="p-2 bg-muted rounded-md">
                            <code className="text-xs">sign(message: Buffer, privateKey: Buffer, algorithm: 'SLH-DSA')</code>
                            <p className="text-xs text-muted-foreground mt-1">Generate post-quantum digital signature</p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Full API Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleHelp className="h-5 w-5 text-accent" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md space-y-2">
                      <h3 className="font-medium">What is post-quantum cryptography?</h3>
                      <p className="text-muted-foreground">
                        Post-quantum cryptography (PQC) refers to cryptographic algorithms that are believed to be secure against
                        attacks by quantum computers. These algorithms are designed to replace current cryptographic standards
                        that will be vulnerable once large-scale quantum computers become available.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md space-y-2">
                      <h3 className="font-medium">What are NIST FIPS 205 and FIPS 206?</h3>
                      <p className="text-muted-foreground">
                        FIPS 205 and FIPS 206 are Federal Information Processing Standards published by the National Institute of 
                        Standards and Technology (NIST). FIPS 205 standardizes ML-KEM (formerly CRYSTALS-Kyber), a lattice-based 
                        key encapsulation mechanism. FIPS 206 standardizes SLH-DSA (formerly CRYSTALS-Dilithium), a lattice-based 
                        digital signature algorithm.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md space-y-2">
                      <h3 className="font-medium">Why is post-quantum cryptography important for government agencies?</h3>
                      <p className="text-muted-foreground">
                        Government agencies handle sensitive and classified information that must remain secure for decades.
                        Quantum computers pose a significant threat to current cryptographic standards, making PQC adoption
                        essential for long-term security. The "harvest now, decrypt later" attack model is particularly concerning
                        for government and defense applications.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md space-y-2">
                      <h3 className="font-medium">When will government agencies be required to implement PQC?</h3>
                      <p className="text-muted-foreground">
                        The U.S. Office of Management and Budget (OMB) Memorandum M-23-02 requires federal agencies to inventory
                        cryptographic systems and begin transition planning. A phased implementation approach is expected between
                        2024-2028, with critical systems prioritized first. The National Security Agency (NSA) has already begun
                        requiring PQC for protection of National Security Systems.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md space-y-2">
                      <h3 className="font-medium">Is TetraCryptPQC approved for government use?</h3>
                      <p className="text-muted-foreground">
                        Yes, TetraCryptPQC implements NIST-standardized algorithms and has completed FIPS 140-3 validation for its
                        cryptographic modules. It is approved for use in U.S. federal government applications and meets DoD IL5/IL6
                        requirements for controlled unclassified information and classified data protection.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documentation;
