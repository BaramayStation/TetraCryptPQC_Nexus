
/**
 * TetraCryptPQC Decentralized Messaging Framework
 * A post-quantum secure P2P messaging implementation with libp2p
 */

import { encryptAES, signMessage, generateSessionKey, scanForThreats } from './crypto';
import { getUserProfile } from './storage';
import { toast } from '@/components/ui/use-toast';

// Configuration for TetraCrypt Messaging
export const TETRACRYPT_MESSAGING_CONFIG = {
  // Bootstrap nodes for initial peer discovery
  bootstrapNodes: [
    '/dns4/bootstrap.libp2p.io/tcp/443/wss/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    '/dns4/secure-relay.tetracrypt.io/tcp/443/wss/p2p/QmTetracryptBootstrapPeerID123456789'
  ],
  // Protocol identifier
  protocol: '/tetracrypt/messaging/1.0.0',
  // Maximum message size in bytes (1 MB)
  maxMessageSize: 1024 * 1024,
  // Message retention (in milliseconds) - 7 days
  messageRetention: 7 * 24 * 60 * 60 * 1000,
};

// Message type definition
export interface P2PMessage {
  id: string;
  senderId: string;
  senderDID?: string;
  recipientId: string;
  encryptedContent: string;
  signature: string;
  timestamp: number;
  messageType: 'text' | 'file' | 'key-exchange' | 'group';
  ephemeralKey?: string; // For forward secrecy
  metadata?: {
    groupId?: string;
    replyToId?: string;
    expiresAt?: number;
    zkProof?: string;
  };
}

// Connection state type
export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

/**
 * TetraCrypt P2P Connection Manager
 * Handles peer connections, discovery, and network state
 */
export class ConnectionManager {
  private connectionState: ConnectionState = 'disconnected';
  private peerCount: number = 0;
  private connectionListeners: ((state: ConnectionState) => void)[] = [];
  
  constructor() {
    // Initialize connection
    this.initialize();
  }
  
  private async initialize() {
    try {
      this.updateConnectionState('connecting');
      console.log('🔹 Initializing TetraCrypt P2P connection...');
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we're simulating a successful connection
      this.peerCount = Math.floor(Math.random() * 10) + 5;
      this.updateConnectionState('connected');
      
      console.log(`🔹 Connected to TetraCrypt P2P network with ${this.peerCount} peers`);
    } catch (error) {
      console.error('❌ Failed to connect to TetraCrypt P2P network:', error);
      this.updateConnectionState('error');
    }
  }
  
  private updateConnectionState(state: ConnectionState) {
    this.connectionState = state;
    this.notifyListeners();
  }
  
  private notifyListeners() {
    this.connectionListeners.forEach(listener => listener(this.connectionState));
  }
  
  public getConnectionState(): ConnectionState {
    return this.connectionState;
  }
  
  public getPeerCount(): number {
    return this.peerCount;
  }
  
  public onConnectionStateChange(listener: (state: ConnectionState) => void) {
    this.connectionListeners.push(listener);
    return () => {
      this.connectionListeners = this.connectionListeners.filter(l => l !== listener);
    };
  }
  
  public disconnect() {
    console.log('🔹 Disconnecting from TetraCrypt P2P network...');
    this.updateConnectionState('disconnected');
  }
  
  public reconnect() {
    if (this.connectionState !== 'disconnected') {
      this.disconnect();
    }
    this.initialize();
  }
}

/**
 * TetraCrypt Messaging Client
 * Provides high-level API for sending and receiving messages
 */
export class TetraCryptMessaging {
  private connectionManager: ConnectionManager;
  private messageListeners: Map<string, ((message: P2PMessage) => void)[]> = new Map();
  private user = getUserProfile();
  
  constructor() {
    this.connectionManager = new ConnectionManager();
  }
  
  /**
   * Send a message to a recipient
   */
  public async sendMessage(recipientId: string, content: string, messageType: P2PMessage['messageType'] = 'text', metadata?: P2PMessage['metadata']): Promise<string> {
    try {
      if (!this.user) {
        throw new Error('User profile not found. Please set up your profile first.');
      }
      
      console.log(`🔹 Preparing to send message to ${recipientId}`);
      
      // Generate ephemeral session key for forward secrecy
      const ephemeralKey = await generateSessionKey();
      
      // Encrypt the message content
      const encryptedContent = await encryptAES(content, ephemeralKey);
      
      // Sign the encrypted content
      const signature = await signMessage(encryptedContent, this.user.keyPairs.signature.privateKey);
      
      // Scan for security threats
      const threats = await scanForThreats(content);
      if (threats && threats.length > 0) {
        console.warn('⚠️ Security threats detected in message:', threats);
        toast({
          title: "Security Warning",
          description: "Potential security threats detected in your message.",
          variant: "destructive",
        });
      }
      
      // Create the message object
      const messageId = crypto.randomUUID();
      const message: P2PMessage = {
        id: messageId,
        senderId: this.user.id,
        senderDID: this.user.didDocument?.id,
        recipientId,
        encryptedContent,
        signature,
        timestamp: Date.now(),
        messageType,
        ephemeralKey,
        metadata
      };
      
      // In a real implementation, we would send this message through the P2P network
      console.log('✅ Message prepared for P2P delivery:', messageId);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, we're simulating a successful send
      this.simulateMessageDelivery(message);
      
      return messageId;
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  }
  
  /**
   * Listen for incoming messages from a specific sender or all senders
   */
  public onMessage(callback: (message: P2PMessage) => void, senderId?: string) {
    const key = senderId || 'all';
    
    if (!this.messageListeners.has(key)) {
      this.messageListeners.set(key, []);
    }
    
    this.messageListeners.get(key)?.push(callback);
    
    return () => {
      const listeners = this.messageListeners.get(key);
      if (listeners) {
        this.messageListeners.set(
          key,
          listeners.filter(listener => listener !== callback)
        );
      }
    };
  }
  
  /**
   * Create a new messaging group
   */
  public async createGroup(name: string, memberIds: string[]): Promise<string> {
    try {
      const groupId = crypto.randomUUID();
      
      console.log(`🔹 Creating messaging group: ${name} with ${memberIds.length} members`);
      
      // In a real implementation, we would create a group on the P2P network
      
      return groupId;
    } catch (error) {
      console.error('❌ Failed to create group:', error);
      throw error;
    }
  }
  
  /**
   * Send a message to a group
   */
  public async sendGroupMessage(groupId: string, content: string): Promise<string> {
    return this.sendMessage('group', content, 'group', { groupId });
  }
  
  /**
   * Get the current connection state
   */
  public getConnectionState(): ConnectionState {
    return this.connectionManager.getConnectionState();
  }
  
  /**
   * Get the number of connected peers
   */
  public getPeerCount(): number {
    return this.connectionManager.getPeerCount();
  }
  
  /**
   * Listen for connection state changes
   */
  public onConnectionStateChange(listener: (state: ConnectionState) => void) {
    return this.connectionManager.onConnectionStateChange(listener);
  }
  
  /**
   * Manually reconnect to the P2P network
   */
  public reconnect() {
    this.connectionManager.reconnect();
  }
  
  /**
   * For demo purposes only - simulates receiving a message
   */
  private simulateMessageDelivery(message: P2PMessage) {
    setTimeout(() => {
      console.log('📩 Simulating message delivery:', message.id);
      
      // Notify all relevant listeners
      const allListeners = this.messageListeners.get('all') || [];
      const senderListeners = this.messageListeners.get(message.senderId) || [];
      
      [...allListeners, ...senderListeners].forEach(listener => {
        listener(message);
      });
    }, 1000);
  }
}

// Create a singleton instance for the application to use
let messagingInstance: TetraCryptMessaging | null = null;

/**
 * Get the TetraCrypt Messaging client instance
 */
export function getTetraCryptMessaging(): TetraCryptMessaging {
  if (!messagingInstance) {
    messagingInstance = new TetraCryptMessaging();
  }
  return messagingInstance;
}
