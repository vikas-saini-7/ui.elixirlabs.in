"use client";
import {
  IconBox,
  IconBrandSketch,
  IconLayout,
  IconRocket,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigations = [
  {
    icon: <IconRocket size={18} />,
    label: "Overview",
    href: "/docs/introduction",
    matchPaths: ["/docs/introduction", "/docs/installation", "/docs/releases"], // overview related
  },
  {
    icon: <IconBox size={18} />,
    label: "Components",
    href: "/docs/components",
  },
  {
    icon: <IconLayout size={18} />,
    label: "Sections",
    comingSoon: true,
  },
];

const SubHeader = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="container mx-auto px-4 h-[48px] flex items-center justify-between border-b text-white/70">
      <div>
        <ul className="flex items-center gap-8 text-sm">
          {navigations.map((item, idx) => {
            const isActive = item.matchPaths
              ? item.matchPaths.some((p) => pathname.startsWith(p))
              : pathname.startsWith(item.href || "");

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
                    className={`flex items-center gap-1 transition border-b-2 h-12 ${
                      isActive
                        ? "text-purple-500 border-purple-500"
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
          <Link href="/premium-plans">
            <li className="flex items-center gap-1 bg-gradient-to-tr from-yellow-700 to-yellow-500 hover:from-yellow-600 hover:to-yellow-400 text-black px-2 py-1 rounded">
              <IconBrandSketch size={18} /> Access Premium
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SubHeader;
