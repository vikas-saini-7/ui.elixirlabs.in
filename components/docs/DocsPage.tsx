import React from "react";
import { DocsPageContent } from "./DocsPageContent";
import { AsideRight } from "./AsideRight";

interface Doc {
  slug: string;
  label: string;
  description: string;
  content: React.ReactNode;
  headings: { level: number; text: string; slug: string }[];
}

const DocsPage = ({ doc }: { doc: Doc }) => {
  return (
    <main className="min-h-screen md:pl-64 flex">
      {/* Content */}
      <DocsPageContent content={doc.content} />

      {/* Right Sidebar */}
      <AsideRight headings={doc.headings} />
    </main>
  );
};

export default DocsPage;
