import React, { useEffect, useState } from "react";
import "./input.css";
import { generatePDFReport } from "../helpers";

interface PageContent {
  title: string;
  url: string;
}

const Popup: React.FC = () => {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      const response = await chrome.runtime.sendMessage({
        action: "getPageContent",
      });
      setPageContent(response);
    };

    fetchPageContent();
  }, []);

  const handleGeneratePDF = () => {
    generatePDFReport();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Generator</h1>
      <h1>Current Page</h1>
      {pageContent ? (
        <div>
          <h2>{pageContent.title}</h2>
          <p>{pageContent.url}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
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
