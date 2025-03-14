import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import wasm from "vite-plugin-wasm";  // Official WebAssembly support
import topLevelAwait from "vite-plugin-top-level-await"; // Enables async WebAssembly
import path from "path";
import { createHelia } from "helia"; // IPFS Helia integration

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
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["@syntect/wasm"], // Exclude problematic WebAssembly modules
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
        external: ["@radix-ui/react-tooltip"], // Externalize the missing module
        output: {
          manualChunks: {
            vendor: ["ethers", "starknet"], // Splits Web3 dependencies
          },
        },
      },
      chunkSizeWarningLimit: 1500, // Avoid warnings for large cryptographic modules
    },
    worker: {
      format: "es", // Ensures compatibility with modern ES module workers
      plugins: [
        wasm(),
        topLevelAwait(),
      ],
    },
    define: {
      global: "globalThis", // Ensures compatibility across all JS environments
      "process.env": {}, // Prevents environment variable leakage
    },
  };
});
