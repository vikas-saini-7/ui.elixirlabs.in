interface DocsPageProps {
  content: React.ReactNode;
}

export function DocsPage({ content }: DocsPageProps) {
  return (
    <article className="prose dark:prose-invert prose-neutral max-w-3xl">
      {content}
    </article>
  );
}
