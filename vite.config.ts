import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm"; // ✅ Correct package
import topLevelAwait from "vite-plugin-top-level-await";
import viteInspect from "vite-plugin-inspect"; // Debugging & analysis
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    https: true,
  },
  plugins: [
    react(),
    wasm(), // ✅ Official working package
    topLevelAwait(),
    viteInspect(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@syntect/wasm"],
    esbuildOptions: {
      target: "esnext",
      supported: {
        bigint: true,
        wasm: true,
      },
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    sourcemap: true,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["ethers", "starknet"],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  worker: {
    format: "es",
    plugins: [
      wasm(),
      topLevelAwait(),
    ],
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
}));