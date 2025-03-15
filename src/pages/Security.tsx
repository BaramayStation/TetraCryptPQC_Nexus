
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Shield, Key, Lock, FileText, Database, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HardwareSecurityManager from "@/components/security/HardwareSecurityManager";
import StarkNetAuth from "@/components/security/StarkNetAuth";
import EnterpriseAuthentication from "@/components/security/EnterpriseAuthentication";
import { getUserProfile, saveUserProfile } from "@/lib/storage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { scanForThreats, generateComplianceReport } from "@/lib/crypto";
import { SecurityThreatIntelligence } from "@/lib/storage-types";

const Security = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hardware");
  const [threats, setThreats] = useState<SecurityThreatIntelligence[]>([]);
  const [complianceReport, setComplianceReport] = useState<any>(null);

  const handleHardwareKeyGenerated = (keyData: any) => {
    const userProfile = getUserProfile();
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        hardwareSecurityEnabled: true,
        hardwareType: keyData.hardwareType || "YubiKey"
      };
      
      saveUserProfile(updatedProfile);
      
      toast({
        title: "Hardware Key Saved",
        description: "Your hardware-backed key has been saved to your profile",
      });
    }
  };

  const handleStarkNetConnect = (account: any) => {
    const userProfile = getUserProfile();
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        starkNetAccount: {
          address: account.address,
          publicKey: account.publicKey,
        }
      };
      
      saveUserProfile(updatedProfile);
      
      toast({
        title: "StarkNet Account Linked",
        description: "Your StarkNet account has been linked to your profile",
      });
    }
  };

  const handleStarkNetProofGenerated = (proofData: any) => {
    toast({
      title: "zk-STARK Proof Generated",
      description: "Your zero-knowledge proof has been generated and verified",
    });
  };

  const runSecurityScan = async () => {
    try {
      toast({
        title: "Security Scan Started",
        description: "Scanning for potential security threats...",
      });
      
      const userProfile = getUserProfile();
      if (!userProfile) throw new Error("User profile not found");
      
      const threats = await scanForThreats(JSON.stringify(userProfile));
      setThreats(threats as SecurityThreatIntelligence[]);
      
      const report = await generateComplianceReport();
      setComplianceReport(report);
      
      toast({
        title: "Security Scan Complete",
        description: `Found ${threats.length} potential threats`,
      });
    } catch (error) {
      console.error("Error running security scan:", error);
      toast({
        title: "Security Scan Failed",
        description: "Failed to complete security scan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Security Center</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <GlassContainer className="p-4 sticky top-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold">Security Controls</h2>
                </div>
                
                <Separator />
                
                <div className="flex flex-col space-y-1">
                  <Button 
                    variant={activeTab === "hardware" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("hardware")}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Hardware Security
                  </Button>
                  <Button 
                    variant={activeTab === "starknet" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("starknet")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    StarkNet zkVM
                  </Button>
                  <Button 
                    variant={activeTab === "enterprise" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("enterprise")}
                  >
                    <Server className="h-4 w-4 mr-2" />
                    Enterprise Auth
                  </Button>
                  <Button 
                    variant={activeTab === "compliance" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("compliance")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Compliance
                  </Button>
                  <Button 
                    variant={activeTab === "threats" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("threats")}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Threat Analysis
                  </Button>
                </div>
                
                <Separator />
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={runSecurityScan}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Scan
                </Button>
              </div>
            </GlassContainer>
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "hardware" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Hardware Security Module</h2>
                <p className="text-muted-foreground">
                  Secure your post-quantum cryptographic keys with hardware security modules like YubiKey,
                  TPM, or Secure Enclave. Hardware-backed keys cannot be extracted even if your device is compromised.
                </p>
                
                <HardwareSecurityManager onKeyGenerated={handleHardwareKeyGenerated} />
              </div>
            )}
            
            {activeTab === "starknet" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">StarkNet zk-STARK Authentication</h2>
                <p className="text-muted-foreground">
                  Leverage StarkNet's zk-STARK technology for quantum-resistant authentication
                  and zero-knowledge proofs of identity. Verify without revealing sensitive information.
                </p>
                
                <StarkNetAuth 
                  onConnect={handleStarkNetConnect}
                  onProofGenerated={handleStarkNetProofGenerated}
                />
              </div>
            )}
            
            {activeTab === "enterprise" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Enterprise Authentication</h2>
                <p className="text-muted-foreground">
                  Advanced authentication options for enterprise environments, including WebAuthn/Passkeys,
                  hardware tokens, and decentralized identity verification.
                </p>
                
                <EnterpriseAuthentication />
              </div>
            )}
            
            {activeTab === "compliance" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Compliance Report</h2>
                <p className="text-muted-foreground">
                  Generate detailed compliance reports for NIST FIPS 205/206, FIPS 140-3, and other
                  cryptographic standards. Verify that your security implementation meets required standards.
                </p>
                
                {complianceReport ? (
                  <GlassContainer className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Compliance Status</h3>
                          <p className="text-sm text-muted-foreground">
                            Generated: {new Date(complianceReport.generatedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-white ${
                          complianceReport.status === "compliant" ? "bg-green-500" :
                          complianceReport.status === "partially-compliant" ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}>
                          {complianceReport.status === "compliant" ? "Compliant" :
                           complianceReport.status === "partially-compliant" ? "Partially Compliant" :
                           "Non-Compliant"}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-medium mb-2">Overall Score</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                          <div 
                            className={`h-4 rounded-full ${
                              complianceReport.overallScore >= 90 ? "bg-green-500" :
                              complianceReport.overallScore >= 70 ? "bg-yellow-500" :
                              "bg-red-500"
                            }`}
                            style={{ width: `${complianceReport.overallScore}%` }}
                          />
                        </div>
                        <p className="text-sm mt-1 text-right">{complianceReport.overallScore}%</p>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-medium mb-2">Standards</h3>
                        <div className="flex flex-wrap gap-2">
                          {complianceReport.standards.map((standard: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-accent/10 rounded-md text-xs">
                              {standard}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-medium mb-2">Findings</h3>
                        <div className="space-y-4">
                          {complianceReport.findings.map((finding: any, index: number) => (
                            <div key={index} className={`p-4 border rounded-md ${
                              finding.status === "pass" ? "border-green-200 bg-green-50" :
                              finding.status === "warning" ? "border-yellow-200 bg-yellow-50" :
                              "border-red-200 bg-red-50"
                            }`}>
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{finding.control}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  finding.status === "pass" ? "bg-green-500 text-white" :
                                  finding.status === "warning" ? "bg-yellow-500 text-white" :
                                  "bg-red-500 text-white"
                                }`}>
                                  {finding.status}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{finding.description}</p>
                              {finding.remediation && (
                                <p className="text-sm mt-2 font-medium">
                                  Remediation: {finding.remediation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassContainer>
                ) : (
                  <Alert>
                    <AlertTitle>No Compliance Report</AlertTitle>
                    <AlertDescription>
                      Run a security scan to generate a compliance report.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {activeTab === "threats" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Threat Intelligence</h2>
                <p className="text-muted-foreground">
                  AI-powered threat detection and analysis for your cryptographic security.
                  Identify potential vulnerabilities and receive actionable mitigation steps.
                </p>
                
                {threats.length > 0 ? (
                  <GlassContainer className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Detected Threats</h3>
                      
                      <div className="space-y-4">
                        {threats.map((threat, index) => (
                          <div key={index} className={`p-4 border rounded-md ${
                            threat.severity === "low" ? "border-blue-200 bg-blue-50" :
                            threat.severity === "medium" ? "border-yellow-200 bg-yellow-50" :
                            threat.severity === "high" ? "border-orange-200 bg-orange-50" :
                            "border-red-200 bg-red-50"
                          }`}>
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{threat.description}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                threat.severity === "low" ? "bg-blue-500 text-white" :
                                threat.severity === "medium" ? "bg-yellow-500 text-white" :
                                threat.severity === "high" ? "bg-orange-500 text-white" :
                                "bg-red-500 text-white"
                              }`}>
                                {threat.severity}
                              </span>
                            </div>
                            
                            <p className="text-sm mt-1 text-muted-foreground">
                              Detected: {new Date(threat.detectedAt).toLocaleString()}
                            </p>
                            
                            <div className="mt-3">
                              <h5 className="text-sm font-medium">Mitigation Steps:</h5>
                              <ul className="mt-1 space-y-1">
                                {threat.mitigationSteps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="text-sm flex items-start gap-2">
                                    <span className="inline-block w-4 h-4 rounded-full bg-accent text-white text-xs flex items-center justify-center mt-0.5">{stepIndex + 1}</span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassContainer>
                ) : (
                  <Alert>
                    <AlertTitle>No Threats Detected</AlertTitle>
                    <AlertDescription>
                      Run a security scan to check for potential threats.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
