
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Download, Upload, Eye, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const BackupPanel: React.FC = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);
  
  // Simulated recovery phrase
  const recoveryPhrase = [
    "quantum", "secure", "network", "protocol",
    "cryptography", "resistant", "orbital", "asteroid", 
    "neural", "autonomous", "algorithm", "integrity",
    "verify", "distributed", "consensus", "starknet",
    "signature", "dilithium", "falcon", "matrix",
    "lattice", "entropy", "compute", "vector"
  ];
  
  const handleBackup = async () => {
    setIsBackingUp(true);
    
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBackingUp(false);
    setLastBackupTime(new Date().toLocaleString());
    
    toast({
      title: "Wallet Backup Complete",
      description: "Your wallet was successfully backed up with ML-KEM encryption.",
    });
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Secure Backup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Post-Quantum Encrypted Backup</AlertTitle>
              <AlertDescription>
                Your backup is secured with ML-KEM-1024 encryption and stored across decentralized nodes.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center">
                  <Download className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Backup Wallet</p>
                    <p className="text-xs text-muted-foreground">Create encrypted backup</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleBackup}
                  disabled={isBackingUp}
                >
                  {isBackingUp ? 'Backing up...' : 'Backup'}
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Restore Wallet</p>
                    <p className="text-xs text-muted-foreground">Recover from backup</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Restore</Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">Recovery Phrase</p>
                    <p className="text-xs text-muted-foreground">View 24-word seed phrase</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowRecoveryPhrase(true)}>View</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Backup Status</h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Last Backup</p>
                  <p className="text-sm">{lastBackupTime || 'Never'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Backup Type</p>
                  <p className="text-sm">Distributed PQC</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Encryption</p>
                  <p className="text-sm">ML-KEM-1024</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Storage</p>
                  <p className="text-sm">IPFS + Secure Nodes</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Backup Security</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Post-quantum encrypted</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Threshold secret sharing (3-of-5)</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">AI-verified integrity</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Tamper-resistant storage</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleBackup} disabled={isBackingUp}>
            {isBackingUp ? 'Creating Backup...' : 'Backup Now'}
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={showRecoveryPhrase} onOpenChange={setShowRecoveryPhrase}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recovery Phrase</DialogTitle>
            <DialogDescription>
              Store these 24 words in a secure location. They can be used to recover your wallet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-2 p-4 bg-muted rounded-md">
            {recoveryPhrase.map((word, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xs text-muted-foreground mr-1">{index + 1}.</span>
                <span className="text-sm">{word}</span>
              </div>
            ))}
          </div>
          
          <Alert variant="destructive">
            <AlertTitle>Important Security Warning</AlertTitle>
            <AlertDescription>
              Never share your recovery phrase with anyone. This provides complete access to your wallet.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-end">
            <Button onClick={() => setShowRecoveryPhrase(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BackupPanel;
