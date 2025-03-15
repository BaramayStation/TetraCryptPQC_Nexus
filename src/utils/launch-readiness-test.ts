
/**
 * TetraCryptPQC Launch Readiness Test Utility
 * 
 * This file provides functions to test the core cryptographic and P2P
 * functionalities of the TetraCryptPQC application to ensure it's launch-ready.
 */

import { generateMLKEMKeypair, encryptWithPQC, decryptWithPQC, signMessage, verifySignature } from '@/lib/pqcrypto';
import { hashWithSHA3 } from '@/lib/pqcrypto';
import { initPQC, generatePQCKeys, encryptMessage, decryptMessage, createChatNode, sendMessage } from '@/lib/tetracrypt-p2p';
import { toast } from '@/components/ui/use-toast';

// Test result interface
interface TestResult {
  name: string;
  success: boolean;
  message: string;
  data?: any;
  error?: Error;
}

// Test suite interface
interface TestSuite {
  name: string;
  results: TestResult[];
  startTime: Date;
  endTime?: Date;
  success: boolean;
}

// Global test suites collection
const testSuites: TestSuite[] = [];

/**
 * Run a test and record the result
 */
async function runTest(
  suiteName: string,
  testName: string,
  testFn: () => Promise<any>
): Promise<TestResult> {
  console.log(`🧪 Running test: ${testName}`);
  
  try {
    const result = await testFn();
    const testResult: TestResult = {
      name: testName,
      success: true,
      message: `Test passed: ${testName}`,
      data: result
    };
    console.log(`✅ ${testResult.message}`);
    return testResult;
  } catch (error) {
    const testResult: TestResult = {
      name: testName,
      success: false,
      message: `Test failed: ${testName}`,
      error: error instanceof Error ? error : new Error(String(error))
    };
    console.error(`❌ ${testResult.message}`, testResult.error);
    return testResult;
  }
}

/**
 * Create a new test suite
 */
function createTestSuite(name: string): TestSuite {
  const suite: TestSuite = {
    name,
    results: [],
    startTime: new Date(),
    success: true
  };
  testSuites.push(suite);
  return suite;
}

/**
 * Finish a test suite and calculate overall success
 */
function finishTestSuite(suite: TestSuite) {
  suite.endTime = new Date();
  suite.success = suite.results.every(result => result.success);
  
  console.log(`
  📊 Test Suite: ${suite.name}
  🕒 Duration: ${suite.endTime.getTime() - suite.startTime.getTime()}ms
  ✅ Passed: ${suite.results.filter(r => r.success).length}
  ❌ Failed: ${suite.results.filter(r => !r.success).length}
  🏁 Overall: ${suite.success ? 'PASSED' : 'FAILED'}
  `);
  
  return suite;
}

/**
 * Test 1: PQC Key Generation
 */
export async function testPQCKeyGeneration(): Promise<TestSuite> {
  const suite = createTestSuite("PQC Key Generation");
  
  // Test ML-KEM-768 key generation
  suite.results.push(
    await runTest(suite.name, "Generate ML-KEM-768 keypair", async () => {
      const keys = await generateMLKEMKeypair('ML-KEM-768');
      if (!keys.publicKey || !keys.privateKey) {
        throw new Error("Invalid keys generated");
      }
      return keys;
    })
  );
  
  // Test ML-KEM-1024 key generation
  suite.results.push(
    await runTest(suite.name, "Generate ML-KEM-1024 keypair", async () => {
      const keys = await generateMLKEMKeypair('ML-KEM-1024');
      if (!keys.publicKey || !keys.privateKey) {
        throw new Error("Invalid keys generated");
      }
      return keys;
    })
  );
  
  // Test SLH-DSA key generation
  suite.results.push(
    await runTest(suite.name, "Generate SLH-DSA keypair", async () => {
      const keys = await generateSLHDSAKeypair();
      if (!keys.publicKey || !keys.privateKey) {
        throw new Error("Invalid keys generated");
      }
      return keys;
    })
  );
  
  return finishTestSuite(suite);
}

/**
 * Test 2: Encryption and Decryption
 */
export async function testEncryptionDecryption(): Promise<TestSuite> {
  const suite = createTestSuite("Encryption and Decryption");
  
  // Generate test keys
  const kemKeys = await generateMLKEMKeypair('ML-KEM-1024');
  
  // Test message to encrypt
  const testMessage = "This is a test message for TetraCryptPQC";
  
  // Test PQC encryption
  let encryptedData: string;
  suite.results.push(
    await runTest(suite.name, "Encrypt with PQC", async () => {
      encryptedData = await encryptWithPQC(testMessage, kemKeys.publicKey);
      if (!encryptedData) {
        throw new Error("Encryption failed");
      }
      return { encryptedData };
    })
  );
  
  // Test PQC decryption
  suite.results.push(
    await runTest(suite.name, "Decrypt with PQC", async () => {
      if (!encryptedData) {
        throw new Error("No encrypted data to decrypt");
      }
      
      const decryptedMessage = await decryptWithPQC(encryptedData, kemKeys.privateKey);
      if (decryptedMessage !== testMessage) {
        throw new Error(`Decryption failed. Expected: "${testMessage}", Got: "${decryptedMessage}"`);
      }
      return { decryptedMessage };
    })
  );
  
  // Test hashing
  suite.results.push(
    await runTest(suite.name, "Hash with SHA3", async () => {
      const hash = await hashWithSHA3(testMessage);
      if (!hash || hash.length < 32) {
        throw new Error("Hash generation failed");
      }
      return { hash };
    })
  );
  
  return finishTestSuite(suite);
}

/**
 * Test 3: Digital Signatures
 */
export async function testDigitalSignatures(): Promise<TestSuite> {
  const suite = createTestSuite("Digital Signatures");
  
  // Generate test keys
  const dsaKeys = await generateSLHDSAKeypair();
  
  // Test message to sign
  const testMessage = "This message will be signed with SLH-DSA";
  
  // Test signature generation
  let signature: string;
  suite.results.push(
    await runTest(suite.name, "Generate signature", async () => {
      signature = await signMessage(testMessage, dsaKeys.privateKey);
      if (!signature) {
        throw new Error("Signature generation failed");
      }
      return { signature };
    })
  );
  
  // Test signature verification (valid)
  suite.results.push(
    await runTest(suite.name, "Verify valid signature", async () => {
      if (!signature) {
        throw new Error("No signature to verify");
      }
      
      const isValid = await verifySignature(testMessage, signature, dsaKeys.publicKey);
      if (!isValid) {
        throw new Error("Signature verification failed for valid signature");
      }
      return { isValid };
    })
  );
  
  // Test signature verification (tampered message)
  suite.results.push(
    await runTest(suite.name, "Detect tampered message", async () => {
      if (!signature) {
        throw new Error("No signature to verify");
      }
      
      const tamperedMessage = testMessage + " (tampered)";
      const isValid = await verifySignature(tamperedMessage, signature, dsaKeys.publicKey);
      if (isValid) {
        throw new Error("Signature verification should have failed for tampered message");
      }
      return { isValid: !isValid };
    })
  );
  
  return finishTestSuite(suite);
}

/**
 * Test 4: P2P Communication
 * This test initializes the P2P communication layer but doesn't perform
 * actual message exchange as that would require multiple instances.
 */
export async function testP2PCommunication(): Promise<TestSuite> {
  const suite = createTestSuite("P2P Communication");
  
  // Test P2P initialization
  suite.results.push(
    await runTest(suite.name, "Initialize P2P", async () => {
      try {
        // This will test if the P2P functions are available and can be initialized
        const keys = await generatePQCKeys();
        return { success: true, keys };
      } catch (error) {
        throw new Error(`P2P initialization failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    })
  );
  
  // Test message encryption
  suite.results.push(
    await runTest(suite.name, "P2P Message Encryption", async () => {
      const keys = await generatePQCKeys();
      const testMessage = "P2P test message";
      
      // Test the P2P encryption function
      try {
        const encrypted = await encryptMessage(testMessage, keys.publicKey);
        return { success: true, encrypted };
      } catch (error) {
        throw new Error(`P2P message encryption failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    })
  );
  
  return finishTestSuite(suite);
}

/**
 * Run all tests and report results
 */
export async function runAllTests(): Promise<{ success: boolean; suites: TestSuite[] }> {
  console.log("🚀 Starting TetraCryptPQC Launch Readiness Tests");
  
  try {
    // Run all test suites
    await testPQCKeyGeneration();
    await testEncryptionDecryption();
    await testDigitalSignatures();
    await testP2PCommunication();
    
    // Calculate overall success
    const allSuccess = testSuites.every(suite => suite.success);
    
    console.log(`
    ======================================================
    📋 TetraCryptPQC Launch Readiness Test Results
    ======================================================
    ✅ Passed Suites: ${testSuites.filter(s => s.success).length}
    ❌ Failed Suites: ${testSuites.filter(s => !s.success).length}
    🏁 Overall Status: ${allSuccess ? 'PASSED ✅' : 'FAILED ❌'}
    ======================================================
    `);
    
    // Show toast notification with results
    toast({
      title: `Launch Readiness Tests: ${allSuccess ? 'PASSED' : 'FAILED'}`,
      description: `${testSuites.filter(s => s.success).length}/${testSuites.length} test suites passed`,
      variant: allSuccess ? 'default' : 'destructive',
    });
    
    return {
      success: allSuccess,
      suites: testSuites
    };
  } catch (error) {
    console.error("❌ Test runner error:", error);
    
    toast({
      title: "Launch Readiness Tests Failed",
      description: error instanceof Error ? error.message : String(error),
      variant: 'destructive',
    });
    
    return {
      success: false,
      suites: testSuites
    };
  }
}
