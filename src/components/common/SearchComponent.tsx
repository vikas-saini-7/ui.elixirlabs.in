import { IconSearch } from "@tabler/icons-react";
import React from "react";

const SearchComponent = () => {
  return (
    <div>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#1a1a1a] text-sm text-gray-300 placeholder-gray-500 rounded-lg pl-9 pr-12 py-2 outline-none"
        />
        <IconSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 border border-gray-500/30 px-1 rounded">
          ⌘ K
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
