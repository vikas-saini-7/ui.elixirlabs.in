"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { docsNavigation } from "@/lib/docs-nav";
import { IconChevronDown } from "@tabler/icons-react";

const DocsMenu = () => {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const isOverviewPage = pathname.startsWith("/docs/overview");
  const isComponentPage = pathname.startsWith("/docs/components");

  const currentNavigation = isOverviewPage
    ? docsNavigation.overview
    : isComponentPage
    ? docsNavigation.components
    : [];

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="min-h-[80vh] space-y-4">
      <ul className="space-y-1">
        {currentNavigation.map((item, idx) => {
          // Accordion group
          if ("items" in item) {
            const isOpen = openGroups[item.label] ?? true;
            return (
              <li key={idx}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
                >
                  {item.label}
                  <IconChevronDown
                    size={16}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <ul
                  className={`ml-2 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item?.items?.map((subItem, subIdx) => {
                    const isActive = pathname === subItem.href;
                    return (
                      <Link href={subItem.href} key={subIdx}>
                        <li
                          className={`px-2 py-2 rounded cursor-pointer text-sm transition-colors ${
                            isActive
                              ? "bg-purple-500/10 text-purple-500 font-bold"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          {subItem.label}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </li>
            );
          }

          // Regular single link
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
