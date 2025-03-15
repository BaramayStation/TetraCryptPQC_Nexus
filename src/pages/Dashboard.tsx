import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';
import MilitarySecurityDashboard from '@/components/dashboard/MilitarySecurityDashboard';
import { initializeSecureInfrastructure } from '@/lib/secure-infrastructure';
import { initializeAISecureEnv } from '@/lib/ai-security';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const infraConfig = initializeSecureInfrastructure();
    const aiSecureEnv = initializeAISecureEnv();
    
    console.log('Secure Infrastructure initialized:', infraConfig);
    console.log('AI Secure Environment initialized:', aiSecureEnv);
  }, []);
  
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">TetraCryptPQC Dashboard</h1>
              <p className="text-muted-foreground">
                Enterprise-grade quantum security at your fingertips
              </p>
            </div>
            <Button>Generate Report</Button>
          </div>

          <Tabs defaultValue={activeTab} className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="military">Military</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Overall system health and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-500">Healthy</p>
                    <p className="text-sm text-muted-foreground">All systems operational</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Connections</CardTitle>
                    <CardDescription>Real-time network activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">1,245</p>
                    <p className="text-sm text-muted-foreground">Encrypted connections</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Threat Detections</CardTitle>
                    <CardDescription>AI-driven security alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-yellow-500">3 Active</p>
                    <p className="text-sm text-muted-foreground">Potential security breaches</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <SecurityDashboard />
            </TabsContent>

            <TabsContent value="military">
              <MilitarySecurityDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
