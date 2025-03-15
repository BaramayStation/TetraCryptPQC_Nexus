
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 sm:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Badge className="mb-4">NIST FIPS 205/206 Compliant</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            TetraCryptPQC Enterprise Suite
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Post-Quantum Cryptography for Secure AI-Driven Interstellar Finance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/documentation">
                <FileText className="mr-2 h-5 w-5" />
                Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[35%] h-[40%] bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[35%] h-[40%] bg-primary/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
