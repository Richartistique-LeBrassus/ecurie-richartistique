import Image from "next/image";
import React from "react";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-16 text-black ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 
      gap-12 items-center uppercase">
        <div className="p-5 lg:w-[85%]">
          <h2 className="text-base md:text-lg tracking-tight mb-6 font-bold">
            Meticulously crafted Wonder
          </h2>
          <p className="text-sm mb-6 leading-loose tracking-wider font-medium">
            Childhood—a time of boundless optimism, dreams, and warmth. 
            When the world felt endlessly magical. 
            Unaware thereof, we spend our lives searching for traces of that wonder, 
            yearning for the memories that never fail to warm our souls. 
            Écurie Richartistry brings these feelings to life through meticulously crafted scale-model art, 
            so you no longer have to search for the wonder of days gone by. 
            At Écurie Richartistry, we preserve that magic, 
            transforming it into something personal and everlasting, 
            a living masterpiece of nostalgia tailored to you.
          </p>
          <a
            href="#"
            className="text-cyan-900 underline underline-offset-4 hover:text-gray-700 transition"
          >
            Learn About the Process →
          </a>
        </div>

        <div className="relative">
          <div className="w-full h-[45vh] sm:h-[100vh] md:h-[55vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden rounded-2xl">
            <Image
              src="/images/givenchy.jpg"
              alt="Craft"
              layout="fill"         
              objectFit="cover"    
              objectPosition="top"  
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}