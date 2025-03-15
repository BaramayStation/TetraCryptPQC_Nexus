import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomBytes, toHexString } from "@/lib/pqcrypto-core";
import { useUser } from './UserContext';
import { UserProfile } from '@/lib/storage-types/user-types';
import { HSMDevice } from '@/lib/storage-types/hardware-types';

const UserSetup: React.FC = () => {
  const { profile, updateProfile } = useUser();
  const { toast } = useToast();
  const [username, setUsername] = useState(profile?.username || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [securityLevel, setSecurityLevel] = useState<"standard" | "high" | "maximum" | "enhanced">("high");
  const [hsmEnabled, setHsmEnabled] = useState(profile?.hsmInfo ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [hsmInfo, setHsmInfo] = useState<HSMDevice | null>(profile?.hsmInfo || null);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setEmail(profile.email || '');
      setHsmEnabled(!!profile.hsmInfo);
      setHsmInfo(profile.hsmInfo || null);
    }
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulate saving user profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate random keys for simulation
      const pqkemPublicKey = toHexString(generateRandomBytes(32));
      const pqkemPrivateKey = toHexString(generateRandomBytes(64));
      const signaturePublicKey = toHexString(generateRandomBytes(40));
      const signaturePrivateKey = toHexString(generateRandomBytes(80));

      const updatedProfile: UserProfile = {
        ...profile,
        username,
        email,
        keyPairs: {
          pqkem: {
            publicKey: pqkemPublicKey,
            privateKey: pqkemPrivateKey,
            created: new Date().toISOString(),
            algorithm: "ML-KEM-1024",
            strength: "256-bit quantum security",
            standard: "NIST FIPS 205"
          },
          signature: {
            publicKey: signaturePublicKey,
            privateKey: signaturePrivateKey,
            created: new Date().toISOString(),
            algorithm: "SLH-DSA-Dilithium5",
            strength: "256-bit quantum security",
            standard: "NIST FIPS 206"
          }
        },
        hsmInfo: hsmEnabled ? {
          id: "hsm-tpm-1",
          type: "TPM",
          model: "Infineon SLB 9670",
          version: "2.0",
          firmware: "7.2.1.0",
          status: "active",
          capabilities: ["Key Storage", "Remote Attestation", "Secure Boot"],
          securityLevel: securityLevel,
          lastVerified: new Date().toISOString(),
          available: true,
          supportedAlgorithms: ["ML-KEM-1024", "SLH-DSA-Dilithium5", "SHA-384"],
          keyProtectionLevel: securityLevel
        } : null,
        id: profile?.id || "new-user-" + Math.random().toString(36).substring(7),
        created: profile?.created || new Date().toISOString(),
      };

      updateProfile(updatedProfile);

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Profile Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="hsm">
              Hardware Security Module (HSM)
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="hsm"
                checked={hsmEnabled}
                onCheckedChange={(checked) => setHsmEnabled(checked)}
              />
              <span>{hsmEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          {hsmEnabled && (
            <div>
              <Label htmlFor="security-level">HSM Security Level</Label>
              <Select 
                defaultValue="high" 
                onValueChange={value => setSecurityLevel(value as "standard" | "high" | "maximum" | "enhanced")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select security level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="maximum">Maximum</SelectItem>
                  <SelectItem value="enhanced">Enhanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserSetup;
