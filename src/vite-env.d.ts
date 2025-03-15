
/// <reference types="vite/client" />

// ✅ WebAssembly Module Support
declare module "*.wasm" {
  const wasmModule: WebAssembly.Module;
  export default wasmModule;
}

// ✅ Define Vite-Specific Environment Variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ✅ Securely Import Web3 & Crypto Files
declare module "ethers" {
  import { ethers } from "ethers";
  export default ethers;
}

// StarkNet typing for browser extension
declare global {
  interface Window {
    starknet: {
      isConnected: boolean;
      selectedAddress: string;
      name?: string;
      version?: string;
      enable: () => Promise<string[]>;
      request: (request: { method: string, params?: any[] }) => Promise<any>;
      account: {
        address: string;
        publicKey: string;
      };
    };
  }
}

// ✅ Support for Web3.Storage or Other IPFS Implementations
declare module "web3.storage" {
  import { Web3Storage } from "web3.storage";
  export { Web3Storage };
}
