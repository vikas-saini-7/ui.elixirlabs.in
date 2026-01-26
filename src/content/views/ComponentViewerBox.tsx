"use client";
import React, { useState } from "react";
import clsx from "clsx";
import "./component-viewer.css";
import CodeBlock from "./CodeBlock";

interface ComponentViewerBoxProps {
  children: React.ReactNode;
  center?: boolean;
  background?: boolean;
  className?: string;
  code?: string;
}

const ComponentViewerBox = ({
  children,
  center = true,
  background = true,
  className,
  code,
}: ComponentViewerBoxProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="mb-8">
      {/* Tab Headers */}
      <div className="flex mb-2 gap-4 px-4">
        <button
          onClick={() => setActiveTab("preview")}
          className={clsx(
            "cursor-pointer py-2 text-sm font-medium transition-colors",
            activeTab === "preview"
              ? " text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          )}
        >
          Preview
        </button>
        {code && (
          <button
            onClick={() => setActiveTab("code")}
            className={clsx(
              "cursor-pointer py-2 text-sm font-medium transition-colors",
              activeTab === "code"
                ? " text-white"
                : "border-transparent text-gray-500 hover:text-gray-300"
            )}
          >
            Code
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "preview" ? (
        <div
          className={clsx(
            "component-viewer min-h-[420px] flex rounded-lg border border-dashed border-gray-500/20",
            background && "bg-gray-500/10",
            center && "items-center justify-center p-8",
            !center && "items-start",
            className
          )}
        >
          {children}
        </div>
      ) : (
        <CodeBlock code={code || ""} />
      )}
    </div>
  );
};

export default ComponentViewerBox;
