
/**
 * TetraCryptPQC Messaging Interface
 * Provides a common interface for messaging systems
 */

// Connection states
export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'error';

// Message types
export interface P2PMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;  // Add content property to fix error
  timestamp: number;
}

// TetraCrypt Messaging Interface
export interface TetraCryptMessaging {
  // Connection management
  reconnect: () => void;
  connect: () => void;  // Add missing method
  disconnect: () => void;  // Add missing method
  isInitialized: () => boolean;  // Add missing method
  initialize: () => void;  // Add missing method
  
  // Status methods
  getConnectionState: () => ConnectionState;
  getPeerCount: () => number;
  getPeerId: () => string | null;  // Add missing method
  getNetworkLatency: () => number;  // Add missing method
  
  // Messaging methods
  sendMessage: (recipientId: string, message: string) => Promise<boolean>;
  broadcastMessage: (message: string) => Promise<boolean>;
  
  // Event listeners
  onMessage: (callback: (message: P2PMessage) => void) => () => void;
  onConnectionStateChange: (callback: (state: ConnectionState) => void) => () => void;
}

// Get the TetraCrypt messaging implementation
export function getTetraCryptMessaging(): TetraCryptMessaging {
  // Singleton instance
  let instance: TetraCryptMessaging | null = null;
  
  if (!instance) {
    // This is a simplified implementation for development
    let connectionState: ConnectionState = 'disconnected';
    let peerCount = 0;
    let peerId: string | null = null;
    let initialized = false;
    const messageListeners: ((message: P2PMessage) => void)[] = [];
    const stateListeners: ((state: ConnectionState) => void)[] = [];
    
    instance = {
      initialize: () => {
        initialized = true;
        peerId = `tetracrypt-${Math.random().toString(36).substring(2, 10)}`;
      },
      
      isInitialized: () => initialized,
      
      connect: () => {
        if (connectionState === 'disconnected') {
          connectionState = 'connecting';
          notifyStateListeners();
          
          // Simulate connection delay
          setTimeout(() => {
            connectionState = 'connected';
            peerCount = Math.floor(Math.random() * 10) + 5;
            notifyStateListeners();
          }, 1500);
        }
      },
      
      disconnect: () => {
        connectionState = 'disconnected';
        peerCount = 0;
        notifyStateListeners();
      },
      
      reconnect: () => {
        connectionState = 'reconnecting';
        notifyStateListeners();
        
        // Simulate reconnection
        setTimeout(() => {
          connectionState = 'connected';
          peerCount = Math.floor(Math.random() * 10) + 5;
          notifyStateListeners();
        }, 2000);
      },
      
      getConnectionState: () => connectionState,
      
      getPeerCount: () => peerCount,
      
      getPeerId: () => peerId,
      
      getNetworkLatency: () => Math.floor(Math.random() * 150) + 50,
      
      sendMessage: async (recipientId, message) => {
        if (connectionState !== 'connected') {
          return false;
        }
        
        // Simulate message delivery
        setTimeout(() => {
          const response: P2PMessage = {
            id: `msg-${Math.random().toString(36).substring(2, 10)}`,
            senderId: recipientId,
            recipientId: peerId || 'unknown',
            content: `Response to: ${message.substring(0, 20)}...`,
            timestamp: Date.now()
          };
          
          messageListeners.forEach(listener => listener(response));
        }, 1000);
        
        return true;
      },
      
      broadcastMessage: async (message) => {
        if (connectionState !== 'connected') {
          return false;
        }
        
        return true;
      },
      
      onMessage: (callback) => {
        messageListeners.push(callback);
        return () => {
          const index = messageListeners.indexOf(callback);
          if (index >= 0) {
            messageListeners.splice(index, 1);
          }
        };
      },
      
      onConnectionStateChange: (callback) => {
        stateListeners.push(callback);
        callback(connectionState); // Notify immediately
        return () => {
          const index = stateListeners.indexOf(callback);
          if (index >= 0) {
            stateListeners.splice(index, 1);
          }
        };
      }
    };
    
    function notifyStateListeners() {
      stateListeners.forEach(listener => listener(connectionState));
    }
  }
  
  return instance;
}
