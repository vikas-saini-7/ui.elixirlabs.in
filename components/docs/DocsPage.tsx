"use client";

interface DocsPageProps {
  content: React.ReactNode;
}

export function DocsPage({ content }: DocsPageProps) {
  return (
    <article className="prose dark:prose-invert prose-neutral w-full max-w-3xl mx-auto">
      {content}
    </article>
  );
}
