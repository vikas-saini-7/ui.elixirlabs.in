"use client";
import React, { useState } from "react";
import clsx from "clsx";

interface DocsTabsProps {
  cliContent: React.ReactNode;
  manualContent: React.ReactNode;
}

const DocsTabs = ({ cliContent, manualContent }: DocsTabsProps) => {
  const [activeTab, setActiveTab] = useState<"cli" | "manual">("cli");

  return (
    <div className="mb-8">
      {/* Tab Headers */}
      <div className="flex mb-4 gap-4">
        <button
          onClick={() => setActiveTab("cli")}
          className={clsx(
            "cursor-pointer py-2 px-4 text-sm font-medium transition-colors rounded-md",
            activeTab === "cli"
              ? "bg-purple-500 text-black"
              : "text-gray-500 hover:text-gray-300"
          )}
        >
          CLI
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={clsx(
            "cursor-pointer py-2 px-4 text-sm font-medium transition-colors rounded-md",
            activeTab === "manual"
              ? "bg-purple-500 text-black"
              : "text-gray-500 hover:text-gray-300"
          )}
        >
          Manual
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === "cli" ? (
          <div>{cliContent}</div>
        ) : (
          <div>{manualContent}</div>
        )}
      </div>
    </div>
  );
};

export default DocsTabs;
