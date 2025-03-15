
import React from 'react';
import { MainLayout } from "@/layout/MainLayout";
import AISecurityMonitoringDashboard from '@/components/security/AISecurityMonitoringDashboard';
import { Badge } from "@/components/ui/badge";

const SecurityMonitoring: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-4 px-8 bg-accent/5 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Security Operations Center</h1>
          <Badge variant="outline" className="bg-primary/10">
            NIST FIPS 205/206 Compliant
          </Badge>
        </div>
      </div>
      <AISecurityMonitoringDashboard />
    </MainLayout>
  );
};

export default SecurityMonitoring;
