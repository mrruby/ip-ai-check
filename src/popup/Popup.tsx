import React from "react";
import "./input.css";

const Popup: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 w-full">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Hackathon Project
      </h1>
      <p className="text-gray-600 mb-2">Welcome to our Chrome Extension!</p>
      <p className="mt-4 text-sm text-gray-500">
        Built with ❤️ during the Hackathon
      </p>
    </div>
  );
};

export default Popup;
