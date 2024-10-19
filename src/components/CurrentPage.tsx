import React, { useState, useEffect } from "react";
import { PageContent } from "../types";
import { analyzePageContent } from "../utils/pageAnalyzer";

interface CurrentPageProps {
  pageContent: PageContent | null;
}

interface ContentAnalysis {
  copyright_reservation: string;
  opt_out_of_copyright_exception: string;
  prohibited_type_of_use: string;
  prohibited_purpose: string;
  directive_reference: string;
  contact_inquiries_reference: string;
  security_score: number;
  comments: string;
  overall_security_assessment: string;
}

const CurrentPage: React.FC<CurrentPageProps> = ({ pageContent }) => {
  const [contentAnalysis, setContentAnalysis] =
    useState<ContentAnalysis | null>(null);

  useEffect(() => {
    const analyzeContent = async () => {
      if (pageContent) {
        const analysis = await analyzePageContent(pageContent.content);
        setContentAnalysis(JSON.parse(analysis));
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
              <h3 className="font-medium text-lg mb-2 mt-4 text-indigo-600">
                Najlepsze Praktyki Ochrony Własności Intelektualnej:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="font-medium mr-2">
                    Zastrzeżenie praw autorskich:
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      contentAnalysis.copyright_reservation === "yes"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contentAnalysis.copyright_reservation === "yes"
                      ? "Tak"
                      : "Nie"}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">
                    Wyłączenie z wyjątku praw autorskich:
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      contentAnalysis.opt_out_of_copyright_exception === "yes"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contentAnalysis.opt_out_of_copyright_exception === "yes"
                      ? "Tak"
                      : "Nie"}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">
                    Zakaz określonego typu użycia:
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      contentAnalysis.prohibited_type_of_use === "yes"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contentAnalysis.prohibited_type_of_use === "yes"
                      ? "Tak"
                      : "Nie"}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">
                    Zakaz określonego celu:
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      contentAnalysis.prohibited_purpose === "yes"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contentAnalysis.prohibited_purpose === "yes"
                      ? "Tak"
                      : "Nie"}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">
                    Odniesienie do dyrektywy:
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      contentAnalysis.directive_reference === "yes"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contentAnalysis.directive_reference === "yes"
                      ? "Tak"
                      : "Nie"}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">
                    Odniesienie do kontaktu w sprawie zapytań:
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      contentAnalysis.contact_inquiries_reference === "yes"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contentAnalysis.contact_inquiries_reference === "yes"
                      ? "Tak"
                      : "Nie"}
                  </span>
                </li>
              </ul>
              <p className="mt-4 font-medium">
                Ocena bezpieczeństwa:
                <span
                  className={`ml-2 px-2 py-1 rounded ${
                    contentAnalysis.security_score > 3
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {contentAnalysis.security_score}/6
                </span>
              </p>
              <p className="mt-4 text-gray-600">
                <span className="font-medium">Komentarze: </span>
                {contentAnalysis.comments}
              </p>
              <p className="mt-4 text-gray-600">
                <span className="font-medium">
                  Ogólna ocena bezpieczeństwa:{" "}
                </span>
                {contentAnalysis.overall_security_assessment}
              </p>
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
