import { encryptAES, decryptAES } from "@/lib/crypto";
import { saveToIPFS, loadFromIPFS } from "@/lib/storage";

export async function sendMessage(senderId: string, receiverId: string, message: string, key: string) {
    console.log("🔹 Encrypting and sending message...");
    const encryptedMessage = encryptAES(message, key);
    const ipfsHash = await saveToIPFS({ senderId, receiverId, encryptedMessage });

    return ipfsHash; // Message stored on IPFS
}

export async function receiveMessage(ipfsHash: string, key: string) {
    console.log("🔹 Decrypting message from IPFS...");
    const messageData = await loadFromIPFS(ipfsHash);
    return decryptAES(messageData.encryptedMessage, key);
}