import React, { useState, useEffect } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Badge } from "@/components/ui/badge";
import { Shield, Database, Fingerprint, Lock, Globe, Key, Eye, Cloud } from "lucide-react";
import { getUserProfile } from "@/lib/storage";
import { verifyDID } from "@/lib/crypto";
import { loadFromIPFS } from "@/lib/web3Storage";
import { useToast } from "@/components/ui/use-toast";

const SecurityArchitecture: React.FC = () => {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [didVerified, setDidVerified] = useState<boolean | null>(null);
  const [ipfsStatus, setIpfsStatus] = useState<string>("🔍 Checking...");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = getUserProfile();
      setUserProfile(profile);

      // Verify Decentralized Identity (DID) if enabled
      if (profile?.didDocument) {
        const verified = await verifyDID(profile.didDocument);
        setDidVerified(verified);
      }

      // Check IPFS status
      if (profile?.latestMessage?.ipfsHash) {
        try {
          const data = await loadFromIPFS(profile.latestMessage.ipfsHash);
          setIpfsStatus(data ? "✅ IPFS Active" : "⚠️ IPFS Error");
        } catch {
          setIpfsStatus("❌ IPFS Offline");
        }
      } else {
        setIpfsStatus("⚠️ No IPFS Data");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <GlassContainer className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Shield className="h-6 w-6 text-accent" />
        Security Architecture
      </h2>
      <p className="text-muted-foreground text-sm">
        TetraCryptPQC implements post-quantum security measures, Web3 identity, and decentralized storage to protect against both classical and quantum threats.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* ✅ Post-Quantum Cryptography */}
        <Badge variant="outline" className="flex items-center gap-2">
          <Key className="h-4 w-4 text-accent" />
          ML-KEM-1024 Encryption
        </Badge>

        <Badge variant="outline" className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-accent" />
          SLH-DSA Signatures
        </Badge>

        {/* ✅ Web3 & Decentralized Identity */}
        <Badge variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-accent" />
          {didVerified === null ? "🔍 Verifying DID..." : didVerified ? "✅ DID Verified" : "⚠️ DID Unverified"}
        </Badge>

        <Badge variant="outline" className="flex items-center gap-2">
          <Database className="h-4 w-4 text-accent" />
          {ipfsStatus}
        </Badge>

        {/* ✅ Hardware Security & Quantum Features */}
        <Badge variant="outline" className="flex items-center gap-2">
          <Fingerprint className="h-4 w-4 text-accent" />
          {userProfile?.hsmInfo ? "✅ HSM Secured" : "⚠️ No HSM"}
        </Badge>

        <Badge variant="outline" className="flex items-center gap-2">
          <Cloud className="h-4 w-4 text-accent" />
          {userProfile?.qkdInfo ? "✅ QKD Enabled" : "⚠️ No QKD"}
        </Badge>
      </div>

      {/* Show security status */}
      <div className="mt-4 p-4 bg-accent/10 rounded-lg">
        <p className="text-sm">
          <Eye className="inline-block h-5 w-5 text-accent" /> Your security settings are configured to protect against **quantum attacks**, **identity fraud**, and **data breaches**.
        </p>
      </div>
    </GlassContainer>
  );
};

export default SecurityArchitecture;
