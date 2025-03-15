
/**
 * TetraCryptPQC Storage Utility
 * Provides secure storage mechanisms for cryptographic keys and messages
 */

// User profile type definition
export interface UserProfile {
  id: string;
  name: string;
  starknetAddress?: string;
  sessionKey?: string;
  keyPairs: {
    pqkem: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
    };
    signature: {
      algorithm: string;
      publicKey: string;
      privateKey: string;
      strength: string;
      standard: string;
      created: string;
    };
    kyber?: {
      publicKey: string;
      privateKey: string;
    };
    falcon?: {
      publicKey: string;
      privateKey: string;
    };
  };
  didDocument?: any;
  starkNetId?: any;  // Add starkNetId property to fix errors
  qkdInfo?: any;
  hsmInfo?: any;
  createdAt: string;
}

// Contact type definition
export interface Contact {
  id: string;
  name: string;
  publicKey: string;
  publicKeys?: {
    kyber?: string;
    falcon?: string;
  };
  unreadCount?: number;
  didDocument?: any;
  lastMessage?: string;
  lastMessageTime?: string;
}

// Message type definition
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  encryptedContent?: string;
  encrypted: boolean;
  signature?: string;
  status?: 'sent' | 'delivered' | 'read';
  timestamp: string;
  sessionKey?: string;
}

// In-memory storage
const storage = {
  currentUser: null as UserProfile | null,
  contacts: [] as Contact[],
  messages: [] as Message[],
};

/**
 * Save user profile to storage
 */
export function saveUserProfile(profile: UserProfile): void {
  storage.currentUser = profile;
  localStorage.setItem('userProfile', JSON.stringify(profile));
  console.log("User profile saved:", profile.id);
}

/**
 * Get current user profile
 */
export function getUserProfile(): UserProfile | null {
  if (!storage.currentUser) {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      storage.currentUser = JSON.parse(storedProfile);
    }
  }
  return storage.currentUser;
}

/**
 * Save a contact
 */
export function saveContact(contact: Contact): void {
  const existingIndex = storage.contacts.findIndex(c => c.id === contact.id);
  if (existingIndex >= 0) {
    storage.contacts[existingIndex] = contact;
  } else {
    storage.contacts.push(contact);
  }
  localStorage.setItem('contacts', JSON.stringify(storage.contacts));
  console.log("Contact saved:", contact.id);
}

/**
 * Get all contacts
 */
export function getContacts(): Contact[] {
  if (storage.contacts.length === 0) {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      storage.contacts = JSON.parse(storedContacts);
    }
  }
  return storage.contacts;
}

/**
 * Get a contact by ID
 */
export function getContactById(id: string): Contact | undefined {
  return getContacts().find(contact => contact.id === id);
}

/**
 * Add a message
 */
export function addMessage(message: Message): void {
  storage.messages.push(message);
  localStorage.setItem('messages', JSON.stringify(storage.messages));
  console.log("Message added:", message.id);
}

/**
 * Get messages between two users
 */
export function getMessages(userId1: string, userId2: string): Message[] {
  if (storage.messages.length === 0) {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      storage.messages = JSON.parse(storedMessages);
    }
  }
  
  return storage.messages.filter(message => 
    (message.senderId === userId1 && message.receiverId === userId2) ||
    (message.senderId === userId2 && message.receiverId === userId1)
  );
}

/**
 * Get messages for a contact
 */
export function getMessagesForContact(contactId: string): Message[] {
  const user = getUserProfile();
  if (!user) return [];
  
  return getMessages(user.id, contactId);
}

/**
 * Mark messages as read
 */
export function markMessagesAsRead(contactId: string): void {
  const user = getUserProfile();
  if (!user) return;
  
  storage.messages.forEach(message => {
    if (message.senderId === contactId && message.receiverId === user.id) {
      message.status = 'read';
    }
  });
  
  localStorage.setItem('messages', JSON.stringify(storage.messages));
}

/**
 * Clear all storage data
 */
export function clearAllData(): void {
  storage.currentUser = null;
  storage.contacts = [];
  storage.messages = [];
  localStorage.removeItem('userProfile');
  localStorage.removeItem('contacts');
  localStorage.removeItem('messages');
  console.log("Storage cleared");
}

/**
 * Clear all storage (for testing/development)
 */
export function clearStorage(): void {
  clearAllData();
}
