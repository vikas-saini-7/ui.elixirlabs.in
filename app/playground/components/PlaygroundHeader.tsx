"use client";

import React from "react";
import { Moon, Sun, ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { usePlaygroundState } from "../contexts/StateContext";
import { useRouter } from "next/navigation";

const PlaygroundHeader = () => {
  const { dark, toggleTheme } = useTheme();
  const {
    fullWidth,
    toggleFullWidth,
    verticalAlign,
    setVerticalAlign,
    horizontalAlign,
    setHorizontalAlign,
    boxColor,
    setBoxColor,
  } = usePlaygroundState();

  // Preset colors for dark and light
  const DARK_COLOR = "#0a0a0a";
  const LIGHT_COLOR = "#f4f4f5"; // Tailwind neutral-100

  // Custom theme toggle to override color
  const handleThemeToggle = () => {
    if (!dark) {
      setBoxColor(DARK_COLOR);
    } else {
      setBoxColor(LIGHT_COLOR);
    }
    toggleTheme();
  };
  const router = useRouter();

  return (
    <header className="h-16 backdrop-blur-md border-b border-dashed bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Exit Button */}
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-md hover:bg-muted transition"
            aria-label="Exit Playground"
          >
            <ArrowLeft size={18} />
          </button>

          <h1 className="font-semibold text-lg tracking-tight">
            Component Lab
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Color Picker */}
          <input
            type="color"
            value={boxColor}
            onChange={(e) => setBoxColor(e.target.value)}
            className="w-7 h-7 p-0 border-0 bg-transparent cursor-pointer"
            aria-label="Pick box color"
            title="Pick box color"
            style={{ background: "none" }}
          />
          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-md hover:bg-muted transition"
            aria-label="Toggle Theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {/* Alignment Controls */}
          <div className="flex gap-1">
            {/* Vertical */}
            <select
              value={verticalAlign}
              onChange={(e) =>
                setVerticalAlign(e.target.value as "top" | "center" | "bottom")
              }
              className="px-1 py-0.5 rounded border text-xs bg-background"
              aria-label="Vertical Align"
              title="Vertical Align"
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
            {/* Horizontal */}
            <select
              value={horizontalAlign}
              onChange={(e) =>
                setHorizontalAlign(
                  e.target.value as "left" | "center" | "right",
                )
              }
              className="px-1 py-0.5 rounded border text-xs bg-background"
              aria-label="Horizontal Align"
              title="Horizontal Align"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          {/* Full Width Toggle */}
          <button
            onClick={toggleFullWidth}
            className="p-2 rounded-md hover:bg-muted transition"
            aria-label={
              fullWidth ? "Switch to Container Width" : "Switch to Full Width"
            }
            title={
              fullWidth ? "Switch to Container Width" : "Switch to Full Width"
            }
          >
            {fullWidth ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default PlaygroundHeader;
