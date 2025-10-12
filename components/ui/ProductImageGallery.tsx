'use client';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl'; // adjust if needed
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import "@/app/globals.css";

const ProductImageGallery = ({ images = [], isOutOfStock = false, productName = '' }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const goPrev = () =>
  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () =>
  setCurrentIndex((prev) => (prev + 1) % images.length);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (isLargeScreen && isClient) {
    return (
      <>
        <div className="h-screen overflow-y-scroll no-scrollbar flex flex-col gap-4 pr-2">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full aspect-[3/4] min-h-[80vh] cursor-pointer"
              onClick={() => {
                setCurrentIndex(i);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={imageUrl(img).url()}
                alt={productName}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
            <button
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white z-50 hover:cursor-pointer"
            >
              <X size={32} />
            </button>
            {images.length > 1 && (
              <button
                aria-label="Previous Image"
                onClick={goPrev}
                className="absolute left-4 text-white z-50"
              >
                <ChevronLeft size={40} />
              </button>
            )}
            <div className="relative w-full h-full max-w-5xl mx-auto">
              <Image
                src={imageUrl(images[currentIndex]).url()}
                alt={productName}
                fill
                className="object-contain"
              />
            </div>
            {images.length > 1 && (
              <button
                aria-label="Next Image"
                onClick={goNext}
                className="absolute right-4 text-white z-50"
              >
                <ChevronRight size={40} />
              </button>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`relative overflow-hidden w-full h-[44vh] aspect-square ${
          isOutOfStock ? 'opacity-50' : ''
        }`}
      >
        {images[currentIndex] && (
          <Image
            src={imageUrl(images[currentIndex]).url()}
            alt={productName ?? 'Product Image'}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        )}
        {images.length > 1 && (
          <>
            <button
              aria-label="previous-image"
              onClick={goPrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="next-image"
              onClick={goNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <button
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white z-50 hover:cursor-pointer"
          >
            <X size={32} />
          </button>
          {images.length > 1 && (
            <button
              aria-label="Previous Image"
              onClick={goPrev}
              className="absolute left-4 text-white z-50"
            >
              <ChevronLeft size={40} />
            </button>
          )}
          <div className="relative w-full h-full max-w-5xl mx-auto">
            <Image
              src={imageUrl(images[currentIndex]).url()}
              alt={productName}
              fill
              className="object-contain"
            />
          </div>
          {images.length > 1 && (
            <button
              aria-label="Next Image"
              onClick={goNext}
              className="absolute right-4 text-white z-50"
            >
              <ChevronRight size={40} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;