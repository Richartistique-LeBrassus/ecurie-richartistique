'use client';
import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";
import "@/app/globals.css";

interface Props {
  product: Product;
  disabled?: boolean;
  className?: string; 
}

export default function AddToBasketButton({ product, disabled, className = '' }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getItemCount, setItemQuantity } = useBasketStore();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-8">
      <button
        onClick={() => {
          setItemQuantity(product, 1);  // Directly use `1` for quantity instead of `qty`
        }}
        className={`relative overflow-hidden bg-red-900 hover:bg-red-800
          text-white transition-colors duration-150
          py-3 uppercase text-sm font-extrabold px-5 rounded-xs 
          tracking-wide disabled:opacity-40 hover:cursor-pointer w-full
          animate-beam-glow ${className}`}
        disabled={disabled}
      >
        <span className="relative z-10">Add to Cart</span>
      </button>
    </div>
  );
}