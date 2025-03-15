
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Shield } from "lucide-react";
import { Contact } from "@/lib/storage-types";

interface SecureContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  onAddContact: () => void;
}

const SecureContactsList: React.FC<SecureContactsListProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
  onAddContact
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <h2 className="font-semibold">Secure Contacts</h2>
        <Button 
          onClick={onAddContact} 
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <UserPlus className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Add</span>
        </Button>
      </div>
      
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {filteredContacts.length > 0 ? (
          <div className="divide-y">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id ? 'bg-accent/20' : 'hover:bg-muted'
                }`}
                onClick={() => onSelectContact(contact)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(contact.lastMessageTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      <span className="text-xs text-muted-foreground capitalize">{contact.status}</span>
                    </div>
                    {contact.lastMessage && (
                      <p className="text-sm truncate text-muted-foreground mt-1">{contact.lastMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Shield className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground">
              {searchQuery ? "No contacts match your search" : "Your secure contacts will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureContactsList;
