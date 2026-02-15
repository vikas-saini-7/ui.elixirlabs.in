interface DocsPageProps {
  content: React.ReactNode;
}

export function DocsPage({ content }: DocsPageProps) {
  return (
    <article className="prose max-w-3xl">
      {content}
    </article>
  );
}
