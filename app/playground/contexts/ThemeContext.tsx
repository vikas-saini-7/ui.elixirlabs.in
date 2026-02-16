"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState<boolean | null>(null);

  // Load theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("playground-theme");

    if (stored === "dark") {
      setDark(true);
    } else if (stored === "light") {
      setDark(false);
    } else {
      // Default fallback
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem(
        "playground-theme",
        next ? "dark" : "light"
      );
      return next;
    });
  };

  // Prevent render before theme loads (avoids flash)
  if (dark === null) return null;

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
