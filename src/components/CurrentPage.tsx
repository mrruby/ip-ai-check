import React, { useState, useEffect } from "react";
import { PageContent } from "../types";
import { analyzePageSecurity } from "../utils/pageAnalyzer";

interface CurrentPageProps {
  pageContent: PageContent | null;
}

const CurrentPage: React.FC<CurrentPageProps> = ({ pageContent }) => {
  const [securityAnalysis, setSecurityAnalysis] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecurityAnalysis = async () => {
      if (pageContent) {
        const analysis = await analyzePageSecurity(pageContent.content);
        setSecurityAnalysis(analysis);
      }
    };

    fetchSecurityAnalysis();
  }, [pageContent]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Analiza Bezpieczeństwa
      </h2>
      {pageContent ? (
        <>
          {securityAnalysis ? (
            <div className="mt-4">
              <h4 className="font-medium text-lg text-gray-800">
                Analiza Bezpieczeństwa
              </h4>
              <p className="text-gray-600">{securityAnalysis}</p>
            </div>
          ) : (
            <p className="text-gray-500 italic mt-4">
              Analizowanie bezpieczeństwa strony...
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500 italic">Ładowanie zawartości strony...</p>
      )}
    </div>
  );
};

export default CurrentPage;
