import { DocsPage } from "@/components/docs/DocsPage";
import { getDocBySlug } from "@/lib/docs";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return <DocsPage content={doc.content} />;
}
