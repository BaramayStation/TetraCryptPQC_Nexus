
export interface HardwareSecurityCapabilities {
  available: boolean;
  tpm: boolean;
  secureBoot: boolean;
  encryptedMemory: boolean;
  hardwareKeys: boolean;
  tpmAvailable?: boolean;
}

export interface HSMDevice {
  available: boolean;
  type: string;
  keyProtectionLevel: string;
  lastVerified: string;
  id?: string;
}
