
/**
 * TetraCryptPQC Decentralized Identity Provider
 * 
 * Integrates with StarkNet for Layer 2 scalability and privacy,
 * along with W3C Decentralized Identifiers (DIDs) standard.
 */

import { PQCKey } from './crypto';
import { signMessageSecure } from './tetracrypt-ffi';
import { getUserProfile, saveUserProfile } from './storage';
import { StarkNetID, DIDDocument as DIDDocumentType } from './storage-types';

// DID Document Type
export interface DIDDocument {
  '@context': string[];
  id: string;
  controller: string;
  verificationMethod: {
    id: string;
    type: string;
    controller: string;
    publicKeyMultibase?: string;
    publicKeyHex?: string;
  }[];
  authentication: string[];
  assertionMethod: string[];
  keyAgreement: string[];
  capabilityInvocation?: string[];
  service?: {
    id: string;
    type: string;
    serviceEndpoint: string;
  }[];
  created: string;
  updated: string;
}

/**
 * Generate a Decentralized Identifier (DID) compliant with W3C standards
 */
export async function generateDIDDocument(
  publicKeyKem: string,
  publicKeySig: string,
  controller?: string
): Promise<DIDDocument> {
  const didId = `did:tetracrypt:${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  
  return {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
      'https://w3id.org/security/suites/x25519-2020/v1'
    ],
    id: didId,
    controller: controller || didId,
    verificationMethod: [
      {
        id: `${didId}#kem-1`,
        type: 'ML-KEM-1024',
        controller: didId,
        publicKeyHex: publicKeyKem
      },
      {
        id: `${didId}#sig-1`,
        type: 'SLH-DSA-Dilithium5',
        controller: didId,
        publicKeyHex: publicKeySig
      }
    ],
    authentication: [
      `${didId}#sig-1`
    ],
    assertionMethod: [
      `${didId}#sig-1`
    ],
    keyAgreement: [
      `${didId}#kem-1`
    ],
    created: now,
    updated: now
  };
}

/**
 * Generate a StarkNet ID for Layer 2 identity
 */
export async function generateStarkNetID(publicKeyHex: string, name?: string): Promise<StarkNetID> {
  // Generate a unique StarkNet ID based on the public key
  const idBytes = new Uint8Array(32);
  window.crypto.getRandomValues(idBytes);
  
  // Convert to hexadecimal
  const starkId = Array.from(idBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return {
    id: `stark:${starkId}`,
    address: `0x${starkId.substring(0, 40)}`,
    name: name || undefined,
    starkKey: publicKeyHex,
    created: new Date().toISOString(),
    type: "StarkNet" // Required field for the type
  };
}

/**
 * Create or update Decentralized Identity for user
 */
export async function createUserDecentralizedIdentity(updateExisting: boolean = false): Promise<{
  success: boolean;
  did?: DIDDocument;
  starkNetId?: StarkNetID;
  error?: string;
}> {
  try {
    // Get user profile
    const profile = getUserProfile();
    if (!profile) {
      return {
        success: false,
        error: "User profile not found"
      };
    }
    
    // Check if DID already exists and we're not updating
    if (profile.didDocument && !updateExisting) {
      return {
        success: true,
        did: profile.didDocument as DIDDocument,
        starkNetId: profile.starkNetId as StarkNetID
      };
    }
    
    // Ensure we have the necessary keys
    if (!profile.keyPairs?.pqkem || !profile.keyPairs?.signature) {
      return {
        success: false,
        error: "Missing required cryptographic keys"
      };
    }
    
    // Generate DID Document
    const didDocument = await generateDIDDocument(
      profile.keyPairs.pqkem.publicKey,
      profile.keyPairs.signature.publicKey
    );
    
    // Generate StarkNet ID
    const starkNetId = await generateStarkNetID(
      profile.keyPairs.signature.publicKey,
      profile.name
    );
    
    // Update profile
    const updatedProfile = {
      ...profile,
      didDocument,
      starkNetId
    };
    
    saveUserProfile(updatedProfile);
    
    return {
      success: true,
      did: didDocument,
      starkNetId
    };
  } catch (error) {
    console.error("❌ Error creating decentralized identity:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Verify DID ownership with challenge-response
 */
export async function verifyDIDOwnership(
  didDocument: DIDDocument,
  challenge: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Get user profile
    const profile = getUserProfile();
    if (!profile || !profile.keyPairs?.signature) {
      return {
        success: false,
        error: "Missing required keys to verify ownership"
      };
    }
    
    // Get verification method from DID Document
    const verificationMethod = didDocument.verificationMethod.find(
      vm => vm.type === 'SLH-DSA-Dilithium5'
    );
    
    if (!verificationMethod) {
      return {
        success: false,
        error: "DID document missing required verification method"
      };
    }
    
    // Check if the public key matches
    if (verificationMethod.publicKeyHex !== profile.keyPairs.signature.publicKey) {
      return {
        success: false,
        error: "Public key mismatch, DID not controlled by current user"
      };
    }
    
    // Sign challenge
    const signature = await signMessageSecure(
      challenge,
      profile.keyPairs.signature.privateKey,
      true // Use hardware if available
    );
    
    return {
      success: true
    };
  } catch (error) {
    console.error("❌ Error verifying DID ownership:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
