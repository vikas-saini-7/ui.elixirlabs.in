"use client";
import { useState, useEffect } from "react";

interface Section {
  //   title: string;
  //   href?: string;
  items?: { title: string; href: string }[];
}

export default function OnThisPage({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    // Extract all href IDs from sections to only observe relevant headings
    const sectionIds = sections.flatMap(
      (section) =>
        section.items?.map((item) => item.href.replace("#", "")) || []
    );

    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting
        );
        if (intersectingEntries.length > 0) {
          // Sort by position and take the topmost one
          const topEntry = intersectingEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0% -70% 0%", // Better margins for more accurate detection
        threshold: [0, 0.1], // Multiple thresholds for better detection
      }
    );

    // Only observe headings that are actually in our sections
    const headings = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];
    headings.forEach((heading) => {
      if (heading) observer.observe(heading);
    });

    // Handle scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  // Calculate active item position
  const getActiveItemPosition = () => {
    let itemIndex = 0;
    for (const section of sections) {
      if (section.items) {
        for (let i = 0; i < section.items.length; i++) {
          if (activeId === section.items[i].href.replace("#", "")) {
            return itemIndex * 28 + 2; // Add 2px offset to center align
          }
          itemIndex++;
        }
      }
    }
    return 2;
  };

  return (
    <div className="hidden lg:block w-64 text-neutral-300">
      <h2 className="mb-3 text-xs text-white/50 capitalize">
        On this page
      </h2>
      <nav className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            {section.items && (
              <ol className="mt-2 space-y-1 border-l border-neutral-700 pl-4 relative">
                {/* Active item indicator */}
                <div
                  className="absolute left-0 w-0.75 bg-gradient-to-b from-purple-400 to-purple-500 transition-all duration-300 ease-out rounded-full"
                  style={{
                    top: `${getActiveItemPosition()}px`,
                    height: "22px",
                    transform: "translateX(-1px)",
                  }}
                />
                {section.items.map((item, i) => {
                  const isActive = activeId === item.href.replace("#", "");
                  return (
                    <li key={i}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(item.href);
                        }}
                        className={`text-sm transition ${
                          isActive || (i === 0 && activeId === "")
                            ? "text-white"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
