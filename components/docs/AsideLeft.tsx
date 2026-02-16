import React from "react";
import Sidebar from "@/components/layout/Sidebar";

const AsideLeft = () => {
  return (
    <aside
      className="
          hidden md:flex
          fixed left-0 top-16
          h-[calc(100vh-4rem)]
          w-64
          border-r border-dashed border-sidebar-border
          bg-background
          z-30
        "
    >
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <Sidebar />
      </div>
    </aside>
  );
};

export default AsideLeft;
