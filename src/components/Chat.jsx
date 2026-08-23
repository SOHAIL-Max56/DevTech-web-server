import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";
import { IoMdSend } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const currentUser = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const [targetUser, setTargetUser] = useState(
    location.state?.targetUser || null,
  );
  const [socket, setSocket] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ["😀", "😂", "❤️", "👍", "🔥", "😎", "🎉", "🤔", "👏", "😊"];

  useEffect(() => {
    if (!targetUserId) return;

    // Fetch target user info
    const fetchTargetUser = async () => {
      if (!targetUser) {
        try {
          const res = await axios.get(`${APP_BASE_URL}/user/${targetUserId}`, {
            withCredentials: true,
          });
          setTargetUser(res.data?.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    // Fetch chat history
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`${APP_BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setMessages(
            res.data.data.messages.map((msg) => ({
              _id: msg._id,
              senderId: msg.senderId?._id || msg.senderId,
              firstName: msg.senderId?.firstname || "Unknown",
              text: msg.text,
              timestamp: msg.timestamp,
            })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchTargetUser();
    fetchChatHistory();

    // Socket connection
    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("JoinChat", {
        firstName: currentUser.firstname,
        userId,
        targetUserId,
      });
    });

    newSocket.on("messageReceived", (data) => {
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.some((msg) => msg._id === data._id)) return prev;
        return [
          ...prev,
          {
            _id: data._id || Date.now().toString(),
            senderId: data.senderId,
            firstName: data.firstName,
            text: data.text,
            timestamp: data.timestamp || new Date(),
          },
        ];
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [targetUserId, userId, currentUser?.firstname]);
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() && !selectedFile) return;

    socket?.emit("SendMessage", {
      firstName: currentUser.firstname,
      senderId: userId,
      receiverId: targetUserId,
      text: newMessage,
    });

    setNewMessage("");
    setSelectedFile(null);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ... rest of your JSX (input, buttons, etc.)

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-base-200">
      {/* Header */}
      <div className="bg-base-100 p-4 shadow-md flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img
              src={
                targetUser?.photoUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Profile"
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg">
            {targetUser
              ? `${targetUser.firstname} ${targetUser.lastname}`
              : "Loading..."}
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === userId ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">
              <p className="text-xs font-bold mb-1">{msg.firstName}</p>
              <p>{msg.text}</p>
            </div>
            <div className="chat-footer text-xs opacity-50">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-base-100 p-4">
        <div className="flex gap-2">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-20 bg-base-100 shadow-xl rounded-lg p-2 grid grid-cols-5 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setNewMessage(newMessage + emoji);
                    setShowEmojiPicker(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            className="btn btn-primary btn-circle"
            onClick={handleSend}
            disabled={!socket || (!newMessage.trim() && !selectedFile)}
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
