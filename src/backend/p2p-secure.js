
import WebSocket, { WebSocketServer } from 'ws';
import { decryptAES, encryptAES } from '../lib/crypto.js';

// 🔹 Start WebSocket Server
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("🔹 New Peer Connected");

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            console.log("📩 Incoming Message:", data);

            // 🔹 Decrypt Message (Ensure authenticity)
            const decryptedContent = await decryptAES(data.encrypted_content, data.session_key);

            // 🔹 Re-encrypt for other peers & forward
            const reEncrypted = await encryptAES(decryptedContent, "peer-shared-key");

            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        sender: data.sender,
                        encrypted_content: reEncrypted,
                        timestamp: Date.now(),
                    }));
                }
            });
        } catch (error) {
            console.error("❌ Error processing message:", error);
        }
    });

    ws.on('close', () => console.log("🔴 Peer Disconnected"));
});

console.log("✅ P2P WebSocket Server Running on ws://localhost:8080");
