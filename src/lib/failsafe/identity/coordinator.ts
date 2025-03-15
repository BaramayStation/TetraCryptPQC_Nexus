
/**
 * TetraCryptPQC Identity Failsafe Coordinator
 */

import { FailsafeCoordinatorImpl } from '../coordinator';
import { FailsafeComponentType } from '../types';
import { IdentityMethod } from './types';

class IdentityFailsafeCoordinator extends FailsafeCoordinatorImpl {
  constructor() {
    super(FailsafeComponentType.IDENTITY);
  }

  // Additional identity-specific methods
  getCurrentIdentityMethod(): IdentityMethod | null {
    if (!this.activeImplementation) return null;
    
    const impl = this.implementations[this.activeImplementation];
    if (!impl) return null;
    
    // Extract method from implementation ID
    const methodPart = impl.id.split('-')[0];
    return methodPart as IdentityMethod;
  }
  
  async switchToIdentityMethod(method: IdentityMethod): Promise<boolean> {
    // Find an implementation matching the requested method
    const matchingImpl = Object.values(this.implementations)
      .find(impl => impl.id.startsWith(method));
    
    if (!matchingImpl) {
      console.error(`No implementation found for identity method ${method}`);
      return false;
    }
    
    return this.switchToImplementation(matchingImpl.id);
  }
  
  getAvailableIdentityMethods(): IdentityMethod[] {
    return Object.values(this.implementations)
      .map(impl => impl.id.split('-')[0] as IdentityMethod)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values
  }
}

// Create a singleton instance
export const identityFailsafe = new IdentityFailsafeCoordinator();
