
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
