
/**
 * WebAssembly Feature Detection Utilities
 * 
 * This module provides functions to detect WebAssembly features
 * available in the current browser environment.
 */

/**
 * Checks if WebAssembly is supported in the current environment
 */
export async function isWasmSupported(): Promise<boolean> {
  return typeof WebAssembly === 'object' && 
         typeof WebAssembly.compile === 'function' &&
         typeof WebAssembly.instantiate === 'function';
}

/**
 * Detects support for WebAssembly SIMD instructions
 */
export async function detectSimdSupport(): Promise<boolean> {
  try {
    // Test for SIMD by attempting to compile a module that uses SIMD instructions
    const simdTest = new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x05, 0x01, 0x60,
      0x00, 0x01, 0x7b, 0x03, 0x02, 0x01, 0x00, 0x07, 0x08, 0x01, 0x04, 0x74,
      0x65, 0x73, 0x74, 0x00, 0x00, 0x0a, 0x0a, 0x01, 0x08, 0x00, 0xfd, 0x0f,
      0x00, 0x00, 0x00, 0x00, 0x0b
    ]);
    
    await WebAssembly.compile(simdTest);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Detects support for WebAssembly threads
 */
export async function detectThreadsSupport(): Promise<boolean> {
  try {
    // Feature detection for SharedArrayBuffer which is needed for threads
    return typeof SharedArrayBuffer === 'function';
  } catch (e) {
    return false;
  }
}

/**
 * Detects support for WebAssembly bulk memory operations
 */
export async function detectBulkMemorySupport(): Promise<boolean> {
  try {
    // Test for bulk memory by attempting to compile a module that uses bulk memory instructions
    const bulkMemoryTest = new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x04, 0x01, 0x60,
      0x00, 0x00, 0x03, 0x02, 0x01, 0x00, 0x05, 0x03, 0x01, 0x00, 0x01, 0x0a,
      0x07, 0x01, 0x05, 0x00, 0xfc, 0x08, 0x00, 0x00, 0x0b
    ]);
    
    await WebAssembly.compile(bulkMemoryTest);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Detects all supported WebAssembly features
 */
export async function detectWasmFeatures() {
  const isSupported = await isWasmSupported();
  
  if (!isSupported) {
    return {
      supported: false,
      simd: false,
      threads: false,
      bulkMemory: false
    };
  }
  
  const features = {
    supported: true,
    simd: await detectSimdSupport(),
    threads: await detectThreadsSupport(),
    bulkMemory: await detectBulkMemorySupport()
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
  
  // Basic WebAssembly support is required
  const isSupported = features.supported;
  
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
  
  if (!support.isSupported) {
    console.warn("❌ WebAssembly is not supported in this environment. PQC operations cannot function.");
  } else if (!support.isOptimal) {
    console.warn("🔸 WebAssembly SIMD not available. PQC operations may be slower than optimal.");
  }
  
  return support;
}
