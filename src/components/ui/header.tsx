"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  submenu?: NavLink[];
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  // Content
  logo?: React.ReactNode | string;
  navLinks?: NavLink[];
  cta?: React.ReactNode;
  searchBar?: React.ReactNode;
  mobileMenu?: React.ReactNode;

  // Layout & Positioning
  variant?: "default" | "sticky" | "floating" | "transparent" | "bordered" | "glass";
  position?: "relative" | "fixed" | "absolute";
  width?: "full" | "container" | "narrow" | "wide";
  align?: "left" | "center" | "between";

  // Styling
  blur?: boolean;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: "none" | "bottom" | "full" | "subtle";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  
  // Behavior
  hideOnScroll?: boolean;
  shrinkOnScroll?: boolean;
  colorOnScroll?: boolean;
  
  // Spacing
  padding?: "none" | "sm" | "md" | "lg";
  height?: "sm" | "md" | "lg" | "xl";
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      // Content
      logo = "Logo",
      navLinks = [],
      cta,
      searchBar,
      mobileMenu,

      // Layout
      variant = "default",
      position = "relative",
      width = "container",
      align = "between",

      // Styling
      blur = false,
      shadow = "none",
      border = "bottom",
      rounded = "none",

      // Behavior
      hideOnScroll = false,
      shrinkOnScroll = false,
      colorOnScroll = variant === "transparent",

      // Spacing
      padding = "md",
      height = "md",

      className,
      ...props
    },
    ref
  ) => {
    const [scrolled, setScrolled] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Update scrolled state
        setScrolled(currentScrollY > 20);
        
        // Handle hide on scroll
        if (hideOnScroll) {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHidden(true);
          } else {
            setHidden(false);
          }
        }
        
        setLastScrollY(currentScrollY);
      };

      if (variant === "sticky" || variant === "transparent" || variant === "floating" || hideOnScroll || shrinkOnScroll || colorOnScroll) {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    }, [variant, hideOnScroll, shrinkOnScroll, colorOnScroll, lastScrollY]);

    // Variant styles
    const variantStyles = {
      default: "bg-white dark:bg-neutral-900",
      sticky: cn(
        "transition-all duration-300",
        scrolled
          ? cn(
              "bg-white dark:bg-neutral-900",
              blur && "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg",
              shadow !== "none" && "shadow-lg"
            )
          : "bg-white dark:bg-neutral-900"
      ),
      floating: cn(
        "transition-all duration-300",
        scrolled
          ? cn(
              "bg-white dark:bg-neutral-900",
              blur && "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg",
              "shadow-xl"
            )
          : "bg-white dark:bg-neutral-900"
      ),
      transparent: cn(
        "transition-all duration-300",
        scrolled && colorOnScroll
          ? cn(
              "bg-white dark:bg-neutral-900",
              blur && "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg"
            )
          : "bg-transparent"
      ),
      bordered: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
      glass: "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl",
    };

    // Width styles
    const widthStyles = {
      full: "w-full",
      container: "max-w-7xl mx-auto",
      narrow: "max-w-5xl mx-auto",
      wide: "max-w-screen-2xl mx-auto",
    };

    // Position styles
    const positionStyles = {
      relative: "relative",
      fixed: "fixed top-0 left-0 right-0 z-50",
      absolute: "absolute top-0 left-0 right-0 z-50",
    };

    // Border styles
    const borderStyles = {
      none: "",
      bottom: "border-b border-neutral-200 dark:border-neutral-800",
      full: "border border-neutral-200 dark:border-neutral-800",
      subtle: "border-b border-neutral-200/50 dark:border-neutral-800/50",
    };

    // Rounded styles
    const roundedStyles = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Shadow styles
    const shadowStyles = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    // Padding styles
    const paddingStyles = {
      none: "px-0",
      sm: "px-2",
      md: "px-4",
      lg: "px-8",
    };

    // Height styles
    const heightStyles = {
      sm: "h-12",
      md: "h-16",
      lg: "h-20",
      xl: "h-24",
    };

    // Align styles
    const alignStyles = {
      left: "justify-start",
      center: "justify-center",
      between: "justify-between",
    };

    return (
      <header
        ref={ref}
        className={cn(
          "w-full transition-all duration-300",
          positionStyles[variant === "floating" || variant === "sticky" ? "fixed" : position],
          variantStyles[variant],
          variant === "floating" && scrolled && widthStyles[width],
          variant === "floating" && scrolled && roundedStyles[rounded],
          variant === "floating" && scrolled && "mt-4",
          borderStyles[scrolled && variant === "transparent" ? "subtle" : border],
          !scrolled && variant === "transparent" && border === "bottom" && "border-white/10",
          shadowStyles[shadow],
          blur && "backdrop-blur-lg",
          hidden && "-translate-y-full",
          className
        )}
        {...props}
      >
        <nav
          className={cn(
            "flex items-center",
            heightStyles[shrinkOnScroll && scrolled ? "sm" : height],
            paddingStyles[padding],
            alignStyles[align],
            variant === "floating" ? widthStyles[width] : "container mx-auto",
            "transition-all duration-300"
          )}
        >
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            {typeof logo === "string" ? (
              <Link
                href="/"
                className={cn(
                  "font-bold text-neutral-900 dark:text-white transition-all",
                  shrinkOnScroll && scrolled ? "text-lg" : "text-xl"
                )}
              >
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Search Bar (optional) */}
          {searchBar && (
            <div className="flex-1 max-w-xl mx-8 hidden lg:block">
              {searchBar}
            </div>
          )}

          {/* Navigation Links */}
          {navLinks.length > 0 && (
            <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
              {navLinks.map((link, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors flex items-center gap-2",
                      variant === "transparent" && !scrolled
                        ? "text-white hover:text-white/80"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    )}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs bg-purple-500 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                  
                  {/* Submenu */}
                  {link.submenu && (
                    <ul className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {link.submenu.map((subLink, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subLink.href}
                            className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          {cta && <div className="flex items-center gap-4">{cta}</div>}

          {/* Mobile Menu */}
          {mobileMenu && <div className="md:hidden">{mobileMenu}</div>}
        </nav>
      </header>
    );
  }
);

Header.displayName = "Header";
