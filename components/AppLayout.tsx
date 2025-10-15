"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";
import { FloatingNav } from "./FloatingNav";

gsap.registerPlugin(ScrollTrigger);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setPageReady(true);
    window.addEventListener("pageReady", handleReady);
    return () => window.removeEventListener("pageReady", handleReady);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".card");
    cards.forEach((card) => {
      gsap.from(card, {
        yPercent: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative z-10">
      <FloatingNav />
      <div ref={containerRef} className="relative z-10">
        {children}
      </div>

      <footer id="sticky-inner" className="min-h-fit bottom-0 w-full z-0 bg-neutral-50">
        <Footer />
      </footer>      
    </main>
  );
}