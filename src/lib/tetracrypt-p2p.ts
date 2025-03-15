/**
 * TetraCryptPQC Secure P2P Chat Implementation
 * Enhanced with liboqs WebAssembly for offline Post-Quantum Cryptography
 */

import { createLibp2p } from 'libp2p';
import { WebSockets } from '@libp2p/websockets';
import { Mplex } from '@libp2p/mplex';
import { Bootstrap } from '@libp2p/bootstrap';
import { encryptAES, decryptAES } from '../lib/pqcrypto'; // Existing AES helpers
import { instantiate } from './liboqs/liboqs.wasm'; // WASM import (adjust path after build)

// ✅ Peer Discovery Bootstrap Nodes
const BOOTSTRAP_NODES = ["/dns4/bootstrap.libp2p.io/tcp/443/wss/p2p/12D3KooWEbGJ9jBz7bLX"];

// ✅ liboqs PQC Interface
interface PQCInstance {
  OQS_KEM_keypair: (kem: string) => { publicKey: Uint8Array; privateKey: Uint8Array };
  OQS_KEM_encaps: (kem: string, publicKey: Uint8Array) => { ciphertext: Uint8Array; sharedSecret: Uint8Array };
  OQS_KEM_decaps: (kem: string, privateKey: Uint8Array, ciphertext: Uint8Array) => Uint8Array;
}

let pqc: PQCInstance | null = null;

// ✅ Initialize liboqs WASM for offline PQC
async function initPQC(): Promise<void> {
  pqc = await instantiate();
  console.log("🔹 liboqs WebAssembly Initialized for Offline PQC");
}

// ✅ Generate ML-KEM (Kyber) Keypair and Shared Secret
async function generatePQCKeys() {
  if (!pqc) throw new Error('PQC not initialized');
  const { publicKey, privateKey } = pqc.OQS_KEM_keypair('Kyber512');
  console.log("🔹 Post-Quantum Keypair Generated (Kyber512)");
  return { publicKey, privateKey };
}

// ✅ Encrypt message with PQC (Kyber encapsulation + AES)
async function encryptMessage(message: string, publicKey: Uint8Array): Promise<{ ciphertext: Uint8Array; encryptedData: string }> {
  if (!pqc) throw new Error('PQC not initialized');
  const { ciphertext, sharedSecret } = pqc.OQS_KEM_encaps('Kyber512', publicKey);

  // Use shared secret as AES key
  const aesKey = await crypto.subtle.importKey('raw', sharedSecret, { name: 'AES-GCM' }, false, ['encrypt']);
  const encryptedData = await encryptAES(message, aesKey); // Leverage existing AES helper
  return { ciphertext, encryptedData };
}

// ✅ Decrypt message with PQC (Kyber decapsulation + AES)
async function decryptMessage(ciphertext: Uint8Array, encryptedData: string, privateKey: Uint8Array): Promise<string> {
  if (!pqc) throw new Error('PQC not initialized');
  const sharedSecret = pqc.OQS_KEM_decaps('Kyber512', privateKey, ciphertext);

  // Reconstruct AES key from shared secret
  const aesKey = await crypto.subtle.importKey('raw', sharedSecret, { name: 'AES-GCM' }, false, ['decrypt']);
  return decryptAES(encryptedData, aesKey); // Leverage existing AES helper
}

// Initialize PQC and keys
const pqcPromise = initPQC();
const keysPromise = pqcPromise.then(generatePQCKeys);

// ✅ Create Secure Chat Node
async function createChatNode() {
  const node = await createLibp2p({
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    peerDiscovery: [new Bootstrap({ list: BOOTSTRAP_NODES })],
  });

  const keys = await keysPromise;
  await node.start();
  console.log("🔹 Secure P2P Chat Node Started:", node.peerId.toString());

  // ✅ Handle Incoming Messages
  node.handle('/secure-chat', async ({ stream }) => {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      // Assuming value contains concatenated ciphertext + encrypted data
      const ciphertext = value.slice(0, 512); // Kyber512 ciphertext size (adjust as needed)
      const encryptedData = new TextDecoder().decode(value.slice(512));
      const decryptedMessage = await decryptMessage(ciphertext, encryptedData, keys.privateKey);
      console.log(`📩 Secure Message: ${decryptedMessage}`);
    }
  });

  return { node, keys };
}

// ✅ Send Encrypted Message
async function sendMessage(node: any, peerId: string, message: string, keys: { publicKey: Uint8Array; privateKey: Uint8Array }) {
  const { stream } = await node.dialProtocol(peerId, '/secure-chat');
  const writer = stream.getWriter();

  // ✅ Encrypt the message with PQC and AES
  const { ciphertext, encryptedData } = await encryptMessage(message, keys.publicKey);
  const combinedData = new Uint8Array([...ciphertext, ...new TextEncoder().encode(encryptedData)]);
  await writer.write(combinedData);

  console.log(`✅ Secure Message Sent: ${message}`);
}

// ✅ Start Secure Chat
createChatNode().then(async ({ node, keys }) => {
  console.log("🔹 Waiting for Secure Connections...");
  setTimeout(async () => {
    await sendMessage(node, "12D3Koo...", "Hello, Post-Quantum World!", keys); // Replace with real peerId
  }, 5000);
}).catch((err) => console.error("❌ Chat Node Error:", err));
