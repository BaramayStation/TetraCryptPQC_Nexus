
import React, { useState, useEffect } from "react";
import { GlassContainer } from "@/components/ui/glass-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Shield, MessageCircle, Settings, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactList from "@/components/chat/ContactList"; 
import Conversation from "@/components/chat/Conversation";
import { Contact, Message } from "@/lib/storage-types"; 
import { getContacts, addContact, getUserProfile } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";
import P2PMessagingPanel from "@/components/chat/P2PMessagingPanel";
import P2PInfoPanel from "@/components/chat/P2PInfoPanel";
import { useP2PMessaging } from "@/hooks/use-p2p-messaging";

const Chat: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string>("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [newContactId, setNewContactId] = useState("");
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isContactsLoading, setIsContactsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"direct" | "p2p">("direct");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getUserProfile();
  
  const {
    connectionState,
    peerCount,
    messages: p2pMessages,
    sendMessage: sendP2PMessage,
    isLoading: isP2PLoading,
    reconnect: reconnectP2P
  } = useP2PMessaging();
  
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    
    loadContacts();
  }, [navigate]);
  
  const loadContacts = async () => {
    setIsContactsLoading(true);
    try {
      const loadedContacts = getContacts();
      setContacts(loadedContacts);
      
      // Select first contact if none selected and contacts exist
      if (!selectedContactId && loadedContacts.length > 0) {
        setSelectedContactId(loadedContacts[0].id);
      }
    } catch (error) {
      console.error("Failed to load contacts:", error);
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive",
      });
    } finally {
      setIsContactsLoading(false);
    }
  };
  
  const handleAddContact = async () => {
    if (!newContactId.trim()) return;
    
    setIsAddingContact(true);
    try {
      // In a real implementation, this would lookup the contact by ID
      // and retrieve their public key from a directory or direct exchange
      const newContact: Contact = {
        id: newContactId.trim(),
        name: `Contact ${contacts.length + 1}`,
        publicKey: "simulated-public-key", // In a real app, this would be a real key
        signatureKey: "simulated-signature-key", // Required field
        lastMessage: "New contact added",
        lastMessageTime: new Date().toISOString(),
        status: "offline"
      };
      
      addContact(newContact);
      
      setContacts(prev => [...prev, newContact]);
      setSelectedContactId(newContact.id);
      setIsContactModalOpen(false);
      setNewContactId("");
      
      toast({
        title: "Contact Added",
        description: `Added new contact ${newContact.name}`,
      });
    } catch (error) {
      console.error("Failed to add contact:", error);
      toast({
        title: "Error",
        description: "Failed to add contact",
        variant: "destructive",
      });
    } finally {
      setIsAddingContact(false);
    }
  };
  
  const handleRefreshContacts = () => {
    loadContacts();
  };
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-full sm:w-80 h-full border-r bg-muted/10 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">TetraCryptPQC</h2>
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs 
          defaultValue="direct" 
          className="flex-1 flex flex-col"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "direct" | "p2p")}
        >
          <TabsList className="grid grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="direct" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>Direct</span>
            </TabsTrigger>
            <TabsTrigger value="p2p" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>P2P</span>
              {peerCount > 0 && (
                <Badge variant="outline" className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center">
                  {peerCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct" className="flex-1 flex flex-col mt-0 p-0 pt-4">
            {isContactsLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <ContactList
                  contacts={filteredContacts}
                  selectedContactId={selectedContactId}
                  onSelectContact={setSelectedContactId}
                />
                
                <div className="p-4 mt-auto">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Contact
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="p2p" className="flex-1 flex flex-col mt-0 p-0 pt-4">
            <P2PInfoPanel
              connectionState={connectionState}
              peerCount={peerCount}
              onReconnect={reconnectP2P}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {activeTab === "direct" ? (
          selectedContactId ? (
            // Find the selected contact and pass it to the Conversation component
            contacts.find(c => c.id === selectedContactId) ? (
              <Conversation 
                contact={contacts.find(c => c.id === selectedContactId)!}
                onBack={() => setSelectedContactId("")}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Contact not found</p>
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">Secure Messaging</h2>
                <p className="text-muted-foreground mb-4">
                  Select a contact to start a post-quantum encrypted conversation, 
                  or add a new contact to begin messaging.
                </p>
                <Button onClick={() => setIsContactModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Contact
                </Button>
              </div>
            </div>
          )
        ) : (
          <P2PMessagingPanel 
            messages={p2pMessages}
            sendMessage={sendP2PMessage}
            isLoading={isP2PLoading}
          />
        )}
      </div>
      
      {/* Add Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="contactId" className="text-sm font-medium block mb-1">
                    Contact ID
                  </label>
                  <Input
                    id="contactId"
                    value={newContactId}
                    onChange={(e) => setNewContactId(e.target.value)}
                    placeholder="Enter contact ID"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enter the unique ID of the contact you want to add.
                  </p>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsContactModalOpen(false);
                      setNewContactId("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddContact}
                    disabled={!newContactId.trim() || isAddingContact}
                  >
                    {isAddingContact ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Chat;
