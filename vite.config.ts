import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import viteInspect from "vite-plugin-inspect"; // Debugging & Analysis
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Ensures cross-platform compatibility (IPv4 & IPv6)
    port: 8080,
    strictPort: true, // Ensures no fallback ports
    https: mode === "development", // Enforces HTTPS in local development
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
      target: "esnext", // Ensures support for the latest JS features
      supported: {
        bigint: true, // Enables BigInt support for cryptographic operations
        wasm: true, // Ensures direct WebAssembly imports
      },
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    sourcemap: mode === "development", // Generates source maps only in dev mode
    minify: mode === "production" ? "terser" : false, // Highly secure minification for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["ethers", "starknet"], // Splits Web3 dependencies
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Avoid warnings for large cryptographic modules
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