import React, { useEffect, useState } from "react";
import { Message } from "../types/message";
import "./input.css";
import MessageList from "./components/MessageList";
import StatusMessage from "./components/StatusMessage";

const Popup: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    const handleResponse = (response: any) => {
      if (chrome.runtime.lastError || !response?.success) {
        console.error("Runtime error:", chrome.runtime.lastError?.message);
        return setStatus("error");
      }
      getMessages();
      setStatus("success");
    };

    setStatus("loading");
    chrome.runtime.sendMessage({ action: "popupOpened" }, handleResponse);
  }, []);

  const getMessages = async () => {
    try {
      const storedMessages = await chrome.storage.local.get("messages");
      if (storedMessages.messages) {
        setMessages(storedMessages.messages);
        updateUnreadCount(storedMessages.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setStatus("error");
    }
  };

  const updateUnreadCount = (messages: Message[]) => {
    const unreadCount = messages.filter((m: Message) => !m.read).length;
    chrome.action.setBadgeText({ text: unreadCount.toString() });
  };

  const markAsRead = async (messageId: string) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId ? { ...message, read: true } : message
    );

    await chrome.storage.local.set({ messages: updatedMessages });
    setMessages(updatedMessages);
    updateUnreadCount(updatedMessages);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 w-full">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Messages</h1>
      <StatusMessage status={status} />
      {status === "success" && (
        <MessageList messages={messages} markAsRead={markAsRead} />
      )}
    </div>
  );
};

export default Popup;
