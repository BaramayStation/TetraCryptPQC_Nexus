
import React, { useEffect, useState } from "react";
import { Contact, UserProfile, getContacts, getUserProfile } from "@/lib/storage";
import UserSetup from "@/components/user/UserSetup";
import ContactList from "@/components/chat/ContactList";
import Conversation from "@/components/chat/Conversation";
import MessageList from "@/components/chat/MessageList";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Shield, HelpCircle, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ChatInfoModal from "@/components/chat/ChatInfoModal";
import { Badge } from "@/components/ui/badge";

const Chat = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactsTab, setContactsTab] = useState<"active" | "all">("active");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load user profile
    const loadedUser = getUserProfile();
    if (loadedUser) {
      setUser(loadedUser);
      loadContacts();
    }
    setLoading(false);
  }, []);

  const loadContacts = () => {
    const loadedContacts = getContacts();
    setContacts(loadedContacts);
  };

  const handleUserSetupComplete = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
  };

  const handleBack = () => {
    setSelectedContactId(null);
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">Loading secure messaging...</div>
      </div>
    );
  }

  if (!user) {
    return <UserSetup onSetupComplete={handleUserSetupComplete} />;
  }

  const selectedContact = contacts.find((c) => c.id === selectedContactId);
  const activeContacts = contacts.filter(c => c.lastMessageTime);
  const displayedContacts = contactsTab === "active" ? activeContacts : contacts;

  if (isMobile) {
    return (
      <div className="h-screen w-full flex flex-col">
        {selectedContactId && selectedContact ? (
          <Conversation contact={selectedContact} onBack={handleBack} />
        ) : (
          <>
            <div className="border-b p-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold flex items-center gap-1">
                <Shield className="h-5 w-5 text-accent" />
                Messages
              </h1>
              <div className="flex items-center gap-1">
                <ChatInfoModal>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </ChatInfoModal>
                <Button variant="ghost" size="icon" onClick={goToSettings}>
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-3">
              <Alert variant="default" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Secure Communications</AlertTitle>
                <AlertDescription className="text-xs">
                  All messages are protected with post-quantum encryption. No one, including us, can read your messages.
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="px-3 mb-1">
              <Tabs value={contactsTab} onValueChange={(v: string) => setContactsTab(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active" className="text-xs">
                    Active Conversations
                    {activeContacts.length > 0 && (
                      <Badge className="ml-2 text-[10px]">{activeContacts.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="all" className="text-xs">
                    All Contacts
                    <Badge className="ml-2 text-[10px]">{contacts.length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ContactList
                contacts={displayedContacts}
                selectedContactId={selectedContactId}
                onSelectContact={handleContactSelect}
                onRefreshContacts={loadContacts}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-1">
          <Shield className="h-5 w-5 text-accent" />
          Quantum Secure Messaging
        </h1>
        <div className="flex items-center gap-1">
          <ChatInfoModal>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </ChatInfoModal>
          <Button variant="ghost" size="icon" onClick={goToSettings}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r overflow-hidden flex flex-col">
          <div className="p-3">
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium flex items-center gap-1">
                  <Shield className="h-4 w-4 text-accent" />
                  Secure Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="py-1 px-3 text-xs text-muted-foreground">
                <p>
                  Your messages are protected with NIST FIPS 205/206 post-quantum cryptography.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="px-3 mb-1">
            <Tabs value={contactsTab} onValueChange={(v: string) => setContactsTab(v as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active" className="text-xs">
                  Active
                  {activeContacts.length > 0 && (
                    <Badge className="ml-2 text-[10px]">{activeContacts.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="all" className="text-xs">
                  All Contacts
                  <Badge className="ml-2 text-[10px]">{contacts.length}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ContactList
            contacts={displayedContacts}
            selectedContactId={selectedContactId}
            onSelectContact={handleContactSelect}
            onRefreshContacts={loadContacts}
          />
        </div>

        <div className="flex-1 overflow-hidden grid grid-rows-[1fr,auto]">
          {selectedContact ? (
            <>
              <Conversation contact={selectedContact} />
              <div className="p-4 border-t">
                <MessageList contactId={selectedContact.id} />
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-4 bg-gradient-to-b from-transparent to-accent/5">
              <div className="max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Select a Contact</h2>
                <p className="text-muted-foreground">
                  Choose a contact from the list to start a secure, post-quantum encrypted conversation. 
                  All messages are protected using NIST FIPS 205/206 compliant cryptography.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Button variant="outline" asChild>
                    <a href="/documentation">View Documentation</a>
                  </Button>
                  <Button variant="default">
                    Add New Contact
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
