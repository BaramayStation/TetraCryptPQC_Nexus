export type UserProfile = {
  userId: string;
  username: string;
  encryptionKey: string;
  authType: "standard" | "advanced";
};
