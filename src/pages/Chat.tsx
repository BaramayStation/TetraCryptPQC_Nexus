import React, { useEffect, useState } from "react";
import { Contact, UserProfile, getContacts, getUserProfile } from "@/lib/storage";
import UserSetup from "@/components/user/UserSetup";
import ContactList from "@/components/chat/ContactList";
import Conversation from "@/components/chat/Conversation";
import MessageList from "@/components/chat/MessageList";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Account, Contract } from "starknet";

// ✅ StarkNet Messaging Contract Address
const STARKNET_MESSAGING_CONTRACT = "0xYourStarkNetMessagingContractAddress";

const Chat = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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

  // ✅ Fetch Messages from StarkNet on Contact Selection
  const fetchMessagesFromStarkNet = async () => {
    if (!user || !selectedContactId) return;

    try {
      const account = new Account(user.provider, user.starknetAddress);
      const messagingContract = new Contract(
        [
          {
            name: "get_message",
            type: "function",
            inputs: [
              { name: "sender", type: "felt" },
              { name: "receiver", type: "felt" },
            ],
            outputs: [{ name: "encrypted_content", type: "felt" }],
          },
        ],
        STARKNET_MESSAGING_CONTRACT,
        account
      );

      const response = await messagingContract.call("get_message", [
        user.starknetAddress,
        selectedContactId,
      ]);

      console.log("🔹 Retrieved Messages:", response);
    } catch (error) {
      console.error("❌ StarkNet Message Fetch Failed:", error);
    }
  };

  useEffect(() => {
    if (selectedContactId) {
      fetchMessagesFromStarkNet();
    }
  }, [selectedContactId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <UserSetup onSetupComplete={handleUserSetupComplete} />;
  }

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  if (isMobile) {
    return (
      <div className="h-screen w-full flex flex-col">
        {selectedContactId && selectedContact ? (
          <Conversation contact={selectedContact} onBack={handleBack} />
        ) : (
          <>
            <div className="border-b p-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Messages</h1>
              <Button variant="ghost" size="icon" onClick={goToSettings}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ContactList
                contacts={contacts}
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
        <h1 className="text-xl font-semibold">Quantum Secure Messaging</h1>
        <Button variant="ghost" size="icon" onClick={goToSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r overflow-hidden flex flex-col">
          <ContactList
            contacts={contacts}
            selectedContactId={selectedContactId}
            onSelectContact={handleContactSelect}
            onRefreshContacts={loadContacts}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          {selectedContact ? (
            <>
              <Conversation contact={selectedContact} />
              <MessageList />
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-4">
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold mb-2">Select a Contact</h2>
                <p className="text-muted-foreground">
                  Choose a contact from the list to start a secure, post-quantum encrypted conversation on StarkNet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;