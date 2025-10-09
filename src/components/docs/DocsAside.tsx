import React from "react";
import OnThisPage from "@/components/docs/OnThisPage";
import { getMdxHeadings } from "@/lib/getMdxHeadings";

interface DocsAsideProps {
  slug: string;
}

const DocsAside = ({ slug }: DocsAsideProps) => {
  const headings = getMdxHeadings(`${slug}`);
  const sections = [{ items: headings }];
  return (
    <div className="min-h-[80vh] sticky top-16 py-2">
      <div className="">
        <OnThisPage sections={sections} />
        <div className="mt-4">
          <div className="w-full h-72 aspect-square bg-gray-500/10 opacity-50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default DocsAside;
