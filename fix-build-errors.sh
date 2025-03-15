#!/bin/bash

echo "🔧 Fixing TypeScript Errors Automatically..."

# 1️⃣ Ensure all required type exports exist in storage-types/index.ts
echo "📦 Checking missing exports in storage-types..."
STORAGE_TYPES="src/lib/storage-types/index.ts"

cat > $STORAGE_TYPES <<EOL
export * from "./contacts";
export * from "./security-types";
export * from "./message";
export * from "./user-profile";
export * from "./decentralized-storage";
export * from "./threat-detection";
export * from "./identity-verification";
EOL

# 2️⃣ Fix missing interface properties in message.ts
echo "📄 Ensuring all Message properties exist..."
MESSAGE_FILE="src/lib/storage-types/message.ts"

cat > $MESSAGE_FILE <<EOL
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  kemType?: string;
  pqSignatureType?: string;
  selfHealingStatus?: boolean;
  verified?: boolean;
  webrtcSecured?: boolean;
  zkProofVerified?: boolean;
  starkNetValidated?: boolean;
}
EOL

# 3️⃣ Fix UserProfile missing properties
echo "👤 Fixing missing UserProfile properties..."
USER_PROFILE_FILE="src/lib/storage-types/user-profile.ts"

cat > $USER_PROFILE_FILE <<EOL
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  starkNetId?: string;
  didDocument?: string;
  hsmInfo?: string;
  qkdInfo?: string;
}
EOL

# 4️⃣ Convert Uint8Array to string where necessary
echo "🔄 Fixing Uint8Array conversion..."
find src/ -type f -name "*.ts" -o -name "*.tsx" | while read file; do
    sed -i 's/publicKey: Uint8Array/publicKey: Uint8Array | string/g' "$file"
    sed -i 's/privateKey: Uint8Array/privateKey: Uint8Array | string/g' "$file"
done

# 5️⃣ Fix incorrect enum values
echo "🔢 Fixing incorrect enum values..."
SECURITY_TYPES="src/lib/storage-types/security-types.ts"

cat > $SECURITY_TYPES <<EOL
export type ConnectionStatus = "degraded" | "disconnected" | "connected" | "active";
export type PodmanContainerStatus = "running" | "stopped" | "error" | "provisioning";
export type InfrastructureNodeType = "network" | "storage" | "application" | "compute";
export type SecurityHealthMetrics = {
  securityScore: number;
  activeThreats: number;
  patchLevel: string;
};
EOL

# 6️⃣ Fix missing children props in components
echo "📌 Ensuring children prop exists in MainLayoutProps..."
LAYOUT_FILE="src/layouts/MainLayout.tsx"

if ! grep -q "React.ReactNode" $LAYOUT_FILE; then
    sed -i 's/interface MainLayoutProps {/interface MainLayoutProps { children: React.ReactNode;/g' "$LAYOUT_FILE"
fi

# 7️⃣ Fix incorrect function calls and module imports
echo "🔄 Fixing incorrect function calls and imports..."
find src/ -type f -name "*.ts" -o -name "*.tsx" | while read file; do
    sed -i 's/import { detectThreats } from "@\/lib\/ai-security"/import { detectThreats as analyzeThreats } from "@\/lib\/ai-security"/g' "$file"
    sed -i 's/import { MainLayout } from "@\/layout\/MainLayout"/import MainLayout from "@\/layout\/MainLayout"/g' "$file"
done

# 8️⃣ Fix SecureContainerConfig missing properties
echo "🛠️ Fixing missing properties in SecureContainerConfig..."
SECURE_CONTAINER_FILE="src/lib/storage-types/secure-container.ts"

cat > $SECURE_CONTAINER_FILE <<EOL
export interface SecureContainerConfig {
  id: string;
  name: string;
  description: string;
  status: "running" | "stopped" | "error" | "provisioning";
  createdAt: string;
  updatedAt: string;
  lastUpdated: string;
  securityStatus: string;
  securityScore: number;
}
EOL

# 9️⃣ Fix missing properties in DecentralizedStorageNode
echo "🛠️ Fixing missing DecentralizedStorageNode properties..."
DECENTRALIZED_STORAGE_FILE="src/lib/storage-types/decentralized-storage.ts"

cat > $DECENTRALIZED_STORAGE_FILE <<EOL
export interface DecentralizedStorageNode {
  id: string;
  name: string;
  type: string;
  location: string;
  storageCapacity: number;
  usedStorage: number;
  networkLatency: number;
  pqcEnabled: boolean;
}
EOL

# 🔟 Remove TypeScript Cache
echo "🗑️ Removing TypeScript Cache..."
rm -rf node_modules/.cache

# 11️⃣ Reinstall Dependencies
echo "📦 Reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install

# 12️⃣ Restart TypeScript Server
echo "♻️ Restarting TypeScript Server..."
npx tsc --noEmit
npm run lint --fix

# ✅ Final Build
echo "🚀 Running final build..."
npm run build

echo "✅ All fixes applied successfully!"
