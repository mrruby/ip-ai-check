import React from "react";
import "./input.css";
import { generatePDFReport } from "../helpers";

const Popup: React.FC = () => {
  const handleGeneratePDF = () => {
    generatePDFReport();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Generator</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleGeneratePDF}
      >
        Generate PDF
      </button>
    </div>
  );
};

export default Popup;
