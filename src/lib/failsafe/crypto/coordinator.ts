
/**
 * TetraCryptPQC Cryptography Failsafe Coordinator
 */

import { FailsafeCoordinatorImpl } from '../coordinator';
import { FailsafeComponentType, FailsafeStatus } from '../types';
import { CryptoAlgorithm } from './types';

class CryptoFailsafeCoordinator extends FailsafeCoordinatorImpl {
  constructor() {
    super(FailsafeComponentType.CRYPTOGRAPHY);
  }

  // Additional cryptography-specific methods
  getCurrentAlgorithm(): CryptoAlgorithm | null {
    if (!this.activeImplementation) return null;
    
    const impl = this.implementations[this.activeImplementation];
    if (!impl) return null;
    
    // Extract algorithm from implementation ID
    const algorithmPart = impl.id.split('-')[0];
    return algorithmPart as CryptoAlgorithm;
  }
  
  async switchToAlgorithm(algorithm: CryptoAlgorithm): Promise<boolean> {
    // Find an implementation matching the requested algorithm
    const matchingImpl = Object.values(this.implementations)
      .find(impl => impl.id.startsWith(algorithm));
    
    if (!matchingImpl) {
      console.error(`No implementation found for algorithm ${algorithm}`);
      return false;
    }
    
    return this.switchToImplementation(matchingImpl.id);
  }
  
  getAvailableAlgorithms(): CryptoAlgorithm[] {
    return Object.values(this.implementations)
      .map(impl => impl.id.split('-')[0] as CryptoAlgorithm)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values
  }
}

// Create a singleton instance
export const cryptoFailsafe = new CryptoFailsafeCoordinator();
