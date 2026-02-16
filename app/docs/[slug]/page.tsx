import { getDocBySlug } from "@/lib/docs";
import { notFound } from "next/navigation";
import DocsPage from "@/components/docs/DocsPage";

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

  return <DocsPage doc={doc} />;
}
