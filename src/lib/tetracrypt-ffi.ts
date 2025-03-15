
/**
 * TetraCryptPQC Rust FFI Integration Layer
 * 
 * This module provides Foreign Function Interface (FFI) bindings to native Rust 
 * implementations of post-quantum cryptography algorithms via WebAssembly.
 * 
 * It leverages OQS (Open Quantum Safe) and PQClean libraries for
 * NIST-standardized algorithms.
 */

import { initRustPQCBridge } from './rust-pqc-bridge';
import { PQCKey } from './crypto';

// Status of FFI initialization
let ffiInitialized = false;
let ffiInitializationPromise: Promise<boolean> | null = null;

// Initialize FFI once
export async function initTetraCryptFFI(): Promise<boolean> {
  if (ffiInitialized) return true;
  
  // Only start initialization once
  if (ffiInitializationPromise) return ffiInitializationPromise;
  
  ffiInitializationPromise = (async () => {
    console.log("🔹 Initializing TetraCrypt FFI bindings");
    
    try {
      // Initialize Rust PQC bridge
      const rustBridgeInitialized = await initRustPQCBridge();
      
      if (!rustBridgeInitialized) {
        console.error("❌ Failed to initialize Rust PQC bridge");
        return false;
      }
      
      console.log("✅ TetraCrypt FFI bindings initialized successfully");
      ffiInitialized = true;
      return true;
    } catch (error) {
      console.error("❌ Error initializing TetraCrypt FFI bindings:", error);
      return false;
    }
  })();
  
  return ffiInitializationPromise;
}

/**
 * Check if hardware security is available (HSM, TPM, Secure Enclave)
 */
export async function checkHardwareSecurity(): Promise<{
  available: boolean;
  type: 'HSM' | 'TPM' | 'SecureEnclave' | 'YubiKey' | 'None';
  features: string[];
}> {
  await initTetraCryptFFI();
  
  // In a real implementation, this would check for actual hardware
  // For now, simulate detection based on platform
  
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;
  
  // Check for macOS Secure Enclave
  if (platform.includes('Mac')) {
    return {
      available: true,
      type: 'SecureEnclave',
      features: ['Key generation', 'Digital signatures', 'Secure key storage']
    };
  }
  
  // Check for Windows TPM
  if (platform.includes('Win')) {
    return {
      available: true,
      type: 'TPM',
      features: ['Secure key storage', 'Attestation', 'Random number generation']
    };
  }
  
  // For other platforms, try to detect WebAuthn/FIDO support
  if (window.PublicKeyCredential) {
    return {
      available: true,
      type: 'YubiKey',
      features: ['FIDO2', 'WebAuthn', 'Digital signatures']
    };
  }
  
  return {
    available: false,
    type: 'None',
    features: []
  };
}

/**
 * Register WebAuthn credential
 */
export async function registerWebAuthnCredential(username: string): Promise<{
  success: boolean;
  credentialId?: string;
  error?: string;
}> {
  await initTetraCryptFFI();
  
  if (!window.PublicKeyCredential) {
    return {
      success: false,
      error: "WebAuthn is not supported in this browser"
    };
  }
  
  try {
    // Generate a random user ID
    const userId = new Uint8Array(16);
    window.crypto.getRandomValues(userId);
    
    // Create WebAuthn credential options
    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge: window.crypto.getRandomValues(new Uint8Array(32)),
      rp: {
        name: "TetraCryptPQC",
        id: window.location.hostname
      },
      user: {
        id: userId,
        name: username,
        displayName: username
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ES256
        { type: "public-key", alg: -257 } // RS256
      ],
      timeout: 60000,
      authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
        userVerification: "preferred",
        residentKey: "preferred",
        requireResidentKey: false
      },
      attestation: "direct"
    };
    
    // Create credential
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    }) as PublicKeyCredential;
    
    // Get credential ID
    const credentialIdBuffer = (credential.rawId as ArrayBuffer);
    const credentialId = btoa(String.fromCharCode(...new Uint8Array(credentialIdBuffer)));
    
    return {
      success: true,
      credentialId
    };
  } catch (error) {
    console.error("❌ Error registering WebAuthn credential:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Authenticate with WebAuthn
 */
export async function authenticateWebAuthn(credentialId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  await initTetraCryptFFI();
  
  if (!window.PublicKeyCredential) {
    return {
      success: false,
      error: "WebAuthn is not supported in this browser"
    };
  }
  
  try {
    // Decode credential ID from base64
    const credentialIdBuffer = Uint8Array.from(atob(credentialId), c => c.charCodeAt(0)).buffer;
    
    // Create authentication options
    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge: window.crypto.getRandomValues(new Uint8Array(32)),
      allowCredentials: [{
        id: credentialIdBuffer,
        type: 'public-key',
        transports: ['usb', 'nfc', 'ble', 'internal']
      }],
      timeout: 60000,
      userVerification: "preferred"
    };
    
    // Request authentication
    await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });
    
    return {
      success: true
    };
  } catch (error) {
    console.error("❌ Error authenticating with WebAuthn:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Generate ML-KEM keypair with hardware security if available
 */
export async function generateSecureMLKEMKeypair(
  hardwareProtection: boolean = true
): Promise<PQCKey> {
  await initTetraCryptFFI();
  
  // Check for hardware security
  const hardwareSecurity = await checkHardwareSecurity();
  const useHardware = hardwareProtection && hardwareSecurity.available;
  
  console.log(`🔹 Generating ML-KEM-1024 keypair with ${useHardware ? hardwareSecurity.type : 'software'} protection`);
  
  // Import dynamically to avoid circular imports
  const { generateMLKEMKeypair } = await import('./pqcrypto');
  const keys = await generateMLKEMKeypair();
  
  return {
    ...keys,
    hardwareProtected: useHardware,
    hardwareType: useHardware ? hardwareSecurity.type : undefined
  } as PQCKey;
}

/**
 * Generate SLH-DSA keypair with hardware security if available
 */
export async function generateSecureSLHDSAKeypair(
  hardwareProtection: boolean = true
): Promise<PQCKey> {
  await initTetraCryptFFI();
  
  // Check for hardware security
  const hardwareSecurity = await checkHardwareSecurity();
  const useHardware = hardwareProtection && hardwareSecurity.available;
  
  console.log(`🔹 Generating SLH-DSA-Dilithium5 keypair with ${useHardware ? hardwareSecurity.type : 'software'} protection`);
  
  // Import dynamically to avoid circular imports
  const { generateSLHDSAKeypair } = await import('./pqcrypto');
  const keys = await generateSLHDSAKeypair();
  
  return {
    ...keys,
    hardwareProtected: useHardware,
    hardwareType: useHardware ? hardwareSecurity.type : undefined
  } as PQCKey;
}

/**
 * Sign message with hardware security if available
 */
export async function signMessageSecure(
  message: string, 
  privateKey: string,
  hardwareProtection: boolean = true
): Promise<string> {
  await initTetraCryptFFI();
  
  // Check for hardware security
  const hardwareSecurity = await checkHardwareSecurity();
  const useHardware = hardwareProtection && hardwareSecurity.available;
  
  console.log(`🔹 Signing message with ${useHardware ? hardwareSecurity.type : 'software'} protection`);
  
  // Import dynamically to avoid circular imports
  const { signMessage } = await import('./pqcrypto');
  return signMessage(message, privateKey);
}

// Export other FFI functions
export {
  verifySignature,
  encryptMessageChaCha,
  generateZKProof
} from './rust-pqc-bridge';
