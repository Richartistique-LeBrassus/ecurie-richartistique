'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation'; 

export default function SplashScreen() {
  const [isMinDurationDone, setIsMinDurationDone] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [isClient, setIsClient] = useState(false); 

  const pathname = usePathname(); 

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;

    setShouldShow(true);
    setIsMinDurationDone(false);
    setIsPageReady(false);

    const minTimer = setTimeout(() => setIsMinDurationDone(true), 2000);

    const handlePageReady = () => setIsPageReady(true);
    window.addEventListener('pageReady', handlePageReady);

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('pageReady', handlePageReady);
    };
  }, [pathname, isClient]);

  useEffect(() => {
    if (isMinDurationDone && isPageReady) {
      setShouldShow(false);
    }
  }, [isMinDurationDone, isPageReady]);

  return (
    <AnimatePresence mode="wait">
      {shouldShow && (
        <motion.div
          key={`splash-${pathname}`}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center
            justify-center bg-neutral-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="text-stone-950 flex flex-col items-center
              h-fit uppercase font-extrabold"
          >
            <div className="ecurie">
              <h2 className="text-[27px]">É</h2>
            </div>
            <div className="logo -mt-4">
              <h2 className="text-8xl">R</h2>
            </div>                  
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}