import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    new NodePolyfillPlugin(), // ✅ Fixes missing crypto/fs/path modules for Web3 & PQC
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["oqs", "crypto"], // ✅ Ensures oqs & crypto don't break Vite builds
    },
  },
  optimizeDeps: {
    include: ["oqs", "ethers", "ipfs-http-client"], // ✅ Ensures Web3 & PQC libraries work
  },
}));
