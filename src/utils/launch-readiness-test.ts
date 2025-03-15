
/**
 * TetraCryptPQC Launch Readiness Tests
 * Utility functions to test all cryptographic and P2P functions
 */

import { generatePQCKeyPair, encryptMessage, decryptMessage, signMessage, verifySignature } from '@/lib/pqcrypto';
import { createSecureP2P } from '@/lib/p2p-node';

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  data?: any;
  error?: Error;
}

interface TestSuite {
  name: string;
  results: TestResult[];
  startTime: Date;
  endTime?: Date;
  success: boolean;
}

/**
 * Run all system tests
 */
export async function runAllTests(): Promise<{ success: boolean; suites: TestSuite[] }> {
  console.log("🔹 Running all TetraCryptPQC launch readiness tests...");
  
  const suites: TestSuite[] = [];
  
  // Run all test suites
  suites.push(await testPQCKeyGeneration());
  suites.push(await testEncryptionDecryption());
  suites.push(await testDigitalSignatures());
  suites.push(await testP2PCommunication());
  
  // Calculate overall success
  const overallSuccess = suites.every(suite => suite.success);
  
  return {
    success: overallSuccess,
    suites
  };
}

/**
 * Test post-quantum key generation
 */
export async function testPQCKeyGeneration(): Promise<TestSuite> {
  console.log("🔹 Testing PQC key generation");
  
  const suite: TestSuite = {
    name: "PQC Key Generation",
    results: [],
    startTime: new Date(),
    success: true
  };
  
  try {
    // Test ML-KEM key generation
    const kyberResult = await testFunction("ML-KEM Key Generation", async () => {
      const keypair = await generatePQCKeyPair();
      return {
        algorithm: keypair.algorithm,
        publicKeyLength: keypair.publicKey.length,
        privateKeyLength: keypair.privateKey.length,
        publicKeyPreview: keypair.publicKeyHex.substring(0, 32) + "...",
        privateKeyPreview: keypair.privateKeyHex.substring(0, 32) + "..."
      };
    });
    
    suite.results.push(kyberResult);
    
    // Check if any tests failed
    suite.success = suite.results.every(result => result.success);
    
  } catch (error) {
    suite.success = false;
    suite.results.push({
      name: "Key Generation Error",
      success: false,
      message: "An unexpected error occurred during key generation tests",
      error: error instanceof Error ? error : new Error(String(error))
    });
  }
  
  suite.endTime = new Date();
  return suite;
}

/**
 * Test encryption and decryption
 */
export async function testEncryptionDecryption(): Promise<TestSuite> {
  console.log("🔹 Testing encryption and decryption");
  
  const suite: TestSuite = {
    name: "Encryption and Decryption",
    results: [],
    startTime: new Date(),
    success: true
  };
  
  try {
    // Test basic encryption/decryption
    const encryptionResult = await testFunction("Basic Encryption/Decryption", async () => {
      const keypair = await generatePQCKeyPair();
      const testMessage = "Hello, Post-Quantum World!";
      
      const { ciphertext, encryptedData } = await encryptMessage(testMessage, keypair.publicKey);
      const decryptedMessage = await decryptMessage(ciphertext, encryptedData, keypair.privateKey);
      
      if (decryptedMessage !== testMessage) {
        throw new Error(`Decryption failed: ${decryptedMessage} !== ${testMessage}`);
      }
      
      return {
        originalMessage: testMessage,
        decryptedMessage,
        ciphertextLength: ciphertext.length,
        encryptedDataPreview: encryptedData.substring(0, 32) + "..."
      };
    });
    
    suite.results.push(encryptionResult);
    
    // Check if any tests failed
    suite.success = suite.results.every(result => result.success);
    
  } catch (error) {
    suite.success = false;
    suite.results.push({
      name: "Encryption/Decryption Error",
      success: false,
      message: "An unexpected error occurred during encryption/decryption tests",
      error: error instanceof Error ? error : new Error(String(error))
    });
  }
  
  suite.endTime = new Date();
  return suite;
}

/**
 * Test digital signatures
 */
export async function testDigitalSignatures(): Promise<TestSuite> {
  console.log("🔹 Testing digital signatures");
  
  const suite: TestSuite = {
    name: "Digital Signatures",
    results: [],
    startTime: new Date(),
    success: true
  };
  
  try {
    // Test signature generation and verification
    const signatureResult = await testFunction("Signature Generation/Verification", async () => {
      const keypair = await generatePQCKeyPair();
      const testMessage = "Hello, Post-Quantum World!";
      
      const signature = await signMessage(testMessage, keypair.privateKey);
      const isValid = await verifySignature(testMessage, signature, keypair.publicKey);
      
      if (!isValid) {
        throw new Error("Signature verification failed");
      }
      
      return {
        message: testMessage,
        signatureLength: signature.length,
        signaturePreview: signature.substring(0, 32) + "...",
        verified: isValid
      };
    });
    
    suite.results.push(signatureResult);
    
    // Check if any tests failed
    suite.success = suite.results.every(result => result.success);
    
  } catch (error) {
    suite.success = false;
    suite.results.push({
      name: "Digital Signature Error",
      success: false,
      message: "An unexpected error occurred during digital signature tests",
      error: error instanceof Error ? error : new Error(String(error))
    });
  }
  
  suite.endTime = new Date();
  return suite;
}

/**
 * Test P2P communication
 */
export async function testP2PCommunication(): Promise<TestSuite> {
  console.log("🔹 Testing P2P communication");
  
  const suite: TestSuite = {
    name: "P2P Communication",
    results: [],
    startTime: new Date(),
    success: true
  };
  
  try {
    // Test P2P node creation
    const nodeCreationResult = await testFunction("P2P Node Creation", async () => {
      const node = createSecureP2P();
      await node.start();
      
      if (!node.started) {
        throw new Error("Node failed to start");
      }
      
      return {
        nodeId: node.peerId.toString(),
        started: node.started
      };
    });
    
    suite.results.push(nodeCreationResult);
    
    // Check if any tests failed
    suite.success = suite.results.every(result => result.success);
    
  } catch (error) {
    suite.success = false;
    suite.results.push({
      name: "P2P Communication Error",
      success: false,
      message: "An unexpected error occurred during P2P communication tests",
      error: error instanceof Error ? error : new Error(String(error))
    });
  }
  
  suite.endTime = new Date();
  return suite;
}

/**
 * Helper function to run a test and format the result
 */
async function testFunction(name: string, func: () => Promise<any>): Promise<TestResult> {
  try {
    const data = await func();
    return {
      name,
      success: true,
      message: "Test passed successfully",
      data
    };
  } catch (error) {
    return {
      name,
      success: false,
      message: `Test failed: ${error instanceof Error ? error.message : String(error)}`,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}
