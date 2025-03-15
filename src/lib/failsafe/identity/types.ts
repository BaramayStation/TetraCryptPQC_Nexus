
/**
 * TetraCryptPQC Identity Failsafe Types
 */

export interface IdentityImplementation {
  generateIdentity: () => Promise<{id: string, credentials: any}>;
  authenticate: (credentials: any) => Promise<boolean>;
  signData: (data: string | Uint8Array, credentials: any) => Promise<string>;
  verifySignature: (data: string | Uint8Array, signature: string, id: string) => Promise<boolean>;
  getIdentityInfo: (id: string) => Promise<any | null>;
}

export enum IdentityMethod {
  PQC_KEYPAIR = "pqc-keypair",
  DECENTRALIZED_ID = "did",
  STARKNET_ID = "starknet-id",
  TPM_HARDWARE = "tpm-hardware",
  BIOMETRIC = "biometric",
  MULTISIG = "multisig",
  OFFLINE_PAPER = "offline-paper"
}
