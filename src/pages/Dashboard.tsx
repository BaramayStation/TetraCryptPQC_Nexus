
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import SecurityDashboard from "@/components/dashboard/SecurityDashboard";

const Dashboard = () => {
  return (
    <MainLayout>
      <SecurityDashboard />
    </MainLayout>
  );
};

export default Dashboard;
