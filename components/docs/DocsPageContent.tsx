"use client";

interface DocsPageProps {
  content: React.ReactNode;
}

export function DocsPageContent({ content }: DocsPageProps) {
  return (
    <div className="flex-1 max-w-3xl mx-auto py-10 px-6">
      <article className="prose dark:prose-invert prose-neutral w-full max-w-3xl mx-auto">
        {content}
      </article>
    </div>
  );
}
