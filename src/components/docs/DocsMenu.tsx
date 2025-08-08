"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const overviewNavigations = [
  { label: "Introduction", href: "/docs/introduction" },
  { label: "Installation", href: "/docs/installation" },
  { label: "Releases", href: "/docs/releases" },
];

const componentsNavigations = [
  { label: "Alert", href: "/docs/components/alert" },
  { label: "Button", href: "/docs/components/button" },
  { label: "Releases", href: "/docs/components/" },
];

const DocsMenu = () => {
  const pathname = usePathname();

  const lastSegment = pathname?.split("/").filter(Boolean).pop() || "";

  const isOverviewPage = ["introduction", "installation", "releases"].includes(
    lastSegment
  );

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
                    ? "bg-purple-500/10 text-purple-500 font-medium"
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
