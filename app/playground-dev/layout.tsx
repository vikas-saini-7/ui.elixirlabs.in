"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import PlaygroundHeader from "@/components/playground/PlaygroundHeader";
import {
  StateProvider,
  usePlaygroundState,
} from "../../contexts/PlaygroundStateContext";

import { useEffect, useState, useCallback } from "react";

function PlaygroundShell({ children }: { children: React.ReactNode }) {
  const {
    showHeader,
    toggleHeader,
    fullWidth,
    verticalAlign,
    horizontalAlign,
    boxColor,
  } = usePlaygroundState();

  // Overlay state: 'none' | 'entering' | 'leaving'
  const [overlay, setOverlay] = useState<"none" | "entering" | "leaving">(
    "none",
  );

  // Show entering overlay on mount for 3 seconds
  useEffect(() => {
    setOverlay("entering");
    const timer = setTimeout(() => setOverlay("none"), 3000);
    return () => clearTimeout(timer);
  }, []);
  console.log(overlay);

  // Handler to show leaving overlay for 3 seconds
  const showLeavingOverlay = useCallback(() => {
    setOverlay("leaving");
  }, []);

  // Map alignment to flex classes
  const vMap = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
  };
  const hMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ background: boxColor }}
    >
      {/* Overlay */}
      {/* {overlay !== "none" && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white text-base font-medium transition-opacity duration-300"
          style={{
            pointerEvents: "all",
            letterSpacing: 1,
            backgroundColor: "#000",
          }}
        >
          {overlay === "entering"
            ? "Welcome to the Lab! Unleash your creativity."
            : "Goodbye! Your ideas await your return."}
        </div>
      )} */}
      {/* HEADER CONTAINER */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative">
          <PlaygroundHeader onLeave={showLeavingOverlay} />
          {/* TOGGLE BUTTON */}
          <button
            onClick={toggleHeader}
            className="absolute right-6 top-full 
                       w-12 h-6 rounded-b-xl 
                       border border-t-0 bg-neutral-900 text-white shadow-md 
                       flex items-center justify-center
                       transition-all duration-300"
          >
            {showHeader ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <main
        className={`transition-all duration-300 flex ${vMap[verticalAlign]} ${hMap[horizontalAlign]} ${
          showHeader ? "pt-20" : "pt-6"
        } ${fullWidth ? "w-full max-w-none px-4" : "container mx-auto px-4"}`}
        style={{ minHeight: "calc(100vh)", background: boxColor }}
      >
        {children}
      </main>
    </div>
  );
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StateProvider>
        <PlaygroundShell>{children}</PlaygroundShell>
      </StateProvider>
    </>
  );
}
