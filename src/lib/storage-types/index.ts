
/**
 * TetraCryptPQC Storage Types
 */

// Re-export all types from specific modules
export * from "./contacts";
export * from "./security-types";
export * from "./message-types";
export * from "./user-types";
export * from "./secure-channel-types";
export * from "./pqc-types";
export * from "./sync-types";
export * from "./decentralized-storage";
export * from "./threat-detection";
export * from "./identity-verification";
export * from "./hardware-types";

// Type re-exports for backward compatibility
export type { Contact } from "./contacts";
export type { Message, Conversation } from "./message-types";
export type { UserProfile, KeyPairs, DIDDocument, HSMInfo, QKDInfo } from "./user-types";
export type { 
  SecurityHealthMetrics, 
  AICloudConnectionStatus, 
  PodmanContainerStatus,
  SecurityThreshold,
  HealthStatus,
  SecurityRule,
  InfrastructureNodeType,
  Threat,
  AIThreatDetection,
  AISecurityPolicy,
  WebRTCPeerStatus
} from "./security-types";
export type { SecureContainerConfig, ContainerSecurityProfile } from "./security-types";
export type { SecureServiceMesh, SecureInfraNode } from "./security-types";
export type { SecureChannel, SecureChannelMetrics } from "./secure-channel-types";
export type { StarkNetID, PQSCIFEnvironment, SecureCommand } from "./pqc-types";
export type { AISyncStatus } from "./sync-types";
export type {
  DecentralizedStorageNode,
  DeploymentEnvironment,
  AirGappedBackup,
  EMPHardenedSystem,
  SatelliteConnection,
  MilitaryMeshNetwork,
  UndergroundCommunicationNode,
  QuantumSecureLink
} from "./decentralized-storage";
export type {
  ThreatDetectionResult,
  SecurityAlert
} from "./threat-detection";
export type {
  VerificationRequest,
  IdentityCredential
} from "./identity-verification";
