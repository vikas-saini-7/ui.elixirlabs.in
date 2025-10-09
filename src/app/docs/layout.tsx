import React from "react";
import DocsMenu from "@/components/docs/DocsMenu";
import "@/app/article.css";
export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex pr-4">
      <div className="w-1/6">
        <DocsMenu />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
