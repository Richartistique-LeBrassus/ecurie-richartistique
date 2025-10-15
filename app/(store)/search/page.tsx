// File: app/(store)/search/page.tsx
import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import Image from "next/image";
import type { Metadata } from "next";
import type { ProductType } from "@/sanity.types";
interface SearchParams {
  query?: string;
}

interface PageProps {
  searchParams?: Promise<SearchParams>; // Required by Next.js 15
}

// Generate page metadata dynamically
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = resolvedParams?.query ?? "";
  const products: ProductType[] = query ? await searchProductsByName(query) : [];

  if (!products.length) {
    return {
      title: `No Search Results For ${query.charAt(0).toUpperCase() + query.slice(1)} | Écurie Richartistique`,
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `Search Results For ${query.charAt(0).toUpperCase() + query.slice(1)} | Écurie Richartistique`,
    openGraph: {
      title: `Search Results For ${query.charAt(0).toUpperCase() + query.slice(1)} | Écurie Richartistique`,
    },
  };
}

// Main page component
export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = resolvedParams?.query ?? "";
  const products: ProductType[] = query ? await searchProductsByName(query) : [];

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-neutral-50 rounded-b-xs p-4 pt-32">
        <div className="bg-neutral-50 p-8 rounded-xs shadow-xl w-full max-w-4xl uppercase">
          <h1 className="text-xl text-center font-bold mb-6 text-black tracking-wider">
            NO RESULTS FOR &quot;{query}&quot;
          </h1>
          <p className="text-gray-800 text-center text-sm">
            Unfortunately there are no results matching your search.<br />
            Please do attempt a search with different keywords.<br />
            Feel free to contact client service via email or phone.<br />
            It would be our pleasure to assist you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen pt-24 w-full">
      <div className="w-full">
        <div className="relative w-full h-[60vh] sm:h-[50vh]">
          <Image
            className="object-cover w-full h-[60vh] sm:h-[50vh] grayscale brightness-[45%]"
            src="/images/search-1.jpg"
            alt="background-image"
            fill
            loading="lazy"
          />
          <div className="absolute bottom-[44%] text-center w-full px-auto drop-shadow-2xl uppercase">
            <h1 className="text-sm font-extrabold mb-6 text-white leading-7">
              Results for<br />
              <span className="text-lg tracking-wider italic">&quot;{query}&quot;</span>
            </h1>
          </div>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}