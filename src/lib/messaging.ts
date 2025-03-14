
import { encryptAES, decryptAES } from "@/lib/crypto";
import { saveToIPFS, loadFromIPFS } from "@/lib/storage";

/**
 * Send an encrypted message and store it on IPFS
 * @param senderId - The sender's ID
 * @param receiverId - The receiver's ID
 * @param message - The plaintext message
 * @param key - The encryption key
 * @returns Promise<string> - The IPFS hash where the message is stored
 */
export async function sendMessage(senderId: string, receiverId: string, message: string, key: string): Promise<string> {
    console.log("🔹 Encrypting and sending message...");
    const encryptedMessage = await encryptAES(message, key);
    const messageData = { senderId, receiverId, encryptedMessage };
    const ipfsHash = await saveToIPFS(JSON.stringify(messageData), key);

    return ipfsHash; // Message stored on IPFS
}

/**
 * Receive and decrypt a message from IPFS
 * @param ipfsHash - The IPFS hash where the message is stored
 * @param key - The decryption key
 * @returns Promise<string> - The decrypted message
 */
export async function receiveMessage(ipfsHash: string, key: string): Promise<string> {
    console.log("🔹 Decrypting message from IPFS...");
    const encryptedData = await loadFromIPFS(ipfsHash, key);
    const messageData = JSON.parse(encryptedData);
    return await decryptAES(messageData.encryptedMessage, key);
}
