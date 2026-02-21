"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language?: string;
  code: string;
}

export default function CodeBlock({ language = "tsx", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition bg-gray-500/20 hover:bg-gray-500/30 p-1.5 rounded-md"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} />
        )}
      </button>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          borderRadius: "0.75rem",
          background: "rgba(107, 114, 128, 0.1)",
          maxHeight: "350px", // Limit logical height
          overflow: "auto", // Ensure scroll when overflow
        }}
        className="code-block-scrollbar"
        codeTagProps={{
          style: {
            background: "transparent",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
