
import React from "react";
import { SecureHead } from "@/utils/secure-head";
import LaunchReadinessPanel from "@/components/testing/LaunchReadinessPanel";

const LaunchReadinessPage: React.FC = () => {
  return (
    <>
      <SecureHead
        title="TetraCryptPQC - Launch Readiness Tests"
        description="Verify that all TetraCryptPQC components are working correctly before launch"
      />
      
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
