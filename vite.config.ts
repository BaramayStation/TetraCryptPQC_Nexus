import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import wasm from "vite-plugin-wasm"; // ✅ Enables WebAssembly support
import topLevelAwait from "vite-plugin-top-level-await"; // ✅ Ensures top-level async/await works with WASM

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    wasm(), // 🔹 Enables WASM for pqcrypto.js
    topLevelAwait(), // 🔹 Allows top-level await needed for WASM
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: "window", // ✅ Fixes missing 'global' in browser environment
    "process.env": {}, // ✅ Ensures compatibility with Web3 libraries
  },
  optimizeDeps: {
    exclude: ["pqcrypto"], // ✅ Ensures WASM modules are not pre-bundled (needed for WebAssembly)
  },
  build: {
    target: "esnext", // ✅ Supports modern JS & WASM features
    outDir: "dist",
    minify: "esbuild",
    sourcemap: true, // 🔹 Debugging support
  },
});