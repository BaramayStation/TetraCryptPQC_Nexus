import { AICloudConnectionStatus, AISyncStatus, PodmanContainerStatus } from './storage-types/security-types';

/**
 * Simulate local AI model backup and sync
 */

/**
 * Simulate AI model synchronization status
 */
export function getAISyncStatus(): {
  status: AISyncStatus;
  progress: number;
  lastSync: string;
  modelName: string;
  modelId: string;
  syncDirection: "up" | "down";
} {
  // Simulate sync status
  return {
    status: "syncing" as AISyncStatus, // Instead of a string value
    progress: Math.floor(Math.random() * 100),
    lastSync: new Date().toISOString(),
    modelName: "GPT-PQC-Secure",
    modelId: "gpt-pqc-123",
    syncDirection: Math.random() > 0.5 ? "up" : "down"
  };
}

/**
 * Simulate local AI container status
 */
export function getLocalAIContainers(): PodmanContainerStatus[] {
  const container: PodmanContainerStatus = {
    id: `container-${Math.random().toString(36).substring(7)}`,
    name: `ai-${Math.random() > 0.5 ? 'model' : 'inference'}-container`,
    status: "running",
    securityStatus: "secure",
    image: "tetracrypt/ai-secure:latest",
    created: new Date().toISOString(),
    ports: ["8080:8080", "9000:9000"],
    securityLevel: "high",
    rootless: true, // This is now properly defined in the interface
    containerName: "ai-secure-container",
    cpuUsagePercent: Math.random() * 50,
    memoryUsageMB: Math.random() * 2048,
    restartCount: Math.floor(Math.random() * 5),
    uptime: Math.random() * 3600,
    lastRestart: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    running: true,
    healthStatus: "healthy"
  };
  
  return [container];
}

/**
 * Simulate AI cloud connection status
 */
export function getAICloudConnectionStatus(): AICloudConnectionStatus {
  const status: AICloudConnectionStatus = {
    connected: true,
    latency: Math.random() * 100,
    lastConnection: new Date().toISOString(),
    status: "online",
    securityStatus: "secure",
    connectionUptime: Math.floor(Math.random() * 1000), // This is now properly defined
    provider: "TetraCrypt AI Cloud",
    encryptionStatus: "encrypted"
  };
  
  return status;
}
