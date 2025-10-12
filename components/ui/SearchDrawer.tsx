"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Form from "next/form";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // keep children optional
}

interface SearchResult {
  objectID: string;
  name: string;
}

// Example local dataset — replace with your full product list
const localData: SearchResult[] = [
  { objectID: "1", name: "Porsche 911" },
  { objectID: "2", name: "Ferrari F8" },
  { objectID: "3", name: "Merchandise Cap" },
  { objectID: "4", name: "Parts & Spares Kit" },
];

const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose, children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // ✅ Luxury-grade scroll lock (same behavior as NavDrawer & FloatingNav)
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.width = "100%";
      return () => {
        const y = body.style.top;
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.overflow = "";
        body.style.touchAction = "";
        body.style.width = "";
        window.scrollTo(0, parseInt(y || "0") * -1);
      };
    }
  }, [isOpen]);

  // handleSearch
  const handleSearch = useCallback(
    (q: string) => {
      debounce(() => {
        if (!q) {
          setResults([]);
          return;
        }
        setResults(
          localData.filter((item) =>
            item.name.toLowerCase().includes(q.toLowerCase())
          )
        );
      }, 150)();
    },
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    handleSearch(val);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-90 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.4 }}
        className="fixed top-0 right-0 h-full w-full
          lg:w-[50vw] text-center bg-neutral-100 z-[9999] shadow-xl py-36 overflow-y-auto
          rounded-tl-sm pt-20 pb-5 px-9 md:pt-28 2xl:pt-36"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          title="Close"
          aria-label="Close Search"
          className="absolute top-4 right-4 text-stone-950
            hover:text-stone-400 hover:cursor-pointer
            transition p-2 rounded-full focus:outline-none"
        >
          <X size={24} />
        </button>

        {children} {/* exactly where your content was */}

        <Form action="/search">
          <input
            name="query"
            type="text"
            placeholder="SEARCH"
            value={query}
            onChange={onChange}
            className="w-3/4 md:w-3/5 lg:w-3/4 2xl:w-3/5
              pb-2 border-b border-black text-wide uppercase
              placeholder:text-black placeholder:text-wide
              focus:outline-none transition"
          />
        </Form>

        {results.length > 0 && (
          <ul className="mt-6 space-y-3">
            {results.map((item) => (
              <li
                key={item.objectID}
                className="text-stone-50 border-b border-zinc-900 pb-2"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </motion.aside>
    </>
  );
};

function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default SearchDrawer;