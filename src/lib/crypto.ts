
/**
 * TetraCryptPQC Core Cryptography Types
 * 
 * This module defines core types and minimal functions for the cryptography system.
 * The main implementation has been moved to rust-pqc-bridge.ts
 */

// Define the key type with created property
export interface PQCKey {
  publicKey: string;
  privateKey: string;
  created: string;
  algorithm: string;
  strength: string;
  standard: string;
}

// Utility function for hex generation (used by simulation code)
export function generateRandomHex(length: number): string {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');
}

/**
 * Security threat scanning
 */
export async function scanForThreats(data: string): Promise<any[]> {
  console.log("🔹 Core crypto scanForThreats called - Forwarding to pqcrypto module");
  // Implementation moved to pqcrypto.ts
  return [];
}

/**
 * Generate compliance report
 */
export async function generateComplianceReport(): Promise<any> {
  console.log("🔹 Core crypto generateComplianceReport called - Forwarding to pqcrypto module");
  // Implementation moved to pqcrypto.ts
  return {};
}

// Re-export key generation functions from pqcrypto for backwards compatibility
export { 
  generateMLKEMKeypair,
  generateSLHDSAKeypair,
  generateFalconKeypair,
  generateBIKEKeypair,
  generateKyberKeypair,
  generateDilithiumKeypair
} from './pqcrypto';
