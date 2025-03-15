
import React from 'react';
import { MainLayout } from "@/layout/MainLayout";
import AISecurityDashboard from "@/components/security/AISecurityDashboard";

const AISecurity: React.FC = () => {
  return (
    <MainLayout>
      <AISecurityDashboard />
    </MainLayout>
  );
};

export default AISecurity;
