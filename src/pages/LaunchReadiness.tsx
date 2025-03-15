
import React from "react";
import { Helmet } from "react-helmet-async";
import LaunchReadinessPanel from "@/components/testing/LaunchReadinessPanel";

const LaunchReadinessPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TetraCryptPQC - Launch Readiness Tests</title>
        <meta 
          name="description" 
          content="Verify that all TetraCryptPQC components are working correctly before launch" 
        />
      </Helmet>
      
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Launch Readiness</h1>
          <p className="text-muted-foreground">
            Verify that all cryptographic and P2P functions are working correctly before deploying to production
          </p>
        </div>
        
        <LaunchReadinessPanel />
      </div>
    </>
  );
};

export default LaunchReadinessPage;
