import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        "oqs", // ✅ Ensures OQS is treated correctly
        "crypto", // ✅ Prevents Vite from treating it as a browser module
      ],
    },
  },
  optimizeDeps: {
    include: ["crypto"], // ✅ Ensures `crypto` is included for use in both Node.js and browser
  },
}));
