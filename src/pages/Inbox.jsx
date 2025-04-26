import React, { useState, useEffect } from "react";

const ChatApplication = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackChats = [
    {
      id: "67d338f3f22c60ec8701405a_67d35fd70dd2e0010e615f4b",
      name: "Customer Support",
      lastMessage: "Hello! How can we assist you with your rental today?",
      time: "12:23 PM",
      unread: 0,
      avatar: "https://via.placeholder.com/40",
      branch: "Karachi",
    },
    {
      id: 2,
      name: "Fatima Ahmed (Lahore Branch)",
      lastMessage:
        "Good afternoon! Your Toyota Corolla is reserved and ready for pickup.",
      time: "Yesterday",
      unread: 0,
      avatar: "https://via.placeholder.com/40",
      branch: "Lahore",
    },
    {
      id: 3,
      name: "Support Team",
      lastMessage:
        "Reminder: Please bring your driver’s license and ID for your booking tomorrow.",
      time: "Yesterday",
      unread: 3,
      avatar: "https://via.placeholder.com/40",
      isGroup: true,
    },
    {
      id: 4,
      name: "Usman Malik (Islamabad Branch)",
      lastMessage:
        "Hi! Your requested Honda Civic 2022 is now available for inspection.",
      time: "Monday",
      unread: 0,
      avatar: "https://via.placeholder.com/40",
      branch: "Islamabad",
    },
    {
      id: 5,
      name: "Billing Department",
      lastMessage:
        "Hello! Your invoice #INV-2025-789 for your car rental has been generated.",
      time: "Sunday",
      unread: 0,
      avatar: "https://via.placeholder.com/40",
    },
  ];

  // Sample data from the provided JSON
  const sampleChatData = [
    {
      chatId: "67d338f3f22c60ec8701405a_67d35fd70dd2e0010e615f4b",
      messages: [
        {
          senderId: "67d338f3f22c60ec8701405a",
          message:
            "Hello! Welcome to Drive Fleet. How can we assist you today?",
          _id: "67dea3b321694cd76c17780f",
          timestamp: "2025-03-22T11:45:00.201Z",
        },
        {
          senderId: "user_id_123", // customer's ID
          message:
            "Hi! I want to confirm my booking for a Honda Civic from Karachi branch.",
          _id: "67dea3c921694cd76c177813",
          timestamp: "2025-03-22T11:46:15.690Z",
        },
        {
          senderId: "67d338f3f22c60ec8701405a",
          message: "Sure! Let me quickly check the availability for you. 👀",
          _id: "67dea49921694cd76c177818",
          timestamp: "2025-03-22T11:47:30.550Z",
        },
        {
          senderId: "67d338f3f22c60ec8701405a",
          message:
            "Good news! The Honda Civic 2022 is available for your selected dates.",
          _id: "67dea50404ead4cff8265832",
          timestamp: "2025-03-22T11:48:45.036Z",
        },
        {
          senderId: "user_id_123",
          message: "Perfect! Can you please confirm the pickup time?",
          _id: "67dea82b1893e9a2b7ef9cd5",
          timestamp: "2025-03-22T11:49:30.570Z",
        },
        {
          senderId: "67d338f3f22c60ec8701405a",
          message:
            "Your pickup is scheduled for 10:00 AM on March 25th, 2025. 🚗✨",
          _id: "67dea82f1893e9a2b7ef9cdd",
          timestamp: "2025-03-22T11:50:10.807Z",
        },
        {
          senderId: "67d338f3f22c60ec8701405a",
          message:
            "Please remember to bring your driver’s license and a copy of your CNIC.",
          _id: "67dea9a61893e9a2b7ef9ced",
          timestamp: "2025-03-22T11:52:20.990Z",
        },
        {
          senderId: "user_id_123",
          message: "Got it! Thanks for your help. 🙌",
          _id: "67deaa7b1893e9a2b7ef9d07",
          timestamp: "2025-03-22T11:53:03.380Z",
        },
        {
          senderId: "67d338f3f22c60ec8701405a",
          message:
            "You're welcome! See you soon. Drive safe and enjoy your ride! 🚘",
          _id: "67deabaf1893e9a2b7ef9d24",
          timestamp: "2025-03-22T11:55:11.471Z",
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Simulating API call with sample data
        const data = sampleChatData;

        // Format the data to match our chat structure
        const formattedChats = data.map((chat) => {
          const lastMsg = chat.messages[chat.messages.length - 1];
          return {
            id: chat.chatId,
            name:
              fallbackChats.find((f) => f.id === chat.chatId)?.name ||
              "Customer Support",
            lastMessage: lastMsg?.message || "No messages yet",
            time: lastMsg
              ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            unread:
              fallbackChats.find((f) => f.id === chat.chatId)?.unread || 0,
            avatar:
              fallbackChats.find((f) => f.id === chat.chatId)?.avatar ||
              "https://via.placeholder.com/40",
            branch:
              fallbackChats.find((f) => f.id === chat.chatId)?.branch ||
              "Karachi",
            rawMessages: chat.messages,
          };
        });

        setChats(formattedChats);

        if (formattedChats.length > 0) {
          setSelectedChat(formattedChats[0].id);

          // Now use rawMessages properly
          const firstChat = formattedChats[0];
          const firstChatMessages = firstChat.rawMessages.map((msg) => ({
            id: msg._id,
            sender:
              msg.senderId === "67d338f3f22c60ec8701405a"
                ? firstChat.name
                : "You",
            text: msg.message,
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isMine: msg.senderId !== "67d338f3f22c60ec8701405a",
          }));
          setMessages(firstChatMessages);
        }
      } catch (err) {
        setError(err.message || "An unknown error occurred");
        setChats(fallbackChats);
        setSelectedChat(fallbackChats[0].id);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleSelectChat = (id) => {
    setSelectedChat(id);
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat))
    );

    // Load messages for the selected chat
    const selectedChatData = chats.find((c) => c.id === id);
    if (selectedChatData && selectedChatData.rawMessages) {
      const formattedMessages = selectedChatData.rawMessages.map((msg) => ({
        id: msg._id,
        sender:
          msg.senderId === "67d338f3f22c60ec8701405a"
            ? "Customer Support"
            : "You",
        text: msg.message,
        time: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: msg.senderId !== "67d338f3f22c60ec8701405a",
      }));
      setMessages(formattedMessages);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedChat) return;

    const userMessage = newMessage.trim().toLowerCase();

    const newMsg = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    const selectedChatData = chats.find((c) => c.id === selectedChat);

    const greetings = ["hi", "hello", "salam", "hey", "assalamualaikum"];

    setTimeout(() => {
      let replyText = "";

      if (greetings.includes(userMessage)) {
        replyText = "Hello! How can we assist you today?";
      } else {
        replyText =
          "For further assistance, please contact us on WhatsApp at 03121615000.";
      }

      const replyMsg = {
        id: Date.now().toString() + "reply",
        sender: selectedChatData?.name || "Customer Support",
        text: replyText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: false,
      };

      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-xl">Loading chats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen text-white bg-black items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Chat List */}
      <div className="w-80  bg-black">
        {/* <div className="p-4 bg-green-600 text-white">
          <h1 className="text-xl font-bold">Drive Fleet Pakistan</h1>
          <p className="text-sm">Customer Support</p>
        </div> */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="overflow-y-auto h-full pb-20">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4  cursor-pointer hover:bg-green-500 ${
                selectedChat === chat.id ? "bg-green-700" : ""
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <div className="flex items-center">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full mr-3"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40";
                  }}
                />
                <div className="flex-1 text-white">
                  <div className="flex justify-between items-center">
                    <h3
                      className={`font-medium ${
                        chat.unread > 0 ? "font-bold" : ""
                      }`}
                    >
                      {chat.name}
                      {chat.branch && (
                        <span className="ml-2 text-xs bg-green-600 px-1 rounded">
                          {chat.branch}
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-300">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-white truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className=" text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Page */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4  bg-[#121212] flex items-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=uniqueUserId"
                alt="Chat Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <h2 className="font-bold text-green-500">
                  {chats.find((c) => c.id === selectedChat)?.name}
                </h2>
                <p className="text-xs text-green-300">
                  {chats.find((c) => c.id === selectedChat)?.branch
                    ? `${
                        chats.find((c) => c.id === selectedChat)?.branch
                      } Branch`
                    : "Online Support"}
                </p>
              </div>
              <button className="p-2 text-green-300 bg-gray-700 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#1A1A1A]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
                        message.isMine
                          ? "bg-green-600 text-white"
                          : "bg-[#333] border"
                      }`}
                    >
                      {!message.isMine && (
                        <div className="font-bold text-sm text-white">
                          {message.sender}
                        </div>
                      )}
                      <p
                        className={
                          message.isMine ? "text-white" : "text-gray-300"
                        }
                      >
                        {message.text}
                      </p>
                      <div
                        className={`text-xs mt-1 text-right ${
                          message.isMine ? "text-green-200" : "text-gray-500"
                        }`}
                      >
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-black border-t">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <button
                  type="button"
                  className="p-2 text-green-500 bg-gray-700 hover:text-green-600 focus:outline-none"
                  aria-label="Attach file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 p-2 border focus:border-0 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  aria-label="Type your message"
                />
                <button
                  type="submit"
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
              <div className="text-xs text-gray-500 mt-2">
                Our agents typically reply within 15 minutes during business
                hours (9 AM - 6 PM PKT)
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-gray-500">
              Select a chat to start messaging
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApplication;
