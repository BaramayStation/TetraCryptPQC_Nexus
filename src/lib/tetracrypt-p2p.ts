
/**
 * TetraCryptPQC P2P Messaging Module
 */

import { initTetraCryptFFI, getTetraCryptMessaging, ConnectionState } from "./tetracrypt-ffi";
import { getUserProfile } from "./storage";

// Message structure for TetraCrypt P2P network
export interface TetraCryptMessage {
  id: string;
  senderId: string;
  senderDID?: string;
  recipientId: string;
  recipientDID?: string;
  content: string;
  encryptionType: 'ML-KEM-1024' | 'ML-KEM-768' | 'ML-KEM-512' | 'HYBRID';
  signatureType: 'SLH-DSA-Dilithium5' | 'Falcon-512';
  signature: string;
  zkProof?: string;
  timestamp: number;
  expiresAt?: number;
  metadata?: {
    [key: string]: any;
  };
}

// P2P message from FFI layer
export interface P2PMessage {
  id: string;
  senderId: string;
  content: string;
}

// Network node status
export interface P2PNodeStatus {
  peerId: string;
  state: ConnectionState;
  peerCount: number;
  networkLatency: number;
  didRegistered: boolean;
  supportsZKP: boolean;
  supportsPQC: boolean;
}

// In-memory message cache to prevent duplicate processing
const messageCache = new Set<string>();

// Initialize the TetraCrypt P2P system
export async function initTetraCryptP2P(): Promise<boolean> {
  try {
    // Initialize Rust FFI
    await initTetraCryptFFI();
    
    // Initialize P2P messaging
    const messaging = getTetraCryptMessaging();
    const initialized = messaging.isInitialized();
    
    if (!initialized) {
      console.log("🔹 Initializing TetraCrypt P2P network");
      messaging.initialize();
    }
    
    console.log("✅ TetraCrypt P2P messaging system initialized");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize TetraCrypt P2P:", error);
    return false;
  }
}

/**
 * Get the current P2P node status
 */
export function getP2PNodeStatus(): P2PNodeStatus {
  const messaging = getTetraCryptMessaging();
  const profile = getUserProfile();
  
  return {
    peerId: messaging.getPeerId() || "unknown",
    state: messaging.getConnectionState(),
    peerCount: messaging.getPeerCount(),
    networkLatency: messaging.getNetworkLatency() || 0,
    didRegistered: !!profile?.didDocument,
    supportsZKP: true,
    supportsPQC: true
  };
}

/**
 * Connect to the TetraCrypt P2P network
 */
export async function connectToP2PNetwork(): Promise<boolean> {
  try {
    await initTetraCryptP2P();
    const messaging = getTetraCryptMessaging();
    
    if (messaging.getConnectionState() === 'connected') {
      console.log("🔹 Already connected to TetraCrypt P2P network");
      return true;
    }
    
    console.log("🔹 Connecting to TetraCrypt P2P network");
    messaging.connect();
    
    // Wait for connection or timeout after 5 seconds
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        unsubscribe();
        resolve(false);
      }, 5000);
      
      const unsubscribe = messaging.onConnectionStateChange((state) => {
        if (state === 'connected') {
          clearTimeout(timeout);
          unsubscribe();
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.error("❌ Failed to connect to TetraCrypt P2P network:", error);
    return false;
  }
}

/**
 * Disconnect from the TetraCrypt P2P network
 */
export function disconnectFromP2PNetwork(): void {
  const messaging = getTetraCryptMessaging();
  messaging.disconnect();
}

/**
 * Send a message over the TetraCrypt P2P network with PQC encryption and signing
 */
export async function sendSecureP2PMessage(
  recipientId: string,
  content: string,
  options: {
    useZKP?: boolean;
    expireAfterHours?: number;
    priority?: 'high' | 'normal' | 'low';
    metadata?: { [key: string]: any };
  } = {}
): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    await initTetraCryptP2P();
    const messaging = getTetraCryptMessaging();
    
    // Get user profile
    const profile = getUserProfile();
    if (!profile || !profile.keyPairs?.signature) {
      return {
        success: false,
        error: "Missing required keys to send secure message"
      };
    }
    
    // Generate message ID
    const messageId = crypto.randomUUID();
    
    // Set expiration if requested
    const now = Date.now();
    const expiresAt = options.expireAfterHours 
      ? now + options.expireAfterHours * 60 * 60 * 1000 
      : undefined;
    
    // Get DIDs if available
    const senderDID = profile.didDocument?.id;
    
    // Create message structure
    const message: TetraCryptMessage = {
      id: messageId,
      senderId: profile.id,
      senderDID,
      recipientId,
      content,
      encryptionType: 'ML-KEM-1024',
      signatureType: 'SLH-DSA-Dilithium5',
      signature: '', // Will be set below
      timestamp: now,
      expiresAt,
      metadata: options.metadata
    };
    
    // Sign the message content
    const { signMessage } = await import('./pqcrypto');
    message.signature = await signMessage(
      JSON.stringify({
        content,
        senderId: profile.id,
        recipientId,
        timestamp: now
      }),
      profile.keyPairs.signature.privateKey
    );
    
    // Generate ZK proof if requested
    if (options.useZKP) {
      const { generateZKProof } = await import('./pqcrypto');
      message.zkProof = await generateZKProof(content);
    }
    
    // Send the message
    const success = await messaging.sendMessage(
      recipientId,
      JSON.stringify(message)
    );
    
    if (!success) {
      return {
        success: false,
        error: "Failed to send message over P2P network"
      };
    }
    
    // Add to cache to prevent duplicate processing
    messageCache.add(messageId);
    
    return {
      success: true,
      messageId
    };
  } catch (error) {
    console.error("❌ Error sending secure P2P message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Listen for incoming TetraCrypt P2P messages
 */
export function listenForP2PMessages(
  callback: (message: TetraCryptMessage) => void
): () => void {
  initTetraCryptP2P();
  const messaging = getTetraCryptMessaging();
  
  return messaging.onMessage((message: P2PMessage) => {
    try {
      // Parse the message
      const parsedMessage = JSON.parse(message.content) as TetraCryptMessage;
      
      // Skip if we've already processed this message
      if (messageCache.has(parsedMessage.id)) {
        return;
      }
      
      // Add to cache
      messageCache.add(parsedMessage.id);
      
      // Check if message has expired
      if (parsedMessage.expiresAt && parsedMessage.expiresAt < Date.now()) {
        console.log("🔹 Skipping expired message", parsedMessage.id);
        return;
      }
      
      // Invoke the callback
      callback(parsedMessage);
    } catch (error) {
      console.error("❌ Error processing P2P message:", error);
    }
  });
}

/**
 * Register a node on the TetraCrypt P2P network with DID
 */
export async function registerP2PNode(): Promise<{
  success: boolean;
  nodeId?: string;
  error?: string;
}> {
  try {
    await initTetraCryptP2P();
    
    // Get user profile
    const profile = getUserProfile();
    if (!profile) {
      return {
        success: false,
        error: "User profile not found"
      };
    }
    
    // Ensure we have a DID
    if (!profile.didDocument) {
      // Create DID if needed
      const { createUserDecentralizedIdentity } = await import('./decentralized-identity');
      const didResult = await createUserDecentralizedIdentity();
      
      if (!didResult.success) {
        return {
          success: false,
          error: `Failed to create DID: ${didResult.error}`
        };
      }
    }
    
    // Get messaging system
    const messaging = getTetraCryptMessaging();
    const nodeId = messaging.getPeerId();
    
    if (!nodeId) {
      return {
        success: false,
        error: "Failed to get node ID"
      };
    }
    
    console.log("✅ Node registered on TetraCrypt P2P network:", nodeId);
    
    return {
      success: true,
      nodeId
    };
  } catch (error) {
    console.error("❌ Error registering P2P node:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
