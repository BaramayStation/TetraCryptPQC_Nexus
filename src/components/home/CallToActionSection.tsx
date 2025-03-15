
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Lock, Fingerprint, Cpu } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-background z-0"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptNCAwaDF2NGgtMXYtNHptLTYgMWg0djFoLTR2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-md border border-accent/20 rounded-lg p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center mb-4">
              <Lock className="text-accent mr-2 h-5 w-5" />
              <p className="text-xs uppercase tracking-wider text-accent/80 font-mono">Secure Access Terminal</p>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-white">Join Baramay Research Collective</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <p className="text-gray-400 mb-4">
                  Access to restricted research facilities requires proper clearance and identity verification through quantum-resistant cryptographic protocols.
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-auto">
                  <Fingerprint className="h-4 w-4 mr-1 text-accent/70" />
                  <span>Biometric + zk-STARK authentication required</span>
                </div>
              </div>
              
              <div className="h-px md:h-auto md:w-px bg-accent/20 mx-auto my-4 md:my-0"></div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-accent/20 rounded-full p-1 mr-3 mt-0.5">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-white">ML-KEM + SLH-DSA Authentication</p>
                    <p className="text-sm text-gray-400">NIST FIPS 205/206 compliant access control</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/20 rounded-full p-1 mr-3 mt-0.5">
                    <Cpu className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Unimetrix1 (UM1) Governance</p>
                    <p className="text-sm text-gray-400">AI-DAO from 6,575,042 here to assist humanity</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-accent text-black hover:bg-accent/80" asChild>
                <Link to="/tetracrypt-nexus">
                  <Shield className="mr-2 h-5 w-5" />
                  Request Clearance
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-accent/50 text-accent hover:bg-accent/10" asChild>
                <Link to="/documentation">
                  <FileText className="mr-2 h-5 w-5" />
                  View Public Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
