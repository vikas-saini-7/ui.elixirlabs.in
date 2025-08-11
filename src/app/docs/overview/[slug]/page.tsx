// app/docs/[slug]/page.tsx (or .tsx as per your routing)
import React from "react";
import DocsAside from "@/components/docs/DocsAside";
import PrevAndNext from "@/components/docs/PrevAndNext";
import { docsNavigation } from "@/lib/docs-nav";

interface DocsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: DocsPageProps) {
  const { slug } = await params;
  const pageTitle = slug.replace(/[^a-zA-Z ]/g, " ");

  // Dynamically import MDX component
  const { default: MDXContent } = await import(
    `@/content/docs/overview/${slug}.mdx`
  );

  return (
    <div className="flex">
      <div className="w-4/5 px-24">
        <div className="mb-6">
          <h2 className="text-purple-500 font-bold my-2 mt-4 text-sm">
            / Overview
          </h2>
          <h1 className="capitalize text-4xl font-bold font-heading">
            {pageTitle}
          </h1>
        </div>
        <article>
          <MDXContent />
        </article>
        <PrevAndNext />
      </div>
      <aside className="w-1/5">
        <DocsAside slug={`src/content/docs/overview/${slug}.mdx`} />
      </aside>
    </div>
  );
}

export function generateStaticParams() {
  return docsNavigation.overview.map((item) => ({
    slug: item.href.split("/").pop() as string,
  }));
}

export const dynamicParams = false;
