import React from "react";
import Try from "./Try";
import { notFound } from "next/navigation";

const page = () => {
  if (process.env.NEXT_PUBLIC_ENABLE_PLAYGROUND !== "true") {
    notFound();
  }

  return (
    <div className="bg-white text-black w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      <Try />
    </div>
  );
};

export default page;
