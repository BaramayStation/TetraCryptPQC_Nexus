
import { 
  SecurityThreshold,
  HealthStatus 
} from "./storage-types";
import {
  HardwareSecurityCapabilities,
  ContainerSecurityProfile,
  SecureContainerConfig,
  SecureServiceMesh,
  SecureInfraNode
} from "./storage-types/hardware-types";
import { InfrastructureNodeType, ContainerType } from "./storage-types/security-types";

// Function to initialize secure infrastructure
export function initializeSecureInfrastructure() {
  console.log("Initializing secure infrastructure...");
  
  const containerConfigs = generateContainerConfigs();
  const serviceMeshes = generateServiceMeshes();
  const infraNodes = generateInfraNodes();
  
  return {
    containerConfigs,
    serviceMeshes,
    infraNodes,
    healthStatus: "healthy" as HealthStatus
  };
}

// Generate mock container configs
function generateContainerConfigs(): SecureContainerConfig[] {
  return [
    {
      id: "container-1",
      name: "TetraCrypt API Gateway",
      description: "Secure API gateway with quantum-resistant TLS",
      status: "running",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      securityProfile: {
        immutableRootfs: true,
        seccomp: true,
        apparmor: true,
        rootless: true,
        readOnly: true,
        privileged: false,
        capabilities: ["NET_BIND_SERVICE"]
      },
      encryptionEnabled: true,
      pqcEnabled: true,
      image: "tetracrypt/api-gateway:1.0.0",
      securityScore: 95,
      immutableRootfs: true,
      vulnerabilities: {
        high: 0,
        medium: 1,
        low: 3
      }
    },
    {
      id: "container-2",
      name: "Quantum Key Distribution Service",
      description: "Service for secure key distribution",
      status: "running",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      securityProfile: {
        immutableRootfs: true,
        seccomp: true,
        apparmor: true,
        rootless: true,
        readOnly: false,
        privileged: false,
        capabilities: ["NET_BIND_SERVICE"]
      },
      encryptionEnabled: true,
      pqcEnabled: true,
      image: "tetracrypt/qkd-service:1.0.0",
      securityScore: 90,
      immutableRootfs: true,
      vulnerabilities: {
        high: 0,
        medium: 2,
        low: 5
      }
    }
  ];
}

// Generate mock service meshes
function generateServiceMeshes(): SecureServiceMesh[] {
  return [
    {
      id: "mesh-1",
      name: "Production Mesh",
      description: "Production service mesh with quantum-resistant mTLS",
      status: "online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodeCount: 5,
      encryptionEnabled: true,
      pqcEnabled: true,
      securityScore: 92,
      containers: 7,
      mTLS: true,
      policyEnforcement: true
    },
    {
      id: "mesh-2",
      name: "Development Mesh",
      description: "Development service mesh",
      status: "online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodeCount: 3,
      encryptionEnabled: true,
      pqcEnabled: false,
      securityScore: 80,
      containers: 4,
      mTLS: true,
      policyEnforcement: false
    }
  ];
}

// Generate mock infrastructure nodes
function generateInfraNodes(): SecureInfraNode[] {
  return [
    {
      id: "node-1",
      name: "Primary Compute Node",
      description: "High-security compute node for cryptographic operations",
      type: "compute",
      status: "online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      securityScore: 95,
      pqcEnabled: true,
      trustLevel: 9
    },
    {
      id: "node-2",
      name: "Storage Node",
      description: "Encrypted storage node for sensitive data",
      type: "storage",
      status: "online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      securityScore: 90,
      pqcEnabled: true,
      trustLevel: 8
    },
    {
      id: "node-3",
      name: "AI Processing Node",
      description: "Node for AI model execution and training",
      type: "ai",
      status: "online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      securityScore: 85,
      pqcEnabled: true,
      trustLevel: 7
    },
    {
      id: "node-4",
      name: "Application Server",
      description: "Server hosting application containers",
      type: "application",
      status: "online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      securityScore: 88,
      pqcEnabled: true,
      trustLevel: 8
    }
  ];
}
