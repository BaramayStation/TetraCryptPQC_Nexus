
/**
 * Core utilities for post-quantum cryptography operations
 */

/**
 * Generate a random bytestring of specified length
 */
export function generateRandomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Convert Uint8Array to hex string
 */
export function toHexString(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a cryptographically secure pseudorandom number
 */
export function generateSecureRandom(min: number = 0, max: number = 1): number {
  const randomBytes = generateRandomBytes(4);
  // Convert bytes to 32-bit integer
  const randomInt = new DataView(randomBytes.buffer).getUint32(0, true);
  // Scale to [min, max)
  return min + (randomInt / 0xFFFFFFFF) * (max - min);
}
