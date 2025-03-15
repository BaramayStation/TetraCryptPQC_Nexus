
// Fix the duplicate exports

// Export security types with explicit names to avoid conflicts
import { 
  SecurityThreshold,
  HealthStatus,
  SecurityHealthMetrics,
  AISecurityPolicy,
  SecurityRule,
  AICloudConnectionStatus,
  PodmanContainerStatus,
  ContainerSecurityProfile,
  ContainerType,
  InfrastructureNodeType,
  AIThreatDetection,
  WebRTCPeerStatus,
  SecurityEvent,
  SecurityEventType,
  AISyncStatus
} from './security-types';

export {
  SecurityThreshold,
  HealthStatus,
  SecurityHealthMetrics,
  AISecurityPolicy,
  SecurityRule,
  AICloudConnectionStatus,
  PodmanContainerStatus,
  ContainerSecurityProfile,
  ContainerType,
  InfrastructureNodeType,
  AIThreatDetection,
  WebRTCPeerStatus,
  SecurityEvent,
  SecurityEventType,
  AISyncStatus
};

// Export hardware types
export * from './hardware-types';

// Export AI types
export * from './ai-types';

// Export message types
export * from './message-types';

// Export user types
export * from './user-types';
