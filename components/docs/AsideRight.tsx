import React from "react";
import { Button } from "@/components/ui/button";
import { IconPencil } from "@tabler/icons-react";

// OnThisPage: Simple anchor list
function OnThisPage() {
  return (
    <nav className="mb-2">
      <div className="text-xs font-semibold mb-2 text-muted-foreground uppercase">
        On this page
      </div>
      <ul className="text-sm space-y-1">
        <li>
          <a href="#section1" className="hover:underline">
            Section 1
          </a>
        </li>
        <li>
          <a href="#section2" className="hover:underline">
            Section 2
          </a>
        </li>
        <li>
          <a href="#section3" className="hover:underline">
            Section 3
          </a>
        </li>
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
    <div className="bg-gray-500/10 rounded-md h-30 flex items-center justify-center text-xs text-muted-foreground mb-4">
      {/* Ad placeholder - replace with ad content in future */}
      Ad placeholder
    </div>
  );
}

export { OnThisPage, EditOnGitHubButton, AdPlaceholder };
