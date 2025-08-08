import React from "react";
import OnThisPage from "@/components/docs/OnThisPage";

const sections = [
  {
    // title: "Implementing a Popover",
    items: [
      { title: "1. Install the library", href: "#install-the-library" },
      { title: "2. Import the parts", href: "#import-the-parts" },
      { title: "3. Add your styles", href: "#add-your-styles" },
      { title: "Demo", href: "#demo" },
    ],
  },
//   { title: "Summary", href: "#summary" },
];

const DocsAside = () => {
  return (
    <div className="min-h-[80vh]">
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
