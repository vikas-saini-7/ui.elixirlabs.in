import { DocsPage } from "@/components/docs/DocsPage";
import { getDocBySlug } from "@/lib/docs";
import React from "react";

const page = async () => {
  const doc = await getDocBySlug("/introduction");
  return (
    <>
      <DocsPage content={doc?.content || "Content not found"} />
    </>
  );
};

export default page;
