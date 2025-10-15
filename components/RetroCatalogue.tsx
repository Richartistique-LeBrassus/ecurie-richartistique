"use client";
import { productCategories } from "@/data";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";

const ProductCategory = ({ name, type, src, alt }: (typeof productCategories)[0]) => {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
  return (
    <div
      className="flex flex-col items-center relative w-full
      group transition-shadow duration-300"
      role="img"
      aria-label={alt}
    >
      {isVideo ? (
        <video
          src={src}
          className="w-full h-[250px] lg:h-[350px] xl:h-[400px]
          object-cover transform 
          sm:w-[25rem] lg:w-[45vw] rounded-2xl grayscale
          group-hover:scale-105 transition-transform duration-500 ease-in-out"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
       <div className="group">
          <Image
            src={src}
            alt={alt}
            width={280}  
            height={335} 
            loading="lazy"
            className="w-[280px] h-[335px] lg:h-[400px] lg:w-[full] rounded-full
            xl:h-[450px] xl:w-[315px] 2xl:h-[550px] 2xl:w-[370px]
              object-cover
              group-hover:brightness-110
              transition-all duration-500 ease-in-out"
          />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col hover:cursor-pointer
      items-center justify-center text-white mt-3 drop-shadow-2xl">
        <h1 className="text-sm font-bold">{name}</h1>
        <a title={`More about ${type}`}>
          <span className="text-xs mb-3 block uppercase">{type}</span>
        </a>
      </div>
    </div>
  );
};

const RetroCatalogue = () => {
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0, 
        duration: 1,
        ease: "easeOut" as const, 
      },
    }),
  };

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen w-full bg-stone-50 
      px-4 md:px-9
      relative pt-24 pb-28 lg:pt-36 lg:pb-40 2xl:pt-40 2xl:pb-44"
    >  
      <h2
        //ref={headingRef} 
        className="text-base md:text-lg text-center
        mb-20 sm:mb-24 lg:mb-32 
        font-extrabold tracking-widest uppercase">
        Products by <span className="text-stone-500">
          Iconic </span><span className="text-cyan-900"> Decades</span>
      </h2>
        
      <div 
        ref={scrollRef}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        gap-12 lg:gap-2 xl:max-w-[95vw]
        z-10 mx-auto">
        {productCategories.map((productCategorie, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
          <ProductCategory key={productCategorie.src} {...productCategorie} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RetroCatalogue;