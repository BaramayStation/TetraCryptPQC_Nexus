
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
