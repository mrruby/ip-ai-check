import React from "react";

type StatusMessageProps = {
  status: "loading" | "error" | "success";
};

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (status === "loading") {
    return <p className="text-gray-600">Loading messages...</p>;
  }
  if (status === "error") {
    return (
      <p className="text-red-500">
        Error loading messages. Please try again later.
      </p>
    );
  }
  return null;
};

export default StatusMessage;
