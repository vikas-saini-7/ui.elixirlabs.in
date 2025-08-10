"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // Small helper for merging classes

interface GamingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function GamingButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: GamingButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-semibold tracking-wide rounded-lg transition-all duration-200 active:scale-95";

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.7)] hover:shadow-[0_0_20px_rgba(236,72,153,1)]",
    secondary:
      "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:shadow-[0_0_20px_rgba(59,130,246,1)]",
    danger:
      "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)] hover:shadow-[0_0_20px_rgba(239,68,68,1)]",
  };

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
