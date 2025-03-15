
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
 * Convert hex string to Uint8Array
 */
export function fromHexString(hexString: string): Uint8Array {
  const matches = hexString.match(/.{1,2}/g);
  return new Uint8Array(matches ? matches.map(byte => parseInt(byte, 16)) : []);
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

/**
 * Hash data using SHA-3 (SHAKE-256)
 */
export async function hashWithSHA3(data: string | Uint8Array): Promise<string> {
  // In a real implementation, this would use the actual SHAKE-256 algorithm
  console.log("🔹 Hashing with SHA-3 (SHAKE-256)");
  
  let dataBuffer: Uint8Array;
  
  if (typeof data === 'string') {
    const encoder = new TextEncoder();
    dataBuffer = encoder.encode(data);
  } else {
    dataBuffer = data;
  }
  
  // For demonstration, use a placeholder SHA-3 implementation with Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * ML-KEM Key Encapsulation (encapsulate)
 */
export async function encapsulateKey(publicKey: string): Promise<{
  ciphertext: string;
  sharedSecret: string;
}> {
  console.log("🔹 ML-KEM encapsulation with public key:", publicKey.substring(0, 16) + "...");
  
  // For demonstration, simulate ML-KEM encapsulation
  // 1. Generate random bytes for the shared secret
  const sharedSecretBytes = generateRandomBytes(32);
  
  // 2. Use the public key to encapsulate the shared secret
  // In a real implementation, this would use the actual ML-KEM algorithm
  const publicKeyBytes = fromHexString(publicKey);
  
  // 3. Create ciphertext by "encrypting" the shared secret with the public key
  // In this demo, just XOR the first bytes of the public key with the shared secret
  const ciphertextBytes = new Uint8Array(32);
  for (let i = 0; i < Math.min(32, publicKeyBytes.length); i++) {
    ciphertextBytes[i] = sharedSecretBytes[i] ^ publicKeyBytes[i % publicKeyBytes.length];
  }
  
  return {
    ciphertext: toHexString(ciphertextBytes),
    sharedSecret: toHexString(sharedSecretBytes)
  };
}

/**
 * ML-KEM Key Encapsulation (decapsulate)
 */
export async function decapsulateKey(ciphertext: string, privateKey: string): Promise<string> {
  console.log("🔹 ML-KEM decapsulation with private key:", privateKey.substring(0, 16) + "...");
  
  // For demonstration, simulate ML-KEM decapsulation
  // 1. Convert the ciphertext and private key to byte arrays
  const ciphertextBytes = fromHexString(ciphertext);
  const privateKeyBytes = fromHexString(privateKey);
  
  // 2. Use the private key to recover the shared secret
  // In a real implementation, this would use the actual ML-KEM algorithm
  // In this demo, just XOR the first bytes of the private key with the ciphertext
  const sharedSecretBytes = new Uint8Array(32);
  for (let i = 0; i < Math.min(32, privateKeyBytes.length); i++) {
    sharedSecretBytes[i] = ciphertextBytes[i] ^ privateKeyBytes[i % privateKeyBytes.length];
  }
  
  return toHexString(sharedSecretBytes);
}

/**
 * Sign data using SLH-DSA (Dilithium)
 */
export async function signData(data: string, privateKey: string): Promise<string> {
  console.log("🔹 SLH-DSA signing with private key:", privateKey.substring(0, 16) + "...");
  
  // For demonstration, simulate SLH-DSA signature
  // 1. Hash the data
  const dataHash = await hashWithSHA3(data);
  
  // 2. Use the private key to "sign" the hash
  // In a real implementation, this would use the actual SLH-DSA algorithm
  const privateKeyBytes = fromHexString(privateKey);
  const dataHashBytes = fromHexString(dataHash);
  
  // 3. Create a signature by combining the private key and data hash
  // In this demo, just append the first 16 bytes of the private key to the hash
  const signatureBytes = new Uint8Array(dataHashBytes.length + 16);
  signatureBytes.set(dataHashBytes);
  signatureBytes.set(privateKeyBytes.slice(0, 16), dataHashBytes.length);
  
  return toHexString(signatureBytes);
}

/**
 * Verify a signature using SLH-DSA (Dilithium)
 */
export async function verifySignature(data: string, signature: string, publicKey: string): Promise<boolean> {
  console.log("🔹 SLH-DSA signature verification with public key:", publicKey.substring(0, 16) + "...");
  
  // For demonstration, simulate SLH-DSA verification
  // 1. Hash the data
  const dataHash = await hashWithSHA3(data);
  
  // 2. Extract the hash from the signature
  // In a real implementation, this would use the actual SLH-DSA algorithm
  const signatureBytes = fromHexString(signature);
  const signatureHash = toHexString(signatureBytes.slice(0, signatureBytes.length - 16));
  
  // 3. Verify that the signature hash matches the data hash
  return signatureHash === dataHash;
}

/**
 * Derive key using post-quantum KDF (SHAKE-256)
 */
export async function deriveKey(seed: string, salt: string, length: number = 32): Promise<string> {
  // For demonstration, simulate PQC-KDF (SHAKE-256)
  console.log("🔹 Key derivation with SHAKE-256");
  
  const combinedInput = seed + salt;
  const hash = await hashWithSHA3(combinedInput);
  return hash.substring(0, length * 2); // 2 hex chars per byte
}

/**
 * Encrypt data with a symmetric key using post-quantum AES-like encryption
 */
export async function symmetricEncrypt(data: string, key: string): Promise<string> {
  console.log("🔹 Symmetric encryption with key:", key.substring(0, 16) + "...");
  
  // For demonstration, simulate symmetric encryption
  // 1. Convert data to byte array
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(data);
  
  // 2. Use the key to "encrypt" the data
  // In a real implementation, this would use AES-256-GCM or a post-quantum symmetric cipher
  const keyBytes = fromHexString(key);
  
  // 3. Create ciphertext by XORing with the key (simple demonstration only)
  const ciphertextBytes = new Uint8Array(dataBytes.length);
  for (let i = 0; i < dataBytes.length; i++) {
    ciphertextBytes[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  
  // 4. Create a nonce (for a real implementation)
  const nonce = generateRandomBytes(12);
  
  // 5. Combine nonce and ciphertext
  const result = new Uint8Array(nonce.length + ciphertextBytes.length);
  result.set(nonce);
  result.set(ciphertextBytes, nonce.length);
  
  return toHexString(result);
}

/**
 * Decrypt data with a symmetric key
 */
export async function symmetricDecrypt(encryptedData: string, key: string): Promise<string> {
  console.log("🔹 Symmetric decryption with key:", key.substring(0, 16) + "...");
  
  // For demonstration, simulate symmetric decryption
  // 1. Convert encrypted data to byte array
  const encryptedBytes = fromHexString(encryptedData);
  
  // 2. Extract nonce and ciphertext
  const nonce = encryptedBytes.slice(0, 12);
  const ciphertextBytes = encryptedBytes.slice(12);
  
  // 3. Use the key to "decrypt" the data
  // In a real implementation, this would use AES-256-GCM or a post-quantum symmetric cipher
  const keyBytes = fromHexString(key);
  
  // 4. Decrypt by XORing with the key (simple demonstration only)
  const plaintextBytes = new Uint8Array(ciphertextBytes.length);
  for (let i = 0; i < ciphertextBytes.length; i++) {
    plaintextBytes[i] = ciphertextBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  
  // 5. Convert back to string
  const decoder = new TextDecoder();
  return decoder.decode(plaintextBytes);
}

// Constants for PQC algorithms
export const PQC = {
  ALGORITHM: {
    ML_KEM_512: "ML-KEM-512",
    ML_KEM_768: "ML-KEM-768",
    ML_KEM_1024: "ML-KEM-1024",
    SLH_DSA_DILITHIUM2: "SLH-DSA-Dilithium2",
    SLH_DSA_DILITHIUM3: "SLH-DSA-Dilithium3",
    SLH_DSA_DILITHIUM5: "SLH-DSA-Dilithium5",
    FALCON_512: "FALCON-512",
    FALCON_1024: "FALCON-1024",
    SPHINCS_PLUS: "SPHINCS+",
    BIKE_L1: "BIKE-L1",
    BIKE_L3: "BIKE-L3",
    BIKE_L5: "BIKE-L5",
  },
  
  SECURITY_LEVEL: {
    L1: "128-bit quantum security",
    L3: "192-bit quantum security",
    L5: "256-bit quantum security"
  },
  
  STANDARD: {
    FIPS_205: "NIST FIPS 205",
    FIPS_206: "NIST FIPS 206",
    NIST_ROUND_4: "NIST Round 4 Alternate"
  }
};

// For delay-tolerant networking simulation
export interface DTNMessage {
  id: string;
  data: string;
  encrypted: boolean;
  sender: string;
  recipient: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  signature?: string;
  ttl: number; // Time to live in seconds
  hops: number; // Number of relay points the message has passed through
  status: 'sending' | 'in-transit' | 'delivered' | 'failed';
  delay?: number; // Simulated transmission delay in milliseconds
}

// Queue for storing DTN messages for delayed delivery
export const dtnMessageQueue: DTNMessage[] = [];

// Function to simulate DTN message transmission with delay
export function sendDTNMessage(message: DTNMessage): Promise<string> {
  console.log(`🔹 Sending DTN message with ${message.delay}ms delay`);
  
  // Add to queue
  dtnMessageQueue.push(message);
  
  // Return promise that resolves after the delay
  return new Promise((resolve) => {
    setTimeout(() => {
      message.status = 'delivered';
      resolve(message.id);
    }, message.delay || 1000);
  });
}
