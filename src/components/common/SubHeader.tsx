"use client";
import React from "react";
import {
  IconBox,
  IconBrandSketch,
  IconLayout,
  IconRocket,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation, NavItem } from "@/lib/docs-nav";

const navigations = [
  {
    icon: <IconRocket size={18} />,
    label: "Overview",
    href: docsNavigation.overview[0].href,
    match: "/docs/overview",
  },
  {
    icon: <IconBox size={18} />,
    label: "Components",
    href: (docsNavigation.components[0] as NavItem).href,
    match: "/docs/components",
  },
  {
    icon: <IconLayout size={18} />,
    label: "Sections",
    comingSoon: true,
    match: "/docs/sections",
  },
];
const SubHeader = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="container mx-auto px-4 h-[48px] flex items-center justify-between border-b border-dashed text-white/70 sticky top-0 backdrop-blur-md z-50">
      <div>
        <ul className="flex items-center gap-8 text-sm">
          {navigations.map((item, idx) => {
            const isActive = pathname.startsWith(item.match || "");

            return (
              <li key={idx} className="flex items-center gap-1">
                {item.comingSoon ? (
                  <span className="flex items-center gap-2 text-neutral-500 cursor-not-allowed">
                    {item.icon}
                    {item.label}
                    <span className="text-[10px] px-1.5 py-[1px] bg-neutral-700 text-neutral-300 rounded">
                      Coming soon
                    </span>
                  </span>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center gap-1 transition border-b h-12 ${
                      isActive
                        ? "text-white border-purple-500"
                        : "hover:text-white border-transparent"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ul className="flex items-center gap-4">
          <Link href="https://pro.elixirlabs.in" target="_blank">
            <li className="flex items-center gap-1 bg-gradient-to-tr from-yellow-700 to-yellow-500 hover:from-yellow-600 hover:to-yellow-400 text-black px-2 py-1 rounded">
              <IconBrandSketch size={18} />
              Get Premium
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SubHeader;
