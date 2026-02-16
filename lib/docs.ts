import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/content/views";

const docsDirectory = path.join(process.cwd(), "content/docs");

export async function getDocBySlug(slug: string) {
  const realSlug = slug;
  const fullPath = path.join(docsDirectory, `${realSlug}.mdx`);
  console.log("Looking for doc at:", fullPath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  return {
    slug: realSlug,
    label: data.label,
    description: data.description || "",
    content: mdxContent,
  };
}