"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchModal from "@/components/SearchModal";

export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-muted-foreground hover:text-foreground hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-all duration-200"
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Search...</span>
        <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-muted-foreground">
          &#8984;K
        </span>
      </button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
