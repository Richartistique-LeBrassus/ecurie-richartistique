'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DelayedPage({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event('pageReady'));
    setIsReady(true);
  }, []);

  if (!isReady) return null; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}