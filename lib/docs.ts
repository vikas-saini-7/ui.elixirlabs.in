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

  const headings = extractHeadings(content);

  return {
    slug: realSlug,
    label: data.label,
    description: data.description || "",
    content: mdxContent,
    headings,
  };
}

function extractHeadings(source: string) {
  const regex = /^(##|###)\s+(.*)/gm;
  const headings = [];
  let match;

  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    const slug = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ level, text, slug });
  }

  return headings;
}
