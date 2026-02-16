import React from "react";
import { Button } from "@/components/ui/button";
import { IconPencil } from "@tabler/icons-react";

// OnThisPage: Simple anchor list
function OnThisPage({
  headings,
}: {
  headings: { level: number; text: string; slug: string }[];
}) {
  return (
    <nav>
      <div className="text-xs font-semibold mb-3 text-muted-foreground uppercase">
        On this page
      </div>

      <ul className="text-sm space-y-2">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={`hover:text-primary transition ${
                heading.level === 3 ? "ml-4 text-muted-foreground" : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// EditOnGitHubButton: Edit link with pencil icon
function EditOnGitHubButton({ url }: { url: string }) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="mb-4 border-gray-500/10 bg-gray-500/10 w-fit px-8"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <IconPencil className="size-4" aria-hidden="true" />
        Edit this page on GitHub
      </a>
    </Button>
  );
}

// AdPlaceholder: Simple future ad section
function AdPlaceholder() {
  return (
    <div className="bg-gray-500/10 rounded-md h-30 flex items-center justify-center text-xs text-muted-foreground my-6">
      {/* Ad placeholder - replace with ad content in future */}
      Ad placeholder
    </div>
  );
}

function AsideRight({
  headings,
}: {
  headings: { level: number; text: string; slug: string }[];
}) {
  return (
    <aside
      className="
          sticky top-16
          h-[calc(100vh-64px)]
          w-80
          border-l border-dashed border-sidebar-border
          bg-background/80 backdrop-blur
          z-30
        "
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <OnThisPage headings={headings} />
        <AdPlaceholder />
        <EditOnGitHubButton url="https://github.com/elixir-labs-global/ui.elixirlabs.in" />
      </div>
    </aside>
  );
}

export { OnThisPage, EditOnGitHubButton, AdPlaceholder, AsideRight };
