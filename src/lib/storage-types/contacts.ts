
/**
 * TetraCryptPQC Contact Type Definition
 */

export interface Contact {
  id: string;
  name: string;
  displayName?: string;
  email?: string;
  status?: "online" | "away" | "offline";
  publicKey: string;
  signatureKey: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  pqcEnabled?: boolean;
  verificationStatus?: "verified" | "unverified" | "pending";
  created?: string;
}
