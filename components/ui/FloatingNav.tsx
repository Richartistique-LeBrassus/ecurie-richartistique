"use client";
import { Menu, X } from "lucide-react";
import Drawer from "@/components/ui/SearchDrawer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero")
    if (!heroSection) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 0.5 }
    )
    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    if (isSearchOpen) {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement 
      if (searchInput) {
        searchInput.focus()
      }
    }
  }, [isSearchOpen])

  return (
    <nav
      className={`w-full fixed top-0 left-0 mt-2
      z-50 flex flex-row justify-between items-center
      pt-1 tracking-wide px-7 h-[75px] transition-all duration-500 
      ${isScrolled ? "bg-black bg-opacity-80" : "bg-transparent"}`}
    >
      <div className="hidden xl:flex flex-row text-white text-xs gap-4 uppercase">
        <p>1:8 Model Car Kits</p>
        <p>Display Cases</p>
        <p>Parts & Spares</p>
        <p>Publication and Merchandise</p>
        <p>Collection</p>
      </div>

      <button
        className="xl:hidden text-white z-[100] absolute"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu className="h-5 w-5 lg:h-6 lg:w-6 hover:cursor-pointer"/>}

      </button>

      <div className="flex flex-col items-center gap-1 left-1/2 transform -translate-x-1/2 absolute">
        <Link href="/">
          <Image
            src="/images/fleur-trial.png"
            alt="logo"
            width={48}  // Specify the width (12 * 4, for example, since Tailwind's w-12 is 3rem = 48px)
            height={48} // Specify the height (12 * 4, for example, since Tailwind's h-12 is 3rem = 48px)
            className="hover:cursor-pointer"
          />
        </Link>
        <p className="text-white italic text-[10px] pl-1 font-semibold">
          „Richartistry 
          <span className="text-amber-300"> Scalemodels</span>“
        </p>
      </div>

      <div className="text-white text-xs tracking-wide">
        <button onClick={() => setSearchOpen(true)}>
          <p>SEARCH</p>
        </button>
      </div>

      <Drawer isOpen={isSearchOpen} onClose={() => setSearchOpen(false)}>
        <p>Search</p>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border mt-4 font-palm"
        />
      </Drawer>
    </nav>
  )
}