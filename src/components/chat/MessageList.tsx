
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserProfile, getMessages, Contact } from "@/lib/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, MessageSquare, CheckCheck, Calendar, Search, Filter, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MessageListProps {
  contactId?: string;
}

const MessageList: React.FC<MessageListProps> = ({ contactId }) => {
  const user = getUserProfile();
  const [filterDate, setFilterDate] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get messages
  const messages = contactId && user 
    ? getMessages(user.id, contactId) 
    : [];
  
  const handleRefresh = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  // Filter messages by date
  const getFilteredMessages = () => {
    if (!messages.length) return [];
    
    let filtered = [...messages];
    
    // Apply date filter
    if (filterDate !== "all") {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      
      filtered = filtered.filter(message => {
        const messageDate = new Date(message.timestamp);
        
        if (filterDate === "today") {
          return messageDate.toDateString() === today.toDateString();
        } else if (filterDate === "yesterday") {
          return messageDate.toDateString() === yesterday.toDateString();
        } else if (filterDate === "week") {
          return messageDate > lastWeek;
        }
        
        return true;
      });
    }
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(message => 
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const filteredMessages = getFilteredMessages();
  
  // Format date for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="border bg-card shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            Secure Messages
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Post-quantum encrypted message history
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No messages found</p>
            {searchTerm && (
              <p className="text-xs text-muted-foreground">
                Try adjusting your search or filters
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map(message => (
              <div key={message.id} className="p-3 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    {message.senderId === user?.id ? "You" : "Contact"}
                    {message.status === 'read' && (
                      <CheckCheck className="h-3 w-3 text-accent ml-1" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(message.timestamp)}</span>
                  </div>
                </div>
                
                <p className="text-sm">{message.content}</p>
                
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>FIPS 205/206</span>
                  </Badge>
                  {message.encrypted && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      Encrypted
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageList;
