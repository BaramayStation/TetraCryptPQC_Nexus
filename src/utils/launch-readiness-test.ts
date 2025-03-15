
/**
 * Launch Readiness Test Utilities
 * Provides functions to test system components before production launch
 */

import { generatePQCKeyPair, encryptAES, decryptAES, verifyPQC, signPQC } from '@/lib/pqcrypto';
import { validateZKProof, verifyStarkNetIdentity } from '@/lib/security-utils';
import { getP2PNodeStatus, connectToP2PNetwork } from '@/lib/tetracrypt-p2p';
import { generateRandomId } from '@/utils/crypto-utils';

export type TestResult = {
  name: string;
  status: 'success' | 'failure' | 'warning' | 'pending';
  message: string;
  details?: string;
  timestamp: string;
};

/**
 * Run cryptography tests
 */
export async function testCryptography(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  
  try {
    // Test PQC key generation
    console.log("🔹 Testing PQC key generation");
    const startKeyGen = performance.now();
    const keyPair = await generatePQCKeyPair();
    const keyGenDuration = performance.now() - startKeyGen;
    
    results.push({
      name: "PQC Key Generation",
      status: "success",
      message: "Key pair generated successfully",
      details: `Generated ${keyPair.algorithm} key pair in ${keyGenDuration.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
    
    // Test AES encryption/decryption
    console.log("🔹 Testing AES encryption/decryption");
    const testMessage = "This is a test message for encryption and decryption";
    const encrypted = await encryptAES(testMessage, keyPair.publicKey);
    const decrypted = await decryptAES(encrypted, keyPair.privateKey);
    
    results.push({
      name: "AES Encryption/Decryption",
      status: decrypted === testMessage ? "success" : "failure",
      message: decrypted === testMessage ? "Encryption/decryption test passed" : "Encryption/decryption test failed",
      details: decrypted === testMessage 
        ? "Message was correctly encrypted and decrypted" 
        : `Message decryption failed. Expected "${testMessage}" but got "${decrypted}"`,
      timestamp: new Date().toISOString()
    });
    
    // Test digital signature
    console.log("🔹 Testing digital signature");
    const dataToSign = "Test data for digital signature";
    const dataBytes = new TextEncoder().encode(dataToSign);
    const signature = await signPQC(dataBytes, keyPair.privateKey);
    const signatureValid = await verifyPQC(dataBytes, signature, keyPair.publicKey);
    
    results.push({
      name: "Digital Signature",
      status: signatureValid ? "success" : "failure",
      message: signatureValid ? "Signature test passed" : "Signature test failed",
      details: signatureValid 
        ? "Data was correctly signed and verified" 
        : "Signature verification failed",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error during cryptography tests:", error);
    
    results.push({
      name: "Cryptography Tests",
      status: "failure",
      message: "Error during cryptography tests",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    });
  }
  
  return results;
}

/**
 * Run security validation tests
 */
export async function testSecurityValidation(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  
  try {
    // Generate test key for validation
    const testKey = new Uint8Array(32);
    crypto.getRandomValues(testKey);
    
    // Test ZK proof validation
    console.log("🔹 Testing ZK proof validation");
    const zkValid = await validateZKProof(testKey);
    
    results.push({
      name: "Zero-Knowledge Proof Validation",
      status: zkValid ? "success" : "failure",
      message: zkValid ? "ZK proof validation test passed" : "ZK proof validation test failed",
      timestamp: new Date().toISOString()
    });
    
    // Test StarkNet identity verification
    console.log("🔹 Testing StarkNet identity verification");
    const starkNetValid = await verifyStarkNetIdentity(testKey);
    
    results.push({
      name: "StarkNet Identity Verification",
      status: starkNetValid ? "success" : "failure",
      message: starkNetValid ? "StarkNet identity verification test passed" : "StarkNet identity verification test failed",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error during security validation tests:", error);
    
    results.push({
      name: "Security Validation Tests",
      status: "failure",
      message: "Error during security validation tests",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    });
  }
  
  return results;
}

/**
 * Run P2P networking tests
 */
export async function testP2PNetworking(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  
  try {
    // Test P2P node status
    console.log("🔹 Testing P2P node status");
    const status = getP2PNodeStatus();
    
    results.push({
      name: "P2P Node Status",
      status: status.state === "connected" ? "success" : "warning",
      message: `P2P node is ${status.state}`,
      details: `Node ID: ${status.peerId}, Connected peers: ${status.peerCount}`,
      timestamp: new Date().toISOString()
    });
    
    // Test P2P network connection
    console.log("🔹 Testing P2P network connection");
    const connected = await connectToP2PNetwork();
    
    results.push({
      name: "P2P Network Connection",
      status: connected ? "success" : "failure",
      message: connected ? "P2P network connection test passed" : "P2P network connection test failed",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error during P2P networking tests:", error);
    
    results.push({
      name: "P2P Networking Tests",
      status: "failure",
      message: "Error during P2P networking tests",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    });
  }
  
  return results;
}

/**
 * Run all launch readiness tests
 */
export async function runLaunchReadinessTests(): Promise<{
  overall: 'ready' | 'not-ready';
  results: TestResult[];
}> {
  console.log("🔹 Running all launch readiness tests");
  
  const cryptoResults = await testCryptography();
  const securityResults = await testSecurityValidation();
  const p2pResults = await testP2PNetworking();
  
  const allResults = [...cryptoResults, ...securityResults, ...p2pResults];
  
  // Check if any tests failed
  const anyFailures = allResults.some(result => result.status === "failure");
  
  return {
    overall: anyFailures ? "not-ready" : "ready",
    results: allResults
  };
}
