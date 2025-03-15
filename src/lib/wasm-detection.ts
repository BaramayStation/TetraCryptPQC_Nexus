
/**
 * WebAssembly Feature Detection Utilities
 * 
 * This module provides functions to detect WebAssembly features
 * available in the current browser environment.
 */

import { 
  simd,
  bulkMemory,
  exceptions,
  tailCall,
  threads,
  reference_types
} from 'wasm-feature-detect';

/**
 * Detects all supported WebAssembly features
 */
export async function detectWasmFeatures() {
  const features = {
    simd: await simd(),
    bulkMemory: await bulkMemory(),
    exceptions: await exceptions(),
    tailCall: await tailCall(),
    threads: await threads(),
    referenceTypes: await reference_types()
  };
  
  return features;
}

/**
 * Check if the browser has minimum required WebAssembly features
 * for PQC operations
 */
export async function checkWasmSupport() {
  const features = await detectWasmFeatures();
  
  // For PQC, we ideally want SIMD support
  const isOptimal = features.simd;
  
  // But we can still function without it
  const isSupported = true;
  
  return {
    isSupported,
    isOptimal,
    features
  };
}

/**
 * Log WebAssembly feature support to console
 */
export async function logWasmSupport() {
  const support = await checkWasmSupport();
  console.log("🔹 WebAssembly Feature Detection:");
  console.table(support.features);
  
  if (!support.isOptimal) {
    console.warn("🔸 WebAssembly SIMD not available. PQC operations may be slower than optimal.");
  }
  
  return support;
}
