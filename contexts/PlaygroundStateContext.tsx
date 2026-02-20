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
  dark: boolean;
  toggleTheme: () => void;
}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasHydrated, setHasHydrated] = React.useState(false);
  const [playgroundState, setPlaygroundState] = React.useState({
    boxColor: "#f4f4f5",
    showHeader: true,
    fullWidth: false,
    verticalAlign: "center" as VerticalAlign,
    horizontalAlign: "center" as HorizontalAlign,
    dark: false,
  });

  React.useEffect(() => {
    const vAlign = localStorage.getItem("playground-vertical-align");
    const hAlign = localStorage.getItem("playground-horizontal-align");
    const theme = localStorage.getItem("playground-theme");
    setPlaygroundState({
      boxColor: localStorage.getItem("playground-box-color") || "#f4f4f5",
      showHeader:
        localStorage.getItem("playground-show-header") === null
          ? true
          : localStorage.getItem("playground-show-header") === "true",
      fullWidth: localStorage.getItem("playground-fullwidth") === "true",
      verticalAlign:
        vAlign === "top" || vAlign === "center" || vAlign === "bottom"
          ? (vAlign as VerticalAlign)
          : "center",
      horizontalAlign:
        hAlign === "left" || hAlign === "center" || hAlign === "right"
          ? (hAlign as HorizontalAlign)
          : "center",
      dark: theme === "dark" ? true : false,
    });
    setHasHydrated(true);
  }, []);

  // Sync with localStorage on state change
  React.useEffect(() => {
    if (!hasHydrated) return;
    localStorage.setItem("playground-box-color", playgroundState.boxColor);
    localStorage.setItem(
      "playground-show-header",
      playgroundState.showHeader ? "true" : "false",
    );
    localStorage.setItem(
      "playground-fullwidth",
      playgroundState.fullWidth ? "true" : "false",
    );
    localStorage.setItem(
      "playground-vertical-align",
      playgroundState.verticalAlign,
    );
    localStorage.setItem(
      "playground-horizontal-align",
      playgroundState.horizontalAlign,
    );
    localStorage.setItem(
      "playground-theme",
      playgroundState.dark ? "dark" : "light",
    );
  }, [playgroundState, hasHydrated]);

  // Setters
  const toggleHeader = () => {
    setPlaygroundState((prev) => ({ ...prev, showHeader: !prev.showHeader }));
  };
  const toggleFullWidth = () => {
    setPlaygroundState((prev) => ({ ...prev, fullWidth: !prev.fullWidth }));
  };
  const setVerticalAlign = (v: VerticalAlign) => {
    setPlaygroundState((prev) => ({ ...prev, verticalAlign: v }));
  };
  const setHorizontalAlign = (h: HorizontalAlign) => {
    setPlaygroundState((prev) => ({ ...prev, horizontalAlign: h }));
  };
  const setBoxColor = (color: string) => {
    setPlaygroundState((prev) => ({ ...prev, boxColor: color }));
  };
  const toggleTheme = () => {
    setPlaygroundState((prev) => ({ ...prev, dark: !prev.dark }));
  };

  if (!hasHydrated) return null;
  return (
    <StateContext.Provider
      value={{
        showHeader: playgroundState.showHeader,
        toggleHeader,
        fullWidth: playgroundState.fullWidth,
        toggleFullWidth,
        verticalAlign: playgroundState.verticalAlign as VerticalAlign,
        setVerticalAlign,
        horizontalAlign: playgroundState.horizontalAlign as HorizontalAlign,
        setHorizontalAlign,
        boxColor: playgroundState.boxColor,
        setBoxColor,
        dark: playgroundState.dark,
        toggleTheme,
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
