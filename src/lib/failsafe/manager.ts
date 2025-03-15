
/**
 * TetraCryptPQC Failsafe Manager
 * Central manager for all failsafe components
 */

import { 
  FailsafeComponentType, 
  FailsafeCoordinator, 
  FailsafeManager, 
  FailsafeStatus, 
  FailsafeSystemReport,
  FailsafeTestResult
} from './types';
import { FailsafeCoordinatorImpl } from './coordinator';

export class FailsafeManagerImpl implements FailsafeManager {
  coordinators: Record<FailsafeComponentType, FailsafeCoordinator> = {} as Record<FailsafeComponentType, FailsafeCoordinator>;
  
  constructor() {
    // Initialize coordinators for each component type
    Object.values(FailsafeComponentType).forEach(componentType => {
      this.coordinators[componentType] = new FailsafeCoordinatorImpl(componentType);
    });
    
    console.log("TetraCryptPQC Failsafe Manager initialized");
  }
  
  registerCoordinator(coordinator: FailsafeCoordinator): void {
    this.coordinators[coordinator.componentType] = coordinator;
  }
  
  unregisterCoordinator(componentType: FailsafeComponentType): void {
    delete this.coordinators[componentType];
  }
  
  getCoordinator(componentType: FailsafeComponentType): FailsafeCoordinator | null {
    return this.coordinators[componentType] || null;
  }
  
  async testAll(): Promise<Record<FailsafeComponentType, Record<string, FailsafeTestResult>>> {
    const results: Record<FailsafeComponentType, Record<string, FailsafeTestResult>> = {} as Record<FailsafeComponentType, Record<string, FailsafeTestResult>>;
    
    for (const [type, coordinator] of Object.entries(this.coordinators)) {
      results[type as FailsafeComponentType] = await coordinator.testAllImplementations();
    }
    
    return results;
  }
  
  async getFailsafeReport(): Promise<FailsafeSystemReport> {
    const componentStatuses: Record<FailsafeComponentType, {
      status: FailsafeStatus;
      activeImplementation: string | null;
      availableImplementations: string[];
    }> = {} as any;
    
    let overallStatus = FailsafeStatus.ONLINE;
    const recommendations: string[] = [];
    
    // Collect status for each component
    for (const [type, coordinator] of Object.entries(this.coordinators)) {
      const componentType = type as FailsafeComponentType;
      const status = coordinator.status;
      
      componentStatuses[componentType] = {
        status,
        activeImplementation: coordinator.activeImplementation,
        availableImplementations: Object.keys(coordinator.implementations)
      };
      
      // Determine overall system status (worst of all components)
      if (getStatusSeverity(status) > getStatusSeverity(overallStatus)) {
        overallStatus = status;
      }
      
      // Generate recommendations based on status
      if (status === FailsafeStatus.DEGRADED) {
        recommendations.push(`Consider testing alternate ${componentType} implementations.`);
      } else if (status === FailsafeStatus.FALLBACK) {
        recommendations.push(`${componentType} is operating in fallback mode. Investigate primary implementation issues.`);
      } else if (status === FailsafeStatus.EMERGENCY) {
        recommendations.push(`URGENT: ${componentType} is in emergency mode. Immediate attention required.`);
      } else if (status === FailsafeStatus.OFFLINE) {
        recommendations.push(`CRITICAL: ${componentType} is offline. System functionality compromised.`);
      }
    }
    
    return {
      timestamp: new Date().toISOString(),
      overallStatus,
      componentStatuses,
      recommendations
    };
  }
}

// Helper function to rank status severity
function getStatusSeverity(status: FailsafeStatus): number {
  const severityMap: Record<FailsafeStatus, number> = {
    [FailsafeStatus.ONLINE]: 0,
    [FailsafeStatus.DEGRADED]: 1,
    [FailsafeStatus.FALLBACK]: 2,
    [FailsafeStatus.EMERGENCY]: 3,
    [FailsafeStatus.OFFLINE]: 4
  };
  
  return severityMap[status] || 0;
}

// Create a singleton instance
export const failsafeManager = new FailsafeManagerImpl();
