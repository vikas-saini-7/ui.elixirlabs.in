"use client";
import { IconSearch } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import SearchModal from "@/components/common/SearchModal";

const SearchComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative w-64 flex items-center"
        >
          <div className="w-full bg-[#1a1a1a] text-sm text-gray-300 placeholder-gray-500 rounded-lg pl-9 pr-12 py-2 outline-none text-left hover:bg-[#1f1f1f] transition-colors border border-transparent hover:border-gray-500/20">
            <span className="text-gray-500">Search documentation...</span>
          </div>
          <IconSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 border border-gray-500/30 px-1.5 py-0.5 rounded font-mono">
            ⌘ K
          </div>
        </button>
      </div>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SearchComponent;
