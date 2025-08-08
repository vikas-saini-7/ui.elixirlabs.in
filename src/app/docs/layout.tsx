import DocsAside from "@/components/docs/DocsAside";
import DocsMenu from "@/components/docs/DocsMenu";
import React from "react";
export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <DocsMenu />
      </div>
      <div className="w-4/6 px-24">{children}</div>
      <aside className="w-1/5">
        <DocsAside />
      </aside>
    </div>
  );
}
