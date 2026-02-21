import React from "react";
import { cn } from "@/lib/utils";

const ComponentPreview = ({
  children,
  code,
  center,
  className = "",
}: {
  children: React.ReactNode;
  code?: string;
  center?: boolean;
  className?: string;
}) => {
  console.log("code", code);
  return (
    <div
      className={cn(
        "bg-white p-8 rounded-xl",
        center ? "flex justify-center items-center" : "",
        className,
      )}
    >
      <div>{children}</div>
    </div>
  );
};

export default ComponentPreview;
