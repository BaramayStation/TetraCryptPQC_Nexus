
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
  remediationSteps: string[];
  status: "active" | "mitigated" | "resolved";
  timestamp: string;
}
