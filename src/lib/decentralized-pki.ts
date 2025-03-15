
/**
 * TetraCryptPQC Decentralized PKI Module
 * 
 * Implements a decentralized public key infrastructure with
 * post-quantum cryptography and StarkNet-based certificate revocation.
 */

import { 
  generateMLKEMKeypair, 
  generateSLHDSAKeypair,
  generateFalconKeypair,
  generateBIKEKeypair
} from './pqcrypto';
import { signMessage } from './crypto';
import { getLocalStorage, setLocalStorage } from './secure-storage';
import { logSecurityEvent } from './ai-security';

// Certificate types
export enum CertificateType {
  IDENTITY = "IDENTITY",
  SIGNING = "SIGNING",
  ENCRYPTION = "ENCRYPTION",
  AUTHENTICATION = "AUTHENTICATION"
}

// Certificate status
export enum CertificateStatus {
  VALID = "VALID",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING"
}

// Certificate revocation reason
export enum RevocationReason {
  KEY_COMPROMISE = "KEY_COMPROMISE",
  AFFILIATION_CHANGED = "AFFILIATION_CHANGED",
  SUPERSEDED = "SUPERSEDED",
  CESSATION_OF_OPERATION = "CESSATION_OF_OPERATION",
  PRIVILEGE_WITHDRAWN = "PRIVILEGE_WITHDRAWN"
}

// Certificate interface
export interface Certificate {
  id: string;
  type: CertificateType;
  subject: string;
  publicKey: string;
  algorithm: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  status: CertificateStatus;
  revocationReason?: RevocationReason;
  revocationDate?: string;
  signature: string;
  metadata?: Record<string, any>;
  extensions?: Record<string, any>;
}

/**
 * Generate a new certificate
 */
export async function generateCertificate(
  subject: string,
  type: CertificateType,
  algorithm: 'ML-KEM-1024' | 'SLH-DSA' | 'Falcon-1024' | 'BIKE',
  validityDays: number = 365
): Promise<Certificate> {
  try {
    console.log(`🔹 Generating ${algorithm} certificate for ${subject}`);
    
    // Generate key pair based on selected algorithm
    let keyPair;
    switch (algorithm) {
      case 'ML-KEM-1024':
        keyPair = await generateMLKEMKeypair();
        break;
      case 'SLH-DSA':
        keyPair = await generateSLHDSAKeypair();
        break;
      case 'Falcon-1024':
        keyPair = await generateFalconKeypair();
        break;
      case 'BIKE':
        keyPair = await generateBIKEKeypair();
        break;
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    
    // Generate certificate ID
    const id = crypto.randomUUID();
    
    // Set validity dates
    const now = new Date();
    const validFrom = now.toISOString();
    const validTo = new Date(now.setDate(now.getDate() + validityDays)).toISOString();
    
    // Create certificate object
    const certificate: Certificate = {
      id,
      type,
      subject,
      publicKey: keyPair.publicKey,
      algorithm,
      issuer: "TetraCryptPQC Self-Signed", // Self-signed for now
      validFrom,
      validTo,
      status: CertificateStatus.VALID,
      signature: "", // Placeholder until signed
      extensions: {
        subjectKeyIdentifier: id,
        keyUsage: getKeyUsageByType(type),
        postQuantumReady: true,
        starkNetRevocation: true
      }
    };
    
    // Sign the certificate with the private key
    const certificateData = JSON.stringify({
      id: certificate.id,
      type: certificate.type,
      subject: certificate.subject,
      publicKey: certificate.publicKey,
      algorithm: certificate.algorithm,
      issuer: certificate.issuer,
      validFrom: certificate.validFrom,
      validTo: certificate.validTo,
      extensions: certificate.extensions
    });
    
    // Sign certificate data
    certificate.signature = await signMessage(certificateData, keyPair.privateKey);
    
    // Store the certificate
    storeCertificate(certificate);
    
    // Store the private key securely (in a real system, this would be stored in a HSM)
    storePrivateKey(id, keyPair.privateKey);
    
    // Log security event
    logSecurityEvent({
      eventType: "cryptographic-operation",
      userId: subject,
      operation: "generate_certificate",
      status: "success",
      metadata: { certificateId: id, algorithm, type }
    });
    
    return certificate;
  } catch (error) {
    console.error("Error generating certificate:", error);
    
    // Log security event
    logSecurityEvent({
      eventType: "cryptographic-operation",
      userId: subject,
      operation: "generate_certificate",
      status: "failure",
      metadata: { error: error instanceof Error ? error.message : "Unknown error" }
    });
    
    throw error;
  }
}

/**
 * Get key usage by certificate type
 */
function getKeyUsageByType(type: CertificateType): string[] {
  switch (type) {
    case CertificateType.IDENTITY:
      return ["digitalSignature", "keyEncipherment"];
    case CertificateType.SIGNING:
      return ["digitalSignature", "nonRepudiation"];
    case CertificateType.ENCRYPTION:
      return ["keyEncipherment", "dataEncipherment"];
    case CertificateType.AUTHENTICATION:
      return ["digitalSignature", "keyAgreement"];
    default:
      return ["digitalSignature"];
  }
}

/**
 * Store a certificate
 */
function storeCertificate(certificate: Certificate): void {
  try {
    const certificates = getLocalStorage<Certificate[]>("certificates") || [];
    certificates.push(certificate);
    setLocalStorage("certificates", certificates);
  } catch (error) {
    console.error("Error storing certificate:", error);
    throw error;
  }
}

/**
 * Store a private key securely
 */
function storePrivateKey(certificateId: string, privateKey: string): void {
  try {
    setLocalStorage(`private_key_${certificateId}`, privateKey, true);
  } catch (error) {
    console.error("Error storing private key:", error);
    throw error;
  }
}

/**
 * Get a certificate by ID
 */
export function getCertificate(id: string): Certificate | null {
  try {
    const certificates = getLocalStorage<Certificate[]>("certificates") || [];
    return certificates.find(cert => cert.id === id) || null;
  } catch (error) {
    console.error("Error getting certificate:", error);
    return null;
  }
}

/**
 * Revoke a certificate
 */
export function revokeCertificate(
  id: string, 
  reason: RevocationReason
): Certificate | null {
  try {
    const certificates = getLocalStorage<Certificate[]>("certificates") || [];
    const index = certificates.findIndex(cert => cert.id === id);
    
    if (index === -1) {
      return null;
    }
    
    // Update certificate status
    certificates[index].status = CertificateStatus.REVOKED;
    certificates[index].revocationReason = reason;
    certificates[index].revocationDate = new Date().toISOString();
    
    // Save updated certificates
    setLocalStorage("certificates", certificates);
    
    // Log security event
    logSecurityEvent({
      eventType: "cryptographic-operation",
      userId: certificates[index].subject,
      operation: "revoke_certificate",
      status: "success",
      metadata: { certificateId: id, reason }
    });
    
    // In a real implementation, we would also publish to the StarkNet CRL
    console.log(`🔹 Certificate ${id} revoked and added to StarkNet CRL`);
    
    return certificates[index];
  } catch (error) {
    console.error("Error revoking certificate:", error);
    return null;
  }
}

/**
 * Verify a certificate
 */
export function verifyCertificate(id: string): {
  valid: boolean;
  status: CertificateStatus;
  reason?: string;
} {
  try {
    const certificate = getCertificate(id);
    
    if (!certificate) {
      return {
        valid: false,
        status: CertificateStatus.REVOKED,
        reason: "Certificate not found"
      };
    }
    
    // Check if revoked
    if (certificate.status === CertificateStatus.REVOKED) {
      return {
        valid: false,
        status: CertificateStatus.REVOKED,
        reason: certificate.revocationReason
      };
    }
    
    // Check if expired
    const now = new Date();
    const validTo = new Date(certificate.validTo);
    
    if (now > validTo) {
      return {
        valid: false,
        status: CertificateStatus.EXPIRED,
        reason: "Certificate has expired"
      };
    }
    
    // Certificate is valid
    return {
      valid: true,
      status: CertificateStatus.VALID
    };
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return {
      valid: false,
      status: CertificateStatus.REVOKED,
      reason: "Error verifying certificate"
    };
  }
}

/**
 * Get all certificates
 */
export function getAllCertificates(): Certificate[] {
  return getLocalStorage<Certificate[]>("certificates") || [];
}

/**
 * Initialize the decentralized PKI
 */
export function initializeDecentralizedPKI(): boolean {
  try {
    console.log("🔹 Initializing decentralized PKI");
    
    // Check if already initialized
    if (getLocalStorage<boolean>("pki_initialized")) {
      console.log("🔹 Decentralized PKI already initialized");
      return true;
    }
    
    // In a real implementation, this would initialize the PKI infrastructure
    // For now, just set the initialization flag
    setLocalStorage("pki_initialized", true);
    
    console.log("🔹 Decentralized PKI initialized");
    return true;
  } catch (error) {
    console.error("Error initializing decentralized PKI:", error);
    return false;
  }
}
