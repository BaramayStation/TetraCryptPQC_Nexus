
export interface PQCKey {
  publicKey: string;
  privateKey: string;
  created: string;
  algorithm: string;
  strength?: string; // Add missing field
  standard?: string; // Add missing field
  hardwareProtected?: boolean;
  hardwareType?: string;
}
