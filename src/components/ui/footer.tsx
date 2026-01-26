"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode | string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  variant?: "simple" | "with-newsletter" | "multi-column";
  newsletterForm?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      logo = "Logo",
      sections = [],
      socialLinks = [],
      copyright = `© ${new Date().getFullYear()} All rights reserved.`,
      variant = "simple",
      newsletterForm,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 py-12">
          {variant === "simple" && (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Logo */}
              <div className="flex items-center">
                {typeof logo === "string" ? (
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">
                    {logo}
                  </span>
                ) : (
                  logo
                )}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon || social.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {variant === "multi-column" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo & Description */}
              <div className="col-span-1">
                {typeof logo === "string" ? (
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">
                    {logo}
                  </span>
                ) : (
                  logo
                )}
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                  Building modern web experiences.
                </p>
              </div>

              {/* Sections */}
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {variant === "with-newsletter" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {typeof logo === "string" ? (
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">
                    {logo}
                  </span>
                ) : (
                  logo
                )}
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                  Subscribe to our newsletter for updates.
                </p>
              </div>
              <div>{newsletterForm}</div>
            </div>
          )}

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";
