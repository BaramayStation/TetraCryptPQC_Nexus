import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import wasm from "@menci/vite-plugin-wasm"; // ✅ Correct Vite WASM Plugin
import topLevelAwait from "vite-plugin-top-level-await"; // ✅ Ensures top-level async/await works with WASM

export default defineConfig({
  server: {
    host: "0.0.0.0", // ✅ Ensures it runs on all network interfaces
    port: 8080,
    strictPort: true, // ✅ Prevents random port selection
  },
  plugins: [
    react(),
    wasm(), // ✅ Enables WebAssembly using Menci's Vite WASM plugin
    topLevelAwait(), // ✅ Ensures top-level await works for WASM
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: "globalThis", // ✅ Fixes missing 'global' in browser
    "process.env": {}, // ✅ Ensures Web3 compatibility
  },
  optimizeDeps: {
    exclude: ["pqcrypto", "wasm-feature-detect"], // ✅ Prevents pre-bundling PQC libraries
  },
  build: {
    target: "esnext", // ✅ Supports latest JavaScript & WASM features
    outDir: "dist",
    minify: "esbuild",
    sourcemap: true, // ✅ Enables debugging
    chunkSizeWarningLimit: 500, // ✅ Prevents large module warnings
  },
});
