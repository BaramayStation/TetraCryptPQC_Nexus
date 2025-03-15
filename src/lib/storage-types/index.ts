
// Export all types from individual files
export * from './user-types';
export * from './security-types';
export * from './message-types';
export * from './ai-types';
export * from './node-types';
export * from './hardware-types';

// Explicitly import and re-export types to resolve ambiguity
import type { ContainerSecurityProfile } from './security-types';
export type { ContainerSecurityProfile };

// Explicitly import and re-export container types to resolve ambiguity
import type { SecureContainerConfig, SecureServiceMesh, SecureInfraNode } from './hardware-types';
export type { SecureContainerConfig, SecureServiceMesh, SecureInfraNode };

// Re-export AIThreatDetection to avoid duplicate exports
import type { AIThreatDetection } from './security-types';
export type { AIThreatDetection };

// Re-export types from message-types with corrected properties
import type { Message, Conversation } from './message-types';
export type { Message, Conversation };

// Export enums for node and container types
export enum ContainerType {
  APPLICATION = "application",
  DATABASE = "database",
  CACHE = "cache",
  PROXY = "proxy",
  SECURITY = "security"
}

export enum InfrastructureNodeType {
  COMPUTE = "compute",
  STORAGE = "storage",
  NETWORK = "network",
  SECURITY = "security",
  AI = "ai",
  GENERAL = "general",
  APPLICATION = "application",
  KUBERNETES = "kubernetes",
  DOCKER = "docker"
}

// Re-export extended status types to ensure consistency
export type SecurityThreshold = "secure" | "suspicious" | "compromised" | "normal" | "elevated";
export type HealthStatus = "healthy" | "degraded" | "unhealthy" | "warning";
export type AISyncStatus = "syncing" | "complete" | "failed" | "pending" | "idle" | "verified";
export type PeerStatus = "active" | "healing" | "healed" | "verified";
