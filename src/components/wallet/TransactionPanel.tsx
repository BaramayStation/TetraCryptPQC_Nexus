
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { signMessage } from '@/lib/pqcrypto';

const TransactionPanel: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'enhanced' | 'maximum'>('standard');
  
  const handleSendTransaction = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Validation Error",
        description: "Please enter recipient address and amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate AI transaction verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Simulate signing transaction with PQC
      const signature = await signMessage(`Send ${amount} to ${recipient}`, "simulated-private-key");
      
      toast({
        title: "Transaction Successful",
        description: `Sent ${amount} to ${recipient.substring(0, 8)}...`,
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "An error occurred while processing your transaction",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input 
              id="recipient" 
              placeholder="0x..." 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="security-level">Security Level</Label>
            <select 
              id="security-level"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
              value={securityLevel}
              onChange={(e) => setSecurityLevel(e.target.value as any)}
            >
              <option value="standard">Standard PQC</option>
              <option value="enhanced">Enhanced AI-Verification</option>
              <option value="maximum">Maximum (MPC + zk-STARK Proof)</option>
            </select>
          </div>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>AI-Secured Transaction</AlertTitle>
            <AlertDescription>
              {securityLevel === 'standard' ? 
                'Your transaction will be protected with ML-KEM and SLH-DSA signatures.' :
               securityLevel === 'enhanced' ? 
                'Enhanced security with AI verification and anomaly detection.' :
                'Maximum security using multi-party computation and zk-STARK proofs.'}
            </AlertDescription>
          </Alert>
          
          {securityLevel === 'maximum' && (
            <div className="text-xs text-amber-500 flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Maximum security will add 15-30 seconds to processing time
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSendTransaction}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : (
            <span className="flex items-center">
              Send Transaction
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionPanel;
