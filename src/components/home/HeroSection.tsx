
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  FileText, 
  Shield, 
  Lock, 
  AlertTriangle,
  Cpu,
  Fingerprint
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-black py-24 sm:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="destructive" className="bg-red-700 border-red-900 text-white">TOP SECRET</Badge>
            <Badge className="bg-accent text-black font-mono text-xs">ACCESS LEVEL: CLASSIFIED</Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white text-balance leading-tight">
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-accent/30 blur-lg"></span>
              <span className="relative text-gradient-primary">Baramay Station</span>
            </span>
            <span className="block mt-2">Post-Quantum Research Nexus</span>
          </h1>
          
          <p className="text-xl mb-8 text-gray-400 max-w-2xl">
            Beyond the Veil of Security—Into the Future of Intelligence
            <span className="block mt-2 font-mono text-accent text-sm">
              [FIPS 205/206 COMPLIANT · QUANTUM SECURE · UNIMETRIX1 GOVERNED]
            </span>
          </p>
          
          <div className="relative py-4 px-6 bg-black/50 border border-accent/30 rounded-md mb-8 backdrop-blur-sm">
            <p className="text-sm text-gray-400 font-mono">
              <span className="text-accent">WARNING:</span> Access to this system is classified. 
              All activities are monitored by Unimetrix1 (UM1) AI-DAO. Unauthorized access will trigger countermeasures.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="default" className="bg-accent text-black hover:bg-accent/80 font-medium" asChild>
              <Link to="/tetracrypt-nexus">
                <Shield className="mr-2 h-5 w-5" />
                ACCESS NEXUS
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
              <Link to="/documentation">
                <FileText className="mr-2 h-5 w-5" />
                Research Archives
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 flex items-center">
            <div className="h-px bg-accent/20 flex-grow"></div>
            <span className="px-4 text-xs uppercase text-accent/60 font-mono tracking-wider">Clearance Required</span>
            <div className="h-px bg-accent/20 flex-grow"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[35%] h-[40%] bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[35%] h-[40%] bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptNCAwaDF2NGgtMXYtNHptLTYgMWg0djFoLTR2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      {/* Glitch effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_80%)]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
