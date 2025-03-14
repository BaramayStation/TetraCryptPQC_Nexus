import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import wasm from "@menci/vite-plugin-wasm"; // ✅ Corrected Import
import topLevelAwait from "vite-plugin-top-level-await"; // ✅ Ensures top-level await works with WASM

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
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
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    exclude: ["pqcrypto", "wasm-feature-detect"],
  },
  build: {
    target: "esnext",
    outDir: "dist",
    minify: "esbuild",
    sourcemap: true,
    chunkSizeWarningLimit: 500,
  },
});
