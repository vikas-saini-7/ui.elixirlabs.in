"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const overviewNavigations = [
  { label: "Introduction", href: "/docs/overview/introduction" },
  { label: "Getting Started", href: "/docs/overview/getting-started" },
  { label: "Installation", href: "/docs/overview/installation" },
  { label: "Releases", href: "/docs/overview/releases" },
];

const componentsNavigations = [
  { label: "Alert", href: "/docs/components/alert" },
  { label: "Button", href: "/docs/components/button" },
];

const DocsMenu = () => {
  const pathname = usePathname();

  const isOverviewPage = pathname.startsWith("/docs/overview");

  const isComponentPage = pathname.startsWith("/docs/components");

  // Pick the correct navigation array
  const currentNavigation = isOverviewPage
    ? overviewNavigations
    : isComponentPage
    ? componentsNavigations
    : [];

  return (
    <div className="min-h-[80vh]">
      <ul>
        {currentNavigation.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={idx}>
              <li
                className={`px-4 py-2 rounded cursor-pointer text-sm transition-colors ${
                  isActive
                    ? "bg-purple-500/10 text-purple-500 font-bold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {item.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default DocsMenu;
