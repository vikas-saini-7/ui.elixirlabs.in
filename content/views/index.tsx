import Link from "next/link";

// views
import { Callout } from "./callout";
import { FrameworkCard, FrameworkGrid } from "./framework-grid";
import CodeBlock from "./code-block";
import { ComingSoon } from "./coming-soon";
import ComponentPreview from "./ComponentPreview";

// components
import { CircularText } from "@/registry/blocks/circular-text/circular-text";
import { OnThisPage } from "@/registry/blocks/on-this-page/on-this-page-demo";

export const mdxComponents = {
  // views
  ComponentPreview,
  FrameworkGrid,
  FrameworkCard,
  Callout,
  ComingSoon,

  // components
  CircularText,
  OnThisPage,

  // standard markdown elements

  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:opacity-80 transition"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-primary underline underline-offset-4 hover:opacity-80 transition"
        {...props}
      >
        {children}
      </Link>
    );
  },
  pre: (props: any) => <div {...props} />,
  code: ({ className, children }: any) => {
    const language = className?.replace("language-", "") || "tsx";

    const code = typeof children === "string" ? children.trim() : "";

    return <CodeBlock language={language} code={code} />;
  },

  // addning IDs to heading tags for anchor links and on this page navigation
  h2: ({ children }: any) => {
    const text = children?.toString();
    const slug = text
      ?.toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    return <h2 id={slug}>{children}</h2>;
  },

  h3: ({ children }: any) => {
    const text = children?.toString();
    const slug = text
      ?.toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    return <h3 id={slug}>{children}</h3>;
  },
};
