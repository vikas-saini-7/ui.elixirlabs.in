export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavigationItem = NavItem | NavGroup;

export const docsNavigation = {
  overview: [
    { label: "Introduction", href: "/docs/overview/introduction" },
    { label: "Getting Started", href: "/docs/overview/getting-started" },
    { label: "Installation", href: "/docs/overview/installation" },
    { label: "Releases", href: "/docs/overview/releases" },
  ] as NavItem[],
  components: [
    { label: "Alert", href: "/docs/components/alert" },
    { label: "Button", href: "/docs/components/button" },
    {
      label: "Forms",
      items: [
        { label: "Input", href: "/docs/components/input" },
        { label: "Select", href: "/docs/components/select" },
      ],
    },
  ] as NavigationItem[],
};
