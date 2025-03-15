
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassContainer } from "@/components/ui/glass-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Lock, Key, Database, Server, ExternalLink, AlertTriangle } from "lucide-react";
import { getUserProfile } from "@/lib/storage";
import { generateComplianceReport, scanForThreats } from "@/lib/pqcrypto";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/layout/MainLayout";
import SecurityDashboard from "@/components/dashboard/SecurityDashboard";
import EnterpriseSecurityAnalysis from "@/components/enterprise/EnterpriseSecurityAnalysis";

import { useNavigate } from "react-router-dom";

// Define types for our threat intelligence
interface SecurityThreatIntelligence {
  id: string;
  source: string;
  detectedAt: string;
  severity: string;
  affectedSystems: string[];
  description: string;
  mitigationSteps: string[];
  status: string;
}

interface ComplianceFinding {
  id: string;
  standard: string;
  control: string;
  status: string;
  description: string;
  remediation?: string;
}

interface ComplianceReport {
  id: string;
  generatedAt: string;
  standards: string[];
  status: string;
  findings: ComplianceFinding[];
  overallScore: number;
  validUntil: string;
}

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [complianceReport, setComplianceReport] = useState<ComplianceReport | null>(null);
  const [securityThreats, setSecurityThreats] = useState<SecurityThreatIntelligence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = getUserProfile();

  useEffect(() => {
    if (!userProfile) {
      toast({
        title: "Profile Not Found",
        description: "Please set up your TetraCryptPQC profile first",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    if (!userProfile) return;
    
    setIsLoading(true);
    try {
      // Generate compliance report
      const report = await generateComplianceReport(userProfile);
      setComplianceReport(report);
      
      // Scan for security threats
      const threats = await scanForThreats(userProfile);
      setSecurityThreats(threats);
    } catch (error) {
      console.error("Failed to load security data:", error);
      toast({
        title: "Data Load Failed",
        description: "Could not load security data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userProfile) {
    return null; // Redirect handled in useEffect
  }

  const highSeverityThreats = securityThreats.filter(threat => threat.severity === "high" || threat.severity === "critical").length;

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            TetraCryptPQC Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your post-quantum cryptographic security status
          </p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <SecurityDashboard 
              userProfile={userProfile}
              complianceScore={complianceReport?.overallScore || 0}
              threatCount={securityThreats.length}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="compliance">
            <GlassContainer className="p-6">
              <h2 className="text-2xl font-semibold mb-4">NIST FIPS Compliance Status</h2>
              
              {isLoading ? (
                <p>Loading compliance data...</p>
              ) : complianceReport ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Overall Score: {complianceReport.overallScore}%</h3>
                      <p className="text-sm text-muted-foreground">
                        Status: <span className={`font-semibold ${
                          complianceReport.status === "compliant" ? "text-green-500" : 
                          complianceReport.status === "partially-compliant" ? "text-amber-500" : 
                          "text-red-500"
                        }`}>
                          {complianceReport.status.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <Button onClick={loadSecurityData}>Refresh Report</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {complianceReport.findings.map(finding => (
                      <Card key={finding.id}>
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{finding.control}</CardTitle>
                              <CardDescription>{finding.standard}</CardDescription>
                            </div>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                              finding.status === "pass" ? "bg-green-500/10 text-green-600" : 
                              finding.status === "warning" ? "bg-amber-500/10 text-amber-600" : 
                              "bg-red-500/10 text-red-600"
                            }`}>
                              {finding.status.toUpperCase()}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-sm">{finding.description}</p>
                          {finding.remediation && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Recommendation: {finding.remediation}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No compliance report available</p>
                  <Button onClick={loadSecurityData} className="mt-4">Generate Report</Button>
                </div>
              )}
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="enterprise">
            {securityThreats.length > 0 && (
              <EnterpriseSecurityAnalysis threats={securityThreats} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
