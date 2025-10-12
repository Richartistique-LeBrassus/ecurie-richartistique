import { fetchSubcategoryBySlug } from "@/sanity/lib/queries";
import { fetchProductsBySubcategory } from "@/sanity/types/fetchProductsBySubcategory";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image"; 
import ProductGrid from "@/components/ProductGrid";
import type { Metadata } from 'next';
import Link from "next/link";
import DelayedPage from "@/components/ui/DelayedPage";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const [subcategory] = await Promise.all([
    fetchSubcategoryBySlug(slug),   // Subcategory
    fetchProductsBySubcategory(slug) // ProductType[]
  ]);

  return {
    title: `${subcategory?.title} | Écurie Richartistique`,
    description: `Browse ${subcategory?.title} models in our Écurie Richartistique collection.`,
    openGraph: {
      title: `${subcategory?.title} | Écurie Richartistique`,
      description: `Explore the finest ${subcategory?.title} models available in our curated store.`,
      url: `/subcategory/${subcategory?.slug?.current}`,
      images: subcategory?.image
        ? [{ url: urlFor(subcategory.image).url() }]
        : [],
    },
  };
}

export const dynamic = "force-static";
export const revalidate = 60;

export default async function SubcategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [subcategory, products] = await Promise.all([
    fetchSubcategoryBySlug(slug),   
    fetchProductsBySubcategory(slug)
  ]);

  return (
    <DelayedPage>
      <div className="bg-neutral-50 pb-12 sm:pb-16">
        <div className="w-full">
          <div className="relative w-full h-[45vh] sm:h-[50vh] bg-neutral-50">
            {subcategory?.image && (
              <Image
                className="object-cover w-full h-[45vh] sm:h-[50vh] rounded-b-4xl"
                src={urlFor(subcategory.image).url()}
                alt="Subcategory Banner"
                fill
                loading="lazy"
              />
            )}
            <div className="absolute text-center w-full 
            h-full flex flex-col justify-center px-auto drop-shadow-2xl uppercase">
              <h1 className="text-3xl font-bold  text-white drop-shadow-2xl">
                {subcategory?.title}
              </h1>
            </div>          
          </div>    
          <div className="flex flex-col
            w-full min-h-[270px] uppercase
            bg-neutral-50 py-12 px-4 md:px-8"
          >
            <p className="text-black text-center text-sm sm:px-1 
              lg:text-base max-w-[1000px] mx-auto"
            >
              Discover the Écurie Richartistique scalemodel collection, 
              where retro sophistication meets impeccable craftsmanship, 
              offering timeless silhouettes and refined 
              elegance for every connoisseur. 
            </p>
            <div className="w-full mt-20 mx-auto px-1">
              <p className="text-base text-neutral-500 mb-4">
                <Link prefetch={true} href="/" aria-label="Link to Home page.">
                  <span className="cursor-pointer relative  
                    border-b-2 border-transparent 
                    hover:border-neutral-500 transition-all duration-300">
                    Home
                  </span>
                </Link>
                <span className="px-2">/</span>
                <span className="text-black cursor-pointer border-b-2 border-black">
                  {subcategory?.title}
                </span>
              </p>
            </div>
          </div>   
        </div> 
        <ProductGrid products={products} />
      </div>
    </DelayedPage>
  );
}