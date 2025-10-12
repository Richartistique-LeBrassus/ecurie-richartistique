/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        playfair: ['"Palm Royal"', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        birthstone: ['Birthstone', 'cursive'],
      },
      colors: {
        brand: {
          DEFAULT: "#111111",
          dark: "#f8f5f2",
        },
        background: {
          DEFAULT: "#fafafa", // neutral-50
          dark: "#0c0a09",    // stone-950
        },
        text: {
          DEFAULT: "#000000", // main
          dark: "#ffffff",
          muted: "#6b7280",   // gray-500
          accent: "#b91c1c",  // red-700
          gold: "#bfa76f",    // luxury accent
          subtle: "#374151",  // gray-700
        },
      },
    },
  },
  plugins: [
    //require('tailwind-scrollbar-hide'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};