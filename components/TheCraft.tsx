"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function TheCraft() {
  const headingRef = useRef<HTMLHeadingElement>(null);

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
            start: "top 80%", // When heading is near viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section className="w-full bg-white px-4 lg:px-16 min-h-fit pb-20">
      <div
        className="max-w-6xl mx-auto px-8 sm:px-10 md:px-12 
        py-20 grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-center"
      >
        {/* Title */}
        <h2 
          ref={headingRef}
          className="
          text-base md:text-lg uppercase
         text-stone-950 font-extrabold tracking-tighter
        leading-tight"
        >
          <span className="text-neutral-400 underline underline-offset-8"> Fabergé </span> <span className="text-cyan-900">Precision</span>
        </h2>
        {/* Subtext */}
        <p className="text-sm text-black leading-relaxed uppercase">
          All of our scale models rely upon accuracy created by the scale-model artist&apos;s eye 
          and hand
          — not AI. At Écurie Richartistry, traditionalism is our tradition. Our models
          are crafted by the finest Fabergé Artists until your personalised, 
          embodyment of mechanical-art exists to be marveled at.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 xl:gap-10 2xl:gap-12">
        <Image
          src="/images/porsche/917-blueprint.jpg"
          alt="Craft process 1"
          width={1200}   // Set the width according to your design needs
          height={854}  // Set the height according to your design needs
          className="w-full h-full object-cover grayscale rounded-2xl"
        />
        <Image
          src="/images/ysl3.jpg"
          alt="Craft process 2"
          width={1280}   // Set the width according to your design needs
          height={849}  // Set the height according to your design needs
          className="w-full h-full object-cover grayscale rounded-2xl"
        />
      </div>
      
      <div
        className="relative w-full h-[60vh] overflow-hidden group rounded-2xl mt-6 md:mt-5 lg:mt-8 xl:mt-12"
      >
        <Image
          src="/images/p721.webp"
          alt="Craft process 2"
          //width={1200}  
          //height={720}
          width={2000}  
          height={1333}  
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
      </div>
    </section>
  );
}