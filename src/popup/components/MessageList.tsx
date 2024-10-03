import React from "react";
import { Message } from "../../types/message";
import MessageItem from "./MessageItem";

type MessageListProps = {
  messages: Message[];
  markAsRead: (messageId: string) => void;
};

const MessageList: React.FC<MessageListProps> = ({ messages, markAsRead }) => {
  if (messages.length === 0) {
    return <p className="text-gray-500">No messages found.</p>;
  }

  return (
    <ul className="space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          markAsRead={markAsRead}
        />
      ))}
    </ul>
  );
};

export default MessageList;
