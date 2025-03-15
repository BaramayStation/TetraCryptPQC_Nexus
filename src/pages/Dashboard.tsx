
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import SecurityDashboard from "@/components/dashboard/SecurityDashboard";
import EnterpriseSecurityAnalysis from "@/components/enterprise/EnterpriseSecurityAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              Enterprise Security Center
            </h1>
            <p className="text-muted-foreground">
              Comprehensive post-quantum security monitoring and compliance
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-accent text-white">
              <FileCheck className="h-4 w-4" />
              Generate Compliance Report
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Security Dashboard</TabsTrigger>
            <TabsTrigger value="analysis">Enterprise Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <SecurityDashboard />
          </TabsContent>
          
          <TabsContent value="analysis">
            <EnterpriseSecurityAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
