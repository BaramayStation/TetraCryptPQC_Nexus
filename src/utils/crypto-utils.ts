
/**
 * Cryptographic utility functions for the TetraCryptPQC framework
 */

/**
 * Generates a random ID string
 * @returns A random ID string
 */
export function generateRandomId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const length = 10 + Math.floor(Math.random() * 10); // Random length between 10-20 chars
  
  // Create a Uint8Array with random values
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  // Map the random values to characters
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
}

/**
 * Converts a hexadecimal string to a Uint8Array
 * @param hex Hexadecimal string
 * @returns Uint8Array representation
 */
export function hexToBytes(hex: string): Uint8Array {
  if (hex.startsWith('0x')) {
    hex = hex.substring(2);
  }
  
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  
  return bytes;
}

/**
 * Converts a Uint8Array to a hexadecimal string
 * @param bytes Uint8Array
 * @returns Hexadecimal string representation
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Creates a random Uint8Array of the specified length
 * @param length Length of the array
 * @returns Random Uint8Array
 */
export function randomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}
