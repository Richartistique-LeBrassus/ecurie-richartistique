'use client';
import FeaturedMasterpieces from "@/components/FeaturedMasterpieces";
import RetroCatalogue from "@/components/RetroCatalogue";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../globals.css";
import CinematicHero from "@/components/CinematicHero";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.dispatchEvent(new Event('pageReady'));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.card');

    cards.forEach((card) => {
      gsap.from(card, {
        yPercent: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: 'bottom top',
          end: 'bottom bottom',
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div ref={containerRef} className="">
      <div className="flex flex-col items-center justify-top min-h-screen relative">
        <CinematicHero />       
        <FeaturedMasterpieces />
        <RetroCatalogue />
        {/* <CtaSection /> */}
      </div>
    </div>
  );
}