
/**
 * TetraCryptPQC Failsafe System
 * Main entry point for the failsafe infrastructure
 */

import { failsafeManager } from './manager';
import { cryptoFailsafe } from './crypto/coordinator';
import { storageFailsafe } from './storage/coordinator';
import { communicationFailsafe } from './communication/coordinator';
import { identityFailsafe } from './identity/coordinator';
import { 
  FailsafeComponentType, 
  FailsafeStatus, 
  FailsafeSystemReport
} from './types';

// Import implementations to ensure they're registered
import './crypto/primary-impl';
import './crypto/secondary-impl';
import './storage/local-storage-impl';
import './storage/memory-impl';
import './communication/websocket-impl';
import './identity/pqc-keypair-impl';

// Simplified API for application use
export const TetraCryptFailsafe = {
  /**
   * Initialize the failsafe system
   */
  initialize: async (): Promise<boolean> => {
    console.log("Initializing TetraCryptPQC Failsafe System");
    
    try {
      // Test all implementations to ensure they're working
      const testResults = await failsafeManager.testAll();
      
      // Log results
      console.log("Failsafe system initialization test results:", testResults);
      
      return true;
    } catch (error) {
      console.error("Error initializing failsafe system:", error);
      return false;
    }
  },
  
  /**
   * Get the current system status report
   */
  getSystemStatus: async (): Promise<FailsafeSystemReport> => {
    return failsafeManager.getFailsafeReport();
  },
  
  /**
   * Test all failsafe mechanisms
   */
  testAll: async (): Promise<boolean> => {
    try {
      const results = await failsafeManager.testAll();
      
      // Check if all tests passed
      let allPassed = true;
      
      Object.values(results).forEach(componentResults => {
        Object.values(componentResults).forEach(result => {
          if (!result.success) {
            allPassed = false;
          }
        });
      });
      
      return allPassed;
    } catch (error) {
      console.error("Error testing failsafe mechanisms:", error);
      return false;
    }
  },
  
  /**
   * Simulate a failure in a component to test failover
   */
  simulateFailure: async (componentType: FailsafeComponentType): Promise<boolean> => {
    const coordinator = failsafeManager.getCoordinator(componentType);
    if (!coordinator) {
      console.error(`Coordinator for ${componentType} not found`);
      return false;
    }
    
    return coordinator.attemptFailover();
  },
  
  crypto: {
    getCurrentAlgorithm: cryptoFailsafe.getCurrentAlgorithm.bind(cryptoFailsafe),
    switchToAlgorithm: cryptoFailsafe.switchToAlgorithm.bind(cryptoFailsafe),
    getAvailableAlgorithms: cryptoFailsafe.getAvailableAlgorithms.bind(cryptoFailsafe)
  },
  
  storage: {
    getCurrentMedium: storageFailsafe.getCurrentStorageMedium.bind(storageFailsafe),
    switchToMedium: storageFailsafe.switchToStorageMedium.bind(storageFailsafe),
    getAvailableMedia: storageFailsafe.getAvailableStorageMedia.bind(storageFailsafe)
  },
  
  communication: {
    getCurrentMedium: communicationFailsafe.getCurrentCommunicationMedium.bind(communicationFailsafe),
    switchToMedium: communicationFailsafe.switchToCommunicationMedium.bind(communicationFailsafe),
    getAvailableMedia: communicationFailsafe.getAvailableCommunicationMedia.bind(communicationFailsafe),
    onMessage: communicationFailsafe.registerMessageCallback.bind(communicationFailsafe)
  },
  
  identity: {
    getCurrentMethod: identityFailsafe.getCurrentIdentityMethod.bind(identityFailsafe),
    switchToMethod: identityFailsafe.switchToIdentityMethod.bind(identityFailsafe),
    getAvailableMethods: identityFailsafe.getAvailableIdentityMethods.bind(identityFailsafe)
  }
};

// Initialize the system when this module is imported
TetraCryptFailsafe.initialize().catch(error => {
  console.error("Failed to initialize TetraCryptPQC Failsafe System:", error);
});

// Export types for use elsewhere
export * from './types';
export * from './crypto/types';
export * from './storage/types';
export * from './communication/types';
export * from './identity/types';
