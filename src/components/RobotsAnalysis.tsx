import React from "react";
import { RobotsResult } from "../types";
import {
  checkBotPrevention,
  areAllBotsBlocked,
  isEntireSiteBlocked,
} from "../functions/analyze-robots";

interface RobotsAnalysisProps {
  robotsResult: RobotsResult | null;
}

const RobotsAnalysis: React.FC<RobotsAnalysisProps> = ({ robotsResult }) => {
  const botPrevention = robotsResult
    ? checkBotPrevention(robotsResult.parsedRobots)
    : null;
  const allBotsBlocked = botPrevention
    ? areAllBotsBlocked(botPrevention)
    : false;
  const entireSiteBlocked = robotsResult
    ? isEntireSiteBlocked(robotsResult.parsedRobots)
    : false;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Analiza zabezpiecznia odczytu maszynowego
      </h2>
      {robotsResult ? (
        <div className="mb-4">
          {entireSiteBlocked && (
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <p className="font-bold">
                Uwaga: Cała witryna jest zablokowana dla wszystkich botów!
              </p>
              <p>
                To może mieć negatywny wpływ na SEO, ponieważ uniemożliwia
                indeksowanie witryny przez wyszukiwarki.
              </p>
            </div>
          )}

          <h3 className="font-medium text-lg mb-2 mt-4 text-indigo-600">
            Blokowanie ważnych botów:
          </h3>
          <ul className="space-y-2">
            {Object.entries(botPrevention || {}).map(([bot, blocked]) => (
              <li key={bot} className="flex items-center">
                <span className="font-medium mr-2">{bot}:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    blocked
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {blocked ? "Zablokowany" : "Niezablokowany"}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-medium">
            Status blokowania wszystkich ważnych botów:
            <span
              className={`ml-2 px-2 py-1 rounded ${
                allBotsBlocked
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {allBotsBlocked
                ? "Wszystkie zablokowane"
                : "Nie wszystkie zablokowane"}
            </span>
          </p>

          {!entireSiteBlocked && !allBotsBlocked && (
            <p className="mt-4 text-yellow-600">
              Uwaga: Nie wszystkie ważne boty są zablokowane. Rozważ dodanie
              reguł dla pozostałych botów, aby zwiększyć ochronę swojej witryny.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Ładowanie analizy pliku robots.txt...
        </p>
      )}
    </div>
  );
};

export default RobotsAnalysis;
