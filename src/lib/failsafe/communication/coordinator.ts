
/**
 * TetraCryptPQC Communication Failsafe Coordinator
 */

import { FailsafeCoordinatorImpl } from '../coordinator';
import { FailsafeComponentType } from '../types';
import { CommunicationMedium } from './types';

class CommunicationFailsafeCoordinator extends FailsafeCoordinatorImpl {
  private messageCallbacks: ((from: string, message: string) => void)[] = [];
  
  constructor() {
    super(FailsafeComponentType.COMMUNICATION);
  }

  // Register a message callback that works across all implementations
  registerMessageCallback(callback: (from: string, message: string) => void): void {
    this.messageCallbacks.push(callback);
  }
  
  // Trigger all callbacks when a message is received
  handleMessage(from: string, message: string): void {
    this.messageCallbacks.forEach(callback => {
      try {
        callback(from, message);
      } catch (error) {
        console.error("Error in message callback:", error);
      }
    });
  }

  // Additional communication-specific methods
  getCurrentCommunicationMedium(): CommunicationMedium | null {
    if (!this.activeImplementation) return null;
    
    const impl = this.implementations[this.activeImplementation];
    if (!impl) return null;
    
    // Extract medium from implementation ID
    const mediumPart = impl.id.split('-')[0];
    return mediumPart as CommunicationMedium;
  }
  
  async switchToCommunicationMedium(medium: CommunicationMedium): Promise<boolean> {
    // Find an implementation matching the requested medium
    const matchingImpl = Object.values(this.implementations)
      .find(impl => impl.id.startsWith(medium));
    
    if (!matchingImpl) {
      console.error(`No implementation found for communication medium ${medium}`);
      return false;
    }
    
    return this.switchToImplementation(matchingImpl.id);
  }
  
  getAvailableCommunicationMedia(): CommunicationMedium[] {
    return Object.values(this.implementations)
      .map(impl => impl.id.split('-')[0] as CommunicationMedium)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values
  }
}

// Create a singleton instance
export const communicationFailsafe = new CommunicationFailsafeCoordinator();
