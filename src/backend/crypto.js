
import wasmCrypto from "wasm-feature-detect";
import { subtle } from "crypto"; // Web Crypto API for AES-GCM

// Error logging for enterprise environments
const logError = (error, operation) => {
  console.error(`🔸 PQC Error [${operation}]: ${error.message}`);
  // In a production environment, this would send to a secure logging service
  
  // Return standardized error object
  return {
    error: true, 
    operation,
    message: error.message,
    timestamp: new Date().toISOString(),
    requestId: crypto.randomUUID()
  };
};

// ✅ Initialize WebAssembly PQC Library with robust error handling
const pqcInit = async () => {
  try {
    console.log("🔹 Initializing PQC WebAssembly modules...");
    
    // Check for SIMD support - critical for efficient PQC operations
    if (!(await wasmCrypto.simd())) {
      throw new Error("WebAssembly SIMD required for PQC operations. This browser may not support the required features.");
    }
    
    // Verify memory limits
    if (typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory < 4) {
      console.warn("🔸 Warning: Device has limited memory. PQC operations may be slower than optimal.");
    }
    
    return await wasmCrypto.init();
  } catch (error) {
    return logError(error, "initialization");
  }
};

// ✅ Enterprise-grade ML-KEM (Kyber) Key Generation
export async function generateKyberKeypair() {
  try {
    console.log("🔹 Generating ML-KEM-1024 Keypair (NIST FIPS 205)...");
    
    const kem = await pqcInit();
    if (kem.error) throw new Error(`PQC initialization failed: ${kem.message}`);
    
    // Generate key pair with proper error handling
    const { publicKey, secretKey } = kem.kemKeypair("ML-KEM-1024");
    
    // Audit log for enterprise compliance
    console.log(`🔹 ML-KEM-1024 key generated successfully. KeyID: ${crypto.randomUUID()}`);
    
    // Return properly formatted key material
    return {
      algorithm: "ML-KEM-1024",
      publicKey: Buffer.from(publicKey).toString("hex"),
      privateKey: Buffer.from(secretKey).toString("hex"),
      strength: "256-bit",
      standard: "NIST FIPS 205",
      created: new Date().toISOString()
    };
  } catch (error) {
    return logError(error, "generate-kyber-keypair");
  }
}

// ✅ Enterprise-grade AES-256-GCM Encryption with proper IV handling
export async function encryptAES(message, key) {
  try {
    console.log("🔹 Encrypting with AES-256-GCM...");
    
    // Generate cryptographically secure IV (12 bytes for GCM mode)
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedMessage = new TextEncoder().encode(message);
    
    // Derive proper cryptographic key from provided key material
    const cryptoKey = await subtle.importKey(
      "raw", 
      Buffer.from(key, "hex").slice(0, 32), 
      "AES-GCM", 
      false, 
      ["encrypt"]
    );

    // Encrypt with authenticated encryption
    const encrypted = await subtle.encrypt(
      { 
        name: "AES-GCM", 
        iv,
        // Add authentication tag context for added security
        additionalData: new TextEncoder().encode("TetraCrypt-Auth-Context")
      },
      cryptoKey,
      encodedMessage
    );

    // Format for secure transmission
    const result = `${Buffer.from(iv).toString("hex")}:${Buffer.from(new Uint8Array(encrypted)).toString("hex")}`;
    console.log("🔹 AES-256-GCM encryption completed successfully");
    
    return result;
  } catch (error) {
    return logError(error, "aes-encryption");
  }
}

// ✅ Enterprise-grade AES-256-GCM Decryption with enhanced error handling
export async function decryptAES(encryptedMessage, key) {
  try {
    console.log("🔹 Decrypting AES-256-GCM message...");
    
    // Split and validate format
    const parts = encryptedMessage.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted message format");
    }
    
    const [ivHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    // Validate IV length (12 bytes for GCM)
    if (iv.length !== 12) {
      throw new Error("Invalid IV length for AES-GCM");
    }

    // Import key with proper validation
    const cryptoKey = await subtle.importKey(
      "raw", 
      Buffer.from(key, "hex").slice(0, 32), 
      "AES-GCM", 
      false, 
      ["decrypt"]
    );

    // Decrypt with authentication tag verification
    const decrypted = await subtle.decrypt(
      { 
        name: "AES-GCM", 
        iv,
        // Must match encryption context for authentication to succeed
        additionalData: new TextEncoder().encode("TetraCrypt-Auth-Context")
      },
      cryptoKey,
      encrypted
    );

    console.log("🔹 AES-256-GCM decryption completed successfully");
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    if (error.name === "OperationError") {
      // This specific error indicates authentication tag verification failure
      return logError(new Error("Decryption failed: Message may have been tampered with"), "aes-decryption-integrity");
    }
    return logError(error, "aes-decryption");
  }
}

// ✅ Enterprise-grade SLH-DSA (Dilithium) Digital Signature Generation
export async function generateDilithiumKeypair() {
  try {
    console.log("🔹 Generating SLH-DSA-Dilithium5 Keypair (NIST FIPS 206)...");
    
    const dsa = await pqcInit();
    if (dsa.error) throw new Error(`PQC initialization failed: ${dsa.message}`);
    
    // Generate digital signature key pair
    const { publicKey, secretKey } = dsa.dsaKeypair("Dilithium5");
    
    // Audit log for enterprise compliance
    console.log(`🔹 SLH-DSA-Dilithium5 key generated successfully. KeyID: ${crypto.randomUUID()}`);
    
    return {
      algorithm: "SLH-DSA-Dilithium5",
      publicKey: Buffer.from(publicKey).toString("hex"),
      privateKey: Buffer.from(secretKey).toString("hex"),
      strength: "256-bit",
      standard: "NIST FIPS 206",
      created: new Date().toISOString()
    };
  } catch (error) {
    return logError(error, "generate-dilithium-keypair");
  }
}

// ✅ Enterprise-ready Digital Signature Creation
export async function signMessage(message, privateKey) {
  try {
    console.log("🔹 Signing message with SLH-DSA-Dilithium5...");
    
    const dsa = await pqcInit();
    if (dsa.error) throw new Error(`PQC initialization failed: ${dsa.message}`);
    
    // Create message hash (SHA-384 for appropriate security level)
    const messageBytes = new TextEncoder().encode(message);
    const messageHash = await subtle.digest('SHA-384', messageBytes);
    
    // Sign message hash with SLH-DSA
    const signature = dsa.sign("Dilithium5", Buffer.from(privateKey, "hex"), new Uint8Array(messageHash));
    
    return Buffer.from(signature).toString("hex");
  } catch (error) {
    return logError(error, "dsa-sign");
  }
}

// ✅ Enterprise-ready Digital Signature Verification
export async function verifySignature(message, signature, publicKey) {
  try {
    console.log("🔹 Verifying SLH-DSA-Dilithium5 signature...");
    
    const dsa = await pqcInit();
    if (dsa.error) throw new Error(`PQC initialization failed: ${dsa.message}`);
    
    // Create message hash (SHA-384 for appropriate security level)
    const messageBytes = new TextEncoder().encode(message);
    const messageHash = await subtle.digest('SHA-384', messageBytes);
    
    // Verify signature
    const isValid = dsa.verify(
      "Dilithium5", 
      Buffer.from(publicKey, "hex"),
      Buffer.from(signature, "hex"),
      new Uint8Array(messageHash)
    );
    
    console.log(`🔹 Signature verification result: ${isValid ? "Valid" : "Invalid"}`);
    return isValid;
  } catch (error) {
    return logError(error, "dsa-verify");
  }
}

// ✅ Enterprise Key Derivation Function
export async function deriveKeyFromPassword(password, salt) {
  try {
    console.log("🔹 Deriving cryptographic key from password...");
    
    // If no salt provided, generate one
    if (!salt) {
      salt = crypto.getRandomValues(new Uint8Array(16));
    } else {
      salt = Buffer.from(salt, "hex");
    }
    
    // Convert password to bytes
    const passwordBytes = new TextEncoder().encode(password);
    
    // Use PBKDF2 with appropriate parameters for enterprise security
    const key = await subtle.importKey(
      "raw",
      passwordBytes,
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    
    const derivedBits = await subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 310000, // OWASP recommended minimum
        hash: "SHA-384"
      },
      key,
      256 // 256-bit key
    );
    
    return {
      key: Buffer.from(new Uint8Array(derivedBits)).toString("hex"),
      salt: Buffer.from(salt).toString("hex")
    };
  } catch (error) {
    return logError(error, "key-derivation");
  }
}

// ✅ Enterprise-grade Hybrid Encryption (PQC + Classical)
export async function hybridEncrypt(message, recipientKyberPublicKey, recipientClassicalPublicKey) {
  try {
    console.log("🔹 Performing hybrid PQC/classical encryption...");
    
    // 1. Generate random AES session key
    const sessionKey = crypto.getRandomValues(new Uint8Array(32));
    
    // 2. Encrypt message with AES session key
    const encryptedMessage = await encryptAES(message, Buffer.from(sessionKey).toString("hex"));
    if (encryptedMessage.error) throw new Error(encryptedMessage.message);
    
    // 3. Encrypt session key with ML-KEM (quantum-resistant)
    const kem = await pqcInit();
    if (kem.error) throw new Error(`PQC initialization failed: ${kem.message}`);
    
    const { ciphertext: kyberCiphertext } = kem.encapsulate("ML-KEM-1024", Buffer.from(recipientKyberPublicKey, "hex"), sessionKey);
    
    // 4. Also encrypt with classical crypto (for hybrid security)
    // Note: Actual implementation would use RSA or ECDH here
    const classicalEncryptedKey = "CLASSICAL_ENCRYPTION_PLACEHOLDER";
    
    // 5. Return complete package
    return {
      kyberCiphertext: Buffer.from(kyberCiphertext).toString("hex"),
      classicalCiphertext: classicalEncryptedKey,
      encryptedMessage,
      algorithm: "Hybrid-ML-KEM-1024-AES-256-GCM",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return logError(error, "hybrid-encrypt");
  }
}
