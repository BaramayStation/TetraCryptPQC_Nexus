
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layout/MainLayout";
import SecurityDashboard from "@/components/dashboard/SecurityDashboard";
import EnterpriseSecurityAnalysis from "@/components/enterprise/EnterpriseSecurityAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileCheck, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getUserProfile } from "@/lib/storage";
import { generateComplianceReport, scanForThreats } from "@/backend/crypto";
import { ComplianceReport, SecurityThreatIntelligence } from "@/lib/storage-types";

const Dashboard = () => {
  const { toast } = useToast();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [complianceReport, setComplianceReport] = useState<ComplianceReport | null>(null);
  const [securityThreats, setSecurityThreats] = useState<SecurityThreatIntelligence[]>([]);
  const [user, setUser] = useState(getUserProfile());
  
  useEffect(() => {
    const checkSecurityStatus = async () => {
      try {
        if (user) {
          const threats = await scanForThreats(user);
          setSecurityThreats(threats);
          
          // Check if there are any critical threats
          const criticalThreats = threats.filter(t => t.severity === 'critical');
          if (criticalThreats.length > 0) {
            toast({
              title: "Critical Security Alert",
              description: `${criticalThreats.length} critical security ${criticalThreats.length === 1 ? 'issue' : 'issues'} detected.`,
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error("Error scanning for threats:", error);
      }
    };
    
    checkSecurityStatus();
  }, [toast, user]);
  
  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);
      
      if (!user) {
        toast({
          title: "Error",
          description: "User profile not found. Please log in again.",
          variant: "destructive",
        });
        return;
      }
      
      const report = await generateComplianceReport(user);
      setComplianceReport(report);
      
      toast({
        title: "Compliance Report Generated",
        description: `Overall compliance score: ${report.overallScore}%`,
      });
    } catch (error) {
      console.error("Error generating compliance report:", error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the compliance report.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  const handleDownloadReport = () => {
    if (!complianceReport) return;
    
    // Create a JSON blob and download it
    const reportBlob = new Blob([JSON.stringify(complianceReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(reportBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Compliance report has been downloaded successfully.",
    });
  };

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
            <Button 
              className="flex items-center gap-2 text-sm"
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
            >
              <FileCheck className="h-4 w-4" />
              {isGeneratingReport ? "Generating..." : "Generate Compliance Report"}
            </Button>
            
            {complianceReport && (
              <Button 
                variant="outline"
                className="flex items-center gap-2 text-sm"
                onClick={handleDownloadReport}
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            )}
          </div>
        </div>
        
        {securityThreats.length > 0 && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <h3 className="font-medium text-destructive">Security Alerts Detected</h3>
              <p className="text-sm text-muted-foreground">
                {securityThreats.length} security {securityThreats.length === 1 ? 'alert' : 'alerts'} require your attention. 
                View the Analysis tab for details.
              </p>
            </div>
          </div>
        )}
        
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Security Dashboard</TabsTrigger>
            <TabsTrigger value="analysis">Enterprise Analysis</TabsTrigger>
            {complianceReport && (
              <TabsTrigger value="compliance">Compliance Report</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="dashboard">
            <SecurityDashboard />
          </TabsContent>
          
          <TabsContent value="analysis">
            <EnterpriseSecurityAnalysis securityThreats={securityThreats} />
          </TabsContent>
          
          {complianceReport && (
            <TabsContent value="compliance">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold mb-2">
                      {complianceReport.overallScore}%
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Overall Compliance Score
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-lg font-medium mb-2">
                      Status: <span className={
                        complianceReport.status === "compliant" ? "text-green-500" :
                        complianceReport.status === "partially-compliant" ? "text-yellow-500" :
                        "text-destructive"
                      }>
                        {complianceReport.status.replace("-", " ")}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Valid until {new Date(complianceReport.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Applied Standards</h3>
                    <div className="flex flex-wrap gap-2">
                      {complianceReport.standards.map((standard, index) => (
                        <div key={index} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                          {standard}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Compliance Findings</h3>
                  </div>
                  <div className="divide-y">
                    {complianceReport.findings.map((finding) => (
                      <div key={finding.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{finding.control}</div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            finding.status === "pass" ? "bg-green-500/10 text-green-600" :
                            finding.status === "warning" ? "bg-yellow-500/10 text-yellow-600" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {finding.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {finding.description}
                        </div>
                        {finding.remediation && (
                          <div className="text-sm mt-2">
                            <span className="font-medium">Remediation: </span>
                            {finding.remediation}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-2">
                          Standard: {finding.standard}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
