import React from "react";
import { notFound } from "next/navigation";
import DocsPage from "@/components/docs/DocsPage";
import { getDocBySlug } from "@/lib/docs";

const page = async () => {
  const doc = await getDocBySlug("/introduction");

  if (!doc) {
    notFound();
  }

  return <DocsPage doc={doc} />;
};

export default page;
