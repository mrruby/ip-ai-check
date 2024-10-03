import React from "react";
import { Message } from "../../types/message";

type MessageItemProps = {
  message: Message;
  markAsRead: (messageId: string) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, markAsRead }) => {
  const handleMarkAsRead = () => {
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-4">
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
      <div className="flex justify-between items-center mt-2">
        <p
          className={`text-sm ${
            message.read ? "text-green-500" : "text-blue-500"
          } font-medium`}
        >
          {message.read ? "Read" : "Unread"}
        </p>
        {!message.read && (
          <button
            onClick={handleMarkAsRead}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Mark as Read
          </button>
        )}
      </div>
    </li>
  );
};

export default MessageItem;
