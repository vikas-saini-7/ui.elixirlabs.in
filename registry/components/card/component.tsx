"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  title: string;
  description?: string;
  variant?: "product" | "blog" | "feature";
  imagePosition?: "top" | "left";
  footer?: React.ReactNode;
  tag?: string;
  href?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      image,
      title,
      description,
      variant = "product",
      imagePosition = "top",
      footer,
      tag,
      href,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cardVariants = {
      product: "hover:shadow-xl transition-shadow duration-300",
      blog: "hover:scale-[1.02] transition-transform duration-300",
      feature: "hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300",
    };

    const CardContent = () => (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden",
          cardVariants[variant],
          imagePosition === "left" && "flex flex-row",
          className
        )}
        {...props}
      >
        {/* Image */}
        {image && (
          <div
            className={cn(
              "relative overflow-hidden bg-neutral-100 dark:bg-neutral-800",
              imagePosition === "top" && "w-full h-48",
              imagePosition === "left" && "w-1/3 h-auto"
            )}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {tag && (
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-900 dark:text-white rounded-full">
                {tag}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("p-6", imagePosition === "left" && "flex-1")}>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {description}
            </p>
          )}
          {children}
          {footer && (
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {footer}
            </div>
          )}
        </div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="block">
          <CardContent />
        </Link>
      );
    }

    return <CardContent />;
  }
);

Card.displayName = "Card";
