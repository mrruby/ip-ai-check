import React from "react";
import { RobotsResult } from "../types";

interface RobotsAnalysisProps {
  robotsResult: RobotsResult | null;
}

const RobotsAnalysis: React.FC<RobotsAnalysisProps> = ({ robotsResult }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
      Robots.txt Analysis
    </h2>
    {robotsResult ? (
      <div className="mb-4">
        <p className="mb-2">
          <span className="font-medium">Is bot allowed:</span>
          <span
            className={`ml-2 px-2 py-1 rounded ${
              robotsResult.isAllowed
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {robotsResult.isAllowed ? "Yes" : "No"}
          </span>
        </p>
        <p className="mb-2">
          <span className="font-medium">Number of rules:</span>{" "}
          {robotsResult.parsedRobots.rules.length}
        </p>
        <p className="mb-4">
          <span className="font-medium">Number of sitemaps:</span>{" "}
          {robotsResult.parsedRobots.sitemaps.length}
        </p>
        {robotsResult.parsedRobots.rules.length > 0 ? <h3 className="font-medium text-lg mb-2 text-indigo-600">Rules:</h3>: null}
        <ul className="space-y-4">
          {robotsResult.parsedRobots.rules.map((rule, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-md">
              <p className="mb-1">
                <span className="font-medium">User Agent:</span>{" "}
                {rule.userAgent}
              </p>
              <p className="mb-1">
                <span className="font-medium">Disallows:</span>{" "}
                {rule.disallows.join(", ") || "None"}
              </p>
              <p>
                <span className="font-medium">Allows:</span>{" "}
                {rule.allows.join(", ") || "None"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="text-gray-500 italic">Loading robots.txt analysis...</p>
    )}
  </div>
);

export default RobotsAnalysis;
