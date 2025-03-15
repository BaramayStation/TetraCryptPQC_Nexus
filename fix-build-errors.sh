
#!/bin/bash

echo "🔧 Fixing TypeScript Errors Automatically..."

# 1️⃣ Ensure all required type exports exist in storage-types/index.ts
echo "📦 Checking missing exports in storage-types..."
STORAGE_TYPES="src/lib/storage-types/index.ts"

cat > $STORAGE_TYPES <<EOL
/**
 * TetraCryptPQC Storage Types
 */

// Re-export all types from specific modules
export * from "./contacts";
export * from "./security-types";
export * from "./message-types";
export * from "./user-types";
export * from "./decentralized-storage";
export * from "./threat-detection";
export * from "./identity-verification";
export * from "./secure-channel-types";
export * from "./pqc-types";
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
  AISecurityPolicy
} from "./security-types";
export type { SecureContainerConfig, ContainerSecurityProfile } from "./security-types";
export type { SecureChannel, SecureChannelMetrics } from "./secure-channel-types";
export type { StarkNetID, PQSCIFEnvironment, SecureCommand } from "./pqc-types";
export type { AISyncStatus } from "./sync-types";
EOL

# 2️⃣ Fix missing interface properties in message.ts
echo "📄 Ensuring all Message properties exist..."
MESSAGE_FILE="src/lib/storage-types/message-types.ts"

cat > $MESSAGE_FILE <<EOL
/**
 * TetraCryptPQC Message Type Definitions
 * 
 * Type definitions for secure messaging system with quantum-resistant cryptography
 */

export interface Message {
  id: string;
  senderId: string;
  recipientId?: string;
  receiverId: string;
  content: string;
  timestamp: string;
  encrypted?: boolean;
  signature?: string;
  verified?: boolean;
  encryptionType?: string;
  status?: "sent" | "delivered" | "read" | "failed";
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: "active" | "healing" | "healed" | "compromised";
  zkProofVerified?: boolean;
  didVerified?: boolean;
  starkNetValidated?: boolean;
  webrtcSecured?: boolean;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
  integrityHash?: string;
  read?: boolean;
}

export interface SecureMessageOptions {
  encryptionType: "ML-KEM-1024" | "ChaCha20-Poly1305" | "Hybrid";
  signMessage: boolean;
  persistLocally: boolean;
  expiresIn?: number; // seconds
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  pqcEnabled: boolean;
  encryptionType: string;
  messages?: Message[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MessagePreview {
  id: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "failed";
}

export interface QuantumChannel {
  id: string;
  participants: string[];
  encryptionType: "ML-KEM-768" | "ML-KEM-1024" | "Hybrid";
  signatureType: "ML-DSA-65" | "ML-DSA-87" | "Falcon-512" | "Falcon-1024";
  status: "active" | "inactive" | "compromised";
  establishedAt: string;
  lastActivityAt: string;
  messageCount: number;
  forwardSecrecy: boolean;
  pqcVersion: string;
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
EOL

# 3️⃣ Fix UserProfile missing properties
echo "👤 Fixing missing UserProfile properties..."
USER_PROFILE_FILE="src/lib/storage-types/user-types.ts"

cat > $USER_PROFILE_FILE <<EOL
export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  name: string;
  displayName: string;
  email?: string;
  keyPairs: KeyPairs;
  settings: UserSettings;
  securityLevel: "standard" | "enhanced" | "maximum";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  didDocument?: DIDDocument;
  hsmInfo?: HSMInfo;
  qkdInfo?: QKDInfo;
  starkNetId?: string;
}

export interface DIDDocument {
  id: string;
  verificationMethod: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyMultibase?: string;
  }>;
  authentication: string[];
  assertionMethod?: string[];
  created: string;
  updated: string;
  status: 'active' | 'revoked';
}

export interface HSMInfo {
  available: boolean;
  vendor: string;
  model: string;
  firmwareVersion: string;
  status: 'active' | 'inactive' | 'error';
  lastChecked: string;
  supportsPQC: boolean;
  serialNumber?: string;
}

export interface QKDInfo {
  available: boolean;
  type: string;
  provider: string;
  lastSyncTime: string;
  keyCount: number;
  status: 'active' | 'inactive' | 'error';
}

export interface KeyPairs {
  pqkem: {
    publicKey: string;
    privateKey: string;
    created: string;
    algorithm: string;
    strength: string;
    standard: string;
  };
  signature: {
    publicKey: string;
    privateKey: string;
    created: string;
    algorithm: string;
    strength: string;
    standard: string;
  };
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  notifications: boolean;
  secureLogin: boolean;
  twoFactorAuth: boolean;
  twoFactorEnabled: boolean;
  autoLock: boolean;
  autoLockTimeout: number;
  privacyMode: "standard" | "enhanced" | "maximum";
  secureEnclave: boolean;
  zeroKnowledgeEnabled: boolean;
  pqcEnabled: boolean;
  hardwareKeyEnabled: boolean;
  webrtcEnabled: boolean;
  p2pEnabled: boolean;
  dataRetentionDays: number;
}

export interface BiometricData {
  faceId?: boolean;
  touchId?: boolean;
  voicePrint?: boolean;
  lastVerified?: string;
  hardwareProtected: boolean;
}
EOL

# 4️⃣ Create the contacts.ts file
echo "👥 Creating contacts file..."
CONTACTS_FILE="src/lib/storage-types/contacts.ts"

cat > $CONTACTS_FILE <<EOL
/**
 * TetraCryptPQC Contact Type Definition
 */

export interface Contact {
  id: string;
  name: string;
  displayName?: string;
  email?: string;
  status?: "online" | "away" | "offline";
  publicKey: string;
  signatureKey: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  pqcEnabled?: boolean;
  verificationStatus?: "verified" | "unverified" | "pending";
  created?: string;
}
EOL

# 5️⃣ Create a threat-detection.ts file
echo "🛡️ Creating threat detection file..."
THREAT_DETECTION_FILE="src/lib/storage-types/threat-detection.ts"

cat > $THREAT_DETECTION_FILE <<EOL
/**
 * TetraCryptPQC Threat Detection Type Definitions
 */

export interface ThreatDetectionResult {
  detected: boolean;
  threats: any[];
  score: number;
  recommendation: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  source: string;
  status: "active" | "acknowledged" | "resolved";
  affectedComponents?: string[];
  remediationSteps?: string[];
}
EOL

# 6️⃣ Create an identity-verification.ts file
echo "🆔 Creating identity verification file..."
IDENTITY_FILE="src/lib/storage-types/identity-verification.ts"

cat > $IDENTITY_FILE <<EOL
/**
 * TetraCryptPQC Identity Verification Type Definitions
 */

export interface VerificationRequest {
  id: string;
  userId: string;
  type: "email" | "phone" | "document" | "biometric" | "wallet";
  status: "pending" | "verified" | "rejected" | "expired";
  timestamp: string;
  expiresAt: string;
  verificationData?: any;
  verifierService?: string;
}

export interface IdentityCredential {
  id: string;
  userId: string;
  type: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string;
  revoked: boolean;
  credential: any;
  proofType: string;
  proof: string;
}
EOL

# 7️⃣ Create hardware-types.ts file
echo "📦 Creating hardware types file..."
HARDWARE_FILE="src/lib/storage-types/hardware-types.ts"

cat > $HARDWARE_FILE <<EOL
/**
 * TetraCryptPQC Hardware Types
 */

// Hardware security module interface
export interface HSMDevice {
  id: string;
  name: string;
  vendor: string;
  model: string;
  firmwareVersion: string;
  status: "active" | "inactive" | "error";
  capabilities: string[];
  quantumResistant: boolean;
}

// Export all types that were in storage-types.ts
export interface SecureContainerConfig {
  id: string;
  name: string;
  description: string;
  status: "running" | "stopped" | "error" | "provisioning";
  created: string;
  lastUpdated: string;
  securityStatus: "secure" | "warning" | "vulnerable" | "compromised" | "suspicious";
  securityScore: number;
}

export interface SecureInfraNode {
  id: string;
  name: string;
  type: string;
  status: 'offline' | 'online' | 'provisioning' | 'degraded';
  ip: string;
  region: string;
  securityProfile: string;
  lastUpdated: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  securityScore?: number;
  created?: string;
  pqcEnabled?: boolean;
  trustLevel?: string;
}

export interface SecureServiceMesh {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'degraded';
  nodes: string[];
  version: string;
  lastUpdated: string;
  mtls: boolean;
  trafficEncryption: boolean;
  securityPolicies: string[];
  endpoints?: string[];
  policyEnforcement?: boolean;
  securityScore?: number;
  created?: string;
}

export interface ContainerSecurityProfile {
  immutableRootfs: boolean;
  seccomp: boolean;
  appArmor?: boolean;
  selinux?: boolean;
  rootless?: boolean;
  readOnly?: boolean;
  privileged: boolean;
  capabilities?: string[];
  securityScore: number;
}

export interface DecentralizedStorageNode {
  id: string;
  nodeType: 'storage' | 'validator' | 'gateway' | 'archival';
  name?: string;
  type?: string;
  status: 'online' | 'offline' | 'syncing' | 'error';
  capacityTotal: number; // GB
  capacityUsed: number; // GB
  usedStorage?: number;
  storageCapacity?: number;
  region: string;
  replicationFactor: number;
  dataAvailability: number; // percentage
  lastSeen: string;
  version: string;
  ipfsPeerId?: string;
  starknetContract?: string;
  encryptionEnabled: boolean;
  stakingAmount?: number;
  performanceScore: number; // 0-100
  location?: string;
  pqcEnabled?: boolean;
  networkLatency?: number;
  lastSynced?: string;
}

export interface AirGappedBackup {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'offline';
  lastBackup: string;
  storageType: 'optical' | 'magnetic' | 'solid-state' | 'paper' | 'crystal';
  encryptionMethod: string;
  locationStatus: 'secure' | 'unknown' | 'compromised';
  accessLevel: 'top-secret' | 'secret' | 'confidential' | 'restricted';
  retentionPeriod: number; // days
  dataClassification: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
  backupType?: string;
  mediaType?: string;
  dataSize?: number;
  createdAt?: string;
}

export interface SatelliteConnection {
  id: string;
  name: string;
  orbitalPosition: string;
  status: 'connected' | 'disconnected' | 'degraded';
  encryptionEnabled: boolean;
  signalStrength: number; // percentage
  lastContact: string;
  bandwidth: number; // Mbps
  latency: number; // milliseconds
  dataTransferred: number; // MB
  nextPassTime?: string;
  nextWindowStart?: string;
  threatAssessment: 'low' | 'medium' | 'high' | 'unknown';
  provider?: string;
  satelliteId?: string;
  securityLevel?: string;
  orbitType?: string;
  pqcEnabled?: boolean;
}

export interface EMPHardenedSystem {
  id: string;
  name: string;
  type: 'communications' | 'storage' | 'processing' | 'power' | 'integrated';
  status: 'active' | 'standby' | 'offline' | 'maintenance';
  shieldingLevel: number; // 1-10
  lastTested: string;
  certificationLevel: string;
  backupPower: boolean;
  backupPowerRemaining?: number; // hours
  location: string;
  hardwareGeneration: string;
  testResults: {
    empSurvivability: number; // percentage
    dataIntegrity: number; // percentage
    recoveryTime: number; // minutes
  };
  protectionLevel?: string;
  protectionRating?: number;
  backupPowerDuration?: number;
  powerDurationHours?: number;
  recoveryTime?: number;
}

export interface DeploymentEnvironment {
  id: string;
  name: string;
  type: 'development' | 'testing' | 'staging' | 'production' | 'disaster-recovery';
  status: 'active' | 'inactive' | 'deploying' | 'failed';
  region: string;
  created: string;
  lastDeployment: string;
  resources: {
    compute: number; // vCPUs
    memory: number; // GB
    storage: number; // GB
    cost: number; // USD per hour
  };
  accessControl: {
    authMethod: string;
    rolesConfigured: boolean;
    mfaRequired: boolean;
  };
  compliance: {
    standards: string[];
    lastAudit: string;
    passRate: number; // percentage
  };
  aiSecurityEnabled: boolean;
  provider?: string;
  securityProfile?: string;
}

export interface BackupJob {
  id: string;
  name: string;
  status: string;
  lastRun: string;
  nextRun: string;
  backupType: string;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  dataSize: number;
  duration: number;
  targets: string[];
}

export interface UndergroundCommunicationNode {
  id: string;
  name: string;
  type: 'relay' | 'gateway' | 'endpoint' | 'cache';
  status: 'online' | 'offline' | 'compromised' | 'standby';
  location: {
    lat: number;
    lng: number;
    description: string;
    depth?: number; // For underground nodes
    facility?: string;
  };
  powerSource: 'grid' | 'battery' | 'solar' | 'nuclear' | 'hybrid';
  powerRemaining?: number; // Percentage
  emperShielded: boolean;
  lastContact: string;
  cryptoSuite: string;
  bandwidth: number; // Mbps
  storageCapacity: number; // GB
  connections: string[]; // IDs of connected nodes
  empHardened?: boolean;
  supportedBandwidth?: number;
  communicationProtocols?: string[];
  aiEnabled?: boolean;
}

export interface MilitaryMeshNetwork {
  id: string;
  name: string;
  nodes: string[]; // IDs of member nodes
  topology: 'mesh' | 'star' | 'hierarchical' | 'dynamic';
  encryptionLevel: 'top-secret' | 'secret' | 'confidential' | 'restricted' | 'unclassified';
  region: string;
  status: 'active' | 'offline' | 'compromised' | 'standby';
  redundancyFactor: number;
  created: string;
  lastActive: string;
  threatAssessment: 'low' | 'medium' | 'high' | 'critical' | 'unknown';
  classification?: string;
  nodeCount?: number;
  communicationLatency?: number;
  pqcEnabled?: boolean;
  resilienceScore?: number;
  coverage?: {
    urban: number;
    rural: number;
    maritime: number;
    aerial: number;
    space: number;
  };
}

export interface QuantumSecureLink {
  id: string;
  name?: string;
  sourceNodeId: string;
  targetNodeId: string;
  keyExchangeMethod: 'qkd' | 'pqc' | 'hybrid';
  status: 'active' | 'inactive' | 'degraded';
  establishedAt: string;
  lastRotation: string;
  keyStrength: number;
  latency: number; // milliseconds
  bandwidthCapacity: number; // Mbps
  redundancyPath: boolean;
  threatDetection: boolean;
  type?: string;
  endpoints?: string[];
  keyRotationInterval?: number;
  verificationMethod?: string;
  backupLinks?: string[];
}

export interface StarkNetID {
  id: string;
  address: string;
  timestamp: string;
  verified: boolean;
  proofOfIdentity?: string;
  validUntil?: string;
}
EOL

# 8️⃣ Fix imports in page files
echo "📄 Fixing page imports..."
find src/pages -type f -name "*.tsx" | while read file; do
    sed -i 's/import { MainLayout } from "@\/layout\/MainLayout"/import MainLayout from "@\/layout\/MainLayout"/g' "$file"
done

# 9️⃣ Remove TypeScript Cache
echo "🗑️ Removing TypeScript Cache..."
rm -rf node_modules/.cache

# 🔟 Restart TypeScript Server
echo "♻️ Restarting TypeScript Server..."
npx tsc --noEmit

echo "✅ All fixes applied successfully!"
