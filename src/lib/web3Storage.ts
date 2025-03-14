// web3Storage.ts: Secure Decentralized Storage for TetraCryptPQC
// Implements IPFS + optional Arweave support for quantum-secure message storage

import { create } from 'ipfs-http-client';
import { signMessage, verifySignature } from '@/lib/crypto';

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'; // Change to your own IPFS gateway if needed
const IPFS_API_URL = 'https://api.web3.storage/upload'; // Replace with actual IPFS provider

// ✅ Initialize IPFS Client
const ipfs = create({ url: IPFS_API_URL });

// 🔹 Securely Store Encrypted Message on IPFS
export const saveToIPFS = async (encryptedMessage: string, senderPrivateKey: string): Promise<string> => {
  try {
    // Generate digital signature (SLH-DSA)
    const signature = await signMessage(encryptedMessage, senderPrivateKey);
    
    // Create JSON object with encrypted content & signature
    const payload = JSON.stringify({ encryptedMessage, signature });
    
    // Upload to IPFS
    const { cid } = await ipfs.add(payload);
    console.log(`🔹 Stored on IPFS: ${IPFS_GATEWAY}${cid}`);
    return cid.toString();
  } catch (error) {
    console.error('❌ Failed to store message on IPFS:', error);
    throw new Error('IPFS storage failed');
  }
};

// 🔹 Retrieve Encrypted Message from IPFS & Verify Integrity
export const loadFromIPFS = async (cid: string, senderPublicKey: string): Promise<string | null> => {
  try {
    // Fetch message data from IPFS
    const response = await fetch(`${IPFS_GATEWAY}${cid}`);
    const { encryptedMessage, signature } = await response.json();
    
    // Verify the signature
    const isValid = await verifySignature(encryptedMessage, signature, senderPublicKey);
    if (!isValid) {
      console.error('❌ Message integrity check failed!');
      return null;
    }
    
    console.log('✅ Message verified successfully');
    return encryptedMessage;
  } catch (error) {
    console.error('❌ Failed to load message from IPFS:', error);
    return null;
  }
};
