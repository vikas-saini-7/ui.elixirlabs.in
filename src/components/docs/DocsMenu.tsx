"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/lib/get-navigation";

interface DocsMenuProps {
  navigation: NavigationItem[];
}

export default function DocsMenu({ navigation }: DocsMenuProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-[80vh] h-full space-y-6 border-r border-dashed py-4">
      <ul className="space-y-6">
        {navigation.map((item, idx) => {
          // Group with items (no collapse, always visible)
          if ("items" in item) {
            return (
              <li key={idx}>
                {/* Category heading - very small and faint, no hover effect */}
                <div className="px-4 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                    {item.label}
                  </span>
                </div>

                {/* Component links - always visible */}
                <ul className="space-y-0.5">
                  {item?.items?.map((subItem, subIdx) => {
                    const isActive = pathname === subItem.href;
                    return (
                      <li key={subIdx}>
                        <Link 
                          href={subItem.href}
                          className={`block px-4 py-1.5 cursor-pointer transition-colors text-sm ${
                            isActive
                              ? "text-white font-medium"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          // Regular single link
          const isActive = pathname === item.href;
          return (
            <li key={idx}>
              <Link 
                href={item.href}
                className={`block px-4 py-1.5 cursor-pointer transition-colors text-sm ${
                  isActive
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
