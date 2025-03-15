import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  getAICloudConnectionStatus, 
  getAISecurityPolicy, 
  getSecurityHealthMetrics 
} from "@/lib/ai-cloud-security";
import { AICloudConnectionStatus, AISecurityPolicy, SecurityHealthMetrics, SecureContainerConfig } from "@/lib/storage-types/security-types";
import { generateRandomBytes, toHexString } from "@/lib/pqcrypto-core";

const AISecureCloudInfrastructure: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<AICloudConnectionStatus | null>(null);
  const [securityPolicy, setSecurityPolicy] = useState<AISecurityPolicy | null>(null);
  const [threatMetrics, setThreatMetrics] = useState<SecurityHealthMetrics | null>(null);
  const [containers, setContainers] = useState<SecureContainerConfig[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data from AI cloud
      setConnectionStatus(getAICloudConnectionStatus());
      setSecurityPolicy(getAISecurityPolicy());
      setThreatMetrics(getSecurityHealthMetrics());
      setContainers(generateSecureContainers());
    };

    fetchData();
  }, []);
  
  // Simulate secure container generation
  const generateSecureContainers = (): SecureContainerConfig[] => {
    const containerCount = 5;
    const containerTypes = ["application", "security", "storage", "compute", "network"];
    const vulnerabilities = ["high", "medium", "low"];
    const statuses = ["running", "stopped", "error", "provisioning"];
    
    return Array.from({ length: containerCount }, (_, i) => ({
      id: `container-${i + 1}`,
      name: `Secure Container ${i + 1}`,
      description: `AI-Powered Secure Container ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)] as "running" | "stopped" | "error" | "provisioning",
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      securityProfile: {
        immutableRootfs: Math.random() > 0.5,
        seccomp: Math.random() > 0.5,
        apparmor: Math.random() > 0.5,
        rootless: Math.random() > 0.5,
        readOnly: Math.random() > 0.5,
        privileged: Math.random() > 0.5,
        capabilities: ["CAP_NET_ADMIN", "CAP_SYS_MODULE"],
        securityScore: Math.floor(Math.random() * 100)
      },
      encryptionEnabled: Math.random() > 0.5,
      pqcEnabled: Math.random() > 0.5,
      securityScore: Math.floor(Math.random() * 100),
      image: `tetracrypt/secure-ai-container:${Math.floor(Math.random() * 3) + 1}.0`,
      immutableRootfs: Math.random() > 0.5,
      vulnerabilities: {
        high: Math.floor(Math.random() * 5),
        medium: Math.floor(Math.random() * 10),
        low: Math.floor(Math.random() * 15)
      },
      type: containerTypes[Math.floor(Math.random() * containerTypes.length)] as "security" | "application" | "storage" | "compute" | "network" | "general" | "ai" | "kubernetes" | "docker",
      created: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Secure Cloud Infrastructure</CardTitle>
          <CardDescription>
            Monitor and manage the security of your AI cloud infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectionStatus && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Cloud Connection Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Provider:</strong> {connectionStatus.provider || "Unknown"}
                </div>
                <div>
                  <strong>Status:</strong> {connectionStatus.status}
                </div>
                <div>
                  <strong>Latency:</strong> {connectionStatus.latency}ms
                </div>
                <div>
                  <strong>Encryption:</strong> {connectionStatus.encryptionStatus}
                </div>
              </div>
            </div>
          )}

          {securityPolicy && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">AI Security Policy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Enabled:</strong> {securityPolicy.enabled ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Automated Response:</strong> {securityPolicy.automatedResponse ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Threat Level:</strong> {securityPolicy.threatLevel}
                </div>
                <div>
                  <strong>ML Model Version:</strong> {securityPolicy.mlModelVersion}
                </div>
              </div>
            </div>
          )}

          {threatMetrics && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Threat Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Threat Detections (24h):</strong> {threatMetrics.threatDetectionsLast24h}
                </div>
                <div>
                  <strong>Active Threats:</strong> {threatMetrics.activeThreats}
                </div>
                <div>
                  <strong>Security Score:</strong> {threatMetrics.securityScore}
                </div>
                <div>
                  <strong>Patch Level:</strong> {threatMetrics.patchLevel}
                </div>
              </div>
              
              <div className="mt-2">
                <h4 className="text-sm font-medium">Mitigation Rate</h4>
                <Progress 
                  value={threatMetrics.threatDetectionRate} 
                  className={`h-2 ${
                    threatMetrics.detectionRate >= 80 ? "bg-green-500/20" :
                    threatMetrics.detectionRate >= 60 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
              </div>
              
              <div className="mt-2">
                <h4 className="text-sm font-medium">Detection Rate</h4>
                <Progress 
                  value={threatMetrics.mitigationRate} 
                  className={`h-2 ${
                    threatMetrics.mitigationRate >= 80 ? "bg-green-500/20" :
                    threatMetrics.mitigationRate >= 60 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  }`}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Secure Containers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {containers.map((container) => (
                <Card key={container.id}>
                  <CardHeader>
                    <CardTitle>{container.name}</CardTitle>
                    <CardDescription>
                      {container.description} ({container.type})
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <strong>Status:</strong> {container.status}
                    </div>
                    <div>
                      <strong>Image:</strong> {container.image}
                    </div>
                    <div>
                      <strong>Security Score:</strong> {container.securityScore}
                    </div>
                    <div>
                      <strong>PQC Enabled:</strong> {container.pqcEnabled ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Vulnerabilities:</strong>
                      {(container.vulnerabilities.high + 
                         container.vulnerabilities.medium + 
                         container.vulnerabilities.low) > 0 ? (
                        Object.entries(container.vulnerabilities).map(([severity, count]) => 
                          count > 0 ? (
                            <span key={severity} className={`mr-2 ${
                              severity === 'high' ? 'text-red-500' : 
                              severity === 'medium' ? 'text-yellow-500' : 
                              'text-blue-500'
                            }`}>
                              {severity}: {count}
                            </span>
                          ) : null
                        )
                      ) : (
                        "None"
                      )}
                    </div>
                    <div>
                      <strong>Security Status:</strong>
                      {container.securityStatus === "secure" && (
                        <Badge className="bg-green-500">Secure</Badge>
                      )}
                      {container.securityStatus === "suspicious" && (
                        <Badge className="bg-yellow-500">Suspicious</Badge>
                      )}
                      {container.securityStatus === "compromised" && (
                        <Badge className="bg-red-500">Compromised</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISecureCloudInfrastructure;
