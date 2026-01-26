import React from "react";
import DocsMenu from "@/components/docs/DocsMenu";
import { getDocsNavigation } from "@/lib/get-navigation";
import "@/app/article.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getDocsNavigation();
  
  return (
    <div className="flex pr-4">
      <div className="w-1/6">
        <DocsMenu navigation={navigation} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
