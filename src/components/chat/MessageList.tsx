
import React from "react";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/storage";

interface MessageListProps {
  contactId?: string;
}

const MessageList: React.FC<MessageListProps> = ({ contactId }) => {
  const user = getUserProfile();

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-gray-900 text-white">
      <h2 className="text-xl font-semibold">📩 Secure Messages</h2>

      <div className="mt-4 space-y-2">
        <p className="text-gray-400">No messages yet.</p>
      </div>

      <Button onClick={() => console.log("Manually Fetching Messages")} className="mt-4 bg-blue-600 hover:bg-blue-700">
        🔄 Refresh Messages
      </Button>
    </div>
  );
};

export default MessageList;
