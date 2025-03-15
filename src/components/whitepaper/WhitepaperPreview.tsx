
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Book, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const WhitepaperPreview = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-accent text-accent-foreground">Research Whitepaper</Badge>
          <Badge variant="outline" className="text-xs">March 14, 2025</Badge>
        </div>
        <CardTitle className="text-xl">TetraCryptPQC and UM1: A Quantum-Secure, AI-Driven Framework for Interstellar Decentralized Finance</CardTitle>
        <CardDescription className="flex items-center gap-2 mt-2">
          <Users className="h-3.5 w-3.5" />
          <span>Authors: BaramayStation, Baramay1</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <h3 className="text-sm font-semibold text-foreground">Abstract</h3>
          <p className="text-sm">
            The emergence of quantum computing threatens the security of classical cryptographic systems, while the expansion of decentralized finance (DeFi) into future interstellar economies demands resilient, scalable, and autonomous solutions. This whitepaper proposes a novel integration of TetraCryptPQC—a post-quantum cryptographic framework—and the UM1 token, a decentralized asset engineered for million-year economic sustainability.
          </p>
          
          <div className="my-4 grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3">
              <h4 className="text-xs font-medium text-foreground mb-1">Research Objectives</h4>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>Integrate TetraCryptPQC with UM1 smart contracts</li>
                <li>Design AI-driven governance mechanisms</li>
                <li>Implement million-year token distribution</li>
                <li>Establish quantum-secure interstellar DeFi</li>
              </ul>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="text-xs font-medium text-foreground mb-1">Technical Foundations</h4>
              <ul className="text-xs list-disc pl-4 space-y-1">
                <li>ML-KEM-1024 for quantum-resistant key exchange</li>
                <li>SLH-DSA for digital signatures</li>
                <li>StarkNet zk-STARKs for identity verification</li>
                <li>AI-driven security and governance</li>
              </ul>
            </div>
          </div>
          
          <div className="text-xs bg-muted p-3 rounded-md">
            <p className="italic">
              "By tackling quantum threats, governance challenges, and long-term sustainability, this research offers significant advancements in cryptography and decentralized finance. The 2025 research plan will culminate in a mainnet deployment, setting the stage for a financial system that can endure for millions of years."
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between bg-muted/20 px-6">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>Published: March 14, 2025</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs" asChild>
            <Link to="/documentation">
              <Book className="h-3.5 w-3.5 mr-1" />
              Read More
            </Link>
          </Button>
          <Button size="sm" className="text-xs">
            <Download className="h-3.5 w-3.5 mr-1" />
            Download PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WhitepaperPreview;
