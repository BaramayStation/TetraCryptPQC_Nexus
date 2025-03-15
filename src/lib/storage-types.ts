/**
 * TetraCryptPQC Storage Types
 */

// StarkNet ID structure
export interface StarkNetID {
  id: string;
  type: string;
  address: string;
  starkKey: string;
  created: string;
}

// DID Document structure
export interface DIDDocument {
  id: string;
  "@context": string;
  verificationMethod: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyHex: string;
  }>;
  authentication: string[];
  assertionMethod: string[];
  keyAgreement: string[];
}

// PQC Key Pair structure
export interface PQCKeyPair {
  pqkem: {
    algorithm: string;
    publicKey: string;
    privateKey: string;
    strength: string;
    standard: string;
    created: string;
  };
  signature: {
    algorithm: string;
    publicKey: string;
    privateKey: string;
    strength: string;
    standard: string;
    created: string;
  };
}

// HSM Information structure
export interface HSMInfo {
  id: string;
  type: string;
  provider: string;
  securityLevel: string;
  lastVerified: string;
  capabilities: string[];
}

// QKD Information structure
export interface QKDInfo {
  id: string;
  protocol: string;
  keyRate: number;
  qberRate: number;
  distance: number;
  lastExchange: string;
}

// Security Threat Intelligence structure
export interface SecurityThreatIntelligence {
  id: string;
  threats: Array<{
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    source: string;
    details: string;
    mitigationStatus: 'unmitigated' | 'mitigating' | 'mitigated';
    discoveredAt: string;
  }>;
  lastUpdated: string;
}

// HSM Type Enum
export enum HSMType {
  TPM = "TPM",
  SGX = "SGX",
  SEV = "SEV",
  YUBIKEY = "YUBIKEY",
  HSM = "HSM",
  TRUSTZONE = "TRUSTZONE",
  NONE = "NONE",
  SECUREENCLAVE = "SECUREENCLAVE"
}

// Certificate Revocation List (CRL) structure
export interface CertificateRevocationList {
  id: string;
  issuer: string;
  lastUpdated: string;
  nextUpdate: string;
  revokedCertificates: Array<{
    serialNumber: string;
    revocationDate: string;
    reasonCode: RevocationReason;
    fingerprint: string;
    algorithm: string;
  }>;
  signature: string;
  signatureAlgorithm: string;
}

// Revocation reason codes (based on X.509 standard)
export enum RevocationReason {
  UNSPECIFIED = 0,
  KEY_COMPROMISE = 1,
  CA_COMPROMISE = 2,
  AFFILIATION_CHANGED = 3,
  SUPERSEDED = 4,
  CESSATION_OF_OPERATION = 5,
  CERTIFICATE_HOLD = 6,
  REMOVE_FROM_CRL = 8,
  PRIVILEGE_WITHDRAWN = 9,
  AA_COMPROMISE = 10,
  QUANTUM_VULNERABILITY = 11 // Custom reason for quantum vulnerabilities
}

// PKI Certificate structure with PQ enhancements
export interface PKICertificate {
  id: string;
  serialNumber: string;
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  publicKeyAlgorithm: string;
  publicKey: string;
  signatureAlgorithm: string;
  signature: string;
  fingerprint: string;
  status: 'valid' | 'revoked' | 'expired' | 'suspended';
  pqcProtected: boolean;
  quantum: {
    mlkemPublicKey?: string;
    falconPublicKey?: string;
    algorithm: string;
    strength: string;
  };
  extensions: {
    keyUsage?: string[];
    extendedKeyUsage?: string[];
    subjectAltName?: string[];
    basicConstraints?: {
      isCA: boolean;
      pathLenConstraint?: number;
    };
    [key: string]: any;
  };
  starkNetVerified: boolean;
  zkProofs: {
    identityProof?: string;
    attributeProofs?: Record<string, string>;
  };
}

// User Profile structure
export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  name?: string;
  username?: string;
  email?: string;
  publicKey?: string;
  privateKey?: string;
  keyPairs?: PQCKeyPair;
  didDocument?: DIDDocument;
  starkNetId?: StarkNetID;
  created: string;
  updated: string;
  securityLevel: "standard" | "advanced" | "quantum";
  preferences?: Record<string, any>;
  hsmInfo?: HSMInfo;
  qkdInfo?: QKDInfo;
  signatureKey?: string;
  certificates?: PKICertificate[];
  trustedIssuers?: string[];
  revocationStatus?: 'active' | 'checking' | 'revoked';
  lastRevocationCheck?: string;
}

// Contact structure
export interface Contact {
  id: string;
  displayName: string;
  name: string;
  publicKey: string;
  didDocument?: DIDDocument;
  starkNetId?: string;
  created: string;
  notes?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  signatureKey?: string;
  certificateVerified?: boolean;
  certificateStatus?: 'valid' | 'revoked' | 'expired' | 'not_verified';
  pqCertificate?: PKICertificate;
}

// Message structure
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  encryptedContent?: string;
  encryptionAlgorithm?: string;
  signature?: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  verified?: boolean;
  encrypted?: boolean;
  encryptionType?: string;
  zkProofVerified?: boolean;
  didVerified?: boolean;
  pqSignatureType?: "Falcon-1024" | "SLH-DSA-Dilithium5";
  kemType?: "ML-KEM-1024" | "Classic-RSA" | "Hybrid";
  integrityHash?: string;
  selfHealingStatus?: "verified" | "healing" | "compromised";
  webrtcSecured?: boolean;
  starkNetValidated?: boolean;
  qubicEncryption?: boolean;
}

// Conversation structure
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updated: string;
  created: string;
}

// Define severity types for threat classification
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

// Define threat interface for security monitoring
export interface Threat {
  id: string;
  severity: ThreatSeverity;
  description: string;
  timestamp: string;
  indicators: string[];
  mitigationSteps: string[];
}

// Define types for security infrastructure
export interface SecureNodeConfig {
  name: string;
  type: 'physical' | 'virtual' | 'container' | 'serverless';
  securityLevel: string;
}

export interface SecureNode {
  id: string;
  name: string;
  type: string;
  status: string;
  securityLevel: string;
  createdAt: string;
  lastUpdated: string;
  metrics: {
    uptime: number;
    requestsProcessed: number;
    securityIncidents: number;
  };
}

export interface SecureContainer {
  id: string;
  name: string;
  type: string;
  status: string;
  securityProfile: string;
  confinement: string;
  networkPolicy: string;
  resources: {
    cpu: string;
    memory: string;
    storage: string;
  };
  createdAt: string;
  expiresAt: string;
  signatures: {
    image: string;
    config: string;
  };
  verificationStatus: string;
}

export interface SecureContainerConfig {
  id: string;
  name: string;
  type: 'podman' | 'crun' | 'kata' | 'gvisor';
  securityProfile: 'standard' | 'hardened' | 'tpm-protected' | 'sgx-enclave';
  immutableRootfs: boolean;
  confinement: 'selinux' | 'apparmor' | 'seccomp' | 'none';
  networkPolicy: 'isolated' | 'service-mesh' | 'e2e-encrypted' | 'none';
  rotationPolicy?: {
    enabled: boolean;
    interval: number; // in minutes
    triggerOnAnomaly: boolean;
  };
  resources: {
    cpuLimit: string;
    memoryLimit: string;
    storageLimit: string;
  };
  verifiedBoot: boolean;
  integrityMonitoring: boolean;
  created: string;
  lastUpdated: string;
  status: 'running' | 'stopped' | 'failed' | 'compromised';
}

export interface SecurityOptions {
  timeout?: number;
  retries?: number;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  encryptionType?: string;
  mutualAuthentication?: boolean;
  certificateRotation?: boolean;
}

// Secure Service Mesh interface
export interface SecureServiceMesh {
  id: string;
  name: string;
  services: string[];
  encryptionType: string;
  mutualAuthentication: boolean;
  certificateRotation: boolean;
  trafficAnalysis: boolean;
  anomalyDetection: boolean;
  mtls: boolean;
  zkProofVerification: boolean;
  serviceDiscovery: boolean;
  created: string;
  lastUpdated: string;
}

// SecureInfraNode with hardware capabilities
export interface SecureInfraNode {
  id: string;
  name: string;
  type: 'physical' | 'virtual' | 'container' | 'serverless';
  hardwareCapabilities: {
    tpm: boolean;
    sgx: boolean;
    sev: boolean;
    nvdimm: boolean;
    secureBoot: boolean;
  };
  networkSecurity: {
    encryptionInTransit: boolean;
    firewallEnabled: boolean;
    intrusionDetection: boolean;
    ddosProtection: boolean;
  };
  complianceStatus: {
    fisma: boolean;
    fedramp: boolean;
    hipaa: boolean;
    pci: boolean;
    gdpr: boolean;
  };
  confidentialComputing: boolean;
  attestationSupport: boolean;
  patchStatus: 'up-to-date' | 'pending' | 'outdated';
  lastScan: string;
  threatLevel: 'minimal' | 'low' | 'medium' | 'high' | 'critical';
}

// AI-Secured Cloud Instance
export interface AISecuredCloudInstance {
  id: string;
  name: string;
  type: 'podman' | 'kubernetes' | 'openshift';
  quantumResistant: boolean;
  status: 'provisioning' | 'running' | 'scaling' | 'maintenance' | 'terminated';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  complianceStatus: {
    nist: boolean;
    fips: boolean;
    iso27001: boolean;
    gdpr: boolean;
    hipaa: boolean;
  };
  aiCapabilities: {
    intrusionDetection: boolean;
    anomalyDetection: boolean;
    threatPrediction: boolean;
    selfHealing: boolean;
    homomorphicEncryption: boolean;
  };
  zkAuthentication: boolean;
  starkNetVerified: boolean;
  ipfsStorage: {
    enabled: boolean;
    encryptionType: 'standard' | 'homomorphic' | 'quantum';
    capacityGB: number;
    replicationFactor: number;
  };
  containers: string[]; // IDs of SecureContainer instances
  deployedAt: string;
  lastSecurityScan: string;
  threatScore: number; // 0-100, lower is better
  autoScaling: {
    enabled: boolean;
    minInstances: number;
    maxInstances: number;
    currentInstances: number;
  };
}

// AI-Security Automation Policy
export interface AISecurityPolicy {
  id: string;
  name: string;
  description: string;
  policyType: 'detection' | 'prevention' | 'remediation' | 'compliance';
  status: 'active' | 'inactive' | 'testing';
  triggers: Array<{
    eventType: string;
    condition: string;
    threshold: number;
  }>;
  actions: Array<{
    type: 'alert' | 'block' | 'isolate' | 'remediate' | 'report';
    target: string;
    parameters: Record<string, any>;
    escalationLevel: 'low' | 'medium' | 'high' | 'critical';
  }>;
  aiEnhanced: boolean;
  selfLearning: boolean;
  complianceFrameworks: string[];
  created: string;
  updatedBy: string;
  executionStats: {
    timesExecuted: number;
    lastExecuted?: string;
    averageResponseTime: number;
    successRate: number;
  };
}

// Homomorphic Encryption Context
export interface HomomorphicEncryptionContext {
  id: string;
  scheme: 'CKKS' | 'BFV' | 'BGV' | 'TFHE';
  keySize: number;
  securityLevel: number; // in bits
  multiplicativeDepth: number;
  supportedOperations: ('addition' | 'multiplication' | 'comparison')[];
  performanceProfile: 'balanced' | 'speed' | 'security';
  createdAt: string;
  status: 'active' | 'regenerating' | 'compromised';
  publicParameters: string;
  aiOptimized: boolean;
}

// IPFS Secure Storage Configuration
export interface IPFSSecureStorage {
  id: string;
  gatewayUrl: string;
  encryptionType: 'AES-256' | 'ChaCha20-Poly1305' | 'ML-KEM-1024';
  redundancy: number;
  pinningService: string;
  aiManagedKeys: boolean;
  keyRotationInterval: number; // in days
  totalStorageGB: number;
  usedStorageGB: number;
  files: Array<{
    cid: string;
    name: string;
    size: number;
    encrypted: boolean;
    lastAccessed: string;
    permissions: string[];
    verificationHash: string;
  }>;
  accessControls: {
    allowedUsers: string[];
    allowedGroups: string[];
    publicAccessEnabled: boolean;
  };
}

// Security Health Metrics
export interface SecurityHealthMetrics {
  overallScore: number; // 0-100
  threatDetectionLatency: number; // in milliseconds
  meanTimeToRemediate: number; // in minutes
  falsePositiveRate: number; // percentage
  incidentsByCategory: Record<string, number>;
  patchComplianceRate: number; // percentage
  encryptionCoverage: number; // percentage
  aiAlertAccuracy: number; // percentage
  lastUpdated: string;
  complianceScores: Record<string, number>;
  vulnerabilitiesByRisk: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// Extended SecurityEventType to include more event types for enterprise security
export type SecurityEventType = 
  | 'authentication' 
  | 'key-usage' 
  | 'data-access' 
  | 'system-change'
  | 'network-access'
  | 'cryptographic-operation'
  | 'audit';

// Support for Podman-based isolation services
export interface PodmanSecurityConfig {
  id: string;
  name: string;
  rootless: boolean;
  selinuxEnabled: boolean;
  networkIsolation: boolean;
  encryptedStorage: boolean;
  encryptionType: 'ML-KEM-1024' | 'AES-256-GCM' | 'ChaCha20-Poly1305';
  volumes: Array<{
    name: string;
    mountPath: string;
    encrypted: boolean;
    size: string;
  }>;
  seccompProfile: 'default' | 'strict' | 'custom';
  capabilities: string[];
  cpuQuota: number;
  memoryLimit: string;
  aiSecurityMonitoring: boolean;
  created: string;
  lastUpdated: string;
}

// AI-Driven biometric security
export interface BiometricSecurityConfig {
  id: string;
  enabled: boolean;
  methods: Array<'face' | 'fingerprint' | 'voice' | 'iris' | 'behavior'>;
  requiredFactors: number;
  aiVerification: boolean;
  aiModelType: 'local' | 'secure-enclave' | 'tpm-backed';
  falseAcceptRate: number; // percentage
  falseRejectRate: number; // percentage
  antiSpoofingEnabled: boolean;
  localStorageOnly: boolean;
  encryptionType: 'ML-KEM-1024' | 'AES-256-GCM';
  lastUpdated: string;
  tpmProtected: boolean;
  offlineModeEnabled: boolean;
}

// Zero Trust AI Access Control
export interface ZeroTrustAIConfig {
  id: string;
  enabled: boolean;
  continuousVerification: boolean;
  contextBasedAccess: boolean;
  riskBasedAuthentication: boolean;
  aiThreatMonitoring: boolean;
  jitAccess: boolean; // Just-In-Time Access
  microsegmentation: boolean;
  devicesVerified: boolean;
  lastUpdated: string;
  policies: Array<{
    id: string;
    name: string;
    resources: string[];
    conditions: Record<string, any>;
    actions: 'allow' | 'deny' | 'challenge';
  }>;
  aiDecisionExplainability: boolean;
  anomalyThreshold: number; // 0-100
}

// AI-Driven P2P Sync Configuration
export interface P2PSecureSyncConfig {
  id: string;
  enabled: boolean;
  webrtcEnabled: boolean;
  encryptionType: 'ML-KEM-1024' | 'hybrid';
  signatureType: 'Falcon-1024' | 'CRYSTALS-Dilithium';
  peerDiscovery: 'local' | 'dht' | 'centralized' | 'starknet';
  maxPeers: number;
  zkVerification: boolean;
  starkNetVerified: boolean;
  syncStrategy: 'immediate' | 'scheduled' | 'intelligent';
  aiPrivacyAnalysis: boolean;
  bandwidthLimit: number; // in KB/s
  lastSynced: string;
  offlineModeEnabled: boolean;
}

// AI-Secured USB Backup Configuration
export interface SecureUSBBackupConfig {
  id: string;
  enabled: boolean;
  encryptionType: 'ML-KEM-1024' | 'AES-256-GCM';
  zkVerification: boolean;
  allowedDevices: string[];
  backupSchedule: 'manual' | 'daily' | 'weekly' | 'intelligent';
  aiVerifiedRestore: boolean;
  failsafeKeyEnabled: boolean;
  lastBackup: string;
  compressionEnabled: boolean;
  redundancyLevel: number; // 1-3
  tpmVerification: boolean;
  emergencyAccessEnabled: boolean;
}

// TPM-Based Authentication Configuration
export interface TPMAuthenticationConfig {
  id: string;
  enabled: boolean;
  tpmVersion: '1.2' | '2.0';
  biometricLinked: boolean;
  offlineAuthEnabled: boolean;
  backupKeyExists: boolean;
  starkNetRegistered: boolean;
  pcrConfiguration: number[];
  sealedKeyData: boolean;
  runtimeVerification: boolean;
  secureBootRequired: boolean;
  lastVerification: string;
  recoveryMechanismEnabled: boolean;
}

// IPFS Failover Configuration
export interface IPFSFailoverConfig {
  id: string;
  enabled: boolean;
  backupSchedule: 'hourly' | 'daily' | 'weekly' | 'intelligent';
  encryptionType: 'ML-KEM-1024' | 'AES-256-GCM';
  replicationFactor: number;
  zkVerification: boolean;
  pinningServices: string[];
  verifiedGateways: string[];
  intelligentFailover: boolean;
  lastBackup: string;
  lastFailoverTest: string;
  dataMergeStrategy: 'conservative' | 'aggressive' | 'ai-optimized';
  aiDataPrioritization: boolean;
}

// P2P Governance Configuration
export interface P2PGovernanceConfig {
  id: string;
  enabled: boolean;
  messagingEncryption: 'ML-KEM-1024' | 'hybrid';
  offlineVotingEnabled: boolean;
  zkProofVerification: boolean;
  starkNetIntegration: boolean;
  votingMechanisms: Array<'simple-majority' | 'quadratic' | 'conviction' | 'liquid'>;
  proposalThreshold: number;
  executionAutomation: boolean;
  multiSigThreshold: number;
  lastProposal: string;
  aiGovernanceAnalytics: boolean;
  permissionLevel: 'open' | 'permissioned' | 'hybrid';
}

// NEW: Local AI-Encrypted Backup Configuration
export interface LocalAIBackupConfig {
  id: string;
  enabled: boolean;
  backupSchedule: 'hourly' | 'daily' | 'weekly' | 'intelligent';
  encryptionType: 'ML-KEM-1024' | 'Falcon-1024' | 'hybrid';
  podmanEnabled: boolean;
  rootlessMode: boolean;
  tpmProtection: boolean;
  starkNetVerification: boolean;
  ipfsBackup: boolean;
  selfHealingEnabled: boolean;
  lastBackup: string;
  lastRestore: string;
  storageLocation: string;
  maxBackupSizeGB: number;
  retentionPeriodDays: number;
  autoRestartEnabled: boolean;
  biometricAuthRequired: boolean;
  offlineModeEnabled: boolean;
  zkProofVerification: boolean;
  syncStatus: 'synced' | 'syncing' | 'failed' | 'offline';
  backups: Array<{
    id: string;
    timestamp: string;
    size: number;
    files: number;
    intact: boolean;
    encrypted: boolean;
    verified: boolean;
  }>;
}

// NEW: AI Sync Status
export interface AISyncStatus {
  id: string;
  lastCloudSync: string;
  lastLocalSync: string;
  pendingUploads: number;
  pendingDownloads: number;
  syncErrors: Array<{
    timestamp: string;
    error: string;
    resolved: boolean;
  }>;
  cloudAvailable: boolean;
  localAvailable: boolean;
  p2pAvailable: boolean;
  offlineMode: boolean;
  selfHealingAttempts: number;
  lastSelfHealingAction: string;
  dataIntegrity: 'verified' | 'unverified' | 'compromised';
  zkProofsGenerated: number;
  zkProofsVerified: number;
}

// NEW: AI Cloud Connection Status
export interface AICloudConnectionStatus {
  id: string;
  connected: boolean;
  lastConnectionAttempt: string;
  connectionUptime: number; // in seconds
  failoverActivated: boolean;
  activeFailoverType: 'local' | 'p2p' | 'ipfs' | 'none';
  reconnectionAttempts: number;
  lastSuccessfulConnection: string;
  networkLatency: number; // in milliseconds
  dataTransferRate: number; // in KB/s
  currentBackupMode: 'cloud' | 'local' | 'ipfs' | 'hybrid';
  securityVerified: boolean;
  verificationMethod: 'zk-proof' | 'starknet' | 'tpm' | 'standard';
}

// NEW: Podman Container Security Status
export interface PodmanContainerStatus {
  id: string;
  containerName: string;
  running: boolean;
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  rootless: boolean;
  selinuxEnabled: boolean;
  tpmIntegrated: boolean;
  autoRestartEnabled: boolean;
  memoryUsageMB: number;
  cpuUsagePercent: number;
  uptime: number; // in seconds
  restartCount: number;
  lastRestart: string;
  vulnerabilities: Array<{
    severity: ThreatSeverity;
    description: string;
    mitigated: boolean;
  }>;
  healthStatus: 'healthy' | 'degraded' | 'unhealthy';
  encryptionEnabled: boolean;
  encryptionType: 'ML-KEM-1024' | 'AES-256-GCM' | 'hybrid';
  networkIsolation: boolean;
}

// NEW: WebRTC P2P Messaging Status
export interface WebRTCPeerStatus {
  id: string;
  peerId: string;
  connectionStatus: 'connected' | 'connecting' | 'disconnected' | 'failed';
  encryptionEnabled: boolean;
  encryptionType: 'ML-KEM-1024' | 'hybrid';
  signatureType: 'Falcon-1024' | 'SLH-DSA-Dilithium5';
  lastMessageTimestamp: string;
  dataTransferred: number; // in bytes
  latency: number; // in milliseconds
  starkNetVerified: boolean;
  localEndpoint: string;
  remoteEndpoint: string;
  zkProofVerified: boolean;
  reliabilityScore: number; // 0-100
}

// NEW: Quantum-Resistant Security Metrics
export interface QuantumSecurityMetrics {
  id: string;
  timestamp: string;
  kyberKeyExchangeCount: number;
  falconSignatureCount: number;
  zkProofGenerationCount: number;
  zkProofVerificationCount: number;
  quantumResistanceScore: number; // 0-100
  estimatedPostQuantumStrength: 'level1' | 'level3' | 'level5';
  keyRotationFrequency: number; // days
  lastKeyRotation: string;
  vulnerabilityScanTimestamp: string;
  quantumAttackSimulationResults: {
    shorAttackResistant: boolean;
    groveroAttackResistant: boolean;
    latticeCryptanalysisResistant: boolean;
    estimatedAttackCost: string;
  };
  nistComplianceLevel: 'FIPS140-2' | 'FIPS140-3' | 'FIPS205' | 'FIPS204' | 'none';
}
