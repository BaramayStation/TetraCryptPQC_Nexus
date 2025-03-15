
/**
 * Hardware Security Module (HSM) Types
 * 
 * This module defines available HSM types and related utilities
 */

import { HSMType } from './storage-types';

// Available HSM types
export const HSM_TYPES: HSMType[] = [
  {
    id: 'hsm-1',
    type: 'TPM',
    vendor: 'Infineon',
    model: 'SLB 9670',
    firmwareVersion: '7.85',
    certificationLevel: 'FIPS-140-2'
  },
  {
    id: 'hsm-2',
    type: 'YubiKey',
    vendor: 'Yubico',
    model: 'YubiKey 5 FIPS',
    firmwareVersion: '5.2.4',
    certificationLevel: 'FIPS-140-2'
  },
  {
    id: 'hsm-3',
    type: 'Secure Enclave',
    vendor: 'Apple',
    model: 'T2',
    firmwareVersion: '2023.1',
    certificationLevel: 'FIPS-140-3'
  },
  {
    id: 'hsm-4',
    type: 'Cloud HSM',
    vendor: 'AWS',
    model: 'CloudHSM',
    firmwareVersion: '5.8.0',
    certificationLevel: 'FIPS-140-3'
  },
  {
    id: 'hsm-5',
    type: 'Hardware Token',
    vendor: 'Thales',
    model: 'Luna Network HSM 7',
    firmwareVersion: '7.4.0',
    certificationLevel: 'FIPS-140-3'
  }
];

// Get HSM type details by ID
export function getHSMTypeById(id: string): HSMType | undefined {
  return HSM_TYPES.find(hsm => hsm.id === id);
}

// Get HSM type details by type
export function getHSMTypeByType(type: string): HSMType | undefined {
  return HSM_TYPES.find(hsm => hsm.type.toLowerCase() === type.toLowerCase());
}

// Check if HSM is FIPS compliant
export function isFIPSCompliant(hsm: HSMType): boolean {
  return hsm.certificationLevel.startsWith('FIPS');
}

// Get available HSM types filtered by certification level
export function getHSMTypesByCertification(level: 'FIPS-140-2' | 'FIPS-140-3' | 'Common Criteria'): HSMType[] {
  return HSM_TYPES.filter(hsm => hsm.certificationLevel === level);
}
