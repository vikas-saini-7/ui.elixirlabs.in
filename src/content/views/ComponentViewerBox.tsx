import React from "react";
import clsx from "clsx";
import "./component-viewer.css";

interface ComponentViewerBoxProps {
  children: React.ReactNode;
  center?: boolean;
  background?: boolean;
  className?: string;
}

const ComponentViewerBox = ({
  children,
  center = false,
  background = true,
  className,
}: ComponentViewerBoxProps) => {
  return (
    <div
      className={clsx(
        "component-viewer p-8 min-h-[260px] flex items-center rounded-lg border border-dashed border-gray-500/20",
        background && "bg-gray-500/10",
        center && "flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ComponentViewerBox;
