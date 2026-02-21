import React from "react";
import PlayGround from "./PlayGround";
import { notFound } from "next/navigation";

const page = () => {
  if (process.env.NEXT_PUBLIC_ENABLE_PLAYGROUND !== "true") {
    notFound();
  }

  return (
    <div className="bg-white text-black w-full h-[calc(100vh)] flex items-center justify-center">
      <PlayGround />
    </div>
  );
};

export default page;
