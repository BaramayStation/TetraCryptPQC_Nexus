
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
  created: string;  // Ensure created property exists
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
  // Import dynamically to avoid circular dependencies
  const { scanForThreats: scanForThreatsImpl } = await import('./pqcrypto');
  return scanForThreatsImpl(data);
}

/**
 * Generate compliance report
 */
export async function generateComplianceReport(): Promise<any> {
  console.log("🔹 Core crypto generateComplianceReport called - Forwarding to pqcrypto module");
  // Import dynamically to avoid circular dependencies
  const { generateComplianceReport: generateComplianceReportImpl } = await import('./pqcrypto');
  return generateComplianceReportImpl();
}

/**
 * Export the missing functions needed by components
 */
export async function encryptAES(message: string, key: string): Promise<string> {
  console.log("🔹 Core crypto encryptAES called - Forwarding to pqcrypto module");
  const { encryptMessage } = await import('./pqcrypto');
  return encryptMessage(message, key);
}

export async function signMessage(message: string, privateKey: string): Promise<string> {
  console.log("🔹 Core crypto signMessage called - Forwarding to pqcrypto module");
  const { signMessage: signMessageImpl } = await import('./pqcrypto');
  return signMessageImpl(message, privateKey);
}

export async function generateSessionKey(): Promise<string> {
  console.log("🔹 Core crypto generateSessionKey called - Forwarding to pqcrypto module");
  const { generateSessionKey: generateSessionKeyImpl } = await import('./pqcrypto');
  return generateSessionKeyImpl();
}

export async function generateDID(publicKeyKem: string, publicKeySig: string): Promise<any> {
  console.log("🔹 Core crypto generateDID called - Forwarding to pqcrypto module");
  const { generateDID: generateDIDImpl } = await import('./pqcrypto');
  return generateDIDImpl(publicKeyKem, publicKeySig);
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
