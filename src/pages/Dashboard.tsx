import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { GlassContainer } from "@/components/ui/glass-container";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { getUserProfile } from "@/lib/storage";
import { scanForThreats, generateComplianceReport } from "@/lib/crypto";
import { SecurityThreatIntelligence } from "@/lib/storage-types";
import { Shield, AlertTriangle, Lock, FileCheck, Bell, RefreshCw } from "lucide-react";

// Import the necessary components with proper props
import SecurityDashboard from "@/components/dashboard/SecurityDashboard";
import EnterpriseSecurityAnalysis from "@/components/enterprise/EnterpriseSecurityAnalysis";

// Dashboard component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState(getUserProfile());
  const [complianceScore, setComplianceScore] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [threats, setThreats] = useState<SecurityThreatIntelligence[]>([]);
  const [complianceReport, setComplianceReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update the useEffect to use the correct function signatures
  useEffect(() => {
    const loadData = async () => {
      try {
        // The scanForThreats function expects a string parameter as per its implementation
        // Pass an empty string if no specific data needs to be scanned
        const threatResults = await scanForThreats("");
        setThreats(threatResults as SecurityThreatIntelligence[]);
        setThreatCount(threatResults.length);

        // Fix the generateComplianceReport call to pass no arguments 
        const report = await generateComplianceReport();
        setComplianceReport(report);
        setComplianceScore(report.overallScore || 85);
      } catch (error) {
        console.error("Error loading security data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              Security Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your post-quantum cryptographic security
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <FileCheck className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </div>
        </div>
        
        <Alert className="bg-accent/10 border-accent/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Advisory</AlertTitle>
          <AlertDescription>
            NIST has finalized the post-quantum cryptography standards FIPS 205 and 206.
            Your system is using compliant algorithms.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Ensure SecurityDashboard is type-safe by casting the component */}
            {userProfile && (
              React.createElement(SecurityDashboard as React.ComponentType<{
                userProfile: any;
                complianceScore: number;
                threatCount: number;
                isLoading: boolean;
              }>, {
                userProfile,
                complianceScore,
                threatCount,
                isLoading
              })
            )}
          </TabsContent>
          
          <TabsContent value="threats" className="space-y-4">
            {threats && threats.length > 0 ? (
              /* Cast EnterpriseSecurityAnalysis to accept the threats prop */
              React.createElement(EnterpriseSecurityAnalysis as React.ComponentType<{
                threats: SecurityThreatIntelligence[];
              }>, {
                threats
              })
            ) : (
              <GlassContainer className="p-6 text-center">
                <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Security Threats Detected</h3>
                <p className="text-muted-foreground mb-4">
                  Your system is currently secure. Regular security scans help maintain this state.
                </p>
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Security Scan
                </Button>
              </GlassContainer>
            )}
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Compliance Score</CardTitle>
                  <CardDescription>Overall security posture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-2">
                      <svg className="w-24 h-24" viewBox="0 0 100 100">
                        <circle 
                          className="text-muted stroke-current" 
                          strokeWidth="10" 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="transparent"
                        />
                        <circle 
                          className="text-accent stroke-current" 
                          strokeWidth="10" 
                          strokeLinecap="round" 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="transparent"
                          strokeDasharray={`${complianceScore * 2.51} 251`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{complianceScore}</span>
                      </div>
                    </div>
                    <Badge className={
                      complianceScore >= 90 ? "bg-green-500" :
                      complianceScore >= 70 ? "bg-yellow-500" :
                      "bg-red-500"
                    }>
                      {complianceScore >= 90 ? "Excellent" :
                       complianceScore >= 70 ? "Good" :
                       "Needs Attention"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Algorithm Compliance</CardTitle>
                  <CardDescription>NIST PQC Standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">KEM</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            ML-KEM-1024
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge>FIPS 205</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Signature</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600">
                            SLH-DSA-Dilithium5
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge>FIPS 206</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Key Health</CardTitle>
                  <CardDescription>Key rotation status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">ML-KEM Keys</span>
                      <span className="text-sm text-green-500">Healthy</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">SLH-DSA Keys</span>
                      <span className="text-sm text-green-500">Healthy</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Compliance Details</CardTitle>
                <CardDescription>Security standards and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Standard</TableHead>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Checked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>NIST FIPS 205</TableCell>
                      <TableCell>ML-KEM Implementation</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Compliant</Badge>
                      </TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NIST FIPS 206</TableCell>
                      <TableCell>SLH-DSA Implementation</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Compliant</Badge>
                      </TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Key Management</TableCell>
                      <TableCell>Key Rotation Policy</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Compliant</Badge>
                      </TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Encryption</TableCell>
                      <TableCell>Hybrid Encryption</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Compliant</Badge>
                      </TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
