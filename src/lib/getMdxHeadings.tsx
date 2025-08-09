import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import type { Root, Content, Heading as MdastHeading, Text } from "mdast";

export interface Heading {
  title: string;
  href: string;
}

export function getMdxHeadings(filePath: string): Heading[] {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .parse(fileContents) as Root;

  const headings: Heading[] = [];

  visit(tree, "heading", (node: MdastHeading) => {
    const text = node.children
      .filter((n: Content): n is Text => n.type === "text")
      .map((n) => n.value)
      .join("");

    const slug = text
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    headings.push({ title: text, href: `#${slug}` });
  });

  return headings;
}
