"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { docsNavigation } from "@/lib/docs-nav";

const PrevAndNext = () => {
  const pathname = usePathname();

  // Flatten the navigation structure to get all pages with their sections
  const getAllPagesWithSections = () => {
    const pagesWithSections: {
      label: string;
      href: string;
      section: string;
    }[] = [];

    Object.entries(docsNavigation).forEach(([sectionKey, section]) => {
      section.forEach((item) => {
        if ("href" in item) {
          pagesWithSections.push({
            ...(item as { label: string; href: string }),
            section: sectionKey,
          });
        } else if ("items" in item && item.items) {
          item.items.forEach((subItem) => {
            pagesWithSections.push({ ...subItem, section: sectionKey });
          });
        }
      });
    });

    return pagesWithSections;
  };

  const allPages = getAllPagesWithSections();
  const currentPage = allPages.find((page) => page.href === pathname);

  if (!currentPage) {
    return null;
  }

  // Get pages only from the current section
  const currentSectionPages = allPages.filter(
    (page) => page.section === currentPage.section
  );
  const currentIndex = currentSectionPages.findIndex(
    (page) => page.href === pathname
  );

  const prevPage =
    currentIndex > 0 ? currentSectionPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < currentSectionPages.length - 1
      ? currentSectionPages[currentIndex + 1]
      : null;

  return (
    <div className="flex items-center gap-4">
      <div className="w-1/2 my-8">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="flex flex-col items-start border rounded p-8 border-gray-500/10 hover:border-purple-500/20 transition-colors w-full group"
          >
            <p className="text-xs text-gray-500 transition-colors">
              Previous Page
            </p>
            <p className="hover:text-purple-600 group-hover:text-purple-500 transition-colors">
              {prevPage.label}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-start border rounded p-8 opacity-50">
            <p className="text-xs text-gray-500">Previous Page</p>
            <p>No previous page</p>
          </div>
        )}
      </div>
      <div className="w-1/2 my-8">
        {nextPage ? (
          <Link
            href={nextPage.href}
            className="flex flex-col items-end justify-end border rounded p-8 border-gray-500/10 hover:border-purple-500/20 transition-colors w-full text-right group"
          >
            <p className="text-xs text-gray-500 transition-colors">
              Next Page
            </p>
            <p className="hover:text-purple-600 group-hover:text-purple-500 transition-colors">
              {nextPage.label}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-end justify-end border rounded p-8 opacity-50 text-right">
            <p className="text-xs text-gray-500">Next Page</p>
            <p>No next page</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrevAndNext;
