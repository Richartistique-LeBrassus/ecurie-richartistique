"use client";
import React, { useState } from "react";
import { featuredModels, lookbookModels } from "@/data/index";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedMasterpieces() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null); 
  const scrollRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%", 
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);
  
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%", 
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, 
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,    
      duration: 0.8,    
      ease: "easeOut" as const,
    },
  }),
};

  const [activeTab, setActiveTab] = useState<"boutique" | "lookbook">("boutique");

  return (
   <section
     className="w-full bg-neutral-50 py-44 sm:py-[184px] md:py-48 lg:py-56 px-4 md:px-16
     2xl:py-60">
      <div
        ref={wrapperRef}
        className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-center md:text-lg
          font-extrabold mb-7 tracking-widest text-cyan-900 uppercase"
        >
          <span className="text-stone-950">Mechanical </span>Icons
        </h2>
        <div className="flex justify-center gap-7 md:gap-16 font-medium mx-auto 
        tracking-tight mb-14 md:mb-16 lg:mb-24 2xl:mb-28">
          <button
            onClick={() => setActiveTab("boutique")}
            className={`transition font-semibold uppercase hover:cursor-pointer ${
              activeTab === "boutique" ? "text-cyan-900 underline underline-offset-4" : "text-stone-500"
            }`}
          >
            Look Book
          </button>
          <button
            onClick={() => setActiveTab("lookbook")}
            className={`transition font-semibold uppercase hover:cursor-pointer ${
              activeTab === "lookbook" ? "text-cyan-900 underline underline-offset-4" : "text-stone-500"
            }`}
          >
            Boutique
          </button>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "boutique" ? (
            <motion.div
              ref={scrollRef}
              initial={false}        
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {lookbookModels.map((model, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="group relative overflow-hidden 
                  rounded-3xl transition-all duration-300 
                  hover:cursor-pointer h-[400px]"
                >
                  <Image
                    src={model.imageUrl}
                    alt={model.title}
                    className="w-full h-[400px] object-cover"
                    fill
                    priority
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === "lookbook" && (
                <motion.div
                  key="boutique-carousel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="relative flex items-center justify-center w-full h-[450px] overflow-hidden"
                >
                  <span
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === 0 ? featuredModels.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 z-20 bg-white/80  
                    text-black rounded-xs p-2 hover:cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </span>          
                  <div className="relative w-full h-full flex items-center justify-center">
                    {featuredModels.map((model, index) => {
                      const isActive = index === activeIndex;
                      const isPrev =
                        index === (activeIndex - 1 + featuredModels.length) % featuredModels.length;
                      const isNext = index === (activeIndex + 1) % featuredModels.length;            
                  
                      return (
                        <motion.div
                          key={index}
                          layout="position"
                          animate={{
                            x: isActive
                              ? 0
                              : isPrev
                              ? -window.innerWidth * 0.4
                              : isNext
                              ? window.innerWidth * 0.4
                              : 0,
                            scale: isActive ? 1 : 0.9,
                            opacity: isActive || isPrev || isNext ? 1 : 0,
                            zIndex: isActive ? 10 : 5,
                          }}
                          transition={{
                            x: {
                              duration: 1.3,
                              ease: [0.25, 0.1, 0.25, 1],
                              delay: isActive ? 0 : 0.05,
                            },
                            scale: {
                              duration: 1.1,
                              ease: [0.4, 0.0, 0.2, 1],
                              delay: isActive ? 0 : 0.05,
                            },
                            opacity: {
                              duration: 0.9,
                              ease: "easeInOut",
                              delay: isActive ? 0 : 0.02,
                            },
                          }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            overflow-hidden cursor-pointer rounded-3xl will-change-transform"
                          style={{
                            width: isActive ? "90vw" : "55vw",
                            maxWidth: isActive ? "700px" : "380px",
                            height: isActive
                              ? window.innerWidth >= 1280
                                ? "425px"
                                : "350px"
                              : "220px",
                          }}
                        >
                          <Link href={model.url} className="w-full h-full block">
                            <Image
                              src={model.imageUrl}
                              alt={model.title}
                              fill
                              className="object-cover rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                              priority={isActive}
                            />
                            <div className="absolute bottom-0 p-6 text-white z-10">
                              <motion.h3
                                className="text-sm md:text-lg tracking-widest mb-1 drop-shadow-2xl uppercase"
                                initial={false}
                                animate={{
                                  opacity: isActive ? 1 : 0,
                                  y: isActive ? 0 : 12,
                                  scale: isActive ? 1 : 1.25, 
                                }}
                                transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                                style={{ transformOrigin: "center" }}
                              >
                                {model.title}
                              </motion.h3>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>           
                  <span
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === featuredModels.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 z-20 bg-white/80 font-bold 
                     text-black rounded-xs p-2 hover:cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>            
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}