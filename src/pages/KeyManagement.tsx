
import React, { useState } from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyGenerationPanel from "@/components/keymanagement/KeyGenerationPanel";
import KeyInventoryPanel from "@/components/keymanagement/KeyInventoryPanel";
import KeyRotationPanel from "@/components/keymanagement/KeyRotationPanel";
import { Shield, FileText, Download, Upload, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const KeyManagement = () => {
  const [complianceInfo, setComplianceInfo] = useState({
    lastAudit: "2024-03-15",
    complianceStatus: "Compliant",
    nextAuditDue: "2024-09-15",
    standards: ["NIST FIPS 205", "NIST FIPS 206", "ISO 27001", "SOC 2 Type II"]
  });

  const downloadComplianceReport = () => {
    // In a real implementation, this would generate and download a proper compliance report
    const reportContent = JSON.stringify({
      organization: "TetraCryptPQC",
      report: "Post-Quantum Cryptography Compliance Report",
      date: new Date().toISOString(),
      complianceStatus: complianceInfo.complianceStatus,
      standards: complianceInfo.standards,
      keyAlgorithms: {
        kemAlgorithm: "ML-KEM-1024",
        signatureAlgorithm: "SLH-DSA-Dilithium5",
        securityStrength: "256-bit quantum security"
      },
      certificationStatement: "This system implements NIST FIPS 205 and 206 compliant post-quantum cryptographic algorithms."
    }, null, 2);
    
    const blob = new Blob([reportContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pqc_compliance_report_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              Enterprise Key Management
            </h1>
            <p className="text-muted-foreground">
              Generate and manage NIST-approved post-quantum cryptographic keys
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadComplianceReport}>
              <FileText className="mr-2 h-4 w-4" />
              Compliance Report
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Alert className="bg-accent/10 border-accent/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Enterprise Security Advisory</AlertTitle>
          <AlertDescription>
            This system implements NIST FIPS 205 and 206 compliant post-quantum cryptographic algorithms, 
            providing protection against both classical and quantum computing threats.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Enterprise cryptographic compliance information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground">Last Audit</div>
                <div className="font-medium">{complianceInfo.lastAudit}</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="font-medium text-green-500">{complianceInfo.complianceStatus}</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground">Next Audit Due</div>
                <div className="font-medium">{complianceInfo.nextAuditDue}</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground">Standards</div>
                <div className="font-medium">{complianceInfo.standards.join(", ")}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="rotation">Rotation</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <KeyGenerationPanel />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <KeyInventoryPanel />
          </TabsContent>

          <TabsContent value="rotation" className="space-y-4">
            <KeyRotationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default KeyManagement;
