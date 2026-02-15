export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Releases", href: "/docs/releases" },
    ],
  },
  {
    label: "UI Components",
    items: [
      { label: "On This Page", href: "/docs/on-this-page" },
      { label: "Digital Timer", href: "/docs/digital-timer" },
    ],
  },
  {
    label: "Text Effects",
    items: [
      { label: "Text", href: "/docs/text" },
      { label: "Pulpy", href: "/docs/pulpy" },
    ],
  },
];
