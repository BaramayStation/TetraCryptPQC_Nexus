
/**
 * TetraCryptPQC Threat Detection Type Definitions
 */

export interface ThreatDetectionResult {
  detected: boolean;
  threats: any[];
  score: number;
  recommendation: string;
}

export interface Threat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  target: string;
  description: string;
  mitigated: boolean;
  status?: string; // Added status property
  metadata?: Record<string, any>;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved';
  affectedComponents?: string[];
  remediationSteps?: string[];
}

export interface AIThreatDetection {
  id: string;
  threatType: 'anomaly' | 'malware' | 'intrusion' | 'data_leak' | 'ddos' | 'ransomware' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  sourceIp?: string;
  targetSystem?: string;
  mitigated: boolean;
  score: number;
  description?: string; // Added description property
  details?: string; // For compatibility
  status?: string; // Added status property
  indicators?: string[]; // Added indicators property
  mitigationSteps?: string[]; // Added mitigationSteps property
  affectedComponents?: string[]; // Added affectedComponents property
  detailedAnalysis?: string; // Added detailedAnalysis property
}
