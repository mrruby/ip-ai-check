import React from "react";
import { PageContent } from "../types";

interface CurrentPageProps {
  pageContent: PageContent | null;
}

const CurrentPage: React.FC<CurrentPageProps> = ({ pageContent }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
      Current Page
    </h2>
    {pageContent ? (
      <div className="mb-4">
        <h3 className="font-medium text-lg text-gray-800">
          {pageContent.title}
        </h3>
        <p className="text-gray-600">{pageContent.url}</p>
      </div>
    ) : (
      <p className="text-gray-500 italic">Loading page content...</p>
    )}
  </div>
);

export default CurrentPage;
