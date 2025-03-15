
/**
 * TetraCryptPQC Storage Failsafe Coordinator
 */

import { FailsafeCoordinatorImpl } from '../coordinator';
import { FailsafeComponentType } from '../types';
import { StorageMedium } from './types';

class StorageFailsafeCoordinator extends FailsafeCoordinatorImpl {
  constructor() {
    super(FailsafeComponentType.STORAGE);
  }

  // Additional storage-specific methods
  getCurrentStorageMedium(): StorageMedium | null {
    if (!this.activeImplementation) return null;
    
    const impl = this.implementations[this.activeImplementation];
    if (!impl) return null;
    
    // Extract storage medium from implementation ID
    const mediumPart = impl.id.split('-')[0];
    return mediumPart as StorageMedium;
  }
  
  async switchToStorageMedium(medium: StorageMedium): Promise<boolean> {
    // Find an implementation matching the requested medium
    const matchingImpl = Object.values(this.implementations)
      .find(impl => impl.id.startsWith(medium));
    
    if (!matchingImpl) {
      console.error(`No implementation found for storage medium ${medium}`);
      return false;
    }
    
    return this.switchToImplementation(matchingImpl.id);
  }
  
  getAvailableStorageMedia(): StorageMedium[] {
    return Object.values(this.implementations)
      .map(impl => impl.id.split('-')[0] as StorageMedium)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values
  }
}

// Create a singleton instance
export const storageFailsafe = new StorageFailsafeCoordinator();
