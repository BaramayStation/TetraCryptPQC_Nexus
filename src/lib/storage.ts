
// User profile type
export interface UserProfile {
  id: string;
  name: string;
  keyPairs: {
    kyber: {
      publicKey: string;
      privateKey: string;
    };
    falcon: {
      publicKey: string;
      privateKey: string;
    };
  };
  createdAt: string;
}

// Contact type
export interface Contact {
  id: string;
  name: string;
  publicKeys: {
    kyber: string;
    falcon: string;
  };
  lastMessageTime?: string;
  lastMessage?: string;
  unreadCount: number;
}

// Message type
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  encryptedContent: string;
  timestamp: string;
  signature: string;
  status: 'sent' | 'delivered' | 'read';
  sessionKey: string; // In real app, this would be encrypted with recipient's public key
}

// Session type (for conversations)
export interface Session {
  contactId: string;
  sessionKey: string;
  lastRenewed: string;
}

// Local storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'quantum_secure_user',
  CONTACTS: 'quantum_secure_contacts',
  MESSAGES: 'quantum_secure_messages',
  SESSIONS: 'quantum_secure_sessions',
};

// Save user profile
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

// Get user profile
export const getUserProfile = (): UserProfile | null => {
  const profileJson = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return profileJson ? JSON.parse(profileJson) : null;
};

// Save contacts
export const saveContacts = (contacts: Contact[]): void => {
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
};

// Get contacts
export const getContacts = (): Contact[] => {
  const contactsJson = localStorage.getItem(STORAGE_KEYS.CONTACTS);
  return contactsJson ? JSON.parse(contactsJson) : [];
};

// Add or update a contact
export const saveContact = (contact: Contact): void => {
  const contacts = getContacts();
  const existingIndex = contacts.findIndex(c => c.id === contact.id);
  
  if (existingIndex >= 0) {
    contacts[existingIndex] = contact;
  } else {
    contacts.push(contact);
  }
  
  saveContacts(contacts);
};

// Save messages
export const saveMessages = (messages: Message[]): void => {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

// Get all messages
export const getAllMessages = (): Message[] => {
  const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return messagesJson ? JSON.parse(messagesJson) : [];
};

// Get messages for a specific contact
export const getMessagesForContact = (contactId: string): Message[] => {
  const user = getUserProfile();
  if (!user) return [];
  
  return getAllMessages().filter(
    message => 
      (message.senderId === user.id && message.receiverId === contactId) || 
      (message.senderId === contactId && message.receiverId === user.id)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// Add a new message
export const addMessage = (message: Message): void => {
  const messages = getAllMessages();
  messages.push(message);
  saveMessages(messages);
  
  // Update contact's last message info
  const user = getUserProfile();
  if (user && message.senderId !== user.id) {
    const contacts = getContacts();
    const contactIndex = contacts.findIndex(c => c.id === message.senderId);
    
    if (contactIndex >= 0) {
      contacts[contactIndex].lastMessage = message.encryptedContent;
      contacts[contactIndex].lastMessageTime = message.timestamp;
      contacts[contactIndex].unreadCount += 1;
      saveContacts(contacts);
    }
  }
};

// Mark messages as read
export const markMessagesAsRead = (contactId: string): void => {
  const user = getUserProfile();
  if (!user) return;
  
  const messages = getAllMessages();
  let updated = false;
  
  messages.forEach(message => {
    if (message.senderId === contactId && message.receiverId === user.id && message.status !== 'read') {
      message.status = 'read';
      updated = true;
    }
  });
  
  if (updated) {
    saveMessages(messages);
    
    // Update contact's unread count
    const contacts = getContacts();
    const contactIndex = contacts.findIndex(c => c.id === contactId);
    
    if (contactIndex >= 0) {
      contacts[contactIndex].unreadCount = 0;
      saveContacts(contacts);
    }
  }
};

// Save sessions
export const saveSessions = (sessions: Session[]): void => {
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
};

// Get sessions
export const getSessions = (): Session[] => {
  const sessionsJson = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return sessionsJson ? JSON.parse(sessionsJson) : [];
};

// Get session for a contact
export const getSessionForContact = (contactId: string): Session | null => {
  return getSessions().find(session => session.contactId === contactId) || null;
};

// Save or update session
export const saveSession = (session: Session): void => {
  const sessions = getSessions();
  const existingIndex = sessions.findIndex(s => s.contactId === session.contactId);
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  saveSessions(sessions);
};

// Clear all data (for logout)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  localStorage.removeItem(STORAGE_KEYS.CONTACTS);
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
};
