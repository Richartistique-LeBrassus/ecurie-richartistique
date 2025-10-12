'use client';
import { useEffect, useState } from 'react';

export default function LoadScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-neutral-50 flex flex-col items-center justify-center animate-fade
    tracking-wider text-stone-950">
      <h2 className="uppercase
      text-xl font-semibold opacity-0 animate-fade-in [animation-delay:0.5s]">
        Signé Richartistry
      </h2>
      <h1 className="text-2xl font-semibold opacity-0 animate-fade-in [animation-delay:0.5s]">
        R
      </h1>
    </div>
  );
}