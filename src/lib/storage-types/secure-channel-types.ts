
/**
 * TetraCryptPQC Secure Channel Type Definitions
 */

export interface SecureChannel {
  id: string;
  name: string;
  participants: string[];
  created: string;
  lastActivity: string;
  encryptionLevel: string;
  messageCount: number;
  keyRotationInterval: number; // hours
  pqcEnabled: boolean;
  zeroKnowledgeProofEnabled: boolean;
  peerEndpoint?: string;
}

export interface SecureChannelMetrics {
  channelId: string;
  encryptionStrength: "standard" | "enhanced" | "maximum";
  latencyMs: number;
  messageDeliverySuccessRate: number;
  keyRotationInterval: number;
  lastKeyRotation: string;
  compromiseAttempts: number;
  anomalyDetected: boolean;
  quantumResistanceVerified: boolean;
}
