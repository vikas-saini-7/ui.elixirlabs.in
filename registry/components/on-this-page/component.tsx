"use client";

import { useState, useEffect, ReactNode } from "react";

export interface OnThisPageItem {
  title: string;
  href: string;
}

export interface OnThisPageSection {
  items?: OnThisPageItem[];
}

export interface OnThisPageProps {
  sections: OnThisPageSection[];

  /** Active link color classes */
  activeClassName?: string;
  /** Inactive link color classes */
  inactiveClassName?: string;
  /** Active indicator color classes */
  indicatorClassName?: string;

  /** IntersectionObserver root margin */
  rootMargin?: string;
  /** Smooth scroll or auto */
  scrollBehavior?: ScrollBehavior;

  /** Custom render for item */
  renderItem?: (item: OnThisPageItem, isActive: boolean) => ReactNode;
}

export function OnThisPage({
  sections,
  activeClassName = "text-white",
  inactiveClassName = "text-neutral-400 hover:text-white",
  indicatorClassName = "bg-gradient-to-b from-purple-400 to-purple-500",
  rootMargin = "-20% 0% -70% 0%",
  scrollBehavior = "smooth",
  renderItem,
}: OnThisPageProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sectionIds = sections.flatMap(
      (section) =>
        section.items?.map((item) => item.href.replace("#", "")) || []
    );
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const top = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          setActiveId(top.target.id);
        }
      },
      { rootMargin, threshold: [0, 0.1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, rootMargin]);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: scrollBehavior });
      setActiveId(id);
    }
  };

  const getActiveItemPosition = () => {
    let index = 0;
    for (const section of sections) {
      for (const item of section.items || []) {
        if (activeId === item.href.replace("#", "")) {
          return index * 28 + 2;
        }
        index++;
      }
    }
    return 2;
  };

  return (
    <div className="hidden lg:block text-neutral-300">
      <nav className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            {section.items && (
              <div className="space-y-1 border-l border-neutral-700 relative">
                <div
                  className={`absolute left-0 w-0.75 transition-all duration-300 ease-out rounded-full ${indicatorClassName}`}
                  style={{
                    top: `${getActiveItemPosition()}px`,
                    height: "22px",
                    transform: "translateX(-1px)",
                  }}
                />
                {section.items.map((item, i) => {
                  const isActive = activeId === item.href.replace("#", "");
                  return (
                    <div key={i} className="pl-4">
                      {renderItem ? (
                        renderItem(item, isActive)
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick(item.href);
                          }}
                          className={`text-sm transition ${
                            isActive || (i === 0 && activeId === "")
                              ? activeClassName
                              : inactiveClassName
                          }`}
                        >
                          {item.title}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
