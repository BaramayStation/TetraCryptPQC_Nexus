
/**
 * TetraCryptPQC Identity Verification Type Definitions
 */

export interface VerificationRequest {
  id: string;
  userId: string;
  type: 'email' | 'phone' | 'document' | 'biometric' | 'wallet';
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  timestamp: string;
  expiresAt: string;
  verificationData?: any;
  verifierService?: string;
}

export interface IdentityCredential {
  id: string;
  userId: string;
  type: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string;
  revoked: boolean;
  credential: any;
  proofType: string;
  proof: string;
}
