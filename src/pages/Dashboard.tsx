
import React, { useEffect } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import MilitarySecurityDashboard from "@/components/dashboard/MilitarySecurityDashboard";
import { initializeSecureStorage } from "@/lib/secure-storage";
import { initializeSecureInfrastructure } from "@/lib/secure-infrastructure";
import { initializeConfidentialComputing } from "@/lib/confidential-computing";
import { toast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  // Initialize security systems
  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        // Initialize secure storage
        await initializeSecureStorage();
        
        // Initialize secure infrastructure
        await initializeSecureInfrastructure();
        
        // Initialize confidential computing
        await initializeConfidentialComputing();
        
        toast({
          title: "Security Systems Initialized",
          description: "Post-quantum cryptography and confidential computing systems are online.",
        });
      } catch (error) {
        console.error("Failed to initialize security systems:", error);
        toast({
          title: "Security Initialization Error",
          description: "Failed to initialize some security systems. Check console for details.",
          variant: "destructive",
        });
      }
    };
    
    initializeSecurity();
  }, []);
  
  return (
    <MainLayout>
      <MilitarySecurityDashboard />
    </MainLayout>
  );
};

export default Dashboard;
