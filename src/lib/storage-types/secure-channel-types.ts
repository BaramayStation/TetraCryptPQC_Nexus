
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
  peerEndpoint?: string; // Added for compatibility
}

export interface SecureChannelMetrics {
  id: string;
  channelId: string;
  messagesPerDay: number;
  averageResponseTime: number; // seconds
  activeParticipants: number;
  averageMessageSize: number; // bytes
  peakUsageTime: string;
  securityEvents: number;
  keyRotations: number;
  endToEndLatency: number; // milliseconds
}
