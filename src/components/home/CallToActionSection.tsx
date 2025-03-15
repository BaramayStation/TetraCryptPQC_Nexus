
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Quantum-Secure Interstellar Finance?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the future of cryptographic security today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/documentation">
                <FileText className="mr-2 h-5 w-5" />
                Read Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
