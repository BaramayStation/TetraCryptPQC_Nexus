
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/components/ui/glass-container";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, User, Key, Shield, Settings as SettingsIcon, LogOut, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserProfile, clearStorage, getUserProfile, saveUserProfile } from "@/lib/storage";

const Settings = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadedUser = getUserProfile();
    setUser(loadedUser);
    
    if (!loadedUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    clearStorage();
    toast({
      title: "Logged out",
      description: "Your session has been ended and all data cleared.",
    });
    navigate("/");
  };

  const handleCopyKey = (key: string, type: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: `${type} key copied`,
      description: "The key has been copied to your clipboard.",
    });
  };

  const updateUserName = (name: string) => {
    if (!user || name.trim().length < 3) return;
    
    const updatedUser = {
      ...user,
      name: name.trim(),
    };
    
    saveUserProfile(updatedUser);
    setUser(updatedUser);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  if (!user) return null;

  // Get public/private keys from the appropriate location in the user object
  const publicKey = user.keyPairs.pqkem?.publicKey || "";
  const privateKey = user.keyPairs.pqkem?.privateKey || "";
  const sigPublicKey = user.keyPairs.signature?.publicKey || "";
  const sigPrivateKey = user.keyPairs.signature?.privateKey || "";

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/chat")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <GlassContainer className="mb-6" animation="fade-in">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    defaultValue={user.name}
                    onBlur={(e) => updateUserName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="userId" className="text-sm font-medium">
                    User ID
                  </label>
                  <div className="relative">
                    <Input id="userId" value={user.id} readOnly />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleCopyKey(user.id, "User ID")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share this ID with contacts who want to add you
                  </p>
                </div>
              </div>
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="security">
            <GlassContainer className="mb-6" animation="fade-in">
              <h2 className="text-xl font-semibold mb-4">Cryptographic Keys</h2>
              <p className="text-sm text-muted-foreground mb-4">
                These are your NIST FIPS 205-compliant post-quantum cryptographic keys used for secure communication.
                Never share your private keys with anyone.
              </p>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-medium">ML-KEM-1024 Keys (NIST FIPS 205)</h3>
                  </div>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Public Key</label>
                      <div className="relative">
                        <Input
                          value={publicKey}
                          readOnly
                          className="font-mono text-xs pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleCopyKey(publicKey, "ML-KEM public")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Share this with contacts to establish quantum-resistant encrypted communication
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Private Key</label>
                      <div className="relative">
                        <Input
                          type="password"
                          value="●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●"
                          readOnly
                          className="font-mono text-xs pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleCopyKey(privateKey, "ML-KEM private")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-destructive">
                        Never share your private key with anyone
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-medium">SLH-DSA Keys (NIST FIPS 205)</h3>
                  </div>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Public Key</label>
                      <div className="relative">
                        <Input
                          value={sigPublicKey}
                          readOnly
                          className="font-mono text-xs pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleCopyKey(sigPublicKey, "SLH-DSA public")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Used to verify your quantum-resistant digital signatures
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Private Key</label>
                      <div className="relative">
                        <Input
                          type="password"
                          value="●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●"
                          readOnly
                          className="font-mono text-xs pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleCopyKey(sigPrivateKey, "SLH-DSA private")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-destructive">
                        Never share your private key with anyone
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </TabsContent>
          
          <TabsContent value="advanced">
            <GlassContainer className="mb-6" animation="fade-in">
              <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Perfect Forward Secrecy</label>
                    <p className="text-xs text-muted-foreground">
                      Regularly rotate encryption keys for enhanced security
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">FIPS 205 Compliance</label>
                    <p className="text-xs text-muted-foreground">
                      Ensure all cryptographic operations follow NIST standards
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Hybrid Encryption</label>
                    <p className="text-xs text-muted-foreground">
                      Use both post-quantum and classical encryption for stronger security
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Federated Mode</label>
                    <p className="text-xs text-muted-foreground">
                      Connect to a federation of secure servers
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </GlassContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
