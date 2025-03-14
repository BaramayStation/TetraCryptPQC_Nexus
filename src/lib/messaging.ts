import { encryptAES, decryptAES, signMessage, verifySignature, generateZKProof, verifyZKProof } from "@/lib/crypto";
import { saveToIPFS, loadFromIPFS } from "@/lib/web3storage";

/**
 * ✅ Securely send an encrypted message and store it on IPFS with cryptographic proofs
 * @param senderId - The sender's ID
 * @param receiverId - The receiver's ID
 * @param message - The plaintext message
 * @param encryptionKey - The AES encryption key
 * @param senderPrivateKey - The sender's private key for signing
 * @returns Promise<string> - The IPFS CID where the message is stored
 */
export async function sendMessage(
  senderId: string,
  receiverId: string,
  message: string,
  encryptionKey: string,
  senderPrivateKey: string
): Promise<string> {
  console.log("🔹 Encrypting and securely sending message...");

  // ✅ Encrypt message using AES-256-GCM
  const encryptedMessage = await encryptAES(message, encryptionKey);

  // ✅ Generate zk-STARK Proof for integrity
  const zkProof = await generateZKProof(encryptedMessage);

  // ✅ Sign the encrypted message using SLH-DSA
  const signature = await signMessage(encryptedMessage, senderPrivateKey);

  // ✅ Prepare message data
  const messageData = { senderId, receiverId, encryptedMessage, zkProof, signature };

  // ✅ Store encrypted message on IPFS
  const ipfsHash = await saveToIPFS(JSON.stringify(messageData), encryptionKey, senderPrivateKey);

  console.log(`✅ Message securely stored on IPFS: ${ipfsHash}`);
  return ipfsHash; // Returns IPFS CID
}

/**
 * ✅ Securely receive and decrypt a message from IPFS with cryptographic verification
 * @param ipfsHash - The IPFS CID where the message is stored
 * @param decryptionKey - The AES decryption key
 * @param senderPublicKey - The sender's public key for signature verification
 * @returns Promise<string> - The decrypted message
 */
export async function receiveMessage(
  ipfsHash: string,
  decryptionKey: string,
  senderPublicKey: string
): Promise<string> {
  console.log("🔹 Retrieving and verifying message from IPFS...");

  // ✅ Load encrypted data from IPFS
  const encryptedData = await loadFromIPFS(ipfsHash, decryptionKey, senderPublicKey);
  const messageData = JSON.parse(encryptedData);

  // ✅ Verify zk-STARK Proof Before Decrypting
  if (!(await verifyZKProof(messageData.encryptedMessage, messageData.zkProof))) {
    console.warn("❌ Data integrity check failed: Invalid zk-STARK proof");
    throw new Error("Message Integrity Check Failed");
  }

  // ✅ Verify Digital Signature (SLH-DSA)
  if (!(await verifySignature(messageData.encryptedMessage, messageData.signature, senderPublicKey))) {
    console.warn("❌ Signature verification failed!");
    throw new Error("Message Authentication Failed");
  }

  // ✅ Decrypt and return the message
  const decryptedMessage = await decryptAES(messageData.encryptedMessage, decryptionKey);
  console.log("✅ Successfully decrypted message:", decryptedMessage);

  return decryptedMessage;
}