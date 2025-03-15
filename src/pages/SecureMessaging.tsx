
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Database, AlertTriangle } from "lucide-react";
import { Contact } from "@/lib/storage-types";
import { useToast } from "@/components/ui/use-toast";
import { getUserProfile } from "@/lib/storage";
import SecureContactsList from "@/components/secure-messaging/SecureContactsList";
import SecureConversation from "@/components/secure-messaging/SecureConversation";

// Create some demo contacts
const demoContacts: Contact[] = [
  {
    id: "contact1",
    displayName: "Alice Chen",
    name: "Alice Chen",
    publicKey: "ML-KEM-1024-pubkey-alice",
    signatureKey: "SLH-DSA-1024-pubkey-alice",
    created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "online",
    lastMessage: "Have you tested the new key rotation feature?",
    lastMessageTime: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  },
  {
    id: "contact2",
    displayName: "Bob Smith",
    name: "Bob Smith",
    publicKey: "ML-KEM-1024-pubkey-bob",
    signatureKey: "SLH-DSA-1024-pubkey-bob",
    created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "offline",
    lastMessage: "We need to discuss the quantum-resistant TLS integration.",
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "contact3",
    displayName: "Charlie Davis",
    name: "Charlie Davis",
    publicKey: "ML-KEM-1024-pubkey-charlie",
    signatureKey: "SLH-DSA-1024-pubkey-charlie",
    created: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "online",
    lastMessage: "The StarkNet verification is working well.",
    lastMessageTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  }
];

const SecureMessaging: React.FC = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>(demoContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const currentUser = getUserProfile();

  const handleAddContact = () => {
    if (!newContactName.trim()) {
      toast({
        title: "Invalid Contact",
        description: "Please enter a valid contact name.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a unique ID
    const contactId = crypto.randomUUID();
    
    // Create new contact object
    const newContact: Contact = {
      id: contactId,
      displayName: newContactName,
      name: newContactName,
      publicKey: `ML-KEM-1024-pubkey-${contactId.substring(0, 8)}`,
      signatureKey: `SLH-DSA-1024-pubkey-${contactId.substring(0, 8)}`,
      created: new Date().toISOString(),
      status: "offline"
    };
    
    // Update local state
    setContacts(prevContacts => [...prevContacts, newContact]);
    setSelectedContact(newContact);
    
    // Reset form
    setNewContactName('');
    setShowAddContact(false);
    
    toast({
      title: "Contact Added",
      description: `${newContactName} has been added to your secure contacts.`,
    });
  };

  const toggleAddContact = () => {
    setShowAddContact(!showAddContact);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">TetraCryptPQC Secure Messaging</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              <Lock className="h-3.5 w-3.5" />
              <span>PQC Protected</span>
            </Badge>
          </div>
        </div>
        
        {showAddContact && (
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Add New Secure Contact</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Contact name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddContact}>Add</Button>
              <Button variant="ghost" onClick={() => setShowAddContact(false)}>Cancel</Button>
            </div>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
          {/* Contacts list */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col h-full">
            <SecureContactsList 
              contacts={contacts}
              selectedContact={selectedContact}
              onSelectContact={setSelectedContact}
              onAddContact={toggleAddContact}
            />
            
            <div className="p-3 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {currentUser?.displayName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {currentUser?.displayName || "You"}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  <span>FIPS 205/206</span>
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Conversation area */}
          <div className="md:col-span-2 border rounded-lg overflow-hidden h-full">
            {selectedContact ? (
              <SecureConversation 
                contact={selectedContact} 
                onBack={() => setSelectedContact(null)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <Shield className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">Select a contact to start secure messaging</h2>
                <p className="text-muted-foreground text-center max-w-md">
                  All messages are encrypted with post-quantum cryptography,
                  ensuring they remain secure even against quantum computer attacks.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl w-full">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Post-Quantum Encryption</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Using NIST-standardized ML-KEM-1024 (Kyber) and SLH-DSA (Dilithium) algorithms
                      that protect against both classical and quantum computing attacks.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Zero-Knowledge Authentication</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Verify identity without exposing sensitive information using
                      zero-knowledge proofs and decentralized identity (DID).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SecureMessaging;
