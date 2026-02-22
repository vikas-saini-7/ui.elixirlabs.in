"use client";

import * as React from "react";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------------------------- */
/* Types                              */
/* ---------------------------------- */

export interface OnThisPageItem {
  id: string;
  label: React.ReactNode;
  level?: number;
}

export type OnThisPageVariant = "none" | "bullet";

export interface OnThisPageProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  items: OnThisPageItem[];

  label?: React.ReactNode;

  activeItem?: string;

  enableSpy?: boolean;

  scrollOffset?: number;

  smoothScroll?: boolean;

  variant?: OnThisPageVariant;

  icon?: (
    item: OnThisPageItem,
    index: number,
    isActive: boolean
  ) => React.ReactNode;

  renderItem?: (
    item: OnThisPageItem,
    state: { isActive: boolean }
  ) => React.ReactNode;
}

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

const OnThisPage = React.forwardRef<
  HTMLElement,
  OnThisPageProps
>(
  (
    {
      className,
      items = [],
      label,
      activeItem: controlledActive,
      enableSpy = true,
      scrollOffset = 0,
      smoothScroll = true,
      variant = "none",
      icon,
      renderItem,
      ...props
    },
    ref
  ) => {
    const [internalActive, setInternalActive] =
      React.useState<string | null>(null);

    const isControlled =
      controlledActive !== undefined;

    const activeId = isControlled
      ? controlledActive
      : internalActive;

    /* Level normalization */

    const normalizeLevel = (level?: number) => {
      if (level === 2) return 2;
      if (level === 3) return 3;
      return 1;
    };

    const getLevelStyles = (level?: number) => {
      const l = normalizeLevel(level);
      if (l === 2) return "ml-4 text-gray-500";
      if (l === 3) return "ml-8 text-gray-400";
      return "text-gray-700";
    };

    /* Scroll Spy */

    React.useEffect(() => {
      if (!enableSpy || isControlled) return;
      if (typeof window === "undefined") return;

      const elements = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                Math.abs(a.boundingClientRect.top) -
                Math.abs(b.boundingClientRect.top)
            );

          if (visible.length > 0) {
            setInternalActive(visible[0].target.id);
          }
        },
        {
          rootMargin: `-${scrollOffset}px 0px -70% 0px`,
          threshold: 0.1,
        }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, [items, enableSpy, isControlled, scrollOffset]);

    /* Scroll Handler */

    const scrollToSection = (id: string) => {
      if (typeof window === "undefined") return;
      if (activeId === id) return;

      const el = document.getElementById(id);
      if (!el) return;

      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        scrollOffset;

      window.scrollTo({
        top: y,
        behavior: smoothScroll ? "smooth" : "auto",
      });
    };

    /* Default Bullet */

    const renderDefaultIcon = (isActive: boolean) => {
      if (variant === "bullet") {
        return (
          <span
            className={cn(
              "mt-[6px] h-1.5 w-1.5 rounded-full transition-colors",
              isActive ? "bg-gray-800" : "bg-gray-400"
            )}
          />
        );
      }
      return null;
    };

    /* Render */

    return (
      <nav
        ref={ref}
        className={cn("w-full text-sm", className)}
        {...props}
      >
        {label && (
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
          </div>
        )}

        <ul className="space-y-2">
          {items.map((item, index) => {
            const isActive =
              activeId === item.id;

            if (renderItem) {
              return (
                <React.Fragment key={item.id}>
                  {renderItem(item, { isActive })}
                </React.Fragment>
              );
            }

            return (
              <li
                key={item.id}
                className={cn(
                  "flex items-start gap-2",
                  getLevelStyles(item.level)
                )}
              >
                {icon
                  ? icon(item, index, isActive)
                  : renderDefaultIcon(isActive)}

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  className={cn(
                    "text-left transition-colors duration-150",
                    isActive
                      ? "text-gray-900 font-medium"
                      : "hover:text-gray-900"
                  )}
                  aria-current={
                    isActive
                      ? "location"
                      : undefined
                  }
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);

OnThisPage.displayName = "OnThisPage";

export { OnThisPage };