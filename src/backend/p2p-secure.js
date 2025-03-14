import { createLibp2p } from 'libp2p';
import { WebSockets } from '@libp2p/websockets';
import { Mplex } from '@libp2p/mplex';
import { Bootstrap } from '@libp2p/bootstrap';
import { create } from "ipfs-http-client";
import { encryptAES, decryptAES, generateKyberKeypair } from './crypto.js';

// ✅ IPFS for Decentralized Message Storage
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// ✅ Bootstrap nodes for peer discovery
const BOOTSTRAP_NODES = ["/dns4/bootstrap.libp2p.io/tcp/443/wss/p2p/12D3KooWEbGJ9jBz7bLX"];

// ✅ Generate post-quantum secure keys
const { publicKey, privateKey } = await generateKyberKeypair();
console.log("🔹 Generated Post-Quantum Secure Keypair");

// ✅ Create P2P WebSocket Node
async function createNode() {
  const node = await createLibp2p({
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    peerDiscovery: [new Bootstrap({ list: BOOTSTRAP_NODES })]
  });

  await node.start();
  console.log("🔹 Secure P2P WebSocket Node Started:", node.peerId.toString());

  node.handle('/secure-chat', async ({ stream }) => {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      // ✅ Decrypt message using AES-256-GCM
      const decryptedMessage = await decryptAES(value, privateKey);
      console.log(`📩 Secure Message Received: ${decryptedMessage}`);
    }
  });

  return node;
}

createNode().catch(console.error);