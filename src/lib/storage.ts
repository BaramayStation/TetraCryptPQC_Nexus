import { create } from "ipfs-http-client";
import { encryptAES, decryptAES, generateZKProof, verifyZKProof } from "@/lib/crypto";
import { generateStarkNetIdentity } from "@/lib/identity";
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
 * ✅ Checks if localStorage is available before usage
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
 * ✅ Get user profile from local storage
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
 * ✅ Save user profile to local storage
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
 * ✅ Get contacts from local storage
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
 * ✅ Save a new contact
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
 * ✅ Get all messages securely
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
 * ✅ Get all messages
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
 * ✅ Add a new encrypted message
 */
export function addMessage(message: Message): void {
  if (!isLocalStorageAvailable()) return;
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
 * ✅ Securely store data on IPFS with zk-STARK proof
 */
export async function saveToIPFS(message: string | object, key: string): Promise<string> {
  try {
    console.log("🔹 Encrypting & Uploading Data to IPFS...");

    const messageStr = typeof message === "object" ? JSON.stringify(message) : message;
    const encryptedData = await encryptAES(messageStr, key);
    const zkProof = await generateZKProof(encryptedData);

    const { cid } = await ipfs.add(JSON.stringify({ encryptedData, zkProof }));

    console.log(`✅ Secure Data Stored on IPFS/Filecoin: ${cid.toString()}`);
    return cid.toString();
  } catch (error) {
    console.error("❌ Failed to store on IPFS:", error);
    throw new Error("Decentralized Storage Failed");
  }
}

/**
 * ✅ Retrieve and decrypt data from IPFS with zk-STARK validation
 */
export async function loadFromIPFS(cid: string, key: string): Promise<string> {
  try {
    console.log("🔹 Retrieving Data from IPFS:", cid);

    const response = await ipfs.cat(cid);
    const content = new TextDecoder().decode(response);
    const { encryptedData, zkProof } = JSON.parse(content);

    if (!(await verifyZKProof(encryptedData, zkProof))) {
      console.warn("❌ Data validation failed: Invalid zk-STARK proof");
      throw new Error("Data Integrity Check Failed");
    }

    return await decryptAES(encryptedData, key);
  } catch (error) {
    console.error("❌ Failed to retrieve/decrypt from IPFS:", error);
    throw new Error("Decryption Failed");
  }
}

/**
 * ✅ Creates a **Post-Quantum Secure User Profile** and stores it on IPFS
 */
export async function createUserProfile(username: string): Promise<string> {
  console.log("🔹 Creating Quantum-Secure User Profile...");

  const identity = await generateStarkNetIdentity();

  const userProfile = {
    id: identity.starkKey,
    name: username,
    starknet: { address: identity.starkAddress },
    createdAt: new Date().toISOString(),
  };

  const encryptionKey = identity.starkKey;
  const ipfsHash = await saveToIPFS(userProfile, encryptionKey);

  console.log(`✅ User Profile Stored Securely on IPFS: ${ipfsHash}`);
  return ipfsHash;
}