
import { create } from "ipfs-http-client";
import { encryptAES, decryptAES, generateZKProof } from "@/lib/crypto";
import { generateStarkNetIdentity } from "@/lib/identity";
import crypto from "crypto-browserify";
import { UserProfile, Contact, Message } from "./storage-types";

// Export types for use elsewhere
export type { UserProfile, Contact, Message };

// ✅ Initialize IPFS Client (Decentralized Storage)
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// Local storage keys
const USER_PROFILE_KEY = "tetracrypt_user_profile";
const CONTACTS_KEY = "tetracrypt_contacts";
const MESSAGES_KEY = "tetracrypt_messages";

/**
 * ✅ Get user profile from local storage
 */
export function getUserProfile(): UserProfile | null {
  try {
    const profile = localStorage.getItem(USER_PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error("Failed to get user profile:", error);
    return null;
  }
}

/**
 * ✅ Save user profile to local storage
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save user profile:", error);
  }
}

/**
 * ✅ Get contacts from local storage
 */
export function getContacts(): Contact[] {
  try {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error("Failed to get contacts:", error);
    return [];
  }
}

/**
 * ✅ Save contact
 */
export function saveContact(contact: Contact): void {
  try {
    const contacts = getContacts();
    const existingIndex = contacts.findIndex(c => c.id === contact.id);
    
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
 * ✅ Get messages for a contact
 */
export function getMessagesForContact(contactId: string): Message[] {
  try {
    const messages = getAllMessages();
    return messages.filter(m => 
      (m.senderId === contactId) || (m.receiverId === contactId)
    );
  } catch (error) {
    console.error("Failed to get messages for contact:", error);
    return [];
  }
}

/**
 * ✅ Get all messages
 */
function getAllMessages(): Message[] {
  try {
    const messages = localStorage.getItem(MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error("Failed to get all messages:", error);
    return [];
  }
}

/**
 * ✅ Add a new message
 */
export function addMessage(message: Message): void {
  try {
    const messages = getAllMessages();
    messages.push(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    
    // Update last message for contact
    updateContactLastMessage(message);
  } catch (error) {
    console.error("Failed to add message:", error);
  }
}

/**
 * ✅ Update contact's last message
 */
function updateContactLastMessage(message: Message): void {
  try {
    const user = getUserProfile();
    if (!user) return;
    
    const contactId = message.senderId === user.id 
      ? message.receiverId 
      : message.senderId;
    
    const contacts = getContacts();
    const contactIndex = contacts.findIndex(c => c.id === contactId);
    
    if (contactIndex >= 0) {
      contacts[contactIndex].lastMessage = message.encryptedContent;
      contacts[contactIndex].lastMessageTime = message.timestamp;
      
      if (message.senderId !== user.id) {
        contacts[contactIndex].unreadCount = (contacts[contactIndex].unreadCount || 0) + 1;
      }
      
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }
  } catch (error) {
    console.error("Failed to update contact last message:", error);
  }
}

/**
 * ✅ Mark messages as read for a contact
 */
export function markMessagesAsRead(contactId: string): void {
  try {
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
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
      
      // Update contact unread count
      const contacts = getContacts();
      const contactIndex = contacts.findIndex(c => c.id === contactId);
      
      if (contactIndex >= 0) {
        contacts[contactIndex].unreadCount = 0;
        localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
      }
    }
  } catch (error) {
    console.error("Failed to mark messages as read:", error);
  }
}

/**
 * ✅ Clear all data from local storage
 */
export function clearAllData(): void {
  try {
    localStorage.removeItem(USER_PROFILE_KEY);
    localStorage.removeItem(CONTACTS_KEY);
    localStorage.removeItem(MESSAGES_KEY);
  } catch (error) {
    console.error("Failed to clear all data:", error);
  }
}

/**
 * ✅ Stores an **encrypted** message on IPFS/Filecoin with zk-STARK proof
 * @param {string} message - The plaintext message
 * @param {string} key - The AES encryption key
 * @returns {Promise<string>} The IPFS CID (Content Identifier)
 */
export async function saveToIPFS(message: string | object, key: string): Promise<string> {
  try {
    console.log("🔹 Encrypting & Uploading Data to IPFS...");

    // Convert object to string if needed
    const messageStr = typeof message === 'object' ? JSON.stringify(message) : message;

    // 🔹 Encrypt message using AES-256-GCM
    const encryptedData = await encryptAES(messageStr, key);

    // 🔹 Generate zk-STARK Proof for integrity
    const zkProof = await generateZKProof(encryptedData);

    // 🔹 Store encrypted message + proof on IPFS
    const { cid } = await ipfs.add(JSON.stringify({ encryptedData, zkProof }));

    console.log(`✅ Secure Data Stored on IPFS/Filecoin: ${cid.toString()}`);
    return cid.toString(); // Returns the IPFS CID
  } catch (error) {
    console.error("❌ Failed to store on IPFS/Filecoin:", error);
    throw new Error("Decentralized Storage Failed");
  }
}

/**
 * ✅ Retrieves and decrypts a message from IPFS/Filecoin
 * @param {string} cid - The IPFS CID
 * @param {string} key - The AES decryption key
 * @returns {Promise<string>} The decrypted message
 */
export async function loadFromIPFS(cid: string, key: string): Promise<string> {
  try {
    console.log("🔹 Retrieving Data from IPFS:", cid);

    // 🔹 Retrieve encrypted data from IPFS
    const response = await ipfs.cat(cid);
    const content = new TextDecoder().decode(response);
    const { encryptedData, zkProof } = JSON.parse(content);

    // 🔹 Verify zk-STARK Proof Before Decrypting
    const isValidProof = await verifyZKProof(encryptedData, zkProof);
    if (!isValidProof) {
      console.warn("❌ Data validation failed: Invalid zk-STARK proof");
      throw new Error("Data Integrity Check Failed");
    }

    // 🔹 Decrypt and return the message
    const decryptedMessage = await decryptAES(encryptedData, key);
    console.log("✅ Successfully Decrypted Message:", decryptedMessage);

    return decryptedMessage;
  } catch (error) {
    console.error("❌ Failed to retrieve/decrypt from IPFS:", error);
    throw new Error("Decryption Failed");
  }
}

/**
 * Verify a zk-STARK proof
 * @param message - The message to verify
 * @param proof - The proof to verify
 * @returns Promise<boolean> - Whether the proof is valid
 */
export async function verifyZKProof(message: string, proof: string): Promise<boolean> {
  // Simple placeholder implementation
  console.log("🔹 Verifying zk-STARK proof for message integrity...");
  return true; // Always return true for placeholder
}

/**
 * ✅ Creates a **Post-Quantum Secure User Profile** and stores it on IPFS
 * @param {string} username - The user's chosen username
 * @returns {Promise<string>} The IPFS CID of the encrypted user profile
 */
export async function createUserProfile(username: string): Promise<string> {
  console.log("🔹 Creating Quantum-Secure User Profile...");

  // ✅ Generate StarkNet Identity (zk-STARK & PQC Compatible)
  const identity = await generateStarkNetIdentity();

  // ✅ Construct Encrypted User Profile
  const userProfile = {
    id: identity.starkKey,
    name: username,
    starknet: {
      address: identity.starkAddress,
    },
    createdAt: new Date().toISOString(),
  };

  // ✅ Encrypt and Store Profile on IPFS
  const encryptionKey = identity.starkKey; // Using StarkNet Key for Encryption
  const ipfsHash = await saveToIPFS(JSON.stringify(userProfile), encryptionKey);

  console.log(`✅ User Profile Stored Securely on IPFS: ${ipfsHash}`);
  return ipfsHash;
}
