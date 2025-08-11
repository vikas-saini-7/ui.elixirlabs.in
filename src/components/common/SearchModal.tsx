"use client";
import { IconFile, IconSearch, IconX } from "@tabler/icons-react";
import React, { useEffect, useState, useMemo } from "react";
import { docsNavigation, NavItem } from "../../lib/docs-nav";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Flatten all docs items for search
  const allDocsItems = useMemo(() => {
    const items: NavItem[] = [];

    Object.values(docsNavigation).forEach((section) => {
      section.forEach((item) => {
        if ("href" in item) {
          items.push(item);
        } else if ("items" in item) {
          items.push(...item.items);
        }
      });
    });

    return items;
  }, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allDocsItems.slice(0, 8);

    return allDocsItems
      .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [query, allDocsItems]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            window.location.href = filteredItems[selectedIndex].href;
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] border border-gray-500/20 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center border-b border-gray-500/20 px-4 py-1">
          <IconSearch size={18} className="text-gray-500 mr-4" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500/70 py-4 outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-300 transition-colors rounded-md hover:bg-gray-500/20"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto px-3">
          {filteredItems.length > 0 ? (
            <div className="py-3 space-y-2">
              {filteredItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  onClick={() => {
                    onClose();
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm transition-all duration-200 rounded-lg cursor-pointer ${
                    index === selectedIndex
                      ? "border-gray-500/20 bg-gray-500/10 border text-white shadow-sm"
                      : "text-gray-500 border border-dashed border-transparent hover:border-gray-500/20"
                  }`}
                >
                  <IconFile
                    size={16}
                    className="mr-4 text-gray-500/80 flex-shrink-0"
                  />
                  <span className="truncate">{item.label}</span>
                  <span className="ml-auto text-xs text-gray-500/70 pl-3">
                    {item.href.replace("/docs/", "").replace("/", " › ")}
                  </span>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="py-12 text-center text-sm text-gray-500/80">
              No results found for{" "}
              <span className="text-gray-400">&quot;{query}&quot;</span>
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-gray-500/80">
              Start typing to search documentation...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-500/20 px-4 py-3 flex items-center justify-between text-xs text-gray-500/80">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs mr-1 text-gray-400">
                ↑
              </kbd>
              <kbd className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs mr-3 text-gray-400">
                ↓
              </kbd>
              <span>to navigate</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs mr-3 text-gray-400">
                ↵
              </kbd>
              <span>to select</span>
            </div>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs mr-3 text-gray-400">
              esc
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
