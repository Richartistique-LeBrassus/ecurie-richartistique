"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

export interface ImageType {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface Props {
  images: ImageType[];
  productName?: string;
  children?: React.ReactNode;
}

export default function Lightbox({ images = [], productName = "", children }: Props) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (window.innerWidth <= 640 && thumbRefs.current[index]) {
      thumbRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [index]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setZoomed(false);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
    setZoomed(false);
  }, [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") {
        e.preventDefault();
        setZoomed((z) => !z);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      setZoomed(false);
    }
  }, [open]);

  function openAt(i: number) {
    setIndex(i);
    setVisible(true);
    setTimeout(() => setOpen(true), 10);
    setTimeout(() => overlayRef.current?.focus(), 50);
  }

  function close() {
    setOpen(false);
    setTimeout(() => setVisible(false), 300);
  }

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    moved.current = false;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (startX.current == null) return;
    const delta = e.touches[0].clientX - startX.current;
    if (Math.abs(delta) > 10) moved.current = true;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!moved.current || startX.current == null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    startX.current = null;
    moved.current = false;
  }

  if (images.length === 0) return null;

  return (
    <>
      {children && (
        <div onClick={() => openAt(0)} className="w-full h-full cursor-zoom-in">
          {children}
        </div>
      )}

      {visible &&
        createPortal(
          <div
            ref={overlayRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${productName ?? "Gallery"} — image ${index + 1} of ${images.length}`}
            className={`fixed inset-0 z-[9999] h-[100vh] flex items-center justify-center bg-neutral-50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute inset-0 w-full h-full" />

            <AnimatePresence>
              {open && (
                <motion.button
                  key="close-btn"
                  aria-label="Close"
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  className="absolute top-4 right-4 z-50 bg-white/5 p-2 text-black hover:bg-white/10 rounded-xs hover:cursor-pointer transition"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="relative flex w-full max-w-[1400px] flex-col items-center gap-6 z-10">
              <div
                className="relative flex w-full items-center justify-center overflow-hidden rounded-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
              >
                <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="relative w-full h-[80vh]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: zoomed ? 1.5 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].alt ?? productName ?? `Image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                  />
                </motion.div>
                </AnimatePresence>

                <button
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-3 text-black hover:bg-white/10 rounded-xs hover:cursor-pointer transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-3 text-black hover:bg-white/10 rounded-xs hover:cursor-pointer transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="w-full max-w-[1100px] text-center text-sm text-black">
                <div className="text-xs relative h-4 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute"
                    >
                      {index + 1} / {images.length}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div ref={thumbsContainerRef} className="w-full max-w-[1100px] overflow-x-auto overflow-y-scroll py-2">
                <div className="w-full flex sm:justify-center gap-3 px-2">
                  {images.map((img, i) => (
                    <motion.button
                      key={i}
                      ref={(el) => { thumbRefs.current[i] = el!; }} // ✅ note the braces and no return
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndex(i);
                      }}
                      aria-label={`Open image ${i + 1}`}
                      className="relative h-20 min-w-[80px] shrink-0 overflow-hidden border focus:outline-none hover:cursor-pointer rounded-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt ?? `thumb-${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover rounded-xl"
                      />
                      {i === index && (
                        <motion.div
                          layoutId="thumb-border"
                          className="absolute inset-0 rounded-xl border-2 border-black/90"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                      {i !== index && (
                        <motion.div
                          className="absolute inset-0 rounded-xs border-2 border-white/20 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}