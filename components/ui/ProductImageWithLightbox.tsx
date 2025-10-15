"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

interface Props {
  images: { src: string; alt?: string }[];
  productName: string;
}

export default function ProductImageWithLightbox({ images, productName }: Props) {
  return (
    <div className="relative w-full h-[80vh] lg:h-[83vh] overflow-hidden">
      <Lightbox images={images} productName={productName}>
        <div className="absolute inset-0 cursor-pointer">
          <Image
            src={images[0].src}
            alt={images[0].alt ?? productName}
            fill
            className="object-cover w-full rounded-b-4xl "
          />
        </div>
      </Lightbox>
    </div>
  );
}