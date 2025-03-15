
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassContainer } from "@/components/ui/glass-container";
import { UserPlus, Search, ChevronDown, ChevronUp, User, Menu } from "lucide-react";
import { Contact, saveContact } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
  onRefreshContacts: () => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
  onRefreshContacts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactId, setNewContactId] = useState("");
  const [newContactKey, setNewContactKey] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const isMobile = useIsMobile();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = () => {
    if (newContactName.trim().length < 3) return;

    const newContact: Contact = {
      id: newContactId || crypto.randomUUID(),
      name: newContactName.trim(),
      publicKey: newContactKey || "[Placeholder Public Key]",
      unreadCount: 0,
      lastMessage: "",
    };

    saveContact(newContact);
    onRefreshContacts();
    
    // Reset form
    setNewContactName("");
    setNewContactId("");
    setNewContactKey("");
    setShowAddContact(false);
    setIsAdvancedOpen(false);
  };

  const toggleAdvanced = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

  const ContactForm = () => (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-medium">Add New Contact</h3>
      <div className="space-y-3">
        <Input
          placeholder="Contact Name"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Advanced Options</span>
          <Button variant="ghost" size="sm" onClick={toggleAdvanced}>
            {isAdvancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {isAdvancedOpen && (
          <div className="space-y-3 border-l-2 pl-3 border-accent/30">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Contact ID (optional)</label>
              <Input
                placeholder="Contact ID"
                value={newContactId}
                onChange={(e) => setNewContactId(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Public Key (optional)</label>
              <Input
                placeholder="Public Key"
                value={newContactKey}
                onChange={(e) => setNewContactKey(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setShowAddContact(false)}
        >
          Cancel
        </Button>
        <Button 
          className="w-full" 
          onClick={handleAddContact}
          disabled={newContactName.trim().length < 3}
        >
          Add Contact
        </Button>
      </div>
    </div>
  );

  const renderContacts = () => {
    if (filteredContacts.length === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No contacts found</p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-border">
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            className={cn(
              "flex items-center gap-3 p-3 cursor-pointer transition-colors",
              selectedContactId === contact.id
                ? "bg-accent/10"
                : "hover:bg-secondary"
            )}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-accent" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="font-medium truncate">{contact.name}</div>
                {contact.lastMessageTime && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(contact.lastMessageTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                )}
              </div>
              
              {contact.lastMessage && (
                <p className="text-sm text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
              )}
            </div>
            
            {contact.unreadCount && contact.unreadCount > 0 && (
              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xs text-white">{contact.unreadCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon">
                <UserPlus className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <ContactForm />
            </DrawerContent>
          </Drawer>
        ) : (
          <Button size="icon" onClick={() => setShowAddContact(true)}>
            <UserPlus className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showAddContact && !isMobile ? (
        <GlassContainer className="mx-4 mb-4" animation="fade-in">
          <ContactForm />
        </GlassContainer>
      ) : null}
      
      <div className="flex-1 overflow-y-auto">
        {renderContacts()}
      </div>
    </div>
  );
};

export default ContactList;
