// app/docs/[slug]/page.tsx (or .tsx as per your routing)
import React from "react";
import DocsAside from "@/components/docs/DocsAside";
import PrevAndNext from "@/components/docs/PrevAndNext";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageTitle = slug.replace(/[^a-zA-Z ]/g, " ");

  // Dynamically import MDX component
  const { default: MDXContent } = await import(
    `@/content/docs/components/${slug}.mdx`
  );

  return (
    <div className="flex py-4">
      <div className="w-4/5 px-24">
        <div className="mb-6">
          <h2 className="text-purple-500 font-bold my-2 mt-4 text-sm">
            / Components
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
        <DocsAside slug={`src/content/docs/components/${slug}.mdx`} />
      </aside>
    </div>
  );
}

export async function generateStaticParams() {
  // Import fs to read the actual MDX files
  const fs = await import("fs");
  const path = await import("path");
  
  const componentsDir = path.join(process.cwd(), "src/content/docs/components");
  
  // Read all MDX files in the components directory
  const files = fs.readdirSync(componentsDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
  
  return mdxFiles.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export const dynamicParams = false;
