
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassContainer } from "@/components/ui/glass-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Key, Lock, Eye, EyeOff, Download, Copy, Shield, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getUserProfile } from "@/lib/storage";

const KeyInventoryPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [keys, setKeys] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<any>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  
  useEffect(() => {
    loadKeys();
  }, []);
  
  const loadKeys = () => {
    const profile = getUserProfile();
    const keysList = [];
    
    if (profile?.keyPairs?.pqkem) {
      keysList.push({
        ...profile.keyPairs.pqkem,
        type: "kem",
        displayName: "ML-KEM",
        icon: <Key className="h-4 w-4" />
      });
    }
    
    if (profile?.keyPairs?.signature) {
      keysList.push({
        ...profile.keyPairs.signature,
        type: "signature",
        displayName: "SLH-DSA",
        icon: <Lock className="h-4 w-4" />
      });
    }
    
    // Add mock keys to demonstrate the UI
    if (keysList.length === 0) {
      keysList.push({
        algorithm: "ML-KEM-1024",
        publicKey: "MLKEM1024_a7c3d9fbe2",
        privateKey: "e56d9f4ac2b37e1459c8a2",
        strength: "256-bit",
        standard: "NIST FIPS 205",
        created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        type: "kem",
        displayName: "ML-KEM",
        icon: <Key className="h-4 w-4" />
      });
      
      keysList.push({
        algorithm: "SLH-DSA-Dilithium5",
        publicKey: "SLHDSA5_8c7e6f5d4b3",
        privateKey: "7a5b3c1d9e8f7g6h5j4k",
        strength: "256-bit",
        standard: "NIST FIPS 206",
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: "signature",
        displayName: "SLH-DSA",
        icon: <Lock className="h-4 w-4" />
      });
    }
    
    setKeys(keysList);
  };
  
  const filteredKeys = activeTab === "all" 
    ? keys 
    : keys.filter(key => key.type === activeTab);
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to clipboard`,
    });
  };
  
  const downloadKey = (key: any) => {
    const keyData = JSON.stringify({
      algorithm: key.algorithm,
      publicKey: key.publicKey,
      privateKey: key.privateKey,
      created: key.created,
      standard: key.standard,
      strength: key.strength
    }, null, 2);
    
    const blob = new Blob([keyData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${key.algorithm.toLowerCase().replace(/[- ]/g, "_")}_key.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Key Downloaded",
      description: `Your ${key.algorithm} key has been downloaded`,
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  
  const viewKeyDetails = (key: any) => {
    setSelectedKey(key);
    setShowPrivateKey(false);
  };
  
  const getKeyAge = (created: string) => {
    const createdDate = new Date(created);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const getKeyStatus = (key: any) => {
    const age = getKeyAge(key.created);
    
    if (age <= 90) {
      return { status: "Active", color: "bg-green-500" };
    } else if (age <= 180) {
      return { status: "Aging", color: "bg-yellow-500" };
    } else {
      return { status: "Rotation Needed", color: "bg-red-500" };
    }
  };

  return (
    <GlassContainer className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Key Inventory</h2>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All Keys</TabsTrigger>
            <TabsTrigger value="kem">ML-KEM</TabsTrigger>
            <TabsTrigger value="signature">SLH-DSA</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {keys.length === 0 ? (
        <div className="text-center py-12">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-medium mt-4">No Keys Found</h3>
          <p className="text-muted-foreground mt-2">
            Generate keys in the "Generate" tab to get started.
          </p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Type</TableHead>
                <TableHead>Algorithm</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((key, index) => {
                const keyStatus = getKeyStatus(key);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {key.icon}
                        {key.displayName}
                      </div>
                    </TableCell>
                    <TableCell>{key.algorithm}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{key.standard}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {formatDate(key.created)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={keyStatus.color}>{keyStatus.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => viewKeyDetails(key)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {key.icon}
                              {key.algorithm} Key Details
                            </DialogTitle>
                            <DialogDescription>
                              NIST FIPS {key.type === "kem" ? "205" : "206"} Compliant
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Algorithm</h4>
                                <p className="text-sm bg-muted p-2 rounded">{key.algorithm}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Security Strength</h4>
                                <p className="text-sm bg-muted p-2 rounded">{key.strength}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Created</h4>
                                <p className="text-sm bg-muted p-2 rounded">{formatDate(key.created)}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Standard</h4>
                                <p className="text-sm bg-muted p-2 rounded">{key.standard}</p>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-medium">Public Key</h4>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6"
                                  onClick={() => copyToClipboard(key.publicKey, "Public key")}
                                >
                                  <Copy className="h-3.5 w-3.5 mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <div className="p-2 bg-muted font-mono text-xs rounded-md overflow-x-auto">
                                {key.publicKey}
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-medium">Private Key</h4>
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6"
                                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                                  >
                                    {showPrivateKey ? (
                                      <EyeOff className="h-3.5 w-3.5 mr-1" />
                                    ) : (
                                      <Eye className="h-3.5 w-3.5 mr-1" />
                                    )}
                                    {showPrivateKey ? "Hide" : "Show"}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6"
                                    onClick={() => copyToClipboard(key.privateKey, "Private key")}
                                  >
                                    <Copy className="h-3.5 w-3.5 mr-1" />
                                    Copy
                                  </Button>
                                </div>
                              </div>
                              <div className="p-2 bg-muted font-mono text-xs rounded-md overflow-x-auto">
                                {showPrivateKey ? key.privateKey : key.privateKey.substring(0, 12) + "••••••••••••••••••••••••"}
                              </div>
                              <p className="text-xs text-destructive mt-1">
                                Never share your private key with anyone
                              </p>
                            </div>
                            
                            {getKeyAge(key.created) > 90 && (
                              <Alert className="bg-yellow-500/10 border-yellow-500/20">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <AlertTitle>Key Rotation Recommended</AlertTitle>
                                <AlertDescription>
                                  This key is {getKeyAge(key.created)} days old. Consider rotating it for security best practices.
                                </AlertDescription>
                              </Alert>
                            )}
                            
                            <div className="flex justify-end gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => downloadKey(key)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download Key
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </GlassContainer>
  );
};

export default KeyInventoryPanel;
