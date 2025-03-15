
import React from "react";
import WhitepaperPreview from "@/components/whitepaper/WhitepaperPreview";

const WhitepaperSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Interstellar Quantum Security</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Our groundbreaking research on quantum-resistant cryptography for interstellar finance
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <WhitepaperPreview />
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection;
