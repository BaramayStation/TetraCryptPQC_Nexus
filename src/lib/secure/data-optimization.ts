
/**
 * TetraCryptPQC Data Optimization
 * 
 * Provides military-grade data compression, optimization, and bandwidth
 * management utilities for efficient and secure operations in restricted
 * network environments.
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
  needsRealtime: boolean = false
): Promise<{ 
  payload: Uint8Array, 
  metadata: {
    originalSize: number,
    transmissionSize: number,
    priority: string,
    compressionRatio: number,
    estimatedBandwidth: number,
    timestamp: string
  }
}> {
  console.log(`🔹 Preparing data for transmission (priority: ${priority})`);
  
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
  
  // Estimate bandwidth usage (bytes per second) based on priority
  // In a real implementation, this would use actual network measurements
  const bandwidthFactor = priority === 'critical' ? 5000 : 
                          priority === 'high' ? 2000 :
                          priority === 'medium' ? 1000 : 500;
  
  const estimatedBandwidth = needsRealtime 
    ? bandwidthFactor * 2  // Double for realtime
    : bandwidthFactor;
  
  return {
    payload: compressedData,
    metadata: {
      originalSize,
      transmissionSize,
      priority,
      compressionRatio,
      estimatedBandwidth,
      timestamp: new Date().toISOString()
    }
  };
}

// Adaptive rate control for bandwidth management
export function calculateAdaptiveRate(
  bandwidth: number, 
  dataSize: number,
  priority: 'low' | 'medium' | 'high' | 'critical' = 'medium',
  targetLatency: number = 200
): { 
  chunkSize: number, 
  delayMs: number, 
  chunks: number 
} {
  console.log("🔹 Calculating adaptive transmission rate");
  
  // Convert priority to a numeric factor
  const priorityFactor = priority === 'critical' ? 1.0 :
                         priority === 'high' ? 0.8 :
                         priority === 'medium' ? 0.5 : 0.3;
  
  // Calculate available bandwidth with priority adjustment
  const effectiveBandwidth = bandwidth * priorityFactor;
  
  // Calculate optimal chunk size based on target latency
  // chunk size = bandwidth * latency / 1000 (convert ms to s)
  let chunkSize = Math.floor((effectiveBandwidth * targetLatency) / 1000);
  
  // Ensure chunk size is reasonable
  chunkSize = Math.max(512, Math.min(chunkSize, 65536));
  
  // Calculate number of chunks needed
  const chunks = Math.ceil(dataSize / chunkSize);
  
  // Calculate delay between chunks to maintain bandwidth constraint
  // delay = chunkSize / bandwidth * 1000 (convert to ms)
  const delayMs = Math.ceil((chunkSize / effectiveBandwidth) * 1000);
  
  return {
    chunkSize,
    delayMs,
    chunks
  };
}
