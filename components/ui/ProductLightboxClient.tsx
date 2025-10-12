'use client';
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';  

type ImageType = {
  src: string;
  alt: string;
};

type Props = {
  images: ImageType[];
  productName?: string;
};

export default function ProductLightboxClient({ images, productName }: Props) {
  const [open, setOpen] = useState(false);
  if (!images?.length) return null;
  const slides = images.map((img) => ({
    src: imageUrl(img.src).url(),
    alt: productName ?? '',
  }));

  return (
    <>
      <button
        className="absolute inset-0 z-20 w-full h-full cursor-zoom-in"
        onClick={() => setOpen(true)}
        aria-label="Open product lightbox"
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Fullscreen, Thumbnails]}
        styles={{
          container: {
            backgroundColor: '#fafafa', 
          },
          slide: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
          thumbnailsContainer: {
            backgroundColor: '#fafafa', 
            maskImage: 'none',
            WebkitMaskImage: 'none',
          },
          thumbnail: {
            backgroundColor: '#fafafa', 
          },
          button: {
            color: 'white',
          },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="flex items-center justify-center max-w-full max-h-full">
              <Image
                src={slide.src}
                alt={productName ?? ''}  
                layout="responsive"
                width={800}
                height={600}
                className="rounded-xl shadow-lg"
              />
            </div>
          ),
        }}
      />
    </>
  );
}