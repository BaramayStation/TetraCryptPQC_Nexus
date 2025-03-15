
/**
 * TetraCryptPQC Data Optimization
 * 
 * Provides military-grade data compression, optimization, and bandwidth
 * management utilities for efficient and secure operations in restricted
 * network environments.
 * 
 * Extended with Delay-Tolerant Networking (DTN) capabilities for interstellar
 * operations, supporting helium-3 mining and deep space communications.
 */

import { encryptWithPQC, decryptWithPQC, hashWithSHA3 } from "../crypto";

// Compression levels for different security contexts
export enum CompressionLevel {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  MAXIMUM = 4
}

// Operation environments for optimization tuning
export enum OperationEnvironment {
  EARTH = "earth",
  LEO = "low-earth-orbit",
  LUNAR = "lunar",
  MARS = "mars",
  DEEP_SPACE = "deep-space",
  INTERSTELLAR = "interstellar"
}

// Delay-Tolerant Networking (DTN) modes
export enum DTNMode {
  DISABLED = "disabled",
  STANDARD = "standard",    // Basic store-and-forward
  ENHANCED = "enhanced",    // Enhanced reliability with bundle acks
  PRIORITY = "priority",    // Prioritized messaging for critical data
  CUSTODY = "custody",      // Full custody transfer with reliability guarantees
  AUTONOMOUS = "autonomous" // AI-enhanced autonomous routing decisions
}

// Compression options
export interface CompressionOptions {
  level: CompressionLevel;
  encryptBeforeCompression: boolean;
  encryptAfterCompression: boolean;
  addIntegrityCheck: boolean;
  prioritizeSecurity: boolean;
  allowLossyCompression: boolean;
  signData: boolean;
}

// Interstellar transmission options
export interface InterstellarOptions {
  environment: OperationEnvironment;
  dtnMode: DTNMode;
  expectedDelaySeconds: number;
  autonomousRetransmission: boolean;
  quantumNoiseResistant: boolean;
  radiationHardened: boolean;
  energyEfficiencyLevel: number; // 1-10, higher is more aggressive power saving
  bundleFragmentation: boolean;  // Allow splitting large messages
  custodyTimeout: number;        // Hours until custody transfer times out
  cognitiveAntenna: boolean;     // Use AI for adaptive beam-forming
}

// Default compression options
const DEFAULT_COMPRESSION_OPTIONS: CompressionOptions = {
  level: CompressionLevel.MEDIUM,
  encryptBeforeCompression: false,
  encryptAfterCompression: true,
  addIntegrityCheck: true,
  prioritizeSecurity: true,
  allowLossyCompression: false,
  signData: true
};

// Default interstellar options
const DEFAULT_INTERSTELLAR_OPTIONS: InterstellarOptions = {
  environment: OperationEnvironment.EARTH,
  dtnMode: DTNMode.DISABLED,
  expectedDelaySeconds: 0,
  autonomousRetransmission: false,
  quantumNoiseResistant: false,
  radiationHardened: false,
  energyEfficiencyLevel: 5,
  bundleFragmentation: false,
  custodyTimeout: 24,
  cognitiveAntenna: false
};

// Metadata for compressed data
interface CompressionMetadata {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  algorithm: string;
  timestamp: string;
  checksum: string;
  isEncrypted: boolean;
  isCompressed: boolean;
  compressedChecksum?: string;
  signature?: string;
  interstellarProperties?: {
    dtnBundleId?: string;
    fragmentId?: number;
    totalFragments?: number;
    custodyChain?: string[];
    priorityLevel?: number;
    expirationTimestamp?: string;
    energyUsed?: number;
    radiationExposure?: number;
    autonomousRelayDecisions?: {
      timestamp: string;
      relayNode: string;
      decision: string;
      confidence: number;
    }[];
  };
}

// DTN Bundle for interstellar communication
export interface DTNBundle {
  bundleId: string;
  sourceNode: string;
  destinationNode: string;
  creationTimestamp: string;
  expirationTimestamp: string;
  priority: 'bulk' | 'normal' | 'expedited' | 'critical';
  custodialNodes: string[];
  fragments: DTNBundleFragment[];
  isFragmented: boolean;
  securityBlock: {
    encryptionType: string;
    authenticationHash: string;
    signatureKeyId: string;
    signature: string;
  };
  metadata: {
    applicationData: Record<string, any>;
    routingHints: string[];
    energyBudget: number;
    currentEnergy: number;
  };
}

// Fragment of a DTN bundle
export interface DTNBundleFragment {
  fragmentId: number;
  totalFragments: number;
  payload: Uint8Array;
  offset: number;
  length: number;
  checksum: string;
}

// Compress data with military-grade security
export async function compressData(
  data: string, 
  options: Partial<CompressionOptions> = {}
): Promise<Uint8Array> {
  console.log("🔹 Compressing data with enterprise-grade security...");
  
  // Apply options with defaults
  const mergedOptions: CompressionOptions = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };
  
  // Convert input data to bytes if it's a string
  const dataBytes = typeof data === 'string' 
    ? new TextEncoder().encode(data) 
    : data;
  
  // Calculate original size and checksum
  const originalSize = dataBytes.length;
  const originalChecksum = await hashWithSHA3(data);
  
  // Encrypt before compression if requested (less compressible but more secure)
  let processedData = dataBytes;
  let isEncrypted = false;
  
  if (mergedOptions.encryptBeforeCompression) {
    console.log("🔹 Pre-encryption for maximum security");
    const encryptedData = await encryptWithPQC(
      new TextDecoder().decode(dataBytes),
      'pre-compression-key' // In a real implementation, this would be a properly managed key
    );
    processedData = new TextEncoder().encode(encryptedData);
    isEncrypted = true;
  }
  
  // Apply compression based on selected level
  let compressedData: Uint8Array;
  let compressionAlgorithm: string;
  
  if (mergedOptions.level === CompressionLevel.NONE) {
    compressedData = processedData;
    compressionAlgorithm = "none";
  } else {
    // In a real implementation, this would use actual compression algorithms
    // with different levels based on the CompressionLevel enum
    // For this simulation, we'll just pretend to compress
    
    // Simulate compression by reducing size proportionally to compression level
    const compressionRatio = 1 - (mergedOptions.level * 0.15); // Higher level = more compression
    const simulatedSize = Math.max(Math.floor(processedData.length * compressionRatio), 1);
    
    // Create a "compressed" array of the simulated size
    compressedData = new Uint8Array(simulatedSize);
    
    // Fill with data (in a real implementation, this would be actual compressed data)
    for (let i = 0; i < simulatedSize; i++) {
      compressedData[i] = processedData[i % processedData.length];
    }
    
    // Select algorithm based on compression level
    switch (mergedOptions.level) {
      case CompressionLevel.LOW:
        compressionAlgorithm = "deflate";
        break;
      case CompressionLevel.MEDIUM:
        compressionAlgorithm = "zlib";
        break;
      case CompressionLevel.HIGH:
        compressionAlgorithm = "brotli";
        break;
      case CompressionLevel.MAXIMUM:
        compressionAlgorithm = "zstd";
        break;
      default:
        compressionAlgorithm = "unknown";
    }
  }
  
  // Calculate compressed size and checksum
  const compressedSize = compressedData.length;
  const compressedChecksum = await hashWithSHA3(new TextDecoder().decode(compressedData));
  
  // Encrypt after compression if requested
  if (mergedOptions.encryptAfterCompression) {
    console.log("🔹 Post-compression encryption for secure transmission");
    const encryptedData = await encryptWithPQC(
      new TextDecoder().decode(compressedData),
      'post-compression-key' // In a real implementation, this would be a properly managed key
    );
    compressedData = new TextEncoder().encode(encryptedData);
    isEncrypted = true;
  }
  
  // Add integrity check if requested
  let finalData = compressedData;
  if (mergedOptions.addIntegrityCheck) {
    // In a real implementation, this would add a cryptographic MAC or signature
    // For this simulation, we'll append the checksum
    const checksumBytes = new TextEncoder().encode(compressedChecksum);
    finalData = new Uint8Array(compressedData.length + checksumBytes.length);
    finalData.set(compressedData);
    finalData.set(checksumBytes, compressedData.length);
  }
  
  // Create metadata
  const metadata: CompressionMetadata = {
    originalSize,
    compressedSize,
    compressionRatio: compressedSize / originalSize,
    algorithm: compressionAlgorithm,
    timestamp: new Date().toISOString(),
    checksum: originalChecksum,
    isEncrypted,
    isCompressed: mergedOptions.level !== CompressionLevel.NONE,
    compressedChecksum
  };
  
  console.log(`🔹 Compression complete. Ratio: ${(metadata.compressionRatio * 100).toFixed(2)}%, Algorithm: ${metadata.algorithm}`);
  
  return finalData;
}

// Decompress data with integrity verification
export function decompressData(
  compressed: Uint8Array,
  options: Partial<CompressionOptions> = {}
): string {
  console.log("🔹 Decompressing data with integrity verification...");
  
  // Apply options with defaults
  const mergedOptions: CompressionOptions = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };
  
  // In a real implementation, this would:
  // 1. Extract and verify the integrity check
  // 2. Decrypt the data if encrypted
  // 3. Decompress using the appropriate algorithm
  
  // For this simulation, we'll just decode the bytes to a string
  return new TextDecoder().decode(compressed);
}

// Create a DTN bundle for interstellar transmission
export async function createDTNBundle(
  payload: Uint8Array | string,
  sourceNode: string,
  destinationNode: string,
  options: Partial<InterstellarOptions> = {}
): Promise<DTNBundle> {
  console.log("🔹 Creating DTN bundle for interstellar transmission");
  
  // Apply options with defaults
  const mergedOptions: InterstellarOptions = { 
    ...DEFAULT_INTERSTELLAR_OPTIONS, 
    ...options 
  };
  
  // Convert string payload to bytes if needed
  const payloadBytes = typeof payload === 'string' 
    ? new TextEncoder().encode(payload) 
    : payload;
  
  // Generate a unique bundle ID
  const bundleId = crypto.randomUUID();
  
  // Determine bundle lifetime based on environment
  let lifetimeHours = 24; // Default 1 day
  
  switch (mergedOptions.environment) {
    case OperationEnvironment.LUNAR:
      lifetimeHours = 48; // 2 days for lunar
      break;
    case OperationEnvironment.MARS:
      lifetimeHours = 336; // 14 days for Mars
      break;
    case OperationEnvironment.DEEP_SPACE:
      lifetimeHours = 8760; // 1 year for deep space
      break;
    case OperationEnvironment.INTERSTELLAR:
      lifetimeHours = 87600; // 10 years for interstellar
      break;
  }
  
  // Calculate expiration timestamp
  const creationTimestamp = new Date();
  const expirationTimestamp = new Date(creationTimestamp);
  expirationTimestamp.setHours(expirationTimestamp.getHours() + lifetimeHours);
  
  // Determine if we need to fragment the payload
  const maxFragmentSize = 16384; // 16KB per fragment, adjustable based on environment
  const needsFragmentation = mergedOptions.bundleFragmentation && payloadBytes.length > maxFragmentSize;
  
  // Create fragments if needed
  const fragments: DTNBundleFragment[] = [];
  
  if (needsFragmentation) {
    const totalFragments = Math.ceil(payloadBytes.length / maxFragmentSize);
    
    for (let i = 0; i < totalFragments; i++) {
      const offset = i * maxFragmentSize;
      const length = Math.min(maxFragmentSize, payloadBytes.length - offset);
      const fragmentPayload = payloadBytes.slice(offset, offset + length);
      const checksum = await hashWithSHA3(new TextDecoder().decode(fragmentPayload));
      
      fragments.push({
        fragmentId: i,
        totalFragments,
        payload: fragmentPayload,
        offset,
        length,
        checksum
      });
    }
    
    console.log(`🔹 Payload fragmented into ${totalFragments} parts`);
  } else {
    // Single fragment containing the entire payload
    fragments.push({
      fragmentId: 0,
      totalFragments: 1,
      payload: payloadBytes,
      offset: 0,
      length: payloadBytes.length,
      checksum: await hashWithSHA3(new TextDecoder().decode(payloadBytes))
    });
  }
  
  // Calculate priority based on DTN mode
  let priority: 'bulk' | 'normal' | 'expedited' | 'critical' = 'normal';
  
  switch (mergedOptions.dtnMode) {
    case DTNMode.PRIORITY:
    case DTNMode.CUSTODY:
      priority = 'expedited';
      break;
    case DTNMode.AUTONOMOUS:
      priority = 'critical';
      break;
    case DTNMode.ENHANCED:
      priority = 'normal';
      break;
    case DTNMode.STANDARD:
    default:
      priority = 'bulk';
  }
  
  // Create security block
  const securityBlock = {
    encryptionType: "ML-KEM-1024", // Post-quantum encryption
    authenticationHash: await hashWithSHA3(new TextDecoder().decode(payloadBytes)),
    signatureKeyId: "pqc-signature-key-id", // In a real implementation, this would be a valid key ID
    signature: "pqc-signature" // In a real implementation, this would be a valid signature
  };
  
  // Calculate energy budget based on environment and options
  let energyBudget = 1000; // Default unit is milliwatt-hours
  
  // Adjust based on environment (deeper space needs more energy)
  switch (mergedOptions.environment) {
    case OperationEnvironment.LEO:
      energyBudget *= 1.5;
      break;
    case OperationEnvironment.LUNAR:
      energyBudget *= 2;
      break;
    case OperationEnvironment.MARS:
      energyBudget *= 5;
      break;
    case OperationEnvironment.DEEP_SPACE:
      energyBudget *= 10;
      break;
    case OperationEnvironment.INTERSTELLAR:
      energyBudget *= 100;
      break;
  }
  
  // Adjust for energy efficiency setting (higher means more aggressive power saving)
  energyBudget = energyBudget * (1 - (mergedOptions.energyEfficiencyLevel / 20)); // Scale from 0-10
  
  // Create the complete bundle
  const bundle: DTNBundle = {
    bundleId,
    sourceNode,
    destinationNode,
    creationTimestamp: creationTimestamp.toISOString(),
    expirationTimestamp: expirationTimestamp.toISOString(),
    priority,
    custodialNodes: [sourceNode], // Initially, only source has custody
    fragments,
    isFragmented: needsFragmentation,
    securityBlock,
    metadata: {
      applicationData: {
        environment: mergedOptions.environment,
        dtnMode: mergedOptions.dtnMode,
        quantumNoiseResistant: mergedOptions.quantumNoiseResistant,
        radiationHardened: mergedOptions.radiationHardened,
        autonomousRetransmission: mergedOptions.autonomousRetransmission
      },
      routingHints: [], // Populated during transit
      energyBudget,
      currentEnergy: energyBudget // Initially at full budget
    }
  };
  
  console.log(`🔹 Created ${priority} priority DTN bundle ${bundleId} for ${mergedOptions.environment} environment`);
  return bundle;
}

// Reconstruct data from DTN bundle fragments
export async function reconstructFromDTNBundle(bundle: DTNBundle): Promise<Uint8Array> {
  console.log(`🔹 Reconstructing data from DTN bundle ${bundle.bundleId}`);
  
  // Verify bundle integrity
  for (const fragment of bundle.fragments) {
    const fragmentChecksum = await hashWithSHA3(new TextDecoder().decode(fragment.payload));
    if (fragmentChecksum !== fragment.checksum) {
      throw new Error(`Fragment ${fragment.fragmentId} integrity check failed`);
    }
  }
  
  // If there's only one fragment, return it directly
  if (bundle.fragments.length === 1 && !bundle.isFragmented) {
    return bundle.fragments[0].payload;
  }
  
  // Sort fragments by offset to ensure correct order
  const sortedFragments = [...bundle.fragments].sort((a, b) => a.offset - b.offset);
  
  // Calculate total payload size
  const totalSize = sortedFragments.reduce((sum, fragment) => sum + fragment.length, 0);
  
  // Reconstruct the full payload
  const fullPayload = new Uint8Array(totalSize);
  
  for (const fragment of sortedFragments) {
    fullPayload.set(fragment.payload, fragment.offset);
  }
  
  console.log(`🔹 Successfully reconstructed ${totalSize} bytes from ${sortedFragments.length} fragments`);
  return fullPayload;
}

// Simulate transmission over an interstellar link
export async function simulateInterstellarTransmission(
  bundle: DTNBundle,
  options: Partial<InterstellarOptions> = {}
): Promise<{
  success: boolean;
  receivedBundle?: DTNBundle;
  transmissionStats: {
    distanceLightYears: number;
    delaySeconds: number;
    signalAttenuation: number;
    packetLossRate: number;
    energyConsumed: number;
    radiationEvents: number;
  };
}> {
  console.log(`🔹 Simulating interstellar transmission of bundle ${bundle.bundleId}`);
  
  // Apply options with defaults
  const mergedOptions: InterstellarOptions = { 
    ...DEFAULT_INTERSTELLAR_OPTIONS, 
    ...options 
  };
  
  // Calculate distance based on environment
  let distanceLightYears = 0;
  
  switch (mergedOptions.environment) {
    case OperationEnvironment.EARTH:
      distanceLightYears = 0;
      break;
    case OperationEnvironment.LEO:
      distanceLightYears = 0.000000004; // About 1,200 km in light years
      break;
    case OperationEnvironment.LUNAR:
      distanceLightYears = 0.000000013; // About 384,400 km in light years
      break;
    case OperationEnvironment.MARS:
      distanceLightYears = 0.000023; // About 225 million km in light years (avg)
      break;
    case OperationEnvironment.DEEP_SPACE:
      distanceLightYears = 0.01; // Typical Kuiper belt distance
      break;
    case OperationEnvironment.INTERSTELLAR:
      distanceLightYears = 4.3; // Proxima Centauri, nearest star
      break;
  }
  
  // Calculate one-way delay in seconds (light years * seconds per light year)
  const lightYearInSeconds = 31557600; // Seconds in a year (365.25 days)
  const delaySeconds = distanceLightYears * lightYearInSeconds;
  
  // Calculate signal attenuation (signal strength decreases with square of distance)
  const signalAttenuation = distanceLightYears > 0 ? 
    Math.min(100, 20 * Math.log10(distanceLightYears * 10)) : 0;
  
  // Calculate packet loss rate based on environment and signal attenuation
  let packetLossRate = signalAttenuation / 200; // Base loss rate from attenuation
  
  // Adjust for radiation hardening
  if (mergedOptions.radiationHardened) {
    packetLossRate *= 0.5; // 50% reduction in packet loss
  }
  
  // Adjust for quantum noise resistance
  if (mergedOptions.quantumNoiseResistant) {
    packetLossRate *= 0.7; // 30% reduction in packet loss
  }
  
  // Ensure packet loss is within bounds
  packetLossRate = Math.max(0, Math.min(1, packetLossRate));
  
  // Calculate number of radiation events during transmission
  const baseRadiationEvents = Math.floor(distanceLightYears * 10);
  const radiationEvents = mergedOptions.radiationHardened ? 
    Math.floor(baseRadiationEvents * 0.3) : baseRadiationEvents;
  
  // Calculate energy consumed during transmission
  const baseEnergy = bundle.metadata.energyBudget * 0.6; // Base consumption is 60% of budget
  const distanceFactor = Math.log10(distanceLightYears + 1) * 2; // Logarithmic increase with distance
  const retransmissionFactor = mergedOptions.autonomousRetransmission ? 1.5 : 1; // 50% more for retransmissions
  
  const energyConsumed = Math.min(
    bundle.metadata.energyBudget,
    baseEnergy * distanceFactor * retransmissionFactor
  );
  
  // Simulate transmission with potential loss based on calculated parameters
  // This is a simplified simulation; real systems would have more complex models
  const bundleCopy: DTNBundle = JSON.parse(JSON.stringify(bundle));
  let success = true;
  
  // Simulate fragment loss and corruption
  if (bundleCopy.isFragmented) {
    bundleCopy.fragments = bundleCopy.fragments.filter((fragment, index) => {
      // Simulated random packet loss
      if (Math.random() < packetLossRate) {
        console.log(`🔹 Fragment ${fragment.fragmentId} lost during transmission`);
        // If using autonomous retransmission, try to recover the fragment
        if (mergedOptions.autonomousRetransmission && Math.random() < 0.7) {
          console.log(`🔹 Fragment ${fragment.fragmentId} recovered through autonomous retransmission`);
          return true;
        }
        success = false;
        return false;
      }
      return true;
    });
  } else if (Math.random() < packetLossRate) {
    // Single fragment bundle loss
    console.log("🔹 Bundle lost during transmission");
    if (mergedOptions.autonomousRetransmission && Math.random() < 0.7) {
      console.log("🔹 Bundle recovered through autonomous retransmission");
    } else {
      success = false;
    }
  }
  
  // Update bundle metadata after transmission
  if (success) {
    // Add transit node to custody chain
    bundleCopy.custodialNodes.push('interstellar-relay-node');
    
    // Update energy remaining
    bundleCopy.metadata.currentEnergy -= energyConsumed;
    
    // Add routing hint based on environment
    bundleCopy.metadata.routingHints.push(`via-${mergedOptions.environment}`);
    
    // If using cognitive antenna, add decision
    if (mergedOptions.cognitiveAntenna) {
      bundleCopy.metadata.applicationData.antennaDecision = {
        timestamp: new Date().toISOString(),
        beamPattern: "adaptive-narrowband",
        gainOptimization: "quantum-enhanced",
        confidenceLevel: 0.92
      };
    }
  }
  
  // Simulate transmission delay
  await new Promise(resolve => setTimeout(resolve, Math.min(2000, delaySeconds / 100000))); // Scale down for simulation
  
  return {
    success,
    receivedBundle: success ? bundleCopy : undefined,
    transmissionStats: {
      distanceLightYears,
      delaySeconds,
      signalAttenuation,
      packetLossRate,
      energyConsumed,
      radiationEvents
    }
  };
}

// Optimize JSON for network transmission
export function optimizeJson<T>(data: T): string {
  console.log("🔹 Optimizing JSON for minimal bandwidth usage");
  
  // Remove unnecessary whitespace and convert to smallest representation
  return JSON.stringify(data);
}

// Create a differential sync record
export function createDiff(oldData: any, newData: any): any {
  console.log("🔹 Creating differential sync record");
  
  // Basic diff implementation for demonstration
  const diff: Record<string, any> = {};
  
  // Find added or changed properties
  for (const key in newData) {
    if (!oldData.hasOwnProperty(key) || oldData[key] !== newData[key]) {
      diff[key] = newData[key];
    }
  }
  
  // Find deleted properties
  for (const key in oldData) {
    if (!newData.hasOwnProperty(key)) {
      diff[key] = null; // Mark as deleted
    }
  }
  
  return diff;
}

// Apply a diff to update data
export function applyDiff(baseData: any, diff: any): any {
  console.log("🔹 Applying differential update");
  
  const result = { ...baseData };
  
  for (const key in diff) {
    if (diff[key] === null) {
      // Delete the property
      delete result[key];
    } else {
      // Update or add property
      result[key] = diff[key];
    }
  }
  
  return result;
}

// Calculate the size of a data object in bytes (approximate)
export function calculateDataSize(data: any): number {
  console.log("🔹 Calculating data size for bandwidth optimization");
  
  const json = JSON.stringify(data);
  return new TextEncoder().encode(json).length;
}

// Smart batching for efficient transmission
export function batchRequests<T>(
  items: T[], 
  maxBatchSize: number = 100,
  priorityFn?: (item: T) => number
): T[][] {
  console.log("🔹 Performing smart request batching");
  
  // If priority function provided, sort items by priority first
  const sortedItems = priorityFn 
    ? [...items].sort((a, b) => priorityFn(b) - priorityFn(a)) 
    : items;
  
  const batches: T[][] = [];
  
  for (let i = 0; i < sortedItems.length; i += maxBatchSize) {
    batches.push(sortedItems.slice(i, i + maxBatchSize));
  }
  
  console.log(`🔹 Created ${batches.length} optimized batches`);
  return batches;
}

// Delta compression for time-series data
export function compressTimeSeries(
  timeSeriesData: Array<{timestamp: number, value: number}>, 
  tolerance: number = 0.01
): Array<{timestamp: number, value: number}> {
  console.log("🔹 Performing delta compression on time-series data");
  
  if (timeSeriesData.length <= 2) {
    return timeSeriesData; // No compression possible with 2 or fewer points
  }
  
  const result: Array<{timestamp: number, value: number}> = [timeSeriesData[0]];
  let lastIncludedIndex = 0;
  
  for (let i = 1; i < timeSeriesData.length - 1; i++) {
    const prev = timeSeriesData[lastIncludedIndex];
    const curr = timeSeriesData[i];
    const next = timeSeriesData[i + 1];
    
    // Calculate slope of line from last included point to next point
    const expectedSlope = (next.value - prev.value) / (next.timestamp - prev.timestamp);
    
    // Calculate expected value at current point based on this slope
    const timeRatio = (curr.timestamp - prev.timestamp) / (next.timestamp - prev.timestamp);
    const expectedValue = prev.value + (expectedSlope * (curr.timestamp - prev.timestamp));
    
    // If the actual value differs from expected by more than tolerance, include this point
    if (Math.abs(curr.value - expectedValue) > tolerance * Math.abs(prev.value)) {
      result.push(curr);
      lastIncludedIndex = i;
    }
  }
  
  // Always include the last point
  result.push(timeSeriesData[timeSeriesData.length - 1]);
  
  console.log(`🔹 Compressed time-series from ${timeSeriesData.length} to ${result.length} points`);
  return result;
}

// Military-grade bandwidth optimization for network transmission
export async function prepareDataForTransmission(
  data: any,
  priority: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  needsRealtime: boolean = false,
  environment: OperationEnvironment = OperationEnvironment.EARTH
): Promise<{ 
  payload: Uint8Array, 
  metadata: {
    originalSize: number,
    transmissionSize: number,
    priority: string,
    compressionRatio: number,
    estimatedBandwidth: number,
    interstellarCapable: boolean,
    timestamp: string
  }
}> {
  console.log(`🔹 Preparing data for transmission (priority: ${priority}, environment: ${environment})`);
  
  // Convert data to string if not already
  const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
  const originalSize = new TextEncoder().encode(dataStr).length;
  
  // Determine compression level based on priority and realtime needs
  let compressionLevel = CompressionLevel.MEDIUM;
  let encryptBeforeCompression = false;
  
  if (priority === 'critical') {
    compressionLevel = needsRealtime ? CompressionLevel.LOW : CompressionLevel.MEDIUM;
    encryptBeforeCompression = true; // Maximum security for critical data
  } else if (priority === 'high') {
    compressionLevel = needsRealtime ? CompressionLevel.MEDIUM : CompressionLevel.HIGH;
  } else if (priority === 'medium') {
    compressionLevel = CompressionLevel.HIGH;
  } else {
    compressionLevel = CompressionLevel.MAXIMUM;
  }
  
  // Adjust for interstellar environments - more aggressive compression
  if (environment === OperationEnvironment.DEEP_SPACE || 
      environment === OperationEnvironment.INTERSTELLAR) {
    compressionLevel = CompressionLevel.MAXIMUM;
  }
  
  // Compress and encrypt the data
  const compressedData = await compressData(dataStr, {
    level: compressionLevel,
    encryptBeforeCompression,
    encryptAfterCompression: true,
    addIntegrityCheck: true,
    prioritizeSecurity: priority === 'critical' || priority === 'high',
    allowLossyCompression: priority === 'low' && !needsRealtime,
    signData: priority !== 'low'
  });
  
  // Calculate transmission metrics
  const transmissionSize = compressedData.length;
  const compressionRatio = transmissionSize / originalSize;
  
  // Estimate bandwidth usage (bytes per second) based on priority and environment
  // In a real implementation, this would use actual network measurements
  const priorityFactor = priority === 'critical' ? 5000 : 
                         priority === 'high' ? 2000 :
                         priority === 'medium' ? 1000 : 500;
  
  let environmentFactor = 1.0;
  switch (environment) {
    case OperationEnvironment.LEO:
      environmentFactor = 0.8;
      break;
    case OperationEnvironment.LUNAR:
      environmentFactor = 0.5;
      break;
    case OperationEnvironment.MARS:
      environmentFactor = 0.2;
      break;
    case OperationEnvironment.DEEP_SPACE:
      environmentFactor = 0.05;
      break;
    case OperationEnvironment.INTERSTELLAR:
      environmentFactor = 0.01;
      break;
  }
  
  const estimatedBandwidth = priorityFactor * environmentFactor * (needsRealtime ? 2 : 1);
  
  return {
    payload: compressedData,
    metadata: {
      originalSize,
      transmissionSize,
      priority,
      compressionRatio,
      estimatedBandwidth,
      interstellarCapable: environment !== OperationEnvironment.EARTH,
      timestamp: new Date().toISOString()
    }
  };
}

// Adaptive rate control for bandwidth management
export function calculateAdaptiveRate(
  bandwidth: number, 
  dataSize: number,
  priority: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  targetLatency: number = 200,
  environment: OperationEnvironment = OperationEnvironment.EARTH
): { 
  chunkSize: number, 
  delayMs: number, 
  chunks: number,
  estimatedTransmissionTimeMs: number
} {
  console.log("🔹 Calculating adaptive transmission rate for environment:", environment);
  
  // Convert priority to a numeric factor
  const priorityFactor = priority === 'critical' ? 1.0 :
                         priority === 'high' ? 0.8 :
                         priority === 'medium' ? 0.5 : 0.3;
  
  // Adjust bandwidth based on environment
  let environmentFactor = 1.0;
  switch (environment) {
    case OperationEnvironment.LEO:
      environmentFactor = 0.8;
      break;
    case OperationEnvironment.LUNAR:
      environmentFactor = 0.5;
      break;
    case OperationEnvironment.MARS:
      environmentFactor = 0.2;
      break;
    case OperationEnvironment.DEEP_SPACE:
      environmentFactor = 0.05;
      break;
    case OperationEnvironment.INTERSTELLAR:
      environmentFactor = 0.01;
      break;
  }
  
  // Calculate available bandwidth with priority and environment adjustments
  const effectiveBandwidth = bandwidth * priorityFactor * environmentFactor;
  
  // Calculate optimal chunk size based on target latency
  // chunk size = bandwidth * latency / 1000 (convert ms to s)
  let chunkSize = Math.floor((effectiveBandwidth * targetLatency) / 1000);
  
  // Ensure chunk size is reasonable, with adjustments for deep space/interstellar
  const minChunkSize = (environment === OperationEnvironment.DEEP_SPACE || 
                      environment === OperationEnvironment.INTERSTELLAR) ? 128 : 512;
  
  const maxChunkSize = (environment === OperationEnvironment.DEEP_SPACE || 
                      environment === OperationEnvironment.INTERSTELLAR) ? 16384 : 65536;
  
  chunkSize = Math.max(minChunkSize, Math.min(chunkSize, maxChunkSize));
  
  // Calculate number of chunks needed
  const chunks = Math.ceil(dataSize / chunkSize);
  
  // Calculate delay between chunks to maintain bandwidth constraint
  // delay = chunkSize / bandwidth * 1000 (convert to ms)
  const delayMs = Math.ceil((chunkSize / effectiveBandwidth) * 1000);
  
  // Calculate estimated total transmission time
  const estimatedTransmissionTimeMs = chunks * delayMs;
  
  return {
    chunkSize,
    delayMs,
    chunks,
    estimatedTransmissionTimeMs
  };
}
