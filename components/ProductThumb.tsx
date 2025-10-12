"use client";
import { imageUrl } from "@/lib/imageUrl";
import { ProductType } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "phosphor-react";
import { useState } from "react";
import useBasketStore from "@/store/store";

function ProductThumb({ product }: { product : ProductType }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  const { setItemQuantity } = useBasketStore();

  const [qty] = useState(1);

  return (
    <Link
      href={`/pr/${product.slug?.current}`}
      prefetch 
      className={`group flex flex-col bg-neutral-100 w-full rounded-4xl
         hover:shadow-xs transition-all duration-300 overflow-hidden      
        ${isOutOfStock ? "opacity-50" : ""}
      `}
    >    
        <div className="relative w-full overflow-hidden h-[65vw] 
          lg:h-[35vw] 2xl:h-[27vw]"
        >
        {product.images?.[0] && (
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-101"
            src={imageUrl(product.images[0]).url()}
            alt={product.name || "Product image"}
            fill
            priority
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center uppercase
          justify-center bg-black bg-opacity-50">
            <span className="text-black font-bold text-lg">Out of Stock</span>
          </div>
        )}

        <button
          className="absolute top-4 right-4 z-10 bg-transparent  p-1 
          group-hover:scale-110 transition hover:cursor-pointer"
          aria-label="Add to Basket"
          onClick={() => {
            setItemQuantity(product, qty);
          }}
         >
           <ShoppingBag className="w-6 h-6 text-neutral-300 drop-shadow-2xl" />
        </button>
      </div>

      <div className="p-4 pb-6 h-fit sm:p-6 xl:p-8
       ">
        <h2 className="text-base text-black mb-2 uppercase truncate">
          {product.name}
        </h2>       
        <div className="flex justify-between">
          <p className="text-sm">
            €{product.price?.toFixed(2)}
          </p>
          <p className="text-gray-500 text-sm uppercase">
            1:8 Scale
          </p>
        </div>             
      </div>
    </Link>
  );
}

export default ProductThumb;