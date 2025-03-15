
export interface AIModel {
  id: string;
  name: string;
  version: string;
  type: "classification" | "detection" | "generation" | "recommendation";
  status: "active" | "training" | "outdated";
  accuracy: number;
  lastUpdated: string;
  quantumSecure: boolean;
}

export interface AIThreatDetection {
  id: string;
  severity: "high" | "medium" | "low";
  description: string;
  affectedComponents: string[];
  timestamp: string;
  mitigated: boolean;
  status: "active" | "mitigated" | "resolved";
  score: number;
  remediationSteps?: string[];
  detailedAnalysis?: string;
}

export interface AISecurityPolicy {
  enabled: boolean;
  automatedResponse: boolean;
  threatLevel: "high" | "medium" | "low";
  scanFrequency: number;
  mlModelVersion: string;
  lastUpdated: string;
  homomorphicEncryptionEnabled?: boolean;
  zeroKnowledgeAuthEnabled?: boolean;
  autoRemediationEnabled?: boolean;
  threatDetectionLevel?: "standard" | "enhanced" | "maximum";
  id?: string;
  name?: string;
  policyType?: "detection" | "prevention" | "monitoring";
  rules?: SecurityRule[];
  created?: string;
  updated?: string;
}

export interface SecurityRule {
  id: string;
  name: string;
  priority: number;
  condition: string;
  action: "alert" | "block" | "quarantine";
  enabled: boolean;
}

export interface AISecuredCloudInstance {
  id: string;
  name: string;
  provider: string;
  region: string;
  securityStatus: "secure" | "warning" | "compromised";
  securityScore: number;
  lastScan: string;
  aiProtection: {
    enabled: boolean;
    level: "basic" | "advanced" | "enterprise";
    autoRemediation: boolean;
  };
  threats: {
    high: number;
    medium: number;
    low: number;
  };
}

export type AISyncStatus = "syncing" | "complete" | "failed" | "pending" | "idle" | "verified";
