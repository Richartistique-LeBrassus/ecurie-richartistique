'use client';
import React from "react";
import { motion } from "motion/react";

interface ColourfulTextProps {
  text: string;
  colors?: string[]; 
}

  const defaultColors = [
    "rgb(250 250 250)"
  ];

export function ColourfulText({ text, colors }: ColourfulTextProps) {
  const [currentColors, setCurrentColors] = React.useState(colors || defaultColors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...(colors || defaultColors)].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [colors]);

  return text.split("").map((char, index) => {
    const isNumber = /\d/.test(char);
    return (
      <motion.span
        key={`${char}-${count}-${index}`}
        initial={{ y: 0 }}
        animate={{
          color: currentColors[index % currentColors.length],
          y: [0, -3, 0],
          scale: [1, 1.01, 1],
          filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.05,
        }}
        className={`drop-shadow-2xl font-extrabold text-lg text-stone-50 text-center uppercase tracking-widest ${
          isNumber ? '' : ''
        }`}
      >
        {char}
      </motion.span>
    );
  });
}