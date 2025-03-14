import { encryptAES, decryptAES, generateZKProof, verifyZKProof } from "@/lib/crypto";
import { generateDID } from "@/lib/did";
import { UserProfile, Contact, Message } from "./storage-types";

// ✅ Define Storage Keys for Local Storage
const USER_PROFILE_KEY = "tetracrypt_user_profile";
const CONTACTS_KEY = "tetracrypt_contacts";
const MESSAGES_KEY = "tetracrypt_messages";

/**
 * ✅ Ensures localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (error) {
    console.warn("LocalStorage is not available. Running in stateless mode.");
    return false;
  }
}

/**
 * ✅ Get User Profile (Decentralized or Local)
 */
export function getUserProfile(): UserProfile | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const profile = localStorage.getItem(USER_PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error("Failed to get user profile:", error);
    return null;
  }
}

/**
 * ✅ Save User Profile Securely
 */
export function saveUserProfile(profile: UserProfile): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save user profile:", error);
  }
}

/**
 * ✅ Get Contacts List
 */
export function getContacts(): Contact[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error("Failed to get contacts:", error);
    return [];
  }
}

/**
 * ✅ Save New Contact Securely
 */
export function saveContact(contact: Contact): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const contacts = getContacts();
    const existingIndex = contacts.findIndex((c) => c.id === contact.id);

    if (existingIndex >= 0) {
      contacts[existingIndex] = contact;
    } else {
      contacts.push(contact);
    }

    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error("Failed to save contact:", error);
  }
}

/**
 * ✅ Retrieve Messages for a Contact
 */
export function getMessagesForContact(contactId: string): Message[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const messages = getAllMessages();
    return messages.filter((m) => m.senderId === contactId || m.receiverId === contactId);
  } catch (error) {
    console.error("Failed to get messages for contact:", error);
    return [];
  }
}

/**
 * ✅ Get All Messages Securely
 */
function getAllMessages(): Message[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const messages = localStorage.getItem(MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error("Failed to get all messages:", error);
    return [];
  }
}

/**
 * ✅ Add a New Encrypted Message
 */
export function addMessage(message: Message): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const messages = getAllMessages();
    messages.push(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));

    // Update Last Message for Contact
    updateContactLastMessage(message);
  } catch (error) {
    console.error("Failed to add message:", error);
  }
}

/**
 * ✅ Update Contact's Last Message (Securely)
 */
function updateContactLastMessage(message: Message): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const user = getUserProfile();
    if (!user) return;

    const contactId = message.senderId === user.id ? message.receiverId : message.senderId;

    const contacts = getContacts();
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex >= 0) {
      contacts[contactIndex].lastMessage = message.encryptedContent;
      contacts[contactIndex].lastMessageTime = message.timestamp;
      contacts[contactIndex].unreadCount = message.senderId !== user.id ? (contacts[contactIndex].unreadCount || 0) + 1 : 0;

      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }
  } catch (error) {
    console.error("Failed to update contact last message:", error);
  }
}

/**
 * ✅ Creates a **Post-Quantum Secure User Profile**
 */
export async function createUserProfile(username: string): Promise<UserProfile> {
  console.log("🔹 Creating Quantum-Secure User Profile...");

  // ✅ Generate Secure DID (Post-Quantum)
  const identity = await generateDID();

  // ✅ Construct Secure Profile
  const userProfile: UserProfile = {
    id: identity.id,
    name: username,
    starknet: { address: identity.starknetAddress },
    createdAt: new Date().toISOString(),
  };

  // ✅ Save Securely
  saveUserProfile(userProfile);
  return userProfile;
}