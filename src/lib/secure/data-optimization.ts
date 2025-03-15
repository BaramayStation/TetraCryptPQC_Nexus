
/**
 * TetraCryptPQC Data Optimization
 * 
 * Provides data compression and optimization utilities for
 * efficient bandwidth usage in underground networks.
 */

// Simulate compression with a basic algorithm
// In a real implementation, you would use proper compression libraries
export function compressData(data: string): Uint8Array {
  // Simple data compression simulation
  console.log("🔹 Compressing data...");
  const encoded = new TextEncoder().encode(data);
  return encoded;
}

export function decompressData(compressed: Uint8Array): string {
  // Simple data decompression simulation
  console.log("🔹 Decompressing data...");
  return new TextDecoder().decode(compressed);
}

// Optimize JSON for network transmission
export function optimizeJson<T>(data: T): string {
  // Remove unnecessary whitespace and convert to smallest representation
  return JSON.stringify(data);
}

// Differential sync: only send changes
export function createDiff(oldData: any, newData: any): any {
  // Very basic diff implementation for demonstration
  // In a real implementation, use a proper diffing library
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
  const json = JSON.stringify(data);
  return new TextEncoder().encode(json).length;
}

// Smart batching for efficient transmission
export function batchRequests<T>(items: T[], maxBatchSize: number = 100): T[][] {
  const batches: T[][] = [];
  
  for (let i = 0; i < items.length; i += maxBatchSize) {
    batches.push(items.slice(i, i + maxBatchSize));
  }
  
  return batches;
}
