import React from "react";
import { RobotsResult } from "../types";

interface RobotsAnalysisProps {
  robotsResult: RobotsResult | null;
}

const RobotsAnalysis: React.FC<RobotsAnalysisProps> = ({ robotsResult }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
      Analiza pliku Robots.txt
    </h2>
    {robotsResult ? (
      <div className="mb-4">
        <p className="mb-2">
          <span className="font-medium">Czy bot jest dozwolony:</span>
          <span
            className={`ml-2 px-2 py-1 rounded ${
              robotsResult.isAllowed
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {robotsResult.isAllowed ? "Tak" : "Nie"}
          </span>
        </p>
        <p className="mb-2">
          <span className="font-medium">Liczba reguł:</span>{" "}
          {robotsResult.parsedRobots.rules.length}
        </p>
        <p className="mb-4">
          <span className="font-medium">Liczba map witryn:</span>{" "}
          {robotsResult.parsedRobots.sitemaps.length}
        </p>
        {robotsResult.parsedRobots.rules.length > 0 ? (
          <h3 className="font-medium text-lg mb-2 text-indigo-600">Reguły:</h3>
        ) : null}
        <ul className="space-y-4">
          {robotsResult.parsedRobots.rules.map((rule, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-md">
              <p className="mb-1">
                <span className="font-medium">Agent użytkownika:</span>{" "}
                {rule.userAgent}
              </p>
              <p className="mb-1">
                <span className="font-medium">Zabronione:</span>{" "}
                {rule.disallows.join(", ") || "Brak"}
              </p>
              <p>
                <span className="font-medium">Dozwolone:</span>{" "}
                {rule.allows.join(", ") || "Brak"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="text-gray-500 italic">
        Ładowanie analizy pliku robots.txt...
      </p>
    )}
  </div>
);

export default RobotsAnalysis;
