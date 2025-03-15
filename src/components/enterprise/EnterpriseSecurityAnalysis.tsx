
import React from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Clock, FileText, CheckCircle, Server, Network } from "lucide-react";
import { getUserProfile } from "@/lib/storage";

const EnterpriseSecurityAnalysis = () => {
  const profile = getUserProfile();
  
  const complianceStatus = {
    fips205: profile?.keyPairs?.pqkem ? "Compliant" : "Non-Compliant",
    fips206: profile?.keyPairs?.signature ? "Compliant" : "Non-Compliant",
    fips140: profile?.hsmInfo ? "Compliant" : "Non-Compliant",
    nist80063: Boolean(profile?.keyPairs?.pqkem && profile?.keyPairs?.signature) ? "Compliant" : "In Progress",
    cnsa20: Boolean(profile?.keyPairs?.pqkem && profile?.keyPairs?.signature) ? "Ready" : "Not Ready",
    qkdState: profile?.qkdInfo ? "Active" : "Not Configured",
    hsmState: profile?.hsmInfo ? "Active" : "Not Configured"
  };
  
  const riskFactors = [
    {
      name: "Insufficient Quantum Resistance",
      severity: !profile?.keyPairs?.pqkem ? "Critical" : "Mitigated",
      description: "Systems without post-quantum cryptography are vulnerable to quantum computing attacks."
    },
    {
      name: "Classical Cryptography Vulnerability",
      severity: "High",
      description: "Legacy cryptographic algorithms (RSA/ECC) are vulnerable to Shor's algorithm."
    },
    {
      name: "Harvest Now, Decrypt Later",
      severity: !profile?.keyPairs?.pqkem ? "High" : "Medium",
      description: "Adversaries may store encrypted data until quantum computers can decrypt it."
    },
    {
      name: "Signature Forgery Risk",
      severity: !profile?.keyPairs?.signature ? "High" : "Mitigated",
      description: "Without quantum-resistant signatures, digital identities can be compromised."
    },
    {
      name: "Key Management Vulnerability",
      severity: !profile?.hsmInfo ? "Medium" : "Low",
      description: "Cryptographic keys not stored in hardware security modules are at higher risk."
    }
  ];
  
  const regulatoryTimeline = [
    {
      year: "2022-2023",
      milestone: "NIST PQC Standards Published",
      status: "Completed",
      detail: "FIPS 205 (ML-KEM) and FIPS 206 (SLH-DSA) standardized"
    },
    {
      year: "2023-2024",
      milestone: "U.S. Government Phase 1 Migration",
      status: "In Progress",
      detail: "Federal critical infrastructure begins PQC implementation"
    },
    {
      year: "2024-2025",
      milestone: "Financial Sector Compliance",
      status: "Upcoming",
      detail: "Banking, financial services expected to implement PQC"
    },
    {
      year: "2025-2027",
      milestone: "Healthcare Compliance",
      status: "Planned",
      detail: "Protected health information requires PQC protection"
    },
    {
      year: "2025-2030",
      milestone: "Global PQC Transition",
      status: "Planned",
      detail: "Complete migration of cryptographic infrastructure"
    }
  ];

  return (
    <GlassContainer className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-semibold">Enterprise Security Analysis</h2>
      </div>
      
      <Alert className="bg-accent/10 border-accent/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Enterprise Security Advisory</AlertTitle>
        <AlertDescription>
          According to NIST and NSA guidance, all organizations should be preparing for the 
          post-quantum transition. The cryptographic migration should be completed before 
          large-scale quantum computers become available.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Quantum Readiness Assessment
            </CardTitle>
            <CardDescription>Enterprise cryptographic posture evaluation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">FIPS 205 (ML-KEM) Implementation</span>
                <Badge variant={complianceStatus.fips205 === "Compliant" ? "default" : "outline"} className={complianceStatus.fips205 === "Compliant" ? "bg-green-500" : ""}>
                  {complianceStatus.fips205}
                </Badge>
              </div>
              <Progress value={complianceStatus.fips205 === "Compliant" ? 100 : 0} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">FIPS 206 (SLH-DSA) Implementation</span>
                <Badge variant={complianceStatus.fips206 === "Compliant" ? "default" : "outline"} className={complianceStatus.fips206 === "Compliant" ? "bg-green-500" : ""}>
                  {complianceStatus.fips206}
                </Badge>
              </div>
              <Progress value={complianceStatus.fips206 === "Compliant" ? 100 : 0} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">FIPS 140-3 HSM Integration</span>
                <Badge variant={complianceStatus.fips140 === "Compliant" ? "default" : "outline"} className={complianceStatus.fips140 === "Compliant" ? "bg-green-500" : ""}>
                  {complianceStatus.fips140}
                </Badge>
              </div>
              <Progress value={complianceStatus.fips140 === "Compliant" ? 100 : 0} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">NIST SP 800-63 Digital Identity</span>
                <Badge variant={complianceStatus.nist80063 === "Compliant" ? "default" : "outline"} className={complianceStatus.nist80063 === "Compliant" ? "bg-green-500" : "bg-yellow-500/80"}>
                  {complianceStatus.nist80063}
                </Badge>
              </div>
              <Progress value={complianceStatus.nist80063 === "Compliant" ? 100 : 50} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">NSA CNSA 2.0 Algorithm Suite</span>
                <Badge variant={complianceStatus.cnsa20 === "Ready" ? "default" : "outline"} className={complianceStatus.cnsa20 === "Ready" ? "bg-green-500" : ""}>
                  {complianceStatus.cnsa20}
                </Badge>
              </div>
              <Progress value={complianceStatus.cnsa20 === "Ready" ? 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Enterprise Risk Analysis
            </CardTitle>
            <CardDescription>Post-quantum security risk factors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Factor</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskFactors.map((risk, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div>
                        {risk.name}
                        <p className="text-xs text-muted-foreground mt-1">{risk.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        risk.severity === "Critical" ? "bg-red-500" :
                        risk.severity === "High" ? "bg-orange-500" :
                        risk.severity === "Medium" ? "bg-yellow-500" :
                        risk.severity === "Low" ? "bg-blue-500" :
                        "bg-green-500"
                      }>
                        {risk.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Regulatory Compliance Timeline
          </CardTitle>
          <CardDescription>Post-quantum cryptography regulatory milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mt-4">
            <div className="absolute top-0 left-[15px] h-full w-[2px] bg-border"></div>
            <div className="space-y-8">
              {regulatoryTimeline.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center
                    ${item.status === "Completed" ? "bg-green-500" : 
                      item.status === "In Progress" ? "bg-blue-500" : "bg-muted"}`}>
                    {item.status === "Completed" ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : item.status === "In Progress" ? (
                      <Clock className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-muted-foreground">{item.year.split('-')[0].substring(2)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{item.milestone}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs border px-2 py-0.5 rounded">{item.year}</span>
                      <Badge variant={
                        item.status === "Completed" ? "default" : 
                        item.status === "In Progress" ? "outline" : "secondary"
                      } className={item.status === "Completed" ? "bg-green-500" : ""}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-accent" />
              Enterprise Infrastructure Security
            </CardTitle>
            <CardDescription>Secure hardware integration status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Hardware Security Module (HSM)</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Status</span>
                <Badge variant={complianceStatus.hsmState === "Active" ? "default" : "outline"} className={complianceStatus.hsmState === "Active" ? "bg-green-500" : ""}>
                  {complianceStatus.hsmState}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {complianceStatus.hsmState === "Active" ? 
                  "FIPS 140-3 compliant HSM is actively protecting cryptographic keys" : 
                  "No hardware security module has been configured"
                }
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                {complianceStatus.hsmState === "Active" ? "Manage HSM" : "Configure HSM"}
              </Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Quantum Key Distribution (QKD)</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Status</span>
                <Badge variant={complianceStatus.qkdState === "Active" ? "default" : "outline"} className={complianceStatus.qkdState === "Active" ? "bg-green-500" : ""}>
                  {complianceStatus.qkdState}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {complianceStatus.qkdState === "Active" ? 
                  "Quantum Key Distribution system is actively distributing quantum-secure keys" : 
                  "No QKD infrastructure has been connected"
                }
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                {complianceStatus.qkdState === "Active" ? "Manage QKD" : "Configure QKD"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Compliance Documentation
            </CardTitle>
            <CardDescription>Enterprise security documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md flex items-start gap-3">
              <FileText className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">NIST PQC Compliance Report</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Detailed assessment of compliance with NIST post-quantum cryptography standards.
                </p>
                <Button variant="outline" size="sm" className="mt-3">Download Report</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md flex items-start gap-3">
              <Network className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Enterprise Cryptographic Architecture</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Documentation of the organization's post-quantum cryptographic infrastructure.
                </p>
                <Button variant="outline" size="sm" className="mt-3">View Documentation</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Quantum Threat Analysis</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Assessment of organizational exposure to quantum computing threats.
                </p>
                <Button variant="outline" size="sm" className="mt-3">Generate Analysis</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </GlassContainer>
  );
};

export default EnterpriseSecurityAnalysis;
