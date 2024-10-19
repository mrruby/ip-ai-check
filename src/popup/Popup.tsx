import React, { useEffect, useState } from "react";
import "./input.css";
import { PageContent, RobotsResult } from "../types";
import CurrentPage from "../components/CurrentPage";
import RobotsAnalysis from "../components/RobotsAnalysis";
import { generatePDFReport } from "../helpers";

const fetchPageContent = () =>
  chrome.runtime.sendMessage({ action: "getPageContent" });

const fetchRobotsResult = () =>
  chrome.runtime.sendMessage({ action: "getRobots" });

const Popup: React.FC = () => {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [robotsResult, setRobotsResult] = useState<RobotsResult | null>(null);

  useEffect(() => {
    Promise.all([fetchPageContent(), fetchRobotsResult()])
      .then(([contentResponse, robotsResponse]) => {
        setPageContent(contentResponse);
        setRobotsResult(robotsResponse);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div id="popup-content" className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          ALL RIGHTS RESERVED
        </h1>

        <CurrentPage pageContent={pageContent} />
        <RobotsAnalysis robotsResult={robotsResult} />
      </div>
      <div className="container mx-auto p-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={generatePDFReport}
        >
          Generuj PDF
        </button>
      </div>
    </div>
  );
};

export default Popup;
