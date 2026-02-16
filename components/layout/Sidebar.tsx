"use client";
import React from "react";
import Link from "next/link";
import { docsNavigation } from "@/lib/docs-navs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <ScrollArea className="h-full">
      <nav className="p-6">
        <ul className="space-y-6">
          {docsNavigation.map((section) => (
            <li key={section.label}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-accent-foreground/80">
                {section.label}
              </div>
              <ul className="space-y-1 pl-2 border-l border-sidebar-border">
                {section.items.map((item) => {
                  const isActive = pathname === item.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={item.slug}
                        className={
                          `block rounded-md px-3 py-1 text-sm transition-colors ` +
                          (isActive
                            ? "text-white bg-gray-500/10"
                            : "text-white hover:bg-gray-500/10 hover:text-sidebar-accent-foreground")
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default Sidebar;
