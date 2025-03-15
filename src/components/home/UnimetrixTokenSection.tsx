
import React from "react";
import UnimetrixTokenInfo from "@/components/whitepaper/UnimetrixTokenInfo";

const UnimetrixTokenSection = () => {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Unimetrix1 (UM1)</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            The Project Director AI-DAO from 6,575,042 here to assist humanity
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <UnimetrixTokenInfo />
        </div>
      </div>
    </section>
  );
};

export default UnimetrixTokenSection;
