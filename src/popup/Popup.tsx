import React, { useEffect, useState } from "react";
import { Message } from "../types/message";
import "./input.css";

const Popup: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    const getMessages = async () => {
      try {
        setStatus("loading");
        const storedMessages = await chrome.storage.local.get("messages");
        if (storedMessages.messages) {
          setMessages(storedMessages.messages);
          setStatus("success");
          const unreadCount = storedMessages.messages.filter(
            (m: Message) => !m.read
          ).length;
          chrome.action.setBadgeText({ text: unreadCount.toString() });
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setStatus("error");
      }
    };

    getMessages();
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return <p className="text-gray-600">Loading messages...</p>;
      case "error":
        return (
          <p className="text-red-500">
            Error loading messages. Please try again later.
          </p>
        );
      case "success":
        if (messages.length === 0) {
          return <p className="text-gray-500">No messages found.</p>;
        }
        return (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <p className="text-lg font-semibold mb-2">{message.content}</p>
                <p className="text-sm text-gray-600">
                  Priority:{" "}
                  <span
                    className={`font-medium ${
                      message.priority === "high"
                        ? "text-red-500"
                        : message.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {message.priority}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Time: {new Date(message.timestamp).toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    message.read ? "text-green-500" : "text-blue-500"
                  } font-medium`}
                >
                  {message.read ? "Read" : "Unread"}
                </p>
              </li>
            ))}
          </ul>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 w-full">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Messages</h1>
      {renderContent()}
    </div>
  );
};

export default Popup;
