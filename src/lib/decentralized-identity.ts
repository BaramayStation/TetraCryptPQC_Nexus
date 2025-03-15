/**
 * TetraCryptPQC Decentralized Identity Module
 * 
 * Implements decentralized identity (DID) functionality using StarkNet
 * and zero-knowledge proofs for enhanced privacy and security.
 */

import { connectToStarkNet, signMessageWithStarkNet } from "@/services/StarkNetService";
import { UserProfile } from "./storage-types";
import { generateDID } from "./pqcrypto";
import { saveUserProfile } from "./storage";
import { toast } from "@/components/ui/use-toast";
import { StarkNetID } from "./storage-types";

// Export StarkNetID for other modules to use
export { StarkNetID } from './storage-types';

// Fix the createStarkNetId function to use the correct StarkNetID properties
function createStarkNetId(address: string, starkKey: string): StarkNetID {
  return {
    id: crypto.randomUUID(),
    type: "StarkNet",  // Required field
    address,
    starkKey,
    created: new Date().toISOString()
  };
}

/**
 * Generate a StarkNet ID for a user
 */
export async function generateStarkNetId(userProfile: UserProfile): Promise<UserProfile> {
  try {
    // Connect to StarkNet wallet
    const starkNetAuth = await connectToStarkNet();
    
    if (!starkNetAuth.success) {
      throw new Error(starkNetAuth.error || "Failed to connect to StarkNet");
    }
    
    // Create StarkNet ID
    const starkNetId = createStarkNetId(starkNetAuth.address!, starkNetAuth.publicKey!);
    
    // Update user profile
    userProfile.starkNetId = starkNetId;
    
    // Save user profile
    saveUserProfile(userProfile);
    
    toast({
      title: "StarkNet ID Generated",
      description: `Successfully generated StarkNet ID: ${starkNetId.id.substring(0, 8)}...`,
    });
    
    return userProfile;
  } catch (error) {
    console.error("Error generating StarkNet ID:", error);
    toast({
      title: "StarkNet ID Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate StarkNet ID",
      variant: "destructive",
    });
    
    throw error;
  }
}

/**
 * Sign a message with StarkNet
 */
export async function signMessageWithDID(message: string): Promise<string> {
  try {
    // Sign message with StarkNet
    const starkNetSignature = await signMessageWithStarkNet(message);
    
    if (!starkNetSignature.success) {
      throw new Error(starkNetSignature.error || "Failed to sign message with StarkNet");
    }
    
    return starkNetSignature.signature!;
  } catch (error) {
    console.error("Error signing message with StarkNet:", error);
    toast({
      title: "StarkNet Signature Failed",
      description: error instanceof Error ? error.message : "Failed to sign message with StarkNet",
      variant: "destructive",
    });
    
    throw error;
  }
}

/**
 * Generate a decentralized identity (DID) document
 */
export async function generateDIDDocument(userProfile: UserProfile): Promise<UserProfile> {
  try {
    // Check if user has StarkNet ID
    if (!userProfile.starkNetId) {
      throw new Error("StarkNet ID required to generate DID document");
    }
    
    // Check if user has key pairs
    if (!userProfile.keyPairs?.pqkem || !userProfile.keyPairs?.signature) {
      throw new Error("Post-quantum key pairs required to generate DID document");
    }
    
    // Generate DID document
    const didDocument = await generateDID(
      userProfile.keyPairs.pqkem.publicKey,
      userProfile.keyPairs.signature.publicKey
    );
    
    // Update user profile
    userProfile.didDocument = didDocument;
    
    // Save user profile
    saveUserProfile(userProfile);
    
    toast({
      title: "DID Document Generated",
      description: `Successfully generated DID document: ${didDocument.id.substring(0, 8)}...`,
    });
    
    return userProfile;
  } catch (error) {
    console.error("Error generating DID document:", error);
    toast({
      title: "DID Document Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate DID document",
      variant: "destructive",
    });
    
    throw error;
  }
}
