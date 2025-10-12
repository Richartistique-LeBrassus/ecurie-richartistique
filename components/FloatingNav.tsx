"use client";
import { Menu, Search } from "lucide-react";
import SearchDrawer from "@/components/ui/SearchDrawer";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "phosphor-react";
import useBasketStore from '@/store/store';
import NavDrawer from "./ui/NavDrawer";
import { usePathname } from "next/navigation";

export const FloatingNav = () => {
  const [isOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  // detect scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === "down" ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`w-full fixed z-20 px-4  
      ${isSearchOpen || isNavOpen ? "py-0 lg:py-0" : "py-[6px] lg:py-3"}  
      md:px-8
      ${isScrolled ? "bg-neutral-50" : "bg-neutral-50"}`}
    >
      <AnimatePresence>
        <motion.div
          key="nav-content"
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={
            !isOpen && !isSearchOpen && !isNavOpen
              ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
              : { opacity: 0, y: -20, scale: 0.95, pointerEvents: "none" }
          }
          exit={{ opacity: 0, y: -20 }}
          transition={{
            opacity: { duration: 0.4, ease: "easeInOut" },
            y: { duration: 0.4, ease: "easeInOut" },
            scale: { duration: 0.4, ease: "easeInOut" },
          }}
          className="w-full min-h-[69px] inline-flex justify-between items-center"
        >
          {!isOpen && !isSearchOpen && !isNavOpen && (
            <>
              <div className="relative h-fit w-fit sm:h-7 my-0">
                <AnimatePresence mode="wait">
                  {!isScrolled ? (
                    <motion.div
                      key="brand"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="transition-opacity duration-500"
                    ></motion.div>
                  ) : (
                    <motion.div
                      key="icons"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-4 text-black transition-colors duration-300"
                    >
                      <button
                        aria-label="Open menu"
                        onClick={() => setNavOpen(true)}
                      >
                        <Menu className="h-5 w-5 lg:h-6 lg:w-6 hover:cursor-pointer hover:text-neutral-600 duration-300 ease-in-out hover:scale-105" />
                      </button>

                      <button
                        aria-label="Open search"
                        onClick={() => setSearchOpen(true)}
                      >
                        <Search className="w-5 h-5 lg:w-5 lg:h-5 hover:cursor-pointer hover:text-neutral-600 duration-300 ease-in-out hover:scale-105" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            <motion.span
              className="mb-[6px] absolute left-1/2 transform -translate-x-1/2"
            >
              <Link
                href="/"
                prefetch={true}
                className="text-black flex flex-col items-center h-fit uppercase font-extrabold"
                aria-label="Home"
              >
                <div className="ecurie">
                  <h2 className="text-[17px]">
                    É
                  </h2>
                </div>
                <div className="logo -mt-4">
                  <h2 className="text-6xl md:text-[62px] lg:text-7xl">
                    R
                  </h2>
                </div>
              </Link>
            </motion.span>
              <div className="relative group mt-[4px]">
                <Link
                  href="/cart"
                  prefetch={true} 
                  className="inline-block relative w-fit h-fit"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag
                    size={26}
                    weight="duotone"
                    className="text-black transition-all duration-300 group-hover:scale-105"
                  />
                  {itemCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 bg-black border border-white 
                      rounded-full w-5 h-5 flex items-center justify-center 
                      text-[10px] text-white font-medium shadow-sm tracking-tight
                      transition-transform duration-200 group-hover:scale-110"
                    >
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <NavDrawer isOpen={isNavOpen} onClose={() => setNavOpen(false)} />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </motion.nav>
  );
};