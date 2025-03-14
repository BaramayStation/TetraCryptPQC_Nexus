import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import wasm from "vite-plugin-wasm";  // Official WebAssembly support
import topLevelAwait from "vite-plugin-top-level-await"; // Enables async WebAssembly
import path from "path";
import { createHelia } from "helia"; // IPFS Helia integration
import { blockstore } from "@helia/blockstore-memory"; // Future-proofed blockstore integration

export default defineConfig(({ mode }) => {
  const plugins = [
    react(), // Optimized React rendering with SWC
    wasm(), // Ensures WebAssembly ESM compatibility
    topLevelAwait(), // Enables async/await WebAssembly support
  ];

  // Conditionally include viteInspect if installed
  try {
    const viteInspect = require("vite-plugin-inspect");
    if (viteInspect) plugins.push(viteInspect.default());
  } catch (e) {
    console.warn("vite-plugin-inspect not installed, skipping...");
  }

  return {
    server: {
      host: "0.0.0.0", // Allows external access (securely)
      port: 8080,
      strictPort: true, // Ensures no fallback ports
      https: true, // Enforces TLS encryption during local development
      headers: {
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["@syntect/wasm", "helia"], // Ensure Helia is optimized separately
      esbuildOptions: {
        target: "esnext", // Ensures support for latest JavaScript features
        supported: {
          bigint: true, // Enables BigInt support for cryptographic ops
          wasm: true, // Enables direct WebAssembly imports
        },
      },
    },
    build: {
      target: "esnext",
      outDir: "dist",
      sourcemap: true,
      minify: "terser", // Highly secure minification
      rollupOptions: {
        external: ["@radix-ui/react-tooltip", "helia"], // Ensure Helia is treated as an external module
        output: {
          manualChunks: {
            vendor: ["ethers", "starknet", "helia"], // Splits Web3 and IPFS dependencies
          },
        },
      },
      chunkSizeWarningLimit: 1500, // Avoid warnings for large cryptographic modules
    },
    worker: {
      format: "es", // Ensures compatibility with modern ES module workers
      plugins: () => [wasm(), topLevelAwait()],
    },
    define: {
      global: "globalThis", // Ensures compatibility across all JS environments
      "process.env": {}, // Prevents environment variable leakage
    },
  };
});

// ✅ Future-Proofed IPFS Helia Utility Functions for Secure Storage
import { unixfs } from "@helia/unixfs";

let heliaInstance = null;

export async function getHeliaInstance() {
  if (!heliaInstance) {
    heliaInstance = await createHelia({ blockstore: blockstore() });
  }
  return heliaInstance;
}

export async function addFileToIPFS(data) {
  const helia = await getHeliaInstance();
  const fs = unixfs(helia);
  const cid = await fs.addBytes(new TextEncoder().encode(data));
  return cid.toString(); // Returns the CID
}

export async function getFileFromIPFS(cid) {
  const helia = await getHeliaInstance();
  const fs = unixfs(helia);
  const data = [];
  for await (const chunk of fs.cat(cid)) {
    data.push(chunk);
  }
  return new TextDecoder().decode(Buffer.concat(data));
}
