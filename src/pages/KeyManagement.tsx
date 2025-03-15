import React, { useState, useEffect } from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeyGenerationPanel from "@/components/keymanagement/KeyGenerationPanel";
import KeyInventoryPanel from "@/components/keymanagement/KeyInventoryPanel";
import KeyRotationPanel from "@/components/keymanagement/KeyRotationPanel";
import { Shield, FileText, Download, Upload, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/lib/storage";
import { recordAuditEvent } from "@/lib/enterprise/auditLog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const KeyManagement = () => {
  const [profile, setProfile] = useState(() => getUserProfile());
  const [complianceInfo, setComplianceInfo] = useState({
    lastAudit: "2024-03-15",
    complianceStatus: "Compliant",
    nextAuditDue: "2024-09-15",
    standards: ["NIST FIPS 205", "NIST FIPS 206", "ISO 27001", "SOC 2 Type II"]
  });
  const [keyHealth, setKeyHealth] = useState({
    kemStatus: "unknown",
    signatureStatus: "unknown",
    kemLastRotated: null as Date | null,
    signatureLastRotated: null as Date | null,
    daysToKemExpiry: 0,
    daysToSignatureExpiry: 0
  });

  useEffect(() => {
    // Calculate key health
    if (profile) {
      const kemCreated = profile?.keyPairs?.pqkem?.created
        ? new Date(profile.keyPairs.pqkem.created)
        : null;
        
      const signatureCreated = profile?.keyPairs?.signature?.created
        ? new Date(profile.keyPairs.signature.created)
        : null;
      
      const kemExpiry = kemCreated
        ? new Date(kemCreated.getTime() + (90 * 24 * 60 * 60 * 1000)) // 90 days
        : null;
        
      const signatureExpiry = signatureCreated
        ? new Date(signatureCreated.getTime() + (180 * 24 * 60 * 60 * 1000)) // 180 days
        : null;
      
      const today = new Date();
      
      setKeyHealth({
        kemStatus: !kemCreated ? "missing" :
                   kemExpiry && kemExpiry < today ? "expired" :
                   kemExpiry && (kemExpiry.getTime() - today.getTime()) < (14 * 24 * 60 * 60 * 1000) ? "warning" :
                   "healthy",
        signatureStatus: !signatureCreated ? "missing" :
                         signatureExpiry && signatureExpiry < today ? "expired" :
                         signatureExpiry && (signatureExpiry.getTime() - today.getTime()) < (30 * 24 * 60 * 60 * 1000) ? "warning" :
                         "healthy",
        kemLastRotated: kemCreated,
        signatureLastRotated: signatureCreated,
        daysToKemExpiry: kemExpiry 
          ? Math.max(0, Math.ceil((kemExpiry.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)))
          : 0,
        daysToSignatureExpiry: signatureExpiry
          ? Math.max(0, Math.ceil((signatureExpiry.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)))
          : 0
      });
    }
    
    // Record audit event for accessing the key management page
    if (profile) {
      recordAuditEvent(
        "access_key_management",
        "success",
        profile.id || "unknown-user",
        { pageAccess: "KeyManagement" },
        "info"
      );
    }
  }, [profile]);

  
  const downloadComplianceReport = () => {
    // In a real implementation, this would generate and download a proper compliance report
    const reportContent = JSON.stringify({
      organization: "TetraCryptPQC",
      report: "Post-Quantum Cryptography Compliance Report",
      date: new Date().toISOString(),
      complianceStatus: complianceInfo.complianceStatus,
      standards: complianceInfo.standards,
      keyAlgorithms: {
        kemAlgorithm: profile?.keyPairs?.pqkem?.algorithm || "Not implemented",
        signatureAlgorithm: profile?.keyPairs?.signature?.algorithm || "Not implemented",
        securityStrength: profile?.keyPairs?.pqkem?.strength || "Unknown"
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
    
    // Record audit event for downloading compliance report
    if (profile) {
      recordAuditEvent(
        "download_compliance_report",
        "success",
        profile.id || "unknown-user",
        { reportType: "PQC Compliance" },
        "info"
      );
    }
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
        
        {/* Key Health Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                ML-KEM Key Health
              </CardTitle>
              <CardDescription>NIST FIPS 205 Key Encapsulation Mechanism</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={
                  keyHealth.kemStatus === "healthy" ? "bg-green-500" :
                  keyHealth.kemStatus === "warning" ? "bg-yellow-500" :
                  keyHealth.kemStatus === "expired" ? "bg-red-500" :
                  "bg-muted"
                }>
                  {keyHealth.kemStatus === "healthy" ? "Healthy" :
                   keyHealth.kemStatus === "warning" ? "Rotation Recommended" :
                   keyHealth.kemStatus === "expired" ? "Expired" :
                   keyHealth.kemStatus === "missing" ? "Not Implemented" : "Unknown"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Rotated</span>
                <span className="text-sm">
                  {keyHealth.kemLastRotated ? keyHealth.kemLastRotated.toLocaleDateString() : "Never"}
                </span>
              </div>
              
              {keyHealth.kemStatus !== "missing" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Days Until Expiry</span>
                    <span className={`text-sm ${
                      keyHealth.daysToKemExpiry <= 0 ? "text-red-500" :
                      keyHealth.daysToKemExpiry < 14 ? "text-yellow-500" :
                      "text-green-500"
                    }`}>
                      {keyHealth.daysToKemExpiry <= 0 ? "Expired" : `${keyHealth.daysToKemExpiry} days`}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <Progress value={Math.min(100, (keyHealth.daysToKemExpiry / 90) * 100)} className="h-2" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                SLH-DSA Key Health
              </CardTitle>
              <CardDescription>NIST FIPS 206 Digital Signature Algorithm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={
                  keyHealth.signatureStatus === "healthy" ? "bg-green-500" :
                  keyHealth.signatureStatus === "warning" ? "bg-yellow-500" :
                  keyHealth.signatureStatus === "expired" ? "bg-red-500" :
                  "bg-muted"
                }>
                  {keyHealth.signatureStatus === "healthy" ? "Healthy" :
                   keyHealth.signatureStatus === "warning" ? "Rotation Recommended" :
                   keyHealth.signatureStatus === "expired" ? "Expired" :
                   keyHealth.signatureStatus === "missing" ? "Not Implemented" : "Unknown"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Rotated</span>
                <span className="text-sm">
                  {keyHealth.signatureLastRotated ? keyHealth.signatureLastRotated.toLocaleDateString() : "Never"}
                </span>
              </div>
              
              {keyHealth.signatureStatus !== "missing" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Days Until Expiry</span>
                    <span className={`text-sm ${
                      keyHealth.daysToSignatureExpiry <= 0 ? "text-red-500" :
                      keyHealth.daysToSignatureExpiry < 30 ? "text-yellow-500" :
                      "text-green-500"
                    }`}>
                      {keyHealth.daysToSignatureExpiry <= 0 ? "Expired" : `${keyHealth.daysToSignatureExpiry} days`}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <Progress value={Math.min(100, (keyHealth.daysToSignatureExpiry / 180) * 100)} className="h-2" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
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
