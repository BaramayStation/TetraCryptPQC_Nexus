
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, Book, ArrowRight, Shield, FileText } from 'lucide-react';

const ThreatModels: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-6 w-6 text-primary" />
          <Badge variant="outline" className="text-xs">Security Analysis</Badge>
          <Badge variant="outline" className="text-xs">Quantum Threats</Badge>
        </div>
        <h1 className="text-3xl font-bold">Quantum Threat Models</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive analysis of quantum computing threats to cryptographic systems
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: September 15, 2023</span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quantum-threats">Quantum Threats</TabsTrigger>
          <TabsTrigger value="protection">Protection Strategies</TabsTrigger>
          <TabsTrigger value="timeline">Threat Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Threat Model Overview</h2>
              <p className="mb-4">
                The TetraCryptPQC threat model analyzes potential security threats from both classical and quantum computing adversaries. Understanding these threats is essential for implementing effective security measures and ensuring the long-term security of cryptographic systems.
              </p>
              <p className="mb-4">
                This document outlines the various attack vectors, their potential impact, and the countermeasures implemented in TetraCryptPQC to mitigate these threats.
              </p>
              <div className="bg-muted p-4 rounded-md mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Key Threats</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Quantum computers breaking RSA and ECC cryptography via Shor's algorithm</li>
                  <li>Grover's algorithm reducing symmetric key security</li>
                  <li>Harvest now, decrypt later attacks</li>
                  <li>Post-quantum algorithm implementation vulnerabilities</li>
                  <li>Side-channel attacks against quantum-resistant implementations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Attack Vectors</h2>
              <p className="mb-4">
                TetraCryptPQC's threat model considers multiple attack vectors that could compromise the security of cryptographic systems. These include direct cryptanalysis, side-channel attacks, implementation flaws, and social engineering.
              </p>
              <p className="mb-4">
                The threat model also considers the timeline for quantum computers becoming powerful enough to break current cryptographic systems, and provides strategies for migrating to quantum-resistant algorithms before this occurs.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quantum-threats" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Quantum Computing Threats</h2>
              <p>This section details specific threats posed by quantum computing.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detailed quantum threat content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="protection" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Protection Strategies</h2>
              <p>This section details strategies for protecting against quantum threats.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Protection strategy content would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Quantum Threat Timeline</h2>
              <p>This section outlines the expected timeline for quantum threats.</p>
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Timeline analysis would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Related Topics</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href="/wiki/cryptography/post-quantum-basics" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Post-Quantum Basics
          </a>
          <a href="/wiki/security/architecture" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Security Architecture
          </a>
          <a href="/wiki/military/cyber-warfare" className="text-primary hover:underline flex items-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            Cyber Warfare
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThreatModels;
