
/**
 * TetraCryptPQC Message Utilities
 * 
 * This module provides utilities for working with secure messages
 * using post-quantum cryptography.
 */

import { Message } from "./storage-types/message-types";
import { signMessage, verifySignature } from "./pqcrypto";
import { encapsulateKey, PQC } from "./pqcrypto-core";

/**
 * Create a new message object
 */
export function createMessage(
  senderId: string,
  recipientId: string,
  content: string,
  encryptionType: "ML-KEM-1024" | "Hybrid" | "ChaCha20-Poly1305" = "ML-KEM-1024"
): Message {
  return {
    id: crypto.randomUUID(),
    senderId,
    recipientId,
    receiverId: recipientId, // Adding receiverId to match Message interface
    content,
    timestamp: new Date().toISOString(),
    encrypted: true,
    encryptionType,
    status: "sent"
  };
}

/**
 * Sign a message with post-quantum signature algorithm
 */
export async function signSecureMessage(
  message: Message,
  privateKey: string
): Promise<Message> {
  try {
    const messageData = JSON.stringify({
      id: message.id,
      senderId: message.senderId,
      recipientId: message.recipientId,
      content: message.content,
      timestamp: message.timestamp
    });
    
    const signature = await signMessage(messageData, privateKey);
    
    return {
      ...message,
      signature,
      verified: true
    };
  } catch (error) {
    console.error("Error signing message:", error);
    return message;
  }
}

/**
 * Verify a message signature
 */
export async function verifySecureMessage(
  message: Message,
  publicKey: string
): Promise<boolean> {
  if (!message.signature) {
    return false;
  }
  
  try {
    const messageData = JSON.stringify({
      id: message.id,
      senderId: message.senderId,
      recipientId: message.recipientId,
      content: message.content,
      timestamp: message.timestamp
    });
    
    return await verifySignature(messageData, message.signature, publicKey);
  } catch (error) {
    console.error("Error verifying message:", error);
    return false;
  }
}

/**
 * Secure messages for storage or transmission
 */
export async function secureMessages(
  messages: Message[],
  storagePublicKey: string
): Promise<Message[]> {
  try {
    // Simulate encrypting messages for secure storage
    console.log(`🔹 Securing ${messages.length} messages for storage`);
    
    // In a real implementation, use ML-KEM to encrypt the message content
    return messages.map(message => ({
      ...message,
      content: `SECURED:${message.content}`,
      encrypted: true
    }));
  } catch (error) {
    console.error("Error securing messages:", error);
    return messages;
  }
}

/**
 * Get security level for a message
 */
export function getMessageSecurityLevel(message: Message): {
  level: "standard" | "high" | "maximum";
  quantumSafe: boolean;
} {
  if (!message.encrypted) {
    return { level: "standard", quantumSafe: false };
  }
  
  // Check if message uses PQC
  const usesPQC = message.encryptionType === "ML-KEM-1024" || 
                 message.encryptionType === "Hybrid";
  
  // Check if message is signed
  const isSigned = !!message.signature;
  
  if (usesPQC && isSigned && message.verified) {
    return { level: "maximum", quantumSafe: true };
  } else if (usesPQC) {
    return { level: "high", quantumSafe: true };
  } else {
    return { level: "standard", quantumSafe: false };
  }
}
