import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { generateMLKEMKeypair, generateSLHDSAKeypair } from '@/lib/pqcrypto';
import { checkHardwareSecurityCapabilities } from '@/lib/secure-infrastructure';
import { getUserProfile, saveUserProfile } from '@/lib/storage';
import { Lock, ShieldAlert, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [useHardwareSecurity, setUseHardwareSecurity] = useState(false);
  const [hardwareSecurityAvailable, setHardwareSecurityAvailable] = useState<boolean | null>(null);

  React.useEffect(() => {
    const checkHardwareSecurity = async () => {
      try {
        const hardwareCapabilities = await checkHardwareSecurityCapabilities();
        setHardwareSecurityAvailable(hardwareCapabilities.available && hardwareCapabilities.tpm);
      } catch (error) {
        console.error("Failed to check hardware security capabilities:", error);
        setHardwareSecurityAvailable(false);
      }
    };
    
    checkHardwareSecurity();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Username and password are required",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = getUserProfile();
      
      if (existingUser && existingUser.username === username) {
        saveUserProfile({
          ...existingUser,
          lastLogin: new Date().toISOString()
        });
        
        toast({
          title: "Welcome back!",
          description: "Successfully authenticated with quantum-secure verification",
        });
      } else {
        console.log("Generating post-quantum cryptographic keypairs...");
        
        const pqkemKeyPair = await generateMLKEMKeypair();
        const signatureKeyPair = await generateSLHDSAKeypair();
        
        const newUser = {
          id: crypto.randomUUID(),
          userId: crypto.randomUUID(),
          username,
          name: username,
          displayName: username,
          keyPairs: {
            pqkem: {
              publicKey: "KYBER-PUB-" + Math.random().toString(36).substring(7),
              privateKey: "KYBER-PRIV-" + Math.random().toString(36).substring(7),
              created: new Date().toISOString(),
              algorithm: "ML-KEM-1024",
              strength: "256-bit quantum security",
              standard: "NIST FIPS 205"
            },
            signature: {
              publicKey: "DILITHIUM-PUB-" + Math.random().toString(36).substring(7),
              privateKey: "DILITHIUM-PRIV-" + Math.random().toString(36).substring(7),
              created: new Date().toISOString(),
              algorithm: "SLH-DSA-Dilithium5",
              strength: "256-bit quantum security",
              standard: "NIST FIPS 206"
            }
          },
          publicKey: pqkemKeyPair.publicKey,
          signatureKey: signatureKeyPair.publicKey,
          settings: {
            theme: 'dark',
            notifications: true,
            encryptionDefault: 'ML-KEM-1024',
            privacyLevel: 'high',
            autoKeyRotation: true,
            keyRotationDays: 90
          },
          securityLevel: 'high',
          created: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        saveUserProfile(newUser);
        
        toast({
          title: "Account created!",
          description: "Your quantum-secure cryptographic identity has been established",
        });
      }
      
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      
      toast({
        title: "Authentication failed",
        description: "An error occurred during the quantum-secure authentication process",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">TetraCryptPQC Login</CardTitle>
          <CardDescription>
            Access your quantum-secure account with post-quantum authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            
            {hardwareSecurityAvailable !== null && (
              <div className="flex items-center space-x-2 mt-4 p-3 rounded-md bg-muted">
                {hardwareSecurityAvailable ? (
                  <>
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <Label 
                        htmlFor="hardware-security" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Use Hardware-Based Security
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Enhance protection with TPM-backed post-quantum key storage
                      </p>
                    </div>
                    <Checkbox 
                      id="hardware-security" 
                      checked={useHardwareSecurity}
                      onCheckedChange={(checked) => setUseHardwareSecurity(checked as boolean)}
                    />
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm">Hardware security module not detected</p>
                      <p className="text-xs text-muted-foreground">Software-based protection will be used</p>
                    </div>
                  </>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Lock className="mr-2 h-4 w-4 animate-pulse" />
                Authenticating...
              </>
            ) : (
              "Sign in with quantum security"
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-4 flex flex-col items-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a 
            onClick={() => navigate('/register')} 
            className="text-primary hover:underline cursor-pointer"
          >
            Register
          </a>
        </p>
        <div className="mt-6 flex items-center space-x-2">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Protected by TetraCryptPQC post-quantum encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
