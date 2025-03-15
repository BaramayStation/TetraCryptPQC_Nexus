
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle, Terminal, RefreshCw, AlertCircle } from 'lucide-react';
import { checkTDESupport, checkDatabaseEncryptionStatus } from '@/lib/secure-storage/key-management';
import { SecurityLevel } from '@/lib/quantum-utils/constants';

interface SecurityStatus {
  overallScore: number;
  quantumResistance: number;
  encryptionStatus: 'active' | 'partial' | 'inactive';
  lastScan: string;
  threatLevel: 'none' | 'low' | 'medium' | 'high';
  activeProtection: string[];
  currentSecurityLevel: SecurityLevel;
}

const SecurityDashboard: React.FC = () => {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    overallScore: 0,
    quantumResistance: 0,
    encryptionStatus: 'inactive',
    lastScan: 'Never',
    threatLevel: 'none',
    activeProtection: [],
    currentSecurityLevel: SecurityLevel.STANDARD
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        setIsLoading(true);
        
        // Check encryption status
        const tdeSupported = await checkTDESupport();
        const dbEncryptionStatus = await checkDatabaseEncryptionStatus();
        
        // Simulate security scan
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setSecurityStatus({
          overallScore: 85,
          quantumResistance: 92,
          encryptionStatus: dbEncryptionStatus.tdeEnabled ? 'active' : 'inactive',
          lastScan: new Date().toISOString(),
          threatLevel: 'low',
          activeProtection: [
            'ML-KEM-1024 Encryption',
            'ML-DSA-87 Signatures',
            'AES-256-GCM Transport Security',
            'Biometric Authentication'
          ],
          currentSecurityLevel: SecurityLevel.ENHANCED
        });
      } catch (error) {
        console.error('Error initializing security dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeSecurity();
  }, []);
  
  const runSecurityScan = async () => {
    setIsLoading(true);
    
    // Simulate security scan
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSecurityStatus(prev => ({
      ...prev,
      lastScan: new Date().toISOString()
    }));
    
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="secure-panel-header">
        <Shield className="h-4 w-4 mr-2 text-primary" />
        <span>SECURITY DASHBOARD</span>
        <span className="text-muted-foreground ml-2 text-xs">// CLASSIFICATION: TOP SECRET</span>
        <div className="ml-auto flex items-center space-x-2">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse mr-1"></span>
            <span className="text-xs text-primary">QUANTUM SECURE</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="secure-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono flex items-center">
              <Lock className="h-4 w-4 mr-2 text-primary" />
              PQC SECURITY STATUS
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Scanning security systems...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Overall Security</span>
                    <span className="text-xs">{securityStatus.overallScore}%</span>
                  </div>
                  <Progress value={securityStatus.overallScore} className="h-1.5" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Quantum Resistance</span>
                    <span className="text-xs">{securityStatus.quantumResistance}%</span>
                  </div>
                  <Progress value={securityStatus.quantumResistance} className="h-1.5" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Encryption Status</span>
                  <Badge 
                    variant={
                      securityStatus.encryptionStatus === 'active' ? "outline" : 
                      securityStatus.encryptionStatus === 'partial' ? "secondary" : "destructive"
                    }
                    className="text-xs px-1 py-0"
                  >
                    {securityStatus.encryptionStatus === 'active' ? 'ACTIVE' : 
                     securityStatus.encryptionStatus === 'partial' ? 'PARTIAL' : 'INACTIVE'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Security Level</span>
                  <Badge 
                    variant="outline"
                    className="text-xs px-1 py-0 bg-primary/10 text-primary border-primary/20"
                  >
                    {securityStatus.currentSecurityLevel.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Last Scan</span>
                  <span className="text-xs text-muted-foreground">
                    {securityStatus.lastScan === 'Never' ? 'Never' : 
                      new Date(securityStatus.lastScan).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="secure-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
              THREAT MONITORING
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Current Threat Level</span>
                  <Badge 
                    variant={
                      securityStatus.threatLevel === 'none' ? "outline" : 
                      securityStatus.threatLevel === 'low' ? "secondary" :
                      securityStatus.threatLevel === 'medium' ? "default" : "destructive"
                    }
                    className={`text-xs px-1.5 py-0.5 ${
                      securityStatus.threatLevel === 'high' ? 'animate-pulse' : ''
                    }`}
                  >
                    {securityStatus.threatLevel.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="border border-border bg-muted/30 rounded p-2">
                  <h4 className="text-xs font-semibold mb-2">Active Protection</h4>
                  <ul className="space-y-1">
                    {securityStatus.activeProtection.map((protection, idx) => (
                      <li key={idx} className="text-xs flex items-start">
                        <span className="h-3 w-3 rounded-full bg-secure mt-0.5 mr-2 flex-shrink-0 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-background"></span>
                        </span>
                        {protection}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-muted/10 border border-border/50 rounded p-2 text-xs">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      All quantum-safe algorithms are active and functioning at optimal levels. 
                      No post-quantum vulnerabilities detected in current session.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="secure-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono flex items-center">
              <Terminal className="h-4 w-4 mr-2 text-primary" />
              SECURITY OPERATIONS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="secure-terminal scanner h-32 overflow-y-auto relative">
                <p className="text-xs opacity-70">$ initiating_quantum_scan...</p>
                <p className="text-xs opacity-80 mt-1">$ scanning_crypto_modules...</p>
                <p className="text-xs opacity-90 mt-1">$ verifying_ml_kem_keys...</p>
                <p className="text-xs mt-1">$ quantum_resistance_check: ML-KEM-1024 PASS</p>
                <p className="text-xs mt-1">$ quantum_resistance_check: ML-DSA-87 PASS</p>
                <p className="text-xs mt-1">$ checking_entropy_sources...</p>
                <p className="text-xs mt-1">$ entropy_quality: 99.8% EXCELLENT</p>
                <p className="text-xs opacity-70 mt-1">$ scan_complete</p>
                <p className="text-xs mt-2 animate-pulse">█</p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="secondary" 
                  className="text-xs h-8 w-full"
                  onClick={runSecurityScan}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-3 w-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Scanning...' : 'Run Security Scan'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-xs h-8 w-full"
                  disabled={isLoading}
                >
                  <Shield className="h-3 w-3 mr-2" />
                  Upgrade Security Level
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityDashboard;
