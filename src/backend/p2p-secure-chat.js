
import { createLibp2p } from 'libp2p';
import { WebSockets } from '@libp2p/websockets';
import { Mplex } from '@libp2p/mplex';
import { Bootstrap } from '@libp2p/bootstrap';
import { encryptAES, decryptAES, generateKyberKeypair } from './crypto.js';

// ✅ Peer Discovery Bootstrap Nodes
const BOOTSTRAP_NODES = ["/dns4/bootstrap.libp2p.io/tcp/443/wss/p2p/12D3KooWEbGJ9jBz7bLX"];

// ✅ Generate secure session key using ML-KEM
const { publicKey, privateKey } = await generateKyberKeypair();
console.log("🔹 Post-Quantum Keypair Ready");

// ✅ Create Secure Chat Node
async function createChatNode() {
  const node = await createLibp2p({
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    peerDiscovery: [new Bootstrap({ list: BOOTSTRAP_NODES })]
  });

  await node.start();
  console.log("🔹 Secure P2P Chat Node Started:", node.peerId.toString());

  // ✅ Handle Incoming Messages
  node.handle('/secure-chat', async ({ stream }) => {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decryptedMessage = await decryptAES(value, privateKey);
      console.log(`📩 Secure Message: ${decryptedMessage}`);
    }
  });

  return node;
}

// ✅ Send Encrypted Message
async function sendMessage(node, peerId, message) {
  const { stream } = await node.dialProtocol(peerId, '/secure-chat');
  const writer = stream.getWriter();

  // ✅ Encrypt the message before sending
  const encryptedMessage = await encryptAES(message, publicKey);
  await writer.write(new TextEncoder().encode(encryptedMessage));

  console.log(`✅ Secure Message Sent: ${message}`);
}

// ✅ Start Secure Chat
createChatNode().then(async (node) => {
  console.log("🔹 Waiting for Secure Connections...");
  setTimeout(async () => {
    await sendMessage(node, "12D3Koo...", "Hello, Post-Quantum World!");
  }, 5000);
});
