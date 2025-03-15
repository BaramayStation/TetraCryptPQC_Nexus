
import React from "react";
import { useNavigate } from "react-router-dom";
import { Contact } from "@/lib/storage-types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, MoreVertical, Circle, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact
}) => {
  // Return empty state if no contacts
  if (contacts.length === 0) {
    return (
      <div className="p-4 text-center">
        <User className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <h3 className="font-medium mb-1">No contacts yet</h3>
        <p className="text-sm text-muted-foreground">
          Add contacts to start secure messaging
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-15rem)]">
      <div className="space-y-1 p-1">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-md text-left",
              selectedContactId === contact.id 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-muted transition-colors"
            )}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                {contact.status && (
                  <span className="absolute bottom-0 right-0">
                    {contact.status === "online" ? (
                      <Circle className="h-3 w-3 fill-green-500 stroke-background" />
                    ) : contact.status === "away" ? (
                      <Circle className="h-3 w-3 fill-yellow-500 stroke-background" />
                    ) : (
                      <Circle className="h-3 w-3 fill-muted-foreground stroke-background" />
                    )}
                  </span>
                )}
              </div>
              
              <div className="space-y-1 overflow-hidden">
                <div className="font-medium leading-none">{contact.name}</div>
                {contact.lastMessage && (
                  <p className="text-xs text-muted-foreground line-clamp-1 break-all">
                    {contact.lastMessage}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              {contact.lastMessageTime && (
                <span className="text-xs text-muted-foreground mb-1">
                  {formatDistanceToNow(new Date(contact.lastMessageTime), { addSuffix: true })}
                </span>
              )}
              
              <div className="flex items-center space-x-1">
                {contact.unreadCount && contact.unreadCount > 0 ? (
                  <Badge variant="default">{contact.unreadCount}</Badge>
                ) : (
                  <Shield className="h-3 w-3 text-muted-foreground" />
                )}
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ContactList;
