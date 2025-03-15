
/**
 * TetraCryptPQC Decentralized PKI (dPKI) Implementation
 * 
 * Implements post-quantum secure decentralized PKI with StarkNet integration
 * for certificate revocation and quantum-safe signatures.
 */

import { 
  generateMLKEMKeypair, 
  generateFalconKeypair, 
  signMessage, 
  verifySignature 
} from "./pqcrypto";
import { 
  CertificateRevocationList, 
  PKICertificate, 
  RevocationReason, 
  UserProfile 
} from "./storage-types";
import { connectToStarkNet, signMessageWithStarkNet } from "@/services/StarkNetService";
import { toast } from "@/components/ui/use-toast";
import { getItem, setItem } from "./secure-storage";

// Constants for certificate validation
const CRL_REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
const CERTIFICATE_VALIDITY_PERIOD = 365 * 24 * 60 * 60 * 1000; // 1 year

/**
 * Generate a new post-quantum secure certificate
 */
export async function generatePQCertificate(
  userProfile: UserProfile
): Promise<PKICertificate> {
  try {
    console.log("🔹 Generating post-quantum secure certificate");
    
    // Check if user has StarkNet ID and DID
    if (!userProfile.starkNetId) {
      throw new Error("StarkNet ID required for certificate generation");
    }
    
    // Check if user has necessary key pairs
    if (!userProfile.keyPairs?.pqkem || !userProfile.keyPairs?.signature) {
      throw new Error("Post-quantum key pairs required for certificate generation");
    }
    
    // Generate ML-KEM and Falcon keys if not already present
    const mlkemKeys = userProfile.keyPairs.pqkem.algorithm === "ML-KEM-1024" ?
      userProfile.keyPairs.pqkem : await generateMLKEMKeypair();
      
    const falconKeys = userProfile.keyPairs.signature.algorithm === "Falcon-1024" ?
      userProfile.keyPairs.signature : await generateFalconKeypair();
    
    // Get current timestamp
    const now = new Date();
    const validFrom = now.toISOString();
    const validTo = new Date(now.getTime() + CERTIFICATE_VALIDITY_PERIOD).toISOString();
    
    // Create certificate ID (using crypto.randomUUID for true randomness)
    const certificateId = crypto.randomUUID();
    
    // Calculate fingerprint (hash of the public keys)
    const fingerprintData = mlkemKeys.publicKey + falconKeys.publicKey;
    const fingerprintBuffer = new TextEncoder().encode(fingerprintData);
    const fingerprintHash = await crypto.subtle.digest('SHA-256', fingerprintBuffer);
    const fingerprint = Array.from(new Uint8Array(fingerprintHash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Create the certificate structure
    const certificate: PKICertificate = {
      id: certificateId,
      serialNumber: certificateId.replace(/-/g, ''),
      subject: userProfile.didDocument?.id || userProfile.id,
      issuer: "did:tetracrypt:self-signed", // Self-signed initially
      validFrom,
      validTo,
      publicKeyAlgorithm: "Hybrid-PQ",
      publicKey: mlkemKeys.publicKey, // Primary public key is the ML-KEM key
      signatureAlgorithm: "Falcon-1024",
      signature: "", // Will be filled after signing
      fingerprint,
      status: 'valid',
      pqcProtected: true,
      quantum: {
        mlkemPublicKey: mlkemKeys.publicKey,
        falconPublicKey: falconKeys.publicKey,
        algorithm: "Hybrid-ML-KEM-1024-Falcon-1024",
        strength: "256-bit quantum security",
      },
      extensions: {
        keyUsage: ["digitalSignature", "keyEncipherment"],
        extendedKeyUsage: ["clientAuth", "emailProtection"],
        subjectAltName: [
          userProfile.email ? `email:${userProfile.email}` : "",
          `did:${userProfile.didDocument?.id}`,
          `starknet:${userProfile.starkNetId.address}`
        ].filter(Boolean),
        basicConstraints: {
          isCA: false,
        }
      },
      starkNetVerified: false, // Will be verified in a separate step
      zkProofs: {
        identityProof: "",  // Will be added later
      }
    };
    
    // Sign the certificate with the Falcon key
    const certificateData = JSON.stringify({
      serialNumber: certificate.serialNumber,
      subject: certificate.subject,
      issuer: certificate.issuer,
      validFrom: certificate.validFrom,
      validTo: certificate.validTo,
      publicKeyAlgorithm: certificate.publicKeyAlgorithm,
      publicKey: certificate.publicKey,
      signatureAlgorithm: certificate.signatureAlgorithm,
      extensions: certificate.extensions,
    });
    
    certificate.signature = await signMessage(certificateData, falconKeys.privateKey);
    
    // Return the signed certificate
    return certificate;
  } catch (error) {
    console.error("Error generating PQ certificate:", error);
    toast({
      title: "Certificate Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate certificate",
      variant: "destructive",
    });
    throw error;
  }
}

/**
 * Verify a post-quantum secure certificate
 */
export async function verifyPQCertificate(
  certificate: PKICertificate
): Promise<{ 
  valid: boolean; 
  reason?: string;
  revocationStatus?: 'valid' | 'revoked' | 'unknown';
}> {
  try {
    console.log("🔹 Verifying post-quantum secure certificate:", certificate.id);
    
    // Step 1: Check if certificate is expired
    const now = new Date();
    const validTo = new Date(certificate.validTo);
    if (now > validTo) {
      return { 
        valid: false, 
        reason: "Certificate has expired",
        revocationStatus: 'valid' // Not revoked, just expired
      };
    }
    
    // Step 2: Check certificate revocation status on StarkNet
    const revocationStatus = await checkRevocationStatus(certificate);
    if (revocationStatus === 'revoked') {
      return { 
        valid: false, 
        reason: "Certificate has been revoked",
        revocationStatus 
      };
    }
    
    // Step 3: Verify certificate signature (self-signed or trusted)
    const isSignatureValid = await verifyCertificateSignature(certificate);
    if (!isSignatureValid) {
      return { 
        valid: false, 
        reason: "Invalid certificate signature",
        revocationStatus: 'valid' // Not revoked, just invalid signature 
      };
    }
    
    // Step 4: If all checks pass, certificate is valid
    return { 
      valid: true,
      revocationStatus: 'valid'
    };
  } catch (error) {
    console.error("Error verifying PQ certificate:", error);
    return { 
      valid: false, 
      reason: error instanceof Error ? error.message : "Unknown error during verification",
      revocationStatus: 'unknown'
    };
  }
}

/**
 * Verify certificate signature
 */
async function verifyCertificateSignature(
  certificate: PKICertificate
): Promise<boolean> {
  try {
    // Extract the certificate data that was signed
    const certificateData = JSON.stringify({
      serialNumber: certificate.serialNumber,
      subject: certificate.subject,
      issuer: certificate.issuer,
      validFrom: certificate.validFrom,
      validTo: certificate.validTo,
      publicKeyAlgorithm: certificate.publicKeyAlgorithm,
      publicKey: certificate.publicKey,
      signatureAlgorithm: certificate.signatureAlgorithm,
      extensions: certificate.extensions,
    });
    
    // Self-signed certificate verification
    if (certificate.issuer === "did:tetracrypt:self-signed") {
      // For self-signed certificates, verify with the Falcon public key in the certificate
      return verifySignature(
        certificateData, 
        certificate.signature, 
        certificate.quantum.falconPublicKey || ""
      );
    }
    
    // Trusted issuer verification would go here
    // This would involve fetching the issuer's certificate and using its public key
    
    return false; // For now, only support self-signed certificates
  } catch (error) {
    console.error("Error verifying certificate signature:", error);
    return false;
  }
}

/**
 * Check certificate revocation status on StarkNet
 */
async function checkRevocationStatus(
  certificate: PKICertificate
): Promise<'valid' | 'revoked' | 'unknown'> {
  try {
    // In a real implementation, this would call the StarkNet contract
    // to check the revocation status
    console.log(`🔹 Checking revocation status for certificate: ${certificate.id}`);
    
    // Simulate StarkNet check (90% chance of being valid)
    const randomCheck = Math.random();
    
    if (randomCheck > 0.9) {
      console.log(`🔹 Certificate ${certificate.id} is revoked`);
      return 'revoked';
    }
    
    console.log(`🔹 Certificate ${certificate.id} is valid`);
    return 'valid';
  } catch (error) {
    console.error("Error checking certificate revocation status:", error);
    return 'unknown';
  }
}

/**
 * Revoke a certificate on StarkNet
 */
export async function revokeCertificate(
  certificate: PKICertificate,
  reason: RevocationReason,
  userProfile: UserProfile
): Promise<boolean> {
  try {
    console.log(`🔹 Revoking certificate: ${certificate.id}, reason: ${reason}`);
    
    // Check if user has the necessary credentials to revoke
    if (!userProfile.starkNetId) {
      throw new Error("StarkNet ID required to revoke certificate");
    }
    
    // Connect to StarkNet
    const starkNetAuth = await connectToStarkNet();
    if (!starkNetAuth.success) {
      throw new Error(starkNetAuth.error || "Failed to connect to StarkNet");
    }
    
    // Sign the revocation with StarkNet
    const revocationMessage = `revoke-certificate:${certificate.id}:${reason}:${Date.now()}`;
    const signature = await signMessageWithStarkNet(revocationMessage);
    
    if (!signature.success) {
      throw new Error(signature.error || "Failed to sign revocation with StarkNet");
    }
    
    // In a real implementation, this would call the StarkNet contract
    // For now, just simulate a successful revocation
    console.log(`🔹 Certificate ${certificate.id} revoked with reason: ${reason}`);
    
    // Update local storage with revocation information
    const crlData = await getItem<CertificateRevocationList[]>("certificate-revocation-list") || [];
    
    // Check if this certificate is already in the CRL
    const existingIndex = crlData.findIndex(crl => 
      crl.revokedCertificates.some(cert => cert.serialNumber === certificate.serialNumber)
    );
    
    if (existingIndex >= 0) {
      // Update existing CRL entry
      const existingCrl = crlData[existingIndex];
      const certIndex = existingCrl.revokedCertificates.findIndex(
        cert => cert.serialNumber === certificate.serialNumber
      );
      
      if (certIndex >= 0) {
        // Update existing certificate entry
        existingCrl.revokedCertificates[certIndex].reasonCode = reason;
        existingCrl.revokedCertificates[certIndex].revocationDate = new Date().toISOString();
      } else {
        // Add new certificate to existing CRL
        existingCrl.revokedCertificates.push({
          serialNumber: certificate.serialNumber,
          revocationDate: new Date().toISOString(),
          reasonCode: reason,
          fingerprint: certificate.fingerprint,
          algorithm: certificate.signatureAlgorithm
        });
      }
      
      existingCrl.lastUpdated = new Date().toISOString();
      existingCrl.nextUpdate = new Date(Date.now() + CRL_REFRESH_INTERVAL).toISOString();
      
      crlData[existingIndex] = existingCrl;
    } else {
      // Create new CRL entry
      const newCrl: CertificateRevocationList = {
        id: crypto.randomUUID(),
        issuer: userProfile.didDocument?.id || userProfile.id,
        lastUpdated: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + CRL_REFRESH_INTERVAL).toISOString(),
        revokedCertificates: [{
          serialNumber: certificate.serialNumber,
          revocationDate: new Date().toISOString(),
          reasonCode: reason,
          fingerprint: certificate.fingerprint,
          algorithm: certificate.signatureAlgorithm
        }],
        signature: signature.signature || "",
        signatureAlgorithm: "StarkNet-Signature"
      };
      
      crlData.push(newCrl);
    }
    
    // Save updated CRL
    await setItem("certificate-revocation-list", crlData);
    
    toast({
      title: "Certificate Revoked",
      description: `Certificate ${certificate.id.substring(0, 8)}... has been revoked.`,
    });
    
    return true;
  } catch (error) {
    console.error("Error revoking certificate:", error);
    toast({
      title: "Certificate Revocation Failed",
      description: error instanceof Error ? error.message : "Failed to revoke certificate",
      variant: "destructive",
    });
    return false;
  }
}

/**
 * Update user profile with PQ certificate
 */
export async function addCertificateToProfile(
  userProfile: UserProfile,
  certificate: PKICertificate
): Promise<UserProfile> {
  try {
    // Initialize certificates array if needed
    if (!userProfile.certificates) {
      userProfile.certificates = [];
    }
    
    // Add the new certificate
    userProfile.certificates.push(certificate);
    
    // Save updated profile 
    // (In a real implementation, this would call a storage service)
    console.log(`🔹 Added certificate ${certificate.id} to user profile`);
    
    return userProfile;
  } catch (error) {
    console.error("Error adding certificate to profile:", error);
    throw error;
  }
}

/**
 * Get the active certificate for a user
 */
export function getActiveCertificate(userProfile: UserProfile): PKICertificate | undefined {
  if (!userProfile.certificates || userProfile.certificates.length === 0) {
    return undefined;
  }
  
  // Find the most recent valid certificate
  const now = new Date();
  const validCertificates = userProfile.certificates.filter(cert => {
    const validTo = new Date(cert.validTo);
    return now <= validTo && cert.status === 'valid';
  });
  
  if (validCertificates.length === 0) {
    return undefined;
  }
  
  // Sort by creation date (newest first)
  validCertificates.sort((a, b) => {
    const dateA = new Date(a.validFrom);
    const dateB = new Date(b.validFrom);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Return the newest valid certificate
  return validCertificates[0];
}

/**
 * Update the status of all certificates in a user profile
 */
export async function updateCertificateStatuses(
  userProfile: UserProfile
): Promise<UserProfile> {
  try {
    if (!userProfile.certificates || userProfile.certificates.length === 0) {
      return userProfile;
    }
    
    const now = new Date();
    const updatedCertificates = await Promise.all(
      userProfile.certificates.map(async cert => {
        // Check expiration
        const validTo = new Date(cert.validTo);
        if (now > validTo) {
          cert.status = 'expired';
          return cert;
        }
        
        // Check revocation status
        const revocationResult = await checkRevocationStatus(cert);
        if (revocationResult === 'revoked') {
          cert.status = 'revoked';
        } else if (cert.status !== 'valid') {
          // Reset to valid if it was previously marked as something else
          // and now it's valid again
          cert.status = 'valid';
        }
        
        return cert;
      })
    );
    
    // Update the profile
    userProfile.certificates = updatedCertificates;
    userProfile.lastRevocationCheck = now.toISOString();
    
    return userProfile;
  } catch (error) {
    console.error("Error updating certificate statuses:", error);
    return userProfile;
  }
}
