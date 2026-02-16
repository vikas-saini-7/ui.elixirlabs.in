"use client";

import React, { createContext, useContext, useState } from "react";

type VerticalAlign = "top" | "center" | "bottom";
type HorizontalAlign = "left" | "center" | "right";

interface StateContextType {
  showHeader: boolean;
  toggleHeader: () => void;
  fullWidth: boolean;
  toggleFullWidth: () => void;
  verticalAlign: VerticalAlign;
  setVerticalAlign: (v: VerticalAlign) => void;
  horizontalAlign: HorizontalAlign;
  setHorizontalAlign: (h: HorizontalAlign) => void;
  boxColor: string;
  setBoxColor: (color: string) => void;
}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [boxColor, setBoxColorState] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("playground-box-color") || "#ef4444";
    }
    return "#ef4444";
  });
  const [showHeader, setShowHeader] = useState(true);
  const [fullWidth, setFullWidth] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("playground-fullwidth");
      return stored === "true";
    }
    return false;
  });
  const [verticalAlign, setVerticalAlignState] = useState<
    "top" | "center" | "bottom"
  >(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("playground-vertical-align");
      if (stored === "top" || stored === "center" || stored === "bottom")
        return stored;
    }
    return "center";
  });
  const [horizontalAlign, setHorizontalAlignState] = useState<
    "left" | "center" | "right"
  >(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("playground-horizontal-align");
      if (stored === "left" || stored === "center" || stored === "right")
        return stored;
    }
    return "center";
  });

  // Sync with localStorage
  React.useEffect(() => {
    localStorage.setItem("playground-fullwidth", fullWidth ? "true" : "false");
  }, [fullWidth]);

  React.useEffect(() => {
    localStorage.setItem("playground-vertical-align", verticalAlign);
  }, [verticalAlign]);

  React.useEffect(() => {
    localStorage.setItem("playground-horizontal-align", horizontalAlign);
  }, [horizontalAlign]);

  // Setters that sync with localStorage
  const setVerticalAlign = (v: "top" | "center" | "bottom") => {
    setVerticalAlignState(v);
    // localStorage sync handled by effect
  };
  const setHorizontalAlign = (h: "left" | "center" | "right") => {
    setHorizontalAlignState(h);
    // localStorage sync handled by effect
  };

  const setBoxColor = (color: string) => {
    setBoxColorState(color);
    localStorage.setItem("playground-box-color", color);
  };

  return (
    <StateContext.Provider
      value={{
        showHeader,
        toggleHeader: () => setShowHeader((p) => !p),
        fullWidth,
        toggleFullWidth: () => setFullWidth((p) => !p),
        verticalAlign,
        setVerticalAlign,
        horizontalAlign,
        setHorizontalAlign,
        boxColor,
        setBoxColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const usePlaygroundState = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("usePlaygroundState must be used inside StateProvider");
  return context;
};
