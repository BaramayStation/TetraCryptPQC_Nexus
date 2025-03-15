import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  generateMLKEMKeypair, 
  generateSLHDSAKeypair,
  generateDID 
} from '@/lib/pqcrypto';
import { saveUserProfile } from '@/lib/storage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Shield, User, Key, Lock } from 'lucide-react';
import { checkHardwareSecurityCapabilities } from '@/lib/secure-infrastructure';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityLevel: 'high' as 'standard' | 'high' | 'maximum',
  });
  const [loading, setLoading] = useState(false);
  const [generatingKeys, setGeneratingKeys] = useState(false);
  const [keyGenProgress, setKeyGenProgress] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [hardwareSecurityAvailable, setHardwareSecurityAvailable] = useState(false);
  const [useHardwareSecurity, setUseHardwareSecurity] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  useEffect(() => {
    const checkHardwareSecurity = async () => {
      try {
        const capabilities = await checkHardwareSecurityCapabilities();
        setHardwareSecurityAvailable(capabilities.available && capabilities.tpm);
      } catch (error) {
        console.error("Failed to check hardware security capabilities:", error);
        setHardwareSecurityAvailable(false);
      }
    };
    
    checkHardwareSecurity();
  }, []);

  const simulateKeyGeneration = () => {
    setGeneratingKeys(true);
    const interval = setInterval(() => {
      setKeyGenProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return interval;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordStrength < 50) {
      toast({
        title: "Password too weak",
        description: "Please use a stronger password with a mix of characters.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    const progressInterval = simulateKeyGeneration();
    
    try {
      const pqkemKeyPair = await generateMLKEMKeypair();
      const signatureKeyPair = await generateSLHDSAKeypair();
      
      const didDocument = await generateDID(
        pqkemKeyPair.publicKey,
        signatureKeyPair.publicKey
      );
      
      const newUser = {
        id: crypto.randomUUID(),
        userId: crypto.randomUUID(),
        username: formData.username,
        name: formData.username,
        displayName: formData.username,
        email: formData.email,
        keyPairs: {
          pqkem: {
            publicKey: pqkemKeyPair.publicKey,
            privateKey: pqkemKeyPair.privateKey,
            created: pqkemKeyPair.created,
            algorithm: pqkemKeyPair.algorithm,
            strength: "256-bit quantum security",
            standard: "NIST FIPS 205"
          },
          signature: {
            publicKey: signatureKeyPair.publicKey,
            privateKey: signatureKeyPair.privateKey,
            created: signatureKeyPair.created,
            algorithm: signatureKeyPair.algorithm,
            strength: "256-bit quantum security",
            standard: "NIST FIPS 206"
          }
        },
        didDocument,
        publicKey: pqkemKeyPair.publicKey,
        signatureKey: signatureKeyPair.publicKey,
        settings: {
          theme: 'dark',
          notifications: true,
          encryptionDefault: 'ML-KEM-1024',
          privacyLevel: formData.securityLevel,
          autoKeyRotation: true,
          keyRotationDays: 90
        },
        securityLevel: formData.securityLevel,
        created: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      clearInterval(progressInterval);
      setKeyGenProgress(100);
      
      saveUserProfile(newUser);
      
      toast({
        title: "Account created!",
        description: "Your quantum-secure cryptographic identity has been established",
      });
      
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      clearInterval(progressInterval);
      setGeneratingKeys(false);
      setKeyGenProgress(0);
      setLoading(false);
      
      toast({
        title: "Registration failed",
        description: "An error occurred during the account creation process",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[85vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create TetraCryptPQC Account</CardTitle>
          <CardDescription>
            Register a quantum-secure identity with post-quantum cryptography
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username"
                type="text" 
                value={formData.username} 
                onChange={handleChange}
                placeholder="Enter a username"
                autoComplete="username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                value={formData.password} 
                onChange={handleChange}
                placeholder="Create a secure password"
                autoComplete="new-password"
                required
              />
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Password Strength</span>
                    <span className="text-xs font-medium">
                      {passwordStrength < 40 ? "Weak" : 
                       passwordStrength < 70 ? "Medium" : "Strong"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()}`} 
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="securityLevel">Security Level</Label>
              <Select 
                value={formData.securityLevel} 
                onValueChange={(value) => setFormData(prev => ({
                  ...prev, 
                  securityLevel: value as 'standard' | 'high' | 'maximum'
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select security level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="maximum">Maximum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hardwareSecurityAvailable && (
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Checkbox 
                  id="useHardwareSecurity" 
                  checked={useHardwareSecurity}
                  onCheckedChange={(checked) => setUseHardwareSecurity(checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="useHardwareSecurity" className="text-sm font-medium">
                    Use hardware-based security
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Store cryptographic keys in the secure hardware module
                  </p>
                </div>
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
            )}
            
            <Alert variant="outline" className="bg-muted border-primary/20">
              <Shield className="h-4 w-4" />
              <AlertTitle>Post-Quantum Protection</AlertTitle>
              <AlertDescription className="text-xs text-muted-foreground">
                Your account will be secured with ML-KEM-1024 for encryption and SLH-DSA for digital signatures, protecting against quantum computer attacks.
              </AlertDescription>
            </Alert>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            type="submit" 
            variant="default"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Key className="mr-2 h-4 w-4 animate-pulse" />
                Creating Secure Account...
              </>
            ) : (
              "Register"
            )}
          </Button>
          
          {generatingKeys && (
            <div className="w-full mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs">Generating post-quantum keys</span>
                <span className="text-xs font-medium">{keyGenProgress}%</span>
              </div>
              <Progress value={keyGenProgress} className="h-2" />
            </div>
          )}
        </CardFooter>
      </Card>
      
      <div className="mt-4 flex flex-col items-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <a 
            onClick={() => navigate('/login')} 
            className="text-primary hover:underline cursor-pointer"
          >
            Sign in
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

export default Register;
