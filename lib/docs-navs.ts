// Docs Navigation
export interface NavItem {
  label: string;
  slug: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction", slug: "/docs" },
      { label: "Installation", slug: "/docs/installation" },
      { label: "Releases", slug: "/docs/releases" },
    ],
  },
  {
    label: "UI Components",
    items: [
      { label: "On This Page", slug: "/docs/on-this-page" },
      { label: "Digital Timer", slug: "/docs/digital-timer" },
    ],
  },
  {
    label: "Text Effects",
    items: [
      { label: "Text", slug: "/docs/text" },
      { label: "Pulpy", slug: "/docs/pulpy" },
    ],
  },
];
