
/**
 * TetraCryptPQC Failsafe Types
 * Core type definitions for the multi-layered failsafe system
 */

export enum FailsafeComponentType {
  NETWORK = "network",
  CRYPTOGRAPHY = "cryptography",
  STORAGE = "storage",
  IDENTITY = "identity",
  COMMUNICATION = "communication",
  EXECUTION = "execution"
}

export enum FailsafeStatus {
  ONLINE = "online",
  DEGRADED = "degraded",
  FALLBACK = "fallback",
  EMERGENCY = "emergency",
  OFFLINE = "offline"
}

export enum FailsafeStrategy {
  DEFAULT = "default",
  ALTERNATE = "alternate",
  BACKUP = "backup",
  EMERGENCY = "emergency",
  LAST_RESORT = "last_resort"
}

export interface FailsafeImplementation<T> {
  id: string;
  name: string;
  type: FailsafeComponentType;
  description: string;
  priority: number;
  strategy: FailsafeStrategy;
  implementation: T;
  status: FailsafeStatus;
  isAvailable: () => Promise<boolean>;
  activate: () => Promise<boolean>;
  deactivate: () => Promise<boolean>;
  test: () => Promise<FailsafeTestResult>;
}

export interface FailsafeTestResult {
  success: boolean;
  latency?: number;
  errors?: string[];
  details?: Record<string, any>;
}

export interface FailsafeCoordinator {
  id: string;
  componentType: FailsafeComponentType;
  status: FailsafeStatus;
  activeImplementation: string | null;
  implementations: Record<string, FailsafeImplementation<any>>;
  fallbackChain: string[];
  registerImplementation: <T>(implementation: FailsafeImplementation<T>) => void;
  unregisterImplementation: (id: string) => void;
  getImplementation: <T>(id: string) => FailsafeImplementation<T> | null;
  switchToImplementation: <T>(id: string) => Promise<boolean>;
  testAllImplementations: () => Promise<Record<string, FailsafeTestResult>>;
  getStatus: () => FailsafeStatus;
}

export interface FailsafeManager {
  coordinators: Record<FailsafeComponentType, FailsafeCoordinator>;
  registerCoordinator: (coordinator: FailsafeCoordinator) => void;
  unregisterCoordinator: (componentType: FailsafeComponentType) => void;
  getCoordinator: (componentType: FailsafeComponentType) => FailsafeCoordinator | null;
  testAll: () => Promise<Record<FailsafeComponentType, Record<string, FailsafeTestResult>>>;
  getFailsafeReport: () => Promise<FailsafeSystemReport>;
}

export interface FailsafeSystemReport {
  timestamp: string;
  overallStatus: FailsafeStatus;
  componentStatuses: Record<FailsafeComponentType, {
    status: FailsafeStatus;
    activeImplementation: string | null;
    availableImplementations: string[];
  }>;
  recommendations: string[];
}
