
/**
 * TetraCryptPQC Failsafe Coordinator
 * Manages failsafe implementations for a specific component type
 */

import { 
  FailsafeComponentType, 
  FailsafeCoordinator, 
  FailsafeImplementation,
  FailsafeStatus,
  FailsafeTestResult
} from './types';

export class FailsafeCoordinatorImpl implements FailsafeCoordinator {
  id: string;
  componentType: FailsafeComponentType;
  status: FailsafeStatus = FailsafeStatus.ONLINE;
  activeImplementation: string | null = null;
  implementations: Record<string, FailsafeImplementation<any>> = {};
  fallbackChain: string[] = [];

  constructor(componentType: FailsafeComponentType) {
    this.id = `${componentType}-coordinator-${crypto.randomUUID()}`;
    this.componentType = componentType;
  }

  registerImplementation<T>(implementation: FailsafeImplementation<T>): void {
    if (implementation.type !== this.componentType) {
      console.error(`Implementation type ${implementation.type} does not match coordinator type ${this.componentType}`);
      return;
    }

    this.implementations[implementation.id] = implementation;
    
    // Sort fallback chain by priority
    this.updateFallbackChain();
    
    // If this is the first implementation, make it active
    if (this.activeImplementation === null) {
      this.activeImplementation = implementation.id;
    }
    
    console.log(`Registered ${implementation.name} (${implementation.id}) with ${this.componentType} coordinator`);
  }

  unregisterImplementation(id: string): void {
    if (!this.implementations[id]) {
      console.warn(`Implementation ${id} not found in ${this.componentType} coordinator`);
      return;
    }
    
    // If this is the active implementation, switch to the next in the fallback chain
    if (this.activeImplementation === id) {
      const nextImpl = this.fallbackChain.find(implId => implId !== id);
      if (nextImpl) {
        this.switchToImplementation(nextImpl).catch(err => {
          console.error(`Failed to switch to next implementation after unregistering active one:`, err);
        });
      } else {
        this.activeImplementation = null;
        this.status = FailsafeStatus.OFFLINE;
      }
    }
    
    delete this.implementations[id];
    this.updateFallbackChain();
    console.log(`Unregistered ${id} from ${this.componentType} coordinator`);
  }

  getImplementation<T>(id: string): FailsafeImplementation<T> | null {
    return this.implementations[id] as FailsafeImplementation<T> || null;
  }

  async switchToImplementation<T>(id: string): Promise<boolean> {
    if (!this.implementations[id]) {
      console.error(`Implementation ${id} not found in ${this.componentType} coordinator`);
      return false;
    }
    
    const impl = this.implementations[id];
    
    try {
      // Check if the implementation is available
      const isAvailable = await impl.isAvailable();
      if (!isAvailable) {
        console.error(`Implementation ${impl.name} (${id}) is not available`);
        return false;
      }
      
      // Deactivate current implementation if exists
      if (this.activeImplementation && this.implementations[this.activeImplementation]) {
        await this.implementations[this.activeImplementation].deactivate();
      }
      
      // Activate new implementation
      const activated = await impl.activate();
      if (!activated) {
        console.error(`Failed to activate implementation ${impl.name} (${id})`);
        return false;
      }
      
      this.activeImplementation = id;
      this.status = impl.status;
      console.log(`Switched to ${impl.name} (${id}) for ${this.componentType}`);
      return true;
    } catch (error) {
      console.error(`Error switching to implementation ${id}:`, error);
      return false;
    }
  }

  async testAllImplementations(): Promise<Record<string, FailsafeTestResult>> {
    const results: Record<string, FailsafeTestResult> = {};
    
    for (const [id, impl] of Object.entries(this.implementations)) {
      try {
        results[id] = await impl.test();
      } catch (error) {
        results[id] = { 
          success: false, 
          errors: [`Test failed with error: ${error}`] 
        };
      }
    }
    
    return results;
  }

  getStatus(): FailsafeStatus {
    return this.status;
  }

  private updateFallbackChain(): void {
    // Sort implementations by priority (highest first)
    this.fallbackChain = Object.values(this.implementations)
      .sort((a, b) => b.priority - a.priority)
      .map(impl => impl.id);
  }

  async attemptFailover(): Promise<boolean> {
    if (!this.activeImplementation || this.fallbackChain.length <= 1) {
      console.warn(`No failover options available for ${this.componentType}`);
      return false;
    }
    
    // Get the next implementation in the fallback chain
    const currentIndex = this.fallbackChain.indexOf(this.activeImplementation);
    if (currentIndex === -1 || currentIndex === this.fallbackChain.length - 1) {
      console.warn(`No further failover options available for ${this.componentType}`);
      return false;
    }
    
    const nextImplId = this.fallbackChain[currentIndex + 1];
    return await this.switchToImplementation(nextImplId);
  }
  
  // Add methods for registering message callbacks (for communication failsafe)
  registerMessageCallback(callback: (from: string, message: string) => void): void {
    if (this.componentType !== FailsafeComponentType.COMMUNICATION) {
      console.error("Message callbacks can only be registered with the communication failsafe");
      return;
    }

    if (this.activeImplementation && this.implementations[this.activeImplementation]) {
      const impl = this.implementations[this.activeImplementation];
      if (impl.implementation && typeof impl.implementation.onMessage === 'function') {
        impl.implementation.onMessage(callback);
      }
    }
  }
}
