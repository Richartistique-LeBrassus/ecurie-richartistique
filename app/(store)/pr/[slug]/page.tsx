import { notFound } from 'next/navigation';
import React from 'react';
import AddToBasketButton from '@/components/ui/AddToBasketButton';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import "@/app/globals.css";
import Head from 'next/head';
import type { Metadata } from 'next';
import ProductImageWithLightbox from '@/components/ui/ProductImageWithLightbox';
import DelayedPage from '@/components/ui/DelayedPage';
import FadeInSection from '@/components/ui/FadeInSection';

interface ImageType {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Écurie Richartistique",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Écurie Richartistique`,
    description: `Explore the ${product.name} in ${product.scale} scale. Premium craftsmanship, limited stock.`,
    openGraph: {
      title: `${product.name} | Écurie Richartistique`,
      description: `Explore the ${product.name} in ${product.scale} scale. Premium craftsmanship, limited stock.`,
      images: product.images?.[0]
        ? [
            {
              url: imageUrl(product.images[0]).url(),
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
  };
}

export const dynamic = "force-static";
export const revalidate = 60;

export default async function ProductPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product?.name || product.price == null) return notFound();

  const isOutOfStock = product.stock != null && product.stock <= 0;

  const images: ImageType[] = (product.images || []).map((img: Record<string, unknown>) => ({
    src: imageUrl(img).url() || '',
    alt: (img.alt as string) ?? 'Product Image',
  }));

  const mainImage = images[0]?.src || '/images/logo.png';
  const secondImage = images[1]?.src || '';
  const thirdImage = images[2]?.src || '';
  const fourthImage = images[3]?.src || '';
  const fifthImage = images[4]?.src || '';
  const sixthImage = images[5]?.src || '';
  const seventhImage = images[6]?.src || '';

  return (
    <DelayedPage>
      <>
        <Head>
          <link rel="preload" href={mainImage} as="image" />
          {secondImage && <link rel="preload" href={secondImage} as="image" />}
          {thirdImage && <link rel="preload" href={thirdImage} as="image" />}
          {fourthImage && <link rel="preload" href={fourthImage} as="image" />}
          {fifthImage && <link rel="preload" href={fifthImage} as="image" />}
          {sixthImage && <link rel="preload" href={sixthImage} as="image" />}
          {seventhImage && <link rel="preload" href={seventhImage} as="image" />}
        </Head>

        <div className="w-full bg-neutral-50 min-h-screen">
          <div className="flex flex-col w-full min-h-fit gap-1">
            <div
              className={`relative w-full h-[80vh] lg:h-[83vh] ${isOutOfStock ? 'opacity-50' : ''}`}
            >
              {images.length > 0 && (
                <ProductImageWithLightbox images={images} productName={product.name} />
              )}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
              )}
            </div>

            <div className="relative grid grid-cols-1 gap-36 h-fit min-h-[800px] w-full max-w-3xl mx-auto mt-12">
              <div className="relative w-full h-[400px] lg:h-fit px-5 py-6 sm:px-12">
                <FadeInSection>
                <div                   
                  className="flex flex-col justify-between gap-7 w-full h-[95%] uppercase text-center"
                >
                  <h1 className="font-extrabold text-[27px] sm:text-3xl max-w-lg mx-auto">
                    {product.name}
                  </h1>
                  <p className="text-sm">{product.scale} Scale</p>
                  <p className="text-xl">€{product.price?.toFixed(2)}</p>

                  <div className="flex flex-col gap-8 sm:gap-9 lg:gap-10 xl:gap-11 2xl:gap-12">
                    <AddToBasketButton product={product} disabled={isOutOfStock} />
                    <p className="text-sm px-1 max-w-[560px] mx-auto">
                      {product.description
                        ?.map((block) =>
                          block._type === 'block'
                            ? block.children?.map((child) => child.text).join('')
                            : ''
                        )
                        .join(' ') || 'No description available'}
                    </p>

                    <div className="flex flex-col text-sm tracking-tight gap-1">
                      <p>More Details</p>
                      <p>Customer Service</p>
                      <p>Shipping & Returns</p>
                    </div>
                    <p className="text-sm tracking-wide">
                      Average Delivery Time: 2-4 Working Days
                    </p>
                  </div>
                </div>
                </FadeInSection>
              </div>

              <FadeInSection>
              <div className="relative w-full h-[55vw] max-h-[176px] max-w-[400px] 
                mx-auto md:max-h-[190px] md:max-w-[450px] lg:max-h-[210px] lg:max-w-[480px]
                mt-24 sm:mt-0"
              >
                {product.images?.[1] && (
                  <Image
                    className="object-cover w-full h-full rounded-full"
                    src={secondImage}
                    alt="manufacturer's badge"
                    layout="fill"
                    loading="lazy"
                  />
                )}
              </div>
              </FadeInSection>
            </div>

            <FadeInSection>
            <div className="py-12 md:py-20 xl:py-28 2xl:py-36 grid grid-cols-2 gap-1 sm:inline-flex sm:justify-center w-full lg:gap-5 mx-auto">
              <div className="relative w-full h-[85vw] sm:h-auto sm:w-[45vh] md:w-[70vh]">
                {product.images?.[2] && (
                  <Image
                    className="object-cover w-full h-full rounded-4xl"
                    src={thirdImage}
                    alt="upper product-view"
                    layout="fill"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="relative w-full h-[85vw] sm:h-auto sm:w-[45vh] md:w-[70vh]">
                <Image
                  className="object-cover w-full h-full rounded-4xl"
                  src="/images/have.jpg"
                  alt="decorative image"
                  width={1168}
                  height={1752}
                  loading="lazy"
                />
              </div>
            </div>
            </FadeInSection>

            <FadeInSection>
            <div className="py-12 md:py-20 xl:px-8 2xl:p-16 xl:py-28 2xl:py-36 grid grid-cols-3 gap-1
              lg:gap-5 w-full"
            >              
              {[fourthImage, fifthImage, sixthImage].map((imgSrc, i) => (
                <div
                  key={i}
                  className="relative h-[42.5vw] sm:h-[32vw] lg:h-[25vw] xl:h-[20vw] 2xl:h-[17vw] w-full"
                >
                  {imgSrc && (
                    <Image
                      className="object-cover w-full h-full rounded-4xl sm:rounded-full"
                      src={imgSrc}
                      alt="product"
                      layout="fill"
                      loading="lazy"
                    />
                  )}
                </div>                
              ))}              
            </div>
            </FadeInSection>

            <FadeInSection>
            <div className="mt-12 md:mt-20 xl:mt-28 2xl:mt-36 
            relative w-full h-[70vw] sm:h-[47vw] md:h-[43vw] lg:h-[40vw] xl:h-[34vw] mx-auto">
              {product.images?.[6] && (
                <Image
                  src={seventhImage}
                  className="rounded-t-4xl xl:rounded-t-full object-center"
                  alt="Decorative banner image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority
                />
              )}
            </div>
            </FadeInSection>
          </div>
        </div>
      </>
    </DelayedPage>
  );
}