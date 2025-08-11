"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import common languages for syntax highlighting
import "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import "react-syntax-highlighter/dist/esm/languages/prism/bash";
import "react-syntax-highlighter/dist/esm/languages/prism/shell-session";
import "react-syntax-highlighter/dist/esm/languages/prism/json";
// import 'react-syntax-highlighter/dist/esm/languages/prism/css';
// import 'react-syntax-highlighter/dist/esm/languages/prism/html';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  height?: string;
}

const CodeBlock = ({
  code,
  language = "javascript",
  className,
  height = "",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  // Custom minimal style
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: "transparent",
      margin: 0,
      padding: "1rem",
      fontSize: "0.875rem",
      lineHeight: "1.5",
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: "transparent",
      fontSize: "0.875rem",
      fontFamily:
        '"JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace',
    },
  };

  return (
    <div
      className={clsx(
        "rounded-lg border border-dashed border-gray-500/20 bg-gray-500/10 mb-8",
        className
      )}
    >
      <ScrollArea
        className={clsx(
          "w-full rounded-lg relative overflow-hidden",
          height || "max-h-[450px]"
        )}
      >
        <span
          className={clsx(
            "absolute top-[10px] right-4 p-2 rounded cursor-pointer transition-colors z-10",
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-500/20 hover:bg-gray-500/30"
          )}
          onClick={copyToClipboard}
        >
          {copied ? (
            <IconClipboardCheck size={16} />
          ) : (
            <IconClipboard size={16} />
          )}
        </span>
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1rem",
            // overflow: "auto",
            maxWidth: "100%",
          }}
          wrapLongLines={true}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </ScrollArea>
    </div>
  );
};

export default CodeBlock;
