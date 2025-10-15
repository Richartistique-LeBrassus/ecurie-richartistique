"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClerkLoaded, SignedIn, SignInButton, SignedOut, SignOutButton } from '@clerk/nextjs';
import { X, User, Heart, LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChevronRight = dynamic(
  () => import("lucide-react").then((mod) => mod.ChevronRight),
  { ssr: false }
);

const NavDrawer = ({ isOpen, onClose }: NavDrawerProps) => {
  const router = useRouter();

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

  return (
    <>
      <div
        className={`fixed inset-0 bg-white/20 backdrop-blur-[120px] transition-opacity duration-300 ease-in-out 
        ${isOpen ? "opacity-90 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.aside
        key="NavDrawer"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.4 }}
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-90 flex flex-col justify-between items-center
        pt-20 pb-5 px-9 h-full
        md:pt-28 2xl:pt-36 
        sm:px-16 2xl:px-28 rounded-tr-sm
        md:w-1/2
        bg-neutral-100 text-stone-950"
      >
        <div className="absolute top-5 left-5">
          <button aria-label="Close menu" onClick={onClose}>
            <X
              size={25}
              className="hover:cursor-pointer transition-colors duration-300
              hover:text-neutral-600 ease-in-out hover:scale-105"
            />
          </button>
        </div>    
        <div className="flex flex-col h-full w-full ">
          <nav className="flex flex-col gap-3 w-full border-y border-neutral-400 text-sm uppercase tracking-wider font-bold md:py-9">
            <ul className="flex flex-col gap-3">
              {["Porsche", "Ferrari", "Parts & Spares", "Merchandise"].map((item, i) => {
                const slug = `/${encodeURIComponent(
                  item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")
                )}`;
                return (
                  <li key={i}>
                    <Link
                      href={slug}
                      prefetch={false}
                      className="group flex items-center justify-between w-full py-4"
                      aria-label={item}
                      onMouseEnter={() => void router.prefetch(slug)}
                    >
                      <span className="relative pl-1 pb-1 inline-block">
                        {item}
                        <span
                          className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-current transition-[width] duration-400 group-hover:w-full"
                        ></span>
                      </span>
                      <ChevronRight size={20} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>    
          <ClerkLoaded>
            <div className="flex flex-col text-zinc-700 justify-between h-fit 
              space-y-11 text-sm uppercase tracking-wider font-bold mt-auto">
              <SignedIn>
                <Link
                  href="/orders"
                  className="group flex items-center gap-3 hover:text-cyan-600 transition-colors duration-300"
                >
                  <User size={24} />
                  <span className="relative pl-1 pb-1 inline-block">
                    My Orders
                    <span className="absolute bottom-0 left-0 h-[1.2px] w-0 bg-current transition-all 
                      duration-300 group-hover:w-full
                      group-hover:text-cyan-600"></span>
                  </span>
                </Link>
              </SignedIn>          
              <SignedOut>
                <SignInButton mode="modal">
                  <a
                    href="#"
                    className="group flex items-center gap-3 hover:text-cyan-600 transition-colors duration-300"
                  >
                    <User size={24} />
                    <span className="relative pl-1 pb-1 inline-block">
                      Sign In
                      <span className="absolute bottom-0 left-0 h-[1.2px] w-0 bg-current transition-all 
                        duration-300 group-hover:w-full
                        group-hover:text-cyan-600"></span>
                    </span>
                  </a>
                </SignInButton>
              </SignedOut>            
              <SignedIn>
                <Link
                  href="/wishlist"
                  className="group flex items-center gap-3 hover:text-blue-900 transition-colors duration-300"
                >
                  <Heart size={21} />
                  <span className="relative pl-1 pb-1 inline-block">
                    Wishlist
                    <span className="absolute bottom-0 left-0 h-[1.2px] w-0 bg-current transition-all 
                      duration-300 group-hover:w-full
                      group-hover:text-blue-900"></span>
                  </span>
                </Link>
              </SignedIn>    
              <SignedOut>
                <SignInButton mode="modal">
                  <a
                    href="#"
                    className="group flex items-center gap-3 hover:text-blue-900 transition-colors duration-300"
                  >
                    <Heart size={21} />
                    <span className="relative pl-1 pb-1 inline-block">
                      Wishlist
                      <span className="absolute bottom-0 left-0 h-[1.2px] w-0 bg-current transition-all 
                        duration-300 group-hover:w-full
                        group-hover:text-blue-900"></span>
                    </span>
                  </a>
                </SignInButton>
              </SignedOut>            
              <SignedIn>
                <SignOutButton>
                  <a
                    href="#"
                    className="group flex items-center gap-3 hover:text-red-700 transition-colors duration-300"
                  >
                    <LogOut size={21} />
                    <span className="relative pl-1 pb-1 inline-block">
                      Sign Out
                      <span className="absolute bottom-0 left-0 h-[1.2px] w-0 bg-current transition-all 
                        duration-300 group-hover:w-full
                        group-hover:text-red-700"></span>
                    </span>
                  </a>
                </SignOutButton>
              </SignedIn>
            </div>
          </ClerkLoaded>    
          <div className="text-sm uppercase tracking-wide text-center 
            border-t border-neutral-400 pt-5 mt-auto">
            <a href="https://int.balmain.com/">
              <div className="tracking-widest uppercase">
                <p className="text-xs mb-2">Scale Models By</p>
                <div className="flex flex-col items-center h-fit p-auto">
                  <div className="tracking-normal uppercase inline-flex items-center ecurie">
                    <h2 className="text-2xl font-extrabold text-black ">É</h2>
                    <div className="flex-col h-fit">
                      <h2 className="text-xs font-bold text-black ">curie</h2>
                    </div>
                  </div>  
                  <div className="tracking-widest uppercase inline-flex items-center logo -mt-6">
                    <h2 className="text-5xl font-extrabold text-black tracking-tight">R</h2>
                    <div className="flex-col h-fit mt-2">                      
                      <h2 className="text-xs font-bold text-black tracking-tight">
                        ichartistique
                      </h2>
                    </div> 
                  </div>                     
                </div>
              </div>
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default NavDrawer;