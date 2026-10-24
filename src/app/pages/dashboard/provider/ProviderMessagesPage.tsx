import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Archive, Image, File } from "lucide-react";
import { motion } from "motion/react";

export function ProviderMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const conversations = [
    {
      id: 1,
      client: "Sarah Johnson",
      clientInitial: "S",
      lastMessage: "Thanks! Looking forward to the security audit tomorrow.",
      time: "2m ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      client: "Michael Chen",
      clientInitial: "M",
      lastMessage: "Can we discuss the website design changes?",
      time: "1h ago",
      unread: 0,
      online: true
    },
    {
      id: 3,
      client: "Emily Rodriguez",
      clientInitial: "E",
      lastMessage: "I'll send over the documents shortly.",
      time: "3h ago",
      unread: 1,
      online: false
    },
    {
      id: 4,
      client: "David Thompson",
      clientInitial: "D",
      lastMessage: "The training was excellent, thank you!",
      time: "1d ago",
      unread: 0,
      online: false
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "client",
      text: "Hi! I wanted to discuss the network security audit scheduled for tomorrow.",
      time: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "provider",
      text: "Hello! Yes, absolutely. I'm all set for tomorrow at 2 PM. Is there anything specific you'd like me to focus on?",
      time: "10:32 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "client",
      text: "We've had some concerns about our firewall configuration and want to ensure our remote access is secure.",
      time: "10:35 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "provider",
      text: "Perfect. I'll make sure to do a thorough review of both areas. Could you also provide me with a list of all devices connected to your network?",
      time: "10:37 AM",
      type: "text"
    },
    {
      id: 5,
      sender: "client",
      text: "Sure, I'll prepare that list and send it over by end of day.",
      time: "10:40 AM",
      type: "text"
    },
    {
      id: 6,
      sender: "client",
      text: "network-inventory.pdf",
      time: "3:45 PM",
      type: "file"
    },
    {
      id: 7,
      sender: "provider",
      text: "Received! I've reviewed the inventory. Everything looks good. See you tomorrow!",
      time: "4:10 PM",
      type: "text"
    },
    {
      id: 8,
      sender: "client",
      text: "Thanks! Looking forward to the security audit tomorrow.",
      time: "4:12 PM",
      type: "text"
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Simulate sending message
    console.log("Sending:", message);
    setMessage("");
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Communicate with your clients</p>
      </div>

      <div className="bg-card rounded-2xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full lg:w-96 border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-11 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-border ${
                    selectedChat === conversation.id
                      ? "bg-card"
                      : "hover:bg-muted/20"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {conversation.clientInitial}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-foreground truncate">{conversation.client}</h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {selectedConversation?.clientInitial}
                  </div>
                  {selectedConversation?.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedConversation?.client}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation?.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted/40 rounded-lg transition-colors">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted/40 rounded-lg transition-colors">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted/40 rounded-lg transition-colors">
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "provider" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === "provider" ? "order-2" : "order-1"}`}>
                    {msg.type === "text" ? (
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.sender === "provider"
                            ? "bg-primary text-white"
                            : "bg-muted/40 text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-muted/40 rounded-2xl">
                        <div className="w-10 h-10 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                          <File className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{msg.text}</div>
                          <div className="text-xs text-muted-foreground">PDF • 245 KB</div>
                        </div>
                      </div>
                    )}
                    <div
                      className={`text-xs text-muted-foreground mt-1 ${
                        msg.sender === "provider" ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted/40 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 hover:bg-muted/40 rounded-lg transition-colors"
                  >
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-muted/40 rounded-lg transition-colors"
                  >
                    <Image className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  style={{ maxHeight: "120px" }}
                />
                
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-3 bg-primary text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
