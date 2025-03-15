
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  Radio, 
  Shuffle, 
  RefreshCw, 
  Power,
  Zap,
  AlertCircle
} from "lucide-react";
import {
  getFailsafeStatus,
  assessThreatLevel,
  switchCommunicationMode,
  switchCryptoAlgorithm,
  testFailsafeRecovery,
  ResilienceLevel,
  CommunicationMode,
  CryptoFallbackAlgorithm
} from "@/lib/failsafe-continuity";

const FailsafeContinuityPanel: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [threatAssessment, setThreatAssessment] = useState<any>(null);
  
  useEffect(() => {
    // Initialize failsafe status on component mount
    const initialStatus = getFailsafeStatus();
    setStatus(initialStatus);
  }, []);
  
  const handleThreatAssessment = async () => {
    setLoading(true);
    try {
      // Simulate network latency and connection failures
      const networkLatency = Math.floor(Math.random() * 300) + 50;
      const failedConnections = Math.floor(Math.random() * 5);
      const cryptoFailures = Math.floor(Math.random() * 3);
      const anomalyScore = Math.floor(Math.random() * 30);
      
      const assessment = await assessThreatLevel(
        networkLatency,
        failedConnections,
        cryptoFailures,
        anomalyScore
      );
      
      setThreatAssessment(assessment);
      
      // Update status with new threat level
      setStatus(prev => ({
        ...prev,
        threatLevel: assessment.threatLevel
      }));
    } catch (error) {
      console.error("Error assessing threat level:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitchCommunicationMode = async (mode: CommunicationMode) => {
    setLoading(true);
    try {
      const result = await switchCommunicationMode(mode);
      
      if (result.success) {
        setStatus(prev => ({
          ...prev,
          communicationMode: result.currentMode
        }));
      }
    } catch (error) {
      console.error("Error switching communication mode:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwitchCryptoAlgorithm = async (algorithm: CryptoFallbackAlgorithm) => {
    setLoading(true);
    try {
      const result = await switchCryptoAlgorithm(algorithm);
      
      if (result.success) {
        setStatus(prev => ({
          ...prev,
          cryptoAlgorithm: result.currentAlgorithm
        }));
      }
    } catch (error) {
      console.error("Error switching crypto algorithm:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTestRecovery = async () => {
    setLoading(true);
    try {
      const results = await testFailsafeRecovery();
      setTestResults(results);
    } catch (error) {
      console.error("Error testing failsafe recovery:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const getResilienceBadgeColor = (level: ResilienceLevel) => {
    switch (level) {
      case ResilienceLevel.NORMAL:
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case ResilienceLevel.ELEVATED:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case ResilienceLevel.HIGH:
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case ResilienceLevel.SEVERE:
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case ResilienceLevel.CATASTROPHIC:
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
    }
  };
  
  const getCommunicationBadgeColor = (mode: CommunicationMode) => {
    switch (mode) {
      case CommunicationMode.STANDARD:
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case CommunicationMode.MESH:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case CommunicationMode.SATELLITE:
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case CommunicationMode.RADIO:
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case CommunicationMode.OFFLINE:
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
    }
  };
  
  const getCryptoAlgorithmBadgeColor = (algorithm: CryptoFallbackAlgorithm) => {
    switch (algorithm) {
      case CryptoFallbackAlgorithm.PRIMARY:
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case CryptoFallbackAlgorithm.SECONDARY:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case CryptoFallbackAlgorithm.TERTIARY:
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case CryptoFallbackAlgorithm.SIGNATURE_PRIMARY:
        return "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20";
      case CryptoFallbackAlgorithm.SIGNATURE_SECONDARY:
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case CryptoFallbackAlgorithm.LAST_RESORT:
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
    }
  };
  
  if (!status) {
    return <div>Loading failsafe status...</div>;
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Failsafe Continuity Status
          </CardTitle>
          <CardDescription>
            Real-time status of PQC cryptographic resilience and disaster preparedness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Resilience Level</span>
                <Badge className={getResilienceBadgeColor(status.resilienceLevel)}>
                  {status.resilienceLevel.toUpperCase()}
                </Badge>
              </div>
              <Progress
                value={
                  status.resilienceLevel === ResilienceLevel.NORMAL ? 20 :
                  status.resilienceLevel === ResilienceLevel.ELEVATED ? 40 :
                  status.resilienceLevel === ResilienceLevel.HIGH ? 60 :
                  status.resilienceLevel === ResilienceLevel.SEVERE ? 80 : 100
                }
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Communication Mode</span>
                <Badge className={getCommunicationBadgeColor(status.communicationMode)}>
                  {status.communicationMode.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {status.communicationMode === CommunicationMode.STANDARD ? "Internet-based standard protocol" :
                   status.communicationMode === CommunicationMode.MESH ? "P2P mesh network active" :
                   status.communicationMode === CommunicationMode.SATELLITE ? "Satellite uplink established" :
                   status.communicationMode === CommunicationMode.RADIO ? "LoRa/Ham radio fallback" :
                   "Air-gapped offline mode"}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cryptographic Algorithm</span>
                <Badge className={getCryptoAlgorithmBadgeColor(status.cryptoAlgorithm)}>
                  {status.cryptoAlgorithm.replace(/-/g, " ")}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <Shuffle className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {status.cryptoAlgorithm === CryptoFallbackAlgorithm.PRIMARY ? "ML-KEM primary algorithm active" :
                   status.cryptoAlgorithm === CryptoFallbackAlgorithm.SECONDARY ? "BIKE secondary algorithm active" :
                   status.cryptoAlgorithm === CryptoFallbackAlgorithm.TERTIARY ? "FrodoKEM tertiary algorithm active" :
                   status.cryptoAlgorithm === CryptoFallbackAlgorithm.SIGNATURE_PRIMARY ? "SLH-DSA signature active" :
                   status.cryptoAlgorithm === CryptoFallbackAlgorithm.SIGNATURE_SECONDARY ? "Falcon signature active" :
                   "Last resort lattice backup active"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Threat Level</div>
            <div className="flex items-center">
              <Progress value={status.threatLevel} className="w-40 h-2 mr-2" />
              <span className={`text-sm font-medium ${
                status.threatLevel < 20 ? "text-green-500" :
                status.threatLevel < 40 ? "text-yellow-500" :
                status.threatLevel < 60 ? "text-orange-500" :
                status.threatLevel < 80 ? "text-red-500" : "text-purple-500"
              }`}>
                {status.threatLevel}%
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm flex justify-between">
              <span className="text-muted-foreground">Network Status</span>
              <span className={`font-medium ${
                status.networkStatus === "online" ? "text-green-500" :
                status.networkStatus === "degraded" ? "text-yellow-500" : "text-red-500"
              }`}>
                {status.networkStatus.toUpperCase()}
              </span>
            </div>
            <div className="text-sm flex justify-between">
              <span className="text-muted-foreground">Backup Nodes</span>
              <span className="font-medium">{status.backupNodesAvailable}</span>
            </div>
          </div>
          
          {status.activeMitigations.length > 0 && (
            <Alert className="bg-amber-500/10 border-amber-500/50">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertDescription>
                <span className="font-medium">Active Mitigations:</span> {status.activeMitigations.join(", ")}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2">
          <div className="text-xs text-muted-foreground">Last updated: {new Date(status.lastUpdated).toLocaleString()}</div>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              onClick={handleThreatAssessment}
              disabled={loading}
            >
              <AlertCircle className="mr-1 h-4 w-4" />
              Assess Threat Level
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleTestRecovery}
              disabled={loading}
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Test Failsafe Recovery
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {threatAssessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Threat Assessment Results
            </CardTitle>
            <CardDescription>
              Analysis of current security threats and recommended actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Detected Threat Level</span>
              <Badge className={`
                ${threatAssessment.threatLevel < 20 ? "bg-green-500/10 text-green-500" :
                  threatAssessment.threatLevel < 40 ? "bg-yellow-500/10 text-yellow-500" :
                  threatAssessment.threatLevel < 60 ? "bg-orange-500/10 text-orange-500" :
                  threatAssessment.threatLevel < 80 ? "bg-red-500/10 text-red-500" : 
                  "bg-purple-500/10 text-purple-500"}
              `}>
                {threatAssessment.threatLevel}%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Recommended Resilience Level</span>
              <Badge className={getResilienceBadgeColor(threatAssessment.recommendedResilienceLevel)}>
                {threatAssessment.recommendedResilienceLevel.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Recommended Actions:</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {threatAssessment.recommendedActions.map((action: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Zap className="h-3.5 w-3.5 text-primary mr-2 mt-0.5" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {threatAssessment.recommendedResilienceLevel !== ResilienceLevel.NORMAL && (
                <Button 
                  size="sm" 
                  onClick={() => handleSwitchCommunicationMode(
                    threatAssessment.recommendedResilienceLevel === ResilienceLevel.CATASTROPHIC ? 
                      CommunicationMode.SATELLITE : 
                    threatAssessment.recommendedResilienceLevel === ResilienceLevel.SEVERE ? 
                      CommunicationMode.MESH : 
                      CommunicationMode.STANDARD
                  )}
                  disabled={loading}
                >
                  <Radio className="mr-1 h-4 w-4" />
                  Switch Communication Mode
                </Button>
              )}
              
              {threatAssessment.threatLevel > 40 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleSwitchCryptoAlgorithm(
                    threatAssessment.threatLevel > 80 ? 
                      CryptoFallbackAlgorithm.TERTIARY : 
                    threatAssessment.threatLevel > 60 ? 
                      CryptoFallbackAlgorithm.SECONDARY : 
                      CryptoFallbackAlgorithm.PRIMARY
                  )}
                  disabled={loading}
                >
                  <Shuffle className="mr-1 h-4 w-4" />
                  Switch Crypto Algorithm
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Power className="h-5 w-5 text-primary" />
              Failsafe Recovery Test Results
            </CardTitle>
            <CardDescription>
              Results from testing the failsafe recovery systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Test Status</span>
              <Badge className={testResults.testSuccessful ? 
                "bg-green-500/10 text-green-500" : 
                "bg-red-500/10 text-red-500"
              }>
                {testResults.testSuccessful ? "PASSED" : "FAILED"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm flex justify-between">
                <span className="text-muted-foreground">Communication Test</span>
                <span className={`font-medium ${testResults.communicationTest ? "text-green-500" : "text-red-500"}`}>
                  {testResults.communicationTest ? "Passed" : "Failed"}
                </span>
              </div>
              <div className="text-sm flex justify-between">
                <span className="text-muted-foreground">Crypto Algorithm Test</span>
                <span className={`font-medium ${testResults.cryptoAlgorithmTest ? "text-green-500" : "text-red-500"}`}>
                  {testResults.cryptoAlgorithmTest ? "Passed" : "Failed"}
                </span>
              </div>
              <div className="text-sm flex justify-between">
                <span className="text-muted-foreground">Offline Operation Test</span>
                <span className={`font-medium ${testResults.offlineOperationTest ? "text-green-500" : "text-red-500"}`}>
                  {testResults.offlineOperationTest ? "Passed" : "Failed"}
                </span>
              </div>
              <div className="text-sm flex justify-between">
                <span className="text-muted-foreground">Satellite Connection</span>
                <span className={`font-medium ${testResults.satelliteConnectionTest ? "text-green-500" : "text-red-500"}`}>
                  {testResults.satelliteConnectionTest ? "Passed" : "Failed"}
                </span>
              </div>
            </div>
            
            <Alert className={`${testResults.testSuccessful ? 
              "bg-green-500/10 border-green-500/50" : 
              "bg-amber-500/10 border-amber-500/50"}`}
            >
              <AlertDescription>
                {testResults.testReport}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FailsafeContinuityPanel;
