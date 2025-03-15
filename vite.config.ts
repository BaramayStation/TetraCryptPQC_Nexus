
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const plugins = [
    react(), // Optimized React rendering with SWC
    mode === "development" ? componentTagger() : null, // Only used in development
  ].filter(Boolean);

  // Conditionally include vite-plugin-inspect if installed
  try {
    const viteInspect = require.resolve("vite-plugin-inspect");
    if (viteInspect) {
      plugins.push(require("vite-plugin-inspect").default());
    }
  } catch {
    console.warn("vite-plugin-inspect not installed, skipping...");
  }

  return {
    server: {
      host: "0.0.0.0", // Allows external access (securely)
      port: 8080,
      strictPort: true, // Ensures no fallback ports
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext", // Ensures support for latest JavaScript features
        supported: {
          bigint: true, // Enables BigInt support for cryptographic ops
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
    define: {
      global: "globalThis", // Ensures compatibility across all JS environments
      "process.env": {}, // Prevents environment variable leakage
    },
  };
});
