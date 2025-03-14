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

declare module "starknet" {
  import { Provider, Contract, Account, ec, hash, stark } from "starknet";
  export { Provider, Contract, Account, ec, hash, stark };
}

// ✅ Support for Web3.Storage or Other IPFS Implementations
declare module "web3.storage" {
  import { Web3Storage } from "web3.storage";
  export { Web3Storage };
}