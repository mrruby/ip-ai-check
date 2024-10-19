import React, { useState, useEffect } from "react";
import { PageContent } from "../types";
import { analyzePageContent } from "../utils/pageAnalyzer";

interface CurrentPageProps {
  pageContent: PageContent | null;
}

const CurrentPage: React.FC<CurrentPageProps> = ({ pageContent }) => {
  const [contentAnalysis, setContentAnalysis] = useState<string | null>(null);

  useEffect(() => {
    const analyzeContent = async () => {
      if (pageContent) {
        const analysis = await analyzePageContent(pageContent.content);
        setContentAnalysis(analysis);
      }
    };

    analyzeContent();
  }, [pageContent]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Analiza Treści Strony
      </h2>
      {pageContent ? (
        <>
          {contentAnalysis ? (
            <div className="mt-4">
              <h4 className="font-medium text-lg text-gray-800">
                Najlepsze Praktyki Ochrony Własności Intelektualnej
              </h4>
              <p className="text-gray-600">{contentAnalysis}</p>
            </div>
          ) : (
            <p className="text-gray-500 italic mt-4">
              Analizowanie treści strony...
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
