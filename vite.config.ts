import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    https: true,
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@syntect/wasm"],
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
});
