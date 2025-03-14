import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import viteInspect from "vite-plugin-inspect"; // Debugging & analysis
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Enables IPv6 & dual-stack connectivity
    port: 8080,
    strictPort: true, // Ensures no fallback ports
    https: true, // Enforces TLS encryption during local development
  },
  plugins: [
    react(), // Optimized React rendering
    wasm(), // Ensures WebAssembly ESM compatibility
    topLevelAwait(), // Enables WebAssembly async/await support
    viteInspect(), // Debugging & visualization plugin
  ],
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
}));