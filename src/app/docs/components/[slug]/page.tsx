// app/docs/[slug]/page.tsx (or .tsx as per your routing)
import React from "react";
import DocsAside from "@/components/docs/DocsAside";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageTitle = slug.replace(/[^a-zA-Z ]/g, " ");

  // Dynamically import MDX component
  const { default: MDXContent } = await import(
    `@/content/docs/components/${slug}.mdx`
  );

  return (
    <div className="flex">
      <div className="w-4/5 px-24">
        <div className="mb-6">
          <h2 className="text-purple-500 font-medium mb-2">/ Components</h2>
          <h1 className="capitalize text-4xl font-bold font-heading">
            {pageTitle}
          </h1>
        </div>
        <article>
          <MDXContent />
        </article>
      </div>
      <aside className="w-1/5">
        <DocsAside slug={`src/content/docs/components/${slug}.mdx`} />
      </aside>
    </div>
  );
}

// export function generateStaticParams() {
//   return [
//     { slug: "welcome" },
//     { slug: "about" },
//     { slug: "button" },
//     { slug: "alert" },
//   ];
// }

export const dynamicParams = false;
