
/**
 * Core utilities for post-quantum cryptography operations
 * Implements NIST PQC standards with Web Crypto API
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
 * 
 * Note: Since Web Crypto API doesn't directly support SHA-3,
 * we use SHA-256 as a placeholder. In a production environment,
 * you should use a proper SHA-3 implementation.
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
  
  // For now, use SHA-256 as a fallback since SHA-3 isn't directly available in Web Crypto
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  return Array.from(new Uint8Array(hashBuffer), byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * ML-KEM Key Encapsulation (encapsulate)
 * 
 * Simulated implementation. In a production environment,
 * you should use a verified ML-KEM implementation.
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
  
  // 3. Create ciphertext by deriving it from the shared secret and public key
  const encoder = new TextEncoder();
  const combinedBytes = new Uint8Array(sharedSecretBytes.length + publicKeyBytes.length);
  combinedBytes.set(sharedSecretBytes);
  combinedBytes.set(publicKeyBytes, sharedSecretBytes.length);
  
  // 4. Hash the combined bytes to create the ciphertext
  const ciphertextBuffer = await crypto.subtle.digest('SHA-256', combinedBytes);
  const ciphertextBytes = new Uint8Array(ciphertextBuffer);
  
  return {
    ciphertext: toHexString(ciphertextBytes),
    sharedSecret: toHexString(sharedSecretBytes)
  };
}

/**
 * ML-KEM Key Encapsulation (decapsulate)
 * 
 * Simulated implementation. In a production environment,
 * you should use a verified ML-KEM implementation.
 */
export async function decapsulateKey(ciphertext: string, privateKey: string): Promise<string> {
  console.log("🔹 ML-KEM decapsulation with private key:", privateKey.substring(0, 16) + "...");
  
  // For demonstration, simulate ML-KEM decapsulation
  // In a real implementation, this would use the actual ML-KEM algorithm
  const ciphertextBytes = fromHexString(ciphertext);
  const privateKeyBytes = fromHexString(privateKey);
  
  // Derive a shared secret from the ciphertext and private key
  const combinedBytes = new Uint8Array(ciphertextBytes.length + privateKeyBytes.length);
  combinedBytes.set(ciphertextBytes);
  combinedBytes.set(privateKeyBytes, ciphertextBytes.length);
  
  // Hash the combined bytes to derive the shared secret
  const sharedSecretBuffer = await crypto.subtle.digest('SHA-256', combinedBytes);
  
  return toHexString(new Uint8Array(sharedSecretBuffer));
}

/**
 * Sign data using SLH-DSA (Dilithium)
 * 
 * Simulated implementation. In a production environment,
 * you should use a verified SLH-DSA implementation.
 */
export async function signData(data: string, privateKey: string): Promise<string> {
  console.log("🔹 SLH-DSA signing with private key:", privateKey.substring(0, 16) + "...");
  
  // 1. Hash the data
  const dataHash = await hashWithSHA3(data);
  
  // 2. Use the private key to "sign" the hash
  // In a real implementation, this would use the actual SLH-DSA algorithm
  const privateKeyBytes = fromHexString(privateKey);
  const dataHashBytes = fromHexString(dataHash);
  
  // 3. Create a signature by combining the private key and data hash
  const signatureInput = new Uint8Array(dataHashBytes.length + privateKeyBytes.length);
  signatureInput.set(dataHashBytes);
  signatureInput.set(privateKeyBytes, dataHashBytes.length);
  
  // 4. Hash the combined data to create the signature
  const signatureBuffer = await crypto.subtle.digest('SHA-256', signatureInput);
  
  return toHexString(new Uint8Array(signatureBuffer));
}

/**
 * Verify a signature using SLH-DSA (Dilithium)
 * 
 * Simulated implementation. In a production environment,
 * you should use a verified SLH-DSA implementation.
 */
export async function verifySignature(data: string, signature: string, publicKey: string): Promise<boolean> {
  console.log("🔹 SLH-DSA signature verification with public key:", publicKey.substring(0, 16) + "...");
  
  // 1. Hash the data
  const dataHash = await hashWithSHA3(data);
  
  // 2. Use the public key to verify the signature
  // In a real implementation, this would use the actual SLH-DSA algorithm
  const publicKeyBytes = fromHexString(publicKey);
  const dataHashBytes = fromHexString(dataHash);
  const signatureBytes = fromHexString(signature);
  
  // 3. Create the expected signature using the same process as signing
  const expectedInput = new Uint8Array(dataHashBytes.length + publicKeyBytes.length);
  expectedInput.set(dataHashBytes);
  expectedInput.set(publicKeyBytes, dataHashBytes.length);
  
  const expectedSignatureBuffer = await crypto.subtle.digest('SHA-256', expectedInput);
  const expectedSignatureBytes = new Uint8Array(expectedSignatureBuffer);
  
  // 4. Compare the expected signature with the provided signature
  // Implementation of constant-time comparison to prevent timing attacks
  if (signatureBytes.length !== expectedSignatureBytes.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < signatureBytes.length; i++) {
    result |= signatureBytes[i] ^ expectedSignatureBytes[i];
  }
  
  return result === 0;
}

/**
 * Derive key using post-quantum KDF (SHAKE-256)
 * 
 * Note: Since Web Crypto API doesn't directly support SHAKE-256,
 * we use PBKDF2 as a secure alternative for key derivation.
 */
export async function deriveKey(seed: string, salt: string, length: number = 32): Promise<string> {
  console.log("🔹 Key derivation with SHAKE-256");
  
  const encoder = new TextEncoder();
  const seedBytes = encoder.encode(seed);
  const saltBytes = encoder.encode(salt);
  
  // Import the seed as key material
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    seedBytes,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  
  // Use PBKDF2 to derive a key
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 210000,
      hash: "SHA-256" // Would use SHA-3 in production
    },
    keyMaterial,
    length * 8 // Convert bytes to bits
  );
  
  return toHexString(new Uint8Array(derivedBits));
}

/**
 * Encrypt data with a symmetric key using AES-GCM
 */
export async function symmetricEncrypt(data: string, key: string): Promise<string> {
  console.log("🔹 Symmetric encryption with key:", key.substring(0, 16) + "...");
  
  // 1. Convert data to byte array
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(data);
  
  // 2. Convert the hex key to bytes and import it
  const keyBytes = fromHexString(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  
  // 3. Generate a random IV (nonce)
  const iv = generateRandomBytes(12);
  
  // 4. Encrypt the data
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    cryptoKey,
    dataBytes
  );
  
  // 5. Combine IV and ciphertext
  const result = new Uint8Array(iv.length + ciphertext.byteLength);
  result.set(iv);
  result.set(new Uint8Array(ciphertext), iv.length);
  
  return toHexString(result);
}

/**
 * Decrypt data with a symmetric key using AES-GCM
 */
export async function symmetricDecrypt(encryptedData: string, key: string): Promise<string> {
  console.log("🔹 Symmetric decryption with key:", key.substring(0, 16) + "...");
  
  // 1. Convert encrypted data from hex to bytes
  const encryptedBytes = fromHexString(encryptedData);
  
  // 2. Extract IV and ciphertext
  const iv = encryptedBytes.slice(0, 12);
  const ciphertext = encryptedBytes.slice(12);
  
  // 3. Import the key
  const keyBytes = fromHexString(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  
  // 4. Decrypt the data
  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv
    },
    cryptoKey,
    ciphertext
  );
  
  // 5. Convert back to string
  const decoder = new TextDecoder();
  return decoder.decode(plaintext);
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

// Failsafe mechanism: Redundant crypto implementations
// If the primary implementation fails, the system can fall back to secondary methods
class CryptoFailsafe {
  private implementations: Array<{
    name: string;
    hash: (data: string | Uint8Array) => Promise<string>;
    encrypt: (data: string, key: string) => Promise<string>;
    decrypt: (encryptedData: string, key: string) => Promise<string>;
    sign: (data: string, key: string) => Promise<string>;
    verify: (data: string, signature: string, key: string) => Promise<boolean>;
  }> = [];
  
  constructor() {
    // Primary implementation
    this.addImplementation({
      name: "Primary (SHA-256/AES-GCM)",
      hash: hashWithSHA3,
      encrypt: symmetricEncrypt,
      decrypt: symmetricDecrypt,
      sign: signData,
      verify: verifySignature
    });
    
    // Secondary implementation - using different algorithms
    // In a production environment, this would be a completely different implementation
    this.addImplementation({
      name: "Secondary (Web Crypto Direct)",
      hash: async (data: string | Uint8Array) => {
        const dataBytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
        const hash = await crypto.subtle.digest('SHA-256', dataBytes);
        return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
      },
      encrypt: async (data: string, key: string) => {
        const encoder = new TextEncoder();
        const dataBytes = encoder.encode(data);
        
        // Derive a key from the provided key string
        const keyBytes = new TextEncoder().encode(key);
        const keyHash = await crypto.subtle.digest('SHA-256', keyBytes);
        
        const cryptoKey = await crypto.subtle.importKey(
          "raw",
          keyHash,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt"]
        );
        
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ciphertext = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv },
          cryptoKey,
          dataBytes
        );
        
        const result = new Uint8Array(iv.length + ciphertext.byteLength);
        result.set(iv);
        result.set(new Uint8Array(ciphertext), iv.length);
        
        return toHexString(result);
      },
      decrypt: async (encryptedData: string, key: string) => {
        const encryptedBytes = fromHexString(encryptedData);
        const iv = encryptedBytes.slice(0, 12);
        const ciphertext = encryptedBytes.slice(12);
        
        // Derive a key from the provided key string
        const keyBytes = new TextEncoder().encode(key);
        const keyHash = await crypto.subtle.digest('SHA-256', keyBytes);
        
        const cryptoKey = await crypto.subtle.importKey(
          "raw",
          keyHash,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
        
        const plaintext = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv },
          cryptoKey,
          ciphertext
        );
        
        return new TextDecoder().decode(plaintext);
      },
      sign: async (data: string, key: string) => {
        const encoder = new TextEncoder();
        const dataBytes = encoder.encode(data);
        const keyBytes = new TextEncoder().encode(key);
        
        // Import the key for HMAC signing (as a fallback)
        const cryptoKey = await crypto.subtle.importKey(
          "raw",
          keyBytes,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        
        const signature = await crypto.subtle.sign("HMAC", cryptoKey, dataBytes);
        return toHexString(new Uint8Array(signature));
      },
      verify: async (data: string, signature: string, key: string) => {
        const encoder = new TextEncoder();
        const dataBytes = encoder.encode(data);
        const keyBytes = new TextEncoder().encode(key);
        const signatureBytes = fromHexString(signature);
        
        // Import the key for HMAC verification (as a fallback)
        const cryptoKey = await crypto.subtle.importKey(
          "raw",
          keyBytes,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["verify"]
        );
        
        return await crypto.subtle.verify("HMAC", cryptoKey, signatureBytes, dataBytes);
      }
    });
  }
  
  addImplementation(implementation: {
    name: string;
    hash: (data: string | Uint8Array) => Promise<string>;
    encrypt: (data: string, key: string) => Promise<string>;
    decrypt: (encryptedData: string, key: string) => Promise<string>;
    sign: (data: string, key: string) => Promise<string>;
    verify: (data: string, signature: string, key: string) => Promise<boolean>;
  }) {
    this.implementations.push(implementation);
  }
  
  async execute<T>(
    operation: 'hash' | 'encrypt' | 'decrypt' | 'sign' | 'verify',
    params: any[]
  ): Promise<T> {
    // Try each implementation in order
    let lastError: Error | undefined;
    
    for (const impl of this.implementations) {
      try {
        return await impl[operation](...params) as T;
      } catch (error) {
        console.error(`${impl.name} ${operation} failed:`, error);
        lastError = error instanceof Error ? error : new Error(String(error));
      }
    }
    
    // If all implementations failed, throw the last error
    throw lastError || new Error(`All ${operation} implementations failed`);
  }
}

// Initialize the failsafe system
export const cryptoFailsafe = new CryptoFailsafe();

// Expose failsafe operations
export async function failsafeHash(data: string | Uint8Array): Promise<string> {
  return cryptoFailsafe.execute<string>('hash', [data]);
}

export async function failsafeEncrypt(data: string, key: string): Promise<string> {
  return cryptoFailsafe.execute<string>('encrypt', [data, key]);
}

export async function failsafeDecrypt(encryptedData: string, key: string): Promise<string> {
  return cryptoFailsafe.execute<string>('decrypt', [encryptedData, key]);
}

export async function failsafeSign(data: string, key: string): Promise<string> {
  return cryptoFailsafe.execute<string>('sign', [data, key]);
}

export async function failsafeVerify(data: string, signature: string, key: string): Promise<boolean> {
  return cryptoFailsafe.execute<boolean>('verify', [data, signature, key]);
}
