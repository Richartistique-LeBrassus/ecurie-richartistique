'use client';
import React from "react";
import { Check } from "phosphor-react";
import Image from "next/image";

const CtaSection = () => {
  return (
    <section className="w-full bg-neutral-50 rounded-xs overflow-hidden mb-20 shadow-md">
      <div className="grid lg:grid-cols-2 max-w-6xl mx-auto">
        <div className="h-[70vh] lg:h-auto">
          <Image
            src="/images/sign-up.jpg"
            alt="Studio elegance"
            width={1200}   
            height={800}   
            className="w-full h-full object-cover object-right-top contrast-125 brightness-90"
          />
        </div>
        
        <div className=" px-8 sm:px-12 lg:px-20 py-16 lg:py-24 flex flex-col 
        justify-center uppercase">
          <h2 
            className="text-sm  tracking-[0.2em] text-stone-600 font-medium mb-2">
            Become an Écurie Richartistry Collector
          </h2>

          <p className="text-[26px] text-stone-950
          font-extrabold tracking-tight leading mb-9 ">
            <span className="text-neutral-400 underline underline-offset-8">Be the first</span> to know about <span className="text-cyan-900">New Releases</span>, Behind-the-Scenes Access, and <span className="text-cyan-900">Collector Editions</span>.
          </p>

          <ul className="text-stone-700 text-sm font-light space-y-3 mb-12">
            {[
              "New & Limited Products",
              "Exclusive Sales",
              "Preordering Availability",
              "Special Offers",
              "Behind the Scenes",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={18} className="text-stone-900 mt-[2px]" />
                {text}
              </li>
            ))}
          </ul>

          <form className="flex flex-col gap-6 w-full">
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-transparent border-b border-stone-400 uppercase
              placeholder:text-stone-600 py-2 focus:border-stone-900 
              focus:outline-none transition-all duration-300"
            />

            <input
              type="text"
              placeholder="First Name"
              required
              className="bg-transparent border-b border-stone-400 uppercase
              placeholder:text-stone-600 py-2 focus:border-stone-900 
              focus:outline-none transition-all duration-300"
            />

            <button
              type="submit"
              className="mt-6 px-10 py-2 w-full md:w-fit 
              border border-stone-900 bg-transparent text-stone-900 tracking-widest 
               font-bold text-sm rounded-xs hover:cursor-pointer
              hover:text-cyan-700 hover:border-cyan-700 
              transition-all duration-300 ease-in-out hover:scale-[1.02] uppercase"
            >
              Subscribe
            </button>

            <p className="text-xs text-stone-600 tracking-tight font-serif leading-5 mt-6 logo">
              I agree to receive personalised communications from Écurie Richartistry. See the
              <span className="underline mx-1 hover:cursor-pointer">Privacy Policy</span> for details.
            </p>

            <p className="text-xs text-stone-600 font-serif logo">
              Protected by reCAPTCHA and the
              <span className="underline mx-1 hover:cursor-pointer">Google Privacy Policy</span> and
              <span className="underline mx-1 hover:cursor-pointer">Terms of Service</span>.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CtaSection;