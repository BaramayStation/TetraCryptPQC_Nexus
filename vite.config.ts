import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import polyfillNode from "rollup-plugin-polyfill-node";

// ✅ Future-Proofing Netlify Build
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    polyfillNode(), // ✅ Fixes missing crypto in browser
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {}, // ✅ Fixes "process is not defined" error
  },
  build: {
    rollupOptions: {
      external: ["crypto"], // ✅ Ensures crypto is properly polyfilled
    },
  },
}));
